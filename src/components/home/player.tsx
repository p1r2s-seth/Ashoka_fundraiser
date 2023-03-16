import { AnyMxRecord } from 'dns'
import React, { useEffect, useState } from 'react'

const DynamicPlayer = React.lazy(() => import('react-player'))

const Player = ({ url }: any) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <React.Suspense fallback={<div>Loading video...</div>}>
      <DynamicPlayer url={'https://youtu.be/V24yGQYjqg0'} playing controls />
    </React.Suspense>
  ) : null
}

export default Player
