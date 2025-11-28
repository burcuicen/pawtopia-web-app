import React, { useState } from 'react'
import { showToast } from 'src/utils/toast'

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      showToast.error('Please enter your email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showToast.error('Please enter a valid email address')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      showToast.success('Thank you for subscribing! 🎉')
      setEmail('')
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="font-sans py-24 px-5 bg-gradient-to-br from-accent-bg to-secondary-light relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-[800px] mx-auto bg-white/60 backdrop-blur-lg rounded-[40px] p-8 md:p-16 text-center shadow-xl border border-white relative z-10">
        <div className="mb-10">
          <div className="text-5xl mb-6">💌</div>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-80 mb-4">
            Join Our <span className="text-primary">Community</span>
          </h2>
          <p className="text-lg text-dark-60 max-w-lg mx-auto">
            Subscribe to our newsletter for the latest adoption updates, pet care tips, and heartwarming success stories.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="flex-1 px-6 py-4 rounded-full border-2 border-transparent bg-white shadow-inner text-dark-80 placeholder:text-dark-40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 min-w-[160px]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        
        <p className="text-sm text-dark-40 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}

export default Newsletter
