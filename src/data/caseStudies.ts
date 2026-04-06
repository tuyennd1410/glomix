import { CaseStudy } from '@/types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'vimeeting-plus',
    clientName: 'ViMeeting+',
    logoUrl: '/images/clients/vimeeting.png',
    industry: 'SaaS',
    challenge:
      'ViMeeting+ đang vận hành hạ tầng on-premise với chi phí vận hành cao và khó mở rộng khi lượng người dùng tăng đột biến trong các giờ cao điểm. Hệ thống thường xuyên gặp tình trạng quá tải, ảnh hưởng đến trải nghiệm hội nghị trực tuyến của khách hàng doanh nghiệp.',
    solution:
      'OSAM thực hiện di chuyển toàn bộ hạ tầng lên AWS sử dụng phương pháp Lift & Shift kết hợp với AWS Managed Services. Triển khai Auto Scaling Group để tự động điều chỉnh tài nguyên theo nhu cầu thực tế, đồng thời thiết lập AWS Landing Zone chuẩn hóa môi trường đa tài khoản.',
    result:
      'Giảm 40% chi phí hạ tầng hàng tháng, đảm bảo uptime 99.9% và khả năng mở rộng tức thì khi có sự kiện lớn. Thời gian triển khai tính năng mới giảm từ 2 tuần xuống còn 2 ngày nhờ CI/CD pipeline trên AWS.',
    services: ['aws-lift', 'aws-managed-services', 'aws-landing-zone', 'aws-cost-optimization'],
  },
  {
    id: 'maxcom-aigenx',
    clientName: 'MaxcomGroup / AIGENX',
    logoUrl: '/images/clients/maxcom-aigenx.png',
    industry: 'AI',
    challenge:
      'MaxcomGroup cần xây dựng nền tảng AI tổng hợp AIGENX phục vụ hàng nghìn doanh nghiệp đồng thời, đòi hỏi hạ tầng GPU mạnh mẽ, độ trễ thấp và khả năng tích hợp các mô hình ngôn ngữ lớn (LLM) một cách linh hoạt. Chi phí đầu tư phần cứng ban đầu là rào cản lớn.',
    solution:
      'OSAM tư vấn và triển khai kiến trúc Generative AI trên AWS sử dụng Amazon Bedrock và SageMaker. Xây dựng data strategy toàn diện để quản lý dữ liệu huấn luyện, kết hợp AWS Cost Optimization để tối ưu chi phí GPU theo mô hình spot instance.',
    result:
      'Ra mắt nền tảng AIGENX trong vòng 3 tháng với chi phí đầu tư ban đầu giảm 60% so với phương án on-premise. Hệ thống xử lý hơn 500.000 yêu cầu AI mỗi ngày với độ trễ trung bình dưới 2 giây.',
    services: ['generative-ai', 'data-strategy', 'aws-cost-optimization', 'aws-managed-services'],
  },
  {
    id: 'meeyland',
    clientName: 'Meeyland',
    logoUrl: '/images/clients/meeyland.png',
    industry: 'PropTech',
    challenge:
      'Meeyland - nền tảng bất động sản hàng đầu Việt Nam - đang gặp khó khăn với hệ thống cũ chạy trên Windows Server, khó bảo trì và không đáp ứng được tốc độ tăng trưởng 200% người dùng mỗi năm. Dữ liệu bất động sản phân tán, thiếu khả năng phân tích real-time.',
    solution:
      'OSAM thực hiện AWS Windows Rapid Migration để chuyển đổi toàn bộ hệ thống Windows Server lên AWS trong thời gian ngắn nhất. Đồng thời xây dựng data platform trên AWS để tổng hợp và phân tích dữ liệu bất động sản theo thời gian thực.',
    result:
      'Hoàn thành migration trong 6 tuần, giảm thiểu downtime xuống dưới 4 giờ. Hiệu năng hệ thống tăng 3 lần, chi phí vận hành giảm 35%. Nền tảng phân tích dữ liệu mới giúp tăng tỷ lệ chuyển đổi khách hàng lên 25%.',
    services: ['aws-windows-rapid-migration', 'data-strategy', 'aws-managed-services', 'aws-well-architected'],
  },
  {
    id: 'masan',
    clientName: 'Masan',
    logoUrl: '/images/clients/masan.png',
    industry: 'FMCG',
    challenge:
      'Masan Group với hệ sinh thái đa ngành cần tối ưu hóa chi phí cloud đang tăng nhanh do mở rộng kinh doanh. Các đơn vị thành viên sử dụng AWS riêng lẻ, thiếu quản trị tập trung dẫn đến lãng phí tài nguyên và khó kiểm soát ngân sách IT.',
    solution:
      'OSAM triển khai AWS Landing Zone để chuẩn hóa quản trị đa tài khoản cho toàn bộ tập đoàn. Thực hiện AWS Cost Optimization audit toàn diện, thiết lập AWS Billing consolidation và xây dựng chính sách tagging để phân bổ chi phí chính xác theo từng đơn vị kinh doanh.',
    result:
      'Tiết kiệm 45% chi phí AWS hàng năm tương đương hàng tỷ đồng. Visibility chi phí tăng 100% với dashboard real-time theo từng business unit. Thời gian onboard đơn vị thành viên mới lên AWS giảm từ 3 tháng xuống còn 2 tuần.',
    services: ['aws-landing-zone', 'aws-cost-optimization', 'aws-billing', 'aws-managed-services'],
  },
  {
    id: 'de-heus',
    clientName: 'De Heus',
    logoUrl: '/images/clients/de-heus.png',
    industry: 'Agriculture',
    challenge:
      'De Heus Việt Nam - tập đoàn thức ăn chăn nuôi hàng đầu - cần số hóa chuỗi cung ứng và quản lý dữ liệu từ hàng trăm trang trại đối tác trên toàn quốc. Hệ thống ERP cũ không tích hợp được với các thiết bị IoT và thiếu khả năng phân tích dự báo.',
    solution:
      'OSAM tư vấn chiến lược dữ liệu và triển khai data platform trên AWS, tích hợp dữ liệu IoT từ trang trại với hệ thống ERP. Áp dụng AWS Well-Architected Framework để đảm bảo hệ thống đáp ứng các tiêu chuẩn bảo mật và độ tin cậy của tập đoàn quốc tế.',
    result:
      'Tích hợp thành công dữ liệu từ 300+ trang trại đối tác, giảm 30% thất thoát trong chuỗi cung ứng. Hệ thống dự báo nhu cầu thức ăn chăn nuôi đạt độ chính xác 92%, giúp tối ưu hóa sản xuất và giảm tồn kho 20%.',
    services: ['data-strategy', 'aws-well-architected', 'aws-managed-services', 'aws-cloud-education'],
  },
  {
    id: 'urbox',
    clientName: 'Urbox',
    logoUrl: '/images/clients/urbox.png',
    industry: 'Loyalty Platform',
    challenge:
      'Urbox - nền tảng loyalty và gifting B2B hàng đầu Việt Nam - đang phục vụ hàng triệu end-user thông qua các doanh nghiệp đối tác. Hệ thống gặp khó khăn trong việc xử lý các đợt tăng tải đột biến vào dịp lễ tết và cần đảm bảo tính bảo mật cao cho dữ liệu giao dịch.',
    solution:
      'OSAM thực hiện Well-Architected Review toàn diện và tái kiến trúc hệ thống theo microservices trên AWS. Triển khai AWS Managed Services để đảm bảo vận hành 24/7, kết hợp chương trình AWS Cloud Education để nâng cao năng lực đội ngũ kỹ thuật nội bộ của Urbox.',
    result:
      'Hệ thống xử lý thành công các đợt tăng tải 10x trong dịp Tết Nguyên Đán mà không có sự cố. Điểm bảo mật theo AWS Security Hub tăng từ 65% lên 94%. Đội ngũ kỹ thuật Urbox đạt 5 chứng chỉ AWS sau chương trình đào tạo.',
    services: ['aws-well-architected', 'aws-managed-services', 'aws-cloud-education', 'aws-cost-optimization'],
  },
];
