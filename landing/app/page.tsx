import Header from '@/components/Header';
import Footer from '@/components/Footer';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.vamosler.pt';

export default function Home() {
  return (
    <>
      <Header />

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
                <a href={`${APP_URL}/auth`} className="btn btn-primary">
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

              <a href={`${APP_URL}/auth`} className="btn btn-primary">
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
            <a href={`${APP_URL}/auth`} className="btn" style={{ background: 'white', color: 'var(--color-primary)' }}>
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

      <Footer />
    </>
  );
}
