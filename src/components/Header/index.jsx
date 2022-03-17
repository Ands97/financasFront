import './header.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'



const Header = () => {

    const auth = useContext(AuthContext);

    const [showOptions, setShowOptions] = useState(false);
    const [showOptionLogout, setShowOptionLogout] = useState(false)
    

    const handleOptions = () => {
        if (showOptions) {
            setShowOptions(false)
        } else {
            setShowOptions(true)
        }
    }

    const handleOptionLogout = () => {
        if (showOptionLogout) {
            setShowOptionLogout(false)
        } else {
            setShowOptionLogout(true)
        }
    }
    const logout = ()=>{
        localStorage.removeItem('authToken');
        window.location.href = window.location.href
    }
    return (
        <header className="header">
            {auth.token &&

                <div className='container'>
                    <div className='logo'>
                        <img src="/seuDinheiro.png" alt='Logomarca' />
                    </div>
                    <div className='menuMobile'>
                        <MenuIcon style={{ color: '#003483' }} />
                    </div>
                    <nav className='navigation'>
                        <div className='financialControl' >
                            <div onClick={handleOptions} className='financialControlClick'><p>Controle</p> <KeyboardArrowDownIcon style={{ color: '#003483' }} /></div>
                            <nav className='financialOptions' style={{ height: showOptions ? '130px' : '0px' }}>
                                <ul style={{ display: showOptions ? 'block' : 'none' }}>
                                    <li>
                                        <EqualizerIcon style={{ color: '#003483' }} /> Resumo
                                    </li>
                                    <li>
                                        <AccountBalanceIcon style={{ color: '#003483' }} /> Extrato
                                    </li>
                                    <li>
                                        <CreditCardIcon style={{ color: '#003483' }} /> Contas
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className='profile' onClick={handleOptionLogout}>
                            <div>
                                <span className='account' style={{ height: showOptionLogout ? '30px' : '0px' }}><AccountCircleIcon style={{ color: '#003483' }} /> {auth.username}</span>
                            </div>
                        </div>
                        <div className='logoutBlock' style={{ display: showOptionLogout ? 'block' : 'none' }} onClick={logout}>
                                <span>
                                    <ExitToAppIcon />LogOut
                                </span>
                        </div>
                    </nav>
                </div>
            }
        </header>
    )
}

export default Header;