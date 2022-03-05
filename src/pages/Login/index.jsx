import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './login.css';

const Login = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email && password) {
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                navigate('/resume')
            } else {
                alert('email ou senha incorreto!')
            }
        }
    }

    return (
        
        <div className="login">
            <div className='background'></div>
            <div className='screen'>
                <div className='loginBox'>
                    <div className='title'>
                        <h2>$eu Dinheiro</h2>
                        <h5>Organizar, planejar, sobrar.</h5>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className='input'>
                            <input type='text' value={email} onChange={e => setEmail(e.target.value)} required={true}/>
                            <label>Email</label>
                        </div>
                        <div className='input'>
                            <input type='password' value={password} onChange={e => setPassword(e.target.value)} required={true}/>
                            <label>Senha</label>
                        </div>
                        <div className='forgotPassword'>
                            <Link to='#'>Esqueci minha senha</Link>
                        </div>
                        <div className='button' onClick={handleLogin}>
                           Entrar
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login