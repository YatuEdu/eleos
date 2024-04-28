import React 
                from 'react';
import Button 
                from '@mui/material/Button';
import AccountCircle 
                from '@mui/icons-material/AccountCircle';

function LoginButton() {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<AccountCircle />}
        >
            Sign In
        </Button>
    );
}

export default LoginButton;
