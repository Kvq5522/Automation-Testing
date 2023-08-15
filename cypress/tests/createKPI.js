import "cypress-xpath";
import "cypress-file-upload";
import "cypress-each";

describe("Create KPI Data-Driven Test", function () {
  const testData = require("../fixtures/createKPI.json");

  beforeEach(function () {
    cy.visit("/performance/searchKpi");

    //login
    cy.xpath('//*[@id="txtUsername"]').type("Admin");
    cy.xpath('//*[@id="txtPassword"]').type("KhangQuach@12345");
    cy.xpath('//*[@id="btnLogin"]').click();
  });

  it.each(testData)(`Test case create KPI`, (data) => {
    const jobTitle = data['Job title'] ?? "";
    const kpi = data['Key Performance Indicator'] ?? "";
    const minRating = data['Minimum rating'] ?? "";
    const maxRating = data['Maximum rating'] ?? "";
    const expected = data['Expected output'] ?? "";

    //click add button
    cy.xpath('//*[@id="btnAdd"]').click();

    //fill in form
    cy.xpath('//*[@id="defineKpi360_jobTitleCode"]').select(jobTitle);
    cy.xpath('//*[@id="defineKpi360_keyPerformanceIndicators"]')
      .clear()
      .invoke("val", kpi);
    cy.xpath('//*[@id="defineKpi360_minRating"]')
      .clear()
      .invoke("val", minRating);
    cy.xpath('//*[@id="defineKpi360_maxRating"]')
      .clear()
      .invoke("val", maxRating);

    //click save button
    cy.xpath('//*[@id="saveBtn"]').click();

    //assert
    if (expected.indexOf("success") > -1) {
      cy.contains(kpi).should("exist");
    } else {
      cy.get(".validation-error").should("exist");
    }
  });
});
