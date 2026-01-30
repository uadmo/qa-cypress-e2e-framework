import { defineConfig } from 'cypress'
import { plugin as grep } from '@cypress/grep/plugin'
import * as fs from 'fs'
import * as path from 'path'

export default defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "spec, mocha-junit-reporter, mochawesome",

    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit-[hash].xml",
      toConsole: false
    },

    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/json",
      overwrite: false,
      html: false,
      json: true
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      grep(config)

      const envName = config.env.env || 'dev'
      const envPath = path.resolve('cypress/env.json')

      if (!fs.existsSync(envPath)) {
        throw new Error(`Environment file not found: ${envPath}`)
      }

      const allEnvs = JSON.parse(fs.readFileSync(envPath, 'utf-8'))

      if (!allEnvs[envName]) {
        throw new Error(`Environment ${envName} not found in ${envPath}`)
      }

      const selectedEnv = allEnvs[envName]

      config.baseUrl = selectedEnv.baseUrl
      config.env = {
        ...config.env,
        ...selectedEnv
      }

      console.log(`Running tests on environment: ${envName}`)

      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })

      return config
    }
  },
  env: {
    grepFilterSpecs: false,
    grepOmitFiltered: true
  },
  retries: {
    runMode: 2,
    openMode: 0
  }
})