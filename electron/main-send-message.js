const { app, BrowserWindow,dialog,ipcMain  } = require('electron')
const path = require('path')
const express = require('express')
const waitOn = require('wait-on')
const portfinder = require('portfinder')


let mainWindow

async function createWindow(url) {
  //const win = new BrowserWindow({
  mainWindow = new BrowserWindow({
    //desativa o menu
    autoHideMenuBar: true,
    width: 640,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Recommended security setting. Prevents renderer process code from having Node.js access.
      contextIsolation: true,  // Recommended security setting. Isolates the renderer process context to prevent access to the main process's globals.
      preload: path.join(__dirname, 'preload.js') // Path to the preload script that will be injected into the renderer process.
  }
  })
  await mainWindow.loadURL(url)


      //ativa envio de mensagens do back-end para o front-end
        // Start automatic message sender
        startAutoMessageSender()
}



// **Temporary message sender to frontend (for demonstration)**
// This function simulates sending messages to the frontend, similar to push notifications or real-time updates.
// It is for demonstration purposes and should be replaced with your actual backend logic for sending messages.
function startAutoMessageSender() {
  let counter = 1
  setInterval(() => {
      if (mainWindow) {
          const autoMessage = `Automatic Message #${counter}`
          mainWindow.webContents.send('message-from-main', autoMessage) // Send message to the renderer process via 'message-from-main' channel.
          counter++
      }
  }, 1500) // Send a message every 1.5 seconds. Adjust the interval as needed.
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


  ipcMain.on('message-to-main', (event, message) => {
    // **Handle messages from the frontend**
    // This section listens for messages sent from the renderer process (frontend) to the main process (backend) on the 'message-to-main' channel.
    console.log('Message received from frontend:', message)
    // **Echo message back to all windows (including the sender)**
    // For demonstration, this line sends the received message back to all browser windows via the 'message-from-main' channel.
    // In a real application, you might process the message here and send a different response or trigger other backend actions.
    mainWindow.webContents.send('message-from-main', message)

        // Exibir um alerta quando uma mensagem for recebida do frontend
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'Mensagem Recebida',
          message: 'Mensagem recebida do frontend:',
          detail: message,
          buttons: ['OK']
      })
})
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
