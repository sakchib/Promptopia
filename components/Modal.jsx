import { useState } from 'react'

export default function Modal({ isOpen, onClose, children }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)

  const closeModal = () => {
    setIsModalOpen(false)
    onClose()
  }

  if (!isModalOpen) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
        {children}
      </div>
    </div>
  )
}
