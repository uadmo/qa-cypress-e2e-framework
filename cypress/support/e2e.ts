import './commands'
import { register } from '@cypress/grep'
register()

afterEach(function () {
    const test = this.currentTest
    if (test && test.state === 'passed' && (test as any).currentRetry() > 0) {
        const titlePath = test.titlePath ? test.titlePath().join(' -> ') : test.title
        cy.task('log', `FLAKY TEST: ${titlePath}`, { log: false })
    }
})