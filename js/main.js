let amount = document.querySelector('.amount-price');
let dataAmount = JSON.parse(localStorage.getItem('amount'));
amount.textContent = dataAmount.price + '.00' + "$";

let totalCategory = document.querySelector('.category');
totalCategory.textContent = amount.textContent;

let soldOut = document.querySelector(".sold_out");


