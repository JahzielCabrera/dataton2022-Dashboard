import React, { useEffect, useState } from 'react'
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

const renderBandera1 = (props) => {
    if(props.row.Bandera1 === 'yellow') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff9233'}}>
            </Box>
        )
    } else if(props.row.Bandera1 === 'red') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff3a33'}}>
            </Box>
        )
    } else if (props.row.Bandera1 === 'green') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#11cf50'}}>
            </Box>
        )
    } else {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#919191'}}>
            </Box>
        )
    }
}

const renderBandera2 = (props) => {
    if(props.row.Bandera2 === 'yellow') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff9233'}}>
            </Box>
        )
    } else if(props.row.Bandera2 === 'red') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff3a33'}}>
            </Box>
        )
    } else if (props.row.Bandera2 === 'green') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#11cf50'}}>
            </Box>
        )
    } else {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#919191'}}>
            </Box>
        )
    }
}

const renderBandera3 = (props) => {
    if(props.row.Bandera3 === 'yellow') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff9233'}}>
            </Box>
        )
    } else if(props.row.Bandera3 === 'red') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff3a33'}}>
            </Box>
        )
    } else if (props.row.Bandera3 === 'green') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#11cf50'}}>
            </Box>
        )
    } else {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#919191'}}>
            </Box>
        )
    }
}

const renderBandera4 = (props) => {
    if(props.row.Bandera4 === 'yellow') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff9233'}}>
            </Box>
        )
    } else if(props.row.Bandera4 === 'red') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff3a33'}}>
            </Box>
        )
    } else if (props.row.Bandera4 === 'green') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#11cf50'}}>
            </Box>
        )
    } else {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#919191'}}>
            </Box>
        )
    }
}

const renderBandera5 = (props) => {
    if(props.row.Bandera5 === 'yellow') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff9233'}}>
            </Box>
        )
    } else if(props.row.Bandera5 === 'red') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff3a33'}}>
            </Box>
        )
    } else if (props.row.Bandera5 === 'green') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#11cf50'}}>
            </Box>
        )
    } else {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#919191'}}>
            </Box>
        )
    }
}

const renderBandera6 = (props) => {
    if(props.row.Bandera6 === 'yellow') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff9233'}}>
            </Box>
        )
    } else if(props.row.Bandera6 === 'red') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#ff3a33'}}>
            </Box>
        )
    } else if (props.row.Bandera6 === 'green') {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#11cf50'}}>
            </Box>
        )
    } else {
        return (
            <Box sx={{width: 10, height:10, borderRadius:10, backgroundColor:'#919191'}}>
            </Box>
        )
    }
}

export default function SistemaAnomalias() {

    const navigate = useNavigate()

    const [anomalias, setAnomalias] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const data = await clienteAxios.get("/anomalias")
            console.log(data.data)
            setAnomalias(data.data)
            setLoading(false)
        }
        getData()
    }, [])

    const columns = React.useMemo(() => [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'id_servidor',
            headerName: 'Nombre del servidor',
            width: 390,
        },
        {
            field: 'Bandera1',
            headerName: 'Anomalía 1',
            align: 'center',
            width: 100,
            renderCell: renderBandera1
        },
        {
          field: 'Bandera2',
          headerName: 'Anomalía 2',
          width: 100,
          align: 'center',
          renderCell: renderBandera2
        },
        {
          field: 'Bandera3',
          headerName: 'Anomalía 3',
          align: 'center',
          renderCell: renderBandera3,
          width: 100,
        },
        {
            field: 'Bandera4',
            align: 'center',
            headerName: 'Anomalía 4',
            renderCell: renderBandera4,
            width: 100,
        },
        {
            field: 'Bandera5',
            headerName: 'Anomalía 5',
            align: 'center',
            renderCell: renderBandera5,
            width: 100,
        },
        {
            field: 'Bandera6',
            headerName: 'Anomalía 6',
            renderCell: renderBandera6,
            align: 'center',
            width: 100,
        },
        {
            field: 'actions',
            headerName: 'Declaración',
            type: 'actions',
            minWidth: 90,
            maxWidth: 90,
            getActions: (params) => [
                <GridActionsCellItem 
                    icon={<OpenInNew />} 
                    label="Declaración" 
                    onClick={() => navigate(`/anomalias/${params.row.mongo_id}`)}
                />
            ],
          },
      ], []) 

    return (
        <>
            <ThemeProvider theme={themeTable}>
                <h2>Sistema Anomalías</h2>
                <Typography sx={{mt:0.5, mb:3}}>El sistema de anomalías evalúa las declaraciones patrimoniales de los servidores públicos, bajo 6 criterios que de cumplirse podrían indicar un posible caso de corrupción. El sistema funciona con las declaraciones patrimoniales del datos en S1.</Typography>
                <Box sx={{ height: 600, width: 1350 }}>
                    <DataGrid
                        getRowId={(r) => r._id}
                        loading={loading}
                        rows={anomalias}
                        columns={columns}
                        pageSize={50}
                        rowsPerPageOptions={[50]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </ThemeProvider>
        </>
    )
}