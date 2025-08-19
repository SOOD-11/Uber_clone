import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './contexts/UserContext.jsx'
import Captaincontext from './contexts/Captaincontext.jsx'
import Socketprovider from './contexts/SocketContext.jsx'
import { AcceptedRequestProvider } from './contexts/AcceptedRequestContext.jsx'
import RIdeFormContext from './contexts/RIdeFormContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <UserContext>

      <Captaincontext>
<Socketprovider>
        <AcceptedRequestProvider>
          <RIdeFormContext>
<BrowserRouter>
<App/>

</BrowserRouter>
</RIdeFormContext>
</AcceptedRequestProvider>
</Socketprovider>
</Captaincontext>

</UserContext>

  </StrictMode>,
  
)
