import { useNavigate } from "react-router-dom"
import axiosClient from '../../axios-client';

const AdminButtons = () => {
    const navigate = useNavigate();

    const TEST_request = async () => {
        try {
            const res = await axiosClient.get('/user', {withCredentials: true});
            console.log(res);
        }catch(err:any){
            console.log(err.response.data.message);
            alert(err.response.data.message)
        }
    }

    return (
        <>
            <button>admin</button>
            <button>buttons</button>
            <button onClick={TEST_request} >TEST</button>
            <button onClick={() => navigate('/admin/transactions')} >Transactions</button>
            <button onClick={() => navigate('/admin/users')}>testadmin</button>
        </>
)}

export default AdminButtons
