export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-r from-blue-600 to-blue-800"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Sẵn sàng Lên mây cùng OSAM?
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
          Đội ngũ chuyên gia của chúng tôi sẵn sàng đồng hành cùng bạn trên hành trình chuyển đổi
          số và tối ưu hóa hạ tầng đám mây AWS.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contact@osam.vn"
            aria-label="Liên hệ với OSAM qua email"
            className="inline-flex items-center justify-center bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Liên hệ ngay
          </a>
          <a
            href="#services"
            aria-label="Tìm hiểu thêm về các dịch vụ của OSAM"
            className="inline-flex items-center justify-center border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </div>
    </section>
  );
}
