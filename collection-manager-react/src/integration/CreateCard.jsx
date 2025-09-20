import React, { useState } from 'react';

function CreateCard(){
    // const [name, setName] = useState('');
    const [cardInfo, setInfo] = useState({
            collectionCode: 'EXPL',
            number: '1',
            modifier:"normal"
        });
    const [message, setMessage] = useState('');
        
    const handleChange = (e) => {
        setInfo({ ...cardInfo, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const idCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('id='));
            const id = idCookie ? idCookie.split('=')[1] : '';
            const user_form = {...cardInfo,ownerId:id}
            const tokenCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='));
            const token = tokenCookie ? tokenCookie.split('=')[1] : '';
            var response = await fetch('http://localhost:3000/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify(user_form),
            });
            const data = await response.json();
            const idBulkCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('bulkId='));
            const bulkId = idBulkCookie ? idBulkCookie.split('=')[1] : '';

            console.log(data)
            response = await fetch('http://localhost:3000/bulks/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                 },
                body: JSON.stringify({bulkId:bulkId,cardId:data.id}),
            });
            if (!response.ok) {
                    throw new Error('card repetido');
            }
            
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className='createBulk'>
        <form onSubmit={handleSubmit}>
                <div>
                    <label>CollectionCode:</label><br />
                    <input
                        type="text"
                        name="card Collection Code"
                        value={cardInfo.collectionCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Number:</label><br />
                    <input
                        type="number"
                        name="number"
                        value={cardInfo.number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>modifier:</label><br />
                    <select
                        name="modifier"
                        value={cardInfo.modifier}
                        onChange={handleChange}
                        required
                    >
                        <option value="normal">normal</option>
                        <option value="holo">holo</option>
                        <option value="reverse">reverse holo</option>
                    </select>
                    
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>add card</button>
            </form>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
    )
}
export default CreateCard