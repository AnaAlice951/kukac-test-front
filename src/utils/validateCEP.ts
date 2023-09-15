export function validateCEP(cep: string) {
  if (cep.length !== 8) {
    return false;
  }
  return true;
}
