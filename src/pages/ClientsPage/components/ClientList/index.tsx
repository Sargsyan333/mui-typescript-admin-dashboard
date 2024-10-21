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

import { clientService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import NoDataMessage from 'components/NoDataMessage';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import DeleteClientModal from 'pages/ClientsPage/components/DeleteClientModal';
import { ClientApiItem, ClientUiItem } from 'types/clients';
import TableWrapper from 'components/TableWrapper';
import TableHeader from 'components/TableHeader';
import { TableColumn } from 'types/generic';
import TableActionsCell from 'components/TableActionsCell';
import TableActionButton from 'components/TableActionButton';
import { FetchClientListQueryParams } from 'services/models/Clients';
import {
  TABLE_DEFAULT_START_PAGE,
  TABLE_DEFAULT_ROWS_PER_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS
} from 'constants/main';

const tableColumns: TableColumn[] = [
  {
    id: 'name',
    label: 'table.headers.name',
    minWidth: 100,
  },
  {
    id: 'registrationDate',
    label: 'table.headers.registrationDate',
    minWidth: 130,
  },
];

const mapClientApiListDataToUi = (apiData: ClientApiItem): ClientUiItem => ({
  id: apiData.id,
  name: apiData.name,
  registrationDate: apiData.registration_date,
});

const ClientList = () => {
  const [page, setPage] = useState<number>(TABLE_DEFAULT_START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState<number>(TABLE_DEFAULT_ROWS_PER_PAGE);
  const [items, setItems] = useState<ClientUiItem[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [selectedItem, setSelectedItem] = useState<ClientUiItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { t } = useTranslation('clients');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const fetchItems = async (
    newPage: number = TABLE_DEFAULT_START_PAGE,
    newPerPage: number = TABLE_DEFAULT_ROWS_PER_PAGE
  ) => {
    const fetchListResponse = await clientService.fetchList(
      new FetchClientListQueryParams(newPage, newPerPage)
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
      (item: ClientApiItem) => mapClientApiListDataToUi(item)
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

    fetchItems(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(TABLE_DEFAULT_START_PAGE);

    fetchItems(TABLE_DEFAULT_START_PAGE, newRowsPerPage);
  };

  const onDelete = (id: string) => {
    const targetClient = items.find((c) => c.id === id);
    if (targetClient) {
      setSelectedItem(targetClient);
    }
    setDeleteModalOpen(true);
  };

  const onDeleteModalClose = (isDeleted?: boolean) => {
    if (isDeleted) {
      fetchItems(page, rowsPerPage);
    }

    setDeleteModalOpen(false);
    setSelectedItem(null);
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
                          const value = row[column.id as keyof object];

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
                            <Link to={`/clients/edit/${row.id}`} state={row}>
                              <TableActionButton title={t('table.actionButtons.edit')} icon={<EditIcon />} />
                            </Link>
                            <TableActionButton
                              onClick={() => row.id && onDelete(row.id)}
                              title={t('table.actionButtons.delete')}
                              icon={<DeleteIcon />}
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
       {deleteModalOpen && selectedItem?.id && (
        <DeleteClientModal
          clientId={selectedItem.id}
          onClose={onDeleteModalClose}
        />
       )}
    </>
  );
};

export default ClientList;
