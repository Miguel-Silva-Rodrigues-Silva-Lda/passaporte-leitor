export default function PrivacyPolicy() {
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

        .privacy-page {
          font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--color-text);
          line-height: 1.7;
          background-color: var(--color-background);
          min-height: 100vh;
        }

        .privacy-page * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .privacy-page a {
          color: var(--color-primary);
          text-decoration: none;
        }

        .privacy-page a:hover {
          text-decoration: underline;
        }

        .privacy-page header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
          padding: 16px 0;
        }

        .privacy-page .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .privacy-page .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text);
          text-decoration: none;
        }

        .privacy-page .logo:hover {
          text-decoration: none;
        }

        .privacy-page .logo-icon {
          font-size: 2rem;
        }

        .privacy-page main {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .privacy-page .content-card {
          background: var(--color-card);
          border-radius: var(--radius-lg);
          padding: 48px;
          box-shadow: var(--shadow-sm);
        }

        .privacy-page h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .privacy-page .updated-date {
          color: var(--color-text-light);
          font-size: 0.95rem;
          font-style: italic;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }

        .privacy-page .intro {
          margin-bottom: 32px;
          font-size: 1rem;
        }

        .privacy-page h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 32px;
          margin-bottom: 16px;
          color: var(--color-text);
        }

        .privacy-page p {
          margin-bottom: 16px;
          color: var(--color-text);
        }

        .privacy-page ul {
          margin-bottom: 16px;
          padding-left: 24px;
        }

        .privacy-page li {
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .privacy-page footer {
          background: var(--color-text);
          color: white;
          padding: 30px 0;
          text-align: center;
        }

        .privacy-page .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .privacy-page .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .privacy-page .footer-copyright {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .privacy-page .content-card {
            padding: 32px 24px;
          }

          .privacy-page h1 {
            font-size: 1.5rem;
          }

          .privacy-page h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div className="privacy-page">
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
            <h1>Política de Privacidade</h1>
            <p className="updated-date">Última atualização: 19 de janeiro de 2026</p>

            <p className="intro">
              A presente Política de Privacidade descreve como o Vamos Ler recolhe, utiliza e protege os dados pessoais dos utilizadores, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e demais legislação aplicável em Portugal.
            </p>

            <h2>1. Responsável pelo Tratamento</h2>
            <p>
              O responsável pelo tratamento dos dados pessoais recolhidos através do site vamosler.pt é Miguel Silva & Rodrigues Silva, Lda, com contacto através do endereço de email: <a href="mailto:suporte@vamosler.pt">suporte@vamosler.pt</a>.
            </p>

            <h2>2. Dados Pessoais Recolhidos</h2>
            <p>
              No âmbito do registo e utilização da plataforma Vamos Ler, recolhemos os seguintes dados pessoais: endereço de email, nome da família e nome do familiar. Estes dados são fornecidos diretamente pelo utilizador aquando do registo na plataforma.
            </p>

            <h2>3. Finalidades do Tratamento</h2>
            <p>
              Os dados pessoais recolhidos são utilizados exclusivamente para: criação e gestão da conta de utilizador, autenticação e acesso à plataforma, identificação dos membros da família dentro da aplicação, e comunicação relacionada com o serviço (recuperação de password, notificações essenciais).
            </p>

            <h2>4. Base Legal</h2>
            <p>
              O tratamento dos dados pessoais tem como base legal a execução de um contrato (prestação do serviço) nos termos do artigo 6.º, n.º 1, alínea b) do RGPD, bem como o consentimento do titular dos dados quando aplicável.
            </p>

            <h2>5. Dados de Menores</h2>
            <p>
              A plataforma Vamos Ler destina-se a ser utilizada por crianças sob supervisão de adultos. O registo na plataforma é efetuado exclusivamente por adultos (pais ou encarregados de educação), sendo estes responsáveis por supervisionar o acesso e utilização da plataforma pelos menores a seu cargo. Não recolhemos conscientemente dados pessoais diretamente de menores de 13 anos.
            </p>

            <h2>6. Conservação dos Dados</h2>
            <p>
              Os dados pessoais são conservados enquanto a conta do utilizador permanecer ativa. O utilizador pode solicitar a eliminação da sua conta e respetivos dados a qualquer momento através do email <a href="mailto:suporte@vamosler.pt">suporte@vamosler.pt</a>.
            </p>

            <h2>7. Partilha de Dados</h2>
            <p>
              Os dados pessoais não são partilhados com terceiros, exceto quando necessário para o funcionamento técnico da plataforma (serviços de alojamento) ou quando exigido por lei.
            </p>

            <h2>8. Direitos dos Titulares</h2>
            <p>
              Nos termos do RGPD, o utilizador tem os seguintes direitos:
            </p>
            <ul>
              <li>Direito de acesso aos seus dados pessoais</li>
              <li>Direito de retificação de dados incorretos</li>
              <li>Direito ao apagamento dos dados ("direito a ser esquecido")</li>
              <li>Direito à portabilidade dos dados</li>
              <li>Direito de oposição ao tratamento</li>
              <li>Direito de apresentar reclamação junto da CNPD (Comissão Nacional de Proteção de Dados)</li>
            </ul>
            <p>
              Para exercer qualquer destes direitos, contacte-nos através de <a href="mailto:suporte@vamosler.pt">suporte@vamosler.pt</a>.
            </p>

            <h2>9. Segurança</h2>
            <p>
              Implementamos medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>10. Alterações à Política de Privacidade</h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações serão publicadas nesta página com a respetiva data de atualização.
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
