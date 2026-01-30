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


const app = Vue.createApp({
  data() {
    return {
      
      mostrarProducto: 0,
      productos: [],
    }
  },
  methods: {
    toggleShowProducto(id) {
      mostrarProducto = id;
    },
  }
})

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

            app.productos = productosFromResponse;

            console.log("Productos cargados desde SQL:", app.productos);
        }
    };

    ourRequest.send();
});


app.mount('#app')


