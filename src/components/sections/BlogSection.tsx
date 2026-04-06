import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogPosts';

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white hover:shadow-lg transition-shadow">
              {/* Placeholder thumbnail */}
              <div className="relative bg-gray-200 w-full h-[250px] flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center px-4">{article.title}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {article.summary.length > 120
                    ? article.summary.slice(0, 120) + '…'
                    : article.summary}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
