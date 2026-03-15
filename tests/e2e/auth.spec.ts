import { expect, test } from "@playwright/test";

test.describe("auth page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/login");
  });

  test("should login successfully", async ({ page }) => {
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByPlaceholder("Ingresa tu email").fill("test@example.com");
    await page.getByPlaceholder("Al menos 6 caracteres").fill("password");

    await page.getByRole("button", { name: "Iniciar sesión" }).nth(1).click();

    expect(page.getByRole("heading", { name: "Bienvenido" })).toBeVisible();
  });
});
