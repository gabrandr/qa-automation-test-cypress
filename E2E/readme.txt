Proyecto: Automatizacion E2E con Cypress para SauceDemo

Descripcion:
Este modulo contiene la automatizacion E2E del flujo de compra solicitado para la pagina https://www.saucedemo.com/.
La solucion fue implementada con Cypress y un reporter HTML por modulo usando cypress-mochawesome-reporter.

Requisitos:
- Node.js instalado
- npm instalado

Instalacion:
1. Entrar a la carpeta E2E
2. Ejecutar npm install

Comandos de ejecucion:
1. npm run cy:open
   Abre Cypress en modo visual.

2. npm run cy:run
   Ejecuta las pruebas en modo headless.

3. npm run cy:report
   Ejecuta las pruebas y genera el reporte HTML del modulo E2E.

Cobertura implementada:
- Autenticacion con credenciales validas
- Agregar dos productos al carrito
- Visualizar el carrito
- Completar el formulario de compra
- Finalizar la compra y validar la confirmacion

Credenciales utilizadas:
- Username: standard_user
- Password: secret_sauce

Estructura relevante:
- cypress/e2e/checkout.cy.js
- cypress/fixtures/checkOutUser.json
- cypress/support/e2e.js
- cypress.config.js
- reports/index.html

Reporte:
El reporte HTML generado por Cypress para este modulo se encuentra en:
- reports/index.html

Notas:
- La suite fue estructurada con varios casos independientes para representar visualmente cada requisito importante del enunciado.
- Se utilizaron helpers pequeños para mantener legibilidad sin agregar una arquitectura innecesariamente compleja.
