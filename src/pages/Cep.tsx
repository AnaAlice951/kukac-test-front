import { useRef, useState } from "react";
import { CepResponse, fetchCEP } from "../services/axios";
import { toast } from "react-toastify";
import Header from "../components/header/Hearder";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { validateCEP } from "../utils/validateCEP";

export function Cep() {
  const [firstCEP, setFirstCEP] = useState<string>("");
  const [secondCEP, setSecondCEP] = useState<string>("");
  const [thirdCEP, setThirdCEP] = useState<string>("");
  const [fourthCEP, setFourthCEP] = useState<string>("");
  const [fifthCEP, setFifthCEP] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [cepResults, setCepResults] = useState<CepResponse[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const toastId = "warning-toast";

  async function handleFetchCEP(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cepsToFetch = [firstCEP, secondCEP, thirdCEP, fourthCEP, fifthCEP];
    const results: CepResponse[] = [];

    for (const cep of cepsToFetch) {
      if (!validateCEP(cep)) {
        toast.warning(
          "CEP inválido. Certifique-se de inserir um CEP com 8 dígitos.",
          {
            toastId: toastId,
            position: toast.POSITION.BOTTOM_CENTER,
            className: "custom-toaster",
          }
        );
        return;
      }
    }
    setLoading(true);
    for (const cep of cepsToFetch) {
      const result = await fetchCEP(cep).catch(() => {
        toast.warning(`Algo deu errado! Por favor, tente novamente.`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "custom-toaster",
        });
      });
      if (result) {
        results.push(result);
      }
      if (result?.erro) {
        toast.warning(`CEP inexistente: ${cep}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "custom-toaster",
        });
      }
    }

    formRef.current?.reset();
    setCepResults(results);
    setLoading(false);
  }

  return (
    <>
      <Header />
      <div className="flex flex-row p-4 max-lg:flex-col overflow-y-auto mt-10">
        <div className="flex items-center max-lg:h-screen w-full flex-col lg:gap-10 gap-5">
          <h1 className="sm:text-poppins_50 text-poppins_30 text-black_75 text-center">
            Verificação de CEP
          </h1>
          <h3 className="sm:text-poppins_20 text-poppins_14 text-black_75 text-center">
            Digite 5 CEPs:
          </h3>
          <form
            ref={formRef}
            onSubmit={handleFetchCEP}
            className="flex flex-col gap-10 items-center w-full"
          >
            <Input
              setValue={(value) => setFirstCEP(value)}
              inputType={"number"}
              inputPlaceholder={"1° CEP"}
              max={99999999}
            />
            <Input
              setValue={(value) => setSecondCEP(value)}
              inputType={"number"}
              inputPlaceholder={"2° CEP"}
              max={99999999}
            />
            <Input
              setValue={(value) => setThirdCEP(value)}
              inputType={"number"}
              inputPlaceholder={"3° CEP"}
              max={99999999}
            />
            <Input
              setValue={(value) => setFourthCEP(value)}
              inputType={"number"}
              inputPlaceholder={"4° CEP"}
              max={99999999}
            />
            <Input
              setValue={(value) => setFifthCEP(value)}
              inputType={"number"}
              inputPlaceholder={"5° CEP"}
              max={99999999}
            />
            <Button
              buttonType="submit"
              buttonText={"Ver região dos CEPS"}
              loading={loading}
            />
          </form>
        </div>
        {cepResults.length > 0 && (
          <div className="max-lg:mt-10 max-lg:pt-10 sm:text-poppins_20 text-poppins_14 text-black_75 lg:overflow-y-scroll w-full lg:h-screen flex flex-col items-center max-lg:border-t border-gray-600">
            {cepResults.map((result, index) => (
              <div key={index}>
                {result.erro ? (
                  <p>CEP inexistente</p>
                ) : (
                  <>
                    <p>CEP: {result.cep}</p>
                    <p>UF: {result.uf}</p>
                    <p>Localidade: {result.localidade}</p>
                    <p>Logradouro: {result.logradouro}</p>
                  </>
                )}
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
