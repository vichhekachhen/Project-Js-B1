const product_view = document.querySelector(".product_view");
const product_box = document.querySelector('.product_form')
let info = document.querySelectorAll('.info-form');
// =======================Create-Data==========================
let products = [
  {
    id :1,
    name: 'Apple',
    price: 1989.99,
    currency: '$',
    type: 'Apple',
    star: 4,
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    image: 'https://purepng.com/public/uploads/large/purepng.com-macbookmacbooknotebookcomputersapple-inmacbook-familyapple-laptops-1701528360184gi0qt.png',
  },
  {
    id :2,
    name: 'ASUS ROG strix',
    price: 1767.94,
    currency: '$',
    type: 'ASUS',
    star: 4,
    description: 'Core i7,Processor AMD Ryzen 9, RAM 16GB,',
    image: 'https://dlcdnwebimgs.asus.com/gain/3BF8E8FB-3ABB-4DE1-92C6-210B28AC331A'
  },
  {
    id :3,
    name: 'ASUS Gaming',
    price: 1600.99,
    currency: '$',
    type: 'ASUS',
    star: 4,
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    image: 'https://dlcdnwebimgs.asus.com/gain/6F38685C-B871-4045-9B76-D17818B6D948'
  },
  {
    id :4,
    name: 'Dell',
    price: 850.99,
    currency: '$',
    type: 'DELL',
    star: 4,
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/latitude-14-3440-laptop/media-gallery/notebook-latitude-14-3440-nt-uma-gray-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=664&qlt=100,1&resMode=sharp2&size=664,402&chrss=full'
  },
  {
    id :5,
    name: 'Acer',
    price: 1600.99,
    currency: '$',
    type: 'ACER',
    star: 4,
    description: 'Core i7,RAM 16GB,Core 10, Thread 20, SSD 512GB',
    image: 'https://parspng.com/wp-content/uploads/2023/02/laptoppng.parspng.com-2.png'
  }
];

localStorage.setItem('products', JSON.stringify(products))
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
function loadProducts(){
  let loaded = localStorage.getItem("products")
  if(loaded===null){
    products=products
  }else{
    products=JSON.parse(loaded)
  }
  localStorage.setItem("products",JSON.stringify(products))
}
loadProducts()
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
    //type name
    let names = document.createElement('p');
    names.className = 'name';
    names.textContent = 'type : ' +product.name ;
    detail.appendChild(names);

    let type = document.createElement('p');
    type.className = 'type';
    type.textContent = 'Type® : ' + product.type + ' ' ;
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
    let bgUpdate = document.createElement('img');
    bgUpdate.dataset.index = index;
    bgUpdate.src = '../images/edit.png';
    bgUpdate.addEventListener('click', updateProduct)
    action.appendChild(bgUpdate);

    let bgDelete = document.createElement('img');
    bgDelete.src = '../images/delete.png';
    bgDelete.addEventListener('click', removeProduct)
    action.appendChild(bgDelete)
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
// ______________________
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
    star: 4,
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
    localStorage.setItem('products', JSON.stringify(products))
    // saveProducts();
    
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
// saveProducts()
loadProducts();
renderProducts();

let searchProduct = document.querySelector('.search-box input');
searchProduct.addEventListener('keyup', onSearchProduct)
let btn_add = product_view.querySelector('#add_product');
btn_add.addEventListener('click', onAddProduct);