export default function LandingFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>📚</span>
              <span>Passaporte do Leitor</span>
            </div>
            <p>Transformar a leitura numa aventura para crianças dos 6 aos 12 anos.</p>
          </div>

          <div className="footer-column">
            <h4>Produto</h4>
            <ul className="footer-links">
              <li><a href="/#funcionalidades">Funcionalidades</a></li>
              <li><a href="/#pais">Para Pais</a></li>
              <li><a href="/#escolas">Para Escolas</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Empresa</h4>
            <ul className="footer-links">
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="/#contacto">Contacto</a></li>
              <li><a href="/privacidade">Política de Privacidade</a></li>
              <li><a href="/cookies">Política de Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Passaporte do Leitor. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
