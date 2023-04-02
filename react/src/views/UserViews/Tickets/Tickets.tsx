import ticketsNomrmalImg from '../../../assets/tickets-normal.jpg'
import ticketsGroupImg from '../../../assets/tickets-group.jpg'
import { useNavigate } from 'react-router-dom'

const Tickets = () => {
    const navigate = useNavigate();
    return (
        <div className="tickets">
            <div className="tickets-title">
                <h1>Tickets</h1>
            </div>
            <div className="tickets-rest">

                <div className="tickets-block">
                    <div className="tickets-block-title">
                        Normal tickets
                    </div>
                    <div className="tickets-block-img">
                        <img src={ticketsNomrmalImg} alt="normal ticket image" />
                    </div>
                    <div className="tickets-block-button">
                        <button onClick={() => navigate('/tickets/normal')}>Buy normal tickets</button>
                    </div>
                </div>

                <div className="tickets-block">
                    <div className="tickets-block-title">
                        Group tickets
                    </div>
                    <div className="tickets-block-img">
                        <img src={ticketsGroupImg} alt="group ticket image" />
                    </div>
                    <div className="tickets-block-button">
                        <button onClick={() => navigate('/tickets/group')} >Buy group tickets</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tickets
