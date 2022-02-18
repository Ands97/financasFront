import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import './footer.css'

const Footer = ()=>{
    return (
        <footer >
            <div className='footer'>
                <div className='firstBlock'>
                    <span>O melhor lugar para você controlar suas finanças.</span>
                    <div className='politcs'>
                        <a href='#'>Termo de uso</a>
                        <a href='#'>Política de privacidade</a>
                    </div>
                </div>
                <div className='secondBlock'> 
                   <div className='socials'>
                       Redes Sociais:
                        <div className='socialNetwork'>
                           <a href='#'><FacebookIcon style={{color: '#FFF'}}/></a> 
                           <a href='#'><InstagramIcon style={{color: '#FFF'}}/></a>
                           <a href='#'><LinkedInIcon style={{color: '#FFF'}}/></a>
                           <a href='#'><TwitterIcon style={{color: '#FFF'}}/></a>
                        </div>
                   </div>
                   <div className='download'>
                       Baixe o App:
                        <div className='appStore'>
                            <a href='#'><img src='./appleStore.png'/></a>
                            <a href='#'><img src='./playStore.png'/></a>
                        </div>
                   </div>
                    <div className='developer'>
                        <span>Developed by <a href='https://ands97.github.io/Portifolio/' target='blank'>Anderson Afonso</a></span>
                    </div>   
                </div>
            </div>
        </footer>
    )
}

export default Footer;