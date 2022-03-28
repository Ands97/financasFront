import { useContext, useState } from 'react';
import { TransactionContext } from '../../contexts/TransactionContext';
import { useApi } from '../../hooks/useApi';
import './modalCategory.css';

export const ModalCategory = () => {

    const {categoryId, setShowModalCategory, getCategories} = useContext(TransactionContext)

    const api = useApi();
    
    const [titleField, setTitleField] = useState('');

    const updateCategory = async() => {
        await api.updateCategory(categoryId._id, titleField);
        setShowModalCategory(false);
        getCategories();
        setTitleField('')
    }

    return (
        <div className="modalCategory">
            <div className='modalArea'>
                <h3>Editar Categoria:</h3>
                <div className='inputEdit'>
                    <input type='text' placeholder='Digite a categoria atualizada' value={titleField} onChange={e=>setTitleField(e.target.value)} />
                </div>
                <div className='actionButtons'>
                    <span onClick={()=>setShowModalCategory(false)}>CANCELAR</span>
                    <span onClick={updateCategory}>SALVAR</span>
                </div>
            </div>
        </div>
    )
}