import "cypress-xpath";
import "cypress-file-upload";
import "cypress-each";

describe("Create Edit user Data Driven Test", function () {
  const testData = require("../fixtures/editUser.json");
  const userId = 4; // fixed id

  beforeEach(function () {
    cy.visit("/admin/viewSystemUsers");

    //login
    cy.xpath('//*[@id="txtUsername"]').clear().type("Admin");
    cy.xpath('//*[@id="txtPassword"]').clear().type("KhangQuach@12345");
    cy.xpath('//*[@id="btnLogin"]').click();
  });

  it.each(testData)("Edit user", (data) => {
    const userRole = data["User role"] ?? "Admin";
    const employeeName = data["Employee name"] ?? "";
    const username = data["Username"] ?? "";
    const status = data["Status"] ?? "Enabled";
    const changePassword = data["Change password"] ?? false;
    const password = data["Password"] ?? "";
    const confirmPassword = data["Confirm password"] ?? "";
    const expected = data["Expected output"] ?? "";

    cy.log({ userRole, employeeName, username, status, changePassword, password, confirmPassword, expected });

    cy.xpath(`//a[contains(@href, "userId=${userId}")]`).click();
    cy.xpath('//*[@id="btnSave"]').click();

    //user role
    cy.xpath('//*[@id="systemUser_userType"]').select(userRole);
    cy.xpath('//*[@id="systemUser_employeeName_empName"]').clear().invoke('val', employeeName);
    cy.xpath('//*[@id="systemUser_userName"]').clear().invoke('val', username);
    cy.xpath('//*[@id="systemUser_status"]').select(status);

    //assert for not changing password
    if (!changePassword) {
        cy.xpath('//*[@id="btnSave"]').click();

        if (expected.indexOf('success') > -1) {
            cy.contains('System Users').should('exist');
        }
        else {
            cy.get('.validation-error').should('exist');
        }

        return;
    }

    cy.xpath('//*[@id="systemUser_chkChangePassword"]').click()

    cy.xpath('//*[@id="systemUser_password"]').clear().invoke('val', password);
    cy.xpath('//*[@id="systemUser_confirmPassword"]').clear().invoke('val', confirmPassword);

    cy.xpath('//*[@id="btnSave"]').click();

    //assert for changing password
    if (expected.indexOf('success') > -1) {
        cy.contains('System Users').should('exist');

        cy.xpath('//*[@id="welcome"]').click();
        cy.xpath('//*[@id="welcome-menu"]/ul/li[3]/a').click();

        //login
        cy.xpath('//*[@id="txtUsername"]').clear().invoke('val', username);
        cy.xpath('//*[@id="txtPassword"]').clear().invoke('val', password);
        cy.get('#btnLogin').click();

        cy.contains('Dashboard').should('exist');
    }
    else {
        cy.get('.validation-error').should('exist');
    }
  });
});
