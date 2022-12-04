import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/axios'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridActionsCellItem, esES } from '@mui/x-data-grid'
import { OpenInNew } from '@mui/icons-material'
import { esES as coreesES } from '@mui/material/locale';
import { 
    createTheme, 
    ThemeProvider, 
} from '@mui/material/styles';

const themeTable = createTheme({
    palette: {
        primary: {
            main: '#0362fc'
        },
        secondary: {
            main: '#0362fc'
        },
        error: {
            main: '#ff3838'
        }
    }
},coreesES,esES);

export default function RedesJefesTable() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [networks, setNetworks] = useState([])

    useEffect(() => {
        const getNetworkBossesData = async () => {
            const res = await clienteAxios.get("/network_jefes")
            setNetworks(res.data)
            setLoading(false)
        }
        getNetworkBossesData()
    }, [])


    const columns = React.useMemo(() => [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'jefe',
            headerName: 'Nombre del Jefe',
            width: 390,
            valueGetter: (params) => {
                return params.row.links[0].source
            }
        },
        {
            field: 'Institucion',
            headerName: 'Institución',
            width: 390,
            
        },
        {
          field: 'Sancionados',
          headerName: 'Sancionados',
          width: 100,
        },
        {
          field: 'No_Sancionados',
          headerName: 'No Sancionados',
          width: 100,
        },
        {
            field: 'actions',
            headerName: 'Grafo',
            type: 'actions',
            minWidth: 80,
            maxWidth: 80,
            getActions: (params) => [
                <GridActionsCellItem 
                    icon={<OpenInNew />} 
                    label="Ver Grafo" 
                    onClick={() => navigate(`/jefes/${params.row._id}`)}
                />
            ],
          },
      ], []) 

    return (
        <>
            <ThemeProvider theme={themeTable}>
                <h2 style={{marginTop:3, marginBottom:0}}>Redes de Jefes</h2>
                <Typography sx={{my:3}}>En esta sección encontrarás la lista de jefes y los servidores que tiene cada uno a su cargo, (consideramos solo los jefes que tienen al menos un funcionario sancionado a su cargo).</Typography>
                <Box sx={{ height: 600, width: 1350 }}>
                    <DataGrid
                        getRowId={(r) => r._id}
                        loading={loading}
                        rows={networks}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </ThemeProvider>
        </>
    )
}