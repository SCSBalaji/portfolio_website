# Portfolio Website

A modern, responsive portfolio website built with React and Vite. Features 3D visuals, smooth animations, a blog section, and a contact form.

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vite.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) and [Drei](https://github.com/pmndrs/drei)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://gsap.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email:** [EmailJS](https://www.emailjs.com/)
- **Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown)
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)

## Features

- Interactive 3D elements and post-processing effects
- Smooth page transitions and scroll-based animations
- Blog with Markdown rendering
- Contact form with email integration
- SEO-friendly with dynamic meta tags
- Fully responsive design
- SPA routing with Vercel and Nginx support

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (included with Node.js)

### Installation

```bash
git clone https://github.com/<your-username>/portfolio_website.git
cd portfolio_website
npm install
```

### Development Server

```bash
npm run dev
```

Open the URL shown in the terminal (default: `http://localhost:5173`).

### Production Build

```bash
npm run build
```

The optimized output is written to the `dist/` directory.

### Preview the Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
portfolio_website/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, and other assets
│   ├── components/
│   │   ├── layout/      # Layout components (header, footer, etc.)
│   │   ├── sections/    # Page sections
│   │   ├── three/       # Three.js / R3F components
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Static data and content
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route-level page components
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Root application component
│   └── main.jsx         # Application entry point
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
├── vercel.json          # Vercel deployment configuration
├── Cloud_deploy.md      # GCP VM deployment guide
└── package.json
```

## Deployment

### Vercel (Recommended)

This project includes a `vercel.json` with SPA rewrite rules. To deploy:

1. Push your code to GitHub.
2. Import the repository on [Vercel](https://vercel.com/).
3. Vercel auto-detects Vite and deploys with zero configuration.

### Google Cloud Platform VM

For a self-hosted deployment on a GCP Compute Engine VM, see the full guide in **[Cloud_deploy.md](./Cloud_deploy.md)**. It covers VM provisioning, Nginx configuration, SSL setup, and more.

## License

This project is licensed under the [MIT License](./LICENSE).
