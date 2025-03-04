@steamDown
Feature: Steam Store

@steamDownBiggestDiscount
  Scenario Outline: I am as a user be able to find the game with the biggest discount and download steam installer

    Given I am on the main page
    When I am choosing 'Action' games from the menu
    Then I am on the action page
    When I am choosing 'Top Sellers' category
    And Pick the game with the biggest discount
    And I go on the to the chosen game page
    Then I am on the game page
    And Price and discount are correct
    And I am able to download steam installer
