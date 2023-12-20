// ======= DOM HTML =======
const tbody = document.querySelector("tbody");
const search_container = document.querySelector(".search_container");


// ========= Get all products from local storage =======
let cart = JSON.parse(localStorage.getItem("cart"));

// ======= Check whether in cart has items or not =====
if (cart.length == 0) {
    document.querySelector(".number").style.display = "none";
    empty_cart.style.display = "block";
}

// ========= Local Storage =======
let saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// ======= Display cart function =======
let displayCart = () => {
    let price = document.querySelector(".total").firstElementChild.firstElementChild;
    let total_price = 0;
    for (let index in cart) {
        total_price += parseInt(cart[index].price);
        let tr = document.createElement("tr");
        tr.dataset.index = index;

        //Create td ID
        // let tdId = document.createElement("td");
        // let id = document.createElement("div");
        // id.textContent = cart[index].id;
        // tdId.appendChild(id);
        // tdId.style.width = 50;

        // Create td 1
        let td1 = document.createElement("td");
        td1.style.width = 300;
        //  Create div class: name 
        let cardProduct = document.createElement("div");
        cardProduct.classList.add("name", "cardProduct");
        // Create image with widgth 200px 
        let image = document.createElement("img");
        image.src = cart[index].image;
        image.width = 200;
        // Create div class: cart_detail ======
        let cart_detail = document.createElement("div");
        cart_detail.className = "cart_detail";
        // ======= Create h2======
        let h2 = document.createElement("h2");
        h2.textContent = cart[index].name;
        // ========= AppendChild to cardProduct ======
        cardProduct.append(image, h2)
        // Append cardProduct to td1
        td1.appendChild(cardProduct);

        //  Create td2 
        let td2 = document.createElement("td");
        td2.style.width = 10;
        //Create input
        let input = document.createElement("input");
        input.type = "number";
        input.className = "quantity";
        input.min = "1";
        input.value = "1";
        input.style.textAlign = "center";
        td2.appendChild(input);

        // Create td3
        let td3 = document.createElement("td");
        td3.textContent = "$" + cart[index].price;

        //Create td4
        let td4 = document.createElement("td");
      
        // Create div button
        let btnDelete = document.createElement("div");
        btnDelete.className = "btn_detail card_button btn_delete_cart";
        //create button delete
        let button = document.createElement("button");
        button.type = "button";
        button.className = "delete";
        button.textContent = "Delete";
        button.style.textAlign = "center";
        button.addEventListener("click", deleteCart);
        btnDelete.appendChild(button);
        td4.appendChild(btnDelete);

        // Appedn all td to tr
        tr.append( td1, td2, td3, td4);
        tbody.appendChild(tr);
    }
    price.textContent = "$" + total_price;
}
// console.log(displayCart);
// ================================== Search Product =============================================
let onSearchProduct = (event) => {
    let inputText = searchProduct.value;
    let inputLower = inputText.toLowerCase();
  
    let productList = document.querySelectorAll('.cart');
    for (let spanItem of productList) {
      let productTitle = spanItem.firstChild.lastChild.firstChild.textContent.toLocaleLowerCase();
      let productDisplay = "";
      if (productTitle.indexOf(inputLower) === -1) {
        productDisplay = "none";
      } else {
        productDisplay = "block";
      }
      spanItem.style.display = productDisplay;
    };
  };

// ========= Delete cart =======
let deleteCart = (event) => {
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    
    // Display confirmation dialog
    let confirmed = window.confirm('Are you sure you want to delete this item from the cart?');
    
    if (confirmed) {
        cart.splice(index, 1);
        saveCart();
       // delete cart in local storage
        // localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
}
displayCart();

let searchProduct = document.querySelector('.search-box input');
searchProduct.addEventListener('keyup', onSearchProduct)