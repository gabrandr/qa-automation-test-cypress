Proyecto: Automatizacion API con Cypress para Petstore

Descripcion:
Este modulo contiene la automatizacion API del ejercicio basado en Petstore usando Cypress y cy.request.
La solucion fue implementada con reporter HTML por modulo usando cypress-mochawesome-reporter.

Requisitos:
- Node.js instalado
- npm instalado

Instalacion:
1. Entrar a la carpeta API
2. Ejecutar npm install

Comandos de ejecucion:
1. npm run cy:open
   Abre Cypress en modo visual.

2. npm run cy:run
   Ejecuta las pruebas en modo headless.

3. npm run cy:report
   Ejecuta las pruebas y genera el reporte HTML del modulo API.

Cobertura implementada:
- Crear un usuario
- Buscar el usuario creado
- Actualizar el nombre y el correo del usuario
- Buscar el usuario actualizado
- Eliminar el usuario
- Verificar adicionalmente que el usuario ya no existe despues del delete

Estructura relevante:
- cypress/e2e/user-crud.cy.js
- cypress/support/e2e.js
- cypress.config.js
- reports/index.html

Datos de prueba:
- Se generan usuarios unicos por ejecucion para evitar choques con datos existentes en el ambiente publico.

Reporte:
El reporte HTML generado por Cypress para este modulo se encuentra en:
- reports/index.html

Notas:
- La suite fue estructurada con varios casos independientes para representar claramente cada requisito del enunciado.
- Se agrego un caso extra para verificar que el usuario fue eliminado correctamente, como validacion adicional del flujo CRUD.
