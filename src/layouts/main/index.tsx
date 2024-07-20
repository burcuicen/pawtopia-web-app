import React from 'react'

import PHeader from 'src/components/p-header'
import PFooter from 'src/components/p-footer'

import './styles.scss'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <PHeader />
      <main>{children}</main>
      <PFooter />
    </div>
  )
}

export default MainLayout
