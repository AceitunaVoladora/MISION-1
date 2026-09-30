const botonEmpezar = document.querySelector("#empezar");
const modoOscuro = document.querySelector("#oscuro");
const cajas = document.querySelectorAll('.caja');
const inputNombre = document.querySelector("#nombre");
const mensaje = document.querySelector("#mensaje");
const listaRanking = document.querySelector("#ranking");

const max = 9;
const tiempoEncendido = 400;
const tiempoIntervalo = 600;
const tiempoEspera = 600;
const maxRanking = 10;

let restantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sucesion = [];
let jugando = false;
let random = 0;
let lengthRestantes = 9;
let contador = 0;
let bloqueo = false;
let infinito =  false;
let ranking = [];

function jugar(){
    if (!jugando) return;
    bloqueo = true;
    const tiempoSucesion = tiempoIntervalo * sucesion.length;
    
    //que se encienda la sucesion anterior si hay
    if(sucesion.length !== 0){
        for(let i = 0; i < sucesion.length; i++){
            ilumina(sucesion[i], tiempoEspera + i * tiempoIntervalo, 'activo', tiempoEncendido);
        }
    }
    
    if(!infinito){
        //hasta 9 cajas

        //selecciona la nueva caja para la sucesion
        //random selecciona el indice de restantes
        const indiceRestantes = Math.floor(Math.random() * lengthRestantes); //floor redondea hacia abajo
        random = restantes[indiceRestantes];

        //quitamos de la lista restante
        restantes.splice(indiceRestantes, 1); //quita el primer número a partir del indice, osea el valor en el indice
        lengthRestantes--;
    }else{
        random = Math.floor(Math.random() * max) + 1; 
    }

    sucesion.push(random);

    //ilumina la nueva caja
    ilumina(random, tiempoEspera + tiempoSucesion, 'activo', tiempoEncendido);

    setTimeout(() =>{
        bloqueo = false;
    }, tiempoSucesion + tiempoEncendido + tiempoEspera);
}

//modo oscuro alterno con tecla
document.addEventListener('keydown', (e) => { //e es funcion evento
    if(e.key.toLowerCase() === 'o' && !e.repeat){ //!e.repeat evita que alterne entre modos si se mantiene pulsada
        document.body.classList.toggle('modoOscuro');
    }
})


//el usuario cliquea la sucesion
cajas.forEach(caja => {
    caja.addEventListener('click', () =>{
        if (!jugando || bloqueo) return;

        const idCaja = parseInt(caja.id, 10);
        ilumina(idCaja, 0, 'clic', 200);
        
        if(idCaja === sucesion[contador]){
            contador++;

            //se gana la ronda
            if(contador === sucesion.length){
                contador = 0;

                //se han ganado todas las rondas
                if(sucesion.length === max && !infinito){
                    infinito = true;
                    bloqueo = true;

                    ganar();
                }else{
                    jugar(); 
                }                  
            }
        }else{
            //el usuario se ha equivocado
            const nombre = inputNombre.value.trim() || 'Jugador';
            const puntos = sucesion.length - 1;

            mensaje.textContent = `${nombre}, has llegado a la ronda: ${puntos}`;
            guardarPuntuacion(nombre, puntos);
            mostrarRanking();

            reiniciar();
        }
    });   
});

function guardarPuntuacion(nombre, puntos){
    if(puntos <= 0) return;
    
    ranking.push({nombre: nombre, puntos: puntos});
    ranking.sort((a, b) => b.puntos - a.puntos);
    ranking = ranking.slice(0, maxRanking);
}

function mostrarRanking(){
    listaRanking.innerHTML = '';

    if(ranking.length === 0){
        listaRanking.textContent = 'Aun no hay puntuaciones';
        return;
    }

    ranking.forEach(entrada =>{
        const elementoLista = document.createElement('li');
        elementoLista.textContent = `${entrada.nombre} - ${entrada.puntos} rondas`;
        listaRanking.appendChild(elementoLista);
    })
}

function ganar(){
    const parpadeo = 3;

    for(let i = 0; i < parpadeo; i++){
        setTimeout(() => {
            cajas.forEach(caja =>
                caja.classList.add('activo')
            );
                    
            setTimeout(() => {
                cajas.forEach(caja => caja.classList.remove('activo'));
            }, tiempoEncendido);
        }, i * tiempoIntervalo); 
    }

    setTimeout(() =>{
        jugar();
    }, parpadeo * tiempoEspera);
}

function ilumina(caja, tiempo, clase, duracion){
    setTimeout(() => {
        const cajaNueva = cajas[caja - 1];
        cajaNueva.classList.add(clase);
                
        setTimeout(() => {
            cajaNueva.classList.remove(clase);
        }, duracion);
    }, tiempo);   
}

function reiniciar(){
    botonEmpezar.classList.remove('pausa');
    botonEmpezar.textContent = 'Empezar';
    jugando = false;

    restantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    sucesion = [];
    lengthRestantes = 9;
    contador = 0;
    bloqueo = false;
    infinito = false;
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

mostrarRanking();