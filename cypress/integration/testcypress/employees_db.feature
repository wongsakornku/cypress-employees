Feature: Employees Page Connect Mysql
    @focus
    Scenario: Load Employees and verify api return 200 with data
        Given prepare employees data
        And open employees page
        When click load middle earth
        Then verify get Employees api response return 200 and have data
