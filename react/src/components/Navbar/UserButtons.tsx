import {useNavigate} from 'react-router-dom';

const UserButtons = () => {
    const navigate = useNavigate();
    return (
        <>
            <button>some</button>
            <button>random</button>
            <button>buttons</button>
            <button onClick={() => navigate('/tickets')}>tickets</button>
        </>
    )
}

export default UserButtons
