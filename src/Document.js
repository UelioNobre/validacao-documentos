class Document {
  constructor(document) {
    this.document = document;
    this.numbers = [];
    this.info = {};
    this.isValid = false
  }

  extractNumbers() {
    const numbers = this.document
      .match(/\d/g)
      .map((n) => +n);

    this.numbers = numbers;
  }

  checkLength() {
    if (this.lengthDocument !== this.numbers.length) {
      throw new RangeError("A quantidade de caracteres informada é inválida.")
    }
  }

  checkRepeatedNumbers() {
    const sum = this.numbers
      .map((n) => this.numbers[0] === n ? 1 : 0)
      .reduce((acc, n) => acc + n, 0);

    if (sum === this.lengthDocument) {
      throw new Error("Números repetidos são inválidos.")
    }
  }

  checkValidate() {
    this.extractNumbers();
    this.checkLength()
    this.checkRepeatedNumbers();
  }

  checkDigit(position, digit) {
    if ((this.numbers[position] !== digit)) {
      throw new Error("Digito verificador inválido.")
    }
  }

  calculateIntervalNumbers() {
    throw new Error("Regra de calculo de intervalo não implementada.")
  }

  getInfo() {
    throw new Error("Informações do documento não implementada.")
  }

  validate() {
    throw new Error("Regra de validação não implementada.")
  }

  getDocumentMasked() {
    throw new Error("Mascará do documento não implementada.")
  }
}

module.exports = Document;
