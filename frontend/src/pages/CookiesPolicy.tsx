export default function CookiesPolicy() {
  return (
    <>
      <style>{`
        :root {
          --color-primary: #E67E22;
          --color-primary-dark: #D35400;
          --color-background: #FDF6E3;
          --color-card: #FFFFFF;
          --color-text: #2C3E50;
          --color-text-light: #7F8C8D;
          --color-border: #E8E0D5;
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
          --radius-md: 16px;
          --radius-lg: 24px;
        }

        .cookies-page {
          font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--color-text);
          line-height: 1.7;
          background-color: var(--color-background);
          min-height: 100vh;
        }

        .cookies-page * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .cookies-page a {
          color: var(--color-primary);
          text-decoration: none;
        }

        .cookies-page a:hover {
          text-decoration: underline;
        }

        .cookies-page header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
          padding: 16px 0;
        }

        .cookies-page .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .cookies-page .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text);
          text-decoration: none;
        }

        .cookies-page .logo:hover {
          text-decoration: none;
        }

        .cookies-page .logo-icon {
          font-size: 2rem;
        }

        .cookies-page main {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .cookies-page .content-card {
          background: var(--color-card);
          border-radius: var(--radius-lg);
          padding: 48px;
          box-shadow: var(--shadow-sm);
        }

        .cookies-page h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .cookies-page .updated-date {
          color: var(--color-text-light);
          font-size: 0.95rem;
          font-style: italic;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .cookies-page .intro {
          margin-bottom: 32px;
          font-size: 1rem;
        }

        .cookies-page h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 32px;
          margin-bottom: 16px;
          color: var(--color-text);
        }

        .cookies-page p {
          margin-bottom: 16px;
          color: var(--color-text);
        }

        .cookies-page ul {
          margin-bottom: 16px;
          padding-left: 24px;
        }

        .cookies-page li {
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .cookies-page footer {
          background: var(--color-text);
          color: white;
          padding: 30px 0;
          text-align: center;
        }

        .cookies-page .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .cookies-page .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .cookies-page .footer-copyright {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .cookies-page .content-card {
            padding: 32px 24px;
          }

          .cookies-page h1 {
            font-size: 1.5rem;
          }

          .cookies-page h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div className="cookies-page">
        <header>
          <div className="header-container">
            <a href="/" className="logo">
              <span className="logo-icon">📚</span>
              <span>Passaporte do Leitor</span>
            </a>
          </div>
        </header>

        <main>
          <div className="content-card">
            <h1>Política de Cookies</h1>
            <p className="updated-date">Última atualização: 19 de janeiro de 2026</p>

            <p className="intro">
              Esta Política de Cookies explica o que são cookies, como os utilizamos no site vamosler.pt e quais as opções disponíveis para o utilizador.
            </p>

            <h2>1. O Que São Cookies</h2>
            <p>
              Cookies são pequenos ficheiros de texto que são armazenados no dispositivo do utilizador quando este visita um website. São amplamente utilizados para fazer os websites funcionarem de forma mais eficiente e para fornecer informações aos proprietários do site.
            </p>

            <h2>2. Cookies Que Utilizamos</h2>
            <p>
              O site vamosler.pt utiliza exclusivamente cookies técnicos e estritamente necessários ao funcionamento da plataforma. Estes cookies são essenciais para permitir a navegação no site e a utilização das suas funcionalidades, nomeadamente a autenticação e manutenção da sessão do utilizador.
            </p>
            <p>
              Cookies utilizados:
            </p>
            <ul>
              <li><strong>Cookie de sessão</strong> - mantém o utilizador autenticado durante a utilização da plataforma, expira ao fechar o browser ou após período de inatividade</li>
              <li><strong>Cookie de autenticação</strong> - permite reconhecer utilizadores que regressam à plataforma</li>
            </ul>

            <h2>3. Cookies de Terceiros e Analytics</h2>
            <p>
              Não utilizamos cookies de terceiros, cookies de publicidade, nem ferramentas de analytics que rastreiem o comportamento dos utilizadores. A sua navegação no site vamosler.pt não é monitorizada para fins estatísticos ou publicitários.
            </p>

            <h2>4. Base Legal</h2>
            <p>
              Os cookies estritamente necessários que utilizamos estão isentos da obrigação de consentimento nos termos do artigo 5.º, n.º 3 da Diretiva ePrivacy, transposta para a legislação portuguesa, uma vez que são indispensáveis para a prestação do serviço expressamente solicitado pelo utilizador.
            </p>

            <h2>5. Gestão de Cookies</h2>
            <p>
              O utilizador pode configurar o seu browser para recusar cookies. No entanto, ao desativar os cookies estritamente necessários, algumas funcionalidades do site poderão deixar de funcionar corretamente, nomeadamente a autenticação na plataforma.
            </p>

            <h2>6. Contacto</h2>
            <p>
              Para questões relacionadas com esta Política de Cookies ou com o tratamento dos seus dados pessoais, contacte-nos através de: <a href="mailto:suporte@vamosler.pt">suporte@vamosler.pt</a>.
            </p>
          </div>
        </main>

        <footer>
          <div className="footer-container">
            <div className="footer-logo">
              <span>📚</span>
              <span>Passaporte do Leitor</span>
            </div>
            <p className="footer-copyright">
              © 2026 Passaporte do Leitor. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
