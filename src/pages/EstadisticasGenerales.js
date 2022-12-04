import React from 'react'
import { Box, Typography } from '@mui/material'

export default function EstadisticasGenerales() {

    return (
        <>
            <h2>Estadísticas Generales</h2>
            <Typography></Typography>
            <Box sx={{width:'100%', display: 'flex', flexDirection:'row'}}>
                <Box sx={{width: '30%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <img width='100%' src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670130919/plots/imagen00_j2roud.png'/>
                    <Typography sx={{width: '90%'}} textAlign={'center'}>Ditribución de los ingresos totales declarados</Typography>
                </Box>
                <Box sx={{width: '30%', display: 'flex', alignItems: 'center'}}>
                    <img width='100%' src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670130919/plots/imagen02_rdyyyi.jpg'/>
                    <Typography></Typography>
                </Box>
                <Box sx={{width: '30%', display: 'flex', alignItems: 'center'}}>
                    <img width='100%' src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670130919/plots/imagen01_ljirpt.jpg'/>
                    <Typography></Typography>
                </Box>
            </Box>
            <Box sx={{width:'100%', display: 'flex', flexDirection:'column', mt:3, mb:4}}>
                <Box sx={{width:'100%', display: 'flex', flexDirection:'row'}}>
                    <Box sx={{width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <img width='100%' src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670130919/plots/imagen1_uitetc.png'/>
                        <Typography sx={{width: '90%'}} textAlign={'center'}>Distribución del valor de las propiedades con valor mayor a un millon de pesos adquiridas de contado.</Typography>
                    </Box>
                    <Box sx={{width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <img width='100%' src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670130919/plots/imagen2_obemux.png'/>
                        <Typography sx={{width: '90%'}} textAlign={'center'}>Distribución del total de ingresos de las personas que han adquirido una propiedad de más de un millon de pesos de contado</Typography>
                    </Box>
                </Box>
                <Box sx={{width:'100%', display: 'flex', flexDirection:'row', mt:4}}>
                    <Box sx={{width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <img width='100%' src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670130919/plots/imagen3_jutbbk.png'/>
                        <Typography sx={{width: '90%'}} textAlign={'center'}>Distribución del valor de las propiedades con valor mayor a un millon de pesos adquiridas con crédito</Typography>
                    </Box>
                    <Box sx={{width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <img width='100%' src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670130919/plots/imagen4_c1kimu.png'/>
                        <Typography sx={{width: '90%'}} textAlign={'center'}>Distribución del total de ingresos de las personas que han adquirido una propiedad de más de un millon de pesos con un crédito</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}