import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import LoadingSpinner from 'components/LoadingSpinner';
import NoDataMessage from 'components/NoDataMessage';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import TableWrapper from 'components/TableWrapper';
import { SearchedValueType, TableColumn } from 'types/generic';
import TableHeader from 'components/TableHeader';
import TableActionsCell from 'components/TableActionsCell';
import TableActionButton from 'components/TableActionButton';
import { SubprojectApiItem, SubprojectUiItem } from 'types/subprojects';
import { subprojectService } from 'services';
import DeleteSubprojectModal from 'pages/SubprojectsPage/components/DeleteSubprojectModal';
import { FetchSubprojectListQueryParams } from 'services/models/Subprojects';
import {
  TABLE_DEFAULT_ROWS_PER_PAGE,
  TABLE_DEFAULT_START_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS
} from 'constants/main';
import SubprojectFilterBlock from 'pages/SubprojectsPage/components/SubprojectFilterBlock';

const tableColumns: TableColumn[] = [
  {
    id: 'code',
    label: 'table.headers.code',
    minWidth: 100,
  },
  {
    id: 'project',
    label: 'table.headers.project',
    minWidth: 100,
  },
  {
    id: 'coworker',
    label: 'table.headers.coworker',
    minWidth: 100,
  },
  {
    id: 'registrationDate',
    label: 'table.headers.registrationDate',
    minWidth: 130,
  },
];

const mapApiListDataToUi = (apiData: SubprojectApiItem): SubprojectUiItem => ({
  id: apiData.id,
  code: apiData.code,
  projectId: apiData.project_id,
  projectName: apiData.project_name,
  coworkerId: apiData.coworker_id,
  coworkerName: apiData.coworker_name,
  registrationDate: apiData.registration_date,
});

const SubprojectsList = () => {
  const [page, setPage] = useState<number>(TABLE_DEFAULT_START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(TABLE_DEFAULT_ROWS_PER_PAGE);
  const [items, setItems] = useState<SubprojectUiItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [selectedItem, setSelectedItem] = useState<SubprojectUiItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [filterProject, setFilterProject] = useState<SearchedValueType | null>(null);

  const { t } = useTranslation('subprojects');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const fetchItems = async (
    newPage: number = TABLE_DEFAULT_START_PAGE,
    newPerPage: number = TABLE_DEFAULT_ROWS_PER_PAGE,
    projectId: string | undefined = undefined
  ) => {
    const fetchListResponse = await subprojectService.fetchList(
      new FetchSubprojectListQueryParams(newPage, newPerPage, projectId),
    );
    setIsLoadingList(false);
    if (fetchListResponse instanceof ServiceError) {
      setSnackbarOpen(true);
      setSnackbarMessage(t('failedToLoadItems'));
      return;
    }

    if (!fetchListResponse.items) {
      return;
    }

    const uiData = fetchListResponse.items.map(
      (item: SubprojectApiItem) => mapApiListDataToUi(item)
    );
    setItems(uiData);
    setTotalCount(fetchListResponse.total_count);
  };

  useEffect(() => {
    setIsLoadingList(true);
    fetchItems();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    fetchItems(
      newPage,
      rowsPerPage,
      filterProject ? filterProject.value : undefined
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = +event.target.value;

    setRowsPerPage(newRowsPerPage);
    setPage(TABLE_DEFAULT_START_PAGE);

    fetchItems(
      TABLE_DEFAULT_START_PAGE,
      newRowsPerPage,
      filterProject ? filterProject.value : undefined
    );
  };

  const onDelete = (id: string) => {
    const targetItem = items.find((c) => c.id === id);
    if (targetItem) {
      setSelectedItem(targetItem);
    }

    setDeleteModalOpen(true);
  };

  const onDeleteModalClose = (isDeleted?: boolean) => {
    if (isDeleted) {
      fetchItems(
        page,
        rowsPerPage,
        filterProject ? filterProject.value : undefined
      );
    }

    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const onFilter = (project: SearchedValueType | null) => {
    setFilterProject(project);
    fetchItems(page, rowsPerPage, project ? project.value : undefined)
  }

  const tableColumnsLocalized = tableColumns.map((tableColumn) => ({
    ...tableColumn,
    label: t(tableColumn.label)
  }));

  return (
    <>
      <SubprojectFilterBlock onFilter={onFilter} filterProject={filterProject} />
      {
        isLoadingList ?
          <LoadingSpinner /> :
          (
            !isLoadingList && items.length === 0 ?
              <NoDataMessage message={t('table.noRecords')} /> :
              <TableWrapper>
              <>
                <TableContainer>
                  <Table>
                    <TableHeader columns={tableColumnsLocalized} />
                    <TableBody>
                      {items
                        .map((row) => (
                          <React.Fragment key={row.code}>
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                            >
                              {tableColumns.map((column) => {
                                let value;
                                if (column.id === "coworker") {
                                  value = row.coworkerName || '-';
                                } else if (column.id === "project") {
                                  value = row.projectName;
                                } else {
                                  value = row[column.id as keyof object];
                                }

                                return (
                                  <TableCell
                                    padding="none"
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {value}
                                  </TableCell>
                                );
                              })}
                              <TableActionsCell>
                                <>
                                  <Link to={`/subprojects/edit/${row.id}`} state={row}>
                                    <TableActionButton
                                      title={t('table.actionButtons.edit')}
                                      icon={<EditIcon />}
                                    />
                                  </Link>
                                  <TableActionButton
                                    title={t('table.actionButtons.delete')}
                                    icon={<DeleteIcon />}
                                    onClick={() => row.id && onDelete(row.id)}
                                  />
                                </>
                              </TableActionsCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={TABLE_ROWS_PER_PAGE_OPTIONS}
                  component="div"
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            </TableWrapper>
          )
      }
       {deleteModalOpen && selectedItem?.id && (
        <DeleteSubprojectModal
          subprojectId={selectedItem.id}
          onClose={onDeleteModalClose}
        />
       )}
    </>
  );
};

export default SubprojectsList;
