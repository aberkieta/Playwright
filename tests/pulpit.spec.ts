import { test, expect } from '@playwright/test';
import { loginData } from '../Test data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/puplit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userpassword;
    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
  });

  test(
    'quick payment with correct data',
    {
      tag: ['@pulpit', '@integration'],
      annotation: {
        type: 'documentation',
        description: 'https://jaktestowac.pl/playwright/',
      },
    },
    async ({ page }) => {
      // Arrange

      const receiverId = '2';
      const transferAmount = '150';
      const transferTitle = 'pizza';
      const expectedTransferReceiver = 'Chuck Demobankowy';

      // Act

      await pulpitPage.makeQuickPayment(
        receiverId,
        transferAmount,
        transferTitle,
      );
      // await pulpitPage.transferReceiver.selectOption(receiverId);
      // await pulpitPage.transferAmount.fill(transferAmount);
      // await pulpitPage.transferTitle.fill(transferTitle);
      // await pulpitPage.transferButton.click();
      // await pulpitPage.actionCloseButton.click();

      // Assert
      await expect(pulpitPage.massageText).toHaveText(
        `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );

  test(
    'successful mobile top-up',
    { tag: ['@pulpit', '@integration'] },
    async ({ page }) => {
      // Arrange
      const topupAmount = '100';
      const topupReceiver = '500 xxx xxx';
      const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

      // Act

      await pulpitPage.topUp(topupReceiver, topupAmount);
      // await pulpitPage.topupReceiverInput.selectOption(topupReceiver);
      // await pulpitPage.topupAmount.fill(topupAmount);
      // await pulpitPage.topupAgreementCheckbox.click();
      // await pulpitPage.topupExpectedButton.click();
      // await pulpitPage.actionCloseButton.click();

      // Assert
      await expect(pulpitPage.massageText).toHaveText(expectedMessage);
    },
  );

  test(
    'correct balance after successful mobile top-up',
    { tag: ['@pulpit', '@integration'] },
    async ({ page }) => {
      // Arrange
      const topupAmount = '100';
      const topupReceiver = '500 xxx xxx';
      const pulpitPage = new PulpitPage(page);
      const initialBalance = await pulpitPage.moneyValueText.innerText();
      const expectedBalance = Number(initialBalance) - Number(topupAmount);

      // Act

      await pulpitPage.topUp(topupReceiver, topupAmount);
      // await pulpitPage.topupReceiverInput.selectOption(topupReceiver);
      // await pulpitPage.topupAmount.fill(topupAmount);
      // await pulpitPage.topupAgreementCheckbox.click();
      // await pulpitPage.topupExpectedButton.click();
      // await pulpitPage.actionCloseButton.click();

      // Assert
      await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
    },
  );
});
