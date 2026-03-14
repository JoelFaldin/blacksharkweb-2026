# E2E Testing

Playwright es una herramienta para trabajar con automatización de código de manera _end to end_, probando toda la funcionalidad como si se tratase de un usuario real.

Revisa la documentación de playwright [aquí](https://playwright.dev/).

> [!IMPORTANT]  
Asegúrate de iniciar el servidor de desarrollo antes de correr los tests.

A continuación, se detallan algunos comandos útiles para trabajar con esta herramienta.

* `pnpm exec playwright test`
    * Ejecuta tests end-to-end.

* `pnpm exec playwright test --ui`
    * Inicia el modo interactivo con UI.

* `pnpm exec playwright test --project=chromium`
    * Ejecuta tests solo en Chrome Desktop.

* `pnpm exec playwright test example`
    * Ejecuta tests en un archivo específico.

* `pnpm exec playwright test --debug`
    * Ejecuta tests en modo debug.

* `pnpm exec playwright codegen`
    * Genera tests automáticamente con Codegen.