import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './globalStyle.css';

const WelcomePage = () => {
    const [userName, setUserName] = useState('')
    const history = useHistory()

    const onChangeName = (e) => {
        setUserName(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (userName) {
            localStorage.setItem('userName', JSON.stringify({ userName }))
            history.push('/game')
        } else alert('Must Enter Something on the field !!');
    }

    return (
        <form action="" onSubmit={onSubmit}>
            <div className="welcome-page">
                <h1>Welcome To Memory "Simon" Game</h1>

                <input type="text" value={userName} onChange={onChangeName} placeholder="Enter Your Name" />
                <br />
                <input type="submit" value="Start" />
            </div>
        </form >
    )
}

export default WelcomePage;