Feature: Dropdown validation and select data to the dropdown

Background:
        Given I open the webpage "https://testautomationpractice.blogspot.com/"
        Then I Validate the welcome page title

Scenario: Validate the dropdown
    Then I select the country and validate the selected country
    Then I see colors field and validate the data in colors field
    Then I see sorted list and validate the data in sorted list