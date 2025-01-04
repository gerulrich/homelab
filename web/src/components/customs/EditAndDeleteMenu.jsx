import { useState } from 'react';
import {
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';
import { Can } from '@app/components/guards/Can';

export const EditAndDeleteMenu = ({ resource, onEdit, onDelete, type }) => {
  // Menu options
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Delete Dialog Options
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => setOpen(false);

  const handleEditOption = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    onEdit(resource);
  };

  const handleDeleteOption = (event) => {
    event.stopPropagation();
    setOpen(false);
    onDelete(resource);
  };

  const handleCloseDeleteDialog = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleOpenDeleteDialog = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpen(true);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <IconDotsVertical size="16" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Can I="edit" a={type}>
          <MenuItem onClick={handleEditOption}>
            <ListItemIcon>
              <IconPencil size="16" />
            </ListItemIcon>
            Editar
          </MenuItem>
        </Can>

        <Can I="delete" a={type}>
          <MenuItem onClick={handleOpenDeleteDialog}>
            <ListItemIcon>
              <IconTrash size="16" />
            </ListItemIcon>
            Eliminar
          </MenuItem>
        </Can>
        
      </Menu>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          ¿Está seguro de que deseas eliminar este elemento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDeleteOption}>Eliminar</Button>
          <Button onClick={handleCloseDeleteDialog} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
