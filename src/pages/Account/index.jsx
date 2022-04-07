import Header from '../../components/Header';
import './account.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../../contexts/TransactionContext';
import { useApi } from '../../hooks/useApi';
import { ModalAccount } from '../../components/ModalAccount';


export const Account = () => {

    //Hook useApi
    const api = useApi()

    //Contexts
    const {
        accounts,
        setAccounts,
        accountId,
        setAccountId,
        showModalAccount,
        setShowModalAccount,
        getAccounts
    } = useContext(TransactionContext);

    //States
    const [titleField, setTitleField] = useState('');

    //Functions
    const getAccountId = async (id) => {
        let res = await api.getAccountid(id);
        setAccountId(res)
        setShowModalAccount(true)

    }

    const newAccount = async () => {
        if (titleField) {
            await api.newAccount(titleField);
            getAccounts();
            setTitleField('')
        } else {
            alert('Você deve digitar algo!')
        }
    }

    const removeAccount = async (id) => {
        await api.removeAccount(id);
        getAccounts();
    }

    //useEffect
    useEffect(() => {
        getAccounts()
    }, [])

    return (
        <>
            <Header />
            <div className='account'>
                <h1>Contas:</h1>
                <div className='accountArea'>
                    <ul>
                        {accounts.map((item, index) => (
                            <li key={item._id}>{item.account}
                                <div className='icons'>
                                    <div className='icon' onClick={() => removeAccount(item._id)}>
                                        <DeleteIcon style={{ color: '#003483' }} />
                                    </div>
                                    <div className='icon' onClick={() => getAccountId(item._id)}>
                                        <EditIcon style={{ color: '#003483' }} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='inputArea'>
                        <div className='inputAccount'>
                            <input type='text' placeholder='Adicionar nova conta' value={titleField} onChange={e => setTitleField(e.target.value)} />
                        </div>

                        <button type='button' className='newAccount' onClick={newAccount}>Adicionar</button>
                    </div>
                </div>
            </div>
            <div style={{ display: showModalAccount ? 'block' : 'none' }}>
                <ModalAccount />
            </div>
        </>
    )
};