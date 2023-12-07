import organizationPageObject from '../../support/organization.po';

describe(`Create Organization`, () => {
  const organizationName = `org-${(Math.random() * 10).toFixed(2)}`;

  const defaultOrganizationId =
    organizationPageObject.getDefaultOrganizationId();

  it('should be able to create a new organization', () => {
    cy.signIn(`/dashboard`);

    organizationPageObject.createOrganization(organizationName);

    organizationPageObject
      .$currentOrganization()
      .should('contain', organizationName);

    cy.getCookie('organizationId').should(
      'not.have.property',
      'value',
      defaultOrganizationId,
    );
  });
});
