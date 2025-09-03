const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        rating: 4.5,
        reviews: 1234,
        image: "https://via.placeholder.com/300x250/FF6B6B/ffffff?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        rating: 4.3,
        reviews: 856,
        image: "https://via.placeholder.com/300x250/4ECDC4/ffffff?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Portable Phone Charger",
        price: 29.99,
        rating: 4.7,
        reviews: 2341,
        image: "https://via.placeholder.com/300x250/45B7D1/ffffff?text=Charger"
    },
    {
        id: 4,
        name: "Wireless Gaming Mouse",
        price: 59.99,
        rating: 4.4,
        reviews: 567,
        image: "https://via.placeholder.com/300x250/96CEB4/ffffff?text=Gaming+Mouse"
    },
    {
        id: 5,
        name: "USB-C Hub Adapter",
        price: 39.99,
        rating: 4.2,
        reviews: 789,
        image: "https://via.placeholder.com/300x250/FFEAA7/000000?text=USB+Hub"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 89.99,
        rating: 4.6,
        reviews: 1456,
        image: "https://via.placeholder.com/300x250/DDA0DD/ffffff?text=Speaker"
    }
];

let cart = [];

const productsContainer = document.getElementById('products-container');
const cartCount = document.querySelector('.cart-count');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
    setupEventListeners();
});

function displayProducts(productsToShow) {
    productsContainer.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h4>${product.name}</h4>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        updateCartCount();
        showAddToCartAnimation();
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showAddToCartAnimation() {
    const cartElement = document.querySelector('.nav-cart');
    cartElement.style.transform = 'scale(1.1)';
    cartElement.style.transition = 'transform 0.2s';
    
    setTimeout(() => {
        cartElement.style.transform = 'scale(1)';
    }, 200);
}

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

function setupEventListeners() {
    searchBtn.addEventListener('click', searchProducts);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent.toLowerCase();
            filterByCategory(categoryName);
        });
    });
    
    document.querySelector('.nav-cart').addEventListener('click', function() {
        showCart();
    });
    
    document.querySelector('.nav-signin').addEventListener('click', function() {
        alert('Sign in functionality - Feature coming soon!');
    });
}

function filterByCategory(category) {
    let filteredProducts = products;
    
    switch(category) {
        case 'electronics':
            filteredProducts = products.filter(p => 
                p.name.toLowerCase().includes('headphones') || 
                p.name.toLowerCase().includes('watch') || 
                p.name.toLowerCase().includes('charger') ||
                p.name.toLowerCase().includes('mouse') ||
                p.name.toLowerCase().includes('hub') ||
                p.name.toLowerCase().includes('speaker')
            );
            break;
        default:
            filteredProducts = products;
    }
    
    displayProducts(filteredProducts);
    
    document.querySelector('.featured-products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function showCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let cartContent = 'Your Cart:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartContent += `${item.name}\nQuantity: ${item.quantity}\nPrice: $${itemTotal.toFixed(2)}\n\n`;
        total += itemTotal;
    });
    
    cartContent += `Total: $${total.toFixed(2)}`;
    
    alert(cartContent);
}

document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('.categories').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

document.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});