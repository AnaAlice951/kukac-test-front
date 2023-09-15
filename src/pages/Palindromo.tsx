import React, { useRef, useState } from "react";
import { getPalindromes } from "../services/axios";
import Input from "../components/input/Input";
import Header from "../components/header/Hearder";
import Button from "../components/button/Button";
import ErrorAlert from "../components/error-alert/ErrorAlert";

export function Palindromo() {
  const [startNumber, setStartNumber] = useState<string>("");
  const [endNumber, setFinalNumber] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [palindromes, setPalindromes] = useState<number[]>([]);
  const [hasError, setHasError] = useState(false);
  const [interval, setInterval] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const findPalindromes = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const result = await getPalindromes(startNumber, endNumber);
    formRef.current?.reset();
    if (result.error) {
      setHasError(true);
      setShowResult(false);
      setLoading(false);
      return;
    }
    setPalindromes(result.palindromes);
    setShowResult(true);
    setHasError(false);
    setInterval(`${startNumber} a ${endNumber}`);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="p-4 mt-10 flex flex-col lg:gap-10 gap-5 overflow-y-auto items-center">
        <h1 className="sm:text-poppins_50 text-poppins_30 text-black_75 text-center">
          Números Palíndromos
        </h1>
        <h3 className="sm:text-poppins_20 text-poppins_14 text-black_75 text-center">
          Digite um intervalo de números para encontrar os números palíndromos
          dentro deste intervalo.
        </h3>
        <form
          ref={formRef}
          onSubmit={findPalindromes}
          className="flex flex-col gap-10 w-full items-center"
        >
          <Input
            setValue={setStartNumber}
            inputType={"number"}
            inputPlaceholder={"Início do intervalo"}
            min={0}
          />
          <Input
            setValue={setFinalNumber}
            inputType={"number"}
            inputPlaceholder={"Fim do intervalo"}
            min={0}
          />
          <Button
            buttonText={"Encontrar Palíndromos"}
            buttonType="submit"
            loading={loading}
          />
          {hasError && (
            <ErrorAlert
              alertText={"Por favor, insira um intervalo válido."}
              alertType={"warning"}
            />
          )}
        </form>
        {showResult && (
          <div className="lg:mx-20 mx-8">
            <h2 className="sm:text-poppins_25 text-poppins_20  text-black_75">
              Números palíndromos no intervalo de {interval}:
            </h2>
            <p className="sm:text-poppins_18 text-poppins_16 text-black_75 leading-[50px] text-justify">
              {palindromes.join(", ")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
