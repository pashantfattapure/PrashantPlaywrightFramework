# Page Object Model Framework Structure

## Overview
This framework is organized using the **Page Object Model (POM)** pattern for better maintainability, reusability, and scalability.

## Directory Structure

```
features/
├── pages/                     # Page Object Model classes
│   ├── BasePage.ts           # Base class with common methods
│   └── FormPage.ts           # Form page-specific methods
├── step-definations/         # Cucumber step definitions
│   └── input.ts              # Form-related steps
├── src/                      # Utilities and test data
│   ├── selectors.ts          # Centralized CSS selectors
│   ├── testData.ts           # Test data and configurations
│   └── formHelper.ts         # (Deprecated - use FormPage instead)
├── hooks/                    # Cucumber hooks
│   └── hooks.ts              # Setup/teardown and logging
└── src/
    └── Inputbox.feature      # Feature file
```

## Architecture

### 1. BasePage (Base Class)
**File:** `features/pages/BasePage.ts`

Contains reusable methods for all page objects:
- `navigateTo(url)` - Navigate to a URL
- `fillInput(selector, value)` - Fill input fields
- `getInputValue(selector)` - Get input field values
- `click(selector)` - Click elements
- `getText(selector)` - Get element text
- `checkCheckbox(selector)` - Check checkboxes
- `verifyChecked(selector)` - Assert element is checked
- `verifyTextContains(selector, text)` - Assert text content

**Extends:** N/A (Base class)

### 2. FormPage (Specific Page Object)
**File:** `features/pages/FormPage.ts`

Form-specific methods for the test webpage:
- `validatePageTitle()` - Validate page title
- `fillFormInputs(userData)` - Fill form with parameterized data
- `selectRadioButton(firstname)` - Select radio button based on logic
- `selectAllCheckboxes(checkboxList)` - Select checkboxes
- `getFormDataSummary()` - Get all form data as object

**Extends:** BasePage

### 3. Step Definitions
**File:** `features/step-definations/input.ts`

Uses FormPage objects:
```typescript
Then('I Validate the welcome page title', async function () {
    const formPage = new FormPage(page, logger);
    await formPage.validatePageTitle();
});
```

### 4. Test Data (Parameterized)
**File:** `features/src/testData.ts`

Centralized test data:
```typescript
export const TEST_DATA = {
  USER: {
    name: 'John',
    email: 'john@test.com',
    phone: '1234567890',
    message: 'Karve Nagar'
  },
  CHECKBOXES: ['Sunday', 'Monday', 'Tuesday', ...]
};
```

### 5. Selectors (Locators)
**File:** `features/src/selectors.ts`

All CSS selectors in one place:
```typescript
export const SELECTORS = {
  PAGE_TITLE: 'h1',
  FORM_INPUTS: '.form-group input',
  RADIO_BUTTONS: '.form-group input[type="radio"]',
  ...
};
```

## How to Add a New Page

1. **Create a new page class** in `features/pages/`:
```typescript
// features/pages/LoginPage.ts
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    await this.fillInput('#username', username);
    await this.fillInput('#password', password);
    await this.click('#loginBtn');
    this.logger.info('Login completed');
  }
}
```

2. **Use it in step definitions**:
```typescript
Given('I login with valid credentials', async function() {
  const loginPage = new LoginPage(page, logger);
  await loginPage.login('user@test.com', 'password');
});
```

## How to Add a New Test Scenario

1. **Update test data** in `features/src/testData.ts`:
```typescript
export const TEST_DATA = {
  USER: { /* existing */ },
  USER_JANE: {
    name: 'Jane',
    email: 'jane@test.com',
    phone: '9876543210',
    message: 'New Address'
  },
  CHECKBOXES_WEEKDAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
};
```

2. **Update feature file** `features/src/Inputbox.feature`:
```gherkin
Scenario: Validate with different user
  When Input box visible i should add data with user "Jane"
  When Radio button visible i should click on the radio button
```

3. **Add new step** in `features/step-definations/input.ts`:
```typescript
When('Input box visible i should add data with user {string}', async function(userName: string) {
  const formPage = new FormPage(page, logger);
  const userData = TEST_DATA[`USER_${userName.toUpperCase()}`];
  const firstname = await formPage.fillFormInputs(userData);
  this.firstname = firstname;
});
```

## Benefits of This POM Structure

✅ **Maintainability** - Changes in UI selectors only in one place
✅ **Reusability** - Page objects can be reused across multiple test scenarios
✅ **Scalability** - Easy to add new pages and test scenarios
✅ **Readability** - Step definitions are clean and easy to understand
✅ **Parameterization** - Test data separated from code
✅ **Error Handling** - Centralized error handling in BasePage
✅ **Logging** - Built-in logging for debugging

## Running Tests

```bash
npm run test:report
```

This will:
1. Execute Cucumber tests using FormPage objects
2. Generate JSON report
3. Generate HTML report with screenshots and videos
4. Display detailed error information for failed tests
