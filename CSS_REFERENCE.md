# CSS Quick Reference

## Colors (Use via CSS Variables)

```css
--bg-white: #ffffff          /* Main background */
--bg-light: #f8fafc          /* Light backgrounds */
--bg-lighter: #f1f5f9        /* Lighter backgrounds */
--border-light: #e2e8f0      /* Subtle borders */
--border-med: #cbd5e1        /* Standard borders */
--text-dark: #1e293b         /* Dark text */
--text-muted: #64748b        /* Secondary text */
--text-light: #94a3b8        /* Light text */
--brand-primary: #0f172a     /* Dark navy */
--brand-accent: #0ea5a4      /* Teal accent */
--accent-teal: #06b6d4       /* Cyan accent */
--success: #10b981           /* Green */
--warning: #f59e0b           /* Amber */
--error: #ef4444             /* Red */
```

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)      /* Subtle */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)       /* Default */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)     /* Hover */
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)     /* Modal */
```

## Transitions

```css
--transition: all 0.3s ease   /* Use for all smooth effects */
```

## Spacing System (Multiples of 8px)

```css
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mt-4 { margin-top: 32px; }
/* Similar for mb, px, py */
```

## Flexbox Utilities

```css
.flex               /* display: flex */
.flex-col           /* flex-direction: column */
.flex-center        /* center items & justify */
.flex-between       /* space-between */
.gap-1, .gap-2, .gap-3   /* gap between items */
```

## Common Patterns

### Button
```jsx
<button className="btn">Click Me</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-danger">Delete</button>
```

### Card
```jsx
<div className="card">
  <h3>Title</h3>
  <p>Content here</p>
  <button className="btn">Action</button>
</div>
```

### Input
```jsx
<label>Label Text</label>
<input type="text" placeholder="Placeholder" />
```

### Responsive Grid
```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '24px'
}}>
  {/* Items here */}
</div>
```

## Animations

```css
@keyframes fadeIn { /* Fade in from transparent */ }
@keyframes slideUp { /* Slide up from below */ }
@keyframes slideDown { /* Slide down from above */ }
@keyframes slideInLeft { /* Slide in from left */ }
@keyframes slideInRight { /* Slide in from right */ }
@keyframes pulse { /* Pulse opacity */ }
@keyframes bounce { /* Bounce up */ }
@keyframes spin { /* Continuous rotation */ }
```

## Media Queries

```css
/* Desktop: > 1200px (default) */

/* Tablet: 768px - 1200px */
@media (max-width: 1200px) { }

/* Mobile: < 768px */
@media (max-width: 768px) { }
```

## Typography Hierarchy

```css
h1, h2, h3 { font-weight: 700; }    /* Bold headings */
label { font-weight: 600; }          /* Bold labels */
body { font-weight: 400; }           /* Regular text */
.text-muted { color: var(--text-muted); }
.text-light { color: var(--text-light); }
```

## Component Classes

```
.app-header         Header with sticky positioning
.container          Main content container
.auth-box           Login/signup card
.gallery            Gallery section
.gallery-header     Gallery title + button row
.gallery .grid      Responsive grid of cards
.card               Reusable card component
.create-page        Create presentation page
.form-grid          Form with grid layout
.editor             Editor main container
.editor-top         Top bar with controls
.editor-body        Three-column layout
.slides-list        Left panel with slides
.slide-item         Individual slide in list
.slide-canvas       Center preview area
.customizer         Right sidebar
```

## Form Styling

```css
/* Focus state */
input:focus {
  border-color: var(--brand-accent);
  box-shadow: 0 0 0 3px rgba(14, 165, 164, 0.1);
}

/* Input container */
<div>
  <label>Input Label</label>
  <input type="text" />
</div>
```

## Loading State

```jsx
<div className="spinner"></div>
<div className="spinner-sm"></div>
<div className="spinner-lg"></div>
```

## Badges & Status

```jsx
<span className="badge">Default</span>
<span className="badge badge-accent">Accent</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-error">Error</span>
```

## Text Utilities

```css
.text-center    /* text-align: center */
.text-right     /* text-align: right */
.text-left      /* text-align: left */
.text-muted     /* color: var(--text-muted) */
.text-accent    /* color: var(--brand-accent) */
```

## Border & Corners

```css
.border         /* 1px solid var(--border-light) */
.border-accent  /* 2px solid var(--brand-accent) */
.rounded        /* border-radius: 8px */
.rounded-lg     /* border-radius: 12px */
```

## Shadows

```css
.shadow         /* box-shadow: var(--shadow-md) */
.shadow-lg      /* box-shadow: var(--shadow-lg) */
```

## Opacity

```css
.opacity-50     /* opacity: 0.5 */
.opacity-75     /* opacity: 0.75 */
```

## Pro Tips

1. **Always use CSS variables** for colors - makes theming easy
2. **Use flexbox/grid** for layouts - better than float/position
3. **Apply consistent spacing** - stick to 8px multiples
4. **Add transitions** to interactive elements
5. **Test responsiveness** at 768px and 1200px breakpoints
6. **Use semantic HTML** for better accessibility
7. **Optimize for touch** on mobile (minimum 44px targets)
8. **Keep z-index low** unless necessary (max 9999 for modals)

## File Organization

```
frontend/src/
├── index.css          /* Main styles (550+ lines) */
├── globals.css        /* Utilities & animations (450+ lines) */
├── components/
│   ├── Header.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Gallery.tsx
│   ├── Create.tsx
│   ├── Editor.tsx
│   └── /* Each component uses classes from CSS files */
└── services/
    └── api.ts
```

## Imports in Components

```tsx
// All styling is global via index.css and globals.css
// No need for individual CSS files per component
import React from 'react'

export default function MyComponent() {
  return <div className="card">Content</div>
}
```

---

**Last Updated**: November 14, 2025
**Version**: 1.0
**Total CSS Lines**: 1000+
**Maintainability**: High (CSS variables + utility classes)
