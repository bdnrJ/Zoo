import {Link, useNavigate} from 'react-router-dom';

const UserButtons = () => {
    const navigate = useNavigate();
    return (
        <>
            <Link to="/statute">
                <button>Statute</button>
            </Link>
            <Link to="/tickets">
                <button>Tickets</button>
            </Link>
            <Link to="/facilities">
                <button>Facilitites</button>
            </Link>
            <Link to="/foundation">
                <button>Foundation</button>
            </Link>
        </>
    )
}

export default UserButtons
