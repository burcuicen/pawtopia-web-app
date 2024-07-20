import React, { useEffect, useState } from 'react'
import '../styles.scss'
import BaseIcon from 'src/components/_base/base-icon'

type ProfileType = 'looking-pet' | 'looking-guardian' | 'other'

interface SurveyLoadingScreenProps {
  profileType: ProfileType
}

const SurveyLoadingScreen: React.FC<SurveyLoadingScreenProps> = ({ profileType }) => {
  const getSubtitle = () => {
    switch (profileType) {
      case 'looking-pet':
        return "Hang tight while we fetch the purr-fect companions for you! You're just a whisker away from meeting your ideal paw friend."
      case 'looking-guardian':
        return 'Hang tight while we create a sample listing for your paw friend looking for its forever home!'
      default:
        return 'Hang tight while we are personalizing the Pawtopia world for you'
    }
  }

  return (
    <div className="page__survey-loading">
      <div className="page__survey-title">Thank You for Your Paw-ticipation!</div>
      <div className="page__survey-subtitle">{getSubtitle()}</div>
      <img src={require('src/assets/person-with-cat.svg').default} alt="Pawtopia" />
      <div className="page__survey-loading-animation">
        <div className="paw-container">
          <div className="paw paw-1">
            <BaseIcon icon="mdi:paw" width={18} height={18} />
          </div>
          <div className="paw paw-2">
            <BaseIcon icon="mdi:paw" width={18} height={18} />
          </div>
          <div className="paw paw-3">
            <BaseIcon icon="mdi:paw" width={18} height={18} />
          </div>
        </div>
        <div className="page__survey-loading-animation-text">Loading...</div>
      </div>
    </div>
  )
}

export default SurveyLoadingScreen
