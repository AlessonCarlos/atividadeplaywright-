import { Page, Locator} from '@playwright/test';

export class TelaInicial{
    
    readonly page: Page;
    readonly titulo: Locator;
    readonly desricao: Locator;
    readonly linkTarefas: Locator;
    readonly botaoMenu: Locator;
    readonly menu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titulo = page.getByTestId('page-title');
        this.desricao = page.getByTestId('page-description');
        this.linkTarefas = page.getByTestId('dashboard-tasks-link');
        this.botaoMenu = page.getByTestId('user-menu-trigger');
        this.menu = page.getByRole('menu');
    }

    async abrirTarefas(){
        await this.linkTarefas.click();
    }

    async abrirMenu(){
        await this.botaoMenu.click();
    }
}