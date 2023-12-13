const Document = require("./Document");

class CPF extends Document {
  constructor(document) {
    super(document);
    this.lengthDocument = 11;
    this.type = "CPF";
    this.checkValidate();
  }

  checkDigit(digit, position) {
    if (this.numbers[position] !== digit) {
      const message = `${this.type} inválido.`
      throw new ReferenceError(message);
    }
  }

  calculateIntervalNumbers(position) {
    const product = this.numbers
      .filter((_, i) => i < position)
      .map((n, i) => n * ((position + 1) - i))

    return product;
  }

  calculateDigit(position) {
    const interval = this.calculateIntervalNumbers(position)
    const sum = interval.reduce((acc, d) => acc + d, 0);
    const verify = sum * 10 % 11;
    return verify !== 10 ? verify : 0
  }


  validate() {
    [{ position: 9 }, { position: 10 }]
      .forEach(({ position }) => {
        const digit = this.calculateDigit(position);
        this.checkDigit(digit, position);
      });
    this.isValid = true;

    return this.getInfo();
  }

  getTaxRegion() {
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

    return states[this.numbers[8]];
  }

  getDocumentMasked() {
    return this.document
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+$/, "$1");
  }

  getInfo() {
    return {
      document: this.getDocumentMasked(),
      type: this.type,
      isValid: this.isValid,
      taxRegion: this.getTaxRegion(),
    }
  }
}

module.exports = CPF;
