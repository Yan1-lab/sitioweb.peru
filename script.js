/*AQUI ES PARA EDITAR EL INDEX, SON LAS IMAGENES Y TEXTO DEL PRINCIPIO*/
const reservas = [
    { id: 1, titulo: "Machu Picchu Mágico", categoria: "tour", precio: 150, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXf3d65hM_mjGiK8FB69CA8mNxriHkFRXnLA&s", desc: "Aventura completa por la ciudadela Inca." },
    { id: 2, titulo: "Hotel Lago Titicaca", categoria: "hotel", precio: 85, img: "https://bing.com/th?asid=432345564363048627&id=OAUMA.DF335D61BD508041F0C1C94AF76E9A4B_90012EF672980592&pid=21.1&o=5&c=16&roil=0&roit=0&roir=1&roib=1&w=472&h=246&rs=2&qlt=100", desc: "Vista al lago y desayuno incluido." },
    { id: 3, titulo: "Vuelo Líneas de Nazca", categoria: "tour", precio: 120, img: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=1210,dpr=1/tour_img/5e59a564465e9.jpeg", desc: "Sobrevuelo de 30 min con guía experto." },
    { id: 4, titulo: "Resort Selva Iquitos", categoria: "hotel", precio: 210, img: "https://th.bing.com/th/id/R.78594f66f465b1df2861f4980f8f9133?rik=VEQNBr59yYkE%2fg&pid=ImgRaw&r=0", desc: "Experiencia de lujo en el Amazonas." }
];

let carritoCount = 0;
const grid = document.getElementById('grid-reservas');
const busqueda = document.getElementById('busqueda');
const filtroCat = document.getElementById('filtro-categoria');
const filtroPrecio = document.getElementById('filtro-precio');

// Esta función aplica todos los filtros (búsqueda, categoría y precio) a la vez
function aplicarFiltros() {
    const texto = busqueda.value.toLowerCase();
    const cat = filtroCat.value;
    const rango = filtroPrecio.value;
    const filtrados = reservas.filter(r => {
        const coincideTexto = r.titulo.toLowerCase().includes(texto);
        const coincideCat = (cat === 'todos' || r.categoria === cat);
//UNICAMENTE MODIFICAR ESTOS DATOS PARA AUMENTAR, O VARIAR EL RANGO DE LOS PRECIOS
        let coincidePrecio = true;
        if (rango === 'basico') {
            coincidePrecio = r.precio <= 100;
        } else if (rango === 'estandar') {
            coincidePrecio = r.precio > 100 && r.precio <= 200;
        } else if (rango === 'premium') {
            coincidePrecio = r.precio > 200;
        }
        return coincideTexto && coincideCat && coincidePrecio;
    });
    mostrarTarjetas(filtrados);
}

function mostrarTarjetas(lista) {
    grid.innerHTML = '';
    lista.forEach(item => {
        grid.innerHTML += `
            <article class="tarjeta">
                <img src="${item.img}" alt="${item.titulo}">
                <div class="info-reserva">
                    <h3>${item.titulo}</h3>
                    <p>${item.desc}</p>
                    <p class="precio">$${item.precio}</p>
                    <button class="btn-reservar" data-id="${item.id}">Reservar ahora</button>
                </div>
            </article>
        `;
    });
}

function añadirCarrito() {
    carritoCount++;
    document.getElementById('cart-count').innerText = carritoCount;
    alert("¡Reserva añadida con éxito!");
}

// Escuchar cambios en todos los controles de filtro
busqueda.addEventListener('input', aplicarFiltros);
filtroCat.addEventListener('change', aplicarFiltros);
filtroPrecio.addEventListener('change', aplicarFiltros);

/*EN CASO DE AUMENTAR DESTINOS RECORDAR COLOCAR O ACTUALIZAR LOS LINKS*/
const mapas = {
    machuPicchu: "https://www.google.com/maps?q=Machu+Picchu&output=embed",
    titicaca: "https://www.google.com/maps?q=Lago+Titicaca&output=embed",
    nazca: "https://www.google.com/maps?q=Lineas+de+Nazca&output=embed",
    iquitos: "https://www.google.com/maps?q=Iquitos&output=embed"
};

function cargarMapa(lugar) {
    const mapa = document.getElementById("mapa");

    if (mapa && mapas[lugar]) {
        mapa.src = mapas[lugar];
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const destino = localStorage.getItem("destino");

    if (!destino) return;
    /*AQUI CUANDO AGREGUEMOS MAS DESTINOS LO DENTRAN QUE AUMENTAR*/
    if (destino.includes("Machu")) cargarMapa("machuPicchu");
    if (destino.includes("Titicaca")) cargarMapa("titicaca");
    if (destino.includes("Nazca")) cargarMapa("nazca");
    if (destino.includes("Iquitos")) cargarMapa("iquitos");
});

function cambiarImagen(img) {
    const principal = document.getElementById("img-principal");

    const temp = principal.src;

    principal.style.opacity = 0;
    principal.style.transform = "scale(0.95)";

    setTimeout(() => {
        principal.src = img.src;
        img.src = temp;

        principal.style.opacity = 1;
        principal.style.transform = "scale(1)";
    }, 200);
}

mostrarTarjetas(reservas);
document.getElementById("grid-reservas").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-reservar")) {

        const card = e.target.closest(".tarjeta");
        const titulo = card.querySelector("h3").innerText;
        const id = e.target.dataset.id;

        /*CUANDO AGREGUEMOS MAS DESTINOS, SIMPLEMENTE AGREGAMOS SU RUTA AQUI*/

        let destinoURL = "";
        switch (id) {
            case "1":
                destinoURL = "/MachuPicchu.html";
                break;
            case "2":
                destinoURL = "/LagoTiticaca.html";
                break;
            case "3":
                destinoURL = "/Nazca.html";
                break;
            case "4":
                destinoURL = "/Iquitos.html";
                break;
        }
        localStorage.setItem("destino", titulo);
        document.body.classList.add("fade-out");

        setTimeout(() => {
            location.href = destinoURL;
        }, 500);
    }
});
