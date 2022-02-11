//Seleccion medio de pago
const medioPago = document.querySelector("#medio-pago");
medioPago.addEventListener("change", (e) => {
  if (e.target.value === "1") {
    let datosPago = document.getElementById("contenedor-datos-pago");
    datosPago.innerHTML = ` 
        <label for="datosTarjetaCredito" class="col-sm-2 col-form-label"></label>
        <div class="datos-tarjeta" style="margin-bottom: 1rem">
        <span">Ingrese numero de tarjeta de crédito</span>
          <input type="text" class="form-control" id="inputPassword">
        </div>
        <label for="CVC" class="col-sm-2 col-form-label"></label>
        <div class="datos-tarjeta">
        <span>Ingrese CVC</span>
          <input type="password" class="form-control" id="inputPassword">
        </div>
        `;
  } else if (e.target.value === "2") {
    let datosPago = document.getElementById("contenedor-datos-pago");
    datosPago.innerHTML = ` 
        <label for="datosBilleteraBitcoin" class="col-sm-2 col-form-label"></label>
        <div class="datos-tarjeta">
        <span>Ingrese numero de billetera BTC</span>
          <input type="text" class="form-control" id="inputPassword">
        </div>
        `;
  } else if (e.target.value === "3") {
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

const totalaPagar = document.getElementById("totalPagar");
totalaPagar.innerHTML = `Total a pagar: ${localStorage.getItem(
  "totalCompra"
)} USD`;

let realizaPago = document.getElementById("realizar-pago");
realizaPago.addEventListener("click", () => {
  Swal.fire({
    icon: "success",
    html: `<p class="texto-alert"> Pago confirmado. Muchas gracias por su compra</p>`,
  });
});
