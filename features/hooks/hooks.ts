import { Before, After, BeforeAll, AfterAll, AfterStep, BeforeStep,setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, BrowserContext, Page, chromium } from '@playwright/test'; 
import { afterEach } from 'node:test';
import winston from 'winston';

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

BeforeAll(async function() {
    console.log('Launch Browser')
    setDefaultTimeout(60 * 1000);
    browser = await chromium.launch({ headless: true, args: ['--start-maximized'] });
    context = await browser.newContext({
        viewport: null,
        recordVideo: {
            dir: 'videos/',
            size: { width: 1280, height: 720 }
        }
    });
    page = await context.newPage();
})

AfterStep(async function ({ pickleStep, result }) {
  if (!page) return;

  const screenshot = await page.screenshot();
  await this.attach(screenshot,'image/png');
  await this.attach(`Step: ${pickleStep.text} - ${result?.status}`, 'text/plain');
  await page.waitForTimeout(500);
});


AfterAll(async function() {
    console.log('Close Browser')
    await browser.close();
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [new winston.transports.Console()],
});

