// =====================================================
// ARTIFY WEBSITE JAVASCRIPT
// =====================================================


// =====================================================
// SHOW / HIDE LOGIN PASSWORD
// =====================================================

const showPassword = document.getElementById("showPassword");
const loginPassword = document.getElementById("loginPassword");

if (showPassword && loginPassword) {

    showPassword.addEventListener("click", function () {

        if (loginPassword.type === "password") {

            loginPassword.type = "text";
            showPassword.textContent = "🙈";

        } else {

            loginPassword.type = "password";
            showPassword.textContent = "👁";

        }

    });

}


// =====================================================
// LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const loginMessage =
            document.getElementById("loginMessage");


        if (email === "" || password === "") {

            loginMessage.textContent =
                "Please enter your email and password.";

            loginMessage.style.color = "#c2410c";

            return;
        }


        loginMessage.textContent =
            "Login successful!";

        loginMessage.style.color = "green";


        setTimeout(function() {

            window.location.href = "index.html";

        }, 500);

    });

}


// =====================================================
// SIGN UP
// =====================================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const signupMessage =
            document.getElementById("signupMessage");


        if (
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            signupMessage.textContent =
                "Please fill in all the fields.";

            signupMessage.style.color = "#c2410c";

            return;
        }


        if (password !== confirmPassword) {

            signupMessage.textContent =
                "Passwords do not match.";

            signupMessage.style.color = "#c2410c";

            return;
        }


        signupMessage.textContent =
            "Account created successfully!";

        signupMessage.style.color = "green";


        setTimeout(function() {

            window.location.href = "login.html";

        }, 1000);

    });

}


// =====================================================
// SHOW / HIDE SIGN UP PASSWORD
// =====================================================

const showSignupPassword =
    document.getElementById("showSignupPassword");

const signupPassword =
    document.getElementById("signupPassword");

if (showSignupPassword && signupPassword) {

    showSignupPassword.addEventListener("click", function () {

        if (signupPassword.type === "password") {

            signupPassword.type = "text";
            showSignupPassword.textContent = "🙈";

        } else {

            signupPassword.type = "password";
            showSignupPassword.textContent = "👁";

        }

    });

}


// =====================================================
// SHOPPING CART
// =====================================================

let cart =
    JSON.parse(localStorage.getItem("artifyCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("artifyWishlist")) || [];


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "artifyCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// SAVE WISHLIST
// =====================================================

function saveWishlist() {

    localStorage.setItem(
        "artifyWishlist",
        JSON.stringify(wishlist)
    );

}


// =====================================================
// GET PRODUCT INFORMATION
// =====================================================

function getProductData(card) {

    return {

        name: card.dataset.name,

        price: Number(card.dataset.price),

        category: card.dataset.category,

        image: card.querySelector("img").src

    };

}


// =====================================================
// UPDATE CART COUNT
// =====================================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;


    let totalQuantity = 0;


    cart.forEach(function(item) {

        totalQuantity += item.quantity;

    });


    cartCount.textContent =
        totalQuantity;

}


// =====================================================
// UPDATE WISHLIST COUNT
// =====================================================

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById("wishlistCount");

    if (!wishlistCount) return;


    wishlistCount.textContent =
        wishlist.length;

}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addToCart(product) {

    const existingProduct =
        cart.find(function(item) {

            return item.name === product.name;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();


    showSmallMessage(
        product.name + " added to cart!"
    );

}


// =====================================================
// PRODUCT BUTTONS
// =====================================================

document.querySelectorAll(".product-card")
    .forEach(function(card) {

        const addButton =
            card.querySelector(".add-cart");

        const wishlistButton =
            card.querySelector(".wishlist");


        // ADD TO CART

        if (addButton) {

            addButton.addEventListener(
                "click",
                function() {

                    const product =
                        getProductData(card);

                    addToCart(product);

                }
            );

        }


        // WISHLIST

        if (wishlistButton) {

            const product =
                getProductData(card);


            updateWishlistButton(
                wishlistButton,
                product.name
            );


            wishlistButton.addEventListener(
                "click",
                function() {

                    toggleWishlist(
                        product,
                        wishlistButton
                    );

                }
            );

        }

    });


// =====================================================
// WISHLIST
// =====================================================

function toggleWishlist(product, button) {

    const existing =
        wishlist.find(function(item) {

            return item.name === product.name;

        });


    if (existing) {

        wishlist =
            wishlist.filter(function(item) {

                return item.name !== product.name;

            });


        button.classList.remove("active");

        button.textContent = "♡";


        showSmallMessage(
            product.name +
            " removed from wishlist."
        );

    } else {

        wishlist.push(product);


        button.classList.add("active");

        button.textContent = "♥";


        showSmallMessage(
            product.name +
            " added to wishlist!"
        );

    }


    saveWishlist();

    updateWishlistCount();

}


// =====================================================
// UPDATE WISHLIST HEART
// =====================================================

function updateWishlistButton(
    button,
    productName
) {

    const exists =
        wishlist.some(function(item) {

            return item.name === productName;

        });


    if (exists) {

        button.classList.add("active");

        button.textContent = "♥";

    } else {

        button.classList.remove("active");

        button.textContent = "♡";

    }

}


// =====================================================
// CATEGORY FILTER
// =====================================================

document.querySelectorAll(".category-card")
    .forEach(function(categoryCard) {

        categoryCard.addEventListener(
            "click",
            function() {

                const category =
                    this.dataset.category;


                filterProducts(category);


                document.getElementById("shop")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


function filterProducts(category) {

    const products =
        document.querySelectorAll(
            ".product-card"
        );


    let found = 0;


    products.forEach(function(product) {

        if (
            product.dataset.category === category
        ) {

            product.style.display = "block";

            found++;

        } else {

            product.style.display = "none";

        }

    });


    const filterText =
        document.getElementById("filterText");


    if (filterText) {

        filterText.textContent =
            "Showing " +
            category +
            " products (" +
            found +
            ")";

    }

}


// =====================================================
// SHOW ALL PRODUCTS
// =====================================================

const showAllBtn =
    document.getElementById("showAllBtn");


if (showAllBtn) {

    showAllBtn.addEventListener(
        "click",
        function() {

            document.querySelectorAll(
                ".product-card"
            ).forEach(function(product) {

                product.style.display =
                    "block";

            });


            const filterText =
                document.getElementById(
                    "filterText"
                );


            if (filterText) {

                filterText.textContent =
                    "Showing all products";

            }

        }
    );

}


// =====================================================
// CART BUTTON
// =====================================================

const cartBtn =
    document.getElementById("cartBtn");


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );

}


// =====================================================
// OPEN CART
// =====================================================

function openCart() {

    let html = `

        <div
            class="shop-popup-overlay"
            id="shopOverlay">

            <div class="shop-popup">

                <button
                    class="popup-close"
                    onclick="closePopup()">

                    ×

                </button>

                <h2>🛒 Your Cart</h2>

    `;


    if (cart.length === 0) {

        html += `

            <div class="empty-message">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some beautiful
                    handmade products.
                </p>

            </div>

        `;

    } else {


        cart.forEach(function(item, index) {

            html += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}">


                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price}
                        </p>

                    </div>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(
                                ${index},
                                -1
                            )">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="changeQuantity(
                                ${index},
                                1
                            )">

                            +

                        </button>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(
                            ${index}
                        )">

                        Remove

                    </button>

                </div>

            `;

        });


        const total =
            calculateCartTotal();


        html += `

            <div class="cart-total">

                <span>
                    Total
                </span>

                <span>
                    ₹${total}
                </span>

            </div>


            <button
                class="place-order-button"
                onclick="openOrderForm()">

                Place Order

            </button>

        `;

    }


    html += `

            </div>

        </div>

    `;


    const popupContainer =
        document.getElementById(
            "popupContainer"
        );


    if (popupContainer) {

        popupContainer.innerHTML =
            html;

    }

}


// =====================================================
// CHANGE QUANTITY
// =====================================================

function changeQuantity(
    index,
    change
) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCartCount();

    openCart();

}


// =====================================================
// REMOVE FROM CART
// =====================================================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    openCart();

}


// =====================================================
// CALCULATE TOTAL
// =====================================================

function calculateCartTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price *
            item.quantity;

    });


    return total;

}


// =====================================================
// PLACE ORDER FORM
// =====================================================

function openOrderForm() {

    const total =
        calculateCartTotal();


    const popupContainer =
        document.getElementById(
            "popupContainer"
        );


    popupContainer.innerHTML = `

        <div class="shop-popup-overlay">

            <div class="shop-popup">

                <button
                    class="popup-close"
                    onclick="openCart()">

                    ×

                </button>


                <h2>
                    📦 Place Your Order
                </h2>


                <p>
                    Order Total:
                    <strong>
                        ₹${total}
                    </strong>
                </p>


                <form
                    class="order-form"
                    id="orderForm">


                    <input
                        type="text"
                        id="orderName"
                        placeholder="Full Name"
                        required>


                    <input
                        type="tel"
                        id="orderPhone"
                        placeholder="Phone Number"
                        required>


                    <textarea
                        id="orderAddress"
                        rows="4"
                        placeholder="Delivery Address"
                        required>
                    </textarea>


                    <select
                        id="paymentMethod"
                        required>

                        <option value="">
                            Select Payment Method
                        </option>

                        <option value="Cash on Delivery">
                            Cash on Delivery
                        </option>

                        <option value="UPI">
                            UPI
                        </option>

                        <option value="Card">
                            Credit / Debit Card
                        </option>

                    </select>


                    <button
                        type="submit"
                        class="order-submit">

                        Confirm Order

                    </button>

                </form>

            </div>

        </div>

    `;


    document.getElementById(
        "orderForm"
    ).addEventListener(
        "submit",
        confirmOrder
    );

}


// =====================================================
// CONFIRM ORDER
// =====================================================

function confirmOrder(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "orderName"
        ).value;


    const orderNumber =
        "ART" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    cart = [];


    saveCart();

    updateCartCount();


    document.getElementById(
        "popupContainer"
    ).innerHTML = `

        <div class="shop-popup-overlay">

            <div class="shop-popup">

                <div class="success-message">

                    <div class="success-icon">
                        ✅
                    </div>


                    <h2>
                        Order Confirmed!
                    </h2>


                    <p>
                        Thank you, ${name}.
                    </p>


                    <p>
                        Your order number is:
                    </p>


                    <strong>
                        ${orderNumber}
                    </strong>


                    <br><br>


                    <button
                        class="place-order-button"
                        onclick="closePopup()">

                        Continue Shopping

                    </button>

                </div>

            </div>

        </div>

    `;

}


// =====================================================
// WISHLIST BUTTON
// =====================================================

const wishlistBtn =
    document.getElementById(
        "wishlistBtn"
    );


if (wishlistBtn) {

    wishlistBtn.addEventListener(
        "click",
        openWishlist
    );

}


// =====================================================
// OPEN WISHLIST
// =====================================================

function openWishlist() {

    let html = `

        <div class="shop-popup-overlay">

            <div class="shop-popup">

                <button
                    class="popup-close"
                    onclick="closePopup()">

                    ×

                </button>


                <h2>
                    ♡ My Wishlist
                </h2>

    `;


    if (wishlist.length === 0) {

        html += `

            <div class="empty-message">

                <h3>
                    Your wishlist is empty
                </h3>

                <p>
                    Click the heart on a
                    product to save it here.
                </p>

            </div>

        `;

    } else {


        wishlist.forEach(
            function(item, index) {

                html += `

                    <div
                        class="wishlist-item">

                        <img
                            src="${item.image}"
                            alt="${item.name}">


                        <div
                            class="wishlist-item-info">

                            <h3>
                                ${item.name}
                            </h3>

                            <p>
                                ₹${item.price}
                            </p>

                        </div>


                        <button
                            class="wishlist-add-cart"
                            onclick="
                                wishlistToCart(
                                    ${index}
                                )
                            ">

                            Add to Cart

                        </button>

                    </div>

                `;

            }
        );

    }


    html += `

            </div>

        </div>

    `;


    document.getElementById(
        "popupContainer"
    ).innerHTML = html;

}


// =====================================================
// WISHLIST → CART
// =====================================================

function wishlistToCart(index) {

    const product =
        wishlist[index];


    addToCart(product);

}


// =====================================================
// SEARCH
// =====================================================

const searchBtn =
    document.getElementById(
        "searchBtn"
    );


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        function() {

            const searchTerm =
                prompt(
                    "What handmade product are you looking for?"
                );


            if (!searchTerm) return;


            const products =
                document.querySelectorAll(
                    ".product-card"
                );


            let found = 0;


            products.forEach(
                function(product) {

                    const name =
                        product.dataset.name
                            .toLowerCase();


                    const category =
                        product.dataset.category
                            .toLowerCase();


                    if (
                        name.includes(
                            searchTerm.toLowerCase()
                        ) ||
                        category.includes(
                            searchTerm.toLowerCase()
                        )
                    ) {

                        product.style.display =
                            "block";

                        found++;

                    } else {

                        product.style.display =
                            "none";

                    }

                }
            );


            const filterText =
                document.getElementById(
                    "filterText"
                );


            if (filterText) {

                filterText.textContent =
                    found +
                    ' product(s) found for "' +
                    searchTerm +
                    '"';

            }


            document.getElementById(
                "shop"
            ).scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


// =====================================================
// CLOSE POPUP
// =====================================================

function closePopup() {

    const popupContainer =
        document.getElementById(
            "popupContainer"
        );


    if (popupContainer) {

        popupContainer.innerHTML = "";

    }

}


// =====================================================
// SMALL NOTIFICATION
// =====================================================

function showSmallMessage(message) {

    const notification =
        document.createElement(
            "div"
        );


    notification.textContent =
        message;


    notification.style.position =
        "fixed";

    notification.style.bottom =
        "25px";

    notification.style.right =
        "25px";

    notification.style.background =
        "#292524";

    notification.style.color =
        "white";

    notification.style.padding =
        "14px 22px";

    notification.style.borderRadius =
        "8px";

    notification.style.zIndex =
        "10000";

    notification.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.2)";


    document.body.appendChild(
        notification
    );


    setTimeout(function() {

        notification.remove();

    }, 2000);

}


// =====================================================
// CONTACT FORM
// =====================================================

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            showSmallMessage(
                "Thank you! Your message has been sent."
            );


            contactForm.reset();

        }
    );

}


// =====================================================
// LEARN MORE
// =====================================================

const learnMoreBtn =
    document.getElementById(
        "learnMoreBtn"
    );


if (learnMoreBtn) {

    learnMoreBtn.addEventListener(
        "click",
        function() {

            document.getElementById(
                "contact"
            ).scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


// =====================================================
// INITIALIZE
// =====================================================

updateCartCount();

updateWishlistCount();