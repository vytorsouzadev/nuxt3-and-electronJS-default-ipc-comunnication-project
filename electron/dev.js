const { spawn } = require('child_process')
const electron = require('electron')
const waitOn = require('wait-on')
const path = require('path');

require('dotenv').config();

// Kill process on exit
process.on('SIGTERM', () => {
  process.exit(0)
})

// Start Electron with proper error handling
const startElectron = () => {
  const electronProcess = spawn(electron, ['.'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development'
    }
  })

  electronProcess.on('close', () => {
    process.exit()
  })

  electronProcess.on('error', (err) => {
    console.error('Failed to start electron:', err)
    process.exit(1)
  })
}

// Start Nuxt dev server
console.log('Starting Nuxt development server...')
const nuxtDev = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
})

nuxtDev.on('error', (err) => {
  console.error('Failed to start Nuxt dev server:', err)
  process.exit(1)
})

// Wait for Nuxt server to be ready
waitOn({
  resources: ['http://localhost:33222'],//
  timeout: 30000,
  interval: 100,
}).then(() => {
  console.log('Nuxt development server is ready')
  startElectron()
}).catch((err) => {
  console.error('Error waiting for Nuxt development server:', err)
  process.exit(1)
})
