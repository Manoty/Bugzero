import Navbar               from '../components/layout/Navbar'
import Footer               from '../components/layout/Footer'
import HeroSection          from '../components/home/HeroSection'
import ServicesSection      from '../components/home/ServicesSection'
import WhyUsSection         from '../components/home/WhyUsSection'
import ProcessSection       from '../components/home/ProcessSection'
import PricingSection       from '../components/home/PricingSection'
import TestimonialsSection  from '../components/home/TestimonialsSection'
import CTASection           from '../components/home/CTASection'
import WhatsAppButton       from '../components/ui/WhatsAppButton'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />

      {/* Floating WhatsApp button — sits above everything */}
      <WhatsAppButton />
    </div>
  )
}