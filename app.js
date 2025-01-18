let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromSelect = document.getElementById("from-currency-select");
const toSelect = document.getElementById("to-currency-select");
const fromInput = document.getElementById("from-currency")
const toInput = document.getElementById("to-currency")
const changeButton = document.querySelector(".change-currency")
const fromCurrencyFlag = document.getElementById("from-flag")
const toCurrencyFlag = document.getElementById("to-flag")

const changeCurrency = () => {
  const leftAmount = document.getElementById("from-currency").value;
  const leftCurrency = fromSelect.value;
  const rightCurrency = toSelect.value;

  if (!leftAmount) {
    toInput.value = "";
    return;
  }


  fetch(api).then((resp) => resp.json()).then((data) => {
    let fromExchangeRate = data.conversion_rates[leftCurrency]
    let toExchangeRate = data.conversion_rates[rightCurrency]
    const convertedAmount = (leftAmount / fromExchangeRate) * toExchangeRate;
    toInput.value = convertedAmount.toFixed(2);
  })
}

const updateFlag = (selectElement, flagElement) => {
  const selectedCurrency = selectElement.value;
  const currencyData = currencies.find(currency => currency.code === selectedCurrency)
  if (currencyData){
    flagElement.src = `https://flagsapi.com/${currencyData.country}/flat/64.png`
  }
}

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency.code;
  option.text = currency.code;
  fromSelect.add(option);
});

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency.code;
  option.text = currency.code;
  toSelect.add(option);
});

fromSelect.value = "RUB"
fromCurrencyFlag.src = "https://flagsapi.com/RU/flat/64.png"
toSelect.value = "USD"
toCurrencyFlag.src = "https://flagsapi.com/US/flat/64.png"


fromInput.addEventListener('input', changeCurrency)

changeButton.addEventListener('click', () => {
  let tempCurrency = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempCurrency;


  fromInput.value = toInput.value;
  updateFlag(fromSelect, fromCurrencyFlag);
  updateFlag(toSelect, toCurrencyFlag);
  changeCurrency();
})

fromSelect.addEventListener('change', () =>{
  updateFlag(fromSelect, fromCurrencyFlag);
  changeCurrency();
})

toSelect.addEventListener('change', () =>{
  updateFlag(toSelect, toCurrencyFlag);
  changeCurrency();
})

