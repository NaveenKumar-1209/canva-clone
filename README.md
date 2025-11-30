# SlideCraft - Presentation Builder

A modern, Canva-like presentation builder built with React, Redux, and Lexical. Create stunning presentations with drag-and-drop elements, rich text editing, and real-time formatting.

![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.11.0-764abc?logo=redux)
![Lexical](https://img.shields.io/badge/Lexical-0.38.2-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38bdf8?logo=tailwindcss)

## 🚀 Features

### ✨ Core Functionality
- **Multi-Slide Management** - Create, duplicate, delete, and navigate between slides
- **Drag & Drop Elements** - Position text elements anywhere on the canvas
- **Resize Elements** - 8-point resize handles for precise control
- **Rich Text Editing** - Powered by Meta's Lexical framework
- **Auto-Save** - Automatic saving to MongoDB every 2 seconds
- **Undo/Redo** - Full history support (coming soon)

### 🎨 Text Formatting
- **Bold, Italic, Underline** - Standard text formatting with keyboard shortcuts
- **Font Family** - Choose from 7 professional fonts (Arial, Times New Roman, Courier New, Georgia, Verdana, Inter, Roboto)
- **Font Size** - Adjustable font sizes
- **Text Color** - Full color picker support
- **Real-time Preview** - See changes instantly

### 🏗️ Architecture
- **Component-Based** - Modular, reusable React components
- **Redux State Management** - Centralized state with Redux Toolkit
- **Event-Driven Formatting** - Clean separation between UI and editor logic
- **Plugin Architecture** - Extensible Lexical plugin system
- **JSON Serialization** - Efficient content storage and retrieval

## 📁 Project Structure

```
client/
├── src/
│   ├── features/
│   │   ├── editor/
│   │   │   ├── components/
│   │   │   │   ├── Canvas.jsx              # Main canvas area
│   │   │   │   ├── TextElement.jsx         # Draggable text element
│   │   │   │   ├── LexicalEditorWrapper.jsx # Lexical editor setup
│   │   │   │   └── LexicalFormattingPlugin.jsx # Custom formatting plugin
│   │   │   └── theme.js                    # Lexical theme configuration
│   │   ├── toolbar/
│   │   │   └── components/
│   │   │       ├── Toolbar.jsx             # Top formatting toolbar
│   │   │       └── PropertiesPanel.jsx     # Left properties panel
│   │   └── slides/
│   │       └── components/
│   │           └── SlideList.jsx           # Bottom slide navigation
│   ├── pages/
│   │   ├── Dashboard.jsx                   # Presentation list
│   │   └── Editor.jsx                      # Main editor page
│   ├── store/
│   │   ├── store.js                        # Redux store configuration
│   │   ├── presentationSlice.js            # Presentation state & actions
│   │   └── loggerMiddleware.js             # Development logging
│   └── App.jsx                             # Root component
├── docs/
│   ├── lexical-integration-docs.md         # Lexical technical documentation
│   └── walkthrough.md                      # Feature walkthrough
└── package.json
```

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.9.6** - Client-side routing

### State Management
- **Redux Toolkit 2.11.0** - State management
- **React Redux 9.2.0** - React bindings for Redux

### Rich Text Editor
- **Lexical 0.38.2** - Core editor framework
- **@lexical/react** - React integration
- **@lexical/rich-text** - Rich text support
- **@lexical/history** - Undo/redo functionality
- **@lexical/selection** - Text selection utilities

### Styling
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend Communication
- **Axios 1.13.2** - HTTP client

## 🚦 Getting Started

### Prerequisites
- Node.js 20.15.1 or higher
- npm 10.7.0 or higher
- MongoDB (for backend integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd canva-like-product/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📖 Documentation

### Comprehensive Guides
- **[Lexical Integration Documentation](../docs/lexical-integration-docs.md)** - Complete technical guide on how Lexical is integrated
- **[Feature Walkthrough](../docs/walkthrough.md)** - Step-by-step guide to implemented features

### Quick Links
- [Lexical Official Docs](https://lexical.dev/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

## 🎯 Usage

### Creating a Presentation
1. Click "Create New Presentation" on the dashboard
2. Enter a title and click "Create"

### Adding Text Elements
1. Click the text icon in the toolbar
2. Double-click the element to edit
3. Type your content

### Formatting Text
1. Select text within an element
2. Use toolbar buttons for formatting:
   - **Bold** - Ctrl+B
   - **Italic** - Ctrl+I
   - **Underline** - Ctrl+U
3. Change font family and size from dropdowns
4. Pick text color from color picker

### Moving & Resizing
- **Drag** - Click and drag to move elements
- **Resize** - Use corner/edge handles to resize

### Managing Slides
- **Add Slide** - Click "+" button in slide list
- **Navigate** - Click slide thumbnails
- **Delete** - Click "×" on slide thumbnail

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend API
The app expects a backend API at `http://localhost:5000/api/presentations` with the following endpoints:

- `POST /presentations` - Create new presentation
- `GET /presentations/:id` - Fetch presentation
- `PUT /presentations/:id` - Update presentation

## 🐛 Development

### Logger Middleware
The Redux store includes a comprehensive logger middleware that logs:
- All dispatched actions
- State changes (before/after)
- Performance metrics
- Error tracking

**Note**: Logger is only active in development mode.

### Hot Module Replacement (HMR)
Vite provides instant HMR for:
- React components
- CSS/Tailwind styles
- Redux state (with some limitations)

## 🏗️ Architecture Highlights

### Event-Based Formatting
The toolbar communicates with Lexical editors through custom events:

```javascript
// Toolbar dispatches event
window.dispatchEvent(new CustomEvent('lexical-format-bold', {
  detail: { elementId: 'el-123' }
}));

// Plugin receives and applies formatting
editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
```

### Content Serialization
Text content is stored as Lexical JSON:

```javascript
// Save
const jsonString = JSON.stringify(editorState.toJSON());

// Load
const parsed = editor.parseEditorState(jsonString);
editor.setEditorState(parsed);
```

### Auto-Save
Debounced auto-save prevents excessive API calls:

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    dispatch(savePresentation({ id, title, slides }));
  }, 2000);
  return () => clearTimeout(timer);
}, [slides]);
```

## 🎨 Customization

### Adding New Fonts
Edit `Toolbar.jsx`:

```javascript
<option value="Your Font">Your Font</option>
```

### Custom Theme
Modify `theme.js` to customize Lexical styling:

```javascript
const exampleTheme = {
  text: {
    bold: "editor-text-bold",
    // Add more styles
  }
};
```

### New Formatting Options
1. Add button to `Toolbar.jsx`
2. Create event handler
3. Add listener in `LexicalFormattingPlugin.jsx`
4. Implement Lexical command

## 🚀 Future Enhancements

- [ ] Text alignment (left, center, right, justify)
- [ ] Lists (ordered/unordered)
- [ ] Image elements
- [ ] Shape elements
- [ ] Background customization
- [ ] Export to PDF/PowerPoint
- [ ] Collaborative editing
- [ ] Templates
- [ ] Animations
- [ ] Presenter mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- **Meta** - For creating Lexical
- **Redux Team** - For Redux Toolkit
- **Tailwind Labs** - For TailwindCSS
- **Vite Team** - For the amazing build tool

---

**Built with ❤️ using React, Redux, and Lexical**
