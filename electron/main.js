const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const serve = require('electron-serve')



const loadURL = serve({ directory: 'dist' })
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // Recommended security setting. Prevents renderer process code from having Node.js access.
            contextIsolation: true,  // Recommended security setting. Isolates the renderer process context to prevent access to the main process's globals.
            preload: path.join(__dirname, 'preload.js') // Path to the preload script that will be injected into the renderer process.
        }
    })

    if (process.env.NODE_ENV === 'development') {
        // In development, load the Nuxt.js dev server URL.
        mainWindow.loadURL('http://localhost:33222')
        // Open DevTools for debugging in development.
        mainWindow.webContents.openDevTools()
    } else {
        // In production, load the built Nuxt.js application from the 'dist' folder using electron-serve.
        loadURL(mainWindow)
    }

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

app.whenReady().then(() => {
    createWindow()

    ipcMain.on('message-to-main', (event, message) => {
        // **Handle messages from the frontend**
        // This section listens for messages sent from the renderer process (frontend) to the main process (backend) on the 'message-to-main' channel.
        console.log('Message received from frontend:', message)
        // **Echo message back to all windows (including the sender)**
        // For demonstration, this line sends the received message back to all browser windows via the 'message-from-main' channel.
        // In a real application, you might process the message here and send a different response or trigger other backend actions.
        mainWindow.webContents.send('message-from-main', message)
    })

    app.on('activate', function () {
        // On macOS, it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    // Quit the app when all windows are closed, except on macOS.
    // On macOS, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
    if (process.platform !== 'darwin') app.quit()
})
