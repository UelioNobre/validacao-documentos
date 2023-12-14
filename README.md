# validacao-documentos

O objetivo deste repositório é fornecer funcionalidades simples e eficazes para validar números de CPF (Cadastro de Pessoa Física) e CNPJ (Cadastro Nacional da Pessoa Jurídica) em projetos JavaScript.

## Validação do documento CPF

A validação do CPF é realizada através de um algoritmo específico, que verifica se o número fornecido atende a certas condições.

A regra de validação do CPF envolve os seguintes passos:

- __Tamanho do Número:__ O CPF é composto por 11 dígitos numéricos. O algoritmo verifica se o número fornecido possui a quantidade correta de dígitos.

- __Primeiro Dígito Verificador:__ Os nove primeiros dígitos do CPF representam o número de registro do indivíduo. O décimo dígito é um dígito verificador calculado com base nos nove primeiros dígitos. Esse cálculo leva em consideração pesos atribuídos a cada dígito, resultando em um valor que é então subtraído de um múltiplo de 11. Se o resultado da subtração for menor que 2, o décimo dígito verificador é 0; caso contrário, é a diferença entre 11 e o resultado da subtração.

- __Segundo Dígito Verificador:__ Similarmente, o décimo primeiro dígito é um segundo dígito verificador. É calculado com base nos dez primeiros dígitos, seguindo o mesmo processo descrito acima.

- __Verificação Final:__ O CPF é considerado válido se os dígitos verificadores calculados nos passos 2 e 3 coincidirem com os dígitos verificadores reais no número fornecido.

A lógica por trás desse algoritmo é projetada para detectar erros comuns de digitação e garantir que o CPF tenha um formato válido. Vale notar que a validação do CPF apenas verifica a estrutura do número e não necessariamente se o CPF é real ou se corresponde a uma pessoa existente.

### Exemplos de utilização

#### Validar um documento

```javascript
const CPF = require("./src/CPF");

const cpf = "529.982.247-25";

try {
  const result = new CPF(cpf);
  console.log(result.validate());
} catch (error) {
  console.log(error.message)
}

```

<details>
<summary>Exemplo de saída</summary>

```javascript
// console.log(result)
{
  document: '529.982.247-25',
  type: 'CPF',
  isValid: true,
  taxRegion: 'ES e RJ'
}

// console.log(error.message)
Documento CPF "529.982.247-26" inválido.
```

</details>

---

#### Validar vários documentos
```javascript
const { cpfs } = require('./exemplos/cpfCnpj');

const CPF = require("./src/CPF");

for (const cpf of cpfs) {
  try {
    const result = new CPF(cpf);
    console.log(result.validate());
  } catch (error) {
    console.log(error.message)
  }
}
```

<details>
<summary>Exemplo de saída</summary>

```javascript
// console.log(result)
{
  document: '529.982.247-25',
  type: 'CPF',
  isValid: true,
  taxRegion: 'ES e RJ'
}
{
  document: '849.443.900-68',
  type: 'CPF',
  isValid: true,
  taxRegion: 'RS'
}

// console.log(error.message)
Documento CPF "040.738.473-18" inválido.
Documento CPF "989.494.986-49" inválido.
```

</details>

### Erros

O script poderá lançar alguns erros quando estiver em execução.
Para a sua aplicação não parar quando houver isso ocorrer, realize a chamada dentro de um bloco `try/catch`.

Qualquer inconsistência no documento informador poderá causar um erro do tipo`Error`.

Alguma indícios do que pode ter ocorrido:
- Digito verificador inválido.
- O CPF é composto por somente números repetidos.
- Falha na digitação do número do documento.
- Informar uma quantidade de números menor do que o esperado. 


## Validação do documento CNPJ

A validação do CNPJ segue algumas regras específicas para garantir sua integridade e unicidade. Aqui estão alguns pontos importantes sem apresentar código fonte:

- **Número Fixo de Dígitos:** O CNPJ possui um número fixo de 14 dígitos, distribuídos em blocos específicos que representam diferentes informações sobre a entidade.

- **Dígitos Verificadores:** Os dois últimos dígitos do CNPJ são conhecidos como dígitos verificadores. Eles são calculados com base nos 12 primeiros dígitos do número, utilizando um algoritmo específico.

- **Blocos de Identificação:** Os oito primeiros dígitos representam a identificação da empresa, os quatro dígitos seguintes referem-se ao número de ordem da filial (caso exista), e os dois últimos são os dígitos verificadores.

- **Caracteres Especiais:** O CNPJ inclui caracteres especiais, como barras e pontos, que são utilizados para facilitar a leitura, mas que são desconsiderados nos cálculos.

- **Unicidade:** Cada CNPJ é único para uma determinada entidade, o que significa que não pode haver dois CNPJs iguais.

A verificação da validade de um CNPJ é importante para garantir que o número fornecido esteja correto e atenda às regras estabelecidas pela Receita Federal. Essas regras são implementadas para prevenir erros de digitação e assegurar a consistência das informações registradas.


## Exemplos de utilização

### Validar um documento

```javascript
const CNPJ = require("./src/CNPJ");

const cnpj = "529.982.247-25";

try {
  const result = new CNPJ(cnpj);
  console.log(result.validate());
} catch (error) {
  console.log(error.message)
}

```

<details>
<summary>Exemplo de saída</summary>

```javascript
// console.log(result)
{
  document: '01.851.716/0001-65',
  type: 'CNPJ',
  isValid: true,
  isMatriz: true
}

// console.log(error.message)
Documento CNPJ "0185171600166" inválido.
```

</details>

---

### Validar vários documentos CNPJ
```javascript
const { cnpjs } = require('./exemplos/cpfCnpj');

const CNPJ = require("./src/CNPJ");

for (const cnpj of cnpjs) {
  try {
    const result = new CNPJ(cnpj);
    console.log(result.validate());
  } catch (error) {
    console.log(error.message)
  }
}
```

<details>
<summary>Exemplo de saída</summary>

```javascript
// console.log(result)
{
  document: '01.851.716/0001-65',
  type: 'CNPJ',
  isValid: true,
  isMatriz: true
}
{
  document: '01.851.716/0001-65',
  type: 'CNPJ',
  isValid: true,
  isMatriz: true
}
// console.log(error.message)
Documento CNPJ "0185171600165" inválido.
Documento CNPJ "28.562.509/0001-79" inválido.
Documento CNPJ "11.111.111/1111-11" inválido.
Documento CNPJ "22.222.222/2222-22" inválido.
```

</details>

## Dependências
- Nenhuma
