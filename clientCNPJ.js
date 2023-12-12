const cnpjs = require('./exemplos/examples-cnpjs');
const validateCNPJ = require('./src/validateCNPJ');

// Valida somente um CNPJ
try {
  const cnpj = cnpjs[0];
  const result = validateCNPJ(cnpj);
  console.log(result)
} catch ({ message }) {
  console.log(message)
}

// Valida vários CNPJs
cnpjs.forEach((cnpj) => {
  try {
    const result = validateCNPJ(cnpj);
    console.log({ valid: result, cnpj })
  } catch ({ message }) {
    console.log({ message, cnpj })
  }
});
