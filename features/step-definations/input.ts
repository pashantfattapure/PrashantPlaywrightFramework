import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {Page, Browser, chromium} from "@playwright/test";
import { page, browser, logger} from '../hooks/hooks';


Given('I open the webpage {string}',{timeout: 60000}, async function (url: string) {
    await page.goto(url);
    logger.info(`Navigated to ${url}`);
});

Then('I Validate the welcome page title', async function () {
    try{
    const title = await page.locator('h1');
    await expect(title).toHaveText("Automation Testing Practice");
    logger.info("Welcome page title is validated");
}catch(error) {
    logger.error(`Error validating welcome page title: ${error}`);
    throw error;}
});

 When('Input box visible i should add data to the input box', async function () {
    try{
    const inputs = page.locator('.form-group input');

await inputs.nth(0).fill('John');              // Name
await inputs.nth(1).fill('john@test.com');     // Email
await inputs.nth(2).fill('1234567890');        // Phone

// Validate
const values = await inputs.allTextContents(); // alternative approach

for (let i = 0; i < await inputs.count(); i++) {
  const val = await inputs.nth(i).inputValue();
  if (!val) {
    throw new Error(`Field ${i} is empty`);
    
  }
}
const firstname = await inputs.nth(0).inputValue();
console.log(firstname);
await page.locator('.form-group textarea').fill('Karve Nagar'); // Message
logger.info("Input box is filled with data and validated");
}catch(error) {
    logger.error(`Error filling input box: ${error}`);
    throw error;}   

});

When('Radio button visible i should click on the radio button', async function () {
    try{
    const radioButtons = page.locator('.form-group input[type="radio"]');
    const maleRadioButton = radioButtons.nth(0);
    const femaleRadioButton = radioButtons.nth(1);
    const firstname = this.firstname;
   
    await femaleRadioButton.check();
    if(await maleRadioButton.isChecked()) {
        console.log("Male radio button is selected");
    } else {
        console.log("Male radio button is not selected");
    }
    logger.info("Radio button is selected");
}catch(error) {
    logger.error(`Error selecting radio button: ${error}`);
    throw error;}
})

Then('I select the days and validate the selected days', async function () {
    try{
    const days = page.locator('.form-group input[type="checkbox"]');
    const labels: string[] = [];

    const count = await days.count();

    for (let i = 0; i < count; i++) {
    const id = await days.nth(i).getAttribute('id');
    const labelText = await page.locator(`label[for="${id}"]`).textContent();
  
    labels.push(labelText?.trim() || '');
    }
    const checkboxes = await labels.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    for (const checkbox of checkboxes) {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    logger.info(`Checkbox with label "${await checkbox.getAttribute('id')}" is checked`);
    }
}catch(error) {
    logger.error(`Error selecting checkboxes: ${error}`);
    throw error;}
});

Then('I select the country and validate the selected country', async function () {
    try{
    const dropdown = page.locator('#country>option');
    const options: string[] = (await dropdown.allTextContents()).map(option => option.trim());
    logger.info("Dropdown options are validated");
    console.log(options);
    await page.selectOption('#country', 'India');
    const selectedValue = await page.locator('#country').inputValue();
    expect(selectedValue).toBe('india');
    logger.info("Selected country is validated");
}catch(error) {
    logger.error(`Error selecting country: ${error}`);
    throw error;}   
});

Then('I see colors field and validate the data in colors field', async function () {
    try{
    const colorsDropdown = page.locator('#colors>option');
    const colors: string[] = (await colorsDropdown.allTextContents()).map(option => option.trim());
    console.log(colors);
    logger.info("Colors dropdown options are validated");
    }catch(error) {
        logger.error(`Error validating colors dropdown: ${error}`);
        throw error;}
});

Then('I see sorted list and validate the data in sorted list', async function () {
    try{
    const sortedList = page.locator('#animals>option');
    const animals: string[] = (await sortedList.allTextContents()).map(option => option.trim());
    console.log(animals);
    logger.info("Sorted list options are validated");
    }catch(error) {
        logger.error(`Error validating sorted list: ${error}`);
        throw error;}
});
