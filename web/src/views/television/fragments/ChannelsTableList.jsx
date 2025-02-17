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
  InputAdornment,
  Checkbox
} from '@mui/material';
import { IconPlus, IconSearch, IconSquare, IconSquareCheck } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSearch } from '@app/hooks/useSearch';
import axios from '@app/services/homelab'
import { useTranslation } from 'react-i18next';
import { EditAndDeleteMenu } from '@app/components/customs/EditAndDeleteMenu';
import { AbilityContext, Can } from '@app/components/guards/Can';


export const ChannelsTableList = ({admin = false}) => {
  const navigate = useNavigate();
  const url = admin ? '/tv/channels' : '/tv/channels/plan';
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
    setError } = useSearch(url);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const emptyRows = Math.max(0, size - data.items.length);
  const ability = useContext(AbilityContext);
  const canEditOrDelete = ability.can('edit', 'Channel') || ability.can('delete', 'Channel');

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onEdit = (channel) => navigate(`/settings/channels/${channel.uid}`);
  const onDelete = (channel) => {
    axios.delete(`/tv/channels/${channel.uid}`)
      .then(resp => {
        const filtered = data.items.filter(item => item.uid != channel.uid);
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

        <Can I="create" a="Channel">
          <Tooltip title="Nuevo canal">
              <IconButton component={NavLink} to="/settings/channels/new">
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
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.number')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.category')}</Typography>
                </TableCell>                
                <Can I="manage" a="Channel">
                  <TableCell align="left" padding="normal">
                    <Typography variant="subtitle1" fontWeight="500">{t('form.fields.epg_id')}</Typography>
                  </TableCell>
                  <TableCell align="left" padding="normal">
                    <Typography variant="subtitle1" fontWeight="500">{t('form.fields.plan')}</Typography>
                  </TableCell>                
                  <TableCell align="center" padding="normal">
                    <Typography variant="subtitle1" fontWeight="500">{t('form.fields.enabled')}</Typography>
                  </TableCell>
                </Can>
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
                            src={row.logo}
                            width="32"
                          />
                          <Box>
                            <Typography variant="h6" fontWeight="600">
                              {row.name}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h6" fontWeight="600">
                          {row.number}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                        { row.category && (<>{t(`form.values.category.${row.category}`)}</>)}
                        </Typography>
                      </TableCell>

                      <Can I="manage" a="Channel">
                      <TableCell>
                        <Typography variant="caption">
                          {row.epg_id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="caption">
                          { row.plan && (<>{t(`form.values.plan.${row.plan}`)}</>)}                           
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        {
                          row.enabled
                           ? (<IconSquareCheck/>)
                           : (<IconSquare />)
                        }
                      </TableCell>
                      </Can>

                      <TableCell style={{ width: "48px", padding: "2px", marginRight: "25px" }}>
                        {(canEditOrDelete && activeRowIndex === index) && (
                            <EditAndDeleteMenu
                            resource={row}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            type="Channel"
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
          showFirstButton={true}
          showLastButton={true}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

    </>
  )
}

export default ChannelsTableList;