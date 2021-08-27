//  __________    ENTIDADES  __________    

//Clase Persona para instanciado de usuarios
class Persona {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

//Class Ceramica para instanciado de objetos de tienda Ceramica NUCO
class Ceramica {
    constructor(idPieza, pieza, modelo, color, precio, disponibles, imagen) {
        this.idPieza = idPieza;
        this.pieza = pieza;
        this.modelo = modelo;
        this.color = color;
        this.precio = Number(precio);
        this.disponibles = disponibles;
        this.imagen = imagen;
    }
    //Método para imprimir datos
    informacionPiezas() {
        return `Pieza Cerámica ${this.idPieza}: ${this.pieza} | Modelo ${this.modelo} | Color ${this.color} | Precio: $ ${this.precio}`;
    }
}

//  __________  VARIABLES __________ 

//Instanciando objetos a partir de la clase Cerámica
const tazaGr = new Ceramica(`ID 1`, 'Taza Grande', 'Lorenzo', `Blanco`, 900, 12, `./img/tazasGr.jpeg`);
const tazaCh = new Ceramica(`ID 2`, 'Taza Chica', 'Agatha', `Blanco`, 650, 12, `./img/tazasCh.jpg`);
const tetera = new Ceramica(`ID 3`, 'Tetera', 'Pocha', `Blanco`, 1200, 5, `./img/tetera.jpg`);
const platoGr = new Ceramica(`ID 4`, 'Plato Grande', 'Pachorra', `Blanco`, 1000, 12, `./img/platoGr.jpg`);
const platoCh = new Ceramica(`ID 5`, 'Plato Chico', 'AzarOso', `Blanco`, 850, 12, `./img/platoCh.jpeg`);
const exprimidor = new Ceramica(`ID 6`, 'Exprimidor', 'Polaca', `Blanco`, 900, 5, `./img/exprimidor.jpeg`);
const fuente = new Ceramica(`ID 7`, 'Fuente', 'Pumba', `Blanco`, 1750, 6, `./img/fuente.jpg`);
const bowlGr = new Ceramica(`ID 8`, 'Bowl Grande', 'Silver', `Blanco`, 1200, 4, `./img/bowlGr.jpg`);
const bowlCh = new Ceramica(`ID 9`, 'Bowl Chico', 'Sancho', `Blanco`, 1000, 4, `./img/bowlCh.jpg`);
const ensaladera = new Ceramica(`ID 10`, 'Ensaladera', 'Pe King', `Blanco`, 1200, 4, `./img/ensaladera.jpg`);

let personas = []
let ceramicas = []
ceramicas.push(tazaGr, tazaCh, tetera, platoGr, platoCh, exprimidor, fuente, bowlGr, bowlCh, ensaladera);
let carritoCompras;
let productosCeramicaVenta;
const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const iva = x => x * 0.21;
let precioDescuento = 0;
let precioFinal = 0;
let precioDolar = 0;
let dolarActual = 0;

//  __________  SELECTORES __________ 
const piezas = document.querySelector('#piezasCeramicas');
const carritoVenta = document.querySelector('#carritoVenta');
const totalVenta = document.querySelector('#totalVenta');
const vaciarVenta = document.querySelector('#vaciarVenta');
const compraPiezas = document.querySelector('#comprar');
const tienda = document.querySelector('#tienda');
let carritoCliente = document.querySelector('#carritoCliente');
let carrito = [];

$(() => {

    console.log("el dom está listo!");

    $("#saludoJQuery").attr("class", "saludoDesdeJquery")
    $("#saludoJQuery").fadeOut(4000)
    $("#saludoJQuery").text("javaScript");
    $("h3").addClass("text-success m-3");
    $("#presentacion").hide();

    //Animaciones y ejecuión de métodos encadenados
    $(".jQueryFooter").prepend('<div id="animacionJQuery" class="text-primary"><h2>Entrega de Proyecto</h2></div>');
    $("#animacionJQuery").append('<button id="btnOcultar" class="text-light btn bg-success m-5">entrar</button>');

    $(".datosCursada").hide();
    //Usamos slideUp sobre div1 en respuesta al click del boton btn1
    $("#btnOcultar").click(() => {
        $(".btn-comienzo").show();
        $("#animacionJQuery").attr("class", "h2 text-primary m-5 p-5");
        $("#animacionJQuery").fadeOut(6000);
        $("#animacionJQuery").css("background-color", "black")
        $("#animacionJQuery").text("PROYECTO INTERACTIVO DE CARRITO DE COMPRAS CODERHOUSE - Comisión 16790 - Profesor: Julián Fuoco");
        $(".datosCursada").append('<div class="text-success m-5"><h3>JavaScript en Coder House</h3></div>');
        $(".datosCursada").append('<div class="text-success m-5"><h4>Camada-16790</h4></div>');
        $(".datosCursada").append('<div class="text-success m-5"><h4>Profesor Titular: Julián Fuoco</h4></div>');
        $(".datosCursada").append('<div class="text-success m-5"><h4>Profesor Adjunto: Juan Chapur</h4></div>');
        $(".datosCursada").append('<div class="text-success m-5"><h4>Tutora: Solange Mac Intyre</h4></div>');
        $(".datosCursada").append('<div class="text-success m-5"><h4>Alumno: Guillermo Vicente</h4></div>');
        $(".datosCursada").hide()
    });


    $(".btn-comienzo").click(function () {
        $("#presentacion").hide();
        $(".btn-comienzo").hide();
        $("#saludoJQuery").hide();
        $("#principal").fadeIn(2000);
        $("nav").slideDown(2500);
    })

    //incorporando una petición AJAX, trayendo de una base de datos, a través de una url, para poder mostrar información de "nuestros usuarios"
    //asigno a una variable URL los datos traídos por URL, declaro la constante
    const apiUsuarios = "https://jsonplaceholder.typicode.com"
    //lo ubico en el html, y genero el botón que permitirá desplegar nuestros usuarios
    $("#apisNuco").prepend('<button  id="nuestrosUsuarios" class="btn btn-primary m-2">nuestros usuarios</</button>');
    $("#nuestrosUsuarios").click(() => {
        //método get; con url y función (con resultado y estado), concatenando /users para acceder a los usuarios
        $.get(`${apiUsuarios}/users`, function (respuesta, estado) {
            if (estado === "success") {
                for (const element in respuesta) {
                    $(".nuestrosUsuarios").append(`
                        <div class="card col-sm-3 m-1">
                            <div class="h3">${respuesta[element].username}</div>
                            <div>${respuesta[element].email}</div>
                            <div>Ciudad: ${respuesta[element].address.city}</div>
                        </div>`);
                }
            }
            $(".nuestrosUsuarios").css("background-color", "#fdb7f4")
                .fadeIn(2000)
                .fadeOut(3500)
        });
    });

    //trabajando con un json local, para referenciar a nuestros localesNuco
    const apiLocalesNuco = "./json/localesNuco.json"
    $("#apisNuco").prepend('<button id="btnLocales" class="btn btn-primary m-2">nuestros locales</button>');
    $("#btnLocales").click(() => {
        $.get(apiLocalesNuco, function (respuesta, estado) {
            if (estado == "success") {
                respuesta.forEach(dato => {
                    $(".locales").append(`
                        <div class="card col-sm-3 m-1">
                            <div class="text-primary h4">${dato.company.name}</div>
                            <div class="h6">${dato.company.catchPhrase}</div>
                            <div class="text-success h4">${dato.website}</div>
                            <div class="bg-warning">Dirección: ${dato.address.suite}</div>
                            <div class="bg-warning" >Ciudad: ${dato.address.city}</div>
                        </div>`);
                });
            };
            $(".locales").css("background-color", "#fdb7f4")
                .delay(1000)
                .slideUp(3500)
        });
    });

    // Evento para mostrar Usuarix:
    const mostrarMenu = document.getElementById("mostrarMenu");
    mostrarMenu.addEventListener("click", mostrarFormulario);

    function mostrarFormulario() {
        document.getElementById("formularioUs").classList.toggle("oculto");
    };

    //agrego dentro de sesionUsuario un div con un formulario para poder recoger los datos de usuarios
    $('#sesionUsuario').append(
        `<div id="formularioUs" class="container-fluid card-body oculto">
        <form id="enviarUsuario" class="container col-sm-6 mb-3">
            <input id="nombreUs" class="card-title" name="nombre" type="text" autocomplete="off" placeholder="Nombre">
            <input id="apellidoUs" class="card-text" name="apellido" type="text" autocomplete="off" placeholder="Apellido">
            <input id="emailUs" class="card-text" name="email" type="email" autocomplete="off" placeholder="Correo">
            <input class="card-text" type="submit" value="Agregar Sesión">
        </form>
    </div>`);

    //quiero que cuando se aplique me haga un submit  
    const enviarUsuario = function (e) {
        e.preventDefault();

        let nombreUs = $("#nombreUs").val().toUpperCase();
        let apellidoUs = $("#apellidoUs").val().toUpperCase();
        console.log(`${nombreUs} ${apellidoUs}`);
        personas.push(nombreUs, apellidoUs);
        console.log(personas);
        localStorage.setItem("nombre", JSON.stringify(nombreUs))
        localStorage.setItem("apellido", JSON.stringify(apellidoUs))
        //una vez registrado se deja de ver el cuadro de diálogo
        mostrarMenu.style.display = "none"
        $('.sesion').slideDown(2000)
        $('.sesion').append(`<h5 class="text-danger">${nombreUs} ${apellidoUs}</h5>`);

        return formularioUs.style.display = "none"
    };

    $("#enviarUsuario").submit(enviarUsuario);

    //javascript vanilla

    //  Evento para cambiar Fondo
    const botonCambiarFondo = document.getElementById("cambiarFondo");
    botonCambiarFondo.addEventListener("click", cambiarFondo);

    //  Funcion para cambiar tema
    function cambiarFondo() {
        //toggle: si existe lo elimina, si no existe lo coloca
        document.body.classList.toggle("cambiarFondo");
    }

    //mostrando las piezas cerámicas
    function mostrarPiezas() {

        ceramicas.forEach(ceramicas => {

            let piezaCeramica = document.createElement('div');
            piezaCeramica.classList.add('text-primary', 'card');

            let nombrePieza = document.createElement('h5');
            nombrePieza.classList.add('text-success', 'pt-3');
            nombrePieza.textContent = `${ceramicas.pieza}`;

            let modeloPieza = document.createElement('h6');
            modeloPieza.classList.add('text-success');
            modeloPieza.textContent = `Modelo: ${ceramicas.modelo}`;

            let imagenPieza = document.createElement('img');
            imagenPieza.classList.add('img-fluid', 'card-img-top', "ima");
            imagenPieza.setAttribute('src', `/${ceramicas.imagen}`);

            let precioPieza = document.createElement('p');
            precioPieza.textContent = `Precio: $ ${ceramicas.precio}.-`;
            precioPieza.setAttribute("class", "text-danger");

            let disponiblePieza = document.createElement('p');
            disponiblePieza.textContent = `Disponibles ${ceramicas.disponibles}`;
            disponiblePieza.setAttribute("class", "parrafo3");

            let agregarPieza = document.createElement('button');
            agregarPieza.classList.add('btn', 'btn-success', 'botonPiezasModelo', 'nvo');
            agregarPieza.textContent = 'Agregar';
            agregarPieza.setAttribute('aplicar', ceramicas.idPieza);
            agregarPieza.addEventListener('click', stockDinamico);
            agregarPieza.addEventListener('click', agregarCarrito);

            function stockDinamico() {
                ceramicas.disponibles = ceramicas.disponibles - 1
                disponiblePieza.textContent = `Disponibles ${ceramicas.disponibles}`;
                if (ceramicas.disponibles === 0) {
                    disponiblePieza.textContent = 'No hay Stock!';
                    disponiblePieza.classList.add('parrafo1', 'text-danger');
                    agregarPieza.classList.add('btn', 'btn-danger', 'botonPiezasModelo');
                }
            };

            function agregarCarrito(e) {
                e.preventDefault(e)
                apisNuco.style.display = "none";
                //se advierte al usuaerio debe registrarse
                JSON.parse(localStorage.getItem("nombre")) === null ? agregarPieza.textContent = `Por favor regístrese` : agregarPieza.textContent = `Agregar`
                //se agrega a través de método push y con el getAttribute aplicar
                carrito.push(this.getAttribute('aplicar'));
                calcularCarrito();
                actualizarCarrito();
            };
            //Insertando todo
            piezaCeramica.appendChild(nombrePieza);
            piezaCeramica.appendChild(modeloPieza);
            piezaCeramica.appendChild(imagenPieza);
            piezaCeramica.appendChild(precioPieza);
            piezaCeramica.appendChild(disponiblePieza);
            piezaCeramica.appendChild(agregarPieza);
            piezas.appendChild(piezaCeramica);
        });

        //calculando el carrito
        function calcularCarrito() {
            total = 0;
            //usando método filter para calcular piezas agregadas
            carrito.forEach(item => {
                let ceramicasVendidas = ceramicas.filter(function (piezaCeramicaAgregada) {
                    return piezaCeramicaAgregada['idPieza'] === item;
                });
                console.log("Venta: Producto: " + item);

                total = total + ceramicasVendidas[0]['precio'];

                return ceramicasVendidas[0]
            })
            console.log("valor Acumulado: " + total);
            totalVenta.textContent = total;
        }

        function actualizarCarrito() {
            carritoVenta.textContent = '';
            carritoCliente.style.display = 'inline';
            let carritoNuevo = [...new Set(carrito)];
            carritoNuevo.forEach(function (item, indice) {
                //recorremos y hacemos un filtrado y un reduce para determinar las CerámicasVendidas y CantidadCeramicasAgregada
                let ceramicasVendidas = ceramicas.filter(function (piezaCeramicaAgregada) {
                    return piezaCeramicaAgregada['idPieza'] === item;
                });
                //el array carrito crece 1 a medida que se hace click en el item, que determina a qué item hace referencia
                let cantidadCeramicasAgregada = carrito.reduce(function (total, itemId) {
                    return itemId === item ? total += 1 : total;
                }, 0);

                let piezaCeramica = document.createElement('div');
                piezaCeramica.classList.add('despliegueCarrito', 'text-right');
                piezaCeramica.textContent = `${cantidadCeramicasAgregada} x ${ceramicasVendidas[0]['pieza']} Modelo ${ceramicasVendidas[0]['modelo']} $${ceramicasVendidas[0]['precio']}`;

                // Boton de borrar el artículo
                let botonCancelar = document.createElement('button');
                botonCancelar.classList.add('btn', 'btn-warning', 'mx-1', 'float-end');
                botonCancelar.textContent = 'quitar';
                botonCancelar.setAttribute('item', item);
                botonCancelar.addEventListener('click', borrarPiezaCarrito);

                //Insertar
                piezaCeramica.appendChild(botonCancelar);
                carritoVenta.appendChild(piezaCeramica);

                function guardarStorage() {
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                }
                guardarStorage();
            });
        };

        //eliminando las piezas del carrito
        function borrarPiezaCarrito() {
            let id = this.getAttribute('item');
            carrito = carrito.filter(function (carritoId) {
                console.log(`Producto Retirado` + id);
                return carritoId !== id;
            });
            calcularCarrito();
            actualizarCarrito();
            ocultarCarrito();
        }

        function vaciarCarrito() {
            carritoCliente.style.display = 'none';
            carrito = [];
            console.log(disponibles)
            ceramicas.disponibles = ceramicas.disponibles;
            calcularCarrito;
            actualizarCarrito;
            guardarStorage(carrito);
            ocultarCarrito;
        }

        //si no hay piezas sumadas que carrito no se muestre
        function ocultarCarrito() {
            if (carrito.length === 0) {
                carritoCliente.style.display = 'none';
            }
        }
        ocultarCarrito();

        function guardarStorage() {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
        guardarStorage();

        vaciarVenta.addEventListener('click', vaciarCarrito);

        let compraPiezas = document.querySelector('#comprar');
        compraPiezas.textContent = 'Comprar';
        compraPiezas.addEventListener('click', compraCarrito);
        //compraPiezas.addEventListener("click", calcularCarrito);

        //confirmar Compra
        function compraCarrito() {

            carritoCompras = total
            console.log(`Valor Venta de éste carrito, son $: ${carritoCompras}`);
            let ventaCarrito = document.createElement("div");
            ventaCarrito.setAttribute("class", "parrafo1");

            let imprimirCompra = document.getElementById("final");
            imprimirCompra.style.display = "inline";
            imprimirCompra.appendChild(ventaCarrito);

            let compraPiezas = document.querySelector("#comprar");
            compraPiezas.setAttribute("class", "comprar");

            compraPiezas.textContent = "Confirmar Compra";
            compraPiezas.addEventListener("click", confirmaCompra);

            function confirmaCompra() {
                formularioUs.style.display = "none";
                apisNuco.style.display = "none";
                apisDolar.style.display = "inline";
                carritoCliente.style.display = "none";
                tienda.style.display = "none";
                mostrarMenu.style.display = "none";
                $('.sesion').hide();
                $(".jQueryFooter").hide()

                //trabajando con api de cotización de dólar 
                const apiDolar = "https://criptoya.com/api/dolar"
                $("#apisDolar").prepend('<button id="btnDolar" class="btn btn-danger m-2"> cotizacion Dólar</button>');

                $("#btnDolar").click((() => {
                    $.get(apiDolar, function (respuesta, estado) {
                        if (estado === "success") {
                            for (const dolar in respuesta) {
                                $(".dolar").append(`
                                    <div class="col-sm-1 m-1">
                                        <div class="h5">${dolar}</div>
                                        <div class="">$${respuesta[dolar]}</div>
                                    </div>`);
                                //obtengo el valor del dolar al momento en una variable y lo "exporto" en un json
                                dolarAhora = respuesta.blue;
                                localStorage.setItem("dolarAhora", JSON.stringify(dolarAhora))
                            }
                        }
                        $(".dolar").css("background-color", "#fdb7f4")
                            .delay(2000)
                            .slideUp(5000)
                    });
                }));

                dolarAhora = JSON.parse(localStorage.getItem("dolarAhora"))
                precioDescuento = 0;
                precioFinal = (resta(suma(carritoCompras, iva(carritoCompras)), precioDescuento)).toFixed(2);
                precioDolar = (precioFinal / dolarAhora).toFixed(2);

                let parrafoResultadoCompra = document.createElement("p");
                parrafoResultadoCompra.textContent = `El resultado de ésta venta (sin IVA) es: $ ${carritoCompras}- `;
                parrafoResultadoCompra.setAttribute("class", "card");

                let parrafoResultadoConIVA = document.createElement("p");
                parrafoResultadoConIVA.textContent = `El precio Final con IVA incluído  es de: $ ${precioFinal}-`;
                parrafoResultadoConIVA.setAttribute("class", "card");

                let parrafoResultadoDolares = document.createElement("p");

                dolarAhora == null ? parrafoResultadoDolares.textContent = `DOLARES: observe 1º la cotización Dolar,  luego aplique 'Valor Dolar'` : parrafoResultadoDolares.textContent = `El precio Final en DOLARES es de: $ ${precioDolar}- DOLAR VALOR ACTUAL $ ${dolarAhora}`;

                let calcular = document.createElement("button");
                calcular.textContent = `Valor Dolar`;
                calcular.classList.add('btn', 'btn-info');
                calcular.addEventListener("click", actualizar);
                function actualizar() {
                    precioDescuento = 0;
                    precioFinal = (resta(suma(carritoCompras, iva(carritoCompras)), precioDescuento)).toFixed(2);
                    precioDolar = (precioFinal / dolarAhora).toFixed(2);
                    dolarAhora == null ? parrafoResultadoDolares.textContent = `DOLARES: observe su cotización actual y luego aplique` : parrafoResultadoDolares.textContent = `El precio Final EN DOLARES es de: $ ${precioDolar}- DOLAR VALOR ACTUAL $ ${dolarAhora}`;
                }

                let parrafoDetalleCompra = document.createElement("p");
                parrafoDetalleCompra.textContent = `Productos: ${carrito}`;
                parrafoDetalleCompra.setAttribute("class", "card");

                let parrafoDetalleCompra2 = document.createElement("p");
                parrafoDetalleCompra2.textContent = ``;
                parrafoDetalleCompra2.setAttribute("class", "card");

                let articleDetalleVenta = document.createElement("article");
                articleDetalleVenta.textContent = `Detalle de venta, en orden de compra por parte de cliente`;
                articleDetalleVenta.setAttribute("class", "ventaUsuario");

                articleDetalleVenta.appendChild(parrafoDetalleCompra);
                articleDetalleVenta.appendChild(parrafoDetalleCompra2);

                let sectionDetalleVenta = document.createElement("section");
                sectionDetalleVenta.appendChild(articleDetalleVenta);

                let imprimirDetalleVenta = document.getElementById("desglose");
                imprimirDetalleVenta.appendChild(sectionDetalleVenta);

                for (const [key, value] of Object.entries(carrito)) {
                    console.log(`Componente de esta venta: producto ${value}`);
                    let parrafoDetalleCompra2 = document.createElement("p");
                    parrafoDetalleCompra2.textContent = `${value}`;
                    if (value === tazaGr.idPieza) {parrafoDetalleCompra2.textContent = `${tazaGr.informacionPiezas()}`};
                    if (value === tazaCh.idPieza) {parrafoDetalleCompra2.textContent = `${tazaCh.informacionPiezas()}`};
                    if (value === tetera.idPieza) {parrafoDetalleCompra2.textContent = `${tetera.informacionPiezas()}`};
                    if (value === platoGr.idPieza) {parrafoDetalleCompra2.textContent = `${platoGr.informacionPiezas()}`};
                    if (value === platoCh.idPieza) {parrafoDetalleCompra2.textContent = `${platoCh.informacionPiezas()}`};
                    if (value === exprimidor.idPieza) {parrafoDetalleCompra2.textContent = `${exprimidor.informacionPiezas()}`};
                    if (value === fuente.idPieza) {parrafoDetalleCompra2.textContent = `${fuente.informacionPiezas()}`};
                    if (value === bowlGr.idPieza) {parrafoDetalleCompra2.textContent = `${bowlGr.informacionPiezas()}`};
                    if (value === bowlCh.idPieza) {parrafoDetalleCompra2.textContent = `${bowlCh.informacionPiezas()}`};
                    if (value === ensaladera.idPieza) {parrafoDetalleCompra2.textContent = `${ensaladera.informacionPiezas()}`};
                    //parrafoDetalleCompra2.setAttribute("class", "card");
                    parrafoDetalleCompra2.classList.add('card');
                    articleDetalleVenta.appendChild(parrafoDetalleCompra2);
                }

                parrafoResultadoDolares.setAttribute("class", "card");
                let parrafoDatosUsuario = document.createElement("p");

                JSON.parse(localStorage.getItem("nombre")) == null ? parrafoDatosUsuario.textContent = `Por favor vuelva a ingresar y regístrese para poder operar` : parrafoDatosUsuario.textContent = `Se efectúa venta a ${JSON.parse(localStorage.getItem("nombre"))} ${JSON.parse(localStorage.getItem("apellido"))} por valor de $ ` + precioFinal + ` - IVA incluído`;

                parrafoDatosUsuario.classList.add('card', 'textoRegistroUsuario');

                let final = document.createElement("button");
                final.textContent = `FIN`;
                final.setAttribute("class", "fin");
                final.addEventListener("click", fin);
                function fin() {
                    imprimirVenta.style.display = "none";
                    botonCambiarFondo.style.display = "none";
                    mostrarMenu.style.display = "none";
                    $('#apisNuco').hide();
                    $('.sesion').hide();
                    $('#apisDolar').hide();
                    $(".datosCursada").fadeIn(1500);
                    $(".body").fadeIn(1500);
                    $("body").css("background-color", "black")
                }

                let articleVenta = document.createElement("article");
                articleVenta.textContent = `VENTA ACTUAL`;
                articleVenta.setAttribute("class", "ventaUsuario");

                articleVenta.appendChild(parrafoResultadoCompra);
                articleVenta.appendChild(parrafoResultadoConIVA);
                articleVenta.appendChild(parrafoResultadoDolares);
                parrafoResultadoDolares.appendChild(calcular);
                articleVenta.appendChild(parrafoDatosUsuario);

                let sectionVenta = document.createElement("section");
                sectionVenta.appendChild(articleVenta);

                let imprimirVenta = document.getElementById("final");
                imprimirVenta.appendChild(sectionVenta);
                sectionVenta.appendChild(imprimirDetalleVenta);
                sectionVenta.appendChild(final);
            }
        }
    }
    mostrarPiezas();
});
