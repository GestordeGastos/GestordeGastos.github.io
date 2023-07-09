var nombre = "";
var presupuesto = 0;
var gastos = [];

function saludar() {
  nombre = document.getElementById("nombreInput").value;
       if (nombre !== "") {
      document.getElementById("nombre-container").style.display = "none";
      document.getElementById("saludo-container").style.display = "block";
       document.getElementById("nombreSaludo").textContent = nombre;
    } else {
        alert("Por favor, ingrese su nombre.");
    }
}
function establecerPresupuesto() {
    presupuesto = parseInt(document.getElementById("presupuesto").value);
    if (!isNaN(presupuesto) && presupuesto > 0) {
        document.getElementById("presupuesto-container").style.display = "none";
        document.getElementById("gastos-container").style.display = "block";
    } else {
        alert("Por favor, ingrese un presupuesto válido.");
    }
}
function agregarGasto() {
var monto = parseInt(document.getElementById("monto").value);
var descripcion = document.getElementById("descripcion").value;
    if (!isNaN(monto) && monto > 0 && descripcion !== "") {
        if (presupuesto - monto >= 0) {
          gastos.push({ monto: monto, descripcion: descripcion });
          actualizarListaGastos();
          actualizarPresupuesto();
          document.getElementById("monto").value = "";
          document.getElementById("descripcion").value = "";
        }else {
            alert("¡Se ha superado el presupuesto!");
        }
    } else {
        alert("Por favor, ingrese un monto y una descripción válidos.");
    }
    }
function eliminarGasto(index) {
     gastos.splice(index, 1);
     actualizarListaGastos();
     actualizarPresupuesto();
    }

    function actualizarListaGastos() {
        var gastosListHTML = "<table><tr><th>Monto</th><th>Descripción</th><th>Acciones</th></tr>";
        for (var i = 0; i < gastos.length; i++) {
        gastosListHTML += "<tr><td>$" + gastos[i].monto + "</td><td>" + gastos[i].descripcion + "</td><td><button onclick=\"eliminarGasto(" + i + ")\">Eliminar</button></td></tr>";
      }
      gastosListHTML += "</table>";
      document.getElementById("gastos-list").innerHTML = gastosListHTML;
    }

function actualizarPresupuesto() {
    var totalGastos = 0;
    for (var i = 0; i < gastos.length; i++) {
        totalGastos += gastos[i].monto;
     }
      document.getElementById("presupuesto-total").textContent = "Presupuesto restante: $" + (presupuesto - totalGastos);

      if (presupuesto - totalGastos < 0) {
        document.getElementById("mensaje-alerta").textContent = "¡Se ha superado el presupuesto!";
      } else {
        document.getElementById("mensaje-alerta").textContent = "";
      }
    }