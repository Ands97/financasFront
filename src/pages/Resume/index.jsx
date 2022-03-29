import { useContext, useEffect, useState } from 'react'
import { BalanceContext } from "../../contexts/BalanceContext";

import Card from '../../components/Card';
import { AddTransaction } from '../../components/AddTransaction';
import './resume.css';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Chart } from 'react-google-charts';
import Header from '../../components/Header';
import Login from '../Login'

import { useApi } from '../../hooks/useApi';



const Resume = () => {

    const api = useApi()
    const {
        handleAddAction,
        getResume,
        statementResume,
        getIncome,
        income,
        getExpense,
        expense
    } = useContext(BalanceContext);

   

    const profit = income - expense;
    const data = [
        ['Categoria', 'Valor'],
        ['Alimentação', 150],
        ['Energia', 70],
        ['Água', 40],
        ['Roupas', 400],
        ['Aluguel', 500],
    ];

    const resume = async () => {
        await getResume();
    }
    const incomeResume = async ()=>{
        await getIncome()
    }
    const expenseResume = async ()=>{
        await getExpense()
    }
    const removeToken = ()=>{
        setTimeout(()=>{
            localStorage.removeItem('authToken')
        }, 60000*30)
        return <Login/>//30 minutos para remover o token
    }
    const formatDate = (dateReceived)=>{
        const date = new Date(dateReceived)
        let dateFormated = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        return dateFormated
    }
    useEffect(() => {
        resume()
        removeToken()
        incomeResume()
        expenseResume()
    }, [])
    return (
        <>
            <Header />
            <div className='body'>
                <AddTransaction />
                <div className='resumeMonth'>
                    <h2>Resumo do mês:</h2>
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
                            <Chart className='chartOriginal' chartType='PieChart' data={data} width={'100%'} height={'400px'} />
                            <div className='detailsInfo'>
                                <div className='details'>Ver detalhes</div>
                            </div>
                        </div>
                        <div className='statement'>
                            <h3>Extrato</h3>
                            <div className='statementArea'>
                                {statementResume.map((item, index) => (
                                    <div className='statementInfo' key={index} style={{color: item.transactionType == false && 'red'}}>
                                        <span>{formatDate(item.transactionPaymentDate)}</span>
                                        <div className='purchaseInfo'>
                                            <span>{item.transactionCategory}</span>
                                            <span className='description'>{item.transactionDescription}</span>
                                        </div>
                                        <div className='purchaseData'>
                                            <span className='account'>{item.transactionAccount}</span>
                                            <span className='value'>R${item.transactionValue}</span>
                                        </div>
                                    </div>
                                ))}
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