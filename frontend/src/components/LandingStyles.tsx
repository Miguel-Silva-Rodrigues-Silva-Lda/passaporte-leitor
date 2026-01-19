export default function LandingStyles() {
  return (
    <>
      <style>{`
        /* ============================================
           CSS Variables
        ============================================ */
        :root {
          --color-primary: #E67E22;
          --color-primary-dark: #D35400;
          --color-primary-light: #F39C12;
          --color-secondary: #3498DB;
          --color-success: #27AE60;
          --color-background: #FDF6E3;
          --color-card: #FFFFFF;
          --color-text: #2C3E50;
          --color-text-light: #7F8C8D;
          --color-border: #E8E0D5;
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
          --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.12);
          --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.15);
          --radius-sm: 8px;
          --radius-md: 16px;
          --radius-lg: 24px;
          --radius-xl: 32px;
        }

        /* ============================================
           Reset & Base for Landing
        ============================================ */
        .landing-page *,
        .landing-page *::before,
        .landing-page *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .landing-page {
          font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--color-text);
          line-height: 1.6;
          background-color: var(--color-background);
        }

        .landing-page img {
          max-width: 100%;
          height: auto;
        }

        .landing-page a {
          color: inherit;
          text-decoration: none;
        }

        /* ============================================
           Typography
        ============================================ */
        .landing-page h1,
        .landing-page h2,
        .landing-page h3,
        .landing-page h4 {
          line-height: 1.2;
          font-weight: 800;
        }

        .landing-page h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
        }

        .landing-page h2 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
        }

        .landing-page h3 {
          font-size: clamp(1.2rem, 3vw, 1.5rem);
        }

        .landing-page p {
          color: var(--color-text-light);
        }

        /* ============================================
           Layout
        ============================================ */
        .landing-page .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .landing-page section {
          padding: 80px 0;
        }

        /* ============================================
           Buttons
        ============================================ */
        .landing-page .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .landing-page .btn-primary {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(230, 126, 34, 0.4);
        }

        .landing-page .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(230, 126, 34, 0.5);
        }

        .landing-page .btn-secondary {
          background: white;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
        }

        .landing-page .btn-secondary:hover {
          background: var(--color-primary);
          color: white;
        }

        .landing-page .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .landing-page .btn-outline:hover {
          background: white;
          color: var(--color-primary);
        }

        /* ============================================
           Header / Navigation
        ============================================ */
        .landing-page header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
        }

        .landing-page nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
        }

        .landing-page .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text);
        }

        .landing-page .logo-icon {
          font-size: 2rem;
        }

        .landing-page .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }

        .landing-page .nav-links a {
          font-weight: 600;
          color: var(--color-text-light);
          transition: color 0.3s;
        }

        .landing-page .nav-links a:hover {
          color: var(--color-primary);
        }

        .landing-page .nav-cta {
          display: flex;
          gap: 12px;
        }

        .landing-page .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .landing-page .nav-links,
          .landing-page .nav-cta {
            display: none;
          }

          .landing-page .mobile-menu-btn {
            display: block;
          }
        }

        /* ============================================
           Footer
        ============================================ */
        .landing-page footer {
          background: var(--color-text);
          color: white;
          padding: 60px 0 30px;
        }

        .landing-page .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .landing-page .footer-brand {
          max-width: 300px;
        }

        .landing-page .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .landing-page .footer-brand p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .landing-page .footer-column h4 {
          font-size: 1rem;
          margin-bottom: 20px;
          color: white;
        }

        .landing-page .footer-links {
          list-style: none;
        }

        .landing-page .footer-links li {
          margin-bottom: 12px;
        }

        .landing-page .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          transition: color 0.3s;
        }

        .landing-page .footer-links a:hover {
          color: var(--color-primary);
        }

        .landing-page .footer-bottom {
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .landing-page .footer-copyright {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .landing-page .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .landing-page .footer-brand {
            max-width: 100%;
          }

          .landing-page .footer-bottom {
            justify-content: center;
            text-align: center;
          }
        }

        /* ============================================
           Content Section (for policy pages)
        ============================================ */
        .landing-page .content-section {
          padding-top: 140px;
          padding-bottom: 80px;
          min-height: calc(100vh - 300px);
        }

        .landing-page .content-card {
          background: var(--color-card);
          border-radius: var(--radius-lg);
          padding: 48px;
          box-shadow: var(--shadow-sm);
          max-width: 800px;
          margin: 0 auto;
        }

        .landing-page .content-card h1 {
          font-size: 2rem;
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .landing-page .content-card .updated-date {
          color: var(--color-text-light);
          font-size: 0.95rem;
          font-style: italic;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .landing-page .content-card .intro {
          margin-bottom: 32px;
          font-size: 1rem;
          color: var(--color-text);
        }

        .landing-page .content-card h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 32px;
          margin-bottom: 16px;
          color: var(--color-text);
        }

        .landing-page .content-card p {
          margin-bottom: 16px;
          color: var(--color-text);
          line-height: 1.7;
        }

        .landing-page .content-card ul {
          margin-bottom: 16px;
          padding-left: 24px;
        }

        .landing-page .content-card li {
          margin-bottom: 8px;
          color: var(--color-text);
          line-height: 1.7;
        }

        .landing-page .content-card a {
          color: var(--color-primary);
        }

        .landing-page .content-card a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .landing-page .content-card {
            padding: 32px 24px;
          }

          .landing-page .content-card h1 {
            font-size: 1.5rem;
          }

          .landing-page .content-card h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
    </>
  );
}
