/// <reference types="cypress"/>

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login/email');

  cy.get('main').get('form').as('form');

  cy.get('@form')
    .find('input[type="email"]')
    .type(email)
    .should('have.value', email);

  cy.get('@form')
    .find('input[type="password"]')
    .type(password)
    .should('have.value', password);

  cy.get('@form').find('button').contains('Log in').click();
});
