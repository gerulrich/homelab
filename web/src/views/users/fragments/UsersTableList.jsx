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
  InputAdornment,
  Checkbox
} from '@mui/material';
import { IconPlus, IconSearch, IconSquare, IconSquareCheck } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSearch } from '@app/hooks/useSearch';
import axios from '@app/services/homelab'
import { useTranslation } from 'react-i18next';
import { EditAndDeleteMenu } from '@app/components/customs/EditAndDeleteMenu';

export const UsersTableList = () => {
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
    setError } = useSearch('/auth/users');
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const emptyRows = Math.max(0, size - data.items.length);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = (user) => navigate(`/settings/users/${user.uid}`);
  const onDelete = (user) => {
    axios.delete(`/auth/users/${user.uid}`)
      .then(resp => {
        const filtered = data.items.filter(item => item.uid != user.uid);
        const pagination = data.pagination;
        setData({
          items: filtered,
          pagination
        })
      }).catch(err => {
        setError(err.message);
      });
  }

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

        <Tooltip title="Nuevo usuario">
            <IconButton component={NavLink} to="/settings/users/new">
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
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.name')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.email')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.plan')}</Typography>
                </TableCell>                
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.roles')}</Typography>
                </TableCell>
                <TableCell align="center" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.enabled')}</Typography>
                </TableCell>
                <TableCell align="center" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.google')}</Typography>
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
                      <Stack spacing={2} direction="row" alignItems="center">
                          <Avatar
                            src={row.picture}
                            width="32"
                          >{row.symbol}</Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="600">
                              {row.name}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                          {row.email}
                        </Typography>
                      </TableCell>

                      <TableCell>
                      <Typography variant="caption">
                        lifetime pass
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="caption">
                          {row.roles.join(', ')}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        {
                          row.enabled
                           ? (<IconSquareCheck/>)
                           : (<IconSquare />)
                        }
                      </TableCell>

                      <TableCell align="center">
                      {
                          row.google
                           ? (<IconSquareCheck/>)
                           : (<IconSquare />)
                        }
                      </TableCell>

                      <TableCell style={{ width: "48px", padding: "2px", marginRight: "25px" }}>
                        {activeRowIndex === index && (
                            <EditAndDeleteMenu
                            resource={row}
                            onEdit={onEdit}
                            onDelete={onDelete}
                          />
                        )}
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

export default UsersTableList;