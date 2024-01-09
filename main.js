// C = Create , R = Retrieve , U = Update , D = Delete , S = Search
//Get inputs and we didnt add .value as the user didnt add anything so it'll be an error! we'll use them latter
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDesInput = document.getElementById("productDes");
var addBtn = document.getElementById("addBtn");
var UpdateBtn = document.getElementById("updateBtn");
//An array to hold the various entries of the function object as every entry would override the other
var productContainer = [];

//Checking local storage
if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProduct(productContainer);
}
//function for every entry by customer. Reusing the function

function addProduct() {
  if (validateProductName() == true) {
    var product = {
      type: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDesInput.value,
    };
    //Pushing the object into the array
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearForm();
  } else {
    alert("Please Enter Valid Product Name");
  }
}
//function for clearing the data after every entry
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDesInput.value = "";
}
//function to display data
function displayProduct(arr) {
  container = "";
  for (i = 0; i < arr.length; i++) {
    container += `
        <tr>                   
        <td>${arr[i].type}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].description}</td>
        <td><buttonn onclick="setFormForUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i}) ;" class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>`;
  }
  document.getElementById("bodyData").innerHTML = container;
}
//function to delete data
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProduct(productContainer);
}
//function to update
function setFormForUpdate(i) {
  addBtn.classList.replace("d-block", "d-none");
  UpdateBtn.classList.replace("d-none", "d-block");
  productNameInput.value = productContainer[i].type;
  productPriceInput.value = productContainer[i].price;
  productCategoryInput.value = productContainer[i].category;
  productDesInput.value = productContainer[i].description;
}
//function to search
function searchProducts(term) {
  var matchedProducts = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].type.toLowerCase().includes(term.toLowerCase()) ===
      true
    ) {
      matchedProducts.push(productContainer[i]);
    }
  }
  displayProduct(matchedProducts);
}
//Validation using regex
function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  return regex.test(productNameInput.value);

  // that will return true or false like this:
  // if(regex.test(productNameInput.value)){
  //   return true;
  // }
  // else{
  //   return false;
  // }
}
