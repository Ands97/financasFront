import { useContext, useState } from 'react'
import { TransactionContext } from '../../contexts/TransactionContext'
import { useApi } from '../../hooks/useApi'
import './modalBillsToPay.css'

export const ModalBillsToPay = (props) => {
    const api = useApi()

    const {accounts, getAccounts, setShowModalBillsToPay, getBillsToPay} = useContext(TransactionContext);
    const [valueField, setValueField] = useState(props.value);
    const [dateField, setDateField] = useState(props.date);
    const [id, setId] = useState(props.id);
    const [tStatus, setTStatus] = useState(true);
    const [account, setAccount] = useState('')
    
    const closeModal = () => {
        setShowModalBillsToPay(false)
    }

    const updateBillsToPay = async () => {
        await api.updateBillsToPay(id, account, valueField, dateField, tStatus);
        setShowModalBillsToPay(false)
        getBillsToPay()
    }

    useState(()=>{
        getAccounts()
    })
    return (
        <div className="modalBillsToPay">
            <div className='modalArea'>
                <h3>Pagar:</h3>
                <div className='account'>
                    <select value={account} onChange={e=>setAccount(e.target.value)}>
                        <option>Selecione a conta</option>
                        {accounts.map((item, index) => (
                            <option key={index} value={item.account}>{item.account}</option>
                        ))}
                    </select>
                </div>
                <div className='inputEdit'>
                    <input type='number' placeholder='0,00' value={valueField} onChange={e=>setValueField(e.target.value)}/>
                </div>
                <div className='inputEdit'>
                    <input type='date' value={dateField} onChange={e=>setDateField(e.target.value)}  />
                </div>
                
                <div className='actionButtons'>
                    <span className='cancel' onClick={closeModal}>CANCELAR</span>
                    <span className='pay' onClick={updateBillsToPay}>PAGAR</span>
                </div>
            </div>
        </div>
    )
}