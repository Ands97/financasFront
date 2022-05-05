import Header from "../../components/Header";
import "./statement.css";
import SearchIcon from "@material-ui/icons/Search";
import { GrUpdate } from "react-icons/gr";
import { ImCancelCircle } from 'react-icons/im'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { useApi } from "../../hooks/useApi";

export const Statement = () => {
  const api = useApi();

  const { accounts, categories, getAccounts, getCategories } =
    useContext(TransactionContext);

  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [accountSelected, setAccountSelected] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [income, setIncome] = useState([0]);
  const [expense, setExpense] = useState([0]);
  const [showLoader, setShowLoader] = useState(false);

  const getStatementForMonth = async () => {
    
    if(accountSelected === '' || accountSelected === 'Selecione a Conta'){
        alert('Você deve selecionar a conta')
    }else if(categorySelected === '' || categorySelected === 'Selecione a Categoria'){
        alert('Você deve selecionar a categoria')
    }else if(date === ''){
        alert('Você deve selecionar o mês')
    }else{
        setShowLoader(true);
        const res = await api.getStatementForMonth(
            date,
            accountSelected,
            categorySelected
          );
          setList(res);
          setShowLoader(false);
    }
    
  };

  const getIncomeMonth = async () => {
    const res = await api.getIncomeMonth(
      date,
      accountSelected,
      categorySelected
    );
    setIncome(res);
  };

  const getExpenseMonth = async () => {
    const res = await api.getExpenseMonth(
      date,
      accountSelected,
      categorySelected
    );
    setExpense(res);
  };

  const setFunctions = () => {
    getStatementForMonth();
    getExpenseMonth();
    getIncomeMonth();
  };

  const formatDate = (dateReceived) => {
    const date = new Date(dateReceived);
    let dateFormated = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return dateFormated;
  };
  const handleTransaction = async (id) => {
    await api.reverseTransaction(id)
    setFunctions()
  }
  const profit = income - expense;

  useEffect(() => {
    getAccounts();
    getCategories();
  }, []);
  return (
    <>
      <Header />
      <div className="statementPage">
        <div className="inputArea">
          <div className="input">
            <input type="search" placeholder="Search" />
            <SearchIcon style={{ color: "#180052" }} />
          </div>
          <div className="selectType">
            <select
              value={accountSelected}
              onChange={(e) => setAccountSelected(e.target.value)}
            >
              <option>Selecione a Conta</option>
              <option>Todas as Contas</option>
              {accounts.map((item) => (
                <option value={item.account}>{item.account}</option>
              ))}
            </select>
          </div>
          <div className="selectType">
            <select
              value={categorySelected}
              onChange={(e) => setCategorySelected(e.target.value)}
            >
              <option>Selecione a Categoria</option>
              <option>Todas as Categorias</option>
              {categories.map((item) => (
                <optgroup label={item.category}>
                  {item.subCategory.map((subCat) => (
                    <option value={subCat}>{subCat}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="monthInput">
            <input
              type="month"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="button" onClick={setFunctions}>
            <GrUpdate />
          </button>
        </div>
        <div className="statementPageArea">
          {showLoader && (
            <div className="loaderPosition">
              <div className="loader"></div>
            </div>
          )}
          {list.map((item, index) => (
            <div
              className="statementDescriptions"
              key={index}
              style={{ color: item.transactionType == "expense" && "red" }}
            >
              <div className="date">
                {formatDate(item.transactionPaymentDate)}
              </div>
              <div className="description">{item.transactionDescription}</div>
              <div className="value">
                R${item.transactionValue.toFixed(2).replace(".", ",")}
              </div>
              <div className="statementIconsPage">
                <div className="delete" onClick={()=>handleTransaction(item._id)}>
                  <ImCancelCircle style={{color: "#180052"}}/>
                </div>
              </div>
            </div>
          ))}
          <div className="summation">
            <div className="totalIncome">
              Receitas: R${parseFloat(income).toFixed(2).replace(".", ",")}
            </div>
            <div className="totalExpense">
              Despesas: R${parseFloat(expense).toFixed(2).replace(".", ",")}
            </div>
            <div
              className="totalBalance"
              style={{ color: profit < 0 && "red" }}
            >
              Saldo: R${profit.toFixed(2).replace(".", ",")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
