API FOODS

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


 ## Que se quiere lograr con el proyecto!
 
La idea general es crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

  - Buscar recetas
  - Filtrarlos / Ordenarlos
  - Crear nuevas recetas propias

#### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres
- [ ] CSS Puro

#### Frontend

CARACTERISTICAS:

__Pagina inicial__: deben armar una landing page con
- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

<img width="1376" alt="landing" src="https://user-images.githubusercontent.com/82724532/177236163-61a86e8a-e406-4037-944e-ae073e1b43f0.png">

__Ruta principal__: debe contener
- [ ] Input de búsqueda para encontrar recetas por nombre
- [ ] Área donde se verá el listado de recetas. Deberá mostrar su:
  - Imagen
  - Nombre
  - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
- [ ] Botones/Opciones para filtrar por por tipo de dieta
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
- [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

<img width="688" alt="home" src="https://user-images.githubusercontent.com/82724532/177236234-3967956f-c651-4c3d-9787-13c29ddb3d32.png">

__Ruta de detalle de receta__: debe contener
- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
- [ ] Resumen del plato
- [ ] Puntuación
- [ ] Nivel de "comida saludable"
- [ ] Paso a paso

![detalle](https://user-images.githubusercontent.com/82724532/177236305-8b019e79-2cef-4d82-9953-3dcb64af0929.png)

__Ruta de creación de recetas__: debe contener
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Resumen del plato
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
- [ ] Botón/Opción para crear una nueva receta

![creacion](https://user-images.githubusercontent.com/82724532/177236370-60af286c-76a5-48cf-84ed-f09ed0d69e7b.png)

> El formulario de creación está validado con JavaScript y no sólo con validaciones HTML. 

__Componentes de Not Found:
 - [ ] Componentes para renderizar cuando no hay resultados de la búsqueda
 - No se encuentra receta ni id

<img width="1367" alt="notfoundrecipe" src="https://user-images.githubusercontent.com/82724532/177236687-6514db1e-6a71-48ea-9423-793976286018.png">

- Se ingresa una ruta que no existe.

![notfoundpage](https://user-images.githubusercontent.com/82724532/177236769-52970a2f-7a4d-459e-8ae8-2bd81f055b1a.png)

#### Base de datos

#### Tecnologías necesarias:

- [ ] PostgreSQL

CARACTERISTICAS:

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Receta con las siguientes propiedades:
  - ID: *
  - Nombre *
  - Resumen del plato *
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre

#### Backend

#### Tecnologías necesarias:
- [ ] Node JS
- [ ] Express
- [ ] Sequelize
- [ ] 

CARACTERISTICAS:

- [ ] __GET /recipes?name="..."__:
  - Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
  - Si no existe ninguna receta mostrar un mensaje adecuado
- [ ] __GET /recipes/{idReceta}__:
  - Obtener el detalle de una receta en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de receta
  - Incluir los tipos de dieta asociados
- [ ] __GET /types__:
  - Obtener todos los tipos de dieta posibles
- [ ] __POST /recipe__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos
