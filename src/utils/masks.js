function maskCPF(cpf) {
  const mask = cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+$/, "$1");
  return mask;
}

function maskCNPJ(cnpj) {
  const mask = cnpj
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2");
  return mask;
}

// (00) 00000-0000
const maskPhone = phone => {
  return phone
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})(\d)/, "$1-$2")
}

// 00000-000
const maskCEP = cep => {
  return cep.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+$/, "$1-$2")
}

// 00/00/0000
const maskDate = date => {
  return date
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1")
}

// Aceita apenas que letras sejam digitadas
const maskOnlyLetters = value => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "")
}

// Aceita apenas números
const maskOnlyNumbers = value => {
  return value.replace(/\D/g, "")
}

module.exports = {
  maskCPF,
  maskPhone,
  maskCEP,
  maskDate,
  maskOnlyLetters,
  maskOnlyNumbers,
  maskCNPJ,
}
