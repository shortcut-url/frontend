/// <reference types="cypress"/>

import { nanoid } from 'nanoid/non-secure';

it('Sign up with email', () => {
  /* Go to the login page */

  cy.visit('/');

  cy.get('nav').find('a').contains('Login').click();

  cy.location('pathname', { timeout: 1500 }).should('eq', '/login');

  cy.get('a').contains('Or, register using mail').click();

  cy.location('pathname', { timeout: 1500 }).should('eq', '/join');

  /* Test */

  let email = `${nanoid(5)}@gmail.com`;

  cy.get('form')
    .find('input[name="email"]')
    .type(email)
    .should('have.value', email);

  let username = nanoid(5);

  cy.get('form')
    .find('input[name="username"]')
    .type(username)
    .should('have.value', username);

  let password = nanoid(10);

  cy.get('form')
    .find('input[name="password"]')
    .type(password)
    .should('have.value', password);

  cy.get('form').find('button').contains('Sign up').click();

  cy.location('pathname', { timeout: 1500 }).should('eq', '/');

  cy.authCheck(username);
});
