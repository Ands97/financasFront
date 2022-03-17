import CloseIcon from '@material-ui/icons/Close';
import { useContext, useEffect, useState } from 'react';
import { BalanceContext } from '../../contexts/BalanceContext';
import { TransactionContext } from '../../contexts/TransactionContext';
import './addTransaction.css'

export const AddTransaction = () => {
    const addTransaction = useContext(TransactionContext);

    const { setShowAddTransaction, showAddTransaction } = useContext(BalanceContext);
    
    const [transactionType, setTransactionType] = useState(false);
    const [transactionDescription, setTransactionDescription] = useState('');
    const [transactionValue, setTransactionValue] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [transactionStatus, setTransactionStatus] = useState(false);
    
    

    const closeMenu = () => {
        setShowAddTransaction(false)
    }

    const newTransaction = async ()=>{
        if(
            transactionDescription &&
            transactionValue &&
            transactionDate
            ){
                await addTransaction.addNewTransaction(
                    transactionType, 
                    transactionDescription,
                    transactionValue,
                    transactionDate,
                    transactionStatus
                    )
            }
            setShowAddTransaction(false)
            setTransactionType(false)
            setTransactionDescription('')
            setTransactionValue('')
            setTransactionDate(new Date)
            setTransactionStatus(false)
    }

    
    
    return (
        <div className='addTransaction' style={{ display: !showAddTransaction && 'none' }}>
            <div className='modal'>
                <div className='headerTransaction'>
                    <div className='closeIcon' onClick={closeMenu}>
                        <CloseIcon />
                    </div>
                    <div className='title'>
                        <h3>Adicionar Transação</h3>
                    </div>
                </div>
                <form>
                    <div className='transactionType'>
                        <span>Isso é uma: </span>
                        <label className='switch'>
                            Despesa
                            <input 
                                type='checkbox'  
                                checked={transactionType}
                                onChange={e=>setTransactionType(e.target.checked)}
                                name='uncontrolled'
                            />
                            Receita
                        </label>
                    </div>
                    <div className='description'>
                        <input type='text' required={true} value={transactionDescription} onChange={e=>setTransactionDescription(e.target.value)}/>
                        <label>Descrição</label>
                    </div>
                    <div className='valueAndDate'>
                        <div className='transactionValue'>
                            R$ <input 
                                    type='number' 
                                    placeholder='00,00' 
                                    value={transactionValue} 
                                    onChange={e=>setTransactionValue(e.target.value)}
                                />
                        </div>
                        <div className='date'>
                            Vencimento: <input type='date' value={transactionDate} onChange={e=>setTransactionDate(e.target.value)}/>
                        </div>
                    </div>

                    <div className='payment'>
                        <select>
                            <option>Carteira</option>
                            <option>Nubank</option>
                            <option>Inter</option>
                        </select>
                    </div>
                    <div className='paidAndCategory'>
                        <div className='paid'>
                            <label>Pago?</label>
                            <input type='checkbox' 
                                checked={transactionStatus}
                                onChange={e=>setTransactionStatus(e.target.checked)}
                                />
                        </div>
                        <div className='category'>
                            <select>
                                <option>Alimentação</option>
                                <option>Aluguel</option>
                                <option>Carro</option>
                            </select>
                        </div>
                    </div>
                    <div className='boxButton'>
                        <div className='addButton' onClick={newTransaction}>Adicionar</div>
                    </div>

                </form>

            </div>
        </div>
    )
}

