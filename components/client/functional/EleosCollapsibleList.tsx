import React, { useState } 
        from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  TextField,
  Button,
  Tooltip
} 
        from '@mui/material';
import EditIcon 
        from '@mui/icons-material/Edit';
import { ExpandLess, ExpandMore } 
        from '@mui/icons-material';
import EleosCollapsibleListItem from './EleosCollapsibleListItem';


interface EleosCollapsibleListProps {
  items: { id: number; description: string }[];
  onUpdateItem: (id: number, updatedDescription: string) => void;
}

const EleosCollapsibleList: React.FC<EleosCollapsibleListProps> = ({
  items,
  onUpdateItem,
}) => {
  return (
    <List>
      {items.map((item) => (
        <EleosCollapsibleListItem
          key={item.id}
          description={item.description}
          onUpdate={(updatedDescription) => onUpdateItem(item.id, updatedDescription)}
        />
      ))}
    </List>
  );
};

export default EleosCollapsibleList;
