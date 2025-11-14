# SlideForgeAi - Visual Styling Preview

## Page Layouts & Styling Details

### 1. Header Layout
```
┌─────────────────────────────────────────────────────────────┐
│  SlideForgeAi (gradient logo)     Create New    Welcome, User  │
│                                   Presentation   [Logout Button]│
└─────────────────────────────────────────────────────────────┘
```
- **Sticky header** at top with subtle shadow
- **Gradient text** for brand name (navy → teal)
- **Responsive**: Stacks on mobile
- **Color**: White background with light gray bottom border

---

### 2. Login Page
```
                    ┌──────────────────────┐
                    │   Login              │
                    │                      │
                    │ [Username Input]     │
                    │ [Password Input]     │
                    │ [Login Button]  ⭐   │
                    │                      │
                    │ Don't have account?  │
                    │ [Sign up link]       │
                    └──────────────────────┘
```
- **Card design** with shadow and rounded corners
- **Smooth animation** slide-up on load
- **Buttons**: Gradient teal background with hover lift
- **Links**: Teal color with hover underline
- **Error messages**: Red left border with light red background

---

### 3. Gallery Page
```
┌─────────────────────────────────────────────┐
│  Your Presentations    [Create New Button]  │
├─────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Pres 1   │  │ Pres 2   │  │ Pres 3   │   │
│  │ 5 slides │  │ 8 slides │  │ 12 slides│   │
│  │ [Open]   │  │ [Open]   │  │ [Open]   │   │
│  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐                  │
│  │ Pres 4   │  │ Pres 5   │                  │
│  │ 6 slides │  │ 10 slides│                  │
│  │ [Open]   │  │ [Open]   │                  │
│  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────┘
```
- **Responsive grid**: Auto-fills with 280px minimum width
- **Cards**: White background with light border
- **Hover effect**: 
  - Animated gradient top border (4px)
  - Lift animation (translateY -4px)
  - Enhanced shadow effect
  - Border turns teal
- **Text**: Bold titles, muted subtitle text
- **Buttons**: Teal background with lift on hover

---

### 4. Create Page
```
┌──────────────────────────────────┬──────────────────────────────┐
│ Input                            │ Images & Theme               │
├──────────────────────────────────┼──────────────────────────────┤
│ ○ AI generate                    │ ○ AI generated images        │
│ ○ Write manually                 │ ○ Search from web            │
│ ○ Upload file                    │ ○ No images (themes)         │
│                                  │                              │
│ [Title Input Field]              │ [Company website input]       │
│ [Details Textarea]               │ [Logo URL input]             │
│                                  │                              │
│ Slides: 5 [─────●────────] 15    │                              │
│                                  │                              │
│                    [Generate Button]                            │
└──────────────────────────────────┴──────────────────────────────┘
```
- **Two-column grid layout**: Responsive stacks on smaller screens
- **Cards**: Light gray background with subtle border
- **Inputs**: 2px border, focus state with teal border and glow
- **Radio buttons**: Styled with accent color
- **Range slider**: Teal accent color
- **Generate button**: Full-width gradient button with hover effect

---

### 5. Editor Page
```
┌─────────────────────────────────────────────────────────────┐
│ [← Back]  Presentation Title  [Undo][Redo] [Save][Export]  │
├──────────────┬────────────────────────────┬─────────────────┤
│  Slides      │     Slide Preview          │  Customize      │
│              │                            │                 │
│ ┌──────────┐ │  ┌──────────────────────┐ │ Font Size       │
│ │Slide 1   │ │  │ Title Here           │ │ [────●────]     │
│ │ ↑ ↓ ✕    │ │  │                      │ │                 │
│ ├──────────┤ │  │ Content text area    │ │ Font Color      │
│ │Slide 2   │ │  │                      │ │ [Color Picker]  │
│ │(active)  │ │  │                      │ │                 │
│ │ ↑ ↓ ✕    │ │  └──────────────────────┘ │ Background      │
│ ├──────────┤ │                            │ ○ Gradient      │
│ │Slide 3   │ │                            │ ○ Image         │
│ │ ↑ ↓ ✕    │ │                            │                 │
│ │          │ │                            │ [Upload Image]  │
│ │ [+ Add]  │ │                            │ Blur: [──●──]   │
│ └──────────┘ │                            │                 │
│              │                            │ [Regenerate]    │
├──────────────┴────────────────────────────┴─────────────────┤
```
- **Three-column layout**:
  - **Left**: Slides list (280px wide)
  - **Center**: Slide canvas (flexible)
  - **Right**: Customizer panel (320px wide)
- **Slides panel**:
  - Light gray background
  - Scroll area with custom scrollbar
  - Hover: Light teal background
  - Active: Teal left border with light background
  - Controls: Small buttons with hover effects
- **Canvas**:
  - Gradient background (white to light gray)
  - Editable content (focus state with teal highlight)
  - Responsive text sizing
- **Customizer**:
  - Light gray background
  - Input controls with proper spacing
  - Range sliders with accent color
  - Full-width buttons

---

## Color Usage

### Text Colors
- **Headings**: `#1e293b` (Dark text)
- **Body text**: `#64748b` (Muted text)
- **Secondary text**: `#94a3b8` (Light text)
- **Links**: `#0ea5a4` (Teal)

### Background Colors
- **Main background**: `#ffffff` (White)
- **Section backgrounds**: `#f8fafc` (Light gray)
- **Card backgrounds**: `#ffffff` (White)
- **Input backgrounds**: `#ffffff` (White)
- **Focus backgrounds**: `#e0f2fe` (Light teal)

### Border Colors
- **Subtle borders**: `#e2e8f0` (Light gray)
- **Active borders**: `#0ea5a4` (Teal)
- **Error borders**: `#ef4444` (Red)

### Shadow Depths
- **Subtle (sm)**: `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Medium (md)**: `0 4px 6px rgba(0, 0, 0, 0.1)` - Default cards
- **Large (lg)**: `0 10px 15px rgba(0, 0, 0, 0.1)` - Hover states
- **XL**: `0 20px 25px rgba(0, 0, 0, 0.1)` - Modals

---

## Animations

### Smooth Transitions (0.3s)
- Button hover effects
- Card hover effects
- Border transitions
- Color transitions
- All interactive elements

### Page Animations
- **FadeIn**: Subtle fade on page load
- **SlideUp**: Cards/modals slide up with fade
- **SlideDown**: Dropdowns slide down

### Hover Effects
- **Buttons**: Lift up 2px with enhanced shadow
- **Cards**: Lift up 4px, gradient border appears
- **Links**: Color change with underline
- **Inputs**: Border color change, subtle glow

---

## Responsive Behavior

### Desktop (>1200px)
- Three-column editor layout
- Full-width components
- 32px padding
- Normal font sizes

### Tablet (768px - 1200px)
- Two-column on some pages
- Stacked editor layout
- 24px padding
- Slightly reduced font sizes

### Mobile (<768px)
- Single column layout
- Stacked editor components
- 16px padding
- Larger touch targets (minimum 44px)
- Optimized spacing

---

## Accessibility Features

1. **Color Contrast**: WCAG AA compliant
2. **Focus States**: Visible focus indicators
3. **Touch Targets**: Minimum 44px height
4. **Semantic HTML**: Proper heading hierarchy
5. **Readable Text**: 16px minimum on mobile
6. **Proper Labels**: All inputs have associated labels

---

## Typography

### Font Stack
```css
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
```

### Font Sizes
- **Headings**: 24px - 32px (bold/semibold)
- **Body**: 14px - 16px (regular)
- **Labels**: 12px - 14px (bold, uppercase)
- **Secondary**: 13px - 14px (muted)

### Font Weights
- **Headings**: 700 (bold)
- **Labels**: 600 (semibold)
- **Regular text**: 400
- **Active states**: 600 (semibold)

---

## Special Effects

### Gradient Buttons
```css
background: linear-gradient(135deg, #0ea5a4 0%, #06b6d4 100%);
```

### Gradient Text (Brand)
```css
background: linear-gradient(135deg, #0f172a 0%, #0ea5a4 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Card Border Animation
```css
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #0ea5a4 0%, #06b6d4 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
```

---

This styling provides a professional, modern look with smooth interactions and responsive design across all devices.
