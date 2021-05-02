//getting DOM elements 
const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


//fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  console.log(currencyOne, currencyTwo);

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      const rate = data.rates[currencyTwo];
      //console.log(rate);

      rateEl.innerHTML = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
}

//events listeners 
currencyElOne.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElTwo.addEventListener('input', calculate);
swap.addEventListener('click', () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
  calculate();
});

calculate();