import {

    Grid,
    Card,
    CardContent,
    Typography,
    Box

} from '@mui/material'

import {

    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

} from 'recharts'

export default function Dashboard() {

    const empresas = JSON.parse(
        localStorage.getItem('empresas')
    ) || []

    const projetos = JSON.parse(
        localStorage.getItem('projetos')
    ) || []

    const evidencias = JSON.parse(
        localStorage.getItem('evidencias')
    ) || []

    const projetosAprovados = projetos.filter(

        p => p.status === 'Aprovado'

    ).length

    const statusData = [

        {

            name: 'Rascunho',

            value: projetos.filter(
                p => p.status === 'Rascunho'
            ).length

        },

        {

            name: 'Em Análise',

            value: projetos.filter(
                p => p.status === 'Em Análise'
            ).length

        },

        {

            name: 'Aprovado',

            value: projetos.filter(
                p => p.status === 'Aprovado'
            ).length

        },

        {

            name: 'Finalizado',

            value: projetos.filter(
                p => p.status === 'Finalizado'
            ).length

        }

    ]

    const trlData = [1,2,3,4,5,6,7,8,9]

        .map(trl => ({

            trl: `TRL ${trl}`,

            quantidade:

                projetos.filter(

                    p => Number(p.trl) === trl

                ).length

        }))

    const cards = [

        {

            titulo: 'Empresas',

            valor: empresas.length

        },

        {

            titulo: 'Projetos',

            valor: projetos.length

        },

        {

            titulo: 'Evidências',

            valor: evidencias.length

        },

        {

            titulo: 'Projetos Aprovados',

            valor: projetosAprovados

        }

    ]

    const cores = [

        '#1976d2',

        '#f57c00',

        '#2e7d32',

        '#d32f2f'

    ]

    return (

        <>

            <Typography

                variant="h4"

                gutterBottom

            >

                Dashboard Executivo

            </Typography>

            <Grid container spacing={3}>

                {

                    cards.map((card) => (

                        <Grid

                            item

                            xs={12}

                            md={3}

                            key={card.titulo}

                        >

                            <Card elevation={4}>

                                <CardContent>

                                    <Typography variant="h6">

                                        {card.titulo}

                                    </Typography>

                                    <Typography variant="h3">

                                        {card.valor}

                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))

                }

            </Grid>

            <Grid

                container

                spacing={3}

                sx={{ mt: 2 }}

            >

                <Grid item xs={12} md={6}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Projetos por Status

                            </Typography>

                            <Box

                                sx={{

                                    width: '100%',

                                    height: 300

                                }}

                            >

                                <ResponsiveContainer>

                                    <PieChart>

                                        <Pie

                                            data={statusData}

                                            dataKey="value"

                                            outerRadius={100}

                                            label

                                        >

                                            {

                                                statusData.map(

                                                    (_, index) => (

                                                        <Cell

                                                            key={index}

                                                            fill={

                                                                cores[index]

                                                            }

                                                        />

                                                    )

                                                )

                                            }

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={6}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Projetos por TRL

                            </Typography>

                            <Box

                                sx={{

                                    width: '100%',

                                    height: 300

                                }}

                            >

                                <ResponsiveContainer>

                                    <BarChart data={trlData}>

                                        <XAxis dataKey="trl" />

                                        <YAxis />

                                        <Tooltip />

                                        <Bar

                                            dataKey="quantidade"

                                            fill="#1976d2"

                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </>

    )

}