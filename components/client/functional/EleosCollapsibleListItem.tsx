import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  TextField,
  Button,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export interface EleosCollapsibleListItemProps {
  description: string;
  onUpdate: (updatedDescription: string) => void;
}

const EleosCollapsibleListItem: React.FC<EleosCollapsibleListItemProps> = ({
  description,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateClick = () => {
    onUpdate(editedDescription);
    setIsEditing(false);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={description} />
        <IconButton onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
      </ListItem>
      <Collapse in={isEditing} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <TextField
              fullWidth
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            {isEditing && (
              <Box ml={2}>
                <Button onClick={handleUpdateClick} variant="contained" color="primary">
                  <SaveIcon />
                  Update
                </Button>
              </Box>
            )}
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default EleosCollapsibleListItem;
