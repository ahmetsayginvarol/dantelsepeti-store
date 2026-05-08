import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoriesShowcase from "@/components/home/CategoriesShowcase";
import PromoBanner from "@/components/home/PromoBanner";
import GallerySection from "@/components/home/GallerySection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoriesShowcase />
        <PromoBanner />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
