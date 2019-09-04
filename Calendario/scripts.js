let today = new Date();
let currMonth = today.getMonth();
let currYear = today.getFullYear();

let months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

createCalendar(currMonth, currYear);

function createCalendar(month, year) {
  $.ajax({
    method: "GET",
    // La API no proporciona feriados para el año 2020 por lo que solo se puede avanzar hasta diciembre 2019 puesto que la logica del calendario se encuentra limitada al exito del pedido ajax. Si la API proveyera dicha informacion el calendario podria avanzar indefinidamente.
    url: `http://nolaborables.com.ar/api/v2/feriados/${currYear}?formato=mensual`,
    success: function(data) {
      // obtengo los feriados del mes corriente basado en la informacion provista por la API
      offDays = data[currMonth];
      let header = document.getElementById("header");

      // Obtengo el primer dia del mes usando el metodo de Js getDay()
      let firstDay = new Date(year, month).getDay();
      
      // Obtengo la cantidad del dia del mes usando Date() + 32 dias a partir del 1 del mes, calculando que dia del mes siguiente cae usando getDate() y restandole ese numero a 32
      let daysInMonth = 32 - new Date(year, month, 32).getDate();

      // Asigno una variable al elemento "calendar-body para poder manipularlo"
      let calendarBoard = document.getElementById("calendar-body");

      // limpio todas las celulas para pisar los valores anteriores de las celulas ante un cambio de mes
      calendarBoard.innerHTML = "";

      header.innerHTML = months[month] + ", " + year;

      // creo las filas y las celdas de la tabla usando un for anidado
      let date = 1;
      for (let i = 0; i < 6; i++) {
        // crea 5 filas
        let week = document.createElement("tr");

        //crea 7 celdas por fila y las carga con informacion
        for (let j = 0; j < 7; j++) {
          // si i es menor al primer dia del mes (obtenido usando getDay()), creo una celda vacia
          if (i === 0 && j < firstDay) {
            let day = document.createElement("td");
            let dayNum = document.createTextNode("");
            day.appendChild(dayNum);
            // y la agrego a la week
            week.appendChild(day);
          } // si date es mayor a los dias del mes corta la iteracion
          else if (date > daysInMonth) {
            break;
          } else {
            // crea las celdas y les agrega date
            let day = document.createElement("td");
            let dayNum = document.createTextNode(date);
            day.classList.add("anyday")
            if (
              // si el dia, mes y año de date coinciden con el dia mes y año del dia de hoy
              date === today.getDate() &&
              year === today.getFullYear() &&
              month === today.getMonth()
            ) {
              // aplica la clase "bg-info" a la celda
              day.classList.add("today");
            }
            // si date se encuentra en la lista de feriados del mes
            if (offDays[date]) {
              //aplica la clase "bg-warning" a la celda
              day.classList.add("holiday");
            }
            //agrega el valor de date a la celda
            day.appendChild(dayNum);
            //agrega la celda a la week
            week.appendChild(day);
            date++;
          }
        }
        // agrega cada week al body del calendar
        calendarBoard.appendChild(week);
      }
    }
  });
}

function nextMonth() {
  currYear = currMonth == 11 ? currYear + 1 : currYear;
  currMonth = currMonth == 11 ? 0 : currMonth + 1;
  createCalendar(currMonth, currYear);
}

function prevMonth() {
  currYear = currMonth == 0 ? currYear - 1 : currYear;
  currMonth = currMonth == 0 ? 11 : currMonth - 1;
  createCalendar(currMonth, currYear);
}
