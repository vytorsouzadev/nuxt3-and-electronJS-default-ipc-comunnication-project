const { app, BrowserWindow } = require('electron')
const path = require('path')
const express = require('express')
const waitOn = require('wait-on')
const portfinder = require('portfinder')

let mainWindow;

async function createWindow(url) {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Recommended security setting. Prevents renderer process code from having Node.js access.
      contextIsolation: true,  // Recommended security setting. Isolates the renderer process context to prevent access to the main process's globals.
      preload: path.join(__dirname, 'preload.js') // Path to the preload script that will be injected into the renderer process.
  }
  })
  await mainWindow.loadURL(url)
}

async function startDevelopmentMode() {
  const port = process.env.PORT || 3000
  const devServerUrl = `http://localhost:${port}`
  
  await waitOn({
    resources: [devServerUrl],
    timeout: 360000
  })
  
  await createWindow(devServerUrl)
}

async function startProductionMode() {
  const expressApp = express()
  
  // Configure portfinder
  portfinder.basePort = 3030
  
  // Serve static files
  expressApp.use(express.static(path.join(__dirname, '../.output/public')))
  
  try {
    const port = await portfinder.getPortPromise()
    expressApp.listen(port, () => {
      console.log(`Production server running on port ${port}`)
      createWindow(`http://localhost:${port}`)
    })
  } catch (err) {
    console.error('Failed to find an open port:', err)
    throw err
  }
}

app.whenReady().then(async () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Starting in development mode...')
    await startDevelopmentMode()
  } else {
    console.log('Starting in production mode...')
    await startProductionMode()
  }

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (process.env.NODE_ENV === 'development') {
        await startDevelopmentMode()
      } else {
        await startProductionMode()
      }
    }
  })


})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
