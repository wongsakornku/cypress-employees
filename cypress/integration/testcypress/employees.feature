Feature: Employees Page
    @focus
    Scenario: Load Employees and verify api return 200 with data
        Given open employees page
        When click load middle earth
        Then verify get Employees api response return 200 and have data

    Scenario: Edit Employees and verify api return 202
        Given open employees page
        When click load middle earth
        And click edit at row 0
        And change age to 888
        And click save update
        Then verify update Employees api response return 202

    Scenario: Add Employees and verify api return 201
        Given open employees page
        When click load middle earth
        And click add new Employees
        And new Employees with name "New Name", age 22, salary 888
        And click save new Employees
        Then verify add new Employees api response return 201

    Scenario: Delete Employees and verify api return 200
        Given open employees page
        When click load middle earth
        And click delete at row 6
        And click confirm delete
        Then verify delete Employees api response return 200