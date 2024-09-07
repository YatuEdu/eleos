import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

interface EleosPenProps {
  onEdit: () => void; // Callback function when the pen is clicked
}

const EleosPen: React.FC<EleosPenProps> = ({ onEdit }) => {
  const handleEditClick = () => {
    onEdit(); // Calls the callback function when the pen icon is clicked
  };

  return (
    <IconButton onClick={handleEditClick} aria-label="edit">
      <EditIcon />
    </IconButton>
  );
};

export default EleosPen;
