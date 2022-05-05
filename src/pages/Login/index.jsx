import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useApi } from '../../hooks/useApi';
import './login.css';

const Login = () => {

    const auth = useContext(AuthContext);
    const api = useApi();
    const navigate = useNavigate();
    
  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false)

    const handleLogin = async () => {
      if (email && password) {
          setShowLoader(true);
          const res = await api.signin(email, password);
          await auth.signin(email, password);
          setShowLoader(false);
          if (res.status) {
              navigate("/resume");
          } else {
              alert('Email ou senha incorreto')
          }
      }
  };

    return (
      <div className="login">
        <div className="background"></div>
        <div className="screen">
          <div className="loginBox">
            {showLoader ? (
              <div className="loaderPosition">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <div className="title">
                  <h2>$eu Dinheiro</h2>
                  <h5>Organizar, planejar, sobrar.</h5>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="input">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
                    />
                    <label>Email</label>
                  </div>
                  <div className="input">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                    />
                    <label>Senha</label>
                  </div>
                  <div className="forgotPassword">
                    <Link to="#">Esqueci minha senha</Link>
                  </div>
                  <div className="button" onClick={handleLogin}>
                    Entrar
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default Login