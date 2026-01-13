class LoginPage {
    visit(): void {
        cy.visit('/')
    }

    login(username: string, password: string): void {
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('#login-button').click()
    }

    errorMessage(): Cypress.Chainable<string> {
        return cy.get('[data-test="error"]').invoke('text')
    }
}

export default new LoginPage()