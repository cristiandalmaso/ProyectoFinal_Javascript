const nombre = document.getElementById("nombre");
nombre.addEventListener("input", () => {
  nombre.setAttribute("nombre", nombre);
  const nombreStorage = localStorage.setItem("nombre", nombre.value);
});

const apellido = document.getElementById("apellido");
apellido.addEventListener("input", () => {
  apellido.setAttribute("apellido", apellido);
  const apellidoStorage = localStorage.setItem("apellido", apellido.value);
});

const direccion = document.getElementById("direccion");
direccion.addEventListener("input", () => {
  direccion.setAttribute("direccion", direccion);
  const direccionStorage = localStorage.setItem("direccion", direccion.value);
});

//Seleccion medio de pago
const medioPago = document.querySelector("#medio-pago");
medioPago.addEventListener("change", (e) => {
  /* Si el medio de pago elegido es 1, despliega menu relacionado a tarjeta de credito */
  if (e.target.value === "1") {
    let datosPago = document.getElementById("contenedor-datos-pago");
    datosPago.innerHTML = ` 
        <label for="datosTarjetaCredito" class="col-sm-2 col-form-label"></label>
        <div class="datos-tarjeta">
        <span">Ingrese numero de tarjeta de crédito</span>
          <input type="text" required class="form-control" min="16" id="datosPagoTarjeta">
        </div>
        <label for="CVC" class="col-sm-2 col-form-label"></label>
        <div class="datos-tarjeta">
        <span>Ingrese CVC</span>
          <input type="password" max="3" required class="form-control" id="inputPassword">
        </div>
        `;
  } else if (e.target.value === "2") {

  /* Si la opción elegida es BTC, despliega menu para datos billetera BTC */
    let datosPago = document.getElementById("contenedor-datos-pago");
    datosPago.innerHTML = ` 
        <label for="datosBilleteraBitcoin" class="col-sm-2 col-form-label"></label>
        <div class="datos-tarjeta">
        <span>Ingrese numero de billetera BTC</span>
          <input type="text" class="form-control" id="inputPassword">
        </div>
        `;
  } else if (e.target.value === "3") {
  /* Si la opción elegida es ETH, despliega menu para datos billetera ETH */
    let datosPago = document.getElementById("contenedor-datos-pago");
    datosPago.innerHTML = ` 
        <label for="datosBilleteraEthereum" class="col-sm-2 col-form-label"></label>
        <div class="datos-tarjeta">
        <span>Ingrese numero de billetera ETH</span>
          <input type="text" class="form-control" id="inputPassword">
        </div>
        `;
  }
});

/* Lee total a pagar del Storage para informar importe total */
const totalaPagar = document.getElementById("totalPagar");
totalaPagar.innerHTML = `<div class="totalPagar">Total a pagar: ${localStorage.getItem(
  "totalCompra"
)} USD</div>`;

/* Botón realiza pago */
let realizaPago = document.getElementById("realizar-pago");

realizaPago.addEventListener("click", () => {
  if (!localStorage.getItem("nombre")) {
    Swal.fire({
      icon: "error",
      text: "Debe ingresar un nombre",
    });
  } else {
    if (!localStorage.getItem("apellido")) {
      Swal.fire({
        icon: "error",
        text: "Debe ingresar un apellido",
      });
    } else {
      if (!localStorage.getItem("direccion")) {
        Swal.fire({
          icon: "error",
          text: "Debe ingresar una dirección",
        });
      } else {
        if (!localStorage.getItem("totalCompra")) {
          Swal.fire({
            icon: "error",
            text: "No hay items en el carrito",
          });
        } else {
          let timerInterval;
          Swal.fire({
            title: "Procesando pago",
            timer: 3000,
            timerProgressBar: true,
            background: "#e9ecef",
            color: "#000",

            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                /*b.textContent = Swal.getTimerLeft();
                 */
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              Swal.fire({
                icon: "success",
                html: `<p class="texto-alert"> Pago confirmado por ${localStorage.getItem(
                  "totalCompra"
                )}.00 USD. Muchas gracias por su compra</p>`,
              });
            }
          });
        }
      }
    }
  }
});
