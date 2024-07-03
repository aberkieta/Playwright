import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/SideMenuComponent';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);
  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferToInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  actionCloseButton = this.page.getByTestId('close-button');

  massageText = this.page.locator('#show_messages');
}