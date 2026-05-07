# Manuri Susatwik - Interactive Portfolio

A premium, interactive personal portfolio website built with modern web technologies to showcase my projects, technical skills, and professional journey.

## 🚀 Features

- **Immersive Design:** Dark-themed, high-contrast aesthetic with ambient lighting and glassmorphism effects.
- **Scrolly-telling Experience:** Smooth scroll animations and transition effects guided by user interaction.
- **Interactive Projects Grid:** Bento-style grid layout with video previews and detailed modal views for each project.
- **Dynamic Timeline:** Visual representation of my professional career and educational background.
- **Testimonial Marquee:** Infinite scrolling marquee for client and colleague testimonials.
- **Responsive Layout:** Fully optimized for desktops, tablets, and mobile devices.
- **Contact Integration:** Functional contact form integrated with Nodemailer for direct email communication.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Elements:** [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons:** Custom SVG & Lucide React

## 📂 Project Structure

```
├── src/
│   ├── app/             # Application routes (Next.js App Router)
│   ├── components/      # Reusable UI components (Hero, Projects, Skills, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and shared logic
│   └── styles/          # Global styles and Tailwind configuration
├── public/              # Static assets (images, videos, fonts)
├── .env.example         # Example environment variables
└── package.json         # Project dependencies and scripts
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/susatwik/sathwvik-portfolio.git
   cd sathwvik-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and add the necessary variables for email services (if applicable):
   ```env
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_app_password
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🚀 Deployment

This project is deployed on **Vercel**. Any push to the `main` branch automatically triggers a new deployment.

### Steps to Deploy on Vercel:
1. Push your code to the GitHub repository.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.
3. Import the `sathwvik-portfolio` repository.
4. Add your environment variables in the project settings.
5. Click **Deploy**.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/susatwik/sathwvik-portfolio/issues).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
