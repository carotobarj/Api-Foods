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

![landing](https://user-images.githubusercontent.com/82724532/177237789-be316c08-447c-4d62-a436-24d0b5edbef6.jpg)

__Ruta principal__: debe contener
- [ ] Input de búsqueda para encontrar recetas por nombre
- [ ] Área donde se verá el listado de recetas. Deberá mostrar su:
  - Imagen
  - Nombre
  - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
- [ ] Botones/Opciones para filtrar por por tipo de dieta
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
- [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

![home](https://user-images.githubusercontent.com/82724532/177238394-fa5978d7-0465-4977-a09f-16db25de14e3.jpg)


__Ruta de detalle de receta__: debe contener
- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
- [ ] Resumen del plato
- [ ] Puntuación
- [ ] Nivel de "comida saludable"
- [ ] Paso a paso

![detalle](https://user-images.githubusercontent.com/82724532/177237856-b44175e7-168c-44f9-92e2-9513c093f2e8.jpg)

__Ruta de creación de recetas__: debe contener
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Resumen del plato
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
- [ ] Botón/Opción para crear una nueva receta

![creacion](https://user-images.githubusercontent.com/82724532/177237964-e8085e9f-6160-43d4-bce2-f5f48a24db1b.jpg)

> El formulario de creación está validado con JavaScript y no sólo con validaciones HTML. 

__Componentes de Not Found:
 - [ ] Componentes para renderizar cuando no hay resultados de la búsqueda
 - No se encuentra receta ni id

![notfoundrecipe](https://user-images.githubusercontent.com/82724532/177237983-7a57856e-bdb4-4c0b-a658-237d8b5f0a01.jpg)

- Se ingresa una ruta que no existe.

![notfoundpage](https://user-images.githubusercontent.com/82724532/177238001-56b68fb0-11ad-4407-bf33-9888686a4ba5.jpg)

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
