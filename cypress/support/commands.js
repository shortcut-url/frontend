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

  cy.location('pathname', { timeout: 1500 }).should('eq', '/');
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

Cypress.Commands.add('authCheck', (username) => {
  cy.visit('/');

  cy.get('nav').contains(username);

  cy.get('nav').find('a').contains('Your profile').click();

  cy.location('pathname', { timeout: 1500 }).should('eq', '/profile');
});
