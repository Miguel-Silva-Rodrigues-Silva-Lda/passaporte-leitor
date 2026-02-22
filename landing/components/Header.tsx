'use client';

import { useState } from 'react';
import Link from 'next/link';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.vamosler.pt';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <span className="logo-icon">📚</span>
            <span>Vamos Ler</span>
          </Link>

          <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <li><Link href="/#funcionalidades" onClick={closeMenu}>Funcionalidades</Link></li>
            <li><Link href="/#pais" onClick={closeMenu}>Para Pais</Link></li>
            <li><Link href="/#escolas" onClick={closeMenu}>Para Escolas</Link></li>
            <li><Link href="/artigos" onClick={closeMenu}>Artigos</Link></li>
            <li><Link href="/#contacto" onClick={closeMenu}>Contacto</Link></li>
            <li className="mobile-cta">
              <a href={`${APP_URL}/auth`} className="btn btn-secondary">Entrar</a>
              <a href={`${APP_URL}/auth`} className="btn btn-primary">Começar Grátis</a>
            </li>
          </ul>

          <div className="nav-cta">
            <a href={`${APP_URL}/auth`} className="btn btn-secondary">Entrar</a>
            <a href={`${APP_URL}/auth`} className="btn btn-primary">Começar Grátis</a>
          </div>

          <button
            className="mobile-menu-btn"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </nav>
      </div>
      {isMenuOpen && <div className="mobile-menu-overlay" onClick={closeMenu} />}
    </header>
  );
}
