import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import "./styles/index.scss"
import { TicketProvider } from './context/TicketContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<React.StrictMode>
    <AuthProvider>
        <TicketProvider>
            <App />
        </TicketProvider>
    </AuthProvider>
</React.StrictMode>,
)


//TODO
// auth fail -> login page
// choose the fucking color pallete already :)
// instaed of checking localstorage just user info and isLoggedIn in state?
