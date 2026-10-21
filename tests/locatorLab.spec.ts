import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://locatorlab-testes.vercel.app/login');
  await page.locator('input[type="email"]').fill('alesson.carlos5@gmail.com');
  await page.locator('input[type="password"]').fill('Aless@n12');

  /*assert:toHaveValue - no campo de e-mail. Antes de clicar para realizar o login, ele conferi se o campo ficou com o e-mail que o teste digitou*/
  await expect(page.locator('input[type="email"]')).toHaveValue('alesson.carlos5@gmail.com');

  await page.locator('button', { hasText: 'Entrar' }).click();
  await expect(page).toHaveURL(/dashboard/);
});

test('login com sucesso', async ({ page }) => {
  await expect(page.getByTestId('page-title')).toContainText('Olá');
  /* assert: toHaveText - ele fixa um texto para qualquer usuario na hora do teste*/
  await expect(page.getByTestId('page-description')).toHaveText('Aqui está o resumo das suas tarefas.');
  
});

test('clicar em Ver tarefas', async ({ page }) => {
  await page.getByTestId('dashboard-tasks-link').click();
  await expect(page).toHaveURL(/tasks/);
  
});

test('clicar no menu do usuario', async ({ page }) => {
  await page.getByTestId('user-menu-trigger').click();
  await expect(page.getByRole('menu')).toBeVisible();

  /* assert: toHaveAttribute - indica se o menu está aberto (true) ou fechado (false).Esse assert confirma que o próprio botão registrou que abriu o menu, o que também é importante pra acessibilidade, porque é esse atributo que o leitor de tela usa.*/
  await expect(page.getByTestId('user-menu-trigger')).toHaveAttribute('aria-expanded', 'true');
  
});
