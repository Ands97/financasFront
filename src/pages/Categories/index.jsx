import Header from '../../components/Header';
import './category.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../../contexts/TransactionContext';
import { useApi } from '../../hooks/useApi';
import { ModalCategory } from '../../components/ModalCategory';



export const Categories = () => {

    //hook useApi
    const api = useApi()

    //Contexts
    const {
        categories,
        setCategories,
        getCategories,
        showModalCategory,
        setShowModalCategory,
        setCategoryId
    } = useContext(TransactionContext);

    //States
    const [titleField, setTitleField] = useState('');
    const [subCategory, setSubCategory] = useState('');

    //Functions
    const getCategoryId = async (id) => {
        let res = await api.getCategoryId(id);
        setCategoryId(res)
        setShowModalCategory(true)

    }
    
    const sendNewSubCat = async (id) => {
        const newSubCat = api.createSubCategory(id, subCategory)
        setSubCategory('')
        getCategories()
    }

    
    const newCategory = async () => {
        if (titleField) {
            await api.newCategory(titleField);
            getCategories();
            setTitleField('')
        } else {
            alert('Você deve digitar algo!')
        }
    }

    const removeCategory = async (id) => {
        await api.removeCategory(id);
        getCategories();
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <Header />
            <div className='category'>
                <h1>Categorias:</h1>
                <div className='categoryArea'>
                    <div className='categoryListArea'>
                        {categories.map((item, index) => (
                            <div className='categoryListTotal'>
                                <div key={index} className='categoryList'>
                                    <div className='categoryItem'>
                                        <details>
                                            <summary>{item.category}</summary>
                                            {item.subCategory.map((subcat) => (
                                                <div className='subcategory'>- {subcat}</div>
                                            ))}
                                        </details>
                                    </div> 
                                    <div className='icons'>
                                        <div className='icon' onClick={()=>removeCategory(item._id)}>
                                            <DeleteIcon style={{ color: '#003483' }} />
                                        </div>
                                        <div className='icon' onClick={()=>getCategoryId(item._id)}>
                                            <EditIcon style={{ color: '#003483' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className='subcategoryArea' >
                                    <div className='sendNewSub'>
                                        <div className='inputSub'>
                                            <input type='text' id={index} placeholder='Adicionar Subcategoria' value={subCategory} onChange={e=>setSubCategory(e.target.value)}/>
                                        </div>
                                        <button type='button' className='newSubCategory' onClick={()=>sendNewSubCat(item._id)}>Adicionar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='inputArea'>
                        <div className='inputCategory'>
                            <input type='text' placeholder='Adicionar nova categoria' value={titleField} onChange={e => setTitleField(e.target.value)} />
                        </div>
                        <button type='button' className='newCategory' onClick={newCategory}>Adicionar</button>
                    </div>
                </div>
            </div>
            <div style={{ display: showModalCategory ? 'block' : 'none' }}>
                <ModalCategory/>
            </div>

        </>
    )
};