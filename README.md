# coderServer
Servidor creado en el curso backend de Coderhouse

## Sprint2
### ProductsManager - FileSystem

Se creo una clase ProductsManager para administrar una lista de productos, en este caso de productos informáticos.
La clase tiene un método constructor que no recibe parámetros y posee una propiedad path la cual provee la ruta dónde se creara el archivo que guarda el listado, y un método init(), el cual se ejecuta al inicio para verificar la existencia del archivo en la ruta del path y, de no existir crea el mismo utilizando la funcion sincrona de fileSystem writeFileSync.

La clase posee también los métodos create(), read(), readeOne() y destroyOne().

El método create() recibe un objeto que debe ser pasado como parámetro al llamar a la función, y debe tener las propiedades title(requerido), photo, category(requerido), price(requerido) y stock. Los campos no requeridos asignan valores por defecto ('noPhoto' y 0 respectivamente).

El método read() devuelve un listado de los productos guardados en el archivo json, y lanza un error en caso de que la lista este vacía. Tambien contempla otros errores de ejecución que puedan sucederse al momento de leer el archivo.

El método readOne() recibe un id que debe ser pasado como parámetro al llamara a la función y muestra por consola el producto buscado en caso de que exista y un mensaje en caso de que no se encuentre producto con el ID pasado como parámetro. Tambien contempla otros errores de ejecución que puedan sucederse al momento de leer el archivo.

El método destroyOne() recibe un id que debe ser pasado como parámetro al llamara a la función. En caso de existir un producto con el mismo ID que el pasado por parámetro, lo elimina de la lista y muestra un mensaje de eliminación. En caso de no encontrar el producto, muestra un mensaj. Tambien contempla otros errores de ejecución que puedan sucederse al momento de leer el archivo.

#### Test de la clase
Al momento de ejecutar el método create() se deben mostrar mensajes de error en los siguientes casos:
- No se pasa un objeto data requerido por el método;
- El objeto no posee alguna de las propiedades requeridas (title, category o proce);

Al momento de ejecutar los métodos readOne() y destroyOne() se deben mostrar mensajes de error en los siguientes casos:
- No se pasa el parámetro id requerido por el método.

Para que que los métodos readOne() y destroyOne() lean y eliminen un elemento, es necesario cambiar los id pasados como parametros por un id valido de los generados por crypto.

Luego de la primera ejecución, comentar la función run() y ejecutar el código con la función test()