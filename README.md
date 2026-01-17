# Aaditya Gunjal - Portfolio Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Design-00D4FF?style=for-the-badge&logo=css3&logoColor=white)
![Ionicons](https://img.shields.io/badge/Ionicons-5.x-3880FF?style=for-the-badge&logo=ionic&logoColor=white)

A modern, elegant, and fully responsive personal portfolio website showcasing professional skills, achievements, and contact information. Built with vanilla HTML5, CSS3, and JavaScript featuring advanced animations, interactive elements, and a stunning dark theme design.

**Developer:** Aaditya Gunjal - Full Stack Developer

## Core Features

**Hero Section with Typewriter Effect** - Eye-catching landing area with an animated typewriter effect that cycles through personalized introduction text, creating an engaging first impression.

**Interactive Tilt Effect** - Smooth 3D perspective tilt animations on images that respond to mouse movements, providing depth and interactivity to visual elements.

**Custom Cursor System** - Dual-layer custom cursor with dot and outline elements that transform on hover states, enhancing the premium feel of user interactions.

**Tabbed Content Interface** - Dynamic content switching system with smooth fade animations for About Me, Skillsets, and Achievements sections.

**Professional Services Showcase** - Animated service cards with hover effects revealing service titles through elegant opacity transitions.

**Skill Progress Bars** - Visual representation of technical proficiencies with animated progress bars for intuitive skill level communication.

**Contact Form Integration** - Fully functional contact form powered by Web3Forms API with real-time submission capabilities.

**Embedded Google Maps** - Interactive location display with grayscale styling to maintain design consistency.

**Smooth Scroll Navigation** - Seamless page navigation with scroll-based header transformations and sticky positioning.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Latest | Semantic markup structure with accessibility features |
| CSS3 | Latest | Advanced styling with custom properties, animations, and responsive design |
| JavaScript | ES6+ | Interactive functionality with DOM manipulation and event handling |
| Google Fonts | Roboto | Modern sans-serif typography for optimal readability |
| Recoleta Font | Custom | Elegant serif display font for headings and titles |
| Ionicons | 5.5.2 | Comprehensive icon library for UI elements |
| Web3Forms | API | Serverless contact form submission handling |

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/aaditya09750/Aaditya-Portfolio.git
cd Aaditya-Portfolio

# Open directly in browser
# Simply open index.html in your preferred browser
```

### Deployment

```bash
# Deploy to any static hosting service
# Compatible with: Netlify, Vercel, GitHub Pages, Firebase Hosting

# For GitHub Pages
# Push to repository and enable GitHub Pages in settings
```

## Design System

### Color Palette

| Color Variable | HSL Value | Usage |
|----------------|-----------|-------|
| `--bg-black` | hsla(0, 0%, 0%, 1) | Primary background |
| `--bg-smoky-black` | hsla(0, 0%, 6%, 1) | Secondary backgrounds |
| `--bg-eerie-black` | hsla(0, 0%, 13%, 1) | Borders, cards |
| `--bg-jet` | hsla(0, 0%, 18%, 1) | Elevated surfaces |
| `--bg-white` | hsla(0, 0%, 100%, 1) | Accents, text |
| `--text-light-gray` | hsla(240, 1%, 83%, 1) | Body text |

### Typography Scale

```css
--fontSize-1: 4.6rem;   /* Hero headlines */
--fontSize-2: 4.5rem;   /* Section titles */
--fontSize-3: 4rem;     /* Major headings */
--fontSize-4: 3rem;     /* Subsection titles */
--fontSize-5: 2.4rem;   /* Card titles */
--fontSize-6: 1.8rem;   /* Navigation, tabs */
--fontSize-7: 2rem;     /* Medium emphasis */
--fontSize-8: 1.6rem;   /* Body text */
--fontSize-9: 1.5rem;   /* Buttons */
--fontSize-10: 1.4rem;  /* Small text, labels */
```

### Font Families

**Recoleta** - Display serif font for headings and titles, providing elegant personality
**Roboto** - Clean sans-serif for body text, ensuring optimal readability

## Website Sections

### Header & Navigation
- Fixed position header with scroll-triggered styling changes
- Mobile-responsive hamburger menu with smooth slide-in animation
- Navigation links with hover effects and smooth scroll behavior
- Call-to-action button for direct contact access

### Hero Section
- Full-width introduction with animated typewriter text effect
- 3D tilt-enabled profile image with gradient overlay
- Downloadable CV button with icon integration
- Decorative shape elements for visual depth

### Services Section
- Four service cards: Web Development, Project Management, Graphic Designing, Database Management
- Animated hover effects with icon-to-title transitions
- Responsive grid layout adapting from 1 to 4 columns

### About Section (Tabbed Interface)
**About Me Tab**
- Professional biography with personal details
- Social media links (WhatsApp, Instagram, LinkedIn)
- Contact information display

**Skillsets Tab**
- Technical skills with visual progress bars
- Database Management (55%), Web Development (75%)
- Graphic Designing (95%), Data Analysis (45%)
- Mobile App Development (35%)

**Achievements Tab**
- Certificate gallery with tilt effects
- Responsive grid layout for credentials

### Call to Action
- Prominent section encouraging collaboration
- "Hire Me Now" button with hover animations

### Testimonials Section
- Client review with quotation styling
- Profile card with client image and details
- Professional endorsement from Yash Santosh Hule (BM25 Founder)

### Contact Section
- Functional contact form with validation
- Embedded Google Maps location
- Contact details: Phone, Address, Email
- Web3Forms API integration for submissions

### Footer
- Copyright information
- Back to top button with smooth scroll

## Responsive Breakpoints

| Breakpoint | Target Devices | Key Changes |
|------------|----------------|-------------|
| < 575px | Mobile phones | Single column, simplified navigation |
| ≥ 575px | Large phones | Two-column service grid, profile cards |
| ≥ 768px | Tablets | Hero grid layout, expanded typography |
| ≥ 992px | Desktops | Full navigation bar, custom cursor enabled |
| ≥ 1200px | Large screens | Enhanced spacing, larger typography |
| ≥ 1400px | Extra large | Maximum content width, optimized layout |

## Animation Library

### CSS Animations

**Preloader Animation**
```css
@keyframes loading { 0% → 100%: scaleY(0) → scaleY(0.3) }
@keyframes loaded { 0% → 100%: scaleY(0.3) → scaleY(1), opacity: 0 }
```

**Header Slide-In**
```css
@keyframes slideIn { 0% → 100%: translateY(-100%), opacity: 0 → translateY(0), opacity: 1 }
```

**Content Fade**
```css
@keyframes fade { 0% → 100%: opacity: 0 → opacity: 1 }
```

**Cursor Blink**
```css
@keyframes blink { 0%-50%: opacity: 1, 51%-100%: opacity: 0 }
```

### CSS Transitions

**Standard Transitions**
```css
--transition-1: 0.25s ease;      /* Quick interactions */
--transition-2: 0.5s ease;       /* Medium animations */
--transition-3: 1000ms cubic-bezier(0.03, 0.98, 0.52, 0.99); /* Tilt effect */
```

## Customization Guide

### Updating Personal Information

1. **Edit index.html** - Update name, title, contact details, social links
2. **Replace images** - Add your photos in `assets/images/`
3. **Modify skills** - Adjust progress bar percentages in skill section
4. **Update certificates** - Replace certificate images in achievements

### Styling Modifications

```css
/* Modify CSS custom properties in style.css */
:root {
  /* Change primary colors */
  --bg-black: /* your color */;
  --bg-white: /* your accent */;
  
  /* Adjust typography */
  --fontSize-1: /* your size */;
  
  /* Modify spacing */
  --section-spacing: /* your value */;
}
```

### Contact Form Configuration

```html
<!-- Update Web3Forms access key -->
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
```

## Browser Compatibility

![Chrome](https://img.shields.io/badge/Chrome-90+-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Firefox](https://img.shields.io/badge/Firefox-88+-FF7139?style=flat-square&logo=firefox&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-14+-000000?style=flat-square&logo=safari&logoColor=white)
![Edge](https://img.shields.io/badge/Edge-90+-0078D7?style=flat-square&logo=microsoftedge&logoColor=white)

**Full Support** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
**Custom Cursor** - Desktop browsers only (disabled on mobile)
**Tilt Effects** - Mouse-enabled devices
**Progressive Enhancement** - Core functionality preserved on older browsers

## Performance Features

**Optimized Loading**
- Preloaded critical images for faster LCP
- Font preconnect hints for Google Fonts
- Lazy loading for below-fold images

**Efficient CSS**
- CSS custom properties for theme consistency
- Minimal specificity for maintainability
- Hardware-accelerated animations using transform

**Clean JavaScript**
- Event delegation for efficient handlers
- Minimal DOM queries with cached selectors
- No external framework dependencies

## Contact & Support

![Email](https://img.shields.io/badge/Email-aadigunjal0975%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)
![LinkedIn](https://img.shields.io/badge/LinkedIn-aadityagunjal0975-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

**Get In Touch**

- **Email:** [aadigunjal0975@gmail.com](mailto:aadigunjal0975@gmail.com)
- **Phone:** +91 84335 09521
- **LinkedIn:** [aadityagunjal0975](https://www.linkedin.com/in/aadityagunjal0975/)
- **Location:** Dombivli, Maharashtra, India

**Professional Inquiries Welcome** - Open to freelance projects, collaboration opportunities, and full-time positions.

## License

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=opensourceinitiative&logoColor=white)

```
MIT License

Copyright (c) 2024 Aaditya Gunjal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

**Aaditya Gunjal Portfolio** - A showcase of modern web development skills combining elegant design with performant implementation. This project demonstrates proficiency in semantic HTML5, advanced CSS3 techniques, and vanilla JavaScript development for creating engaging, responsive user experiences.

**Star this repository** if you found it helpful!
