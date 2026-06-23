 import { useState, useEffect } from 'react'

import {

    Typography,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Snackbar,
    Alert,
    MenuItem,
    InputAdornment

} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

export default function Projetos() {

    const empresas = JSON.parse(
        localStorage.getItem('empresas')
    ) || []

    const [projetos, setProjetos] = useState(() => {

        const dados = localStorage.getItem('projetos')

        return dados ? JSON.parse(dados) : []

    })

    useEffect(() => {

        localStorage.setItem(
            'projetos',
            JSON.stringify(projetos)
        )

    }, [projetos])

    const [open, setOpen] = useState(false)

    const [editando, setEditando] = useState(false)

    const [busca, setBusca] = useState('')

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const [mensagem, setMensagem] = useState('')

    const [projetoAtual, setProjetoAtual] = useState({

        id: null,

        titulo: '',

        empresa: '',

        problema: '',

        objetivo: '',

        status: 'Rascunho',

        trl: '1'

    })

    function abrirNovoCadastro() {

        setEditando(false)

        setProjetoAtual({

            id: null,

            titulo: '',

            empresa: '',

            problema: '',

            objetivo: '',

            status: 'Rascunho',

            trl: '1'

        })

        setOpen(true)
    }

    function editarProjeto(projeto) {

        setEditando(true)

        setProjetoAtual(projeto)

        setOpen(true)
    }

    function excluirProjeto(id) {

        setProjetos(

            projetos.filter(
                p => p.id !== id
            )

        )
    }

    function salvarProjeto() {

        if (editando) {

            setProjetos(

                projetos.map(p =>

                    p.id === projetoAtual.id

                        ? projetoAtual

                        : p

                )

            )

        }

        else {

            setProjetos([

                ...projetos,

                {

                    ...projetoAtual,

                    id: projetos.length + 1

                }

            ])

        }

        setMensagem('Projeto salvo com sucesso')

        setSnackbarOpen(true)

        setOpen(false)
    }

    return (

        <>

            <Box

                sx={{

                    display: 'flex',

                    justifyContent: 'space-between',

                    mb: 3

                }}

            >

                <Typography variant="h4">

                    Projetos PD&I

                </Typography>

                <Button

                    variant="contained"

                    onClick={abrirNovoCadastro}

                >

                    Novo Projeto

                </Button>

            </Box>

            <TextField

                fullWidth

                label="Pesquisar Projeto"

                sx={{ mb: 3 }}

                value={busca}

                onChange={(e) =>
                    setBusca(e.target.value)
                }

                InputProps={{

                    startAdornment: (

                        <InputAdornment position="start">

                            <SearchIcon />

                        </InputAdornment>

                    )

                }}

            />

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>

                            <TableCell>Título</TableCell>

                            <TableCell>Empresa</TableCell>

                            <TableCell>Status</TableCell>

                            <TableCell>TRL</TableCell>

                            <TableCell>Ações</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            projetos

                                .filter(

                                    projeto =>

                                        projeto.titulo

                                            .toLowerCase()

                                            .includes(

                                                busca.toLowerCase()

                                            )

                                )

                                .map((projeto) => (

                                    <TableRow key={projeto.id}>

                                        <TableCell>

                                            {projeto.id}

                                        </TableCell>

                                        <TableCell>

                                            {projeto.titulo}

                                        </TableCell>

                                        <TableCell>

                                            {projeto.empresa}

                                        </TableCell>

                                        <TableCell>

                                            {projeto.status}

                                        </TableCell>

                                        <TableCell>

                                            {projeto.trl}

                                        </TableCell>

                                        <TableCell>

                                            <IconButton

                                                color="primary"

                                                onClick={() =>
                                                    editarProjeto(projeto)
                                                }

                                            >

                                                <EditIcon />

                                            </IconButton>

                                            <IconButton

                                                color="error"

                                                onClick={() =>
                                                    excluirProjeto(
                                                        projeto.id
                                                    )
                                                }

                                            >

                                                <DeleteIcon />

                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

            <Dialog

                open={open}

                onClose={() => setOpen(false)}

                fullWidth

                maxWidth="md"

            >

                <DialogTitle>

                    {

                        editando

                            ? 'Editar Projeto'

                            : 'Novo Projeto'

                    }

                </DialogTitle>

                <DialogContent>

                    <TextField

                        fullWidth

                        label="Título"

                        margin="normal"

                        value={projetoAtual.titulo}

                        onChange={(e) =>
                            setProjetoAtual({

                                ...projetoAtual,

                                titulo: e.target.value

                            })
                        }

                    />

                    <TextField

                        select

                        fullWidth

                        label="Empresa"

                        margin="normal"

                        value={projetoAtual.empresa}

                        onChange={(e) =>
                            setProjetoAtual({

                                ...projetoAtual,

                                empresa: e.target.value

                            })
                        }

                    >

                        {

                            empresas.map((empresa) => (

                                <MenuItem

                                    key={empresa.id}

                                    value={empresa.razaoSocial}

                                >

                                    {empresa.razaoSocial}

                                </MenuItem>

                            ))

                        }

                    </TextField>

                    <TextField

                        fullWidth

                        multiline

                        rows={3}

                        label="Problema Tecnológico"

                        margin="normal"

                        value={projetoAtual.problema}

                        onChange={(e) =>
                            setProjetoAtual({

                                ...projetoAtual,

                                problema: e.target.value

                            })
                        }

                    />

                    <TextField

                        fullWidth

                        multiline

                        rows={3}

                        label="Objetivo"

                        margin="normal"

                        value={projetoAtual.objetivo}

                        onChange={(e) =>
                            setProjetoAtual({

                                ...projetoAtual,

                                objetivo: e.target.value

                            })
                        }

                    />

                    <TextField

                        select

                        fullWidth

                        label="Status"

                        margin="normal"

                        value={projetoAtual.status}

                        onChange={(e) =>
                            setProjetoAtual({

                                ...projetoAtual,

                                status: e.target.value

                            })
                        }

                    >

                        <MenuItem value="Rascunho">
    Rascunho
</MenuItem>

<MenuItem value="Preenchimento">
    Preenchimento
</MenuItem>

<MenuItem value="Análise IA">
    Análise IA
</MenuItem>

<MenuItem value="Análise Consultor">
    Análise Consultor
</MenuItem>

<MenuItem value="Aprovado">
    Aprovado
</MenuItem>

<MenuItem value="Finalizado">
    Finalizado
</MenuItem>

                    </TextField>

                    <TextField

                        select

                        fullWidth

                        label="TRL"

                        margin="normal"

                        value={projetoAtual.trl}

                        onChange={(e) =>
                            setProjetoAtual({

                                ...projetoAtual,

                                trl: e.target.value

                            })
                        }

                    >

                        {

                            [1,2,3,4,5,6,7,8,9]

                                .map((trl) => (

                                    <MenuItem

                                        key={trl}

                                        value={trl}

                                    >

                                        TRL {trl}

                                    </MenuItem>

                                ))

                        }

                    </TextField>

                </DialogContent>

                <DialogActions>

                    <Button

                        onClick={() => setOpen(false)}

                    >

                        Cancelar

                    </Button>

                    <Button

                        variant="contained"

                        onClick={salvarProjeto}

                    >

                        Salvar

                    </Button>

                </DialogActions>

            </Dialog>

            <Snackbar

                open={snackbarOpen}

                autoHideDuration={3000}

                onClose={() =>
                    setSnackbarOpen(false)
                }

            >

                <Alert severity="success">

                    {mensagem}

                </Alert>

            </Snackbar>

        </>

    )

}