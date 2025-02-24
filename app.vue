<template>
  <div id="app">
    <NavBar/>
    <h1 class="main-title">Nuxt3 and ElectronJS - Simple IPC-Comunnication Project</h1>

  
   
    <nuxtPage/>
  </div>
  </template>
  
  <style >
    *{margin: 0px;
      font-family: system-ui,'Arial', sans-serif;
      padding: 0px;
      }
    #app{
 
      background: #ffe401!important;
      min-height: 98vh;
      height: 100%;
    }
  .main-title {
    text-align: center;
    width: 80%;
    margin: 0 auto;
    padding-bottom: 10px;
    padding-top: 15px;
    border-bottom: 2px solid #303030;
  }
  </style>
  