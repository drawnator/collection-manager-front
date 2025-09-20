import React, { useEffect, useState } from 'react';


    
function CardList() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const abortController = new AbortController();
        const fetchItems = async () => {
            try {
                const idCookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('bulkId='));
                const id = idCookie ? idCookie.split('=')[1] : '';
                const response = await fetch(`http://localhost:3000/bulks/cards?id=${id}`,{
                    method:'GET',
                    headers: { 'Content-Type': 'application/json' },
                    signal: abortController.signal
                });
                const data = await response.json();
                if (response.status !== 201) {
                    setError("sem itens");
                }
                setItems(data || []);
            } catch (err) {
                setError(err.message);
                setItems([]);
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
                        {item.collectionCode}  <br/> {item.number}
                    </button>
                ))}
        </div>
    )
}

export default CardList;