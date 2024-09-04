import React from 'react'
import HeroComponent from '../../components/Hero'
import FeatureSection from '../../components/FeatureSection'
import DryShop from '../../components/DryShop'
import Feature from '../../components/Feature'
import WetShop from '../../components/WetShop'
import BannerSection from '../../components/BannerSection'
import BestSellerProduct from '../../components/BestSellerProduct'
import Fact from '../../components/Fact'

import TestimonialComponent from '../../components/TestimonialComponent'
import useScrollToTop from '../../hooks/useScrollToTop'

const HomePage = () => {
  useScrollToTop()

  return (
    <div>
      <HeroComponent></HeroComponent>
      <FeatureSection></FeatureSection>
      <DryShop></DryShop>
      <Feature></Feature>
      <WetShop></WetShop>
      <BannerSection></BannerSection>
      <BestSellerProduct></BestSellerProduct>
      <Fact></Fact>
      <TestimonialComponent></TestimonialComponent>

    </div>
  )
}

export default HomePage