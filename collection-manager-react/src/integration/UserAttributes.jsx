import React, { useEffect, useState } from 'react';

function UserAttributes() {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const idCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('id='));
                const id = idCookie ? idCookie.split('=')[1] : '';
                const response = await fetch(`http://localhost:3000/users?id=${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                const data = await response.json();
                setUserName(data.name || 'erro :(');
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUserName();
    }, []);

    return (
        <div className="username" >
            {error ? error : userName}
        </div>
    );
}
export default UserAttributes;