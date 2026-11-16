# Reloj de Fibonacci

Reloj en una sola página (`index.html`, sin dependencias) con dos vistas: manecillas (carátula principal) y cuadrados de Fibonacci (5, 3, 2, 1, 1).

## Vista Manecillas
- Placa negra con 12 espirales finas grabadas y la espiral principal como cinta gruesa que gira con la hora.
- Números del 1 al 12 a la derecha de su línea blanca, siempre visibles (la espiral pasa por detrás).
- La hora en curso se enciende en rosa; la línea del minutero también va en otro color.
- Luna con foto real, fase real y porcentaje, a la derecha debajo del 12.
- Estrellas grabadas en la placa y cielo de fondo, que se actualizan a la fecha una vez al día.
- Centro sutil: solo marcas tenues cada 5 minutos.

## Vista Cuadrados
- Rejilla 8×5 con los cuadrados 5, 3, 2, 1, 1; rojo horas, verde minutos, azul ambas.
- Hora digital en formato 12 horas.

## Instalación
Se puede instalar como app (PWA) en iOS, Windows y Android. Los archivos (manifiesto, service worker e iconos) están en la carpeta `assets/`.
