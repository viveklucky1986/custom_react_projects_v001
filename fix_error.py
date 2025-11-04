#!/usr/bin/env python3
"""
Fix React Vite Build Issues
"""

import os
import json
from pathlib import Path

def create_file(filepath, content):
    """Create a file with the given content"""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created/Updated: {filepath}")

def main():
    project_dir = Path("C:\\ContextMenuScripts\\ReactJS_Examples\\Custom Examples\\interactive-profile-app")
    
    # Fix 1: Update vite.config.js
    vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  root: '.'
})
"""
    
    # Fix 2: Create index.html in root (move from public/)
    index_html = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Interactive Profile App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
"""
    
    # Fix 3: Update src/index.js to use correct import
    src_index = """import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
"""
    
    # Create the fixed files
    create_file(project_dir / "vite.config.js", vite_config)
    create_file(project_dir / "index.html", index_html)
    create_file(project_dir / "src" / "index.js", src_index)
    
    # Remove old index.html from public if it exists
    old_index = project_dir / "public" / "index.html"
    if old_index.exists():
        os.remove(old_index)
        print(f"Removed: {old_index}")
    
    print("\\nFixed build configuration!")
    print("Now run:")
    print("pnpm build")

if __name__ == "__main__":
    main()