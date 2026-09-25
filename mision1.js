const caja1 = document.getElementById("1");
const caja2 = document.getElementById("2");
const caja3 = document.getElementById("3");
const caja4 = document.getElementById("4");
const caja5 = document.getElementById("5");
const caja6 = document.getElementById("6");
const caja7 = document.getElementById("7");
const caja8 = document.getElementById("8");
const caja9 = document.getElementById("9");

const botonEmpezar = document.querySelector("#empezar");
const modoOscuro = document.querySelector("#oscuro");

let restantes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sucesion = [];
let jugando = false;
let random = 0;
let max = 9;

const cajas = document.querySelectorAll('.caja');

function jugar(){
    cajas.forEach(caja => { 
        if (!jugando) return;
        //que se encienda la sucesion anterior si hay
        
        
        random = Math.floor(Math.random() * max);
        sucesion[9 - max] = random;

        document.getElementById(random).classList.add('activo');
            
        setTimeout(() => {
            caja.classList.remove('activo');
        }, 300);

        caja.addEventListener('click', () => {
            caja.classList.add('activo');
            
            setTimeout(() => {
                caja.classList.remove('activo');
            }, 300);
        });
    });
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