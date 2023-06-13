import { useNavigate } from "react-router-dom"

const AdminButtons = () => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('/admin/transactions')} >Transactions</button>
            <button onClick={() => navigate('/admin/users')}>Users</button>
            <button onClick={() => navigate('/tickets')}>Tickets</button>
            <button onClick={() => navigate('/admin/ticket-types')}>Ticket Types</button>
            <button onClick={() => navigate('/admin/services')}>Services</button>
            <button onClick={() => navigate('/foundation')}>Foundation</button>
            <button onClick={() => navigate('/admin/donations')}>Donations</button>
        </>
)}

export default AdminButtons
