# System Patterns - Vidana Electric Website

## Architecture Overview

### Component-Based Architecture
- **Page Components**: Top-level components representing full pages
- **Section Components**: Major page sections (Hero, Services, Contact, etc.)
- **UI Components**: Reusable elements (Button, Card, Form, etc.)
- **Layout Components**: Header, Footer, Navigation

### Design Patterns

#### Component Composition Pattern
```
Page Components
├── Header (Navigation, Logo, Contact Info)
├── Hero (Headline, CTA Buttons, Parallax Background)
├── Services (Service Cards Grid with Scroll Animations)
├── WhyChooseUs (Trust Builders with Reveal Effects)
├── Testimonials (Review Cards with Stagger Animations)
├── Contact (Form, Phone, Chat Button with Entrance Effects)
├── ServiceArea (Map/Location Info with Parallax)
└── Footer (Links, Business Info, Social)
```

#### Interactive Scroll Patterns
- **Parallax Scrolling**: Background images move at different speeds than foreground content
- **Scroll-Triggered Animations**: Elements animate into view as user scrolls
- **Staggered Reveals**: Sequential animation of multiple elements
- **Transform Effects**: Scale, translate, and opacity changes based on scroll position
- **Background Parallax**: Hero and section backgrounds with depth effect

#### Mobile-First Responsive Design
- **Breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Navigation**: Hamburger menu on mobile, horizontal on desktop
- **Grid System**: CSS Grid and Flexbox for responsive layouts
- **Touch Targets**: Minimum 44px touch targets for mobile interaction
- **Reduced Motion**: Respect user preferences for reduced motion on mobile

### Key Technical Decisions

#### State Management
- **Local State**: React hooks (useState, useEffect) for component-level state
- **Form State**: Controlled components for contact forms
- **No Global State**: Simple site doesn't require Redux/Context for global state

#### Routing Strategy
- **Single Page Application**: All content on one page with smooth scrolling navigation
- **Hash Navigation**: Links to page sections (#services, #contact, etc.)
- **Future Consideration**: React Router if multi-page expansion is needed

#### Performance Patterns
- **Code Splitting**: Lazy loading for non-critical components
- **Image Optimization**: Responsive images with multiple formats (WebP, AVIF)
- **CSS Optimization**: Critical CSS inlined, non-critical loaded asynchronously
- **Bundle Optimization**: Vite's tree-shaking and minification

## Component Relationships

### Header Component
- **Dependencies**: Logo component, Navigation component, ContactInfo component
- **Behavior**: Sticky on scroll, mobile menu toggle
- **State**: Menu open/closed state for mobile

### Hero Component
- **Dependencies**: Button components, Parallax background image, Scroll animation hooks
- **Behavior**: Call-to-action click tracking, responsive text sizing, parallax background movement
- **Animation**: Background moves slower than foreground content creating depth
- **Integration**: Links to Contact section and phone dialing

### Services Component
- **Dependencies**: ServiceCard components, Icon components, Intersection Observer for animations
- **Behavior**: Grid layout, hover effects, scroll-triggered entrance animations
- **Animation**: Cards animate in with staggered timing as they enter viewport
- **Data**: Service information from constants/data file

### Contact Component
- **Dependencies**: Form components, validation utilities
- **Behavior**: Form submission, validation feedback, success states
- **Integration**: Form backend API, chat widget initialization

### Chat Integration
- **Pattern**: Third-party widget integration (Intercom, Zendesk, etc.)
- **Implementation**: Script loading in index.html or component-based integration
- **Positioning**: Fixed position, bottom-right corner
- **Responsive**: Adjusted sizing for mobile devices

## Critical Implementation Paths

### Lead Conversion Flow
1. **Entry Point**: User lands on page via search, referral, or direct
2. **Trust Building**: Hero section immediately establishes credibility
3. **Value Proposition**: Services section explains offerings
4. **Social Proof**: Testimonials provide validation
5. **Contact**: Multiple conversion points (phone, form, chat)
6. **Follow-up**: Form submission triggers business process

### Mobile Experience Path
1. **Fast Loading**: Optimized images and minimal JavaScript
2. **Touch Navigation**: Easy-to-tap phone number and CTA buttons
3. **Thumb-Friendly**: Bottom navigation, accessible form fields
4. **Progressive Enhancement**: Core functionality works without JavaScript

### SEO Optimization Path
1. **Semantic HTML**: Proper heading hierarchy and landmark elements
2. **Meta Tags**: Title, description, Open Graph tags
3. **Local Business Schema**: Structured data for search engines
4. **Content Strategy**: Keywords naturally integrated into copy

## Data Flow Patterns

### Contact Form Flow
```
User Input → Form Validation → State Update → API Submission → Success/Error Handling
```

### Chat Widget Flow
```
Page Load → Widget Script Load → Widget Initialization → User Interaction → Chat Session
```

### Phone Call Flow
```
Click Phone Number → Device Detection → Tel: Link → Phone App Launch
```

### Navigation Flow
```
Menu Click → Smooth Scroll → Section Highlight → URL Hash Update
```

### Scroll Animation Flow
```
Scroll Event → Intersection Observer → Element in View → Animation Trigger → CSS Transform/Opacity
```

### Parallax Effect Flow
```
Scroll Event → Calculate Scroll Position → Apply Transform → Background Movement → Depth Effect
```

## Error Handling Patterns

### Form Submission Errors
- **Network Errors**: Retry mechanism with user feedback
- **Validation Errors**: Inline field validation with clear messaging
- **Server Errors**: Graceful fallback to phone contact information

### Image Loading Errors
- **Fallback Images**: Default placeholders for failed image loads
- **Progressive Loading**: Blur-up effect or skeleton screens
- **Alt Text**: Descriptive alternative text for accessibility

### Chat Widget Errors
- **Script Loading Failures**: Fallback to contact form
- **Connection Issues**: Clear messaging about alternative contact methods

### Animation Performance Errors
- **Reduced Motion Preference**: Disable animations for users who prefer reduced motion
- **Performance Throttling**: Reduce animation complexity on lower-end devices
- **Fallback States**: Ensure content is accessible even without JavaScript animations

## Performance Optimization Patterns

### Loading Strategy
- **Critical Path**: Hero section loads first
- **Progressive Enhancement**: Non-critical features load after
- **Lazy Loading**: Below-fold images and components

### Caching Strategy
- **Static Assets**: Long-term caching for images, CSS, JS
- **Service Worker**: Optional for offline functionality
- **CDN**: Content delivery network for global performance

### Bundle Optimization
- **Tree Shaking**: Eliminate unused code
- **Code Splitting**: Separate vendor and application bundles
- **Compression**: Gzip/Brotli compression for text assets

This system architecture ensures scalability, maintainability, and excellent user experience while keeping the codebase simple and focused on business objectives.