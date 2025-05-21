import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './contexts/UserContext.jsx'
import Captaincontext from './contexts/Captaincontext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <Captaincontext>
<BrowserRouter>
<App></App>
</BrowserRouter>
</Captaincontext>
</UserContext>
  </StrictMode>,
  
)
