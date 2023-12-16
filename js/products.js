const product_view = document.querySelector(".product_view");
const product_box = document.querySelector('.product_form')
let info = document.querySelectorAll('.info-form');
// =======================Create-Data==========================
let products = [
  {
    id :1,
    name: 'MAC BOOK Pro',
    price: 1989.99,
    currency: '$',
    brand: 'Apple',
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    image: 'https://i.insider.com/5eea335daee6a8642c5f3894?width=700',
  },
  {
    id :2,
    name: 'ASUS ROG strix',
    price: 1967.94,
    currency: '$',
    brand: 'ASUS',
    description: 'Core i7,Processor AMD Ryzen 9, RAM 16GB,',
    image: 'https://dlcdnwebimgs.asus.com/gain/015AB703-5A42-4307-A219-31927FB70CE8/w250'
  },
  {
    id :3,
    name: 'ASUS Gaming',
    price: 1600.99,
    currency: '$',
    brand: 'ASUS',
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    image: 'https://w7.pngwing.com/pngs/1006/751/png-transparent-dell-latitude-laptop-intel-core-dell-inspiron-book-store-electronics-gadget-netbook-thumbnail.png'
  }
];
// =======================Get-index==========================

let productLength = products.length;
// =======================Hide&Show==========================
let hide = (element) => {
  element.style.display = "none";
};
let show = (element) => {
  element.style.display = "block";
};
// =======================Local-Storage==========================
let saveProducts = () => {
  localStorage.setItem('products', JSON.stringify(products));
};

let loadProducts = () => {
  let productStorage = JSON.parse(localStorage.getItem('products'));
  if (productStorage !== null) {
    products = productStorage;
  }
};
//===============================Edit-Product=====================
let renderProducts = () => {
  let dom_product_container = document.querySelector('#products_container');
  dom_product_container.remove();
  dom_product_container = document.createElement("div");
  dom_product_container.id = "products_container";
  for (let index = 0; index < products.length; index++) {
    let product = products[index];
    //Create card
    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    let productInfo = document.createElement('div');
    productInfo.className = 'product_info';
    //Create image
    let image_container = document.createElement('div');
    image_container.className = 'img_show';
    productInfo.appendChild(image_container);
    let product_img = document.createElement('img');
    product_img.src = product.image;
    image_container.appendChild(product_img);
    //Detail-more-about-Product
    let detail = document.createElement('div');
    detail.className = 'detail';
    productInfo.appendChild(detail);
    //Brand name
    let names = document.createElement('p');
    names.className = 'name';
    names.textContent = 'Brand : ' +product.name + ' ' + product.brand;
    detail.appendChild(names);

    let type = document.createElement('p');
    type.className = 'type';
    type.textContent = 'Type® : ' + product.brand + ' ' ;
    detail.appendChild(type);

    //Detailing more information
    let description = document.createElement('p');
    description.className =  'description';
    description.textContent = 'Description💻 : ' + product.description;
    detail.appendChild(description);

    let price = document.createElement('p');
    price.className = 'price';
    price.textContent = 'Price: ' + product.price + ' ' + product.currency;
    detail.appendChild(price);

    // create a new div for button update and delete
    let action = document.createElement('div');
    action.className = 'actions';
    // create a new img for button update and delete
    let btn_update = document.createElement('img');
    btn_update.dataset.index = index;
    btn_update.src = '../images/edit.png';
    btn_update.addEventListener('click', updateProduct)
    action.appendChild(btn_update);

    let btn_delete = document.createElement('img');
    btn_delete.src = '../images/delete.png';
    btn_delete.addEventListener('click', removeProduct)
    action.appendChild(btn_delete)
    card.appendChild(productInfo);
    card.appendChild(action)
    dom_product_container.appendChild(card);
  }
  product_view.appendChild(dom_product_container);
}


let isCreate = true;
let showDataInputUpdate = (data) => {
  let product_name = document.getElementById('name');
  product_name.value = data.name
  let product = document.querySelector('.product_info img');
  product.value = data.image
  let product_type = document.getElementById('type');
  product_type.value = data.type
  let product_description = document.getElementById('text');
  product_description.value = data.description
  let product_price = document.getElementById('productPrice');
  product_price.value = data.price
  let currency = document.getElementById('currency');
  currency.value = data.currency
  return { "data": data }
}

let clearInput = () => {
  let product_name = document.getElementById('name');
  product_name.value = ''
  let product = document.querySelector('.product_info img');
  product.value = ''
  let product_type = document.getElementById('type');
  product_type.value = ''
  let product_description = document.getElementById('text');
  product_description.value = ''
  let product_price = document.getElementById('productPrice');
  product_price.value = ''
  let currency = document.getElementById('currency');
  currency.value = 'no'

}
let updateProduct = (event) => {
  //To get product index
  isCreate = false
  index = event.target.parentElement.parentElement.dataset.index;
  let product = products[index];
  showDataInputUpdate(product)
  document.querySelector('#createEditButton').textContent = 'Update';
  info.forEach((element,index) => {
    manageInfo(index, 'hide')    
  });
  show(product_box);
}
let removeProduct = (event) => {
  const removeConfirm = window.confirm("Are you sure you want to remove this product?");
  if(removeConfirm){
    console.log(1);

    const index = event.target.parentElement.parentElement.dataset.index;
    // remove product
    products.splice(index, 1);

    // save to local storage
    saveProducts();

    // update the view
    renderProducts();
  }
}
let onAddProduct = () => {
  info.forEach((element,index) => {
    manageInfo(index, 'hide')
  });
  clearInput()
  show(product_box)
  document.getElementById('createEditButton').textContent = 'Create';
};
// =======================Search Product==========================
let onSearchProduct = (event) => {
  let inputText = searchProduct.value;
  let inputLower = inputText.toLowerCase();

  let productList = document.querySelectorAll('.card');
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
// =======================Cancel and Add ==========================
// information input required

let manageInfo = (indexInfo, action) => {
  if (action === 'show') {
    info[indexInfo].style.display = 'flex'
    info[indexInfo].parentElement.firstChild.nextSibling.style.border = '3px solid red';
  }
  else {
    info[indexInfo].style.display = 'none'
    info[indexInfo].parentElement.firstChild.nextSibling.style.border = '3px solid #e3e1e1';
  }
}
let onCancel = (e) => {
  hide(product_box);
}
let onCreateProduct = () => {
  let product_name = document.getElementById('name').value;
  let product_type = document.getElementById('type').value;
  let product_description = document.getElementById('text').value;
  let product_price = document.getElementById('productPrice').value;
  let currency = document.getElementById('currency').value;
  let objData = {
    name: product_name,
    type: product_type,
    description: product_description,
    price: product_price,
    currency: currency,
    image: imgeUpload
  }
  imgeUpload = ''
  // check required input
  let product_input = product_name !== '' && product_type !== '' && product_price !== '' && currency !== 'no';
  if (product_input) {
    if (isCreate) {
      products.push(objData);
      products.reverse()
    }
    else{
      // Update vai index 
      products[index] = objData;
      canCreate = true
    }
    hide(product_box);
    //save to local storage
    saveProducts();
    // update to the view
    renderProducts()
    // clear input 
    clearInput()

  } else {
    if (product_name === '') {
      manageInfo(0, 'show')
    }
    else {
      manageInfo(0, 'hide')
    }
    if (product_type === '') {
      manageInfo(1, 'show')
    }
    else {
      manageInfo(1, 'hide')
    }
    if (product_price === '') {
      manageInfo(2, 'show')
    }
    else {
      manageInfo(2, 'hide')
    }
    if (currency === 'no') {
      manageInfo(3, 'show')
    }
    else {
      manageInfo(3, 'hide')
    }
  }
}
//Upload img in box product
let imgeUpload = ''
let loadFile=(event)=>{
  let file = event.target.files[0]
  let reader = new FileReader()
  reader.addEventListener("load", () => {
    imgeUpload = reader.result;
  });
  reader.readAsDataURL(file);
}
saveProducts()
loadProducts();
renderProducts();

let searchProduct = document.querySelector('.search input');
searchProduct.addEventListener('keyup', onSearchProduct)
let btn_add = product_view.querySelector('#add_product');
btn_add.addEventListener('click', onAddProduct);