import React, { useState } from 'react';
import '../styles/SignUp.css';
import TextField from '@material-ui/core/TextField';
import { Button, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';


function SignIn() {
    const [email, updateEmailField] = useState('');
    const [password, updatePasswordField] = useState('');
    const [flash, setFlash] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function handleRedirect() {
        setTimeout(() => {window.location.href = 'http://localhost:3000/profile'},2500);
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:8000/auth/signin",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ 'email': email, 'password': password }),
            })
            .then(res => res.json())
            .then(
                res => setFlash(res.flash),
                err => setFlash(err.flash))
            .then(handleClick())
            .then(handleRedirect())
    }

    return (
        <div className='signUp_rootDiv'>
            <form className='flexContainer'>
                <h1>SIGN IN!</h1>
                <TextField type="email" name="email" label='email' placeholder="example@gmail.com" onChange={(event) => updateEmailField(event.target.value)} />
                <TextField type="password" name="password" label='password' placeholder="enter your password" onChange={(event) => updatePasswordField(event.target.value)} />
            </form >
            <div className='mini_container'>
                <Button type="submit" variant="contained" onClick={(event) => handleSubmit(event)}>Submit</Button>
                <Link to="/signup">Create an account</Link>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={flash}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}

export default SignIn;