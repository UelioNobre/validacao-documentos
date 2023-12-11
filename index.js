function federativeRegistration(cpf) {
  const states = {
    1: "DF, GO, MS, MT e TO",
    2: "AC, AM, AP, PA, RO e RR",
    3: "CE, MA e PI",
    4: "AL, PB, PE e RN",
    5: "BA e SE",
    6: "MG",
    7: "ES e RJ",
    8: "SP",
    9: "PR e SC",
    0: "RS",
  }

  return states[cpf[8]];
}

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
    throw new ReferenceError('Digito verificador inválido', { cause: cpf.join('') });
  }

  return validPosition;
}

const cpfs = require('./cpfs-validos');
let i = 0
try {
  for (i = 0; i < cpfs.length; i += 1) {
    const digits = extractNumbers(cpfs[i].trim());
    checkDigit(digits, 9);
    checkDigit(digits, 10);
    console.log(digits.join(''), federativeRegistration(digits));
  }
} catch (error) {
  console.log(error.message, i)
  console.log(error);
}
