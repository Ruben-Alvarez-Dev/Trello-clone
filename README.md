# 🚀 Trello Clone App

A modern, responsive Trello clone built with React and Vite. Features drag-and-drop functionality for managing tasks and lists with localStorage persistence.

![Trello Clone Demo](src/assets/Trello-clone.gif)

## ✨ Features

- 🖱️ Drag & Drop: move tasks between lists and reorder them
- 💾 Auto-save: automatic persistence using localStorage
- 🧩 CRUD operations: add, edit, and delete tasks and lists
- 📱 Responsive design: desktop and mobile friendly
- ⚡ Fast performance: Vite-powered workflow
- 🧠 Clean architecture: custom hooks and modular components

## 🧰 Tech Stack

- Frontend: React 18, JSX
- Build tool: Vite
- Drag & Drop: react-beautiful-dnd
- Styling: CSS3, BEM methodology
- State management: React Context API + custom hooks
- Storage: localStorage with error handling
- Icons: SVG assets

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Ruben-Alvarez-Dev/project_trello-clon.git

# Navigate to project directory
cd project_trello-clon

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173`.

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Auto-commit (custom script)
npm run commit
```

## 🗂️ Project Structure

```
src/
  app/                 # Main application component
  components/          # Reusable React components
  hooks/               # Custom React hooks
  contexts/            # React Context providers
  constants/           # Application constants
  helper/              # Utility functions
  data/                # Initial data configuration
  assets/              # Static assets (icons, images)
```

## 🧭 How to Use

1. Add lists: click "Add a list" to create columns
2. Add tasks: click "Add a task" within any list
3. Drag & drop:
   - Drag tasks between lists to change status
   - Reorder tasks within the same list
   - Reorder lists horizontally
4. Edit: double-click on any task or list title
5. Delete: click the trash icon on tasks or lists

## 🏗️ Architecture Highlights

### Custom Hooks
- `useLocalStorage`: localStorage synchronization with error handling

### Clean Code Principles
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Separation of concerns between components
- Centralized constants management

### Performance Optimizations
- Efficient drag-and-drop handling
- Minimal re-renders with proper state management
- Lazy loading where applicable

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The build files are generated in the `dist/` directory.

### Deploy to Static Hosting
Can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any shared hosting with static file support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention
This project follows conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `refactor:` code refactoring
- `docs:` documentation changes
- `style:` formatting changes

## 📄 License

This project is open source under the [MIT License](LICENSE).

## 👤 Author

**Ruben Alvarez Dev**
- GitHub: [@Ruben-Alvarez-Dev](https://github.com/Ruben-Alvarez-Dev)
- Email: ruben.alvarez.dev@gmail.com

## 🙏 Acknowledgments

- React Beautiful DND for drag-and-drop functionality
- Vite for the excellent development experience
- React team for the amazing framework

---

If you found this project helpful, please give it a star!

## 🧱 Architecture Overview

- Data model
  - List: `{ id: string, title: string, value: string[] }` where `value` holds task ids
  - Task: `{ id: string, value: string }`
- State management
  - React Context (`DataContext`) exposes `{ lists, setLists, tasks, setTasks }`
  - Persistence via `useLocalStorage(key, initialValue)`
- Drag & Drop
  - `react-beautiful-dnd` with `DragDropContext`, `Droppable` (lists/tasks) and `Draggable` (lists/tasks)
  - Horizontal list reordering and vertical task reordering; move tasks between lists
- Initialization
  - `initData()` seeds from `src/data/data.json` into `localStorage` when missing

## 🔧 Component Responsibilities

- App
  - Orchestrates global state, initializes data, implements `onDragEnd`
  - Pure helpers: reorder lists, reorder tasks, move tasks between lists
- List
  - Renders a list with editable title and actions
  - Maps `list.value` (ids) → tasks and renders `Task`
- Task
  - Edits content and removes a task
- AddCardorList
  - `forTask`: create tasks inside a list
  - `forList`: create new lists

## 🔄 Drag-and-Drop Flow

1. User drags a list or task → `onDragEnd(result)` in `App`
2. If `type === 'list'` → `handleListReorder`
3. If `type === 'task'`:
   - Same list → `handleTaskReorderSameList`
   - Different lists → `handleTaskMoveBetweenLists`
4. `setLists` persists state + localStorage

## 🧪 Usage Examples

```jsx
// Add a list input
<AddCardorList type="forList" />

// Add a task input inside a list
<AddCardorList type="forTask" list={{ id: 'list-1', title: 'To Do', value: [] }} />

// Render a list
<List list={{ id: 'list-1', title: 'To Do', value: ['t1'] }} index={0} />

// Render a task
<Task task={{ id: 't1', value: 'Buy milk' }} index={0} />

// Persisted state
const [items, setItems] = useLocalStorage('items', []);
```

<!-- Internal contributor guidance intentionally removed from public README -->
