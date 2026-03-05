# Full Stack Developer Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with glassmorphism effects
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📧 Contact form with Formspree integration
- 🌙 Dark theme
- 🔄 Smooth page transitions

## Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS post-processing
- **Autoprefixer** - CSS vendor prefixes

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Footer.jsx          # Footer component
│   └── PageTransition.jsx  # Page transition wrapper
├── pages/
│   ├── Home.jsx            # Home/About page
│   ├── Projects.jsx        # Projects showcase
│   ├── Skills.jsx          # Skills and technologies
│   └── Contact.jsx         # Contact form
├── App.jsx                 # Main app component with routing
├── index.css               # Global styles
└── index.js                # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Formspree Integration

Update the Formspree endpoint in `src/pages/Contact.jsx`:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  // ... rest of the code
});
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID.

### Customization

#### Colors and Theme

Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'primary': '#6366f1',    // Change primary color
      'secondary': '#8b5cf6',  // Change secondary color
      // ... other colors
    }
  }
}
```

#### Fonts

Add custom fonts in `tailwind.config.js` and update the `index.html` head section.

## Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your site

### Netlify

1. Build your project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Or connect your Git repository for automatic deployment

### Other Platforms

The build output in the `dist` folder can be deployed to any static hosting service.

## Performance Optimization

- Images are optimized using modern formats
- Code splitting is handled by Vite
- CSS is purged of unused styles in production builds
- Lazy loading is implemented for better performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

- Email: huzaifa@example.com
- GitHub: https://github.com/huzaifaabbasi630
- LinkedIn: https://linkedin.com

---

Built with ❤️ using React and Tailwind CSS
