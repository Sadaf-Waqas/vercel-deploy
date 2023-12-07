import authPo from '../../support/auth.po';

describe(`Non-Admin user accessing the Super Admin`, () => {
  it('should redirect the user to a 404', () => {
    cy.signIn('/', {
      email: 'multi-account-email@makerkit.dev',
      password: authPo.getDefaultUserPassword(),
    });

    cy.visit('/admin', {
      failOnStatusCode: false,
    });

    cy.url().should('include', '/404');
  });
});
