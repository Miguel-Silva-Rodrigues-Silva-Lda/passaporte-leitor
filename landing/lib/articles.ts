import fs from 'fs';
import path from 'path';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

const articlesDirectory = path.join(process.cwd(), 'content/artigos');

function normalizeDateOrFallback(dateStr: string | undefined, fallback: Date): string {
  if (dateStr && dateStr.trim()) {
    const parsed = new Date(dateStr);
    if (!Number.isNaN(parsed.getTime())) {
      return dateStr;
    }
  }
  return fallback.toISOString();
}

function parseFrontmatter(fileContent: string): { data: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const data: Record<string, string> = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });

  return { data, content: match[2].trim() };
}

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Paragraphs
  html = html
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h')) return block;
      return `<p>${block}</p>`;
    })
    .filter(Boolean)
    .join('\n');

  return html;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) return [];

  const files = fs.readdirSync(articlesDirectory).filter(f => f.endsWith('.md'));

  const articles = files.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(articlesDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);
    const stats = fs.statSync(filePath);
    const date = normalizeDateOrFallback(data.date, stats.mtime);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date,
      content: markdownToHtml(content),
    };
  });

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const stats = fs.statSync(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontmatter(fileContent);
  const date = normalizeDateOrFallback(data.date, stats.mtime);

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date,
    content: markdownToHtml(content),
  };
}
