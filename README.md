README

problema:

prompt: "como puedo hacer que una caja cambie de estilo en js (ya predeterminado en css como 'activo') despues de 2 segundos"

```javascript
const caja = document.querySelector('.caja');

setTimeout(() => {
  caja.classList.add('activo');
}, 2000);
```