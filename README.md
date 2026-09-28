# README

## DECLARACIÓN DE USO DE LA IA (Claude)

Prompt: "como puedo hacer que una caja cambie de estilo en js (ya predeterminado en css como 'activo') despues de 2 segundos"

```javascript
const caja = document.querySelector('.caja');

setTimeout(() => {
  caja.classList.add('activo');
}, 2000);
```

En este caso su uso fue practicamente directo, lo único que cambia es la parte de caja que en distintas partes de mi código tiene distintos nombres y distintos orígenes. 


Prompt: "teniendo una tabla de botones, como puedo hacer, en js, que cuando el usuario clique encima de uno de estos, de id 1-9, se compare con un array que contiene una sucesion con esos numeros"

```javascript
// Array con la secuencia de números
const secuencia = [3, 7, 1, 9, 2, 5, 8, 4, 6];
let indiceActual = 0; // para saber en qué paso de la secuencia vamos

// Seleccionamos todos los botones (asumiendo que tienen la clase "btn-numero")
const botones = document.querySelectorAll('.btn-numero');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const idClicado = parseInt(boton.id, 10); // o boton.dataset.numero si usas data-*
    
    if (idClicado === secuencia[indiceActual]) {
      console.log('¡Correcto!');
      indiceActual++;
      
      if (indiceActual === secuencia.length) {
        console.log('¡Secuencia completa!');
        indiceActual = 0; // reiniciar si quieres
      }
    } else {
      console.log('Incorrecto, se reinicia la secuencia');
      indiceActual = 0;
    }
  });
});
```

Su aplicación dentro de mi código ha sido casi idéntico a excepción de los condicionales que hacen posible el modo infinito.
Debido a que nunca había visto la función parseInt, inquirí acerca de su funcionamiento y propósito en el código. Aprendí que se utiliza para convertir un string en un entero, el id de cada botón es transformado a un número entero de base diez.

## AUTOPSIA

Código anterior:
En versiones anteriores el número aleatorio generaba el número de la caja en específico y no su índice en el array. Esto implicaba que necesitara integrar una validación de que el número se encontrara dentro de los números restantes. Finalmente esto fue modificado porque esta alternativa era más complicada que buscar por índice dentro del array de restantes. 

Este cambio se tuvo en cuenta a la hora de hacer el juego para que se iluminaran las 9 casillas exclusivamente. Con el añadido del modo infinito se ha rescatado esta función una vez el jugador haya superado la fase inicial. 

```javascript
random = Math.floor(Math.random() * max) + 1;

while(valido === false){
    if(random === restantes[i]){
        valido = true;
    }
    i++;
}
```

Siguiendo la misma línea del cambio del código anterior, una vez seleccionado el número aleatorio anteriormente utilizaba esta línea de código:

```javascript
restantes = restantes.filter(n => n !== random);
```

Finalmente esta fue cambiada por el 'splice' de ahora porque esta nueva función no busca por contenido sino por el índice del array lo cual encaja mucho mejor ahora en el cambio.

