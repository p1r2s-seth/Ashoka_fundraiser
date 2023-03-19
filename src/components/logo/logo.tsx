import React, { FC } from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

const Logo: FC<Props> = ({ onClick, variant }) => {
  return (
    <>
      <Link href="/">
        <Box onClick={onClick} style={{ cursor: 'pointer' }}>
          {/* <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, '& span': { color: variant === 'primary' ? 'primary.main' : 'unset' } }}
          >
            Ashoka<span>University</span>
          </Typography> */}
          <Image src="/images/Ashoka Logo.png" alt="Feature img" width={200} height={50} />
        </Box>
      </Link>
    </>
  )
}

Logo.defaultProps = {
  variant: 'primary',
}

export default Logo
