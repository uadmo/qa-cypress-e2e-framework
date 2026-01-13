import LoginPage from '@pages/LoginPage'

describe('Login', () => {
    it('Should login successfully', () => {
        LoginPage.visit()
        LoginPage.login('standard_user', 'secret_sauce')

        cy.url().should('include', '/inventory')
    })
})