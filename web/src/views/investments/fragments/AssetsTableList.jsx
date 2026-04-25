import { useContext, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import axios from '@app/services/homelab'
import { EditAndDeleteMenu } from '@app/components/customs/EditAndDeleteMenu';
import { AbilityContext, Can } from '@app/components/guards/Can';
import { TimeView } from '../../../components/utils/TimeView';

export const AssetsTableList = () => {
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
    setError } = useSearch('/investments/assets');
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const emptyRows = Math.max(0, size - data.items.length);
  const ability = useContext(AbilityContext);
  const canEditOrDelete = ability.can('edit', 'Asset') || ability.can('delete', 'Asset');

  const isQuoteStale = (date) => {
    if (!date) return true;
    const parsedDate = new Date(date);
    const diffInMs = Date.now() - parsedDate.getTime();
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    return diffInMs > oneWeekInMs;
  };

  const isAssetMatured = (maturityDate) => {
    if (!maturityDate) return false;
    const parsedDate = new Date(maturityDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    parsedDate.setHours(0, 0, 0, 0);
    return parsedDate < today;
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = (asset) => navigate(`/investments/assets/${asset.uid}`);
  const onDelete = (asset) => {
    console.log(`Eliminando ${asset.name}`);
    axios.delete(`/investments/assets/${asset.uid}`)
      .then(resp => {
        const filtered = data.items.filter(item => item.uid != asset.uid);
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

        <Can I="create" a="Asset">
          <Tooltip title="Agregar asset">
              <IconButton component={NavLink} to="/investments/assets/new">
                <IconPlus size="1.2rem" icon="filter" />
              </IconButton>
          </Tooltip>
        </Can>

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
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.symbol')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.ratio')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.type')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.market')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.updated')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.price')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((row, index) => {
                  const quoteStale = isQuoteStale(row.updated_at);
                  const assetMatured = isAssetMatured(row.maturity_date);
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
                            {assetMatured && (
                              <Typography variant="caption" color="error.main">
                                {t('investments.assetStatus.matured')}
                              </Typography>
                            )}
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
                          {row.updated_at ? <TimeView date={row.updated_at} /> : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {assetMatured ? (
                          <Chip
                            label={t('investments.quoteStatus.matured')}
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        ) : quoteStale ? (
                          <Chip
                            label={t('investments.quoteStatus.outdated')}
                            size="small"
                            color="warning"
                            variant="outlined"
                          />
                        ) : (
                          <Typography>
                            {row.price?.value} {row.price?.currency}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell style={{ width: "48px", padding: "2px", marginRight: "25px" }}>
                        {(canEditOrDelete && activeRowIndex) === index && (
                          <EditAndDeleteMenu
                            resource={row}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            type="Asset"
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
          showFirstButton={true}
          showLastButton={true}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

    </>
  )
}

export default AssetsTableList;