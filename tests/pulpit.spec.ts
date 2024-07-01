import { test, expect } from '@playwright/test';
import { loginData } from '../Test data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/puplit.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userpassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange

    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    const puplitPage = new PulpitPage(page);
    await puplitPage.transferReceiver.selectOption(receiverId);
    await puplitPage.transferAmount.fill(transferAmount);
    await puplitPage.transferTitle.fill(transferTitle);
    await puplitPage.transferButton.click();
    await puplitPage.actionCloseButton.click();

    // Assert
    await expect(puplitPage.massageText).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupAmount = '100';
    const topupReceiver = '500 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    // Act
    const puplitPage = new PulpitPage(page);
    await puplitPage.topupReceiverInput.selectOption(topupReceiver);
    await puplitPage.topupAmount.fill(topupAmount);
    await puplitPage.topupAgreementCheckbox.click();
    await puplitPage.topupExpectedButton.click();
    await puplitPage.actionCloseButton.click();

    // Assert
    await expect(puplitPage.massageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupAmount = '100';
    const topupReceiver = '500 xxx xxx';
    const puplitPage = new PulpitPage(page);
    const initialBalance = await puplitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act

    await puplitPage.topupReceiverInput.selectOption(topupReceiver);
    await puplitPage.topupAmount.fill(topupAmount);
    await puplitPage.topupAgreementCheckbox.click();
    await puplitPage.topupExpectedButton.click();
    await puplitPage.actionCloseButton.click();

    // Assert
    await expect(puplitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
