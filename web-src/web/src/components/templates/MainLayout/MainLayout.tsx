import Header from "@/components/06.organisms/01.Header/Header"
import Hero from "@/components/06.organisms/02.Hero/Hero";
import styles from "./MainLayout.module.scss";
import HospitalityText from "@/components/06.organisms/03.HospitalitySection/HospitalityText";
import ConceptSection from "@/components/06.organisms/04.ConceptSection/ConceptSection";
import {SalonGallerySection } from "@/components/06.organisms/05.SalonGallerySection/SalonGallerySection";
import OwnerSection from "@/components/06.organisms/07.OwnerSection/OwnerSection";
import { StyleGuideTeaser } from "@/components/06.organisms/08.StyleGuideTeaser/StyleGuideTeaser";
import MenuSection from "@/components/06.organisms/09.MenuSection/MenuSection";
import VoiceSection from "@/components/06.organisms/10.VoiceSection/VoiceSection";
import NewsletterBanner from "@/components/06.organisms/11.NewsletterSection/NewsletterSection";
import ReservationSection from "@/components/06.organisms/12.ReservationSection/ReservationSection";
import SalonInfoSection from "@/components/06.organisms/13.SalonInfoSection";
import Footer from "@/components/06.organisms/14.Footer/Footer";
// import SalonInfoSection from "@/components/test/SalonInfoSection";
// import RefactedReservationForm from "@/components/refactoring/Reservavation/ver1-refactored_ReservationForm/RefactedReservationForm";


// Placeholder — assemble all section organisms here as you build them
export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Hero />
        <HospitalityText />
        <ConceptSection />
        <SalonGallerySection />
        <OwnerSection />
        <StyleGuideTeaser />
        <MenuSection />
        <VoiceSection />
        <NewsletterBanner />
        <ReservationSection />
        <SalonInfoSection />
        <Footer />
      </main>
    </>
  );
};

