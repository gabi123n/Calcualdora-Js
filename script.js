const pantalla = document.getElementById("pantalla");
const historial = document.getElementById("historial");

function tocarBoton(valor) {
    const ultimo = pantalla.textContent.slice(-1);

    if (valor === "AC") {
        pantalla.textContent = "";
    } 
    else if (valor === "C") {
        pantalla.textContent = pantalla.textContent.slice(0, -1);
    } 
    else if (valor === "=") {
        const operacion = pantalla.textContent;
        const resultado = calcular(operacion);

        pantalla.textContent = resultado;
        if(resultado !== "Error"){
             historial.innerHTML += `<div>${operacion} = ${resultado}</div>`;
        }
       
    } 
   
    else {
        if (["+", "-", "*", "/"].includes(valor) &&
            ["+", "-", "*", "/"].includes(ultimo)) {
            return;
        }

        pantalla.textContent += valor;
    }
}
document.addEventListener("keydown", function(event) {
    const tecla = event.key;

    if (!isNaN(tecla) || ["+", "-", "*", "/", "."].includes(tecla)) {
        tocarBoton(tecla);
    } 
    else if (tecla === "Enter") {
        tocarBoton("=");
    } 
    else if (tecla === "Backspace") {
        tocarBoton("C");
    } 
    else if (tecla === "Escape") {
        tocarBoton("AC");
    }
});



function calcular(expresion) {
    try {
        if (/[+\-*/.]$/.test(expresion)) {
            return "Error";
        }

        let numeros = expresion.split(/[\+\-\*\/]/).map(Number);
        let operadores = expresion.split(/[0-9\.]+/).filter(op => op);

       
        for (let i = 0; i < operadores.length; i++) {
            if (operadores[i] === "*" || operadores[i] === "/") {
                let resultado;

                if (operadores[i] === "*") {
                    resultado = numeros[i] * numeros[i + 1];
                } else {
                    resultado = numeros[i] / numeros[i + 1];
                }

                
                numeros.splice(i, 2, resultado);
                operadores.splice(i, 1);
                i--; 
            }
        }

        
        let resultado = numeros[0];

        for (let i = 0; i < operadores.length; i++) {
            if (operadores[i] === "+") {
                resultado += numeros[i + 1];
            } else {
                resultado -= numeros[i + 1];
            }
        }

        return resultado;

    } catch {
        return "Error";
    }
}
