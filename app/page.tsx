

import { HeroSection } from '@/components/layout/HeroSection';
import { ScrollGlobe } from '@/components/3d/ScrollGlobe';
import { StatsSection } from '@/components/layout/StatsSection';
import { VideoSection } from '@/components/layout/VideoSection';

export default function HomePage() {
  return (
    <main className="w-full bg-[#08090C] text-white relative overflow-x-hidden">
      {/* Fixed globe that travels from hero box to next section on scroll */}
      <ScrollGlobe />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section — globe lands here */}
      <StatsSection />

      {/* Video Section — immersive expansion when globe drops */}
      <VideoSection />
    </main>
  );
}
