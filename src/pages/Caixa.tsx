import { useRef, useState } from "react";
import { getChanges } from "../services/axios";
import Header from "../components/header/Hearder";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import ErrorAlert from "../components/error-alert/ErrorAlert";

type ExchangeResult = {
  moneyHundred: number;
  moneyTen: number;
  moneyOne: number;
  initialChangeValue: number;
};

export function Caixa() {
  const [purchaseValue, setPurchaseValue] = useState("");
  const [moneyDelivered, setMoneyDelivered] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeResult, setExchangeResult] = useState<ExchangeResult | null>(
    null
  );
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState("");

  const calculateChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await getChanges(
        parseFloat(purchaseValue),
        parseFloat(moneyDelivered)
      );
      if (result.error) {
        setLoading(false);
        setShowAlert(true);
        setExchangeResult(null);
        return;
      }
      formRef.current?.reset();
      setExchangeResult(result.change);
      setValues(`$${moneyDelivered} para a compra de $${purchaseValue}`);
      setLoading(false);
    } catch (error) {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 mt-10 flex flex-col lg:gap-10 gap-5 overflow-y-auto items-center">
        <h1 className="sm:text-poppins_50 text-poppins_30 text-black_75 text-center">
          Troco em Notas
        </h1>
        <h3 className="sm:text-poppins_20 text-poppins_14 text-black_75 text-center">
          Insira o valor da compra realizada e o valor total pago.
        </h3>
        <form
          ref={formRef}
          onSubmit={calculateChange}
          className="flex flex-col items-center gap-10 w-full"
        >
          <Input
            setValue={setPurchaseValue}
            inputType={"number"}
            inputPlaceholder="Valor total da compra"
          />
          <Input
            setValue={(e) => {
              setMoneyDelivered(e);
              setShowAlert(false);
            }}
            inputType={"number"}
            inputPlaceholder={"Valor pago"}
          />
          <Button
            buttonText={"Calcular Troco"}
            buttonType="submit"
            loading={loading}
          />
          {showAlert && (
            <ErrorAlert
              alertText={"Por favor, insira um valor válido."}
              alertType={"warning"}
            />
          )}

          {exchangeResult && (
            <div className="sm:text-poppins_20 text-poppins_16 text-black_75 flex flex-col lg:gap-5 gap-4 mt-5 text-center">
              <p className="sm:text-poppins_26 text-poppins_22">
                Seu troco de {values} é de R${exchangeResult.initialChangeValue}
              </p>
              <p>Notas de R$100: {exchangeResult.moneyHundred}</p>
              <p>Notas de R$10: {exchangeResult.moneyTen}</p>
              <p>Notas de R$1: {exchangeResult.moneyOne}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
