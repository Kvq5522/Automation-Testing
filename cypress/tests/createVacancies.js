import "cypress-xpath";
import "cypress-file-upload";
import "cypress-each";

describe("Create Job vacancies Data Driven Test", function () {
  const testData = require('../fixtures/createJobVacancies.json');

  beforeEach(function () {
    cy.visit("/recruitment/viewJobVacancy");

    //login
    cy.xpath('//*[@id="txtUsername"]').type("Admin");
    cy.xpath('//*[@id="txtPassword"]').type("KhangQuach@12345");
    cy.xpath('//*[@id="btnLogin"]').click();
  });

  it.each(testData)("Create Job Vacancies", (data) => {
    const jobTitle = data["Job title"] ?? "";
    const vacancyName = data["Vacancy name"] ?? "";
    const hiringManager = data["Hiring manager"] ?? "";
    const numberOfPositions = data["Number of positions"] ?? "";
    const description = data["Description"] ?? "";
    const expected = data["Expected result"] ?? "";

    cy.xpath('//*[@id="btnAdd"]').click();

    //fill in form
    cy.xpath('//*[@id="addJobVacancy_jobTitle"]').select(jobTitle);
    cy.xpath('//*[@id="addJobVacancy_name"]')
      .clear()
      .invoke("val", vacancyName);
    cy.xpath('//*[@id="addJobVacancy_hiringManager"]')
      .clear()
      .invoke("val", hiringManager);
    cy.xpath('//*[@id="addJobVacancy_noOfPositions"]')
      .clear()
      .invoke("val", Number(numberOfPositions));
    cy.xpath('//*[@id="addJobVacancy_description"]')
      .clear()
      .invoke("val", description);

    //click save button
    cy.xpath('//*[@id="btnSave"]').click();

    //assert
    if (expected.indexOf('success') > -1) {
        cy.contains('Edit Job Vacancy').should('exist');
    } else {
        cy.get(".validation-error").should("exist");
    }
  });
});
