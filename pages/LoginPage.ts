import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailLogin: Locator;
  readonly senhaLogin: Locator;
  readonly botaoEntrar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLogin = page.locator('input[type="email"]');
    this.senhaLogin = page.locator('input[type="password"]');
    this.botaoEntrar = page.locator('button', { hasText: 'Entrar' });
  }

  async abrir() {
    await this.page.goto('https://locatorlab-testes.vercel.app/login');
  }

  async DadosLogin(email: string, senha: string) {
    await this.emailLogin.fill(email);
    await this.senhaLogin.fill(senha);
  }

  async entrar() {
    await this.botaoEntrar.click();
  }
}