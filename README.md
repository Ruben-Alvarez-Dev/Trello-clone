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
  - React Context (`DataContext`) expone `{ lists, setLists, tasks, setTasks }`
  - Persistencia vía `useLocalStorage(key, initialValue)`
- Drag & Drop
  - `react-beautiful-dnd` con `DragDropContext`, `Droppable` (listas/tareas) y `Draggable` (listas/tareas)
  - Reordenación horizontal de listas y vertical de tareas; mover tareas entre listas
- Inicialización
  - `initData()` carga datos de `src/data/data.json` en `localStorage` si no existen

## 🔧 Component Responsibilities

- App
  - Orquesta el estado global, inicializa datos, implementa `onDragEnd`
  - Helpers puros: reordenar listas, reordenar tareas, mover tareas entre listas
- List
  - Renderiza una lista con su título editable y acciones
  - Mapea `list.value` (ids) → tareas y renderiza `Task`
- Task
  - Permite editar el contenido y eliminar la tarea
- AddCardorList
  - Modo `forTask`: crea tareas dentro de una lista
  - Modo `forList`: crea nuevas listas

## 🔄 Drag-and-Drop Flow

1. Usuario arrastra lista o tarea → `onDragEnd(result)` en `App`
2. Si `type === 'list'` → `handleListReorder`
3. Si `type === 'task'`:
   - Misma lista → `handleTaskReorderSameList`
   - Listas distintas → `handleTaskMoveBetweenLists`
4. `setLists` persiste en estado + localStorage

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

## 🧾 Guía de Docstrings (JSDoc)

- Idioma y estilo
  - Escribe los docstrings en inglés (código y docs consistentes).
  - Usa bloques `/** ... */` justo encima de funciones, componentes, hooks y utilidades exportadas.

- Tipos y etiquetas
  - `@typedef` para formas de datos compartidas (usa sufijo `Entity`, p. ej. `ListEntity`, `TaskEntity`).
  - `@namespace` para grupos de constantes (p. ej. `APP_CONFIG`, `UI_STRINGS`, `CSS_CLASSES`).
  - `@module` para archivos que exportan utilidades o constantes (p. ej. `constants/index`).
  - `@param` y `@returns` siempre presentes; usa tipos JSDoc estándar:
    - Arrays: `Array.<string>` o `string[]` (preferimos `Array.<Type>` por compatibilidad).
    - Uniones: `string|number`.
    - Parámetros opcionales: `@param {Type} [name]` y para propiedades anidadas documenta cada una en línea separada.
    - Evita genéricos/TS avanzados: nada de `import('react').Context<>`, `?`, `<>`, `Record<,>`.

- Componentes y hooks
  - Componentes React: documenta `props` con forma clara (p. ej. `@param {{list: ListEntity, index: number}} props`).
  - Hooks: incluye ejemplo de uso y explica el arreglo de retorno (`@returns {Array}`), p. ej. `useLocalStorage`.

- Ejemplos
  - Añade `@example` con un snippet mínimo y realista para cada API pública.

- Organización
  - Coloca `@typedef` compartidos cerca del contexto o en el módulo con mayor relevancia (aquí, `DataContext.jsx`).
  - Evita nombres de tipos que colisionen con componentes (usa sufijo `Entity`).
