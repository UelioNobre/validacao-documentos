# validacao-documentos

## Validação do documento CPF

A validação do CPF é realizada através de um algoritmo específico, que verifica se o número fornecido atende a certas condições.

A regra de validação do CPF envolve os seguintes passos:

- __Tamanho do Número:__ O CPF é composto por 11 dígitos numéricos. O algoritmo verifica se o número fornecido possui a quantidade correta de dígitos.

- __Primeiro Dígito Verificador:__ Os nove primeiros dígitos do CPF representam o número de registro do indivíduo. O décimo dígito é um dígito verificador calculado com base nos nove primeiros dígitos. Esse cálculo leva em consideração pesos atribuídos a cada dígito, resultando em um valor que é então subtraído de um múltiplo de 11. Se o resultado da subtração for menor que 2, o décimo dígito verificador é 0; caso contrário, é a diferença entre 11 e o resultado da subtração.

- __Segundo Dígito Verificador:__ Similarmente, o décimo primeiro dígito é um segundo dígito verificador. É calculado com base nos dez primeiros dígitos, seguindo o mesmo processo descrito acima.

- __Verificação Final:__ O CPF é considerado válido se os dígitos verificadores calculados nos passos 2 e 3 coincidirem com os dígitos verificadores reais no número fornecido.

A lógica por trás desse algoritmo é projetada para detectar erros comuns de digitação e garantir que o CPF tenha um formato válido. Vale notar que a validação do CPF apenas verifica a estrutura do número e não necessariamente se o CPF é real ou se corresponde a uma pessoa existente.

## Exemplos de utilização

### Validar um documento

```javascript
const data = require('./exemplos/cpfs-validos');
const validateCPF = require('./src/validateCPF');

try {
    // Valida somente 1
    const validateOne = validateCPF(data[0]);
    console.log(validateOne);
  } catch ({ cause }) {
    console.log(cause);
  }

```

<details>
<summary>Exemplo de saída</summary>

```javascript
// Saída no terminal
{
  cpf: '051.394.027-85',
  federativeRegistration: 'ES e RJ',
  valid: true
}
```

</details>

---

### Validar vários documentos
```javascript
const data = require('./exemplos/cpfs-validos');
const validateCPF = require('./src/validateCPF');

// Valida um lote
data.forEach(cpf => {
  try {
    console.log(validateCPF(cpf));
  } catch ({ cause }) {
    console.log(cause);
  }
});
```

<details>
<summary>Exemplo de saída</summary>

```javascript
// Saída no terminal
{
  cpf: '051.394.027-85',
  federativeRegistration: 'ES e RJ',
  valid: true
}
{
  cpf: '145.713.977-47',
  federativeRegistration: 'ES e RJ',
  valid: true
}
{
  cpf: '739.623.414-04',
  federativeRegistration: 'AL, PB, PE e RN',
  valid: true
}
{
  cpf: '096.345.556-78',
  federativeRegistration: 'MG',
  message: 'Digito verificador inválido',
  valid: false
}
```

</details>

## Erros

O script poderá lançar alguns erros quando estiver em execução.
Para a sua aplicação não para quando houver um erro, realize a chamada dentro de um bloco `try/catch` para capturar o erro.

Para explorar os detalhes do erro, acesse a propriedade `cause` da instância de erro.

#### `ReferenceError`
- Digito verificador inválido.
- O CPF é composto de somente números repetidos.

#### `RangeError`
- Números do CPF são insuficientes. Ou seja, a quantidade informada é diferente de 11 (número sem pontos e hifen).

## Dependências
- Nenhuma

