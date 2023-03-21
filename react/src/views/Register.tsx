import React, {useState} from 'react'
import axiosClient from '../axios-client';

const Register = () => {
    const [firstname, setFirstname] = useState("");

    const onSubmit = (e) =>{
        e.preventDefault();

        const payload = {
            firstname: firstname,
            lastname: "testl",
            email: "teste",
            pwd: "testp",
        }

        axiosClient.post('http://localhost:8000/api/register', payload)
            .then(({data}) => {
                console.log("then part of register");
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                const res = err.response;
                console.log(res);
            })
    }

    return (
        <div className="register">
            <form onSubmit={onSubmit}>
                <span>firstname</span>
                <input type="text" onChange={(e) => setFirstname(e.target.value)} />
                <span>lastname</span>
                <input type="text" />
                <input type="submit"  value={"submit :D"}/>
            </form>
        </div>
    )
}

export default Register
