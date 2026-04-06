import { Service } from '@/types';

export const services: Service[] = [
  {
    id: '1',
    slug: 'aws-windows-rapid-migration',
    name: 'AWS Windows Rapid Migration',
    shortDescription: 'Di chuyển hệ thống Windows lên AWS nhanh chóng và an toàn với quy trình được tối ưu hóa.',
    fullDescription:
      'Dịch vụ AWS Windows Rapid Migration giúp doanh nghiệp di chuyển toàn bộ hệ thống Windows Server, Active Directory và các ứng dụng Windows lên AWS một cách nhanh chóng, an toàn và hiệu quả. Chúng tôi sử dụng các công cụ tự động hóa và phương pháp luận đã được kiểm chứng để giảm thiểu thời gian downtime và rủi ro trong quá trình migration.',
    icon: 'Server',
  },
  {
    id: '2',
    slug: 'aws-managed-services',
    name: 'AWS Managed Services',
    shortDescription: 'Quản lý và vận hành hạ tầng AWS toàn diện, giúp doanh nghiệp tập trung vào kinh doanh cốt lõi.',
    fullDescription:
      'AWS Managed Services cung cấp dịch vụ quản lý hạ tầng đám mây toàn diện bao gồm giám sát 24/7, vá lỗi bảo mật, tối ưu hiệu suất và hỗ trợ kỹ thuật. Đội ngũ chuyên gia của chúng tôi đảm bảo hệ thống AWS của bạn luôn hoạt động ổn định, bảo mật và tuân thủ các tiêu chuẩn tốt nhất.',
    icon: 'Settings',
  },
  {
    id: '3',
    slug: 'aws-cost-optimization',
    name: 'AWS Cost Optimization',
    shortDescription: 'Tối ưu hóa chi phí AWS, giúp doanh nghiệp tiết kiệm đáng kể mà không ảnh hưởng đến hiệu suất.',
    fullDescription:
      'Dịch vụ AWS Cost Optimization phân tích toàn diện việc sử dụng tài nguyên AWS của doanh nghiệp, xác định các cơ hội tiết kiệm chi phí và triển khai các giải pháp tối ưu như Reserved Instances, Savings Plans, rightsizing và loại bỏ tài nguyên không sử dụng. Chúng tôi cam kết giúp bạn giảm chi phí AWS từ 20-40%.',
    icon: 'DollarSign',
  },
  {
    id: '4',
    slug: 'aws-lift',
    name: 'AWS Lift',
    shortDescription: 'Nâng cấp và hiện đại hóa ứng dụng lên AWS với chiến lược Lift & Shift hoặc Lift & Optimize.',
    fullDescription:
      'AWS Lift là dịch vụ chuyên biệt giúp doanh nghiệp di chuyển ứng dụng lên AWS theo chiến lược phù hợp nhất. Từ Lift & Shift đơn giản đến Lift & Optimize nâng cao, chúng tôi đảm bảo ứng dụng của bạn tận dụng tối đa các lợi thế của đám mây AWS như khả năng mở rộng, độ tin cậy cao và hiệu suất vượt trội.',
    icon: 'Layers',
  },
  {
    id: '5',
    slug: 'aws-billing',
    name: 'AWS Billing',
    shortDescription: 'Quản lý và tối ưu hóa hóa đơn AWS, cung cấp báo cáo chi phí chi tiết và minh bạch.',
    fullDescription:
      'Dịch vụ AWS Billing giúp doanh nghiệp kiểm soát và quản lý chi phí AWS một cách hiệu quả. Chúng tôi cung cấp dashboard theo dõi chi phí thời gian thực, phân bổ chi phí theo dự án/phòng ban, cảnh báo ngân sách và báo cáo chi tiết giúp ban lãnh đạo đưa ra quyết định tài chính chính xác.',
    icon: 'CreditCard',
  },
  {
    id: '6',
    slug: 'aws-landing-zone',
    name: 'AWS Landing Zone',
    shortDescription: 'Thiết lập môi trường AWS đa tài khoản chuẩn hóa, bảo mật và tuân thủ ngay từ đầu.',
    fullDescription:
      'AWS Landing Zone giúp doanh nghiệp xây dựng nền tảng AWS vững chắc với kiến trúc đa tài khoản được chuẩn hóa. Chúng tôi thiết lập các guardrails bảo mật, chính sách quản trị, logging tập trung và mạng lưới kết nối an toàn, tạo nền tảng vững chắc cho hành trình chuyển đổi số của doanh nghiệp.',
    icon: 'Building2',
  },
  {
    id: '7',
    slug: 'aws-well-architected',
    name: 'AWS Well-Architected',
    shortDescription: 'Đánh giá và cải thiện kiến trúc AWS theo 6 trụ cột của AWS Well-Architected Framework.',
    fullDescription:
      'Dịch vụ AWS Well-Architected Review giúp doanh nghiệp đánh giá toàn diện kiến trúc hệ thống AWS theo 6 trụ cột: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization và Sustainability. Chúng tôi cung cấp báo cáo chi tiết và lộ trình cải thiện cụ thể để nâng cao chất lượng hệ thống.',
    icon: 'CheckCircle',
  },
  {
    id: '8',
    slug: 'aws-cloud-education',
    name: 'AWS Cloud Computing for Education',
    shortDescription: 'Giải pháp đám mây AWS chuyên biệt cho ngành giáo dục, hỗ trợ học tập và nghiên cứu trực tuyến.',
    fullDescription:
      'AWS Cloud Computing for Education cung cấp các giải pháp đám mây được thiết kế riêng cho các trường đại học, cao đẳng và tổ chức giáo dục. Từ hạ tầng e-learning, hệ thống quản lý học tập đến môi trường nghiên cứu HPC, chúng tôi giúp các tổ chức giáo dục tận dụng sức mạnh của AWS để nâng cao chất lượng đào tạo.',
    icon: 'GraduationCap',
  },
  {
    id: '9',
    slug: 'data-strategy',
    name: 'Data Strategy',
    shortDescription: 'Xây dựng chiến lược dữ liệu toàn diện, từ thu thập, lưu trữ đến phân tích và khai thác giá trị.',
    fullDescription:
      'Dịch vụ Data Strategy giúp doanh nghiệp xây dựng nền tảng dữ liệu vững chắc trên AWS. Chúng tôi tư vấn và triển khai kiến trúc Data Lake, Data Warehouse, ETL pipelines và các giải pháp analytics tiên tiến. Từ chiến lược đến thực thi, chúng tôi đồng hành cùng doanh nghiệp trong hành trình trở thành tổ chức dựa trên dữ liệu.',
    icon: 'Database',
  },
  {
    id: '10',
    slug: 'generative-ai',
    name: 'Generative AI',
    shortDescription: 'Tích hợp và triển khai các giải pháp AI tạo sinh, giúp doanh nghiệp đổi mới và tăng năng suất.',
    fullDescription:
      'Dịch vụ Generative AI giúp doanh nghiệp khai thác sức mạnh của trí tuệ nhân tạo tạo sinh thông qua nền tảng AWS Bedrock và các mô hình AI tiên tiến. Chúng tôi tư vấn, xây dựng và triển khai các ứng dụng AI như chatbot thông minh, tự động hóa nội dung, phân tích tài liệu và các giải pháp AI tùy chỉnh phù hợp với nhu cầu kinh doanh.',
    icon: 'Brain',
  },
  {
    id: '11',
    slug: 'ai-integration',
    name: 'AI Integration Services',
    shortDescription: 'Tích hợp AI vào quy trình vận hành — LLM, Chatbot nội bộ, tự động hóa văn bản cho SME.',
    fullDescription:
      'AI Integration Services giúp doanh nghiệp vừa và nhỏ ứng dụng trí tuệ nhân tạo vào hoạt động thực tế. Chúng tôi triển khai các giải pháp LLM (Large Language Model), xây dựng Chatbot nội bộ thông minh, tự động hóa quy trình xử lý văn bản và tích hợp AI vào hệ thống hiện có. Với chi phí hợp lý và thời gian triển khai nhanh, SME có thể tận dụng sức mạnh AI ngay hôm nay.',
    icon: 'Brain',
  },
  {
    id: '12',
    slug: 'aws-managed-services',
    name: 'AWS Managed Services & Cloud Migration',
    shortDescription: 'Quản trị AWS toàn diện và di chuyển hạ tầng lên cloud — giảm 30–50% chi phí, CI/CD tự động, hỗ trợ 24/7.',
    fullDescription:
      'Dịch vụ AWS Managed Services & Cloud Migration của Glomix giúp SME tối ưu hạ tầng AWS toàn diện. Chúng tôi đảm nhận toàn bộ việc quản trị, giám sát 24/7, thiết lập CI/CD tự động và di chuyển hệ thống lên cloud an toàn. Cam kết giảm 30–50% chi phí vận hành so với on-premise.',
    icon: 'Server',
  },
];
