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
      this.throwError();
    }
  }

  checkRepeatedNumbers() {
    const sum = this.numbers
      .map((n) => this.numbers[0] === n ? 1 : 0)
      .reduce((acc, n) => acc + n, 0);

    if (sum === this.lengthDocument) {
      this.throwError();
    }
  }

  checkValidate() {
    this.extractNumbers();
    this.checkLength()
    this.checkRepeatedNumbers();
  }

  checkDigit(position, digit) {
    if ((this.numbers[position] !== digit)) {
      this.throwError();
    }
  }

  calculateIntervalNumbers() {
    throw new Error("Método não implementado.");
  }

  getInfo() {
    throw new Error("Método não implementado.");
  }

  validate() {
    throw new Error("Método não implementado.");
  }

  getDocumentMasked() {
    throw new Error("Método não implementado.");
  }

  throwError() {
    const message = `Documento ${this.type} "${this.document}" inválido.`
    throw new Error(message);
  }
}

module.exports = Document;
