function isRepeated(cpf) {
  const sum = cpf
    .map((n) => cpf[0] === n ? 1 : 0)
    .reduce((acc, n) => acc += n);

  if (sum === 11) {
    throw new ReferenceError('Números repetidos');
  }
}

function extractNumbers(cpf) {
  const digits = cpf.match(/\d/g);
  isRepeated(digits);

  if (digits.length !== 11) throw new ReferenceError('CPF inválido');

  return digits.map((digit) => Number.parseInt(digit));
}

function getDigit(values) {
  const sum = values.reduce((acc, d) => acc += d);
  const verify = sum * 10 % 11
  return verify !== 10 ? verify : 0
}

function calculateInterval(cpf, limit) {
  const product = [];
  for (let i = 0; i < limit; i += 1) {
    product.push(cpf[i] * ((limit + 1) - i));
  }
  return product;
}

function checkDigit(cpf, position) {
  const values = calculateInterval(cpf, position)
  const verify = getDigit(values);
  const validPosition = cpf[position] === verify;
  if (validPosition === false) {
    throw new ReferenceError(`Digito verificador inválido: ${cpf.join('')}`);
  }

  return validPosition;
}

const cpfs = require('./cpfs-validos');

try {
  for (let i = 0; i < cpfs.length; i += 1) {
    const digits = extractNumbers(cpfs[i]);
    checkDigit(digits, 9);
    checkDigit(digits, 10);
  }
} catch (error) {
  console.log(error.message)
}
