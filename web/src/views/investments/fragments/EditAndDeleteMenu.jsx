import { useState } from 'react';
import {
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
} from '@mui/material';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';

export const EditAndDeleteMenu = ({ resource, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEdit = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    onEdit(resource);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    onDelete(resource);
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
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <IconPencil size="16" />
          </ListItemIcon>
          Editar
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <IconTrash size="16" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
        
      </Menu>
    </>
  )
}
