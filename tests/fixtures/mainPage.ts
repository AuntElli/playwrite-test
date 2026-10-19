import { test as base } from '@playwright/test';
import { MainPage } from '../models/MainPage';

type MyFixtures = {
  mainPage: MainPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await use(mainPage);
  },
});
