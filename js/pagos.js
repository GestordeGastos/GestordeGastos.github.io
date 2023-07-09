
 var pagos = [];

 var formularioPago = document.getElementById("formulario-pago");

 formularioPago.addEventListener("submit", function(event) {
   event.preventDefault();

   var fecha = document.getElementById("fecha").value;
   var monto = parseFloat(document.getElementById("monto").value);
   var descripcion = document.getElementById("descripcion").value;
   var categoria = document.getElementById("categoria").value;

 
   if (fecha !== "" && !isNaN(monto) && monto > 0 && descripcion !== "") {
     var pago = {
       fecha: fecha,
       monto: monto,
       descripcion: descripcion,
       categoria: categoria
     };
     pagos.push(pago);
     actualizarListaPagos();

     document.getElementById("fecha").value = "";
     document.getElementById("monto").value = "";
     document.getElementById("descripcion").value = "";
   } else {
     alert("Por favor, complete todos los campos del formulario.");
   }
 });

 function eliminarPago(index) {
   pagos.splice(index, 1);
   actualizarListaPagos();
 }
 function actualizarListaPagos() {
   var pagosListHTML = "<table><tr><th>Fecha</th><th>Monto</th><th>Descripción</th><th>Categoría</th><th>Tiempo Restante</th><th>Acciones</th></tr>";
   for (var i = 0; i < pagos.length; i++) {
     var pago = pagos[i];
     var tiempoRestante = calcularTiempoRestante(pago.fecha);

     pagosListHTML += "<tr>";
     pagosListHTML += "<td>" + pago.fecha + "</td>";
     pagosListHTML += "<td>$" + pago.monto.toFixed(2) + "</td>";
     pagosListHTML += "<td>" + pago.descripcion + "</td>";
     pagosListHTML += "<td>" + pago.categoria + "</td>";
     pagosListHTML += "<td><span class=\"tiempo-restante\">" + tiempoRestante + "</span></td>";
     pagosListHTML += "<td><button class=\"btn-eliminar\" onclick=\"eliminarPago(" + i + ")\">Eliminar</button></td>";
     pagosListHTML += "</tr>";
   }
   pagosListHTML += "</table>";
   document.getElementById("pagos-list").innerHTML = pagosListHTML;
 }
 
 function calcularTiempoRestante(fechaPago) {
   var fechaActual = new Date();
   var fechaPago = new Date(fechaPago);
   var tiempoRestante = fechaPago.getTime() - fechaActual.getTime();
   var diasRestantes = Math.ceil(tiempoRestante / (1000 * 60 * 60 * 24));

   if (diasRestantes < 0) {
     return "Vencido";
   } else if (diasRestantes === 0) {
     return "Hoy";
   } else if (diasRestantes === 1) {
     return "Mañana";
   } else {
     return diasRestantes + " días";
   }
 }