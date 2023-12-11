const data = require('./exemplos/cpfs-validos');
const validateCPF = require('./src/validateCPF');

// Valida um lote
data.forEach(cpf => {
  try {
    console.log(validateCPF(cpf));
  } catch (error) {
    console.log(error.cause);
  }
});

// Valida somente 1
const validateOne = validateCPF(data[0]);
console.log(validateOne);
