let carrito = [];
let total = 0;
let usuarios = []; // Almacena los usuarios registrados
let usuarioActual = null; // Almacena el usuario que ha iniciado sesión

function agregarAlCarrito(nombre, precio) {
    if (!usuarioActual) {
        alert('Debes iniciar sesión o registrarte para agregar productos al carrito.');
        return;
    }
    carrito.push({ nombre, precio });
    total += precio;
    document.getElementById('carrito-cantidad').innerText = carrito.length;
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    carrito.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        listaCarrito.appendChild(li);
    });
    document.getElementById('total-carrito').innerText = total.toFixed(2);
}

function vaciarCarrito() {
    if (!usuarioActual) {
        alert('Debes iniciar sesión para vaciar el carrito.');
        return;
    }
    carrito = [];
    total = 0;
    document.getElementById('carrito-cantidad').innerText = 0;
    actualizarCarrito();
}

function toggleCarrito() {
    if (!usuarioActual) {
        alert('Debes iniciar sesión para ver el carrito.');
        return;
    }
    const carritoElement = document.getElementById('carrito');
    carritoElement.style.display = carritoElement.style.display === 'none' ? 'block' : 'none';
}

function mostrarCheckout() {
    if (!usuarioActual) {
        alert('Debes iniciar sesión para proceder al pago.');
        return;
    }
    const checkout = document.getElementById('checkout');
    checkout.style.display = 'block';
    document.getElementById('carrito').style.display = 'none';
}

function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('main > section');
    secciones.forEach(s => s.style.display = 'none');
    document.getElementById(seccion).style.display = 'block';
}

// Eventos de inicio de sesión y registro
document.getElementById('login-btn').addEventListener('click', function() {
    const email = prompt('Introduce tu correo electrónico:');
    const password = prompt('Introduce tu contraseña:');
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
        usuarioActual = usuario;
        alert('Inicio de sesión exitoso');
        document.getElementById('login-btn').style.display = 'none'; // Oculta botón de inicio de sesión
        document.getElementById('register-btn').style.display = 'none'; // Oculta botón de registro
    } else {
        alert('Correo electrónico o contraseña incorrectos.');
    }
});

document.getElementById('register-btn').addEventListener('click', function() {
    const email = prompt('Introduce tu correo electrónico:');
    const password = prompt('Introduce tu contraseña:');
    
    if (usuarios.find(u => u.email === email)) {
        alert('Este correo electrónico ya está registrado.');
    } else {
        usuarios.push({ email, password });
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
    }
});
