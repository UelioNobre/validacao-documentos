const validateCNPJ = require('./src/validateCNPJ');
const { cnpjsValidos, cnpjsInvalidos } = require('./exemplos/cnpjs');
const cnpjs = [...cnpjsValidos, ...cnpjsInvalidos];

console.log("\n\nValidar vários CNPJs");
for (const cnpj of cnpjs) {
  try {
    const result = validateCNPJ(cnpj);
    console.log({ result })
  } catch ({ cause }) {
    console.log(cause)
  }
};

console.log("\n\nValidar somente um CNPJ");
try {
  const result = validateCPF(cnpjs[0])
  console.log({ result });
} catch (error) {
  console.log(error.cause);
}
