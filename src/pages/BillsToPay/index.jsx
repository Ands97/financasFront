import Header from "../../components/Header";
import { FaWallet } from "react-icons/fa";
import DeleteIcon from '@material-ui/icons/Delete';
import "./billsToPay.css";
import { useApi } from "../../hooks/useApi";
import { useContext, useEffect, useState } from "react";
import { ModalBillsToPay } from "../../components/ModalBillsToPay";
import { TransactionContext } from "../../contexts/TransactionContext";

export const BillsToPay = () => {
  const {
    showModalBillsToPay,
    setShowModalBillsToPay,
    billsToPay,
    getBillsToPay,
  } = useContext(TransactionContext);

  const api = useApi();

  const [billsIdItem, setBillsIdItem] = useState([]);

  const billsId = async (id) => {
    const res = await api.getBillsId(id);
    setBillsIdItem(res);
    setShowModalBillsToPay(true);
  };

  const deleteTransaction = async (id) => {
    const res = await api.deleteTransaction(id)
    getBillsToPay()
  }
  const formatDate = (dateReceived) => {
    const date = new Date(dateReceived);
    let dateFormated = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return dateFormated;
  };

  const compareTime = (dateToCompare) => {
    const today = new Date().getTime()
    const formated = new Date(dateToCompare).getTime()
    if(formated < today){
      return true
    }else{
      return false
    }
  }


  useEffect(() => {
    getBillsToPay();
  }, [deleteTransaction]);
  return (
    <>
      <Header />
      <div className="containerB">
        <h1>Contas a Pagar</h1>
        <div className="billsToPayArea">
          <div className="legend">
            <div>Vencimento</div>
            <div>Descrição</div>
            <div>Categoria</div>
            <div>Valor</div>
            <div>Pagar</div>
            <div>Deletar</div>
          </div>
          {billsToPay.map((item, index) => (
            <div className="billsToPayList" key={index} style={{color: compareTime(item.transactionDate) && 'red'}}>
              <div>
                <span>{formatDate(item.transactionDate)}</span>
              </div>
              <div>
                <span>{item.transactionDescription}</span>
              </div>
              <div>
                <span>{item.transactionCategory}</span>
              </div>
              <div>
                <span>R$ {parseFloat(item.transactionValue).toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="icon" onClick={() => billsId(item._id)}>
                <FaWallet />
              </div>
              <div className="icon" onClick={() => deleteTransaction(item._id)}>
                <DeleteIcon/>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModalBillsToPay && (
        <ModalBillsToPay
          value={billsIdItem.transactionValue}
          date={billsIdItem.transactionDate}
          id={billsIdItem._id}
        />
      )}
    </>
  );
};
