# Proyecto API-CONEXA 



## Configuración del proyecto

Para configurar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local.
2. Desde la carpeta raíz, ejecuta el comando `npm install` para instalar las dependencias necesarias.
3. A continuación, ejecuta el comando `npm run start:all` para iniciar todas las aplicaciones.


### Metodología y Enfoque

Desarrollé las aplicaciones "login-service" y "business-service" de forma totalmente aislada para simular un entorno de trabajo de integración. Mi objetivo fue evitar el uso de librerías de microservicios y hacer que el proyecto fuera lo más agnóstico posible, enfocándome únicamente en el flujo de la aplicación y la integración entre los distintos servicios.

En este proyecto, utilicé el event-bus como intermediario para la comunicación entre los servicios, debido a las limitaciones de tiempo. Sin embargo, entiendo que eventualmente podría ser reemplazado por un message broker, lo que permitiría una comunicación asincrónica utilizando el enfoque publish/suscribe.

### Deuda Técnica

Debido a las restricciones de tiempo, no pude abordar los siguientes requisitos y mejoras:

- Agregar tests en "business-service" y "event-bus" para garantizar una mayor robustez y calidad del código.
- Utilizar una arquitectura limpia (clean architecture) para una mejor separación de las capas de infraestructura, dominio y aplicación.
- Evitar la duplicación de código, como la declaración del modelo de usuario en la base de datos.
- Mejorar el manejo de errores a nivel de aplicación.
- Invertir aún más las dependencias mediante el uso intensivo de interfaces.

A pesar de estas limitaciones, espero que este proyecto demuestre mi capacidad para desarrollar aplicaciones, integrar servicios y resolver problemas técnicos.

¡Gracias por revisar mi proyecto!
