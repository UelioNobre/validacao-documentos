const { cpfs, cnpjs } = require('./exemplos/cpfCnpj');

const CNPJ = require("./src/CNPJ");
const CPF = require("./src/CPF");

console.log("CPFs")
for (const cpf of cpfs) {
  try {
    const result = new CPF(cpf);
    console.log(result.validate());
  } catch (error) {
    console.log(error.message)
  }
}

console.log("\n")
console.log("CNPJs")
for (const cnpj of cnpjs) {
  try {
    const result = new CNPJ(cnpj);
    console.log(result.validate());
  } catch ({ message }) {
    console.log(message)
  }
}