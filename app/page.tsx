import ProductDetailSection from "@/components/ProductDetailSection";
import LipcareSection from "@/components/LipcareSection";
import CustomerReviewsSection from "@/components/CustomerReviewsSection";
import LipcareStory from "@/components/LipcareStory";
import HeroSection from "@/components/banner";


export default function HomePage() {
  return (
    <main>
      <ProductDetailSection />
       <LipcareSection />
      <CustomerReviewsSection />
      <LipcareStory />
      <HeroSection />
     
    </main>
  );
}
