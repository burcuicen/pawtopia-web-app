import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import type { AgeCategory } from './components/range-slider'
import type { ISurveyResult } from 'src/api/interfaces/user'

import { useApi } from 'src/api/api-context'
import { checkLoginStatus } from 'src/helpers/auth'

import { PAW_SEEKER_STEPS, PAW_GUARD_STEPS, OTHER_STEPS } from './constants'

import SurveyLoadingScreen from './components/survey-loading'
import PStepper from 'src/components/p-stepper'
import SurveyCard from './components/survey-card'

import './styles.scss'

interface RegisterInfo {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  userType: string
  country: string
  city: string
}
type ProfileType = 'looking-pet' | 'looking-guardian' | 'other'

const SurveyPage: React.FC = () => {
  const navigate = useNavigate()
  const api = useApi()
  const dispatch = useDispatch()

  const [steps, setSteps] = useState(PAW_SEEKER_STEPS)
  const totalSteps = steps.length
  const [activeStep, setActiveStep] = useState(1)

  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const registerInfo = JSON.parse(localStorage.getItem('registerInfo') as string) as RegisterInfo
    if (registerInfo?.firstName) setFirstName(registerInfo.firstName)
    else navigate('/signup')
  }, [])

  const handleStepChange = (step: number) => {
    if (steps[activeStep - 1].required && !surveyData[steps[activeStep - 1].questionField]) {
      return
    }
    setActiveStep(step)
  }

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleNextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1)
    }
  }

  const [surveyData, setSurveyData] = useState({
    purpose: '' as ProfileType,
    animalPreference: '',
    ageRange: 'adult' as AgeCategory,
    genderPreference: 'male',
    healthStatus: 'healthy',
    animalCareHistory: '',
    reason: ''
  } as unknown as ISurveyResult)

  const setSelectionData = (field: string, data: string | AgeCategory) => {
    setSurveyData(prevData => ({ ...prevData, [field]: data }))
  }

  useEffect(() => {
    switch (surveyData.purpose) {
      case 'looking-pet':
        setSteps(PAW_SEEKER_STEPS)
        break
      case 'looking-guardian':
        setSteps(PAW_GUARD_STEPS)
        break
      case 'other':
        setSteps(OTHER_STEPS)
        break
      default:
        break
    }
  }, [surveyData.purpose])

  const handleSurveySubmit = async () => {
    setIsLoading(true)

    const storedRegisterInfo = JSON.parse(localStorage.getItem('registerInfo') as string) as RegisterInfo
    const { username, email, firstName, lastName, password, city, country } = storedRegisterInfo
    const { purpose, ageRange, animalPreference, genderPreference, healthStatus, animalCareHistory, reason } = surveyData

    const preparedSurveyData: ISurveyResult = {
      purpose,
      ageRange,
      animalPreference,
      genderPreference,
      healthStatus
    }

    if (surveyData.animalCareHistory) preparedSurveyData.animalCareHistory = animalCareHistory

    if (surveyData.reason) preparedSurveyData.reason = reason

    const body = {
      username,
      email,
      firstName,
      lastName,
      password,
      city,
      country,
      surveyResults: preparedSurveyData
    }

    const { err, res } = await api.auth.register(body)

    if (err) {
      console.error('Error submitting survey:', err)
      return
    }

    setIsSuccess(true)

    await login(storedRegisterInfo.username, storedRegisterInfo.password)
  }
  async function login(username: string, password: string) {
    const { err, res } = await api.auth.login({ username, password })
    if (err) return

    const { token } = res?.data as { token: string }

    localStorage.setItem('token', token)

    await checkLoginStatus(dispatch, api)
    navigate('/')
  }

  const handleNext = () => {
    if (steps[activeStep - 1].required && !surveyData[steps[activeStep - 1].questionField]) {
      return
    }
    if (activeStep === totalSteps) {
      handleSurveySubmit()
    } else {
      handleNextStep()
    }
  }
  return (
    <div className="page page__survey">
      {isLoading ? (
        <SurveyLoadingScreen profileType={surveyData.purpose as ProfileType} />
      ) : (
        <div className="page__survey-heading">
          <PStepper steps={totalSteps} activeStep={activeStep} onStepChange={handleStepChange} />

          <div className="page__survey-title">Hello, {firstName}</div>
          <div className="page__survey-subtitle">Welcome to the Pawtopia family! Where paws and hearts meet. Let's get to know you a bit better!</div>
          <div className="page__survey-card">
            <SurveyCard
              cardData={steps[activeStep - 1]}
              setData={setSelectionData}
              selectedAnswers={surveyData}
              onPrev={handlePrevStep}
              onNext={handleNext}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SurveyPage
