# RodcerState Real Estate - Next.js Project

A modern, responsive real estate website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS** featuring a sophisticated green color palette.

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **React 19** - Latest React features
- **Font Awesome** - Icon library
- **Google Fonts** - Montserrat typography

## 🎨 Green Color Palette

```css
Primary Green: #2d5016 (Deep forest green)
Secondary Green: #4a7c2c (Medium green)
Accent Green: #6fb33f (Bright green)
Accent Gold: #d4af37 (Luxury accent)
```

## 📁 Project Structure

```
real-state/
├── app/
│   ├── components/
│   │   ├── Header.tsx       # Navigation with scroll effect
│   │   ├── Hero.tsx         # Hero section with search
│   │   ├── Properties.tsx   # Property listings with tabs
│   │   ├── About.tsx        # About section
│   │   ├── Agents.tsx       # Team members
│   │   ├── Contact.tsx      # Contact form
│   │   └── Footer.tsx       # Footer
│   ├── globals.css          # Global styles + Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/                  # Static assets (images)
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🏃 Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## ✨ Features

- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- ✅ **TypeScript** - Type-safe components
- ✅ **Modern Design** - Green-themed with gradients and animations
- ✅ **Smooth Scrolling** - Anchor navigation
- ✅ **Property Search** - Filter by type and operation
- ✅ **Tab Navigation** - All/Sale/Rent property filtering
- ✅ **Form Validation** - Contact form with validation
- ✅ **Image Optimization** - Next.js Image component
- ✅ **SEO Ready** - Meta tags and semantic HTML

## 🎯 Components

### Header
- Sticky navigation with scroll effect
- Responsive mobile menu
- Contact information in header

### Hero
- Full-screen background with overlay
- Property search form
- Smooth animations

### Properties
- Tab-based filtering (All/Sale/Rent)
- Property cards with hover effects
- Responsive grid layout

### About
- Two-column layout
- Company information

### Agents
- Team member profiles
- Contact information
- Hover animations

### Contact
- Form validation
- Background overlay
- Consultation request

### Footer
- Contact details
- Social media links
- Company branding

## 🎨 Customization

### Update Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    green: '#2d5016',
    // ... your colors
  }
}
```

### Add Properties

Edit the `properties` array in `app/components/Properties.tsx`

### Modify Content

All text is in the component files - easy to update!

## 📝 Environment

- Node.js 20+
- npm or yarn

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📦 Dependencies

- next: 16.0.5
- react: 19.2.0
- react-dom: 19.2.0
- tailwindcss: ^4
- typescript: ^5

## 🌟 Next Steps

1. Replace placeholder images with real property photos
2. Connect to a backend API for property data
3. Add property detail pages
4. Implement advanced search filters
5. Add user authentication
6. Create admin dashboard

---

**RodcerState Real Estate Group** - Built with Next.js & TypeScript
