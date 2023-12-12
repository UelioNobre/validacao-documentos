const cnpjs = require('./exemplos/examples-cnpjs');
const validateCNPJ = require('./src/validateCNPJ');

// Valida somente um CNPJ
console.log()
console.log()
try {
  const result = validateCNPJ('11.111.111/1111-11');
  console.log({ result: result })
} catch ({ cause }) {
  console.log(cause)
}
console.log()
console.log()

// Valida vários CNPJs
cnpjs.forEach((cnpj) => {
  try {
    const result = validateCNPJ(cnpj);
    console.log(result)
  } catch ({ cause }) {
    console.log(cause)
  }
});

console.log()
console.log()