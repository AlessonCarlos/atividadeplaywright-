import { test, expect } from '@playwright/test';

test("Acessar página de login", async ({ page }) => {
    await page.goto("https://moodle.aponti.org.br/");
    await page.getByRole("link", {name: "acessar" }).first().click();

    await expect(page).toHaveURL("https://moodle.aponti.org.br/login/index.php")
})