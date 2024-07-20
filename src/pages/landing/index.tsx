import React from 'react'

import './styles.scss'
import BaseButton from 'src/components/_base/base-button'
const Landing: React.FC = () => {
  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__hero-content">
          <div className="landing__hero-title">
            <div className="landing__hero-title landing__hero-title-1">One More Friend</div>
            <div className="landing__hero-title landing__hero-title-2">Thousands more fun!</div>
          </div>
          <div className="landing__hero-subtitle">
            Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </div>
          <div className="landing__hero-actions">
            <BaseButton title="View Intro" type="outline" />
            <BaseButton title="Explore Now" type="default" />
          </div>
        </div>
        <div className="landing__hero-image">
          <img src={require('../../assets/hero-img.png')} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Landing
