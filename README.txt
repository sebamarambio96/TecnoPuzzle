Tegnologías utilizadas:

- HTML / CSS 
- JS
- Bootstrap/ReactBootstrap
- Firebase
- Adobe Illustrator

E-commerce realizado como evaluación para proyecto final para curso de REACT en Coderhouse

Consta de 4 contenedores enlazados con react-router-dom y rodeados del navbar y el footer:

NAVBAR: contiene enlaces al inicio, a las categorias o al carrito el cual ademas tiene un contador dinamico de productos.
INICIO: Contiene un hero section para la presentación del sitio, una pequeña muestra de ofertas y las categorias.
PRODUCTOS: Contiene categorias y productos, si en el navbar se presiona "todos" se mostraran todos los productos sin filtrar
CART: muestra un tabla dinamica que muestra un resumen de los productos, con su cantidad y precio final + form con validacion para enviar datos a la base de datos.
FOOTER: Esta enfocado en ser un resumen de rutas de la pagina + mis redes sociales profesionales.

El proyecto se basa en comunicarse constantemente con firebase asi cuando necesita un producto en especifico o todos, se exporta
una funcion de firebase.js para que nuestro documento pueda hacer la consulta especifica que se necesita.

Al enviar la compra, una vez validado los datos, se enviara un nuevo documento a nuestra coleccion de firebase devuelvo el numero
de order y mostrandola en pantalla.

En caso de error con la comunicación se mostrara un mensaje en pantalla indicando que algo a salido mostrandola


