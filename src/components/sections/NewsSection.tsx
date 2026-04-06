import { NEWS } from '@/data/news';

export default function NewsSection() {
  return (
    <section id="news" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Tin tức &amp; Sự kiện</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((article) => (
            <div key={article.id} className="rounded-lg overflow-hidden shadow-md border border-gray-100">
              {/* Placeholder thumbnail */}
              <div className="relative bg-gray-200 w-full h-[250px] flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center px-4">{article.title}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
