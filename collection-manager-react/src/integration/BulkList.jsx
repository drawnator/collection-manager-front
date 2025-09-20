import React, { useEffect, useState } from 'react';


    
function BulkList() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const abortController = new AbortController();
        const fetchItems = async () => {
            try {
                const idCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('id='));
                const id = idCookie ? idCookie.split('=')[1] : '';
                const response = await fetch(`http://localhost:3000/users/bulks?id=${id}`,{
                    method:'GET',
                    headers: { 'Content-Type': 'application/json' },
                    signal: abortController.signal
                });
                const data = await response.json();
                console.log(data[0].dataValues)
                setItems(data || []);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchItems();
        return () => {abortController.abort()}
    },[]);

    const handleClick = (e) =>{
        // console.log("aaa")
        document.cookie = `bulkId=${e}; path=/`;
        // console.log(document.cookie)
        // console.log('Button clicked with parameter:', e);
    };

    return (
        <div className="bulk">
                {error ? error : items.map(item => (
                        <button key={item.id} className='button' 
                        onClick={() => handleClick(item.id)}   
                        >
                        {item.name}  <br/> {item.cardCount}
                    </button>
                ))}
        </div>
    )
}

export default BulkList;