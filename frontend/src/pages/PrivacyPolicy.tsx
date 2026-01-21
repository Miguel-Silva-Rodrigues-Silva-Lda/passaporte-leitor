import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import LandingStyles from '../components/LandingStyles';
import { PageMeta } from '../components/PageMeta';

export default function PrivacyPolicy() {
  return (
    <>
      <PageMeta
        title="Política de Privacidade"
        description="Política de Privacidade do Passaporte do Leitor. Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais em conformidade com o RGPD."
        ogUrl="https://vamosler.pt/privacidade"
      />
      <LandingStyles />

      <div className="landing-page">
        <LandingHeader />

        <section className="content-section">
          <div className="container">
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
          </div>
        </section>

        <LandingFooter />
      </div>
    </>
  );
}
