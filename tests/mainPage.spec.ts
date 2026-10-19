import { test, expect, type Locator, type Page } from '@playwright/test';
import { getMainPageLocators } from './mainPage.locators';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: { type: 'href', value: '/' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: { type: 'href', value: '/docs/intro' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP link',
    text: 'MCP',
    attribute: { type: 'href', value: '/mcp/introduction' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI link',
    text: 'CLI',
    attribute: { type: 'href', value: '/agent-cli/introduction' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: { type: 'href', value: '/docs/api/class-playwright' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByLabel('GitHub repository'),
    name: 'GitHub icon',
    attribute: { type: 'href', value: 'https://github.com/microsoft/playwright' },
  },
  {
    locator: (page: Page): Locator => page.getByLabel('Discord server'),
    name: 'Discord icon',
    attribute: { type: 'href', value: 'https://aka.ms/playwright/discord' },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: /Switch between dark and light mode/ }),
    name: 'Light mode icon',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: /Search/ }),
    name: 'Search button',
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    const steps: Promise<void>[] = [];

    elements.forEach(({ locator, name }) => {
      steps.push(
        test.step(`Проверка отображения элемента ${name}`, async () => {
          await expect.soft(locator(page)).toBeVisible();
        }),
      );
    });

    await Promise.all(steps);
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    const steps: Promise<void>[] = [];

    elements.forEach(({ locator, name, text }) => {
      if (text) {
        steps.push(
          test.step(`Проверка названия элемента ${name}`, async () => {
            await expect(locator(page)).toContainText(text);
          }),
        );
      }
    });

    await Promise.all(steps);
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    const steps: Promise<void>[] = [];

    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        steps.push(
          test.step(`Проверка атрибутов href элемента ${name}`, async () => {
            await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
          }),
        );
      }
    });

    await Promise.all(steps);
  });

  test('Проверка переключения light mode', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await locators.themeToggle.click();
    await locators.themeToggle.click();

    await expect(locators.pageRoot).toHaveAttribute('data-theme', 'dark');
  });

  test('Проверка заголовка страницы', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await expect.soft(locators.heroHeading).toBeVisible();
    await expect
      .soft(locators.heroHeading)
      .toContainText('Playwright enables reliable web automation');
  });

  test('Проверка кнопки Get started', async ({ page }) => {
    const locators = getMainPageLocators(page);

    await expect.soft(locators.getStarted).toBeVisible();
    await expect.soft(locators.getStarted).toContainText('Get started');
    await expect.soft(locators.getStarted).toHaveAttribute('href', '/docs/intro');
  });
});
