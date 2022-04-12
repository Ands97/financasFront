import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useApi } from "../../hooks/useApi";
import './register.css'




export const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();


    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault()
        if (email && password) {
            const isRegistered = await auth.register(name, email, password);
            if (isRegistered) {
                navigate('/resume')
            } else {
                alert('Você deve digitar todos os campos')
            }
        }
    }

    return (
        <div className="register">
            <div className='background'></div>
            <div className='screen'>
                <div className='registerBox'>
                    <div className='title'>
                        <h2>$eu Dinheiro</h2>
                        <h5>Organizar, planejar, sobrar.</h5>
                    </div>
                    <form>
                        <div className='input'>
                            <input type='text' value={name} onChange={e => setName(e.target.value)} required={true}/>
                            <label>Nome</label>
                        </div>
                        <div className='input'>
                            <input type='text' value={email} onChange={e => setEmail(e.target.value)} required={true}/>
                            <label>Email</label>
                        </div>
                        <div className='input'>
                            <input type='text' value={password} onChange={e => setPassword(e.target.value)} required={true}/>
                            <label>Senha</label>
                        </div>
                        <div className='button' onClick={handleRegister}>
                           Cadastrar
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}