import { Article } from '../types';

export const BLOG_POSTS: Article[] = [
  {
    id: 'blog-1',
    title: 'Tối ưu chi phí AWS: 10 chiến lược tiết kiệm hiệu quả cho doanh nghiệp',
    slug: 'toi-uu-chi-phi-aws-10-chien-luoc',
    thumbnailUrl: '/images/blog/blog-1.jpg',
    summary:
      'Khám phá các kỹ thuật thực tiễn giúp doanh nghiệp giảm hóa đơn AWS từ 20–50% mà không ảnh hưởng đến hiệu suất hệ thống.',
    publishedAt: '2026-03-10T08:00:00Z',
    category: 'blog',
  },
  {
    id: 'blog-2',
    title: 'Kiến trúc Serverless trên AWS: Khi nào nên dùng và khi nào nên tránh?',
    slug: 'kien-truc-serverless-aws-nen-dung-khi-nao',
    thumbnailUrl: '/images/blog/blog-2.jpg',
    summary:
      'Phân tích chuyên sâu về mô hình Serverless với AWS Lambda, API Gateway và EventBridge — cùng các trường hợp thực tế nên và không nên áp dụng.',
    publishedAt: '2026-02-25T09:00:00Z',
    category: 'blog',
  },
  {
    id: 'blog-3',
    title: 'Ứng dụng AI/ML trên AWS: Hành trình từ thử nghiệm đến sản xuất',
    slug: 'ung-dung-ai-ml-aws-tu-thu-nghiem-den-san-xuat',
    thumbnailUrl: '/images/blog/blog-3.jpg',
    summary:
      'Hướng dẫn toàn diện về việc triển khai mô hình AI/ML lên môi trường production với Amazon SageMaker, từ huấn luyện, đánh giá đến giám sát liên tục.',
    publishedAt: '2026-01-18T07:00:00Z',
    category: 'blog',
  },
];
