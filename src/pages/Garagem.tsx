import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  getGarageJson,
  removeGarageJson,
  savedVehiclesOnJson,
} from "../services/axios";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import Select from "../components/select/Select";
import Header from "../components/header/Hearder";

type Car = {
  model: string;
  fabricationYear: number;
  brand: string;
  doorsCount: number;
};

type Motorcycle = {
  model: string;
  fabricationYear: number;
  brand: string;
  tiresCount: number;
  passengersCount: number;
};

export type IncomingVehicle =
  | (Car & { vehicleType: string })
  | (Motorcycle & { vehicleType: string });

export function Garagem() {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [fabricationYear, setFabricationYear] = useState<number>();
  const [vehicleType, setVehicleType] = useState<string>("");
  const [passengersCount, setPassengersCount] = useState<number>();
  const [doorsCount, setDoorsCount] = useState<number>();
  const [garageData, setGarageData] = useState<IncomingVehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const optionRef = useRef<HTMLOptionElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const tiresCount = 2;

  useEffect(() => {
    const refresh = async () => {
      const data = await getGarageJson().catch(() => {
        toast.warning("Algo deu errado! Por favor, tente novamente.", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "custom-toaster",
        });
      });
      return data ? data : "";
    };
    refresh().then((response) => setGarageData(response));
  }, []);

  const saveVehicle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const vehicle = {
      model,
      brand,
      fabricationYear: Number(fabricationYear),
      passengersCount: Number(passengersCount),
      doorsCount: Number(doorsCount),
      tiresCount: Number(tiresCount),
      vehicleType,
    };
    setLoading(true);
    try {
      const garageData = await savedVehiclesOnJson(vehicle);
      setGarageData(garageData.change);
      formRef.current?.reset();
      optionRef.current?.setAttribute("selected", "true");
      toast.success("Veiculo adicionado à garagem!", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "custom-toaster",
      });
    } catch (error) {
      toast.warning("Algo deu errado! Por favor, tente novamente.", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "custom-toaster",
      });
    } finally {
      setLoading(false);
      setVehicleType("");
    }
  };

  const removeGarage = async () => {
    try {
      await removeGarageJson();
      setGarageData([]);
      toast.success("Os dados da garagem foram resetados!", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "custom-toaster",
      });
    } catch (error) {
      toast.warning("A garagem está vazia!", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: "custom-toaster",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-row p-4 max-lg:flex-col max-lg:overflow-y-auto mt-10 ">
        <div className="flex items-center lg:overflow-y-auto lg:h-screen w-full flex-col lg:gap-10 gap-5 lg:pb-36">
          <h1 className="sm:text-poppins_50 text-poppins_30 text-black_75 text-center">
            Organizando a garagem
          </h1>
          <h3 className="sm:text-poppins_20 text-poppins_14 text-black_75 text-center">
            Preenche as informações sobre o veículo.
          </h3>
          <form
            onSubmit={saveVehicle}
            ref={formRef}
            className="flex flex-col items-center gap-10 w-full"
          >
            <Select
              optionRef={optionRef}
              setValue={setVehicleType}
              firstOptionValue={"car"}
              firstOptionName="Carro"
              secondOptionValue={"motorcycle"}
              secondOptionName="Moto"
              optionPlaceholder={"Selecione um tipo de veículo"}
            />
            <Input
              setValue={setModel}
              inputType={"text"}
              inputPlaceholder={"Modelo"}
            />
            <Input
              setValue={setBrand}
              inputType={"text"}
              inputPlaceholder={"Marca"}
            />
            <Input
              setValue={(value) => setFabricationYear(Number(value))}
              inputType={"number"}
              inputPlaceholder={"Ano de fabricação"}
              min={0}
            />
            {vehicleType == "motorcycle" && (
              <Select
                setValue={(value) => setPassengersCount(Number(value))}
                firstOptionValue={1}
                secondOptionValue={2}
                optionPlaceholder={"Número de Passageiros"}
              />
            )}
            {vehicleType == "car" && (
              <Select
                setValue={(value) => setDoorsCount(Number(value))}
                firstOptionValue={2}
                secondOptionValue={4}
                optionPlaceholder={"Quantidade de portas"}
              />
            )}

            <Button
              buttonText={"Adicionar veículo"}
              buttonType="submit"
              loading={loading}
            />
          </form>
          <Button buttonText={"Resetar Garagem"} onClickAction={removeGarage} />
        </div>
        {garageData.length > 0 && (
          <div className="max-lg:mt-10 max-lg:pt-10 lg:pb-36 sm:text-poppins_20 text-poppins_14 text-black_75 lg:overflow-y-scroll w-full lg:h-screen flex flex-col items-center max-lg:border-t border-gray-600">
            <div className="max-lg:text-center">
              <h2 className="text-poppins_20 font-bold">
                Total de veículos na garagem
              </h2>
              <p>
                Carros:{" "}
                {
                  garageData.filter((vehicle) => vehicle.vehicleType === "car")
                    .length
                }
              </p>
              <p>
                Motos:{" "}
                {
                  garageData.filter(
                    (vehicle) => vehicle.vehicleType === "motorcycle"
                  ).length
                }
              </p>
              <h2 className="text-poppins_20 font-bold mt-10">
                Informações sobre os veículos:
              </h2>
            </div>
            <ul>
              {garageData.map((vehicle, index) => (
                <li key={index} className="mt-2 p-4 flex flex-col">
                  <span className="font-bold">
                    Modelo: <span className="font-normal">{vehicle.model}</span>
                  </span>
                  <span className="font-bold">
                    Ano de Fabricação:{" "}
                    <span className="font-normal">
                      {vehicle.fabricationYear}
                    </span>
                  </span>
                  <span className="font-bold">
                    Marca: <span className="font-normal">{vehicle.brand}</span>
                  </span>
                  {vehicle.vehicleType === "motorcycle" ? (
                    <>
                      <span className="font-bold">
                        Tipo de Veículo: <span className="font-bold">Moto</span>
                      </span>
                      <span className="font-bold">
                        Número de Pneus:{" "}
                        <span className="font-normal">
                          {(vehicle as Motorcycle).tiresCount}
                        </span>
                      </span>
                      <span className="font-bold">
                        Número de Passageiros:{" "}
                        <span className="font-normal">
                          {(vehicle as Motorcycle).passengersCount}
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold">
                        Tipo de Veículo:{" "}
                        <span className="font-normal">Carro</span>
                      </span>
                      <span className="font-bold">
                        Quantidade de portas:{" "}
                        <span className="font-normal">
                          {(vehicle as Car).doorsCount}
                        </span>
                      </span>
                    </>
                  )}
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
