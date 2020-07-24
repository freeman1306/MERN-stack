import React, { useState } from 'react'

const AuthPage = () => {
    const [form, setForm] = useState({
    email: '', password: ''
})

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }


return (
<div className="row">
    <div className="col s6 offset-s3">
        <h1>Cut the Link</h1>

        <div className="card blue darken-1">
            <div className="card-content white-text">
                <span className="card-title">Авторизация</span>
                <div className="input-field ">
                        <input
                            placeholder="Email"
                            id="email"
                            type="text"
                            name="email"
                            className="yellow-input"
                            onChange={changeHandler}
                        />
                    <label htmlFor="email">Email</label>
                    </div>
                    
                    <div className="input-field ">
                        <input
                            placeholder="Password"
                            id="password"
                            type="text"
                            name="password"
                            className="yellow-input"
                            onChange={changeHandler}
                        />
                    <label htmlFor="password">First Name</label>
                </div>
            </div>
            <div className="card-action">
                <button className="btn yellow darken-4" style={{marginRight: 10}}>Войти</button>
                <button className="btn grey lighten-1 black-exit">Регистрация</button>
            </div>
        </div>
    </div>
</div>
)
}

export default AuthPage