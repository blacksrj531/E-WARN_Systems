import { HeroSection } from '../components/layout/HeroSection';
import { FeaturesSection } from '../components/layout/FeaturesSection';
import { ProductGrid } from '../components/products/ProductGrid';

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ProductGrid />
    </main>
  );
};
