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
            className="bg-green-500"
            startIcon={<AccountCircle />}
        >
            Sign In
        </Button>
    );
}

export default LoginButton;
