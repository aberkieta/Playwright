import { test, expect } from '@playwright/test';
import { loginData } from '../Test data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/puplit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    //const url = 'https://demo-bank.vercel.app/';
    //await page.goto(url);
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'successful login with correct credentials',
    { tag: ['@login', '@smoke'] },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userpassword;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userId, userPassword);
      // await loginPage.loginInput.fill(userId);
      // await loginPage.passwordInput.fill(userPassword);
      // await loginPage.loginButton.click();

      // await page.getByTestId('login-input').fill(userId);
      //await page.getByTestId('password-input').fill(userPassword);
      //await page.getByTestId('login-button').click();

      // Assert
      const pulpitPage = new PulpitPage(page);
      await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
    },
  );

  test(
    'unsuccessful login with too short username',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const incorrectuserId = 'abc';
      const incorrectloginText = 'identyfikator ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(incorrectuserId);
      await loginPage.passwordInput.click();
      // await page.getByTestId('login-input').fill(incorrectuserId);
      // await page.getByTestId('password-input').click();

      // Assert
      await expect(loginPage.loginError).toHaveText(incorrectloginText);
    },
  );

  test(
    'unsuccessful login with too short password',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const userId = 'aberkiet';
      const incorrectPassword = '123';
      const incorrectPasswordText = 'hasło ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(incorrectPassword);
      await loginPage.passwordInput.blur();

      // await page.getByTestId('login-input').fill(userId);
      // await page.getByTestId('password-input').fill(incorrectPassword);
      // await page.getByTestId('password-input').blur();

      // Assert
      await expect(loginPage.passwordError).toHaveText(incorrectPasswordText);
    },
  );
});
