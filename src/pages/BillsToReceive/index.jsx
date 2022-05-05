import Header from "../../components/Header";
import { FaWallet } from "react-icons/fa";
import "./billsToReceive.css";
import { useApi } from "../../hooks/useApi";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { TransactionContext } from "../../contexts/TransactionContext";
import { ModalBillsToReceive } from "../../components/ModalBillsToReceive";

export const BillsToReceive = () => {
  const {
    showModalBillsToReceive,
    setShowModalBillsToReceive,
    billsToReceive,
    getBillsToReceive,
  } = useContext(TransactionContext);

  const api = useApi();

  const [billsIdItem, setBillsIdItem] = useState([]);

  const billsId = async (id) => {
    const res = await api.getBillsId(id);
    setBillsIdItem(res);
    setShowModalBillsToReceive(true);
  };

  const deleteTransaction = async (id) => {
    const res = await api.deleteTransaction(id)
    getBillsToReceive()
  }

  const formatDate = (dateReceived) => {
    const date = new Date(dateReceived);
    let dateFormated = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return dateFormated;
  };

  useEffect(() => {
    getBillsToReceive();
  }, [deleteTransaction]);
  return (
    <>
      <Header />
      <div className="containerB">
        <h1>Contas a Receber</h1>
        <div className="billsToReceiveArea">
          <div className="legend">
            <div>Vencimento</div>
            <div>Descrição</div>
            <div>Categoria</div>
            <div>Valor</div>
            <div>Receber</div>
            <div>Deletar</div>
          </div>
          {billsToReceive.map((item, index) => (
            <div className="billsToReceiveList" key={index}>
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
                <DeleteIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModalBillsToReceive && (
        <ModalBillsToReceive
          value={billsIdItem.transactionValue}
          date={billsIdItem.transactionDate}
          id={billsIdItem._id}
        />
      )}
    </>
  );
};
