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
