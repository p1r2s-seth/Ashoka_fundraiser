import React, { useState, useEffect } from 'react'
import { Modal } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import ReactPlayer from 'react-player'
const DynamicPlayer = React.lazy(() => import('react-player'))
type VideoModalProps = {
  open: boolean
  onClose: () => void
}

const VideoModal = ({ open, onClose }: VideoModalProps) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: `${5}rem`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '1rem',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            <CloseIcon style={{ fontSize: `${3}rem` }} />
          </div>
          <Player />
        </div>
      </Modal>
    </>
  )
}

const Player = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <React.Suspense fallback={<h1 style={{ color: '#fff' }}>Loading video...</h1>}>
      <DynamicPlayer url={'https://youtu.be/V24yGQYjqg0'} controls />
    </React.Suspense>
  ) : null
}

export default VideoModal
