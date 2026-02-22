import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Artigos - Vamos Ler',
  description: 'Dicas e guias práticos para criar o hábito de leitura nas crianças.',
  alternates: {
    canonical: 'https://vamosler.pt/artigos',
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <Header />

      <section className="content-section">
        <div className="container">
          <div className="articles-header">
            <h1>Artigos</h1>
            <p>Dicas e guias práticos para criar o hábito de leitura nas crianças.</p>
          </div>

          <div className="articles-list">
            {articles.map(article => (
              <Link key={article.slug} href={`/artigos/${article.slug}`} className="article-card">
                <div className="article-card-content">
                  <span className="article-card-date">{formatDate(article.date)}</span>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <span className="article-card-link">Ler artigo →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
