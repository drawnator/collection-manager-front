import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserAttributes from './integration/UserAttributes.jsx'
import BulkList from './integration/BulkList.jsx'
import CreateBulk from './integration/createBulk.jsx'
import CreateCard from './integration/createCard.jsx'
import CardList from './integration/CardList.jsx'


createRoot(document.getElementById('user')).render(
  // <StrictMode>
  <div>
    <UserAttributes />
    <BulkList />
    <CreateBulk />
    <CreateCard />
    <CardList />
  </div>
  // </StrictMode>
)
