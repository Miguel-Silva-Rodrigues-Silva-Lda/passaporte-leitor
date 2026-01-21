import Link from 'next/link';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.vamosler.pt';

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <span className="logo-icon">📚</span>
            <span>Vamos Ler</span>
          </Link>

          <ul className="nav-links">
            <li><Link href="#funcionalidades">Funcionalidades</Link></li>
            <li><Link href="#pais">Para Pais</Link></li>
            <li><Link href="#escolas">Para Escolas</Link></li>
            <li><Link href="#contacto">Contacto</Link></li>
          </ul>

          <div className="nav-cta">
            <a href={`${APP_URL}/auth`} className="btn btn-secondary">Entrar</a>
            <a href={`${APP_URL}/auth`} className="btn btn-primary">Começar Grátis</a>
          </div>

          <button className="mobile-menu-btn" aria-label="Menu">☰</button>
        </nav>
      </div>
    </header>
  );
}
