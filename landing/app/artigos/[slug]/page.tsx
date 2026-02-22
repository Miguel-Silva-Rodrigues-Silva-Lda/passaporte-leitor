import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} - Vamos Ler`,
    description: article.description,
    alternates: {
      canonical: `https://vamosler.pt/artigos/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `https://vamosler.pt/artigos/${slug}`,
      siteName: 'Vamos Ler',
      locale: 'pt_PT',
      publishedTime: article.date,
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />

      <section className="content-section">
        <div className="container">
          <div className="content-card article-content">
            <Link href="/artigos" className="article-back">← Voltar aos artigos</Link>
            <h1>{article.title}</h1>
            <p className="updated-date">{formatDate(article.date)}</p>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
