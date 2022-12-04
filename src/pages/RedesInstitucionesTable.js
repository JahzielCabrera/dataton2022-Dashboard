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

export default function RedesInstitucionesTable() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [networks, setNetworks] = useState([])

    useEffect(() => {
        const getNetworkBossesData = async () => {
            const res = await clienteAxios.get("/network_instituciones")
            setNetworks(res.data)
            setLoading(false)
        }
        getNetworkBossesData()
    }, [])


    const columns = React.useMemo(() => [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'institucion',
            headerName: 'Nombre de la Institución',
            width: 730,
            valueGetter: (params) => {
                return params.row.links[0].source
            }
        },
        {
          field: 'Sancionados',
          headerName: 'Sancionados',
          width: 100,
        },
        {
          field: 'No_Sancionados',
          headerName: 'No Sancionados',
          width: 150,
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
                    onClick={() => navigate(`/instituciones/${params.row._id}`)}
                />
            ],
          },
      ], []) 

    return (
        <>
        <ThemeProvider theme={themeTable}>
            <h2 style={{marginTop:3, marginBottom:0}}>Redes de Instituciones</h2>
            <Typography sx={{my:3}}>En esta sección encontrarás la lista de instituciones y los servidores que laboran en ellas, (consideramos solo las instituciones que tienen al menos un funcionario sancionado).</Typography>
            <Box sx={{ height: 600, width: 1350 }}>
                <DataGrid
                    getRowId={(r) => r._id}
                    loading={loading}
                    rows={networks}
                    columns={columns}
                    pageSize={100}
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