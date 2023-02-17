import { Box } from '@mui/material'
import React from 'react'

export default function Home() {

    return (
        <Box>
            <img width={'100%'} src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670141143/plots/DATOMICOS_imjqce.jpg'/>
            <Box sx={{display: 'flex'}}>
                <img height={500} style={{marginLeft: 'auto', marginRight: 'auto'}} src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670187647/plots/qr_datomicos_gu1796.jpg'/>
            </Box>
        </Box>
    )
}