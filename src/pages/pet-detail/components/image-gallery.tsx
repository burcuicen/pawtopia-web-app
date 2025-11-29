import React, { useState } from 'react'

interface ImageGalleryProps {
  photos: string[]
  name: string
  animalType: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, name, animalType }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const getPlaceholderImage = () => {
    const images = {
      cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      dog: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      other: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800',
    }
    return images[animalType as keyof typeof images] || images.other
  }

  const displayPhotos = photos && photos.length > 0 ? photos : [getPlaceholderImage()]

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
      {/* Main Image */}
      <div className="relative h-96 bg-dark-10">
        <img
          src={displayPhotos[selectedIndex]}
          alt={`${name} - ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {displayPhotos.length > 1 && (
        <div className="p-4 flex gap-3 overflow-x-auto">
          {displayPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? 'border-primary scale-110'
                  : 'border-transparent hover:border-primary-light'
              }`}
            >
              <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
