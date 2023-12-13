const validateCPF = require('./src/validateCPF');
const { cpfsValidos, cpfsInvalidos } = require('./exemplos/cpfs');
const cpfs = [...cpfsValidos, ...cpfsInvalidos];

// Verificando vários CPF válidos
console.log("\n\nValidar vários CPFs");
for (const cpf of cpfs) {
  try {
    const result = validateCPF(cpf)
    console.log({ result });
  } catch (error) {
    console.log(error.cause);
  }
};

console.log("\n\nValidar somente um CPF");
try {
  const result = validateCPF(cpfsValidos[0])
  console.log({ result });
} catch (error) {
  console.log(error.cause);
}
