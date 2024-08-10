import React 
, { useEffect, useRef }        
        from 'react';
import Dialog 
        from '@mui/material/Dialog';
import DialogActions 
        from '@mui/material/DialogActions';
import DialogContent 
        from '@mui/material/DialogContent';
import DialogContentText 
        from '@mui/material/DialogContentText';
import DialogTitle 
        from '@mui/material/DialogTitle';
import Button 
        from '@mui/material/Button';
import { StaticStypes } 
        from '@/lib/client/styles/globalStyles';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, title, message, onConfirm, onCancel }) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        if (cancelButtonRef.current) {
          cancelButtonRef.current.focus();
        }
      }, 0);
  
      return () => clearTimeout(timeoutId); // Clean up the timeout if the component unmounts
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (document.activeElement === cancelButtonRef.current) {
        onCancel(); // Trigger Cancel if Enter is pressed while Cancel is focused
      } else if (document.activeElement === confirmButtonRef.current) {
        onConfirm(); // Trigger Confirm if Enter is pressed while Confirm is focused
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      onKeyDown={handleKeyDown}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': { // Styling the paper element (dialog background)
          backgroundColor: 'white', // Dark background color for the dialog
          color: '#FFD700', // White text color
        }
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{backgroundColor: StaticStypes.DIALOG_TITLE_COLOR, marginBottom: '8px' }} >{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button   
          onClick={onCancel} 
          color="primary" 
          variant="contained" 
          autoFocus
          sx={{
            '&:focus-visible': {
              outline: '1px solid #FF4500', // Ensure the focus ring is visible
            }
          }}
          ref={cancelButtonRef}
         >
          Cancel
        </Button>
        <Button 
            ref={confirmButtonRef}
            onClick={onConfirm} 
            variant="contained"
            color="primary" 
          >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
