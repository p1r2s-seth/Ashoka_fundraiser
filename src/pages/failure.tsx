import { DonateHeader } from '@/components/header'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Failed: React.FC = () => {
  return (
    <>
      <DonateHeader />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <svg
          style={{ width: '50%', maxWidth: '200px', marginTop: `${10}%` }}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256 0C114.616 0 0 114.616 0 256s114.616 256 256 256 256-114.616 256-256S397.384 0 256 0zm118.762 347.238L347.238 374.762 256 283.524l-91.238 91.238-29.524-29.524L226.476 256 135.238 164.762l29.524-29.524L256 228.476l91.238-91.238 29.524 29.524L285.524 256l91.238 91.238z"
            fill="#f44336"
          />
        </svg>
        <Typography variant="h5" align="center" gutterBottom>
          Failed!
        </Typography>
        <Link href="/donate">
          <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Try Again
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Failed
