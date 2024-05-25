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
import { useSearch } from '@app/hooks/useSearch';
import { EditAndDeleteMenu } from './EditAndDeleteMenu';

export const AssetsTableList = () => {
  const navigate = useNavigate();
  const {
    data,
    search,
    setSearch,
    page,
    setPage,
    size,
    setSize,
    loading,
    error } = useSearch('/investments/assets');
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const emptyRows = Math.max(0, size - data.items.length);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = (asset) => navigate(`/investments/assets/${asset.uid}`);

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
            placeholder="Search"
            size="small"
            type="search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Tooltip title="Agregar asset">
            <IconButton component={NavLink} to="/investments/assets/new">
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
                  <Typography variant="subtitle1" fontWeight="500">Nombre</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">Ticker</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">Ratio</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">Tipo</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">Mercado</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">Precio</Typography>
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
                            src={row.icon}
                            width="32"
                            variant="rounded"
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
                          {row.symbol}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                          {row.ratio}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <Chip label={row.type} color={
                            row.type === 'cedear'
                              ? 'success'
                              : row.type === 'on'
                                ? 'warning'
                                : row.type === 'bono'
                                  ? 'primary'
                                  : 'secondary'
                          } />
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Typography>
                          {row.market}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {row.price.value} {row.price.currency}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ width: "48px", padding: "2px", marginRight: "25px" }}>
                        {activeRowIndex === index && (
                          <EditAndDeleteMenu 
                            resource={row}
                            onEdit={onEdit}
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

export default AssetsTableList;