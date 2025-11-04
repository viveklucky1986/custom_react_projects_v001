# 🎭 Interactive Profile Manager

A dynamic React application for managing and customizing celebrity profiles with real-time editing capabilities. Create, modify, and explore detailed profiles with an intuitive interface.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🎯 Smart Profile Management**
  - Real-time profile editing and updates
  - Auto-save functionality with manual override
  - Duplicate prevention and data validation
  - Local storage persistence

- **🖼️ Dynamic Media Controls**
  - Customizable profile images with URL support
  - Interactive image size slider (50px - 200px)
  - Instant preview of changes
  - Default avatar generation

- **🔍 Advanced Search & Filtering**
  - Real-time name search with suggestions
  - Category-based filtering (Actors, Scientists, Entrepreneurs, etc.)
  - Quick-select profile buttons
  - Intelligent name matching

- **📝 Rich Bio Editing**
  - Multi-field biography information
  - Inline editing with save/cancel options
  - Occupation, birth date, known for, nationality fields
  - Multi-line biography text area

- **🎨 Category System**
  - Color-coded category tags
  - Icon-based category representation
  - Filter profiles by category
  - Custom category styling

## 🚀 Quick Start

### Prerequisites

- **Node.js** (Version 16 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **Package Manager** (pnpm recommended)
  - Install pnpm: `npm install -g pnpm`
  - Verify installation: `pnpm --version`

### Installation & Setup

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <your-repository-url>
   cd interactive-profile-app
   
   # Or simply extract your project files to a folder
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # or if using npm
   npm install
   # or if using yarn
   yarn install
   ```

3. **Start Development Server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Access the Application**
   - Open your web browser
   - Navigate to: `http://localhost:5173`
   - The app will automatically reload when you make changes

### Building for Production

```bash
# Create production build
pnpm build

# Preview production build locally
pnpm preview

# The built files will be in the 'dist' folder
```

## 📁 Project Structure

```
interactive-profile-app/
├── public/                 # Static assets
│   └── index.html         # HTML template
├── src/
│   ├── components/        # React components
│   │   └── Profile.js     # Main profile component
│   ├── data/             # Data management
│   │   ├── celebrityData.js    # Profile data and utilities
│   │   └── categories.js       # Category definitions
│   ├── App.js            # Main application component
│   ├── App.css           # Application styles
│   ├── index.js          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create optimized production build |
| `pnpm preview` | Locally preview production build |
| `pnpm lint` | Run code linting (if configured) |

## 💾 Data Management

### Local Storage
- Profiles are automatically saved to browser's local storage
- Data persists between browser sessions
- Clear storage using the "Clear Storage" button for testing

### Default Data
- Pre-loaded with sample celebrity profiles
- Categories include: Actors, Scientists, Entrepreneurs, Authors, Other
- Easy to extend with custom profiles

## 🎯 Usage Guide

### Editing Profiles
1. **Select a Profile**: Click any quick-select button or search by name
2. **Edit Fields**: Click "Edit" on any bio field to modify
3. **Save Changes**: Click "Save" or click outside the field to auto-save
4. **Manual Save**: Use the "💾 Save Profile" button for explicit saving

### Creating New Profiles
1. Click "Create New Profile" button
2. Fill in the profile details
3. Use "Save Profile" to persist the new profile

### Image Customization
1. **Change Image URL**: Paste any image URL in the Image URL field
2. **Resize Image**: Use the slider to adjust image size (50px - 200px)
3. **Save Size**: Click "Save Size" to persist image dimensions

## 🔧 Customization

### Adding New Categories
Edit `src/data/categories.js`:
```javascript
export const categories = {
  // ... existing categories
  musician: {
    name: 'Musician',
    icon: '🎵',
    color: '#9C27B0'
  }
};
```

### Extending Profile Data
Modify `src/data/celebrityData.js` to add new fields or profiles.

## 🌐 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# If port 5173 is busy, Vite will suggest another port
# Or specify a different port:
pnpm dev --port 3000
```

**Dependencies Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
pnpm install
```

**Local Storage Issues**
- Use "Clear Storage" button to reset data
- Check browser console for errors

### Getting Help
1. Check browser console for error messages
2. Verify Node.js version meets requirements
3. Ensure all dependencies are properly installed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎉 Acknowledgments

- Icons and avatars provided by [DiceBear](https://dicebear.com/)
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Modern CSS features and responsive design

---

**Happy profiling!** 🚀