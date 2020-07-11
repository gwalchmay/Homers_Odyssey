import React from 'react';
import { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles/Profile.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


function Profile() {
    const [email, setEmail] = useState('homer.simpson@wildcodeschool.fr');
    const [lastName, setLastName] = useState('Simpson');
    const [name, setName] = useState('Homer');

    return (
        <div>
            <h1>My profile</h1>
            <List>
                <ListItem>
                    <ListItemText primary="Email" secondary={email} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Name" secondary={name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Last name" secondary={lastName} />
                </ListItem>
            </List>
            <Button variant="contained"><Link to="/signin">Sign out</Link></Button>
        </div>
    )

}




export default Profile;