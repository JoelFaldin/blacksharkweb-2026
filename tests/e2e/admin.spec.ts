import { expect, test } from "@playwright/test";

import createFakeJwt from "../utils/createFakeJwt";

test.describe("admin", async () => {
  test.beforeEach(async ({ page }) => {
    // Interceptar la solicitud de inicio de sesión de supabase:
    await page.route("**/auth/v1/token?grant_type=password", async (route) => {
      const mockToken = createFakeJwt({
        sub: "user_id",
        exp: Math.floor(Date.now() / 1000) + 3600,
        app_metadata: { role: "admin" },
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
  });

  test("can see actions on brands section", async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.getByRole("button", { name: "Iniciar Sesión" }).click();
    await page.getByPlaceholder("Ingresa tu email").fill("admin@example.com");
    await page.getByPlaceholder("Al menos 6 caracteres").fill("adminpassword");
    await page.getByRole("button", { name: "Iniciar sesión" }).nth(1).click();

    await page.waitForURL("http://localhost:3000/");

    await expect(page.getByText("Bienvenido")).toBeVisible();
    // await expect(page.getByRole("button", { name: "X" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Plus Añadir Marca" })).toBeVisible();
  });
});
