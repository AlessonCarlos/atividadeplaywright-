import { test, expect, Page } from '@playwright/test';

// ---------- Funções reutilizáveis ----------

// Acessa a página inicial, informa usuário e senha e clica em Login.
async function fazerLogin(page: Page, usuario: string, senha: string) {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(usuario);
    await page.getByPlaceholder('Password').fill(senha);
    await page.getByRole('button', { name: 'Login' }).click();
}

// Adiciona o primeiro produto da vitrine e abre o carrinho.
async function adicionarProdutoEAbrirCarrinho(page: Page) {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
}

// Preenche nome, sobrenome e CEP no checkout e clica em Continue.
async function preencherDadosDoCliente(page: Page) {
    await page.getByPlaceholder('First Name').fill('Burro');
    await page.getByPlaceholder('Last Name').fill('do Sherek');
    await page.getByPlaceholder('Zip/Postal Code').fill('50000000');
    await page.getByRole('button', { name: 'Continue' }).click();
}

// ---------- Testes ----------

test.describe("login", () => {
    // CT01 - Login com usuário válido
    // Acessar a página inicial, informar standard_user e secret_sauce e clicar em Login.
    // Resultado esperado: o sistema navega para a vitrine (inventory.html) e exibe o título "Products".
    test("login com sucesso", async ({ page }) => {
        await fazerLogin(page, 'standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
    });

    // CT02 - Login com senha inválida
    // Acessar a página inicial, informar standard_user e uma senha errada e clicar em Login.
    // Resultado esperado: o sistema continua na tela de login e exibe a mensagem de erro.
    test("login com senha errada", async ({ page }) => {
        await fazerLogin(page, 'standard_user', 'senha_errada');
        await expect(page.getByText('Username and password do not match')).toBeVisible();
    });
});

test.describe("loja", () => {
    // Pré-condição de todos os testes deste grupo: estar logado com o usuário padrão.
    test.beforeEach(async ({ page }) => {
        await fazerLogin(page, 'standard_user', 'secret_sauce');
    });

    // CT03 - Adicionar produto ao carrinho
    // Na vitrine, clicar em "Add to cart" no primeiro produto e abrir o carrinho.
    // Resultado esperado: o sistema navega para o carrinho (cart.html) e exibe o produto "Sauce Labs Backpack".
    test("adicionar produto ao carrinho", async ({ page }) => {
        await adicionarProdutoEAbrirCarrinho(page);
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    });

    // CT04 - Finalizar compra
    // Adicionar um produto, abrir o carrinho, clicar em Checkout, preencher os dados do cliente e clicar em Finish.
    // Resultado esperado: o sistema exibe a mensagem "Thank you for your order!".
    test("finalizar compra", async ({ page }) => {
        await adicionarProdutoEAbrirCarrinho(page);
        await page.getByRole('button', { name: 'Checkout' }).click();
        await preencherDadosDoCliente(page);
        await page.getByRole('button', { name: 'Finish' }).click();
        await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    });

    // CT05 - Logout
    // Na vitrine, abrir o menu lateral e clicar em Logout.
    // Resultado esperado: o sistema volta para a página inicial e exibe o botão Login.
    test("fazer logout", async ({ page }) => {
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.getByText('Logout').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });
});