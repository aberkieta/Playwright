import { test, expect } from '@playwright/test';
import { loginData } from '../Test data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/puplit.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userpassword;
    paymentPage = new PaymentPage(page);

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    // await page.getByTestId('login-input').fill(userId);
    // await page.getByTestId('password-input').fill(userPassword);
    // await page.getByTestId('login-button').click();

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();
    // await page.getByRole('link', { name: 'płatności' }).click();
  });

  test(
    'simple payment',
    {
      tag: ['@payment', '@integration'],
      annotation: {
        type: 'documentation',
        description:
          'More to find at: https://jaktestowac.pl/lesson/pw1s04l04/',
      },
    },
    async ({ page }) => {
      // Arrange
      const transferReceiver = 'Jan Nowak';
      const transferAccount = '12 3456 7890 1234 5678 9012 34568';
      const transferAmount = '222';
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

      // Act

      await paymentPage.makeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount,
      );

      // await paymentPage.transferReceiverInput.fill(transferReceiver);
      // await paymentPage.transferToInput.fill(transferAccount);
      // await paymentPage.transferAmountInput.fill(transferAmount);
      // await paymentPage.transferButton.click();
      // await paymentPage.actionCloseButton.click();

      // await page.getByTestId('transfer_receiver').fill(transferReceiver);
      // await page.getByTestId('form_account_to').fill(transferAccount);
      // await page.getByTestId('form_amount').fill(transferAmount);
      // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
      // await page.getByTestId('close-button').click();

      // Assert
      await expect(paymentPage.massageText).toHaveText(expectedMessage);
    },
  );
});
