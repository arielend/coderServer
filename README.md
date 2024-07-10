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

### UsersManager - FileSystem


## Sprint3

En esta etapa del desarrollo se procedió a iniciar el proyecto de node, para poder utilizar los módulos nativos y de terceros que ofrece el framework.

En primera instancia se procedió a la instalación de la biblioteca de Expressjs y a la instalación en modo desarrollador del módulo de Nodemon. Luego se modificaron las configuraciones del archivo package.json para que el proyecto continúe de acuerdo a las condiciones requeridas:
- Modificación del punto de entrada a la aplicación por medio del archivo 'server.js';
- Modificación del campo type para trabajar los métodos de importación y exportación de ECMAScript6;
- Modificación del campo script para configurar tareas comunes como la ejecución del archivo server.js con node y con nodemon, tambien se creo un script que corre un archivo llamado create.js que es utilizado en la etapa de desarrollo para crear el archivo json de productos.

### Express server

Una vez instalado el módulo de express e importado desde el archivo server.js, se creo la instancia del servidor con la función express(), se creo la variable que designa el puerto a utilizar, la función ready que envía un mensaje una vez que se crea el servidor y el método listen, al que se le pasó como parámetro el puerto y la función ready.

Previo a la creación de los endpoint, se configuró el primer middleware a utilizar en esta etapa del servidor, el método express.urlencoded(); este permite analizar la URL en busca de datos códificados que permitan conformar las propiedades param y query del objeto request (requerimiento).

### ProductsManager refactoring

Se actualizó la clase ProductsManager para que funcione con los requerimientos de los endpoint correspondientes. La instancia productsManager es importada desde server.js.

### API Products Endpoints

Se crearon tres endpoints con el verbo GET en las rutas '/', '/api/products' y '/api/products/:id'; el último de ellos con uso de parametros.

El primero de ellos realiza una petición del tipo get a la ruta inicial '/'. En caso de ser exitosa retorna un objeto response con un código de estado 200, una propiedad succes en true y una propiedad response con un mensaje Ok. En caso de error retorna un objeto response con un código de estado 500 (default), una propiedad succes en false y una propiedad response con un mensaje de error.

El segundo realiza una petición del tipo GET a la ruta '/api/products'. Este endpoint esta programado para trabajar con la propiedad request.query en caso de existir. Si la url no posee una query codificada realiza un llamado a la función read() de productsManager sin pasar parámetros; y en caso de que el parámetro category forme parte de la query, es desestrurado desde el objeto request y pasado como parámetro a read(). Para cualquiera de los dos consultas, con o sin parámetro, se han manejado errores. El endpoint, en caso de recibir del método read un listado de productos (incluso en caso de filtrado), retorna un objeto response con un código de estado 200, una propiedad succes en true y una propiedad response que contiene el array de objetos. En caso de que no haya productos, el método read devolverá un array vació, y el endpoint enviara al cliente un objeto response con un código de estado 404, una propiedad succes en false y una propiedad message con un mensaje.

El tercer endpoint realiza una petición GET a la ruta '/api/products/:id', ya preparada para trabajar con un parámetro id. El endpoint llama a la función readOne() del productManager pasándole como argumento el id recibido como parámetro en la url. En caso de recibir del método readOne un producto, retorna un objeto response con un código de estado 200, una propiedad succes en true y una propiedad response que contiene el producto correspondiente al id. En caso de que no exista el producto que posea ese id, el método readOne devolverá null, y el endpoint enviara al cliente un objeto response con el código de estado 404, una propiedad succes en false y una propiedad message con un mensaje.

Para todos los endpoint se configuraron en caso de error, propiedades por default para el objeto response; un código de estado 500 y un mensaje.

#### Test del server

Esta primera etapa del servidor fue testeada desde el navegador Google Chrome, en la ruta http://localhost:8080.

#### Pasos para poder correr el servidor

1 - Clonar con el comando git clone la url del sprint3;
2 - Ejecutar el comando git init para instalar las dependencias y las configuraciones de package.json necesarias;
3 - Ejecutar el comando npm run dev;
4 - Acceder al link de la url mostrada en el mensaje de la consola, o desde el navegador a http://localhost:8080;

Rutas de prueba:
- Listado de productos -> http://localhost:8080/api/products
- Listado de productos con query de categorías -> http://localhost:8080/api/products?category=ram_memory
- Listado de productos con query de categorías (sin productos que listar) -> http://localhost:8080/api/products?category=keyboards
- Listado de productos con param de id http://localhost:8080/api/products/15fcdbb6fa80edff6bd9726c
- Listado de productos con param de id (inexistente) http://localhost:8080/api/products/soyUnIdInexistente

## Sprint 9
Durante el desarrollo del Sprint 9 se refactorizó la estructura del sistema de carpetas para adaptarlas al patrón de Diseño MVC (Model - View -Controller). La carpeta destinada a la persistencia de datos mantiene el nombre de data y será modificada en el próximo Sprint; la misma tiene agregadas las persistencias de FileSystem, Memory y Mongo.

Se creo la carpeta de controladores con los archivos correspondientes a al controlador de Carts, Users, Sessions y Products. Mientras que para los constroladores de Carts y Products se utilizaron funciones, para el de Sessions y Users se utilizaron clases.

Se creo la carpeta Services para la impementación de servicios que conecten la lógica de negocio manejada por los controladores con la persistencia manejada por el manager de Mongo. Solo se implementaron servicios para los controladores de Carts, Products y Users, quedando pendiente la implementación del servicio para Sessions. Al momento, el acceso a la persistencia por parte del control de Sessions se siguen haciendo con conexión directa entre el Controller y la persistencia en Mongo.

Las rutas se encuentran funncionando para todas las api, pero queda pendiente configurar las peticiones a la api para el renderizado (Vista) de los productos filtrados por categoría (El filtrado de la api funciona correctamente).

Las rutas se encuentran protegidas. El acceso es público a la página de inicio, a los productos y a las páginas de login y register. La navegación del navbar proteje el acceso a las rutas de Cart y User Profile. El detalle de productos se muestra a todos los usuario pero solo los usuarios registrados verán el boton para agregar un producto al carrito. 

## Sprint 11
Se implemento logger con Winston. Se definieron 4 niveles de log: HTTP, INFO, ERROR y FATAL; configurando colores para los mensajes en blanco, azul, amarillo y rojo. Para el entorno de desarrollo se configuró un logger a partir del nivel HTTP, el cual registra logs a través de la Consola. Para el entorno de Producción se configuró un logger que registra logs desde el nivel HTTP en Consola y a partir del nivel ERROR también en un archivo denominado productionErrors.log. 
Para probar los loggers se creo un enrutador loggerRouter, definido en la ruta http://localhost:puerto/api/logger.

### Endpoints del tipo GET para el entorno de Desarrollo:
- http://localhost:9000/api/logger/http
- http://localhost:9000/api/logger/info
- http://localhost:9000/api/logger/error
- http://localhost:9000/api/logger/fatal

### Endpoints del tipo GET para el entorno de Producción:
- http://localhost:8080/api/logger/http
- http://localhost:8080/api/logger/info
- http://localhost:8080/api/logger/error
- http://localhost:8080/api/logger/fatal

Para cualquier otro entorno se implementa por default un logger que registra logs a partir del nivel HTTP en Consola y a partir del nivel ERROR en un archivo denominado defaultErrors.log  

