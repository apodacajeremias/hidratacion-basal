// Valor de input
const VALOR = document.getElementById("peso");
const SELECT = document.getElementById("supCorpSelect");

// Boton para calcular
const BOTON = document.getElementById("calcular");

// Etiquetas
const ERROR = document.getElementById("error");
const RESULTADO = document.getElementById("resultado");
const FLUJO = document.getElementById("flujo");
const MANTENIMIENTO = document.getElementById("mantenimiento");

// Evento para calcular
BOTON.addEventListener("click", () => {
    if (VALOR.value == null || VALOR.value.length == 0 || VALOR.valueAsNumber == 0) {
        mostrarError();
    } else {
        mostrarResultado();
    }
});

VALOR.addEventListener("submit", ()=>{
    if (VALOR.value == null || VALOR.value.length == 0 || VALOR.valueAsNumber == 0) {
        mostrarError();
    } else {
        mostrarResultado();
    }
});

function mostrarError() {
    ERROR.style.display = "block";
    setTimeout(() => {
        ERROR.style.display = "none";
    }, 5000);
    ocultarResultado();
}

function mostrarAviso() {
    ERROR.innerHTML = "Use el menú desplegable para cambiar el valor";
    ERROR.style.display = "block";
    setTimeout(() => {
        ERROR.style.display = "none";
        ERROR.innerHTML = "Debe completar todos los datos";
    }, 5000);
}

function mostrarResultado() {
    let v = VALOR.valueAsNumber;
    if (v <= 30) {
        ocultarSelect();
        let r = hollidaySegar(v);
        RESULTADO.innerHTML = r + " cc";
        FLUJO.innerHTML = "Flujo por hora: <br> " + Math.round(r / 24) + "cc/h";
        MANTENIMIENTO.innerHTML = "Valor de mantenimiento: <br> m + m/2 = " + (r * 1.5);
    } else {
        ocultarResultado();
        mostrarSelect(superficieCorporal(v));
    }
    RESULTADO.style.display = "block";
}

function ocultarResultado() {
    RESULTADO.innerHTML = "";
    RESULTADO.style.display = "none";
    FLUJO.innerHTML = "";
    MANTENIMIENTO.innerHTML = "";
}

function mostrarSelect(options) {
    // Vaciar select 
    SELECT.innerHTML = "";

    SELECT.addEventListener("click", () => {
        FLUJO.innerHTML = "Flujo por hora: <br> " + Math.round(SELECT.value / 24) + "cc/h";
        MANTENIMIENTO.innerHTML = "Valor de mantenimiento: <br> m + m/2 = " + (SELECT.value * 1.5);
     });
    // Volver a cargar
    for (o of options) {
        var opt = document.createElement('option');
        opt.value = o;
        opt.innerHTML = o;
        SELECT.appendChild(opt);
    }
    mostrarAviso();
    ocultarResultado();
    SELECT.style.display = "block";
}

function ocultarSelect() {
    SELECT.style.display = "none";
}


function hollidaySegar(val) {
    let aux = val;
    let suma = 0;
    if (val > 20 && val <= 30) {
        suma = suma + (10 * 100);
        suma = suma + (10 * 50);
        suma = suma + ((val - 20) * 20);
    }
    if (val > 10 && val <= 20) {
        suma = suma + (10 * 100);
        suma = suma + ((val - 10) * 50);
    }
    if (val > 0 && val <= 10) {
        suma = suma + (val * 100);
    }
    return suma;
}

function superficieCorporal(val) {
    let sc = ((val * 4) + 7) / (val + 90)
    return [Math.round(sc * 1500), Math.round(sc * 2000)];
}