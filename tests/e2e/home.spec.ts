import { expect, test } from "@playwright/test";

test.describe("home page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("should navigate to home", async ({ page }) => {
    await page.getByRole("link", { name: "BlackSharkStudios" }).click();

    await expect(
      page.getByRole("heading", { name: "Diseños que impulsan tu marca" }),
    ).toBeVisible();
  });

  test("should navigate to servicios", async ({ page }) => {
    await page.getByRole("navigation").getByRole("link", { name: "Servicios" }).click();

    await expect(page.getByRole("heading", { name: "Servicios de alto impacto" })).toBeVisible();
  });

  test("should navigate to portafolio", async ({ page }) => {
    await page.getByRole("navigation").getByRole("link", { name: "Portafolio" }).click();

    await expect(page.getByRole("heading", { name: "Diseños con personalidad" })).toBeVisible();
  });

  test("should navigate to nosotros", async ({ page }) => {
    await page.getByRole("navigation").getByRole("link", { name: "Nosotros" }).click();

    await expect(
      page.getByRole("heading", { name: "El estudio detrás de la visión" }),
    ).toBeVisible();
  });

  test("should navigate to registro", async ({ page }) => {
    await page.locator('a[href="/login"]').click();

    await expect(page.getByRole("heading", { name: "Crea una cuenta" })).toBeVisible();
  });

  test("should navigate to login", async ({ page }) => {
    await page.locator('a[href="/login"]').click();
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await expect(page.getByRole("heading", { name: "Bienvenido" })).toBeVisible();
  });

  test("should navigate to carrito", async ({ page }) => {
    await page.locator('a[href="/carrito"]').click();

    await expect(
      page.getByRole("heading", { name: "No hay servicios en el carrito." }),
    ).toBeVisible();
  });
});
