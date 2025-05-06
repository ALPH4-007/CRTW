// ==================== CONSTANTS ==================== //
const WHATSAPP_NUMBER = "+233508174381"; // Replace with your number

// ==================== THEME SYSTEM ==================== //
// Theme Toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ==================== MOBILE MENU ==================== //
// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking menu items
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Prevent menu close when clicking inside menu
mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// ==================== CURRENCY SYSTEM ==================== //
const countrySelect = document.getElementById('country-select');
const flagIcon = document.getElementById('selected-flag');

const flagEmojis = {
    'gh': '🇬🇭',
    'nigeria': '🇳🇬',
    'usa': '🇺🇸',
    'uk': '🇬🇧'
};

const exchangeRates = {
    gh: { rate: 12.5, symbol: 'GH₵' },
    nigeria: { rate: 460, symbol: '₦' },
    usa: { rate: 1, symbol: '$' },
    uk: { rate: 0.8, symbol: '£' }
};

function formatCurrency(amount) {
    const country = countrySelect.value;
    const { rate, symbol } = exchangeRates[country];
    return `${symbol}${(amount * rate).toFixed(2)}`;
}

function updateAllPrices() {
    document.querySelectorAll('.price').forEach(element => {
        const basePrice = parseFloat(element.getAttribute('data-base-price'));
        element.textContent = formatCurrency(basePrice);
    });
    updateCart(); // Refresh cart prices too
}

countrySelect.addEventListener('change', (e) => {
    updateAllPrices();
    Cookies.set('country', e.target.value, 30); // Save country for 30 days
});

countrySelect.addEventListener('change', function() {
    const selectedCountry = this.value;
    flagIcon.textContent = flagEmojis[selectedCountry];
});

// ==================== PRODUCT SYSTEM ==================== //
const shopGrid = document.querySelector('.shop-grid');
const shopItems = [
    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.23_37535c46.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.25_006bc052.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.25_9d5b8fc3.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.25_9d5b8fc3.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.26_2a757b6e.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.23_37535c46.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.25_006bc052.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.23_37535c46.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.25_9d5b8fc3.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.26_2a757b6e.jpg" 
    },

    { 
        name: "Classic White Tee", 
        price: 19.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.25_006bc052.jpg" 
    },

    { 
        name: "Black Jeans", 
        price: 45.99, 
        image: "shop/WhatsApp Image 2025-04-16 at 14.19.26_2a757b6e.jpg" 
    },
    // Add more products...
];

function renderShopItems() {
    shopGrid.innerHTML = '';
    shopItems.forEach(item => {
        const shopItem = document.createElement('div');
        shopItem.classList.add('shop-item');
        shopItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            
            <p class="price" data-base-price="${item.price}">${formatCurrency(item.price)}</p>
            <button class="add-to-cart" 
                    data-name="${item.name}" 
                    data-price="${item.price}"
                    data-image="${item.image}">
                Add to Cart
            </button>
        `;
        shopGrid.appendChild(shopItem);
    });

    // Add size selection event listeners
    document.querySelectorAll('.size-selector').forEach(selector => {
        selector.addEventListener('click', e => {
            if (e.target.classList.contains('size-option')) {
                // Remove selected class from only this product's size options
                const currentSelector = e.target.closest('.size-selector');
                currentSelector.querySelectorAll('.size-option').forEach(option => {
                    option.classList.remove('selected');
                });
                // Add selected class to clicked option
                e.target.classList.add('selected');
                
                // Update this specific product's add to cart button
                const button = e.target.closest('.shop-item').querySelector('.add-to-cart');
                button.dataset.size = e.target.dataset.size;
            }
        });
    });
}

// ==================== CART SYSTEM ==================== //
const cartModal = document.querySelector('.cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
let cart = [];

// Toggle cart visibility
document.querySelector('.cart-icon').addEventListener('click', () => {
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cart functions
function addItemToCart(name, price, image, size) {
    const itemKey = `${name}-${size}`; // Create unique key for each size variant
    const existingItem = cart.find(item => item.name === name && item.size === size);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, size, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name} - Size ${item.size} (${item.quantity})</div>
                <div class="cart-item-price">${formatCurrency(itemTotal)}</div>
            </div>
            <button class="remove-item" data-name="${item.name}" data-size="${item.size}">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalAmount.textContent = formatCurrency(total);
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            cart = cart.filter(item => !(item.name === button.getAttribute('data-name') && item.size === button.getAttribute('data-size')));
            updateCart();
        });
    });

    Cookies.set('cart', cart, 7); // Save cart for 7 days
}

// Add to cart event delegation
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const button = e.target;
        addToCart(button);
    }
});

function addToCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    // Find existing item in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    }
    
    updateCart();
}

// WhatsApp integration
document.querySelector('.proceed-to-purchase').addEventListener('click', () => {
    if (cart.length === 0) return alert('Your cart is empty!');
    
    let message = `Hello Urban Threads!%0A%0AI would like to purchase:%0A%0A`;
    
    cart.forEach(item => {
        message += `➤ *${item.name}*%0A`;
        message += `Quantity: ${item.quantity}%0A`;
        message += `Price: ${formatCurrency(item.price * item.quantity)}%0A`;
        message += `Image: ${item.image}%0A%0A`;
    });
    
    message += `*Total Amount: ${totalAmount.textContent}*%0A%0A`;
    message += `Please confirm availability and payment details.`;
    
    window.open(`https://wa.me/${+233508174381}?text=${message}`, '_blank');
});

// ==================== SLIDESHOW SYSTEM ==================== //
// Slideshow functionality
let slideIndex = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let touchStartX = 0;
let touchEndX = 0;

// Initialize slideshow
function initSlideshow() {
    showSlide(0);
    startAutoSlide();
    setupEventListeners();
}

// Show specific slide
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slideIndex = n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

// Next/Previous controls
function changeSlide(n) {
    stopAutoSlide();
    showSlide(slideIndex + n);
    startAutoSlide();
}

// Start auto-sliding
function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Stop auto-sliding
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Setup event listeners
function setupEventListeners() {
    // Touch events
    const slidesWrapper = document.querySelector('.slides-wrapper');
    slidesWrapper.addEventListener('touchstart', handleTouchStart, false);
    slidesWrapper.addEventListener('touchmove', handleTouchMove, false);
    slidesWrapper.addEventListener('touchend', handleTouchEnd, false);
    
    // Pause auto-slide on hover
    const slideshow = document.querySelector('.slideshow-container');
    slideshow.addEventListener('mouseenter', stopAutoSlide);
    slideshow.addEventListener('mouseleave', startAutoSlide);
}

// Touch handlers
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    const touchDiff = touchStartX - touchEndX;
    if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
        if (touchDiff > 0) {
            changeSlide(1); // Swipe left
        } else {
            changeSlide(-1); // Swipe right
        }
    }
}

// Product Images Slideshow
document.querySelectorAll('.product-images').forEach(container => {
    const images = container.querySelectorAll('.product-image');
    let currentIndex = 0;
    let touchStartX;
    let touchEndX;

    container.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchmove', e => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', () => {
        if (!touchStartX || !touchEndX) return;
        
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 50) {
            images[currentIndex].classList.remove('active');
            if (diffX > 0) {
                // Swipe left
                currentIndex = (currentIndex + 1) % images.length;
            } else {
                // Swipe right
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            images[currentIndex].classList.add('active');
        }
        
        touchStartX = null;
        touchEndX = null;
    });

    // Click handling for desktop
    container.addEventListener('click', e => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        images[currentIndex].classList.remove('active');
        if (x > rect.width / 2) {
            // Click on right side
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            // Click on left side
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        images[currentIndex].classList.add('active');
    });
});

// Size selection
document.querySelectorAll('.size-selector').forEach(selector => {
    selector.addEventListener('click', e => {
        if (e.target.classList.contains('size-option')) {
            // Remove selected class from all options in this selector
            selector.querySelectorAll('.size-option').forEach(option => {
                option.classList.remove('selected');
            });
            // Add selected class to clicked option
            e.target.classList.add('selected');
            
            // Update add to cart button with selected size
            const button = selector.closest('.arrival-item').querySelector('.add-to-cart');
            button.dataset.size = e.target.dataset.size;
        }
    });
});

// ==================== COOKIE SYSTEM ==================== //
// Cookie utility functions
const Cookies = {
    set: function(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + expires + '; path=/';
    },

    get: function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
            }
        }
        return null;
    },

    delete: function(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

// Load cart from cookies on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = Cookies.get('cart');
    if (savedCart) {
        cart = savedCart;
        updateCart();
    }

    // Load theme preference
    const savedTheme = Cookies.get('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Load country preference
    const savedCountry = Cookies.get('country');
    if (savedCountry) {
        document.getElementById('country-select').value = savedCountry;
        updateAllPrices();
    }
});

// Save theme preference
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);
    Cookies.set('theme', newTheme, 30); // Save theme for 30 days
}

// Clear all cookies function (for debugging)
function clearAllCookies() {
    Cookies.delete('cart');
    Cookies.delete('theme');
    Cookies.delete('country');
    location.reload();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlideshow);

// ==================== INITIALIZATION ==================== //
renderShopItems();
updateAllPrices();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ 
            top: target.offsetTop - 80, 
            behavior: 'smooth' 
        });
    });
});


// Newsletter functionality
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const messageDiv = this.querySelector('.newsletter-message');
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showNewsletterMessage('Please enter a valid email address', 'error');
        return;
    }

    // Simulate API call to subscribe
    subscribeToNewsletter(email)
        .then(response => {
            showNewsletterMessage('Thank you for subscribing!', 'success');
            this.reset();
            // Save to localStorage
            saveSubscriber(email);
        })
        .catch(error => {
            showNewsletterMessage('Failed to subscribe. Please try again.', 'error');
        });
});

function showNewsletterMessage(message, type) {
    const messageDiv = document.querySelector('.newsletter-message');
    messageDiv.textContent = message;
    messageDiv.className = 'newsletter-message ' + type;
    
    // Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'newsletter-message';
    }, 3000);
}

function saveSubscriber(email) {
    let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    subscribers.push({
        email: email,
        date: new Date().toISOString()
    });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
}

// Simulate API call
function subscribeToNewsletter(email) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Check if already subscribed
            let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            if (subscribers.some(sub => sub.email === email)) {
                reject('Already subscribed');
            } else {
                resolve({ success: true });
            }
        }, 1000);
    });
}

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.onerror = null;
        this.src = 'https://via.placeholder.com/400x600?text=Image+Not+Found';
        console.log(`Failed to load image: ${this.src}`);
    };
});