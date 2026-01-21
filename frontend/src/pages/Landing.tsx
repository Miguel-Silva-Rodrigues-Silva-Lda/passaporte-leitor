import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import LandingStyles from '../components/LandingStyles';
import { PageMeta } from '../components/PageMeta';

export default function Landing() {
  return (
    <>
      <PageMeta
        title="Passaporte do Leitor"
        description="O Passaporte do Leitor motiva crianças dos 6 aos 12 anos a desenvolver o hábito da leitura através de streaks, metas diárias e acompanhamento familiar. 100% gratuito!"
        ogUrl="https://vamosler.pt"
        keywords="leitura, crianças, hábito de leitura, gamificação, educação, livros, portugal, streaks, metas de leitura"
      />
      <LandingStyles />
      <style>{`
        /* ============================================
           Hero Section
        ============================================ */
        .landing-page .hero {
          padding: 140px 0 100px;
          background: linear-gradient(180deg, var(--color-background) 0%, #FFF9F0 100%);
          position: relative;
          overflow: hidden;
        }

        .landing-page .hero::before {
          content: '';
          position: absolute;
          top: 0;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(230, 126, 34, 0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .landing-page .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .landing-page .hero-text {
          position: relative;
          z-index: 1;
        }

        .landing-page .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(230, 126, 34, 0.1);
          color: var(--color-primary);
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .landing-page .hero h1 {
          margin-bottom: 24px;
          color: var(--color-text);
        }

        .landing-page .hero h1 span {
          color: var(--color-primary);
        }

        .landing-page .hero-description {
          font-size: 1.25rem;
          margin-bottom: 32px;
          color: var(--color-text-light);
        }

        .landing-page .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .landing-page .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--color-border);
        }

        .landing-page .hero-stat {
          text-align: center;
        }

        .landing-page .hero-stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-primary);
        }

        .landing-page .hero-stat-label {
          font-size: 0.875rem;
          color: var(--color-text-light);
        }

        .landing-page .hero-visual {
          position: relative;
        }

        .landing-page .hero-mockup {
          background: white;
          border-radius: var(--radius-xl);
          padding: 20px;
          box-shadow: var(--shadow-lg);
          transform: perspective(1000px) rotateY(-5deg);
        }

        .landing-page .mockup-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 16px;
        }

        .landing-page .mockup-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #F39C12 0%, #E67E22 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .landing-page .mockup-info h4 {
          font-size: 1rem;
          color: var(--color-text);
        }

        .landing-page .mockup-info p {
          font-size: 0.75rem;
        }

        .landing-page .mockup-streak {
          margin-left: auto;
          text-align: center;
          background: #FFF5EB;
          padding: 8px 12px;
          border-radius: 12px;
        }

        .landing-page .mockup-streak-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-primary);
        }

        .landing-page .mockup-streak-label {
          font-size: 0.625rem;
          color: var(--color-text-light);
        }

        .landing-page .mockup-progress {
          background: #F8F9FA;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .landing-page .mockup-progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .landing-page .mockup-progress-bar {
          height: 8px;
          background: #E5E7EB;
          border-radius: 4px;
          overflow: hidden;
        }

        .landing-page .mockup-progress-fill {
          height: 100%;
          width: 65%;
          background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          border-radius: 4px;
        }

        .landing-page .mockup-book {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #F8F9FA;
          border-radius: 12px;
          padding: 12px;
        }

        .landing-page .mockup-book-cover {
          width: 40px;
          height: 56px;
          background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
        }

        .landing-page .mockup-book-info {
          flex: 1;
        }

        .landing-page .mockup-book-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--color-text);
        }

        .landing-page .mockup-book-author {
          font-size: 0.75rem;
          color: var(--color-text-light);
        }

        .landing-page .floating-badge {
          position: absolute;
          background: white;
          padding: 12px 16px;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .landing-page .floating-badge-1 {
          top: 20%;
          right: -20px;
          animation: float 3s ease-in-out infinite;
        }

        .landing-page .floating-badge-2 {
          bottom: 20%;
          left: -30px;
          animation: float 3s ease-in-out infinite 1.5s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 968px) {
          .landing-page .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .landing-page .hero-buttons {
            justify-content: center;
          }

          .landing-page .hero-stats {
            justify-content: center;
          }

          .landing-page .hero-visual {
            display: none;
          }
        }

        /* ============================================
           Features Section
        ============================================ */
        .landing-page .features {
          background: white;
        }

        .landing-page .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 60px;
        }

        .landing-page .section-header h2 {
          margin-bottom: 16px;
          color: var(--color-text);
        }

        .landing-page .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }

        .landing-page .feature-card {
          background: var(--color-background);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .landing-page .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .landing-page .feature-icon {
          width: 64px;
          height: 64px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 20px;
          box-shadow: var(--shadow-sm);
        }

        .landing-page .feature-card h3 {
          margin-bottom: 12px;
          color: var(--color-text);
        }

        .landing-page .feature-card p {
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .landing-page .features-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ============================================
           How It Works Section
        ============================================ */
        .landing-page .how-it-works {
          background: var(--color-background);
        }

        .landing-page .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          position: relative;
        }

        .landing-page .steps::before {
          content: '';
          position: absolute;
          top: 40px;
          left: 12.5%;
          right: 12.5%;
          height: 2px;
          background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          z-index: 0;
        }

        .landing-page .step {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .landing-page .step-number {
          width: 80px;
          height: 80px;
          background: white;
          border: 3px solid var(--color-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 20px;
          box-shadow: var(--shadow-sm);
        }

        .landing-page .step h3 {
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .landing-page .step p {
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .landing-page .steps {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .landing-page .steps::before {
            display: none;
          }
        }

        /* ============================================
           For Parents Section
        ============================================ */
        .landing-page .for-parents {
          background: white;
        }

        .landing-page .split-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .landing-page .split-content.reverse {
          direction: rtl;
        }

        .landing-page .split-content.reverse > * {
          direction: ltr;
        }

        .landing-page .split-image {
          background: var(--color-background);
          border-radius: var(--radius-xl);
          padding: 40px;
          text-align: center;
        }

        .landing-page .split-image-emoji {
          font-size: 8rem;
          line-height: 1;
        }

        .landing-page .split-text h2 {
          margin-bottom: 24px;
        }

        .landing-page .split-text > p {
          font-size: 1.1rem;
          margin-bottom: 32px;
        }

        .landing-page .benefit-list {
          list-style: none;
          margin-bottom: 32px;
        }

        .landing-page .benefit-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }

        .landing-page .benefit-icon {
          width: 28px;
          height: 28px;
          background: rgba(39, 174, 96, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-success);
          flex-shrink: 0;
        }

        .landing-page .benefit-list li span {
          color: var(--color-text);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .landing-page .split-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .landing-page .split-content.reverse {
            direction: ltr;
          }

          .landing-page .split-image {
            order: -1;
          }
        }

        /* ============================================
           For Schools Section
        ============================================ */
        .landing-page .for-schools {
          background: linear-gradient(135deg, #2C3E50 0%, #1A252F 100%);
          color: white;
        }

        .landing-page .for-schools h2 {
          color: white;
        }

        .landing-page .for-schools p {
          color: rgba(255, 255, 255, 0.8);
        }

        .landing-page .for-schools .benefit-list li span {
          color: white;
        }

        .landing-page .for-schools .benefit-icon {
          background: rgba(39, 174, 96, 0.2);
        }

        .landing-page .school-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        .landing-page .school-feature {
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 24px;
          text-align: center;
        }

        .landing-page .school-feature-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }

        .landing-page .school-feature h4 {
          color: white;
          margin-bottom: 8px;
        }

        .landing-page .school-feature p {
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .landing-page .school-features {
            grid-template-columns: 1fr;
          }
        }

        /* ============================================
           CTA Section
        ============================================ */
        .landing-page .cta {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: white;
          text-align: center;
          padding: 100px 0;
        }

        .landing-page .cta h2 {
          color: white;
          margin-bottom: 16px;
        }

        .landing-page .cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .landing-page .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ============================================
           Contact Section
        ============================================ */
        .landing-page .contact {
          background: var(--color-background);
        }

        .landing-page .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .landing-page .contact-info h2 {
          margin-bottom: 16px;
        }

        .landing-page .contact-info > p {
          margin-bottom: 32px;
        }

        .landing-page .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .landing-page .contact-method {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          padding: 20px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s;
        }

        .landing-page .contact-method:hover {
          transform: translateX(5px);
        }

        .landing-page .contact-method-icon {
          width: 48px;
          height: 48px;
          background: rgba(230, 126, 34, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .landing-page .contact-method-label {
          font-size: 0.875rem;
          color: var(--color-text-light);
        }

        .landing-page .contact-method-value {
          font-weight: 700;
          color: var(--color-text);
        }

        @media (max-width: 768px) {
          .landing-page .contact-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="landing-page">
        <LandingHeader />

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <span>🧪</span>
                  <span>Em fase de testes — 100% gratuito!</span>
                </div>

                <h1>Transformar a <span>Leitura</span> numa Aventura</h1>

                <p className="hero-description">
                  O Passaporte do Leitor motiva crianças dos 6 aos 12 anos a desenvolver o hábito da leitura através de
                  streaks, metas diárias e acompanhamento familiar.
                </p>

                <div className="hero-buttons">
                  <a href="/auth" className="btn btn-primary">
                    <span>🚀</span>
                    <span>Começar Grátis</span>
                  </a>
                  <a href="#funcionalidades" className="btn btn-secondary">
                    <span>Saber Mais</span>
                  </a>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <div className="hero-stat-value">100%</div>
                    <div className="hero-stat-label">Gratuito</div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-value">🔥</div>
                    <div className="hero-stat-label">Streaks</div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-value">∞</div>
                    <div className="hero-stat-label">Livros</div>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-mockup">
                  <div className="mockup-header">
                    <div className="mockup-avatar">🐼</div>
                    <div className="mockup-info">
                      <h4>Mafalda</h4>
                      <p>5 livros lidos 📚</p>
                    </div>
                    <div className="mockup-streak">
                      <div className="mockup-streak-value">🔥 12</div>
                      <div className="mockup-streak-label">dias seguidos</div>
                    </div>
                  </div>

                  <div className="mockup-progress">
                    <div className="mockup-progress-header">
                      <span style={{ fontWeight: 700, color: 'var(--color-text)' }}>Leitura de Hoje</span>
                      <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>15/15 min ✅</span>
                    </div>
                    <div className="mockup-progress-bar">
                      <div className="mockup-progress-fill"></div>
                    </div>
                  </div>

                  <div className="mockup-book">
                    <div className="mockup-book-cover">📕</div>
                    <div className="mockup-book-info">
                      <div className="mockup-book-title">Harry Potter e a Pedra Filosofal</div>
                      <div className="mockup-book-author">J.K. Rowling • Pág. 150 de 320</div>
                    </div>
                  </div>
                </div>

                <div className="floating-badge floating-badge-1">
                  <span>🔥</span>
                  <span>Streak: 12 dias!</span>
                </div>

                <div className="floating-badge floating-badge-2">
                  <span>📚</span>
                  <span>5 livros lidos</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features" id="funcionalidades">
          <div className="container">
            <div className="section-header">
              <h2>Funcionalidades que Fazem a Diferença</h2>
              <p>Tudo o que precisa para criar o hábito de leitura nas crianças, com acompanhamento fácil para pais e
                educadores.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⏱️</div>
                <h3>Registo de Leitura</h3>
                <p>As crianças registam facilmente o tempo de leitura diário com um sistema simples e visual. Definam metas
                  personalizadas para cada criança.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔥</div>
                <h3>Streaks & Consistência</h3>
                <p>Sistema de dias consecutivos que motiva a leitura diária. Ver o streak crescer é uma grande motivação para
                  não quebrar a sequência!</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Biblioteca Pessoal</h3>
                <p>Registe todos os livros lidos, em progresso ou na lista de desejos. Adicione reviews e personagens
                  favoritos.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">👨‍👩‍👧‍👦</div>
                <h3>Conta Familiar</h3>
                <p>Uma conta para toda a família. Adicione várias crianças, cada uma com o seu perfil, avatar e progresso
                  individual.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2>Como Funciona</h2>
              <p>Começar é fácil e leva menos de 2 minutos!</p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-number">1️⃣</div>
                <h3>Criar Conta</h3>
                <p>Registe-se gratuitamente e adicione os perfis das crianças.</p>
              </div>

              <div className="step">
                <div className="step-number">2️⃣</div>
                <h3>Definir Metas</h3>
                <p>Configure a meta diária de leitura para cada criança (ex: 15 min/dia).</p>
              </div>

              <div className="step">
                <div className="step-number">3️⃣</div>
                <h3>Registar Leitura</h3>
                <p>A criança regista o tempo lido e os livros que está a ler.</p>
              </div>

              <div className="step">
                <div className="step-number">4️⃣</div>
                <h3>Acompanhar Progresso</h3>
                <p>Veja os streaks crescer e celebre cada livro terminado!</p>
              </div>
            </div>
          </div>
        </section>

        {/* For Parents Section */}
        <section className="for-parents" id="pais">
          <div className="container">
            <div className="split-content">
              <div className="split-image">
                <div className="split-image-emoji">👨‍👩‍👧‍👦</div>
              </div>

              <div className="split-text">
                <h2>Para Pais e Famílias</h2>
                <p>O Passaporte do Leitor foi desenhado para tornar a leitura um momento especial em família, sem stress e com
                  muita diversão.</p>

                <ul className="benefit-list">
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Acompanhe o progresso de todas as crianças num só lugar</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Veja os streaks e metas de leitura de cada filho</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Defina metas personalizadas para cada criança</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Consulte o histórico de livros lidos</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Sem publicidade, sem distrações - foco na leitura</span>
                  </li>
                </ul>

                <a href="/auth" className="btn btn-primary">
                  <span>🏠</span>
                  <span>Criar Conta Familiar</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* For Schools Section */}
        <section className="for-schools" id="escolas">
          <div className="container">
            <div className="split-content reverse">
              <div className="split-image" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="split-image-emoji">🏫</div>
              </div>

              <div className="split-text">
                <h2>Para Escolas e Bibliotecas</h2>
                <p>Leve o Passaporte do Leitor para a sua escola e transforme a cultura de leitura com dados concretos e
                  motivação gamificada.</p>

                <ul className="benefit-list">
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Painel de controlo para professores e bibliotecários</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Acompanhamento do progresso por turma</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Motivação através de streaks e metas de leitura</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Registo de livros lidos pelos alunos</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Integração com bibliotecas escolares</span>
                  </li>
                </ul>

                <a href="#contacto" className="btn btn-outline">
                  <span>📧</span>
                  <span>Contactar para Escolas</span>
                </a>
              </div>
            </div>

            <div className="school-features">
              <div className="school-feature">
                <div className="school-feature-icon">👩‍🏫</div>
                <h4>Gestão de Turmas</h4>
                <p>Crie turmas e adicione alunos facilmente. Cada professor gere as suas turmas.</p>
              </div>

              <div className="school-feature">
                <div className="school-feature-icon">📚</div>
                <h4>Biblioteca Escolar</h4>
                <p>Registe os livros disponíveis e acompanhe o que os alunos estão a ler.</p>
              </div>

              <div className="school-feature">
                <div className="school-feature-icon">🔥</div>
                <h4>Streaks de Turma</h4>
                <p>Motive os alunos com streaks de leitura e celebre as conquistas coletivas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <h2>Pronto para Começar a Aventura?</h2>
            <p>Estamos em fase de testes e a aplicação é totalmente gratuita! Junte-se às primeiras famílias e escolas a
              experimentar.</p>

            <div className="cta-buttons">
              <a href="/auth" className="btn" style={{ background: 'white', color: 'var(--color-primary)' }}>
                <span>🚀</span>
                <span>Experimentar Grátis</span>
              </a>
              <a href="#contacto" className="btn btn-outline">
                <span>📧</span>
                <span>Falar Connosco</span>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contacto">
          <div className="container">
            <div className="contact-content">
              <div className="contact-info">
                <h2>Entre em Contacto</h2>
                <p>Tem dúvidas, sugestões ou quer saber mais sobre o plano escolar? Estamos aqui para ajudar!</p>

                <div className="contact-methods">
                  <a href="mailto:suporte@vamosler.pt" className="contact-method">
                    <div className="contact-method-icon">📧</div>
                    <div>
                      <div className="contact-method-label">Email de Suporte</div>
                      <div className="contact-method-value">suporte@vamosler.pt</div>
                    </div>
                  </a>

                  <a href="mailto:feedback@vamosler.pt" className="contact-method">
                    <div className="contact-method-icon">💡</div>
                    <div>
                      <div className="contact-method-label">Sugestões & Feedback</div>
                      <div className="contact-method-value">feedback@vamosler.pt</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LandingFooter />
      </div>
    </>
  );
}
