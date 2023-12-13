const { maskCEP, maskCPF, maskPhone, maskDate, maskOnlyLetters, maskOnlyNumbers } = require("./src/masks");

const cpf = '12345678901';
console.log({ cpf, result: maskCPF(cpf) });

const phone = '123456789012';
console.log({ phone, result: maskPhone(phone) });

const cep = '12345678';
console.log({ cep, result: maskCEP(cep) });

const date = '11051988';
console.log({ date, result: maskDate(date) });

const onlyLetters = btoa('A tecnologia move o mundo.');
console.log({ onlyLetters, result: maskOnlyLetters(onlyLetters) });

const onlyNumbers = btoa('O espírito humano precisa prevalecer sobre a tecnologia');
console.log({ onlyLetters, result: maskOnlyNumbers(onlyNumbers) });
