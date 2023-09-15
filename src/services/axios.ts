import axios from "axios";
import { IncomingVehicle } from "../pages/Garagem";

export type CepResponse = {
  erro?: boolean;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  siafi: string;
  ddd: string;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

async function getPalindromes(startNumber: string, endNumber: string) {
  const response = await client.post("/palindrome", { startNumber, endNumber });
  return response.data;
}

async function getChanges(purchaseValue: number, moneyDelivered: number) {
  const response = await client.post("/cashier", {
    purchaseValue,
    moneyDelivered,
  });
  return response.data;
}

async function savedVehiclesOnJson(vehicle: IncomingVehicle) {
  const response = await client.post("/save-garage", { vehicle });
  return response.data;
}

async function getGarageJson() {
  const response = await client.get("/get-garage", {});
  return response.data.change;
}

async function removeGarageJson() {
  const response = await client.delete("/delete-garage", {});
  return response;
}

async function fetchCEP(cep: string) {
  try {
    const response = await axios.get<CepResponse>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return;
  }
}

export {
  getPalindromes,
  getChanges,
  savedVehiclesOnJson,
  getGarageJson,
  removeGarageJson,
  fetchCEP,
};
