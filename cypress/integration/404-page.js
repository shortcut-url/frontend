/// <reference types="cypress"/>

context('Error page 404', () => {
  it('Should display a standard error', () => {
    cy.visit('/unkown', {
      failOnStatusCode: false
    });

    let standardError = '404 - Page Not Found';

    cy.title(standardError);

    cy.get('main').find('h1').should('contain.text', standardError);

    cy.get('main')
      .find('a')
      .should('have.attr', 'href', '/')
      .and('contain.text', 'Home page');
  });

  it('Should display a custom error', () => {
    let customError = 'mnvdmitry.cc';

    let queryParams = new URLSearchParams();
    queryParams.set('errorText', customError);

    cy.visit(`/404?${queryParams}`, {
      failOnStatusCode: false
    });

    cy.title(customError);

    cy.get('main').find('h1').should('contain.text', customError);
  });

  it('Must change the text, the url of the callback button (link)', () => {
    let callbackLinkHref = '/profile';
    let callbackLinkText = 'Go to profile page';

    let queryParams = new URLSearchParams();
    queryParams.set('callbackLinkHref', callbackLinkHref);
    queryParams.set('callbackLinkText', callbackLinkText);

    cy.visit(`/404?${queryParams}`, {
      failOnStatusCode: false
    });

    cy.get('main')
      .find('a')
      .should('have.attr', 'href', callbackLinkHref)
      .and('contain.text', callbackLinkText);
  });
});
