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

Cypress.Commands.add('shortenUrl', (url) => {
  cy.visit('/');

  cy.get('form')
    .find('button:first')
    .should('contain.text', 'Create')
    .as('buttonSubmit');

  cy.get('form').find('input').as('inputUrl');

  cy.get('@buttonSubmit').should('be.disabled');

  cy.get('@inputUrl').type(url).should('have.value', url);

  cy.get('@buttonSubmit').click();

  cy.get('@inputUrl').should('have.value', '');
});
