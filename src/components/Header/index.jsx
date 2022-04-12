import './header.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ClassIcon from '@material-ui/icons/Class';
import {MdOutlinePayment, MdPayments} from 'react-icons/md'
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';



const Header = () => {
    //Contexts
    const auth = useContext(AuthContext);

    //States
    const [showOptions, setShowOptions] = useState(false);
    const [showOptionLogout, setShowOptionLogout] = useState(false);
    const [showPaymentOption, setShowPaymentOption] = useState(false)

    //Functions
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

    const logout = () => {
        localStorage.removeItem('authToken');
        window.location.href = window.location.href
    }

    return (
        <header className="header">
            {auth.token &&

                <div className='container'>
                    <div className='logo'>
                        <Link to='/resume'><img src="/seuDinheiro.png" alt='Logomarca' /></Link>
                    </div>
                    <div className='menuMobile'>
                        <MenuIcon style={{ color: '#003483' }} />
                    </div>
                    <nav className='navigation'>
                        <div className='payments'>
                            <p>Pagamentos</p> <KeyboardArrowDownIcon style={{ color: '#003483' }} />

                            <nav className='paymentOptions'>
                                <ul>
                                    <li><MdOutlinePayment style={{color: '#003483'}}/>Contas a Pagar </li>
                                    <li><MdPayments style={{color: '#003483'}} />Contas a Receber</li>
                                </ul>
                            </nav>
                        </div>
                        <div className='financialControl' >
                            <div onClick={handleOptions} className='financialControlClick'><p>Controle</p> <KeyboardArrowDownIcon style={{ color: '#003483' }} /></div>
                            <nav className='financialOptions' style={{ height: showOptions ? 'auto' : '0px' }}>
                                <ul style={{ display: showOptions ? 'block' : 'none' }}>
                                    <li>
                                        <EqualizerIcon style={{ color: '#003483' }} /> <Link to='/resume'>Resumo</Link>
                                    </li>
                                    <li>
                                        <AccountBalanceIcon style={{ color: '#003483' }} /> <Link to='/statement'>Extrato</Link>
                                    </li>
                                    <li>
                                        <CreditCardIcon style={{ color: '#003483' }} /><Link to='/accounts'>Contas</Link>
                                    </li>
                                    <li>
                                        <ClassIcon style={{ color: '#003483' }} /><Link to='/categories'>Categorias</Link>
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