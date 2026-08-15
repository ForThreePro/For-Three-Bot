let cart = [];

// CARGAR CARRITO AL INICIAR
window.onload = function() {
    const savedCart = localStorage.getItem('sapitoCart');
    if(savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// GUARDAR CARRITO
function saveCart() {
    localStorage.setItem('sapitoCart', JSON.stringify(cart));
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if(existing) {
        existing.qty++;
    } else {
        cart.push({name, price, qty: 1});
    }
    updateCart();
    saveCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
    saveCart();
}

function changeQty(name, change) {
    const item = cart.find(item => item.name === name);
    if(item) {
        item.qty += change;
        if(item.qty <= 0) removeFromCart(name);
        updateCart();
        saveCart();
    }
}

function clearCart() {
    if(confirm('¿Seguro que quieres vaciar el carrito?')) {
        cart = [];
        updateCart();
        saveCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <div class="cart-item-controls">
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQty('${item.name}', -1)">-</button>
                        <span class="qty">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
                    </div>
                    <span>S/ ${item.price * item.qty}</span>
                    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Eliminar</button>
                </div>
            </div>
        `;
    });
    
    cartCount.innerText = count;
    cartTotal.innerText = total;
}

function toggleCart() {
    document.getElementById('cart').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

function sendWhatsApp() {
    if(cart.length === 0) {
        alert('Tu carrito está vacío 🐸');
        return;
    }
    
    const fecha = new Date().toLocaleString('es-PE');
    let message = `*🐸 SAPITO BOT - NUEVO PEDIDO 🐸*%0A`;
    message += `*================================*%0A%0A`;
    message += `*Fecha:* ${fecha}%0A`;
    message += `*Cliente:* [Tu nombre]%0A%0A`;
    message += `*📦 DETALLE DEL PEDIDO:*%0A`;
    message += `*================================*%0A%0A`;
    
    let total = 0;
    cart.forEach((item, i) => {
        message += `*${i+1}. ${item.name}*%0A`;
        message += `   Cantidad: ${item.qty}%0A`;
        message += `   Precio Unit: S/ ${item.price}%0A`;
        message += `   Subtotal: *S/ ${item.price * item.qty}*%0A%0A`;
        total += item.price * item.qty;
    });
    
    message += `*================================*%0A`;
    message += `*💰 TOTAL A PAGAR: S/ ${total}*%0A`;
    message += `*================================*%0A%0A`;
    message += `*💳 MÉTODOS DE PAGO DISPONIBLES:*%0A`;
    message += `- Yape: 927 174 369%0A`;
    message += `- Global66%0A`;
    message += `- Prex%0A%0A`;
    message += `Por favor confírmame el pago para activar tu servicio ⚡%0A`;
    message += `Gracias por elegir SAPITO BOT!`;
    
    window.open(`https://wa.me/51927174369?text=${message}`, '_blank');
    toggleCart();
}

// CONTADOR
const counters = document.querySelectorAll('.stat-num[data-count]');
const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count');
    const increment = target / 100;
    const update = () => {
        const count = +counter.innerText;
        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(update, 20);
        } else {
            counter.innerText = target;
        }
    };
    update();
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
});
counters.forEach(counter => observer.observe(counter));

// MUSICA
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isPlaying = true;
music.volume = 0.3;
musicBtn.addEventListener('click', () => {
    if(isPlaying) {
        music.pause();
        musicBtn.innerText = '🔇 Música OFF';
        isPlaying = false;
    } else {
        music.play();
        musicBtn.innerText = '🔊 Música ON';
        isPlaying = true;
    }
});