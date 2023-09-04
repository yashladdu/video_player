import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import React from 'react'
import { Button } from '@mui/material';

const Signup = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  return (
    <div>
        <p>
            <TextField id="standard-basic" label="Username" variant="standard" fullWidth size='small' />
        </p>
        <p>
            <TextField id="standard-basic" label="Email" variant="standard" fullWidth size='small' />
        </p>
        <p>
            <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input fullWidth
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
            </FormControl>
        </p>
        <p>
            <Button fullWidth variant="contained" startIcon={<LoginIcon />}>
                Sign Up
            </Button>
        </p>
        
    </div>
  )
}

export default Signup