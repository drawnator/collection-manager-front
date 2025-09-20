import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('user@email.example');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            // Handle successful login here (e.g., redirect, store token, etc.)
            // save token in cookies from json response
            response.json().then(data => {
                document.cookie = `token=${data.token}; path=/`;
                document.cookie = `id=${data.user.id}; path=/`;
                document.cookie = `name=${data.user.name}; path=/`;
                console.log(document.cookie);
            });
            // redirect to /user
            alert('Login successful!');
            // window.location.href = '/user';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 10 }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
                {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                <button type="submit" style={{ width: '100%' }}>Login</button>
            </form>
        </div>
    );
}

export default Login;