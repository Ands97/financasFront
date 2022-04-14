import Header from "../../components/Header";
import { FaWallet } from "react-icons/fa";
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
  useEffect(() => {
    getBillsToPay();
  }, []);
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
          </div>
          {billsToPay.map((item, index) => (
            <div className="billsToPayList" key={index}>
              <div>
                <span>{item.transactionDate}</span>
              </div>
              <div>
                <span>{item.transactionDescription}</span>
              </div>
              <div>
                <span>{item.transactionCategory}</span>
              </div>
              <div>
                <span>{item.transactionValue}</span>
              </div>
              <div className="icon" onClick={() => billsId(item._id)}>
                <FaWallet />
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
