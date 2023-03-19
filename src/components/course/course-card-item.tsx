import React, { FC } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import IconButton, { iconButtonClasses } from '@mui/material/IconButton'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { Course } from '@/interfaces/course'

interface Props {
  item: Course
}

const CourseCardItem: FC<Props> = ({ item }) => {
  return (
    <Box
      sx={{
        px: 1,
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          transition: (theme) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
            [`& .${iconButtonClasses.root}`]: {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            // overflow: 'hidden',
            borderRadius: 3,
            mb: 1,
          }}
        >
          <Image src={item.cover} width={570} height={500} alt={'Course ' + item.id} />
        </Box>
        <Box>
          <Typography component="h2" variant="h5" sx={{ height: 56, fontSize: '1.5rem' }}>
            {item.title}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="h6"
            variant="h6"
            sx={{ height: 56, fontSize: '0.8rem', color: 'primary.main', fontWeight: 'inherit' }}
          >
            {item.position}
          </Typography>
        </Box>
        <Box>
          <Typography component="h5" variant="h5" sx={{ mb: 2, height: 76, fontSize: '0.8rem', pb: 22 }}>
            {item.desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default CourseCardItem
