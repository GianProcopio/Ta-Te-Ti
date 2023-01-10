const celdas = document.querySelectorAll('.celda');
const textoTurno = document.getElementById('textoTurno');
const btnRestart = document.querySelector('.restart');
const mensajeFinal = document.getElementById('mensajeFinal');
const finDelJuegoPantalla = document.querySelector('.fin-del-juego');
const celdasArray = Array.from(document.querySelectorAll(".celda"));
let contadorDeTurnos = 0;
let turnoX = false;
btnRestart.addEventListener('click', clear);

// for(let i = 0; i < celdas.length; i++){
//     celdas[i].addEventListener('click', mostrarFigura)
// }

empezarJuego();

function empezarJuego(){
    contadorDeTurnos = 1;
    finDelJuegoPantalla.style.display = "none";
    turnoX = true;
    celdasArray.forEach(element => {
        element.addEventListener('click', mostrarFigura); 
    });
    
    
}
const posiblesCombinaciones = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]




  
function mostrarFigura (event){
    let elemento = event.target.firstElementChild;

    if(turnoX){
        elemento.innerHTML = "X";
        elemento.classList.add('x');
        hacerMovimiento("x");
        textoTurno.innerHTML = 'O'
        
        turnoX = false;
    }else{
        elemento.innerHTML = "O";
        elemento.classList.add('o');
        hacerMovimiento("o");
        turnoX = true;
        textoTurno.innerHTML = 'X'
    }
}    

function hacerMovimiento(figura){
    if(buscarGanador(recorrerTablero(figura))){
        finDelJuego("Ha ganado " + figura.toUpperCase() + "!");
       }else if(contadorDeTurnos == 9){
            finDelJuego("Empate!")
       }else{
        contadorDeTurnos++;
       }
}


// Recorrer el tablero para las posibles combinaciones
function recorrerTablero(figura){
    let figuras = Array.from(document.querySelectorAll('.figura'));
    let result = [];
    for(let i = 0; i < figuras.length; i++){
        let clasesDeFigura = figuras[i].classList;
        if(clasesDeFigura.contains(figura)){
            result.push(i)
        
        }
        
    }
    return result;
}
//  Verificar ganador

function buscarGanador(posiciones){
    let unirPosiciones;
    for(let i = 0; i < posiblesCombinaciones.length; i++){
        combinacion = posiblesCombinaciones[i];
        unirPosiciones = combinacion.every((pos)=>{
            if(posiciones.indexOf(pos) == -1){
                return false;
            }else{
                return true;
            }
        });
        if(unirPosiciones === true){
            return true;
        }
        // Esta condicion dice que si los parametros que les paso a la funcion coinciden con las posibles combinaciones, retorna true.
    }return false;
    
}
// Si la condicion no coincide con las posibles combinaciones, retorna false. El argumento "posiciones" es el array que tiene que cumplir la condicion.




function clear(){
    location.reload()
}
function turnoFuncion(turno){
    textoTurno.innerText = turno;
}
function finDelJuego (mensaje){
    finDelJuegoPantalla.style.display = "flex";
    mensajeFinal.innerText = mensaje;
}

