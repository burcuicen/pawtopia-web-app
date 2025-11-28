import React from 'react'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or breed..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-6 py-4 pl-14 rounded-full border-2 border-dark-10 bg-white shadow-lg text-dark-80 placeholder:text-dark-40 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-dark-40 text-xl">
          🔍
        </div>
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-dark-40 hover:text-dark-80 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
