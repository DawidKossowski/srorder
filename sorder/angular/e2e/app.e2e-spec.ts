import { OrderPage } from './app.po';

describe('order App', () => {
  let page: OrderPage;

  beforeEach(() => {
    page = new OrderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
