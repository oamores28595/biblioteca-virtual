Feature: Loan Management
  As a librarian
  I want to register and return book loans
  So that I can track which copies are on loan and to whom

  Background:
    Given the reader "Ana Torres" is already registered
    And the book "Cien años de soledad" has 4 available copies

  Scenario: Successfully register a new loan
    Given I am on the loans page
    When I click "+ Registrar préstamo"
    And I select the book "Cien años de soledad"
    And I select the reader "Ana Torres"
    And I click "Confirmar préstamo"
    Then I should see a confirmation that the loan was registered
    And the loan should appear in the loans list with status "Activo"
    And the book "Cien años de soledad" should have 3 available copies

  Scenario: Fail to register a loan when there are no available copies
    Given the book "Fahrenheit 451" has 0 available copies
    And I am on the loans page
    When I click "+ Registrar préstamo"
    Then I should not see "Fahrenheit 451" in the list of books available to loan

  Scenario: Register the return of an active loan
    Given "Ana Torres" has an active loan for "Cien años de soledad"
    And I am on the loans page
    When I click "Registrar devolución" on that loan
    Then the loan should show the status "Devuelto"
    And the book "Cien años de soledad" should have 4 available copies

  Scenario: Fail to return a loan that was already returned
    Given "Ana Torres" has a loan for "Cien años de soledad" that was already returned
    When I try to register its return again
    Then I should see the error message "Este préstamo ya fue devuelto"

  Scenario: Filter loans by status
    Given there are both active and returned loans in the system
    When I filter the loans list by "Activos"
    Then I should only see loans with the status "Activo"

  Scenario: A loan appears as overdue after its due date has passed
    Given "Ana Torres" has an active loan for "Cien años de soledad" due 20 days ago
    When I view the loans page
    Then that loan should be shown with the status "Atrasado"
