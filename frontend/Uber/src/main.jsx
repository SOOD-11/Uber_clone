import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './contexts/UserContext.jsx'
import Captaincontext from './contexts/Captaincontext.jsx'
import { AcceptedRequestProvider } from './contexts/AcceptedRequestContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <UserContext>

      <Captaincontext>

        <AcceptedRequestProvider>
<BrowserRouter>
<App/>

</BrowserRouter>

</AcceptedRequestProvider>

</Captaincontext>

</UserContext>

  </StrictMode>,
  
)
