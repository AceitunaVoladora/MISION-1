let caja1 = document.getElementById("1");
let caja2 = document.getElementById("2");
let caja3 = document.getElementById("3");
let caja4 = document.getElementById("4");
let caja5 = document.getElementById("5");
let caja6 = document.getElementById("6");
let caja7 = document.getElementById("7");
let caja8 = document.getElementById("8");
let caja9 = document.getElementById("9");

let botonEmpezar = document.querySelector("#empezar");

let restantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sucesion = [];
let jugando = false;

const cajas = document.querySelectorAll('.caja');

function jugar(){
    cajas.forEach(caja => { 
        caja.addEventListener('click', () => {
            if (!jugando) return;

            caja.classList.add('activo');
            
            setTimeout(() => {
                caja.classList.remove('activo');
            }, 300);
        });
    });
}



botonEmpezar.addEventListener('click', () =>{
    if(botonEmpezar.textContent === 'Empezar'){
        botonEmpezar.classList.add('pausa');
        botonEmpezar.textContent = 'Pausa';
        
        jugando = true;
        jugar();

    }else{
        botonEmpezar.classList.remove('pausa');
        botonEmpezar.textContent = 'Empezar';
        jugando = false;
    } 
});

function empezar(){
    //contador 3 sec y empezar el juego (salga primera luz)
    //que empezar cambie a un boton de pausa / finalizar
}

function contar(){
    contador.innerHTML = ++cont;
}