import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/SideMenuComponent';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  actionCloseButton = this.page.getByTestId('close-button');

  massageText = this.page.locator('#show_messages');

  topupReceiverInput = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement',
  );
  topupExpectedButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });

  moneyValueText = this.page.locator('#money_value');

  userNameText = this.page.getByTestId('user-name');

  async makeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async topUp(topupReceiver: string, topupAmount: string): Promise<void> {
    await this.topupReceiverInput.selectOption(topupReceiver);
    await this.topupAmount.fill(topupAmount);
    await this.topupAgreementCheckbox.click();
    await this.topupExpectedButton.click();
    await this.actionCloseButton.click();
  }
}
