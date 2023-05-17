import { useNavigate } from "react-router-dom"

const AdminButtons = () => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('/admin/transactions')} >Transactions</button>
            <button onClick={() => navigate('/admin/users')}>Users</button>
            <button onClick={() => navigate('/tickets')}>Tickets</button>
            <button onClick={() => navigate('/admin/ticket_types')}>Ticket Types</button>
        </>
)}

export default AdminButtons
