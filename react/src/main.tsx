import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import "./styles/index.scss"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
</React.StrictMode>,
)


//TODO
// auth fail -> login page
// choose the fucking color pallete already :)
