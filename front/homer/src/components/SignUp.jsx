import React, { useState } from 'react';


function SignUp() {
    const [email, updateEmailField] = useState('');
    return (

        < div >
            <h1>{email}</h1><input type="email" name="email" onChange={(event) => updateEmailField(event.target.value)} />
        </div >
    )
}

export default SignUp