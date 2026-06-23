import { useState, useEffect } from 'react'

import {

    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    Box,
    Select,
    MenuItem,
    Chip,
    Divider

} from '@mui/material'

import ScienceIcon from '@mui/icons-material/Science'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AssignmentIcon from '@mui/icons-material/Assignment'
import EditNoteIcon from '@mui/icons-material/EditNote'

export default function WorkflowProjetos() {

    const [projetos, setProjetos] = useState([])

    useEffect(() => {

        const dados = JSON.parse(

            localStorage.getItem('projetos')

        ) || []

        setProjetos(dados)

    }, [])

    function alterarStatus(id, novoStatus) {

        const listaAtualizada = projetos.map(

            projeto =>

                projeto.id === id

                    ? {

                        ...projeto,

                        status: novoStatus

                    }

                    : projeto

        )

        setProjetos(listaAtualizada)

        localStorage.setItem(

            'projetos',

            JSON.stringify(listaAtualizada)

        )

    }

    const colunas = [

        {

            titulo: 'Rascunho',

            cor: '#546e7a',

            icone: <EditNoteIcon />

        },

        {

            titulo: 'Preenchimento',

            cor: '#1976d2',

            icone: <AssignmentIcon />

        },

        {

            titulo: 'Análise IA',

            cor: '#7b1fa2',

            icone: <SmartToyIcon />

        },

        {

            titulo: 'Análise Consultor',

            cor: '#f57c00',

            icone: <ScienceIcon />

        },

        {

            titulo: 'Aprovado',

            cor: '#2e7d32',

            icone: <CheckCircleIcon />

        },

        {

            titulo: 'Finalizado',

            cor: '#00897b',

            icone: <FactCheckIcon />

        }

    ]

    return (

        <Box sx={{ width: '100%' }}>

            <Typography
    variant="h4"
    gutterBottom
    sx={{
        fontWeight: 700
    }}
>

                Workflow dos Projetos

            </Typography>

            <Typography

                color="text.secondary"

                sx={{ mb: 4 }}

            >

                Acompanhe o ciclo de vida dos projetos de PD&I.

            </Typography>

           <Box
    sx={{
        display: 'flex',
        gap: 3,
        overflowX: 'auto',
        width: '100%',
        pb: 3,
        pt: 2
    }}
>

                {

                    colunas.map(coluna => (

                        <Paper
    key={coluna.titulo}

    elevation={0}

    sx={{

minWidth: 340,
maxWidth: 340,
        flexShrink: 0

    }}
>

                            <Paper

                                elevation={4}

                                sx={{

                                    height: '75vh',

                                    display: 'flex',

                                    flexDirection: 'column',

                                    borderTop:

                                        `5px solid ${coluna.cor}`

                                }}

                            >

                                <Box

                                    sx={{

                                        p: 2,

                                        display: 'flex',

                                        alignItems: 'center',

                                        justifyContent:

                                            'space-between'

                                    }}

                                >

                                    <Box

                                        sx={{

                                            display: 'flex',

                                            alignItems: 'center',

                                            gap: 1

                                        }}

                                    >

                                        {coluna.icone}

                                        <Typography

                                            fontWeight={700}

                                        >

                                            {coluna.titulo}

                                        </Typography>

                                    </Box>

                                    <Chip

                                        size="small"

                                        label={

                                            projetos.filter(

                                                p =>

                                                    p.status ===

                                                    coluna.titulo

                                            ).length

                                        }

                                    />

                                </Box>

                                <Divider />

                                <Box

                                    sx={{

                                        p: 1,

                                        overflowY: 'auto',

                                        flexGrow: 1

                                    }}

                                >

                                    {

                                        projetos

                                            .filter(

                                                p =>

                                                    p.status ===

                                                    coluna.titulo

                                            )

                                            .map(projeto => (

                                                <Card

                                                    key={projeto.id}

                                                    elevation={3}

                                                    sx={{

                                                        mb: 2,

                                                        borderRadius: 3

                                                    }}

                                                >

                                                    <CardContent>

                                                        <Typography

                                                            variant="subtitle1"

                                                            fontWeight={700}

                                                        >

                                                            {projeto.titulo}

                                                        </Typography>

                                                        <Typography

                                                            variant="body2"

                                                            color="text.secondary"

                                                            sx={{ mt: 1 }}

                                                        >

                                                            {projeto.empresa}

                                                        </Typography>

                                                        <Box

                                                            sx={{

                                                                display: 'flex',

                                                                gap: 1,

                                                                mt: 2,

                                                                flexWrap: 'wrap'

                                                            }}

                                                        >

                                                            <Chip

                                                                label={`TRL ${projeto.trl}`}

                                                                color="primary"

                                                                size="small"

                                                            />

                                                        </Box>

                                                        <Select

                                                            fullWidth

                                                            size="small"

                                                            sx={{ mt: 2 }}

                                                            value={projeto.status}

                                                            onChange={(e) =>

                                                                alterarStatus(

                                                                    projeto.id,

                                                                    e.target.value

                                                                )

                                                            }

                                                        >

                                                            {

                                                                colunas.map(

                                                                    item => (

                                                                        <MenuItem

                                                                            key={item.titulo}

                                                                            value={item.titulo}

                                                                        >

                                                                            {item.titulo}

                                                                        </MenuItem>

                                                                    )

                                                                )

                                                            }

                                                        </Select>

                                                    </CardContent>

                                                </Card>

                                            ))

                                    }

                                </Box>

                            </Paper>

                        </Paper>
                    ))

                }

            </Box>

        </Box>

    )

}