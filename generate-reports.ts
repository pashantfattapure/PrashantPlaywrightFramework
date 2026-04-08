import { generate } from 'cucumber-html-reporter';

generate({
  theme: "bootstrap", // Ensure the theme is one of the allowed literal values
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  screenshotsDirectory: 'screenshots',
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0",
    "Test Environment": "Test",
    "Browser": "Chrome",
    "Platform": "Windows 11",
    "Executed": "Local"
  }
});

  