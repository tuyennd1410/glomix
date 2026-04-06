const highlights = [
  { label: 'AWS Partner', icon: '☁️' },
  { label: '100+ SME', icon: '🏢' },
  { label: 'Cloud & AI Expert', icon: '🤖' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Về Glomix</h2>
          <p className="text-xl text-blue-600 font-medium mb-6">
            Đối tác AWS chuyên biệt cho doanh nghiệp vừa và nhỏ tại Việt Nam
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Glomix (glomix.cloud) chuyên cung cấp dịch vụ AWS Managed Services, Cloud Migration và
            AI Integration cho SME tại Việt Nam. Chúng tôi giúp doanh nghiệp tối ưu chi phí hạ
            tầng, tăng tốc triển khai và ứng dụng AI vào quy trình vận hành.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center p-6 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-3" aria-hidden="true">{item.icon}</span>
              <span className="text-gray-800 font-semibold text-lg text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
