const Document = require("./Document");

class CNPJ extends Document {

  constructor(document) {
    super(document);
    this.lengthDocument = 14;
    this.type = "CNPJ";
    this.checkValidate();
  }

  checkDigit(digit, position) {
    if (this.numbers[position] !== digit) {
      throw new Error("Documento inválido")
    }
  }

  calculateIntervalNumbers(startFactor, position) {
    const interval = this.numbers.filter((_, i) => i < position);
    let fatorInicial = startFactor;
    let result = 0

    for (const digit of interval) {
      fatorInicial = (fatorInicial < 2) ? 9 : fatorInicial
      result += digit * fatorInicial
      fatorInicial--;
    }

    return result;
  }

  calculateDigit(startFactor, position) {
    const result = this.calculateIntervalNumbers(startFactor, position);
    const rest = (result % 11);
    return (rest < 2) ? 0 : 11 - rest;
  }

  validate() {
    [
      { position: 12, startFactor: 5 },
      { position: 13, startFactor: 6 }
    ].forEach(({ position, startFactor }) => {
      const digit = this.calculateDigit(startFactor, position);
      this.checkDigit(digit, position)
    });

    this.isValid = true;

    return this.getInfo();
  }

  getMatriz() {
    const masked = this.getDocumentMasked();
    const isMatriz = +(masked.split("/")[1].split("-")[0]) === 1;
    return isMatriz;
  }

  getDocumentMasked() {
    return this.document
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2");
  }

  getInfo() {
    return {
      document: this.getDocumentMasked(),
      type: this.type,
      isValid: this.isValid,
      isMatriz: this.getMatriz(),
    }
  }
}

module.exports = CNPJ;


