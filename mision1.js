const botonEmpezar = document.querySelector("#empezar");
const modoOscuro = document.querySelector("#oscuro");

let restantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sucesion = [];
let jugando = false;
let random = 0;
let max = 9;
let caja = 1;

const cajas = document.querySelectorAll('.caja');

function jugar(){
    if (!jugando) return;
    
    //que se encienda la sucesion anterior si hay
    if(sucesion.length !== 0){
        for(let i = 0; i < sucesion.length; i++){
            caja = document.getElementById(sucesion[i]);
            caja.classList.add('activo');
                
            setTimeout(() => {
                caja.classList.remove('activo');
            }, 400);
        }
    }
    
    //selecciona la nueva caja para la sucesion
    random = Math.floor(Math.random() * max);
    
    for(let i = 0; i < max; i++){
        if(random === restantes[i]){
            random = Math.floor(Math.random() * max);
        }
    }

    sucesion[9 - max] = random;

    caja = document.getElementById(random);
    caja.classList.add('activo');
            
    setTimeout(() => {
        caja.classList.remove('activo');
    }, 400);

    restantes = restantes.filter(n => n !== random);
    max--;

    //el usuario cliquea la sucesion
}

//modo oscuro
modoOscuro.addEventListener('click', () =>{
    document.body.classList.toggle('modoOscuro');
});


botonEmpezar.addEventListener('click', () =>{
    if(botonEmpezar.textContent === 'Empezar'){
        botonEmpezar.classList.add('pausa');
        botonEmpezar.textContent = 'Pausa';
        
        //contador de 3 segundos?

        jugando = true;
        jugar();
    }else{
        botonEmpezar.classList.remove('pausa');
        botonEmpezar.textContent = 'Empezar';
        jugando = false;
    } 
});