import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginpages';

test("login valido com sucesso", async ({page}) => {
    const Login = new LoginPage(page);
    await Login.abri();
    await Login.login("standard_user", "senhaerrada" );
    expect(page).toHaveURL("https://www.saucedemo.com/")
    
})

