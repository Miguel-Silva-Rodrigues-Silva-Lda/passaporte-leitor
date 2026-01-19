export default function LandingHeader() {
  return (
    <header>
      <div className="container">
        <nav>
          <a href="/" className="logo">
            <span className="logo-icon">📚</span>
            <span>Passaporte do Leitor</span>
          </a>

          <ul className="nav-links">
            <li><a href="/#funcionalidades">Funcionalidades</a></li>
            <li><a href="/#pais">Para Pais</a></li>
            <li><a href="/#escolas">Para Escolas</a></li>
            <li><a href="/#contacto">Contacto</a></li>
          </ul>

          <div className="nav-cta">
            <a href="/auth" className="btn btn-secondary">Entrar</a>
            <a href="/auth" className="btn btn-primary">Começar Grátis</a>
          </div>

          <button className="mobile-menu-btn">☰</button>
        </nav>
      </div>
    </header>
  );
}
