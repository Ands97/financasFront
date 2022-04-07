import { useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../../contexts/TransactionContext';
import { useApi } from '../../hooks/useApi';
import './modalAccount.css';

export const ModalAccount = () => {
    //Modal on Account's Page, modal to edit account.

    //contexts
    const {
        accountId, 
        setShowModalAccount, 
        getAccounts
    } = useContext(TransactionContext)

    //Hook useApi
    const api = useApi();
    
    //States
    const [titleField, setTitleField] = useState('');

    //Functions
    const updateAccount = async() => {
        await api.updateAccount(accountId._id, titleField);
        setShowModalAccount(false);
        getAccounts();
        setTitleField('')
    }

    return (
        <div className="modalAccount">
            <div className='modalArea'>
                <h3>Editar Conta:</h3>
                <div className='inputEdit'>
                    <input type='text' placeholder='Digite a conta atualizada' value={titleField} onChange={e=>setTitleField(e.target.value)} />
                </div>
                <div className='actionButtons'>
                    <span onClick={()=>setShowModalAccount(false)}>CANCELAR</span>
                    <span onClick={updateAccount}>SALVAR</span>
                </div>
            </div>
        </div>
    )
}