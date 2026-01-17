
Cypress.Commands.add('login', (username: string, password: string) => {
   cy.session([username, password], () => {
       cy.visit('https://www.saucedemo.com/')

       cy.get('#user-name').type(username)
       cy.get('#password').type(password)
       cy.get('#login-button').click()
       
       cy.url().should('contain', 'inventory')
   },
   {
    validate() {
        cy.getCookie('session-username').should('exist')
    }
   }
   )
});
