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
      productos: [
        { 
            id: 1,
            name:'Cecotec Conga ThunderBrush 560 Aspirador Escoba y de Mano con Cable 600W',
            imagen: 'https://thumb.pccomponentes.com/w-530-530/articles/33/331508/1802-cecotec-conga-thunderbrush-560-aspirador-escoba-y-de-mano-con-cable-600w.jpg',
            precio: '39,91€',
            disponibles: 3,
            descripcion: 'La Conga ThunderBrush 560 destaca por su tecnología ciclónica avanzada que mantiene la potencia de succión constante, permitiendo eliminar suciedad incrustada en suelos duros, alfombras y rincones elevados sin esfuerzo.'
        },
        {
    id: 2,
    name:'Rowenta Swift Power Cyclonic RO2981 Aspirador sin Bolsa 750W',
    imagen: 'https://thumb.pccomponentes.com/w-530-530/articles/1085/10857031/1403-cecotec-conga-ash-5000-free-aspirador-de-cenizas-1200w-20l-18kpa-acero-inoxidable.jpg',
    precio: '79,99€',
    disponibles: 5,
    descripcion: 'Aspirador sin bolsa con tecnología ciclónica de alto rendimiento que separa eficazmente el aire de la suciedad, ofreciendo una limpieza profunda y un mantenimiento sencillo. Ideal para hogares con mascotas gracias a su potente succión.'
},
{
    id: 3,
    name:'Bosch Flexxo Serie 4 28Vmax Aspirador Escoba sin Cable',
    imagen: 'https://thumb.pccomponentes.com/w-530-530/articles/1087/10873660/1212-xiaomi-dust-mite-vacuum-cleaner-pro-aspiradora-de-acaros-con-pantalla-inteligente-led-14kpa-blanca-opiniones.jpg',
    precio: '189,00€',
    disponibles: 2,
    descripcion: 'Aspirador escoba 2 en 1 con batería de larga duración y accesorios integrados en el cuerpo para una limpieza versátil. Su sistema RobustAir mantiene un alto rendimiento incluso cuando el depósito se llena.'
},
{
    id: 4,
    name:'Taurus Ultimate Go Animal Aspirador Escoba 22.2V',
    imagen: 'https://thumb.pccomponentes.com/w-530-530/articles/1076/10768218/1723-cecotec-conga-rockstar-wet-dry-steel-pro-aspirador-de-solidos-y-liquidos-1600w-opiniones.jpg',
    precio: '129,90€',
    disponibles: 4,
    descripcion: 'Aspirador escoba ligero y manejable con cepillo motorizado especial para pelos de mascota. Su batería de litio proporciona autonomía suficiente para limpiezas completas sin interrupciones.'
},
{
    id: 5,
    name:'Philips PowerPro Compact FC9332/09 Aspirador sin Bolsa',
    imagen: 'https://thumb.pccomponentes.com/w-530-530/articles/1067/10676978/131-karcher-wd-3-v-15-4-20-aspirador-sin-bolsa-seco-humedo-1000w-caracteristicas.jpg',
    precio: '109,99€',
    disponibles: 6,
    descripcion: 'Aspirador compacto con tecnología PowerCyclone 5 que acelera el flujo de aire para separar el polvo de forma eficiente. Incluye filtro antialérgico y boquilla TriActive para una limpieza a fondo en todo tipo de suelos.'
}
      ],
    }
  },
  methods: {
    toggleShowProducto(id) {
      mostrarProducto = id;
    },
  }
})

app.mount('#app')
/*
obtenersql.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();

    ourRequest.open("GET", "http://192.168.216.175:8084/data_sql.php", true);

    ourRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var respuesta  = JSON.parse(this.responseText);
        console.log("Respuesta recibida from SQL: " + respuesta);
        
        console.log(myObj.name + " was received correctly from SQL");
    }};

    ourRequest.send();
});*/