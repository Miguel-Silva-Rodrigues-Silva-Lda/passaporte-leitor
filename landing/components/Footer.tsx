import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>📚</span>
              <span>Vamos Ler</span>
            </div>
            <p>Cria o hábito de leitura nas crianças dos 6 aos 12 anos — sem stress.</p>
            <a href="https://www.instagram.com/vamosler.pt/" target="_blank" rel="noopener noreferrer" className="footer-instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @vamosler.pt
            </a>
          </div>

          <div className="footer-column">
            <h4>Produto</h4>
            <ul className="footer-links">
              <li><Link href="/#funcionalidades">Funcionalidades</Link></li>
              <li><Link href="/#pais">Para Pais</Link></li>
              <li><Link href="/#escolas">Para Escolas</Link></li>
              <li><Link href="/artigos">Artigos</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Empresa</h4>
            <ul className="footer-links">
              <li><Link href="#">Sobre Nós</Link></li>
              <li><Link href="/#contacto">Contacto</Link></li>
              <li><Link href="/privacidade">Política de Privacidade</Link></li>
              <li><Link href="/cookies">Política de Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Vamos Ler. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
