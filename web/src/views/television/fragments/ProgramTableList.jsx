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
  TextField,
  InputAdornment,
  Portal,
  Snackbar,
} from '@mui/material';
import { IconCopy, IconPlus, IconSearch } from '@tabler/icons-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSearch } from '@app/hooks/useSearch';
import { useTranslation } from 'react-i18next';
import { DateTimeView } from '@app/components/utils/DateTimeView';
import CopyToClipboard from 'react-copy-to-clipboard';


export const ProgramTableList = () => {
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
    setError } = useSearch('/tv/programs');
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const emptyRows = Math.max(0, size - data.items.length);
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [copied, setCopied] = useState(false);
  const handleCopy = (program) => setCopied(true);
  const handleCloseSnackbar = () => setCopied(false);

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
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.title')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.channel')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.start_time')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500">{t('form.fields.category')}</Typography>
                </TableCell>
                <TableCell align="left" padding="normal">
                  <Typography variant="subtitle1" fontWeight="500"></Typography>
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
                            src={row.image}
                            width="32"
                            variant="rounded"
                          />
                          <Box>
                            
                            <Typography color="textSecondary" variant="h6" fontWeight="400"
                                sx={{ display: 'inline', fontWeight: '', textDecoration: 'none' }}
                                
                                component={Link} to={`/settings/programs/${row.uid}`}
                            >{row.title}
                            
                          </Typography>
                            
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                          {row.channel_name}
                      </TableCell>

                      <TableCell>
                          <DateTimeView date={row.start}/>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                        { row.genre}
                        </Typography>
                      </TableCell>

                      <TableCell style={{ width: "48px", padding: "2px", marginRight: "25px" }}>
                        {
                          (row.media_url != null && row.drm != null && activeRowIndex === index) && (
                            <CopyToClipboard
                              text={`ffmpeg -cenc_decryption_key ${row.drm.key} -i ${row.media_url} -map 0:v:4 -map 0:a -c:v copy -c:a copy -map \"0:s?\" "${row.title}.mkv"`}
                              onCopy={() => handleCopy(row)}>
                              <IconButton aria-label="settings">
                                  <IconCopy fontSize='small' />
                              </IconButton>
                            </CopyToClipboard>
                          )
                        }
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
        <Portal>
          <Snackbar
            open={copied}
            autoHideDuration={1500}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleCloseSnackbar}
            message={t('clipboard.cliCopied')}
          />
        </Portal>
      </Box>

    </>
  )
}

export default ProgramTableList;