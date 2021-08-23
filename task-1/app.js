let productContainer;

if (localStorage.getItem("productsData") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("productsData"));
  displayProducts();
}

let inps = document.getElementsByClassName("form-control");

function validateForm(userName) {
  let userNameRegex = /^[A-Z][a-z]{3,8}/;
  if (userNameRegex.test(userName) == false) {
    document.getElementById("addBtn").disabled = "true";
  } else {
    document.getElementById("addBtn").removeAttribute("disabled");
  }
}

function addProduct() {
  let ProductName = document.getElementById("productNameInp").value;
  let ProductPrice = document.getElementById("ProductPriceInp").value;
  let ProductCategory = document.getElementById("productCategoryInp")
    .value;
  let ProductDesc = document.getElementById("productDescInp").value;

  let product = {
    name: ProductName,
    price: ProductPrice,
    category: ProductCategory,
    desc: ProductDesc,
  };
  productContainer.push(product);

  localStorage.setItem("productsData", JSON.stringify(productContainer));

  displayProducts();
  clearForm();
}

function displayProducts() {
  let temp = "";
  for (let i = 0; i < productContainer.length; i++) {
    temp += `
      <div class="col-md-3">
    <div class="product">
      <img
        src="https://source.unsplash.com/user/erondu/"
        class="img-fluid"
        alt=""
      />
      <h4>
        ${productContainer[i].name}
       <span class="badge badge-primary ml-3">${productContainer[i].category}</span>
      </h4>
      <p>
       ${productContainer[i].desc}
      </p>
      <div class="price">${productContainer[i].price}</div>
      <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">delete</button>
      <button onclick="updateProduct(${i})" class="btn btn-success btn-sm">update</button>
    </div>
  </div>
      `;
  }
  document.getElementById("productsRow").innerHTML = temp;
}

function clearForm() {
  for (let i = 0; i < inps.length; i++) {
    inps[i].value = "";
  }
}

function searchProducts(term) {
  let temp = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase())
    ) {
      temp += `
      <div class="col-md-3">
    <div class="product">
      <img
        src="https://source.unsplash.com/user/erondu/"
        class="img-fluid"
        alt=""
      />
      <h4>
        ${productContainer[i].name}
       <span class="badge badge-primary ml-3">${productContainer[i].category}</span>
      </h4>
      <p>
       ${productContainer[i].desc}
      </p>
      <div class="price">${productContainer[i].price}</div>
      <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">delete</button>
      <button onclick="updateProduct(${i})" class="btn btn-success btn-sm">update</button>
    </div>
  </div>
      `;
    }
  }
  document.getElementById("productsRow").innerHTML = temp;
}

function deleteProduct(indx) {
  let deleted = productContainer.splice(indx, 1);
  localStorage.setItem("productsData", JSON.stringify(productContainer));
  displayProducts();
}
function updateProduct() { }