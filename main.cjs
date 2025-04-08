const { app, BrowserWindow } = require('electron');
import path from 'path';

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      baseUrl: path.join(__dirname, 'dist')
    },
  });

  console.log('Current directory:', __dirname);
  console.log('Base URL:', path.join(__dirname, 'dist'));

  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Open DevTools for debugging
  mainWindow.webContents.openDevTools();
});
