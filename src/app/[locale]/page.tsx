import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  StatsSection,
  ServicesSection,
  ProductsSection,
  LeadFormSection,
} from "@/components/sections";

interface PageProps {
  params: { locale: string };
}

export async function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Glomix - Global In Minutes | Cloud & AI Transformation",
      description:
        "Glomix provides AWS Managed Services, Cloud Migration and AI Integration for SMEs in Vietnam.",
      openGraph: {
        title: "Glomix - Global In Minutes | Cloud & AI Transformation",
        description:
          "Glomix provides AWS Managed Services, Cloud Migration and AI Integration for SMEs in Vietnam.",
        images: ["/og-image.png"],
      },
    };
  }

  return {
    title: "Glomix - Global In Minutes | Cloud & AI Transformation",
    description:
      "Glomix cung cấp dịch vụ AWS Managed Services, Cloud Migration và AI Integration cho doanh nghiệp vừa và nhỏ tại Việt Nam.",
    openGraph: {
      title: "Glomix - Global In Minutes | Cloud & AI Transformation",
      description:
        "Glomix cung cấp dịch vụ AWS Managed Services, Cloud Migration và AI Integration cho doanh nghiệp vừa và nhỏ tại Việt Nam.",
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <ProductsSection />
        <LeadFormSection />
      </main>
      <Footer />
    </>
  );
}
