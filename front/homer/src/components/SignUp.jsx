import React, { useState } from 'react';
import '../styles/SignUp.css';
import TextField from '@material-ui/core/TextField';
import { Button, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


function SignUp() {
    const [email, updateEmailField] = useState('');
    const [password, updatePasswordField] = useState('');
    const [name, updateNameField] = useState('');
    const [lastname, updateLastNameField] = useState('');
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
    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:8000/auth/signup",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ 'email': email, 'password': password, 'name': name, 'lastname': lastname }),
            })
            .then(res => res.json())
            .then(
                res => setFlash(res.flash),
                err => setFlash(err.flash)
            ).then(handleClick())

    }

    return (
        <div className='signUp_rootDiv'>
            <form className='flexContainer'>
                <h1>SIGN UP!</h1>
                <TextField type="email" name="email" label='email' placeholder="example@gmail.com" onChange={(event) => updateEmailField(event.target.value)} />
                <TextField type="password" name="password" label='password' placeholder="enter your password" onChange={(event) => updatePasswordField(event.target.value)} />
                <TextField type="password" name="passwordbis" label='password again' placeholder="enter your password again" />
                <TextField type="text" name="name" label='name' placeholder="your name" onChange={(event) => updateNameField(event.target.value)} />
                <TextField type="text" name="lastname" label='lastname' placeholder="your last name" onChange={(event) => updateLastNameField(event.target.value)} />
            </form >
            <Button type="submit" variant="contained" onClick={(event) => handleSubmit(event)}>Submit</Button>
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

export default SignUp