import React, { useState } from 'react';
import '../styles/SignUp.css';


function SignUp() {
    const [email, updateEmailField] = useState('');
    const [password, updatePasswordField] = useState('');
    const [name, updateNameField] = useState('');
    const [lastname, updateLastNameField] = useState('');
    const [flash, setFlash] = useState('')
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
            )

    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)} className='flexContainer'>
                <h1>{'email : ' + email + ', password : ' + password + ', name : ' + name + ', lastname : ' + lastname}</h1>
                <input type="email" name="email" placeholder="example@gmail.com" onChange={(event) => updateEmailField(event.target.value)} />
                <input type="password" name="password" placeholder="enter your password" onChange={(event) => updatePasswordField(event.target.value)} />
                <input type="password" name="passwordbis" placeholder="enter your password again" />
                <input type="text" name="name" placeholder="your name" onChange={(event) => updateNameField(event.target.value)} />
                <input type="text" name="lastname" placeholder="your last name" onChange={(event) => updateLastNameField(event.target.value)} />
                <input type="submit" value="Soumettre" />
            </form >
            <div>
                {flash}
            </div>
        </div>
    )
}

export default SignUp