# Tech Context - Vidana Electric Website

## Technology Stack

### Frontend Framework
- **React 18**: Modern React with TypeScript for type safety and better development experience
- **TypeScript**: Ensures code quality and catches errors at compile time
- **Vite**: Fast build tool with excellent development experience and hot module replacement

### Reference Implementation
- **Base**: TechWaveHomeSolutions project structure at `C:\Sandboxes\TechWaveHomeSolutions`
- **Package Configuration**: Standard React 18 + TypeScript + Vite setup
- **Development Server**: Vite dev server running on port 3000

### Build Tools & Development
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

### Dependencies
#### Core Dependencies
- `react: ^18.2.0` - UI library
- `react-dom: ^18.2.0` - DOM rendering

#### Animation & Scroll Libraries
- `framer-motion: ^10.16.0` - Production-ready motion library for React
- `react-intersection-observer: ^9.5.0` - React wrapper for Intersection Observer API
- `lenis: ^1.0.0` - Smooth scroll library (alternative: react-spring)

#### Development Dependencies
- `typescript: ^5.2.2` - Type system
- `@vitejs/plugin-react: ^4.2.1` - Vite React plugin
- `eslint` + TypeScript ESLint plugins - Code quality
- `@types/react` and `@types/react-dom` - TypeScript definitions

### Styling Approach
- **CSS/SCSS**: Modern CSS with SCSS preprocessing
- **Mobile-First**: Responsive design starting from mobile breakpoints
- **Component Styling**: Modular CSS approach with component-specific styles
- **Design System**: Consistent colors, typography, and spacing based on Quanta Services inspiration

### Development Environment
- **IDE**: VS Code with React/TypeScript extensions
- **Port**: Development server on port 3000
- **Hot Reload**: Vite's fast refresh for instant development feedback

## Technical Constraints

### Performance Requirements
- **Loading Speed**: Target under 3 seconds for initial page load
- **Mobile Performance**: Optimized for mobile networks and devices
- **Image Optimization**: Compressed images for web delivery
- **Bundle Size**: Minimize JavaScript bundle size for faster loading
- **Animation Performance**: 60fps animations with GPU acceleration
- **Reduced Motion**: Respect user preferences for reduced motion accessibility

### SEO Requirements
- **Server-Side Rendering**: Consider SSR/SSG for better SEO (potential future enhancement)
- **Meta Tags**: Proper meta descriptions, titles, and social media tags
- **Semantic HTML**: Proper HTML structure for search engines
- **Local SEO**: Schema markup for local business information

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Browsers**: iOS Safari, Android Chrome
- **Fallbacks**: Graceful degradation for older browsers

### Accessibility
- **WCAG Compliance**: Level AA accessibility standards
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic markup
- **Color Contrast**: Sufficient contrast ratios for readability
- **Motion Sensitivity**: `prefers-reduced-motion` CSS media query support
- **Focus Management**: Proper focus handling during animations

## Development Setup

### File Structure (Planned)
```
src/
├── components/          # Reusable UI components
│   ├── Header/
│   ├── Hero/           # Hero with parallax background
│   ├── Services/       # Services with scroll animations
│   ├── Testimonials/   # Testimonials with stagger effects
│   ├── Contact/        # Contact with entrance animations
│   └── Footer/
├── hooks/              # Custom React hooks
│   ├── useParallax.ts  # Parallax scroll effects
│   ├── useScrollAnimation.ts # Scroll-triggered animations
│   └── useIntersectionObserver.ts # Viewport detection
├── pages/              # Page components
├── styles/             # Global styles and variables
├── assets/             # Images, icons, fonts
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
    └── animations.ts   # Animation utility functions
```

### Key Features to Implement
1. **Responsive Navigation**: Mobile hamburger menu, desktop horizontal nav
2. **Parallax Scrolling**: Background images with depth effect and smooth movement
3. **Scroll Animations**: Elements animate into view with intersection observer
4. **Staggered Effects**: Sequential animations for multiple elements
5. **Contact Forms**: React form handling with validation
6. **Chat Integration**: Third-party chat widget or custom implementation
7. **Phone Number Integration**: Click-to-call functionality on mobile
8. **Image Gallery**: Service photos and project showcases
9. **Google Maps Integration**: Service area visualization
10. **Social Media Links**: Facebook and Google Business integration

### Deployment Strategy
- **Static Hosting**: Netlify, Vercel, or similar JAMstack platform
- **Domain Setup**: Custom domain configuration
- **SSL**: HTTPS implementation
- **Analytics**: Google Analytics integration for tracking

## Tool Usage Patterns

### Development Workflow
1. **Component Development**: Build reusable React components with TypeScript
2. **Styling**: SCSS modules for component-specific styles
3. **Testing**: Manual testing across devices and browsers
4. **Building**: TypeScript compilation + Vite bundling
5. **Deployment**: Static build deployment to hosting platform

### Code Quality
- **ESLint**: Automated code quality checks
- **TypeScript**: Compile-time error checking
- **Prettier**: Code formatting consistency
- **Git Hooks**: Pre-commit quality checks

### Asset Management
- **Images**: Optimized formats (WebP, AVIF with fallbacks)
- **Portfolio Photos**: Located in `C:\Sandboxes\VidanaElectric\resources\portfolio\`
  - 12 project photos in HEIC/JPG format for Testimonials/Our Work section
  - Require conversion to web-optimized formats (WebP, AVIF)
  - Image optimization and responsive sizing needed
- **Fonts**: Web fonts with proper fallbacks
- **Icons**: SVG icons for scalability
- **Favicons**: Complete favicon set for all devices

## Integration Requirements

### Third-Party Services
- **Chat System**: Customer support chat (Intercom, Zendesk, or custom)
- **Forms**: Contact form backend (Netlify Forms, Formspree, or custom API)
- **Analytics**: Google Analytics or similar tracking
- **Maps**: Google Maps for service area display
- **Business Listings**: Schema.org markup for local SEO

### API Considerations
- **Contact Forms**: Form submission handling
- **Chat API**: Real-time messaging integration
- **Business Data**: Structured data for search engines
- **Social Media**: Meta tags for social sharing

This technical foundation provides a modern, maintainable, and scalable website that can grow with Vidana Electric's business needs while ensuring excellent performance and user experience across all devices.