/* Carrusel de imágenes */
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');

let index = 1; // empezamos en la primera real
const DELAY = 2000;

function updateCarousel(animate = true) {
  track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Posición inicial
updateCarousel(false);

// Autoplay
setInterval(() => {
  index++;
  updateCarousel();

  // Si llegamos al clon final
  if (index === slides.length - 1) {
    setTimeout(() => {
      index = 1;
      updateCarousel(false);
    }, 500);
  }

  // Si llegamos al clon inicial (por seguridad)
  if (index === 0) {
    setTimeout(() => {
      index = slides.length - 2;
      updateCarousel(false);
    }, 500);
  }
}, DELAY);
//###############################################################################
/* Aplicación Vue.js */
const app = Vue.createApp({
  data() {
    return {
      productos: [] ,
      carrito: [],
      mostrarProducto: null,
    }
  },
  methods: {
    toggleShowProducto(id) {
      mostrarProducto = id;
    },
  }
})

/* Componente de la barra de navegación */
app.component('top-nav-bar', {
  data() {
    return {
      title: 'Tienda de Aspiradoras',
         }
  },
  template: `
    <div class="navBar"><img id="logo" src="https://www.creativefabrica.com/wp-content/uploads/2018/11/Handshake-business-logo-by-DEEMKA-STUDIO-3.jpg" alt="logo" style="size: 10px;"> 
        <a href="index.html#productos" id="navProductos">Productos</a>
        <a href="index.html#info" id="navAcerca">Acerca</a>
        <div class="nav-right">     
        <a id="navCarrito">Carrito</a>
        <button id="login"> </button>
        <a id="navIdioma">Idioma</a>
        </div>
    </div>`
})

/* Montar la aplicación // Cargar Productos */
const appInstance = app.mount('#app');
document.addEventListener("DOMContentLoaded", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", "http://localhost:8084/data_sql.php", true);

    ourRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = JSON.parse(this.responseText);

            const productosFromResponse = respuesta.map(item => ({
                id: item.id,
                name: item.name,
                imagen: item.imagen,
                precio: item.precio,
                disponibles: item.disponibles,
                descripcion: item.descripcion
            }));

            appInstance.productos = productosFromResponse;

            console.log("Productos cargados desde SQL:", productosFromResponse);
        }
    };

    ourRequest.send();
});

/* Gestión del botón de login */
const loginButton = document.getElementById("login");
if (sessionStorage.getItem('loggedUser')) {
   loginButton.textContent = "👤";
} else {
   loginButton.textContent = "Iniciar Sesión";
}
loginButton.addEventListener("click", function() {
   if (sessionStorage.getItem('loggedUser')) {
      if (confirm("¿Deseas cerrar sesión?")) {
         sessionStorage.removeItem('loggedUser');
         window.location.href = "index.html";
      }
   } else {
      window.location.href = "login.html";
   }
});


