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

import { projectService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import NoDataMessage from 'components/NoDataMessage';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import DeleteProjectModal from 'pages/ProjectsPage/components/DeleteProjectModal';
import { ProjectApiItem, ProjectStatus, ProjectUiItem } from 'types/projects';
import TableWrapper from 'components/TableWrapper';
import { TableColumn, TableModalActions } from 'types/generic';
import TableHeader from 'components/TableHeader';
import TableActionsCell from 'components/TableActionsCell';
import TableActionButton from 'components/TableActionButton';
import { FetchProjectListQueryParams } from 'services/models/Projects';
import {
  TABLE_DEFAULT_ROWS_PER_PAGE,
  TABLE_DEFAULT_START_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS
} from 'constants/main';
import PublishProjectModal from 'pages/ProjectsPage/components/PublishProjectModal';
import UnpublishProjectModal from 'pages/ProjectsPage/components/UnpublishProjectModal';
import StatusChangeButton from 'pages/ProjectsPage/components/ProjectsList/StatusChangeButton';

const tableColumns: TableColumn[] = [
  {
    id: 'code',
    label: 'table.headers.code',
    minWidth: 100,
  },
  {
    id: 'name',
    label: 'table.headers.name',
    minWidth: 100,
  },
  {
    id: 'client',
    label: 'table.headers.client',
    minWidth: 100,
  },
  {
    id: 'coworker',
    label: 'table.headers.coworker',
    minWidth: 100,
  },
  {
    id: 'status',
    label: 'table.headers.status',
    minWidth: 100,
  },
  {
    id: 'registrationDate',
    label: 'table.headers.registrationDate',
    minWidth: 130,
  },
];

const mapApiListDataToUi = (apiData: ProjectApiItem): ProjectUiItem => ({
  id: apiData.id,
  name: apiData.name,
  code: apiData.code,
  status: apiData.status,
  clientId: apiData.client_id,
  clientName: apiData.client_name,
  coworkerId: apiData.coworker_id,
  coworkerName: apiData.coworker_name,
  registrationDate: apiData.registration_date,
});

const ProjectsList = () => {
  const [page, setPage] = useState<number>(TABLE_DEFAULT_START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(TABLE_DEFAULT_ROWS_PER_PAGE);
  const [items, setItems] = useState<ProjectUiItem[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<TableModalActions | null>(null);

  const { t } = useTranslation('projects');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const fetchItems = async (
    newPage: number = TABLE_DEFAULT_START_PAGE,
    newPerPage: number = TABLE_DEFAULT_ROWS_PER_PAGE
  ) => {
    const fetchListResponse = await projectService.fetchList(
      new FetchProjectListQueryParams(newPage, newPerPage),
    );
    setIsInitialLoading(false);
    if (fetchListResponse instanceof ServiceError) {
      setSnackbarOpen(true);
      setSnackbarMessage(t('failedToLoadItems'));
      return;
    }

    if (!fetchListResponse.items) {
      return;
    }

    const uiData = fetchListResponse.items.map(
      (item: ProjectApiItem) => mapApiListDataToUi(item)
    );
    setItems(uiData);
    setTotalCount(fetchListResponse.total_count);
  };

  useEffect(() => {
    setIsInitialLoading(true);
    fetchItems();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    fetchItems(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(rowsPerPage);
    setPage(TABLE_DEFAULT_START_PAGE);

    fetchItems(TABLE_DEFAULT_START_PAGE, newRowsPerPage);
  };

  const onDelete = (id: string) => {
    setSelectedItemId(id);
    setModalAction(TableModalActions.delete);
  };

  const onDeleteModalClose = (isDeleted?: boolean) => {
    if (isDeleted) {
      fetchItems(page, rowsPerPage);
    }

    setModalAction(null);
    setSelectedItemId(null);
  };

  const onPublish = (id: string) => {
    setSelectedItemId(id);
    setModalAction(TableModalActions.publish);
  }

  const onPublishModalClose = (isPublished?: boolean) => {
    if (isPublished) {
      const updatedItems = items.map((item) => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            status: ProjectStatus.published,
          }
        }

        return item;
      });

      setItems(updatedItems);
    }

    setModalAction(null);
    setSelectedItemId(null);
  };

  const onUnpublish = (id: string) => {
    setSelectedItemId(id);
    setModalAction(TableModalActions.unpublish);
  }

  const onUnpublishModalClose = (isUnpublished?: boolean) => {
    if (isUnpublished) {
      const updatedItems = items.map((item) => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            status: ProjectStatus.draft,
          }
        }

        return item;
      });

      setItems(updatedItems);
    }

    setModalAction(null);
    setSelectedItemId(null);
  };

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  if (!isInitialLoading && items.length === 0) {
    return <NoDataMessage message={t('table.noRecords')} />;
  }

  const tableColumnsLocalized = tableColumns.map((tableColumn) => ({
    ...tableColumn,
    label: t(tableColumn.label)
  }));

  return (
    <>
      <TableWrapper>
        <>
          <TableContainer>
            <Table>
              <TableHeader columns={tableColumnsLocalized} />
              <TableBody>
                {items
                  .map((row) => (
                    <React.Fragment key={row.name}>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        {tableColumns.map((column) => {
                          let value;
                          if (column.id === "client") {
                            value = row.clientName;
                          } else if (column.id === "coworker") {
                            value = row.coworkerName || '-';
                          } else if (column.id === "status") {
                            value = t(`status.${row.status}`);
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
                            <StatusChangeButton
                              status={row.status}
                              rowId={row.id}
                              onPublish={onPublish}
                              onUnpublish={onUnpublish}
                            />
                            <Link to={`/projects/edit/${row.id}`} state={row}>
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
       {modalAction === TableModalActions.delete && selectedItemId && (
        <DeleteProjectModal
          projectId={selectedItemId}
          onClose={onDeleteModalClose}
        />
       )}
      {modalAction === TableModalActions.publish && selectedItemId && (
        <PublishProjectModal
          projectId={selectedItemId}
          onClose={onPublishModalClose}
        />
      )}
      {modalAction === TableModalActions.unpublish && selectedItemId && (
        <UnpublishProjectModal
          projectId={selectedItemId}
          onClose={onUnpublishModalClose}
        />
      )}
    </>
  );
};

export default ProjectsList;
