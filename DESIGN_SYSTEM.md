# Custom Color Palette Design Guide

## Color Palette Overview

Our application uses a carefully curated 4-color palette that creates a cohesive, warm, and professional user interface:

### Base Colors
- **Cream** (`#F5EFE6`) - Primary background, warm and inviting
- **Beige** (`#E8DFCA`) - Secondary backgrounds, sophisticated neutral
- **Blue** (`#6D94C5`) - Brand primary, CTAs and emphasis
- **Sky** (`#CBDCEB`) - Accent color, subtle highlights and hover states

## Color Usage Strategy

### 1. **Cream Palette** - Foundation & Warmth
- **Primary Use**: Main backgrounds, containers, cards
- **Character**: Warm, welcoming, clean
- **Examples**:
  - `bg-cream-50` - Almost white backgrounds
  - `bg-cream-200` - Main page backgrounds
  - `bg-cream-100` - Input field backgrounds
  - `text-cream-50` - Light text on dark backgrounds

### 2. **Beige Palette** - Structure & Sophistication  
- **Primary Use**: Secondary backgrounds, borders, body text
- **Character**: Sophisticated, neutral, readable
- **Examples**:
  - `bg-beige-200` - Secondary containers
  - `border-beige-300` - Subtle borders
  - `text-beige-800` - Body text
  - `hover:bg-beige-300` - Subtle hover states

### 3. **Blue Palette** - Brand & Action
- **Primary Use**: CTAs, headings, links, brand elements
- **Character**: Trustworthy, professional, actionable
- **Examples**:
  - `bg-blue-500` - Primary buttons
  - `text-blue-900` - Headings and important text
  - `border-blue-400` - Focus states
  - `hover:bg-blue-600` - Button hover states

### 4. **Sky Palette** - Accent & Subtlety
- **Primary Use**: Hover states, subtle accents, secondary actions
- **Character**: Light, airy, gentle emphasis
- **Examples**:
  - `bg-sky-200` - Hover backgrounds
  - `border-sky-300` - Accent borders
  - `bg-sky-100` - Featured content highlights
  - `hover:bg-sky-300` - Interactive element hovers

## Visual Hierarchy & Contrast

### Text Hierarchy
1. **Primary Headings**: `text-blue-900` - Maximum contrast and importance
2. **Secondary Text**: `text-beige-800` - Good readability, less emphasis
3. **Muted Text**: `text-beige-700` - Subtle information
4. **Links/Actions**: `text-blue-600` with `hover:text-blue-700`

### Background Hierarchy
1. **Main Background**: `bg-cream-200` - Primary workspace
2. **Content Areas**: `bg-cream-50` - Content containers
3. **Secondary Areas**: `bg-beige-200` - Less important sections
4. **Highlights**: `bg-sky-200` - Special or featured content

### Interactive States
- **Default**: Base colors from the palette
- **Hover**: Slightly darker shade (+100 in scale)
- **Focus**: Blue tones with ring effects
- **Active/Selected**: Blue backgrounds with light text
- **Disabled**: Reduced opacity (50%) of base colors

## Component Examples

### Buttons
```jsx
// Primary action
<Button className="bg-blue-500 text-cream-50 hover:bg-blue-600">

// Secondary action  
<Button className="bg-beige-200 text-blue-800 hover:bg-beige-300">

// Subtle action
<Button className="bg-sky-200 text-blue-700 hover:bg-sky-300">

// Outline style
<Button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50">
```

### Cards & Containers
```jsx
// Standard card
<div className="bg-cream-50 border border-beige-300 rounded-xl">

// Featured card
<div className="bg-gradient-to-br from-blue-50 to-sky-100 border-2 border-blue-300">

// Secondary container
<div className="bg-beige-200 border border-beige-400">
```

### Form Elements
```jsx
// Input fields
<input className="bg-cream-100 border-2 border-beige-300 focus:border-blue-400 text-blue-900">

// Select elements
<select className="bg-cream-100 border-2 border-beige-300 focus:border-blue-400">
```

## Design Principles

### 1. **Warmth Over Starkness**
- Avoid pure white (`#FFFFFF`) - use `cream-50` instead
- Avoid pure black (`#000000`) - use `blue-900` instead
- Creates a more inviting, less clinical feeling

### 2. **Subtle Gradients**
- Use gentle gradients between similar tones
- `from-cream-200 to-beige-200` for navbar
- `from-blue-50 to-sky-100` for featured content

### 3. **Progressive Enhancement**
- Base state should always be accessible and clear
- Hover states add subtle improvements (+100 on color scale)
- Focus states use blue tones for consistency

### 4. **Contextual Color Usage**
- **Success states**: Use sky tones (`bg-sky-200`)
- **Warning states**: Use beige tones (`bg-beige-300`)
- **Information**: Use blue tones (`bg-blue-100`)
- **Errors**: Use darker blue with cream text for contrast

## Accessibility Considerations

### Contrast Ratios
- **Primary text** (`blue-900` on `cream-200`): High contrast ✓
- **Secondary text** (`beige-800` on `cream-50`): Good contrast ✓
- **Button text** (`cream-50` on `blue-500`): High contrast ✓

### Color Blindness
- Uses distinct lightness values across colors
- Text relies on contrast, not just color
- Interactive elements have multiple visual cues (borders, shadows, etc.)

## Implementation Notes

### Semantic Color Classes
The config includes semantic aliases for easier use:
- `text-primary` = `text-blue-900`
- `text-secondary` = `text-beige-800`
- `bg-primary` = `bg-cream-200`
- `bg-accent` = `bg-sky-200`

### Gradients
Preferred gradient combinations:
- `from-cream-200 to-beige-200` - Warm navigation
- `from-blue-50 to-sky-100` - Cool highlights
- `from-cream-100 to-beige-100` - Subtle sections

This color system creates a cohesive, warm, and professional interface while maintaining excellent readability and accessibility standards.