import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection, QualificationsSection, ExperienceSection, ServicesSection } from "@/components/Sections";
import { ChambersSection } from "@/components/ChambersSection";
import { ContactSection, Footer } from "@/components/ContactSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { useSiteData } from "@/hooks/use-site-data";

export const metadata = {
  title: "Dr. Barkot Ali - Child Specialist Khulna | Pediatrician",
  description: "Professor Dr. Md. Barkot Ali – Leading Newborn, Child & Adolescent Health Specialist in Khulna. MBBS, DCH, FCPS, FRCPCH. Book appointment now.",
  keywords: "Child Specialist Khulna, Pediatrician Khulna, Dr Barkot Ali, Newborn Care Khulna, Baby Doctor Khulna",
  openGraph: {
    title: "Dr. Barkot Ali - Child Specialist Khulna",
    description: "Leading Newborn, Child & Adolescent Health Specialist in Khulna. Book your appointment today.",
    type: "website",
    images: "https://i.postimg.cc/L56KVndw/Generated-Image-April-16-2026-3-49AM.png",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HomePage() {
  const { data } = useSiteData();

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: data.doctor.name,
    description: data.doctor.intro,
    medicalSpecialty: "Pediatrics",
    image: data.doctor.imageUrl,
    telephone: "+8801784052339",
    address: data.chambers.map((c) => ({
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: "Khulna",
      addressCountry: "BD",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main>
        <HeroSection data={data} />
        <AboutSection data={data} />
        <QualificationsSection data={data} />
        <ExperienceSection data={data} />
        <ServicesSection data={data} />
        <ChambersSection data={data} />
        <ContactSection data={data} />
      </main>
      <Footer data={data} />
      <FloatingWhatsApp phone={data.contact.whatsapp} />
    </>
  );
}
