Generador de Web Apps
=====================

Generador de web Apps es una aplicación web cuyo objetivo principal es generar proyectos completos con archivos de despliegue Docker. Está basada en backend .NET 8, AngularJS como frontend y MongoDB como base de datos. La aplicación sigue el patrón MVC, donde el backend proporciona todos los endpoints necesarios para el intercambio de información con Angular. Incluye autenticación basada en tokens JWT con roles de usuario (administrador y usuario normal), chat en vivo basado en SignalR y un sistema de soporte de tickets.

🚀 Inicio rápido
----------------

Para comenzar a usar la aplicación localmente, sigue estos pasos:

1.  Clona el repositorio:

    `git clone https://github.com/tfgsergiogonzalezmartinez/tfg_frontend.git`

2.  Instala .NET 8 y Node.js y MongoDb en tu máquina.
3.  Instala las dependencias de Node.js:

    `npm i`
4.  Inicia el backend .NET accediedo a vsCode presionando `F5` o escribiendo el siguiente comando:

   `dotnet run`

6.  Inicia el frontend Angular accediedo a vsCode presionando `F5` o escribiendo el siguiente comando:

    `ng serve`

7.  Abre tu navegador web y accede a `http://localhost:4200` para ver la aplicación en funcionamiento.

📖 Descripción
--------------

Esta aplicación permite a los usuarios crear aplicaciones web personalizadas con un backend, frontend y base de datos totalmente configurados, incluidos los archivos de despliegue Docker. Los usuarios pueden elegir una plantilla, personalizarla, importar bases de datos, añadir logos y ajustar colores y textos.

### Características principales:

-   **Autenticación JWT:** Usuarios con roles de administrador y usuario normal.
-   **Chat en vivo:** Intercambio de mensajes en tiempo real utilizando WebSocket SignalR.
-   **Sistema de soporte:** Envío y gestión de tickets, comunicación en tiempo real.
-   **Generación de proyectos:** Creación de aplicaciones web completas con la base de datos del usuario y generacion archivos de despliegue automatico Docker.

🛠️ Tecnologías utilizadas
--------------------------

La aplicación se ha desarrollado utilizando las siguientes tecnologías:

-   **.NET 8:** Backend robusto y escalable, lenguaje C#.
-   **AngularJS:** Framework de desarrollo web frontend, lenguaje TS.
-   **MongoDB:** Base de datos NoSQL.
-   **SignalR:** Comunicación en tiempo real.
-   **Docker:** Despliegue y gestión de contenedores.

✨ Funcionalidades
-----------------

La aplicación web incluye las siguientes funcionalidades clave:

-   **Autenticación basada en JWT:**

    -   Usuarios con roles definidos (administrador y normal).
    -   Control de acceso a los endpoints de la API según el rol del usuario.
-   **Chat en vivo:**

    -   Intercambio de mensajes en tiempo real con SignalR.
    -   Visualización de mensajes pendientes y notificaciones.
    -   Almacenamiento de las conversaciones en MongoDB
-   **Sistema de soporte:**

    -   Envío y gestión de tickets.
    -   Comunicación en tiempo real entre usuarios y administradores.
    -   Cierre de solicitudes de soporte una vez resueltas.
-   **Personalización de plantillas:**

    -   Elección y personalización de plantillas disponibles.
    -   Importación de bases de datos y enlace con modelos de plantillas.
    -   Personalización de logos, títulos, y colores de componentes y textos.
-   **Generación de proyectos completos:**

    -   Creación de proyectos con backend, frontend, y base de datos.
    -   Generación de archivos de despliegue Docker.

🚧 Futuras mejoras
------------------

En el futuro, se planea implementar las siguientes mejoras:

-   Ampliar el conjunto de plantillas disponibles.
-   Mejorar la interfaz de usuario para personalización más intuitiva.
-   Integrar más opciones de importacion de bases de datos.
-   Implementacion de Kubernetes.

💻 Uso
------

Para utilizar la aplicación localmente, sigue estos pasos:

1. Clona el repositorio en tu máquina local:

     
     `git clone https://github.com/tfgsergiogonzalezmartinez/tfg_frontend.git`

2. inicia el proyecto con docker:

     `docker compose up -d`

3. Abre tu navegador web y accede a `http://localhost:4200` para ver la aplicación en funcionamiento.
 


🤝 Contribuidores
-----------------

-   **Sergio González Martínez**

📞 Soporte
----------

Para consultas o comentarios, puedes contactarnos a través del correo electrónico: sgm1018@alu.ubu.es

📄 Licencia
-----------

Este proyecto está bajo la licencia MIT.

¡Disfruta de Generador de Web Apps! 😊
--------------------------------------
