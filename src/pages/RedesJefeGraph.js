import React, { useState } from 'react'
import clienteAxios from '../config/axios';
import { Graph } from 'react-d3-graph' 
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function RedJefeGrafo() {

    const [networkInfo, setNetworkInfo] = useState({})
    const [bossName, setBossName] = useState('')
    const [institution, setInstitution] = useState('')
    const [loading, setLoading] = useState(true)

    useState(() => {
        const getGraphInfo = async () => {
            const graphId = window?.location?.href?.split("/")[4]
            const graphInfo = await clienteAxios.get(`/network_jefes/${graphId}`)
            setNetworkInfo(graphInfo.data)
            setBossName(graphInfo.data.links[0].source)
            setInstitution(graphInfo.data.Institucion)
            setLoading(false)
        }
        getGraphInfo()
    }, [])

    const data = {
        nodes: networkInfo?.nodes,
        links: networkInfo?.links,
    };

    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
          color: "lightgreen",
          size: 1000,
          highlightStrokeColor: "blue",
        },
        link: {
          highlightColor: "lightblue",
        },
      };
    return (
        <>
            <h2>Red de {bossName}</h2>
            <Typography><span style={{fontWeight: 900}}>INSTITUCIÓN:</span> {institution}</Typography>
            <Box sx={{marginTop: 5}}>
                <Stack direction="row" spacing={2}>
                    <Stack direction="row" spacing={1}>
                        <Box style={{backgroundColor:'blue', width:22, height:22, borderRadius:15}}></Box>
                        <Typography>JEFE</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Box style={{backgroundColor:'yellow', width:22, height:22, borderRadius:15}}></Box>
                        <Typography>NO SANCIONADO</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Box style={{backgroundColor:'red', width:22, height:22, borderRadius:15}}></Box>
                        <Typography>SANCIONADO</Typography>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{with: 1200, height:'75vh', display: 'flex', justifyContent:'center', marginTop: 5}}>
                <Graph 
                    id="graph-id" // id is mandatory
                    data={data}
                    config={myConfig}
                />
            </Box>
        </>
    )
}