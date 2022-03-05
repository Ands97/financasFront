import { useContext, useEffect } from 'react'
import { BalanceContext } from "../../contexts/BalanceContext";

import Card from '../../components/Card';
import { AddTransaction } from '../../components/AddTransaction';
import './resume.css';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Chart } from 'react-google-charts';
import Header from '../../components/Header';


const Resume = () => {

    const {income, expense, handleAddAction} = useContext(BalanceContext);
    const profit = income - expense;
    const data = [
        ['Categoria', 'Valor'],
        ['Alimentação', 150],
        ['Energia',  70],
        ['Água',  40],
        ['Roupas',  400],
        ['Aluguel',  500],
    ];
    
    return (
        <>
        <Header />
        <div className='body'>
            <AddTransaction />
            <div className='resumeMonth'>
                <h2>Resumo do mês:</h2>
                <select className='months'>
                    <option>Fevereiro 2022</option>
                    <option>Março 2022</option>
                    <option>Abril 2022</option>
                </select>
            </div>
            <div className='cardsArea'>
                <Card
                    title={'Receitas'}
                    color={'blue'}
                    value={income.toFixed(2).replace('.', ',')}
                >
                    <LocalAtmIcon style={{ color: '#0089B8' }} />
                </Card>
                <Card
                    title={'Despesas'}
                    color={'red'}
                    value={expense.toFixed(2).replace('.', ',')}
                >
                    <TrendingDownIcon style={{ color: '#80150A' }} />
                </Card>
                <Card
                    title={'Saldo'}
                    color={'green'}
                    value={profit.toFixed(2).replace('.', ',')}
                >
                    <AttachMoneyIcon style={{ color: '#57DBC5' }} />
                </Card>
            </div>
            <section>
                <div className='moreInfo'>
                    <div className='chart'>
                        <h3>Categorias:</h3>
                        <Chart className='chartOriginal' chartType='PieChart' data={data} width={'100%'} height={'400px'}/>
                        <div className='detailsInfo'>
                            <div  className='details'>Ver detalhes</div>
                        </div>
                    </div>
                    <div className='statement'>
                        <h3>Extrato</h3>
                        <div className='statementArea'>
                            <div className='statementInfo'>
                                    <span>25/09/2022</span>
                                    <div className='purchaseInfo'>
                                        <span>Compra</span>
                                        <span>EstabelecimentoEstabelecimentoEstabelecimentoEstabelecimento</span>
                                    </div>
                                    <div className='purchaseData'>
                                        <span className='account'>conta</span>
                                        <span className='value'>R$50,00</span>
                                    </div>
                            </div>
                            <div className='statementInfo'>
                                    <span>25/09/2022</span>
                                    <div className='purchaseInfo'>
                                        <span>Compra</span>
                                        <span>EstabelecimentoEstabelecimentoEstabelecimentoEstabelecimento</span>
                                    </div>
                                    <div className='purchaseData'>
                                        <span className='account'>conta</span>
                                        <span className='value'>R$50,00</span>
                                    </div>
                            </div>
                        </div>
                        <div className='statementButtons'>
                            <div className='seeStatement'>Ver Extrato</div>
                            <div className='addTransactionButton' onClick={handleAddAction}>Adicionar transação</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

export default Resume;