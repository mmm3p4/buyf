import React, { useState, useEffect } from 'react';
import AuthService from '../services/Auth.service';

const Profile = () => {
    const [currentUser, setcurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setcurrentUser(user);
        }
    }, [])


    const handleLogout = () => {
        AuthService.logout();
        window.location.href = '/';
    };

    return (
        <div className='container'>
            {currentUser ? (

                <div>
                    <header className='jumbotron'>
                        <h3>
                            <strong>{currentUser.username}</strong> Profile
                        </h3>
                    </header>
                    <p>
                        <strong>Id:</strong> {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {currentUser.email}
                    </p>
                </div>




            ) : (
                <div>
                    <br />
                    <p>Please login to access this page.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;