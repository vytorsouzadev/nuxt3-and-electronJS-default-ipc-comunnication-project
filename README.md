
=======
# nuxt3 and electronJS default ipc comunnication Project
how configure nuxt3 and electron project tutorial - feb 025 - A ready-to-go boilerplate for building cross-platform desktop applications using Nuxt 3 and Electron, pre-configured with development tooling.

----


# Nuxt3 + Electron: Passo a Passo para Implementação

```
Este guia detalhado oferece um passo a passo completo para construir uma aplicação desktop utilizando Nuxt3 (um framework Vue.js) e Electron.
```
<!-- Centered Image -->
<p align="center" style="width:100%;display:flex" >
  <img src="URL_DA_SUA_IMAGEM_AQUI" width="90%" style="margin:0 auto;">
</p>

## Passo a Passo

### 1. Inicialização do Projeto

Comece criando um diretório para o seu projeto:

```bash
mkdir nuxt3-electron-app
```

```bash
cd nuxt3-electron-app
```

### 2. Configuração `package.json`

Crie o arquivo `package.json` e adicione as seguintes dependências e scripts:

**Arquivo:** `package.json`

```json
{
  "name": "nuxt3-and-electron-app",
  "version": "1.0.0",
  "description": "Nuxt 3 + Electron App",
  "main": "electron/main.js",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "electron:dev": "node electron/dev.js",
    "electron:build": "nuxt build && electron-builder",
    "watch": "nodemon -e js,ts,vue,html,json,mjs --exec node electron/dev.js"
  },
  "dependencies": {
    "dotenv": "^16.4.7",
    "electron-serve": "^1.1.0"
  },
  "devDependencies": {
    "electron": "^25.4.0",
    "electron-builder": "^24.6.3",
    "nodemon": "^3.1.9",
    "nuxt": "^3.7.0",
    "wait-on": "^7.0.1"
  }
}
```

Em seguida, instale as dependências:

```bash
npm install
```

### 3. Configuração `nuxt.config.ts`

Crie o arquivo `nuxt.config.ts` para configurar o Nuxt3:

**Arquivo:** `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: process.env.NODE_ENV === 'development' ? '/' : './'
  },
  devServer:{
    port: 33222
  },
  compatibilityDate: '2025-02-08'
})
```

Este arquivo configura o Nuxt para funcionar em modo SPA (Single Page Application), define a baseURL e a porta do servidor de desenvolvimento.

### 4. Criação dos Componentes Nuxt

Vamos criar alguns componentes para a interface do usuário:

**Arquivo:** `components/Navbar.vue`

```vue
<template>
    <nav class="navbar">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/send-message" class="nav-link">Send Message</NuxtLink>
        <NuxtLink to="/receive-message" class="nav-link">Receive Message</NuxtLink>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #333;
    padding: 1rem;
    background-color: #1e293b; /* bg-gray-800 - Dark Gray */
    padding: 1.5rem 2rem; /* py-6 px-8 - Increased padding for spaciousness */
    display: flex;
    gap: 1rem;
    gap: 2rem; /* space-x-8 - More gap between links */
    border-bottom: 1px solid #334155; /* border-b border-gray-700 - Subtle bottom border */
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-md - Subtle shadow */
    justify-content: flex-start; /* items-start - Align items to start */
    align-items: center; /* items-center - Center items vertically */
}

.nav-link {
    background: #f58b00;
    color: #000; /* text-gray-50 - Very light gray/almost white */
    text-decoration: none;
    padding: 0.75rem 1.25rem; /* py-3 px-5 - Increased padding for links */
    border-radius: 0.375rem; /* rounded-md - Medium rounded corners */
    font-weight: 500; /* font-medium - Medium font weight */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; /* transition-colors duration-200 */
}

.nav-link:hover {
    background-color: #374151; /* bg-gray-700 - Slightly lighter gray on hover */
    color: #ffffff; /* text-white - White text on hover */
}


</style>
```

### 5. Criação das Páginas Nuxt

Crie as páginas que utilizarão os componentes:

**Arquivo:** `pages/index.vue`

```vue
<template>
    <div>
        <Navbar />
        <div class="content">
            <h1>Welcome to Electron + Nuxt3</h1>
            <p>Choose an option from the navigation bar above</p>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
    useHead({
        title: 'Electron AND Nuxt3'+route.params.name,
        meta: [
            { name: 'description', content: 'Electron + Nuxt3' },
        ] 
    })


</script>

<style scoped>
.content {
    padding: 20px;
}
</style>
```

**Arquivo:** `pages/send-message.vue`

```vue
<template>
    <div>
        <Navbar />
        <div class="content">
            <h2>Send Message</h2>
            <input 
                v-model="message" 
                type="text" 
                placeholder="Type your message"
                @keydown.enter="sendMessage"  
            >
            <button @click="sendMessage">
                Send Message
            </button>
        </div>
    </div>
</template>

<script setup>
const message = ref('')

const sendMessage = () => {
    window.electron.send('message-to-main', message.value)
    message.value = ''
}
</script>

<style scoped>
.content {
    padding: 20px;
}

input {
    margin: 10px 0;
    padding: 8px;
}

button {
    padding: 8px 16px;
    margin-left: 10px;
    cursor: pointer;
}
</style>
```

**Arquivo:** `pages/receive-message.vue`

```vue
<template>
    <div>
        <Navbar />
        <div class="content">
            <h2>Receive Messages</h2>
            <div class="messages">
                <div v-for="(msg, index) in messages" :key="index" class="message">
                    {{ msg }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const messages = ref([])
let unsubscribe = null

onMounted(() => {
    unsubscribe = window.electron.receive('message-from-main', (message) => {
        messages.value.push(message)
    })
})

onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe()
    }
})
</script>

<style scoped>
.content {
    padding: 20px;
}

.messages {
    margin-top: 20px;
    display: flex; /* Enable flexbox for better layout control */
    flex-direction: column; /* Stack messages vertically */
    gap: 10px; /* Spacing between messages */
}

.message {
    padding: 12px 16px; /* Increased padding for better visual spacing */
    background-color: #f9f9f9; /* Light gray background similar to Tailwind 'gray-100' */
    border-radius: 0.5rem; /* Rounded corners, similar to Tailwind 'rounded-md' */
    border: 1px solid #e5e7eb; /* Light border, similar to Tailwind 'border-gray-200' */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth, similar to Tailwind 'shadow-sm' */
    font-size: 1rem; /* Base font size */
    line-height: 1.5rem; /* Comfortable line height for readability */
    word-wrap: break-word; /* Ensure long messages wrap */
}

/* Optional: Hover effect for interactivity */
.message:hover {
    background-color: #f4f4f5; /* Slightly darker gray on hover, similar to Tailwind 'gray-200' */
    border-color: #d4d4d8; /* Slightly darker border on hover, similar to Tailwind 'border-gray-300' */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow on hover */
}
</style>
```

### 6. Arquivo Principal do Nuxt `app.vue`

**Arquivo:** `app.vue`

```vue
<template>
  <NuxtPage/>
</template>
```

### 7. Configuração Electron

Crie um diretório `electron` na raiz do projeto. Dentro dele, crie os seguintes arquivos:

**Arquivo:** `electron/main.js`

```javascript
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
```

**Arquivo:** `electron/preload.js`

```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data)
    },
    receive: (channel, callback) => {
        const subscription = (event, ...args) => callback(...args)
        ipcRenderer.on(channel, subscription)
        return () => ipcRenderer.removeListener(channel, subscription)
    }
})
```

**Arquivo:** `electron/dev.js`

```javascript
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
```

### 8. Executando a Aplicação

Para executar a aplicação em modo de desenvolvimento, use o seguinte comando:

```bash
npm run electron:dev
```

Para construir a aplicação para produção, use:

```bash
npm run electron:build
```

**Observações:**

*   Substitua `URL_DA_SUA_IMAGEM_AQUI` no início deste documento pela URL de uma imagem relevante para o projeto.
*   Este guia assume que você já tem o Node.js e o npm instalados.
*   A versão do Electron (25.4.0) foi escolhida para corresponder ao arquivo `package.json` fornecido.  É recomendável usar a versão mais recente compatível com o seu projeto.

Este passo a passo fornece uma base sólida para construir aplicações desktop com Nuxt3 e Electron. Adapte e expanda conforme necessário para atender aos requisitos específicos do seu projeto.
```
