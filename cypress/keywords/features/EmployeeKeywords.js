/// <reference types="cypress" />

import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";

beforeEach(() => {
  cy.intercept({ method: "GET", url: "**/api**" }).as("getEmployees");
  cy.intercept({ method: "PUT", url: "**/api/**" }).as("updateEmployees");
  cy.intercept({ method: "POST", url: "**/api/**" }).as("createEmployees");
  cy.intercept({ method: "DELETE", url: "**/api/**" }).as("deleteEmployees");
});

afterEach(function() {
  let sql = `DELETE FROM employees WHERE name LIKE 'test%';`
  cy.task("queryDb", sql);
});

Given("open employees page", () => {
  cy.visit("/");
});

And("prepare employees data", () => {
  let sql = [
    `INSERT INTO employees (id, name, age, salary) VALUES(1, 'test name 1', 24, 100.0);`,
    `INSERT INTO employees (id, name, age, salary) VALUES(2, 'test name 2', 53, 200.0);`,
    `INSERT INTO employees (id, name, age, salary) VALUES(4, 'test name 3', 12, 300.0);`,
    `INSERT INTO employees (id, name, age, salary) VALUES(5, 'test name 4', 42, 400.0);`,
    `INSERT INTO employees (id, name, age, salary) VALUES(6, 'test name 5', 23, 500.0);`,
    `INSERT INTO employees (id, name, age, salary) VALUES(7, 'test name 6', 17, 600.0);`
  ].join("");
  cy.task("queryDb", sql);
})

Then("click load middle earth", () => {
  cy.get("#root > div > div > button").click();
});

And(
  "verify get Employees api response return 200 and have data",
  () => {
    cy.wait("@getEmployees").should((result) => {
      expect(result.response.statusCode).to.eq(200);
      expect(result.response.body.data.length).to.be.greaterThan(1);
    });
  }
);

And("verify update Employees api response return 202", () => {
  cy.wait("@updateEmployees").should((result) => {
    expect(result.response.statusCode).to.eq(202);
  });
});

Then("click edit at row {int}", (row) => {
  cy.get(`#btn-edit-${row}`).click();
});

And("click save update", () => {
  cy.get("#btn-save-update").click();
});

And("change age to {int}", (age) => {
  cy.get("#edit-age")
    .clear({ force: true })
    .type(age, { force: true });
});

And("click add new Employees", () => {
  cy.get("#btn-add").click();
});

And("click save new Employees", () => {
  cy.get("#btn-save-new").click();
});

And(
  "new Employees with name {string}, age {int}, salary {int}",
  (name, age, salary) => {
    cy.get("#new-name")
      .clear({ force: true })
      .type(name, { force: true });
    cy.get("#new-age")
      .clear({ force: true })
      .type(age, { force: true });
    cy.get("#new-salary")
      .clear({ force: true })
      .type(salary, { force: true });
  }
);

And("verify add new Employees api response return 201", () => {
  cy.wait("@createEmployees").should((result) => {
    expect(result.response.statusCode).to.eq(201);
  });
});

And("click delete at row {int}", (row) => {
  cy.get(`#btn-delete-${row}`).click();
});


And("click confirm delete", () => {
  cy.get("#react-confirm-alert > div > div > div > div > button:nth-child(1)").click();
});

And("verify delete Employees api response return 200", () => {
  cy.wait("@deleteEmployees").should((result) => {
    expect(result.response.statusCode).to.eq(200);
  });
});
