import {test, expect, Page} from '@playwright/test';

/* Explicação do import:

- O test cria os teste e os grupos;
- expect faz as verificações necessarias;
- Page é o tipo, ele representa uma aba do navegador. Ele só serve para dizer ao TypeScript o que é o parametro page das funções;*/

async function fazerLogin(page: Page, usuario: string, senha: string){
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(usuario);
    await page.getByPlaceholder('Password').fill(senha);
    await page.getByRole('button', { name: 'Login'}).click();
}

async function adicionarProdutosEAbrirCarrinho(page: Page) {

    await page.getByRole('button', { name: 'Add to cart'}).first().click();
    await page.locator('.shopping_cart_link').click();

    /*.first(): O site tem varios botões "Add to cart", então sem o first o playwrigth não saberia em qual clicar e daria erro. Com ele, ele clica no primeiro*/

    /*page.locator('.shopping_cart_link'): Ele acha o link do carrinho pela classe CSS ( o . significa classe)*/

    async function DadosDoCliente(page: Page) {

    await page.getByPlaceholder('First Name'). fill('Goku');
    await page.getByPlaceholder('Last Name'). fill('Kakaroto');
    await page.getByPlaceholder('Zip/Postal Code'). fill('80000000');
    await page.getByRole('button', { name: 'Continue'}).click();
    
    }

    /*----------Testes------------*/

    test.describe("login", () => {
        test("login com sucesso", async ({ page }) => {
            await fazerLogin(page, 'standard_user', 'secret_sauce');
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
            await expect(page.getByAltText('Products', { exact: true})).toBeVisible();
        })

    test("login com senha errada", async ({ page }) => {

        await fazerLogin(page, 'standard_user', 'senha_errada');
        await expect(page.getByAltText('Username and password do not match')).toBeVisible();
    })
    })

    test.describe("loja", () => {

        test.beforeEach(async ({ page }) => {
            await fazerLogin(page, 'standard_user', 'secret_sauce')
        })

        test("adicionar produto ao carrinho", async ({ page }) => {
            await adicionarProdutosEAbrirCarrinho(page);
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
            await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
        })

        test("finalizar compra", async ({ page }) => {
            await adicionarProdutosEAbrirCarrinho(page)
            await page.getByRole('button', {name: 'Chekout'}).click();
            await DadosDoCliente(page);
            await page.getByRole('button', { name: 'Finish'}).click();
            await expect(page.getByRole('heading', {name: 'Thank you for your order!' })).toBeVisible();
        })

        test("fazer logout", async ({ page }) => {
        await expect(page.getByText('Products', { exact: true })).toBeVisible();
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.getByText('Logout').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    })

    
    
}