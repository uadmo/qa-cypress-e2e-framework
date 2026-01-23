import LoginPage from '@pages/LoginPage'
import { User } from '../../../types/user'

beforeEach(() => {
    LoginPage.visit()
})

describe('[ui][smoke] Login', () => {
    it('[smoke] Should login successfully', () => {
        cy.fixture('users').then((users) => {
            LoginPage.login(users.validUser.username, users.validUser.password)
        })

        cy.url().should('include', '/inventory')
    })
})

describe ('[ui][smoke] Login - invalid scenarios', () => {
    let validUser: User
    let invalidUser: User
    let lockedUser: User

    before(() => {
        cy.fixture('users').then((users) => {
            validUser = users.validUser
            invalidUser = users.invalidUser
            lockedUser = users.lockedUser
        })
    })

    it('[smoke] Should not login with invalid credentials', () => {
        LoginPage.login(invalidUser.username, invalidUser.password)

        LoginPage.errorMessage().should('contain', 'Epic sadface')
    })

    it('[smoke] Should not login with locked out user', () => {
        LoginPage.login(lockedUser.username, lockedUser.password)

        LoginPage.errorMessage().should('contain', 'locked out')
    })
})