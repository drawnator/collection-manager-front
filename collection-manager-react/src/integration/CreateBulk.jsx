import React, { useState } from 'react';

function CreateBulk(){
     const [form, setForm] = useState({
            name: 'bulk',
            description: 'description',
    });
    const [message, setMessage] = useState('');
        
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const idCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('id='));
            const id = idCookie ? idCookie.split('=')[1] : '';
            const user_form = {...form,ownerId:id}
            const tokenCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='));
            const token = tokenCookie ? tokenCookie.split('=')[1] : '';
            const response = await fetch('http://localhost:3000/bulks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(user_form),
            });
            if (!response.ok) {
                    throw new Error('bulk repetido');
            }
            
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className='createBulk'>
        <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label><br />
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        // optional
                    />
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>new bulk</button>
            </form>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
    )
}
export default CreateBulk