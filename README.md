# TaskProjects - Aplicación de Gestión de Proyectos

## Descripción del Proyecto

TaskProjects es una aplicación web diseñada para la creación y gestión eficiente de proyectos y tareas. Permite a los usuarios asignar tareas, monitorear su progreso y organizar proyectos de manera efectiva. Esta versión está enfocada en ser desarrollada rápidamente, manteniendo buenas prácticas de desarrollo, una estructura de código organizada, pruebas completas y un diseño responsivo.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
  - [Clonar el Repositorio](#clonar-el-repositorio)
  - [Instalar Dependencias](#instalar-dependencias)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas Unitarias e Integrales](#pruebas-unitarias-e-integrales)
  - [Instalación de Dependencias de Pruebas](#instalación-de-dependencias-de-pruebas)
  - [Configuración de Babel](#configuración-de-babel)
  - [Configuración de Jest y Transformación de Archivos](#configuración-de-jest-y-transformación-de-archivos)
  - [Ajuste en los Scripts de Pruebas](#ajuste-en-los-scripts-de-pruebas)
  - [Crear un Mock de axios](#crear-un-mock-de-axios)
  - [Configuración del Archivo setupTests.js](#configuración-del-archivo-setuptestsjs)
  - [Organización de las Pruebas](#organización-de-las-pruebas)
  - [Resumen de Archivos de Prueba](#resumen-de-archivos-de-prueba)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características

- **Creación y Gestión de Proyectos y Tareas:** Organiza y asigna tareas de manera eficiente.
- **Asignación de Tareas:** Asigna tareas a implementadores específicos.
- **Monitoreo del Progreso:** Realiza seguimiento del estado de las tareas.
- **Interfaz Responsiva:** Diseño adaptable a diferentes dispositivos.
- **Gestión del Estado Global con Redux:** Maneja el estado de la aplicación de manera eficiente.
- **Autenticación de Usuarios:** Seguridad y acceso controlado mediante roles.
- **Notificaciones de Éxito y Error:** Mejora la experiencia del usuario con feedback visual.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- **Node.js (incluye npm):** Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **Git:** Puedes descargarlo desde [git-scm.com](https://git-scm.com/).
- **Editor de Código:** Se recomienda [Visual Studio Code](https://code.visualstudio.com/).

## Instalación

### Clonar el Repositorio

1. **Abrir la Terminal o Git Bash:**

   - En Windows, puedes usar **Git Bash** que se instala junto con Git.
   - Alternativamente, puedes usar **PowerShell** o **Command Prompt**.

2. **Clonar el Repositorio:**

   Ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/programadorlpz/TaskProjects---Aplicaci-n-de-Gesti-n-de-Proyectos.git
   ```

3. **Navegar al Directorio del Proyecto:**
   ```bash
   cd taskprojects
   ```

### Instalar Dependencias

1. **Instalar las Dependencias del Proyecto:**

   Asegúrate de estar en el directorio raíz del proyecto (`taskprojects`) y ejecuta:
   ```bash
   npm install
   ```

## Uso

Después de instalar las dependencias, puedes iniciar la aplicación localmente con el siguiente comando:
```bash
npm start
   ```

La página se recargará automáticamente si realizas cambios en el código. También verás errores en la consola si hay algún problema.

## Autenticación y Roles

Para acceder a la aplicación y utilizar las funcionalidades, los usuarios deben iniciar sesión con uno de los correos proporcionados por la API `jsonplaceholder.typicode.com` en el End Point `https://jsonplaceholder.typicode.com/users`. Dependiendo del usuario con el que se autentiquen, tendrán diferentes roles y permisos en la aplicación.

### Usuarios Disponibles y Roles
A continuación, se detalla el listado de usuarios y los roles que les corresponden:

1. **Leanne Graham (Administrador)**
   - Correo: `Sincere@april.biz`
   - Rol: `Administrador`
   
2. **Ervin Howell (Administrador)**
   - Correo: `Shanna@melissa.tv`
   - Rol: `Administrador`

3. **Clementine Bauch (Administrador)**
   - Correo: `Nathan@yesenia.net`
   - Rol: `Administrador`

4. **Patricia Lebsack (Jefe)**
   - Correo: `Julianne.OConner@kory.org`
   - Rol: `Jefe`

5. **Chelsey Dietrich (Jefe)**
   - Correo: `Lucio_Hettinger@annie.ca`
   - Rol: `Jefe`

6. **Mrs. Dennis Schulist (Jefe)**
   - Correo: `Karley_Dach@jasper.info`
   - Rol: `Jefe`

7. **Nicholas Runolfsdottir V (Implementador)**
   - Correo: `Sherwood@rosamond.me`
   - Rol: `Implementador`

8. **Glenna Reichert (Implementador)**
   - Correo: `Chaim_McDermott@dana.io`
   - Rol: `Implementador`

9. **Clementina DuBuque (Implementador)**
   - Correo: `Rey.Padberg@karina.biz`
   - Rol: `Implementador`

### Cómo Iniciar Sesión

Para iniciar sesión en la aplicación, sigue estos pasos:

1. Dirígete a la pantalla de inicio de sesión disponible en `/login`.
2. Introduce uno de los correos mencionados anteriormente en el campo de "Correo Electrónico".
3. Haz clic en "Iniciar Sesión".

### Funcionalidades Según el Rol

Dependiendo del rol asignado, los usuarios tendrán diferentes accesos y acciones permitidas:

- **Administrador:**
  - Puede visualizar todas las tareas.
  - Tiene permisos para eliminar tareas que no han sido completadas.
  - Puede realizar cambios en las tareas.
  
- **Jefe:**
  - Puede visualizar todas las tareas asignadas a los implementadores.
  - Puede crear nuevas tareas y asignarlas a los implementadores.
  - Puede marcar tareas como "Pendiente" y agregar observaciones.

- **Implementador:**
  - Solo puede ver las tareas asignadas a su usuario.
  - Puede marcar sus tareas como "Completadas" o "Pendientes".
  - Puede añadir razones cuando marca una tarea como "Pendiente".

## Estructura del Proyecto

El proyecto está organizado de manera modular y escalable para facilitar el mantenimiento y la expansión futura. A continuación, se detalla la estructura de carpetas y archivos principales:

taskprojects/
- public/
  - assets/
    - role.json
  - favicon.ico
  - index.html
  - logo192.png
  - logo512.png
  - manifest.json
  - robots.txt
- src/
  - components/
    - Auth/
      - Login.js
      - PrivateRoute.js
    - Common/
      - Footer.js
      - Navbar.js
    - Layout/
      - ThemeSwitcher.js
    - Modals/
      - ConfirmationModal.js
      - ImplementerOptionsModal.js
      - NewTaskModal.js
      - NotificationToast.js
      - ObservationModal.js
      - TaskStatsModal.js
    - Tasks/
      - TaskForm.js
      - TaskList.js
      - TaskModals.js
  - hooks/
    - api/
      - useFetchComments.js
      - useFetchRoles.js
      - useFetchUsers.js
      - useLogin.js
    - useAuth.js
  - redux/
    - actions/
      - authActions.js
      - taskActions.js
    - reducers/
      - authReducer.js
      - taskReducer.js
      - index.js
    - store.js
    - types.js
  - App.js
  - index.js
- .gitignore
- package.json
- README.md
- node_modules/

## Pruebas Unitarias e Integrales

Las pruebas son fundamentales para garantizar la calidad y fiabilidad de tu aplicación. A continuación, se describen los pasos para configurar y ejecutar pruebas unitarias e integrales en tu proyecto.

### Instalación de Dependencias de Pruebas

Es importante instalar las versiones adecuadas de las dependencias para realizar pruebas efectivas.

```bash
# Instala Jest y React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event redux-mock-store babel-jest @babel/core @babel/preset-env @babel/preset-react
   ```

# Redux y mocks para el store
npm install --save-dev redux-mock-store

# Módulo para agregar métodos de aserción adicionales a Jest para trabajar con el DOM
npm install --save-dev @testing-library/jest-dom

# Plugin de Babel para solución de dependencias privadas
npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Babel para Jest
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react

### Configuración de Babel

Crea en la raíz del proyecto el archivo .babelrc y realiza estas configuraciones para Jest con los presets necesarios:

json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

### Configuración de Jest y Transformación de Archivos

Tu archivo jest.config.js debe estar configurado para transformar archivos JavaScript y TypeScript, y para manejar dependencias específicas como axios. Crea o actualiza el archivo jest.config.js en la raíz del proyecto con el siguiente contenido:

```javascript
module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
};

# Ejecución de Pruebas

Para ejecutar todas las pruebas, utiliza el siguiente comando en tu terminal:

npm test

Esto iniciará Jest en modo de vigilancia, ejecutando las pruebas cada vez que guardes un archivo. Para ejecutar las pruebas una sola vez y generar el reporte de cobertura, utiliza:

npm test -- --coverage --watchAll=false
