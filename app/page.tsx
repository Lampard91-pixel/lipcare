"use client";

import Banner from "@/components/banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import IngredientSpotlight from "@/components/IngredientSpotlight";
import LipCareRoutine from "@/components/LipCareRoutine";
import ShopByCategory from "@/components/ShopByCategory";
import SocialFeed from "@/components/SocialFeed";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedProducts />
      <WhyChooseUs />
      <ShopByCategory />
      <LipCareRoutine />
      <IngredientSpotlight />
      <Testimonials />
      <SocialFeed />
    </main>
  );
}