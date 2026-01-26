import { defineConfig } from 'cypress'
import * as fs from 'fs'
import * as path from 'path'

export default defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "spec, mocha-junit-reporter",
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit-[hash].xml",
      toConsole: false
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      const envName = config.env.env || 'dev'
      const envPath = path.resolve('cypress/env.json')

      if (!fs.existsSync(envPath)) {
        throw new Error(`Environment file not found: ${envPath}`)
      }

      const allEnvs = JSON.parse(fs.readFileSync(envPath, 'utf-8'))
      
      if(!allEnvs[envName]) {
        throw new Error(`Environment ${envName} not found in ${envPath}`)
      }

      const selectedEnv = allEnvs[envName]

      config.baseUrl = selectedEnv.baseUrl
      config.env = {
        ...config.env,
        ...selectedEnv
      }

      console.log(`Running tests on environment: ${envName}`)

      return config
    }
  },
  retries: {
    runMode: 2,
    openMode: 0
  }
})