import CloseIcon from '@material-ui/icons/Close';
import { useContext, useState } from 'react';
import { BalanceContext } from '../../contexts/BalanceContext';
import './addTransaction.css'

export const AddTransaction = () => {
    const { setShowAddTransaction, showAddTransaction } = useContext(BalanceContext);



    const closeMenu = () => {
        setShowAddTransaction(false)
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
                            <input type='checkbox' />
                            Receita
                        </label>
                    </div>
                    <div className='description'>
                        <input type='text' required={true} />
                        <label>Descrição</label>
                    </div>
                    <div className='valueAndDate'>
                        <div className='transactionValue'>
                           R$ <input type='text' placeholder='00,00' />
                        </div>
                        <div className='date'>
                            Vencimento: <input type='date' />
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
                            <input type='checkbox' />
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
                        <div className='addButton'>Adicionar</div>
                    </div>
                    
                </form>

            </div>
        </div>
    )
}

