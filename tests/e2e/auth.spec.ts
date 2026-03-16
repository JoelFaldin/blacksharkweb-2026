import { expect, test } from "@playwright/test";

import createFakeJwt from "../utils/createFakeJwt";

test.describe("auth page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/login");
  });

  test("should login successfully", async ({ page }) => {
    // Interceptar la solicitud de inicio de sesión de supabase:
    await page.route("**/auth/v1/token?grant_type=password", async (route) => {
      const mockToken = createFakeJwt({
        sub: "user_id",
        exp: Math.floor(Date.now() / 1000) + 3600,
        app_metadata: { role: "user" },
      });

      const json = {
        access_token: mockToken,
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "fake_refresh_token",
        user: {
          id: "user_id",
          email: "test@example.com",
        },
      };
      await route.fulfill({ json });
    });

    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByPlaceholder("Ingresa tu email").fill("test@example.com");
    await page.getByPlaceholder("Al menos 6 caracteres").fill("password");

    await page.getByRole("button", { name: "Iniciar sesión" }).nth(1).click();

    await expect(page.getByText("Iniciando sesión...")).toBeVisible();

    await page.waitForURL("http://localhost:3000/");

    await expect(page.getByText("Bienvenido")).toBeVisible();
  });

  test("should show error on failed login", async ({ page }) => {
    await page.route("**/auth/v1/token?grant_type=password", async (route) => {
      await route.fulfill({
        status: 400,
        json: { code: "invalid_credentials", message: "Invalid login credentials" },
      });
    });

    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByPlaceholder("Ingresa tu email").fill("test@example.com");
    await page.getByPlaceholder("Al menos 6 caracteres").fill("password");

    await page.getByRole("button", { name: "Iniciar sesión" }).nth(1).click();

    // Cambiar el mensaje de error esperado:
    await expect(page.getByText("Invalid login credentials")).toBeVisible();
  });

  test("user should be able to logout", async ({ page }) => {
    // Interceptar la solicitud de inicio de sesión de supabase:
    await page.route("**/auth/v1/token?grant_type=password", async (route) => {
      const mockToken = createFakeJwt({
        sub: "user_id",
        exp: Math.floor(Date.now() / 1000) + 3600,
        app_metadata: { role: "user" },
      });

      const json = {
        access_token: mockToken,
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "fake_refresh_token",
        user: {
          id: "user_id",
          email: "test@example.com",
        },
      };
      await route.fulfill({ json });
    });

    await page.goto("http://localhost:3000/login");

    await page.getByRole("button", { name: "Iniciar Sesión" }).click();

    await page.getByPlaceholder("Ingresa tu email").fill("test@example.com");
    await page.getByPlaceholder("Al menos 6 caracteres").fill("password");

    await page.getByRole("button", { name: "Iniciar sesión" }).nth(1).click();

    await page.waitForURL("http://localhost:3000/");

    await page.getByRole("button", { name: "Cerrar Sesión" }).click();

    await expect(page.getByText("Sesión Finalizada")).toBeVisible();
  });
});
