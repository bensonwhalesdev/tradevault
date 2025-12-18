
import Footer from './(Home)/components/Footer'
import GetStartedSection from './(Home)/components/GetStartedSection'
import HeroSection from './(Home)/components/HeroSection'
import MarketSection from './(Home)/components/MarketSection'
import Navbar from './(Home)/components/Navbar'
import RapidWithdrawSection from './(Home)/components/RapidWithdrawSection'
import ReviewSection from './(Home)/components/ReviewSection'
import WhyChooseUs from './(Home)/components/WhyChooseUs'

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <MarketSection />
      <ReviewSection />
      <GetStartedSection />
      <RapidWithdrawSection />
      <Footer />
    </div>
  )
}

export default page