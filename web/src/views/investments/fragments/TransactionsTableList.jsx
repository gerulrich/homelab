import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
  Stack,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { green, yellow, purple, blue, deepPurple, pink, orange, teal, lime } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { useSearch } from '@app/hooks/useSearch';
import { DateView } from '@app/components/utils/DateView';
import { MoneyView } from '@app/components/utils/MoneyView';
import { EditAndDeleteMenu } from '@app/components/customs/EditAndDeleteMenu';
import axios from '@app/services/homelab'

export const TransactionsTableList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    data,
    setData,
    search,
    setSearch,
    page,
    setPage,
    size,
    setSize,
    loading,
    error,
    setError } = useSearch('/investments/transactions');
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const emptyRows = Math.max(0, size - data.items.length);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = (transaction) => navigate(`/investments/transactions/${transaction.uid}`);
  const onDelete = (transaction) => {
    axios.delete(`/investments/transactions/${transaction.uid}`)
      .then(resp => {
        const filtered = data.items.filter(item => item.uid != transaction.uid);
        const pagination = data.pagination;
        setData({
          items: filtered,
          pagination
        })
      }).catch(err => {
        setError(err.message);
        alert(t('editAsset.errorLoadingAsset'));
      });
  }

  const getAssetColor = (type) => {
    switch (type) {
      case 'cedear':
        return blue[400];
      case 'bono':
        return pink[700];
      case 'on':
        return purple[500];
      default:
        return yellow[800];
    }
  };

  const getTypeColor = (status) => {
    switch (status) {
      case 'buy':
        return green[800];
      case 'sell':
        return pink[300];
      case 'dividend':
        return teal[500];
      case 'coupon':
        return orange[900];
      case 'split':
          return lime[600];
      default:
        return deepPurple[500];
    }
  };

  const formatDate = (date) => {
    if (!date) return '';

    // Obtener el locale del navegador
    const locale = navigator.language;

    // Formatear la fecha según el locale del usuario, sin la hora
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date));
  };
  

  return (
    <>
      <Toolbar>
        <Box sx={{ flex: '1 1 100%' }}>
          <TextField
              id="outlined-search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size="14" />
                  </InputAdornment>
                ),
              }}
            placeholder={t('form.search')}
            size="small"
            type="search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Tooltip title="Nueva Transacción">
            <IconButton component={NavLink} to="/investments/transactions/new">
              <IconPlus size="1.2rem" icon="filter" />
            </IconButton>
        </Tooltip>

      </Toolbar>

      <Box mb={2} sx={{ mb: 2 }} m={2}>
        <TableContainer >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.date')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.symbol')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.type')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.quantity')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.amount')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={row.uid}
                      onMouseEnter={() => setActiveRowIndex(index)}
                      onMouseLeave={() => setActiveRowIndex(null)}
                    >
                      <TableCell>
                        <DateView date={row.date}/>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                        <Chip label={row.asset.name}
                         avatar={<Avatar alt="row.asset.name" src={row.asset.icon} />}
                         sx={{
                          backgroundColor: getAssetColor(row.asset.type),
                          color: 'white',
                          '&:hover': {
                            backgroundColor: getAssetColor(row.asset.type, true),
                          },
                        }}
                          />
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                        <Chip label={
                            row.type === 'buy' ? 'Compra'
                              : row.type === 'sell' ? 'Venta'
                              : row.type === 'coupon' ? 'Cupón'
                              : row.type === 'dividend' ? 'Dividendo'
                              : row.type === 'amortization' ? 'Amortizacion'
                              : 'Split'
                              }
                              sx={{
                                backgroundColor: getTypeColor(row.type),
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: getTypeColor(row.type, true),
                                },
                              }} />


                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Stack spacing={1} direction="row" alignItems="center">
                          {row.quantity}
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <MoneyView amount={row.price?.amount} currency={row.price?.currency}/>
                      </TableCell>

                      <TableCell style={{ width: "48px", padding: "2px", marginRight: "25px" }}>
                        {activeRowIndex === index && (
                          <EditAndDeleteMenu
                            resource={row}
                            onEdit={onEdit}
                            onDelete={onDelete}
                          />)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.pagination.total}
          rowsPerPage={size}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

    </>
  )
}

export default TransactionsTableList;