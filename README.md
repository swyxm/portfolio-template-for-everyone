# Deprecated Portfolio Template

> **⚠️ This is a deprecated portfolio template for public use**

A minimalist, slate-aesthetic portfolio website built with Next.js 15, React 19, and Tailwind CSS. This template was originally created to test [v0.dev](https://v0.dev) capabilities and has since been open-sourced for the community to fork and build upon.

## ✨ Features

- **Minimalist Design**: Clean, slate-colored aesthetic with subtle animations
- **Easter Eggs**: Hidden interactive elements and animations throughout
- **Responsive**: Mobile-first design that works on all devices
- **Modern Stack**: Built with the latest Next.js, React, and TypeScript
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Performance**: Optimized with Next.js App Router and modern React patterns

## 🎮 Easter Eggs

This template is filled with delightful easter eggs for users to discover:

- **Logo Click Counter**: Click the square logo 5 times to activate rainbow mode
- **Star Animation**: Trigger shooting stars and twinkling effects
- **Hidden Animations**: Staggered list animations and scroll-triggered reveals
- **Console Messages**: Check the browser console for hidden messages
- **Rainbow Mode**: Special visual effects after certain interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Fork this repository** to your GitHub account
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

4. **Start the development server**:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main portfolio page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme context
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🎨 Customization

### Content Updates

1. **Personal Information**: Update the content in `app/page.tsx`
2. **Styling**: Modify `app/globals.css` for global styles
3. **Components**: Customize UI components in `components/ui/`
4. **Theme**: Adjust colors in `tailwind.config.ts`

### Adding New Sections

The template uses a modular section-based approach. To add new sections:

1. Create a new section component
2. Add it to the main page with proper animation hooks
3. Update the navigation if needed

### Easter Egg Development

To add your own easter eggs:

1. Add state variables for interaction tracking
2. Create event handlers for user interactions
3. Implement visual feedback and animations
4. Add console messages for discovery hints

## 🧪 v0.dev Testing

This template was originally built to test v0.dev's capabilities in generating:

- Complex React components with hooks
- Tailwind CSS styling and animations
- TypeScript integration
- Component composition patterns
- Interactive user experiences

The codebase demonstrates various patterns that work well with AI-assisted development tools.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Since this is a deprecated template, contributions are welcome for:

- Bug fixes and improvements
- Additional easter eggs
- Documentation updates
- Performance optimizations

Please feel free to fork and modify this template for your own portfolio!

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.dev) for initial generation
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspiration from minimalist design principles

---

**Happy building!** 🚀

*Remember: The best portfolios tell a story. Use this template as a starting point, but make it uniquely yours.*
