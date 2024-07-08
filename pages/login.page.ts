import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  // await page.getByTestId('login-input').fill(userId);

  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  //await page.getByTestId('password-input').fill(userPassword);
  //await page.getByTestId('login-button').click();

  loginError = this.page.getByTestId('error-login-id');
  passwordError = this.page.getByTestId('error-login-password');

  async login(userId: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
