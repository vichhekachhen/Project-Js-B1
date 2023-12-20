const card_container = document.querySelector(".card_container");
const product_detail = document.querySelector(".detail");
const search_container = document.querySelector(".search_container");
const store_banner = document.querySelector(".store_banner");
const cardDisplay = document.querySelector(".header");
let cart = [];

// ======= Local Storge =======
let saveData = () => {
    localStorage.setItem("products", JSON.stringify(products));
}

let saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

let loadStorge = () => {
    let product_storage = JSON.parse(localStorage.getItem("products"));
    let cart_storage = JSON.parse(localStorage.getItem("cart"));
    if (product_storage !== null) {
        products = product_storage;
    }
    if (cart_storage !== null) {
        cart = cart_storage;
    }
    checkCartItem();
}

//  ===== Check cart has items or not====
let checkCartItem = () => {
    if (cart.length == 0) {
        document.querySelector(".number").style.display = "none";
    }
    else {
        document.querySelector(".number").textContent = cart.length;
        document.querySelector(".number").style.display = "";
    }
}
// ======= Display products =======
let dispalyProduct = () => {
    for (let index = 0; index < products.length; index++) {
        console.log(products[index]);
        console.log(products[index].name);
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.index = index;
        // card_img 
        let card_img = document.createElement("div");
        card_img.className = "card_img";
        // img 
        let img = document.createElement("img");
        img.src = products[index].image;
        card_img.appendChild(img);
        // card_footer
        let card_footer = document.createElement("div");
        card_footer.className = "card_footer";
        card_footer.dataset.index = index;
        // card_title 
        let card_title = document.createElement("div");
        card_title.className = "card_title";
        // title 
        let title = document.createElement("p");
        title.className = "title";
        // console.log(products[index]);
        title.textContent = products[index].type;
        // title 
        let name = document.createElement("p");
        name.className = "name";
        name.textContent = products[index].name;
        card_title.append(title, name);
        // card_rate
        let card_rate = document.createElement("div");
        card_rate.className = "card_rate";
        // span 
        let star = products[index].star;
        for (let i = 0; i < star; i++) {
            let icon = document.createElement("i");
            icon.className = "fa fa-star orange-star";
            // appendChild to card_rate
            card_rate.appendChild(icon);
        }
        // card_button 
        let card_button = document.createElement("div");
        card_button.className = "card_button";
        // button : btnDetail
        let btnDetail = document.createElement("button");
        btnDetail.type = "button";
        btnDetail.textContent = "Detail";
        btnDetail.addEventListener("click", showDetail)
        // btnAddCart 
        let btnAddCart = document.createElement("button");
        btnAddCart.type = "button";
        btnAddCart.textContent = "Add cart";
        btnAddCart.addEventListener("click", addCart);
        // appendChild to card_button
        card_button.append(btnDetail, btnAddCart);
        // appendChild to card_footer 
        card_footer.append(card_title, card_rate, card_button);
        // appen all child to card 
        card.append(card_img, card_footer)
        card_container.appendChild(card);
    }
}


// ======= Search Product =====
let search = () => {
    let cards = document.querySelectorAll(".card");
    let input = document.querySelector("#search").value.toLowerCase();
    for (let i = 0; i < cards.length; i++) {
        let card_footer = cards[i].lastElementChild;
        let card_title = card_footer.firstElementChild;
        let title = card_title.firstElementChild.textContent.toLowerCase();
        if (title.indexOf(input) > -1) {
            cards[i].style.display = "";
        }
        else {
            cards[i].style.display = "none";
        }
    }
}

// ========== Categories ========
let categories = (string) => {
    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        let card_footer = cards[i].lastElementChild;
        let card_title = card_footer.firstElementChild;
        let cost = card_title.lastElementChild.textContent.trim();
        if (cost.includes(string) || string === "") {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

let sort = () => {
    let string = document.querySelector("#string").value;
    categories(string);
}

// =======Hide function ======
let hide = (element) => {
    element.style.display = "none";
}

// =======Show function =======
let show = (element) => {
    element.style.display = "";
}

//====== Show detail product_details function =======
let showDetail = (event) => {
    hide(card_container);
    hide(search_container);
    hide(cardDisplay);
    hide(store_banner);
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;

    // create div img
    let div_img = document.createElement("div");
    div_img.className = "img";

    // create img 
    let img = document.createElement("img");
    img.src = products[index].image;

    // appendchild to div_img 
    div_img.appendChild(img);

    // create img_details
    let img_detail = document.createElement("div");
    img_detail.className = "img_detail";
    img_detail.dataset.index = index;

    // create nameOfProduct
    let nameOfProduct = document.createElement("h2");
    nameOfProduct.textContent = products[index].name;
    img_detail.append(nameOfProduct);

    // create description 
    let description = document.createElement("div");
    description.className = "description";
    // create p 
    let p = document.createElement("p");
    p.textContent = products[index].description;

    // appendChild to description
    description.appendChild(p);
    img_detail.appendChild(description);

    // Price
    let price = document.createElement("p");
    let bold1 = document.createElement("b");
    bold1.textContent = "Price: ";
    let span1 = document.createElement("span");
    span1.textContent = "$" + products[index].price;
    price.append(bold1, span1);
    img_detail.appendChild(price);

    // create img_rate 
    let img_rate = document.createElement("div");
    img_rate.className = "img_rate";
    let star = products[index].star;
    for (let i = 0; i < star; i++) {
        let icon = document.createElement("i");
        icon.className = "fa fa-star orange-star";
        img_rate.appendChild(icon);
    }
    img_detail.appendChild(img_rate);

    //button detail
    let btn_detail = document.createElement("div");
    btn_detail.classList.add("card_button", "btn_detail");

    //button buy 
    let btn_back = document.createElement("button");
    btn_back.type = "button";
    btn_back.textContent = "Back";
    btn_back.addEventListener("click", hideDetail);

    // Btn add to cart
    let btn_cart = document.createElement("button");
    btn_cart.type = "button";
    btn_cart.textContent = "Add Cart";
    btn_cart.addEventListener("click", addCart);
    btn_detail.append(btn_back, btn_cart);
    img_detail.appendChild(btn_detail);

    // append all child to product_details
    product_detail.append(div_img, img_detail);
    show(product_detail);
}

// ======= Hide detail ======
let hideDetail = () => {
    location.reload();
}

// ======= Add product to cart function =======
let addCart = (event) => {
    let newCart = {};
    let index = event.target.parentElement.parentElement.dataset.index;
    // Add to newCart
    newCart = products[index];
    if (typeof (cart) == "object") {
        cart.push(newCart);
        saveCart();
    }
    // else if (products[index].title != event_title) {
    //     cart.push(newCart);
    //     saveCart();
    // }
    location.reload();
}

// ====== Function save data() need to turn off before we add new product==
// saveData();
loadStorge();
dispalyProduct();



