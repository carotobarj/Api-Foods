import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={s.container} >
            <div className={s.inicio}>
                <h1>Welcome</h1>
                <div className={s.link}>
                    <Link to='/home'>
                        <button className={s.btn}>Click here to get started 🧉</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;