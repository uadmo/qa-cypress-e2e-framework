
Cypress.Commands.add('login', (username: string, password: string) => {
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
});
