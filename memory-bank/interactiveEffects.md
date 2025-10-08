# Interactive Effects - Parallax and Animation Specifications

## Lead with Primitive Parallax Integration

### Core Parallax Effects
Based on modern parallax implementations like Lead with Primitive, the website should include:

#### Background Parallax Movement
- **Hero section background** moves at 50-70% scroll speed (slower than content)
- **Multiple layer parallax** - background, mid-ground, foreground at different speeds
- **Smooth scrolling library** - Lenis for butter-smooth scroll experience
- **GPU acceleration** - CSS transforms for 60fps performance

#### Scroll-Triggered Animations
- **Intersection Observer** based animations
- **Elements animate into view** as they enter viewport
- **Staggered timing** - sequential animations with delays
- **Professional easing** - smooth, corporate-appropriate timing curves

### Specific Implementation Details

#### Hero Section Parallax
```
Background Image: Parallax speed 0.3 (30% of scroll speed)
Overlay Elements: Parallax speed 0.5 (50% of scroll speed)
Text Content: Normal scroll speed (100%)
```

#### Services Section Animations
- **Cards animate up** from bottom as they enter view
- **Staggered delays** - 150ms between each card
- **Smooth opacity** and transform animations
- **Subtle scale effect** on hover (1.02x scale)

#### Scroll Smoothing
- **Lenis smooth scroll** implementation
- **Momentum scrolling** with appropriate damping
- **Accessibility respect** - reduced motion preferences honored
- **Touch device optimization** - proper mobile scroll behavior

### Animation Timing and Easing

#### Corporate Animation Standards
- **Duration**: 0.6-0.8s for major transitions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` - professional feel
- **Stagger timing**: 100-200ms delays for sequential elements
- **Hover animations**: 200-300ms quick feedback

#### Performance Requirements
- **60fps target** - all animations run smoothly
- **CPU efficiency** - minimal performance impact
- **Battery consideration** - optimized for mobile devices
- **Graceful degradation** - fallbacks for low-end devices

### Interaction Design Patterns

#### Scroll-Based Reveals
1. **Fade + Slide Up**: Content slides up 30px while fading in
2. **Scale + Fade**: Elements scale from 0.95 to 1.0 while fading
3. **Staggered Grid**: Cards appear sequentially left to right
4. **Progressive Disclosure**: Sections reveal content as user scrolls

#### Hover Interactions
- **Button elevation**: Subtle shadow increase on hover
- **Card lifting**: Service cards lift 4-8px on hover
- **Color transitions**: Smooth color changes (300ms)
- **Image scaling**: Background images scale 1.05x on hover

### Advanced Scroll Effects

#### Parallax Layers
```
Layer 1 (Background): Speed 0.2 - slowest moving background
Layer 2 (Mid-ground): Speed 0.5 - decorative elements
Layer 3 (Foreground): Speed 1.0 - main content
```

#### Scroll Progress Indicators
- **Header background opacity** changes based on scroll position
- **Navigation highlight** shows current section
- **Smooth transitions** between sections
- **Scroll-to-top button** appears after scrolling

### Technical Implementation Notes

#### Libraries and Tools
- **Framer Motion**: React animation library for components
- **Lenis**: Smooth scroll implementation
- **React Intersection Observer**: Viewport detection
- **CSS Custom Properties**: Dynamic values for scroll-based animations

#### Performance Optimization
- **Transform-only animations** - avoid layout thrashing
- **RequestAnimationFrame** for custom scroll handlers
- **Passive scroll listeners** for better performance
- **IntersectionObserver** instead of scroll event polling

#### Accessibility Considerations
- **prefers-reduced-motion** media query support
- **Focus management** during animations
- **Keyboard navigation** unaffected by scroll effects
- **Screen reader compatibility** with ARIA live regions

### Corporate Animation Guidelines

#### Professional Standards
- **Subtle, purposeful animations** - enhance UX without distraction
- **Consistent timing** - all animations feel cohesive
- **Performance first** - smooth on all devices
- **Business appropriate** - no flashy or distracting effects

#### Brand Alignment
- **Trustworthy feel** - animations inspire confidence
- **Professional polish** - attention to detail
- **Smooth interactions** - reflects quality service
- **Modern but timeless** - won't feel dated quickly

### Testing Requirements

#### Performance Testing
- **60fps on desktop** - Chrome DevTools performance monitoring
- **30fps minimum mobile** - tested on mid-range devices
- **Battery impact** - minimal CPU usage during scrolling
- **Memory efficiency** - no memory leaks from animations

#### Cross-Device Testing
- **Desktop browsers** - Chrome, Firefox, Safari, Edge
- **Mobile devices** - iOS Safari, Android Chrome
- **Tablet experience** - proper touch interactions
- **Reduced motion** - fallback experience testing

This specification ensures the interactive effects will be professional, performant, and enhance the user experience while maintaining the corporate credibility required for Vidana Electric's business objectives.