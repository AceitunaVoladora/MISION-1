const botonEmpezar = document.querySelector("#empezar");
const modoOscuro = document.querySelector("#oscuro");
const cajas = document.querySelectorAll('.caja');

const max = 9;
let restantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sucesion = [];
let jugando = false;
let random = 0;
let lengthRestantes = 9;
let contador = 0;

function jugar(){
    if (!jugando) return;
    const tiempoEncendido = 400;
    const tiempoIntervalo = 600;
    const tiempoSucesion = tiempoIntervalo * sucesion.length;
    
    //que se encienda la sucesion anterior si hay
    if(sucesion.length !== 0){
        for(let i = 0; i < sucesion.length; i++){
            const cajaSucesion = document.getElementById(sucesion[i]);

            setTimeout(() => {
                cajaSucesion.classList.add('activo');
                    
                setTimeout(() => {
                    cajaSucesion.classList.remove('activo');
                }, tiempoEncendido);
            }, i * tiempoIntervalo);
        }
    }
    
    //selecciona la nueva caja para la sucesion
    //random selecciona el indice de restantes
    const indiceRestantes = Math.floor(Math.random() * lengthRestantes); //floor redondea hacia abajo
    random = restantes[indiceRestantes];

    //añadimos la nueva caja a sucesion y la quitamis de la lista de restantes
    sucesion[max - lengthRestantes] = random;
    restantes.splice(indiceRestantes, 1); //quita el primer número a partir del indice, osea el valor en el indice
    lengthRestantes--;

    //ilumina la nueva caja
    setTimeout(() => {
        const cajaNueva = document.getElementById(random);
        cajaNueva.classList.add('activo');
                
        setTimeout(() => {
            cajaNueva.classList.remove('activo');
        }, tiempoEncendido);
    }, tiempoSucesion);
}

//el usuario cliquea la sucesion
cajas.forEach(caja => {
    caja.addEventListener('click', () =>{
        if (!jugando) return;

        const idCaja = parseInt(caja.id, 10);

        if(idCaja === sucesion[contador]){
            contador++;

            //se gana la ronda
            if(contador === sucesion.length){
                //se han ganado todas las rondas
                if(contador === max){
                    //banner ganador
                    reiniciar();
                }

                contador = 0;
                jugar();                 
            }

        }else{
            //el usuario se ha equivocado
            //banner perdedor
            contador = 0;
            reiniciar();
        }
    });   
});

function reiniciar(){
    botonEmpezar.classList.remove('pausa');
    botonEmpezar.textContent = 'Empezar';
    jugando = false;

    restantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    sucesion = [];
    lengthRestantes = 9;
    contador = 0;
}

//modo oscuro
modoOscuro.addEventListener('click', () =>{
    document.body.classList.toggle('modoOscuro');
});


botonEmpezar.addEventListener('click', () =>{
    if(botonEmpezar.textContent === 'Empezar'){
        botonEmpezar.classList.add('pausa');
        botonEmpezar.textContent = 'Reiniciar';

        jugando = true;
        jugar();
    }else{
        reiniciar();
    } 
});