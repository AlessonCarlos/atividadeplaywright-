import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TelaInicial } from '../pages/TelaInicial';

let telaInicial: TelaInicial;

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    telaInicial = new TelaInicial(page);

    await login.abrir();
    await login.DadosLogin('alesson.carlos5@gmail.com', 'Aless@n12');

    await expect(login.emailLogin).toHaveValue('alesson.carlos5@gmail.com');

    await login.entrar();
    await expect(page).toHaveURL(/dashboard/);
});

test('login com sucesso', async () => {
    await expect(telaInicial.titulo).toContainText('Olá');
    await expect(telaInicial.desricao).toHaveText('Aqui está o resumo das suas tarefas.')
})

test('clicar em Ver tarefas', async ({ page }) => {
  await telaInicial.abrirTarefas();
  await expect(page).toHaveURL(/tasks/);
});

test('clicar no menu de usuario', async () => {
    await telaInicial.abrirMenu();
    await expect(telaInicial.botaoMenu).toBeVisible();
    await expect(telaInicial.botaoMenu).toHaveAttribute('aria-expanded', 'true')
})