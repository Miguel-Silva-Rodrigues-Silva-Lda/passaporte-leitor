import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Cookies | Passaporte do Leitor',
  description: 'Política de Cookies do Passaporte do Leitor. Saiba como utilizamos cookies para garantir uma melhor experiência de utilizador.',
  alternates: {
    canonical: 'https://vamosler.pt/cookies',
  },
};

export default function CookiesPolicy() {
  return (
    <>
      <Header />

      <section className="content-section">
        <div className="container">
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
        </div>
      </section>

      <Footer />
    </>
  );
}
