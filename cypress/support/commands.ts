import { User } from "cypress/types/user";

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/')

    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')
});

Cypress.Commands.add('loginByApi', (role: string) => {
    cy.fixture('users').then((users: Record<string, User>) => {
        const user = users[role]

        if (!user) {
            throw new Error(`User ${role} not found`)
        }

        cy.request({
            method: 'POST',
            url: Cypress.env('apiUrl') + '/session',
            body: {
                username: user.username,
                password: user.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            cy.setCookie('session-username', user.username)
        })
    })
})
