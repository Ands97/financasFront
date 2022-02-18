import './header.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';

const Header = () => {
    const [showOptions, setShowOptions] = useState(false);

    const handleOptions = ()=>{
        if(showOptions){
            setShowOptions(false)
        }else{
            setShowOptions(true)
        }
    }

    return (
        <header className="header">
            <div className='container'>
                <div className='logo'>
                    <img src="/seuDinheiro.png" alt='Logomarca' />
                </div>
                <div className='menuMobile'>
                        <MenuIcon style={{color: '#003483'}}/>
                </div>
                <nav className='navigation'>
                    <div className='financialControl' >
                        <div onClick={handleOptions} className='financialControlClick'><p>Controle</p> <KeyboardArrowDownIcon style={{color: '#003483'}}/></div>
                            <nav className='financialOptions' style={{height: showOptions ? '130px' : '0px'}}>
                                <ul style={{display: showOptions ? 'block' : 'none'}}>
                                    <li>
                                        <EqualizerIcon style={{color: '#003483'}}/> Resumo 
                                    </li>
                                    <li>
                                        <AccountBalanceIcon style={{color: '#003483'}}/> Extrato
                                    </li>
                                    <li>
                                       <CreditCardIcon style={{color: '#003483'}}/> Contas
                                    </li>
                                </ul>
                            </nav>
                    </div>
                    <div className='profile'>
                        <AccountCircleIcon style={{color: '#003483'}}/> Anderson Afonso
                    </div>
                </nav>
            </div>

        </header>
    )
}

export default Header;