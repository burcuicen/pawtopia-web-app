import React from 'react'

const Profile: React.FC = () => {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-accent-bg to-white py-12 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-dark-80 mb-4">
            My <span className="text-primary">Profile</span>
          </h1>
          <p className="text-lg text-dark-60">Manage your account settings</p>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
          <div className="text-6xl mb-6">👤</div>
          <h2 className="text-2xl font-bold text-dark-80 mb-4">Profile Page</h2>
          <p className="text-dark-60">
            Profile management features coming soon!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
