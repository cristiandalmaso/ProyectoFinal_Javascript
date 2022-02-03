//Seleccion medio de pago
const medioPago=document.querySelector("#medio-pago")
medioPago.addEventListener("change", (e) => {
    if(e.target.value==="1"){
        let datosPago = document.getElementById("contenedor-datos-pago");
        datosPago.innerHTML=` 
        <label for="datosTarjetaCredito" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10" style="margin-bottom: 1rem">
        <span>Ingrese numero de tarjeta de crédito</span>
          <input type="text" class="form-control" id="inputPassword">
        </div>
        <label for="CVC" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <span>Ingrese CVC</span>
          <input type="password" class="form-control" id="inputPassword">
        </div>
        `;
    }
    else if(e.target.value==="2"){
        let datosPago = document.getElementById("contenedor-datos-pago");
        datosPago.innerHTML=` 
        <label for="datosBilleteraBitcoin" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <span>Ingrese numero de billetera BTC</span>
          <input type="text" class="form-control" id="inputPassword">
        </div>
        `;
    }
    else if(e.target.value==="3"){
        let datosPago = document.getElementById("contenedor-datos-pago");
        datosPago.innerHTML=` 
        <label for="datosBilleteraEthereum" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-10">
        <span>Ingrese numero de billetera ETH</span>
          <input type="text" class="form-control" id="inputPassword">
        </div>
        `;
    }
})

let confirmarCompra = document.getElementById("realizar-pago");
confirmarCompra.addEventListener("click", Swal.fire({
  icon: 'success',
  title: 'Pago confirmado',
  text: 'Muchas gracias por su compra!',
}))
