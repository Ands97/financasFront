import CloseIcon from "@material-ui/icons/Close";
import { useContext, useEffect, useState } from "react";
import { BalanceContext } from "../../contexts/BalanceContext";
import { TransactionContext } from "../../contexts/TransactionContext";
import "./addTransaction.css";

export const AddTransaction = () => {
  //contexts
  const {
    addNewTransaction,
    accounts,
    categories,
    getAccounts,
    getCategories,
  } = useContext(TransactionContext);

  const {
    setShowAddTransaction,
    showAddTransaction,
    getResume,
    getIncome,
    getExpense,
  } = useContext(BalanceContext);

  //States
  const [transactionType, setTransactionType] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [accountSelected, setAccountSelected] = useState("");
  const [accountDestinationSelected, setAccountDestinationSelected] =
    useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [transactionPaymentDate, setTransactionPaymentDate] = useState("");

  //Functions
  const closeMenu = () => {
    setShowAddTransaction(false);
  };

  const newTransaction = async () => {
    if (transactionType === "transfer") {
      setCategorySelected("transfer");
    }
    if (transactionType === "" || transactionType === "Selecione") {
      alert("Selecione o tipo de operação");
    } else if (transactionDescription === "") {
      alert("Você deve inserir uma descrição");
    } else if (transactionValue === "") {
      alert("O valor não pode ser igual a 0");
    } else if (transactionDate === "") {
      alert("Você deve inserir uma data de vencimento");
    } else if (
      accountSelected === "" ||
      accountSelected === "Selecione a conta"
    ) {
      alert("Você deve selecionar uma conta");
    } else if (
      (transactionType === "transfer" && accountDestinationSelected === "") ||
      accountDestinationSelected === "Selecione a conta destino"
    ) {
      alert("Você deve inserir a conta destino");
    } else if (
      categorySelected === "" ||
      categorySelected === "Selecione a categoria"
    ) {
      alert("Você deve selecionar uma categoria");
    } else if (transactionStatus === true && transactionPaymentDate === "") {
      alert("Você deve inserir a data de pagamento");
    } else {
      await addNewTransaction(
        transactionType,
        transactionDescription,
        transactionValue,
        transactionDate,
        transactionPaymentDate,
        transactionStatus,
        categorySelected,
        accountSelected,
        accountDestinationSelected
      );
      setShowAddTransaction(false);
      setTransactionType("");
      setTransactionDescription("");
      setTransactionValue("");
      setTransactionDate("");
      setTransactionPaymentDate("");
      setTransactionStatus(false);
      setCategorySelected("");
      setAccountSelected("");
      getResume();
      getIncome();
      getExpense();
    }
  };

  const screenMobile = () => {
    const screenWidth = window.screen.width
    if(screenWidth < '500'){
      return '80vw'
    }else{
      return '25vw'
    }
  }
 
  //Effects
  useEffect(() => {
    getAccounts();
    getCategories();
  }, []);

  return (
    <div
      className="addTransaction"
      style={{ width: showAddTransaction ? "100%" : "0px" }}
    >
      <div
        className="modal"
        style={{ width: showAddTransaction ? screenMobile() : "0px" }}
      >
        <div className="headerTransaction">
          <div className="closeIcon" onClick={closeMenu}>
            <CloseIcon />
          </div>
          <div className="title">
            <h3>Adicionar Transação</h3>
          </div>
        </div>
        <form>
          <div className="transactionType">
            <span>Isso é uma: </span>
            <div className="payment">
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option>Selecione</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
                <option value="transfer">Transferência</option>
              </select>
            </div>
          </div>
          <div className="description">
            <input
              type="text"
              required={true}
              value={transactionDescription}
              onChange={(e) => setTransactionDescription(e.target.value)}
            />
            <label>Descrição</label>
          </div>
          <div className="valueAndDate">
            <div className="transactionValue">
              R${" "}
              <input
                type="number"
                placeholder="00,00"
                value={transactionValue}
                onChange={(e) => setTransactionValue(e.target.value)}
              />
            </div>
            <div className="date">
              Vencimento:{" "}
              <input
                type="date"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
              />
            </div>
          </div>

          <div className="payment">
            <select
              value={accountSelected}
              onChange={(e) => setAccountSelected(e.target.value)}
            >
              <option>Selecione a conta</option>
              {accounts.map((item) => (
                <option value={item.account}>{item.account}</option>
              ))}
            </select>
          </div>
          {transactionType === "transfer" && (
            <>
              <div className="payment">
                <select
                  value={accountDestinationSelected}
                  onChange={(e) =>
                    setAccountDestinationSelected(e.target.value)
                  }
                >
                  <option>Selecione a conta destino</option>
                  {accounts.map((item) => (
                    <option value={item.account}>{item.account}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div className="paidAndCategory">
            <div className="paid">
              <label>Pago?</label>
              <input
                type="checkbox"
                checked={transactionStatus}
                onChange={(e) => setTransactionStatus(e.target.checked)}
              />
            </div>
            {transactionType === "transfer" ? (
              <div className="category">
                <select
                  value={categorySelected}
                  onChange={(e) => setCategorySelected(e.target.value)}
                >
                  <option>Selecione a categoria</option>
                  <option value={"transfer"}>Transferência</option>
                </select>
              </div>
            ) : (
              <div className="category">
                <select
                  value={categorySelected}
                  onChange={(e) => setCategorySelected(e.target.value)}
                >
                  <option>Selecione a categoria</option>
                  {categories.map((item) => (
                    <optgroup label={item.category}>
                      {item.subCategory.map((subCat) => (
                        <option value={subCat}>{subCat}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            )}
          </div>
          {transactionStatus && (
            <div className="paymentDate">
              Pagamento:{" "}
              <input
                type="date"
                value={transactionPaymentDate}
                onChange={(e) => setTransactionPaymentDate(e.target.value)}
              />
            </div>
          )}
          <div className="boxButton">
            <div className="addButton" onClick={newTransaction}>
              Adicionar
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
