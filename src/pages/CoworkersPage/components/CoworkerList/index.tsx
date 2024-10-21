import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { coworkerService } from 'services';
import LoadingSpinner from 'components/LoadingSpinner';
import NoDataMessage from 'components/NoDataMessage';
import { CoworkerApiItem, CoworkerUiItem, InvitationStatus } from 'types/coworkers';
import { ServiceError } from 'services/helperTypes';
import { useSnackbarContext } from 'providers/Snackbar';
import DeleteCoworkerModal from 'pages/CoworkersPage/components/DeleteCoworkerModal';
import TableWrapper from 'components/TableWrapper';
import TableHeader from 'components/TableHeader';
import { TableColumn } from 'types/generic';
import TableActionsCell from 'components/TableActionsCell';
import TableActionButton from 'components/TableActionButton';
import {
  TABLE_DEFAULT_ROWS_PER_PAGE,
  TABLE_DEFAULT_START_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS
} from 'constants/main';
import { FetchCoworkerListQueryParams } from 'services/models/Coworkers';

const tableColumns: TableColumn[] = [
  {
    id: 'companyName',
    label: 'table.headers.companyName',
    minWidth: 100,
  },
  {
    id: 'emailAddress',
    label: 'table.headers.emailAddress',
    minWidth: 100,
  },
  {
    id: 'registrationDate',
    label: 'table.headers.registrationDate',
    minWidth: 130,
  },
  {
    id: 'invitationStatus',
    label: 'table.headers.invitationStatus',
    minWidth: 130,
  },
];

const mapCoworkerApiListDataToUi = (apiData: CoworkerApiItem): CoworkerUiItem => ({
    id: apiData.id,
    companyName: apiData.company_name,
    registrationDate: apiData.registration_date,
    emailAddress: apiData.email,
    invitationStatus: apiData.invitation_status,
});

const CoworkerList = () => {
  const [page, setPage] = React.useState(TABLE_DEFAULT_START_PAGE);
  const [rowsPerPage, setRowsPerPage] = React.useState(TABLE_DEFAULT_ROWS_PER_PAGE);
  const [items, setItems] = useState<CoworkerUiItem[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [selectedItem, setSelectedItem] = useState<CoworkerUiItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { t } = useTranslation('coworkers');
  const { t: mainT } = useTranslation('main');

  const { setSnackbarOpen, setSnackbarMessage } = useSnackbarContext();

  const fetchItems = async (
    newPage: number = TABLE_DEFAULT_START_PAGE,
    newPerPage: number = TABLE_DEFAULT_ROWS_PER_PAGE
  ) => {
    const fetchListResponse = await coworkerService.fetchList(
      new FetchCoworkerListQueryParams(newPage, newPerPage),
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

    const itemsUiData = fetchListResponse.items.map(
      (item: CoworkerApiItem) => mapCoworkerApiListDataToUi(item)
    );
    setItems(itemsUiData);
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
    setRowsPerPage(newRowsPerPage);
    setPage(TABLE_DEFAULT_START_PAGE);

    fetchItems(TABLE_DEFAULT_START_PAGE, newRowsPerPage);
  };

  const onDelete = (id: string) => {
    const targetCoworker = items.find((c) => c.id === id);
    if (targetCoworker) {
      setSelectedItem(targetCoworker);
    }
    setDeleteModalOpen(true);
  };

  const onSendInvitation = async (id: string) => {
    const response = await coworkerService.sendInvitation(id);

    setSnackbarOpen(true);
    if (response instanceof ServiceError) {
      setSnackbarMessage(mainT('errors.somethingWentWrong'));
    } else {
      setSnackbarMessage(
        <Alert severity="success">
          {t('sendInvitation.success')}
        </Alert>
      );

      const updatedCoworkersList = items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            invitationStatus: InvitationStatus.PENDING,
          }
        }

        return item;
      });
      setItems(updatedCoworkersList);
    }
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
                    <React.Fragment key={row.companyName}>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        {tableColumns.map((column) => {
                          let value = row[column.id as keyof object];
                          if (column.id === "invitationStatus") {
                            switch (row[column.id]) {
                              case InvitationStatus.NOT_SENT:
                                value = t('sendInvitation.notSent');
                                break;
                              case InvitationStatus.PENDING:
                                value = t('sendInvitation.pending');
                                break;
                              case InvitationStatus.ACCEPTED:
                                value = t('sendInvitation.accepted');
                                break;
                              default:
                                break;
                            }
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
                            <TableActionButton
                              title={t('table.actionButtons.sendInvitation')}
                              icon={<EmailIcon />}
                              disabled={row.invitationStatus !== InvitationStatus.NOT_SENT}
                              onClick={() => row.id && onSendInvitation(row.id)}
                            />
                            <Link to={`/coworkers/edit/${row.id}`} state={row}>
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
       {deleteModalOpen && selectedItem?.id && (
        <DeleteCoworkerModal
          coworkerId={selectedItem.id}
          onClose={onDeleteModalClose}
        />
       )}
    </>
  );
};

export default CoworkerList;
