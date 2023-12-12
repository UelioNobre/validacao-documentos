function isRepeated(value, length) {
  const sum = value
    .map((n) => value[0] === n ? 1 : 0)
    .reduce((acc, n) => acc += n);

  if (sum === length) {
    throw new TypeError('Documento contém todos os números iguais.');
  }
}

function extractNumbers(str) {
  return str
    .match(/\d/g)
    .map((n) => +n);
}

function getInterval(cnpj, position) {
  return cnpj.filter((_, i) => i < position);
}

function getDigit(cnpj, start) {
  let fatorInicial = start;
  let result = 0

  for (let i = 0; i < cnpj.length; i++) {
    result += cnpj[i] * fatorInicial

    fatorInicial--;
    fatorInicial = (fatorInicial < 2) ? 9 : fatorInicial
  }

  const rest = (result % 11);
  return (rest < 2) ? 0 : 11 - rest;
}

function checkDigit(cnpj, digit, position) {
  if (!(cnpj[position] === digit)) {
    throw new ReferenceError("Digito verificador inválido.")
  }
}

function validateCNPJ(cnpj) {
  const cnpjDigits = extractNumbers(cnpj);
  isRepeated(cnpjDigits, 14);

  [
    { position: 12, startFactor: 5 },
    { position: 13, startFactor: 6 }
  ].forEach(({ position, startFactor }) => {
    const digits = getInterval(cnpjDigits, position);
    const digit = getDigit(digits, startFactor);
    checkDigit(cnpjDigits, digit, position)
  });

  return true;
}

module.exports = validateCNPJ;
