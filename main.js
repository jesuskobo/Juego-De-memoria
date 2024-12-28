//inicializacion variable
let tarjetaDestapada = 0;
let tarjeta1 =null;
let tarjeta2 =null;
let primerResultado = null;
let segundoResultado = null;
let movimiento = 0;
let aciertos = 0;
let temporizador = false;
let timmer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null

//apuntando a documento html
let mostrarMovimiento = document.getElementById('Movimientos') //se selecciona el id Movimientos en del html
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random() - 0.5})
console.log(numeros);

//Funciones
function bloquearTarjetas(){
    for (let i =0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i)
        tarjetaBloqueada.innerHTML = numeros[i]
        tarjetaBloqueada.disabled = true
    }
}

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timmer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timmer} segundos`;
        if(timmer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    }, 1000);
}

//funcion principal
function destapar(id){
    
    if(temporizador == false){
        contarTiempo();
        temporizador = true
    }

    tarjetaDestapada ++;
    console.log(tarjetaDestapada);

    if (tarjetaDestapada == 1){
        //mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = primerResultado;

        //desahbilitar tecla seleccionada
        tarjeta1.disabled = true;
    }
    else if(tarjetaDestapada==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id]
        tarjeta2.innerHTML = segundoResultado

        //deshabilitar segundo boton
        tarjeta2.disabled = true

        //incrementar movimiento
        movimiento++;
        mostrarMovimiento.innerHTML = `Movimientos: ${movimiento}`;

        if(primerResultado == segundoResultado){
            //encerrar contado de tarjeta destapada
            tarjetaDestapada = 0;

            //aumenta aciertos
            aciertos ++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId)
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🤩`;
                mostrarTiempo.innerHTML = `Fantastico!🙊 solo te demoraste ${timerInicial - timmer} segundos`
                mostrarMovimiento.innerHTML = `Movimientos: ${movimiento} 😎✌️`;
            }
        }
        else{
            //mostrar momentaneamento y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetaDestapada = 0;
            }, 800);
        }
    }

}