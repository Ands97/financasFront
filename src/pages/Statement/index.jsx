import Header from "../../components/Header"
import './statement.css';
import SearchIcon from '@material-ui/icons/Search';
import {GrUpdate} from 'react-icons/gr';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { MenuItem } from "@material-ui/core";
import { Category } from "@material-ui/icons";
import { useApi } from "../../hooks/useApi";

export const Statement = ()=>{
    const api = useApi()

    const { accounts, categories, getAccounts, getCategories } = useContext(TransactionContext);

    const [date, setDate] = useState('');
    const [list, setList] = useState([]);
    const [accountSelected, setAccountSelected] = useState('');
    const [categorySelected, setCategorySelected] = useState('');
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([])

    const getStatementForMonth = async () => {
        const res = await api.getStatementForMonth(date, accountSelected, categorySelected)
        setList(res)
    }
    
    const getIncomeMonth = async () => {
        const res = await api.getIncomeMonth(date, accountSelected, categorySelected)
        if(!res){
            setIncome('0,00')
        }else{
            setIncome(res)
        }
    }
    console.log(income)
    const getExpenseMonth = async () => {
        const res = await api.getExpenseMonth(date, accountSelected, categorySelected)
        console.log(res)
        if(!res){
            setExpense('0,00')
        }else{
            setExpense(res)
        }
    }

    const setFunctions = ()=>{
        getStatementForMonth()
        getExpenseMonth()
        getIncomeMonth()
    }

    useEffect(()=>{
        getAccounts()
        getCategories()
    }, [])
    return (
        <>
            <Header/>
            <div className="statementPage">
                <div className="inputArea">
                    <div className="input">
                        <input type='search' placeholder="Search"/><SearchIcon style={{color: '#180052'}}/>
                    </div>
                    <div className="selectType">
                        <select value={accountSelected} onChange={e => setAccountSelected(e.target.value)}>
                            <option>Selecione a Conta</option>    
                            <option>Todas as Contas</option>
                            {accounts.map((item) => (
                                <option value={item.account}>{item.account}</option>
                            ))}
                        </select>
                    </div>
                    <div className="selectType">
                        <select value={categorySelected} onChange={e => setCategorySelected(e.target.value)}>
                            <option>Selecione a Categoria</option>
                            <option>Todas as Categorias</option>
                            {categories.map((item) => (
                                <option value={item.category}>{item.category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="monthInput">
                        <input type='month' value={date} onChange={e=>setDate(e.target.value)}/>
                    </div>
                    <button type="button" onClick={setFunctions}><GrUpdate/></button>
                </div>
                <div className="statementPageArea">
                    {list.map((item, index) => (
                        <div className="statementDescriptions" key={index} style={{
                            color: !item.transactionType && 'red'
                            }}>
                            <div className="date">
                                {item.transactionPaymentDate}
                            </div>
                            <div className="description">
                                {item.transactionDescription}
                            </div>
                            <div className="value">
                                R${item.transactionValue}
                            </div>
                            <div className="statementIconsPage">
                                <div className="delete">
                                    <DeleteIcon style={{ color: '#003483' }} />
                                </div>
                                <div className="edit">
                                    <EditIcon style={{ color: '#003483' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    
                    <div className="summation">
                        <div className="totalIncome">
                            Receitas: R${income}
                        </div>
                        <div className="totalExpense">
                            Despesas: R${expense}
                        </div>
                        <div className="totalBalance">
                            Saldo: R${income - expense}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}