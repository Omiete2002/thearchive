// Cart Open Close
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
}

// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
}

// Making Add to Cart
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Function when DOM is ready
function ready() {
  // Remove Item From Cart
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Add to Cart
  var addCart = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // Update total
  updateTotal();

  // Pay Now button click event
  document.getElementById('pay-now-btn').addEventListener('click', function() {
    // Gather products and total price from cart
    const cartBoxes = document.querySelectorAll('.cart-box');
    let products = '';
    let totalPrice = document.querySelector('.total-price').innerText;

    cartBoxes.forEach(box => {
      const title = box.querySelector('.cart-product-title').innerText;
      const price = box.querySelector('.cart-price').innerText;
      products += `${title} - ${price}\n`;
    });

    // Send email notification
    sendWhatsAppMessage(products, totalPrice);
  });
}

// Remove Cart Item
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Add to Cart
function addCartClicked(event) {
  var button = event.target;
  var shopProduct = button.parentElement;
  var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
  var price = shopProduct.getElementsByClassName('price')[0].innerText;
  var productImg = shopProduct.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartItemNames = cartContent.getElementsByClassName('cart-product-title');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart');
      return;
    }
  }

  var cartBoxContent = `
    <div class="cart-box">
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
      </div>
      <i class='bx bx-trash-alt cart-remove'></i>
    </div>
  `;

  var cartBox = document.createElement('div');
  cartBox.innerHTML = cartBoxContent;
  cartContent.append(cartBox);

  cartBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
}

// Update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var price = parseFloat(priceElement.innerText.replace('₦', '').replace(',', ''));
    total = total + price;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('total-price')[0].innerText = '₦' + total.toLocaleString();
}

// Function to send email notification
function sendEmailNotification(products, totalPrice) {
  const subject = 'New Order Placed';
  const body = `New Order Details:\n\nProducts:\n${products}\nTotal Price: ₦${totalPrice}`;

  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)

  const mailtoLink = `mailto:daomietecott@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  
  // Log the mailto link for debugging
  console.log(mailtoLink);

  // Open the mailto link
  window.location.href = mailtoLink;
}

function sendWhatsAppMessage(products, totalPrice) {
  const message = `New Order Details:\n\nProducts:\n${products}\nTotal Price: ₦${totalPrice}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = '+2349011747867';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Log the WhatsApp link for debugging
  console.log(whatsappLink);

  // Open the WhatsApp link
  window.open(whatsappLink);
}