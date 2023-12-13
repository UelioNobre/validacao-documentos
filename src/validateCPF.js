const { maskCPF } = require("./utils/masks");

/**
 * Retorna todos os caracteres númericos o parâmentro `cpf`.
 * 
 * @param {string} cpf 
 * @throws RangeError
 * @returns Array<number>
 */
function extractNumbers(cpf) {
  const digits = cpf.match(/\d/g);

  if (digits.length !== 11) throw new RangeError("Números do CPF são insuficientes.", {
    cause: {
      cpf: maskCPF(cpf),
      federativeRegistration: federativeRegistrationCpf(cpf),
      message: "Números do CPF são insuficientes.",
      valid: false
    }
  });

  return digits.map((digit) => Number.parseInt(digit));
}

/**
 * Verifica se há números repetidos no CPF informado.
 * Havendo algum caso, retorna um erro do tipo `ReferenceError`.
 * 
 * @param {array<int>} cpf Um CPF em formato de array.
 * @throws {ReferenceError}
 * @returns void
 */
function isRepeatedNumbers(cpf) {
  const sum = cpf
    .map((n) => cpf[0] === n ? 1 : 0)
    .reduce((acc, n) => acc += n, 0);

  if (sum === 11) {
    throw new ReferenceError("Números repetidos", {
      cause: {
        cpf: maskCPF(cpf.join()),
        federativeRegistration: federativeRegistrationCpf(cpf),
        message: error.message,
        valid: false
      }
    });
  }
}

/**
 * 
 * @param {array<number>} cpf 
 * @param {number} position 
 * @throws ReferenceError
 * @returns void
 */
function checkDigitCpf(cpf, position) {
  const values = calculateIntervalCpf(cpf, position)
  const verify = getDigitCpf(values);
  const validPosition = cpf[position] === verify;
  if (validPosition === false) {
    throw new ReferenceError("Digito verificador inválido", {
      cause: {
        cpf: maskCPF(cpf.join()),
        federativeRegistration: federativeRegistrationCpf(cpf),
        message: "Digito verificador inválido",
        valid: false
      }
    });
  }
}

/**
 * Realiza o cálculo matemático do `cpf`, multiplicando 
 * o digito por um peso (index do número).
 * 
 * @param {array<number>} cpf 
 * @param {number} limit 
 * @returns {Array<number>}
 */
function calculateIntervalCpf(cpf, limit) {
  const product = cpf
    .filter((_, i) => i < limit)
    .map((n, i) => n * ((limit + 1) - i))

  return product;
}

/**
 * Valida os digitos verificadores do `cpf`.
 * 
 * @param {array<number>}  values 
 * @returns number
 */
function getDigitCpf(values) {
  const sum = values.reduce((acc, d) => acc += d, 0);
  let verify = sum * 10 % 11;

  return verify !== 10 ? verify : 0
}

/**
 * Retorna a região fiscal do `cpf`
 * @param {string|array<number>} cpf 
 * @throws TypeError
 * @returns {string}
 */
function federativeRegistrationCpf(cpf) {

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

/**
 * 
 * @param {string} cpf 
 * @throws ReferenceError | RangeError
 * @returns object
 */
function validateCPF(cpf) {
  const digits = extractNumbers(cpf.trim());
  isRepeatedNumbers(digits);
  [9, 10].forEach((position) => {
    checkDigitCpf(digits, position);
  });

  return {
    cpf: maskCPF(cpf),
    federativeRegistration: federativeRegistrationCpf(digits),
    valid: true
  }
}

module.exports = validateCPF;
