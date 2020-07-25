import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, error, request, clearError } = useHttp()
    const message = useMessage()
    
    const [form, setForm] = useState({
    email: '', password: ''
})

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    
    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
        } catch (error) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (error) {
            
        }
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
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="card-action">
                    <button
                        className="btn yellow darken-4"
                        style={{ marginRight: 10 }}
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Войти
                        </button>
                    <button
                        className="btn grey lighten-1 black-exit"
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Регистрация
                        </button>
            </div>
        </div>
    </div>
</div>
)
}

export default AuthPage