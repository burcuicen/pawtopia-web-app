import React, { useRef } from 'react'
import BaseIcon from '../_base/base-icon'

interface PhotoUploadProps {
  photos: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photos, onChange, maxPhotos = 5 }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const remainingSlots = maxPhotos - photos.length
    const filesToProcess = Array.from(files).slice(0, remainingSlots)

    filesToProcess.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 800
          const MAX_HEIGHT = 800
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
          
          onChange([...photos, dataUrl])
        }
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-dark-80 mb-3">
        Photos {photos.length > 0 && `(${photos.length}/${maxPhotos})`}
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Existing Photos */}
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
            <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <BaseIcon icon="material-symbols:close" width={20} />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 text-dark-60 hover:text-primary hover:bg-accent-bg"
          >
            <BaseIcon icon="material-symbols:add-photo-alternate-outline" width={32} />
            <span className="text-sm font-medium">Add Photo</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-dark-40 mt-2">
        Upload up to {maxPhotos} photos. Images will be automatically resized.
      </p>
    </div>
  )
}

export default PhotoUpload
