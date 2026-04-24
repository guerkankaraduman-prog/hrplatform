# TaskMaster - To-Do List Application

## 📋 Features

✅ **Task Management**
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Priority levels (High, Medium, Low)
- Due dates
- Categories/Tags

✅ **Local Storage**
- All tasks saved in browser's local storage
- Data persists across sessions
- Export tasks to JSON
- No server required

✅ **Filtering & Search**
- Filter by: All, Active, Completed
- Filter by priority level
- Search tasks by title or category

✅ **Sorting**
- Sort by date (newest first)
- Sort by priority

✅ **Statistics**
- Total tasks count
- Active tasks count
- Completed tasks count

✅ **User Experience**
- Dark/Light mode toggle
- Responsive design (mobile-friendly)
- Smooth animations
- Accessibility features
- Progressive Web App (PWA)

✅ **Advanced Features**
- Export tasks to JSON
- Clear all completed tasks
- Overdue task indicators
- Keyboard shortcuts support

## 🚀 Getting Started

### Installation

1. Download or clone the files
2. Open `index.html` in your browser
3. Start adding tasks!

### Local Development

For better experience with PWA features:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

Then visit `http://localhost:8000`

## 📁 File Structure

```
todo-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styles (responsive, dark mode)
├── script.js           # JavaScript logic & DOM manipulation
├── sw.js               # Service Worker (PWA)
├── manifest.json       # PWA manifest
└── README.md           # This file
```

## 🛠️ How It Works

### Local Storage

All tasks are stored in the browser's localStorage under the key `tasks`.

```javascript
// Tasks are stored as JSON array
{
  "id": 1234567890,
  "title": "Buy groceries",
  "priority": "high",
  "dueDate": "2024-04-30",
  "category": "Shopping",
  "completed": false,
  "createdAt": "2024-04-24T10:30:00Z"
}
```

### Data Persistence

- Tasks are automatically saved after each action
- Data persists even after closing the browser
- Clear browser cache/local storage to reset

## 🎨 Customization

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #0066ff;      /* Main blue */
    --priority-high: #ef4444;      /* Red */
    --priority-medium: #f59e0b;    /* Orange */
    --priority-low: #10b981;       /* Green */
}
```

### Change Theme

The app supports light and dark mode. Users can toggle with the 🌙 button.

## 📱 Progressive Web App (PWA)

The app can be installed on desktop and mobile:

1. Click the install button in your browser
2. Or use "Add to Home Screen" on mobile
3. Runs offline with cached data

## 🔒 Privacy

- All data stored locally in your browser
- No data sent to any server
- No tracking or analytics
- You have full control of your data

## 📊 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Tasks not saving?
- Check if local storage is enabled
- Clear browser cache and reload
- Try a different browser

### PWA not installing?
- Use HTTPS (if deploying online)
- Check browser requirements
- Try adding to home screen manually

### Dark mode not working?
- Clear local storage
- Check browser supports CSS variables
- Try toggling theme on/off

## 📝 Keyboard Shortcuts

- `Enter` - Submit task
- `Ctrl+K` - Focus search (future feature)
- `Escape` - Close modal

## 🚀 Deployment

### GitHub Pages

1. Push files to GitHub
2. Enable GitHub Pages in settings
3. Site will be live at `https://username.github.io/repo`

### Netlify

1. Drag and drop folder to Netlify
2. Deploy automatically
3. Custom domain support

### Vercel

1. Connect GitHub repo
2. Auto-deploy on push
3. Free hosting included

## 📄 License

MIT License - Feel free to use and modify

## 🙌 Contributing

Improvements and feedback welcome!

## 📧 Support

For issues or feature requests, create an issue on GitHub.

---

**Built with ❤️ using vanilla JavaScript**