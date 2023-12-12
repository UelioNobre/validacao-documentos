class DocumentValidationError extends Error {
  constructor(message, cause) {
    super(message); // (1)
    this.name = "DocumentValidationError";
    this['cause'] = cause;
  }
}

module.exports = DocumentValidationError;
