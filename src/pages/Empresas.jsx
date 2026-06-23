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
    InputAdornment
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

export default function Empresas() {

    const [empresas, setEmpresas] = useState(() => {

        const dados = localStorage.getItem('empresas')

        return dados
            ? JSON.parse(dados)
            : []

    })

    useEffect(() => {

        localStorage.setItem(
            'empresas',
            JSON.stringify(empresas)
        )

    }, [empresas])

    const [open, setOpen] = useState(false)

    const [editando, setEditando] = useState(false)

    const [busca, setBusca] = useState('')

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const [mensagem, setMensagem] = useState('')

    const [empresaAtual, setEmpresaAtual] = useState({

        id: null,
        razaoSocial: '',
        cnpj: '',
        cnae: '',
        anoBase: ''

    })

    function abrirNovoCadastro() {

        setEditando(false)

        setEmpresaAtual({

            id: null,
            razaoSocial: '',
            cnpj: '',
            cnae: '',
            anoBase: ''

        })

        setOpen(true)
    }

    function editarEmpresa(empresa) {

        setEditando(true)

        setEmpresaAtual(empresa)

        setOpen(true)
    }

    function excluirEmpresa(id) {

        setEmpresas(

            empresas.filter(
                empresa => empresa.id !== id
            )

        )

        setMensagem('Empresa excluída com sucesso')

        setSnackbarOpen(true)
    }

    function salvarEmpresa() {

        if (editando) {

            setEmpresas(

                empresas.map(empresa =>

                    empresa.id === empresaAtual.id

                        ? empresaAtual

                        : empresa

                )

            )

        }

        else {

            setEmpresas([

                ...empresas,

                {
                    ...empresaAtual,
                    id: Date.now()
                }

            ])

        }

        setMensagem('Empresa salva com sucesso')

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

                    Empresas

                </Typography>

                <Button

                    variant="contained"

                    onClick={abrirNovoCadastro}

                >

                    Nova Empresa

                </Button>

            </Box>

            <TextField

                fullWidth

                label="Pesquisar Empresa"

                sx={{ mb: 3 }}

                value={busca}

                onChange={(e) => setBusca(e.target.value)}

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
                            <TableCell>Razão Social</TableCell>
                            <TableCell>CNPJ</TableCell>
                            <TableCell>CNAE</TableCell>
                            <TableCell>Ano Base</TableCell>
                            <TableCell>Ações</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            empresas

                                .filter(

                                    empresa =>

                                        empresa.razaoSocial

                                            .toLowerCase()

                                            .includes(

                                                busca.toLowerCase()

                                            )

                                )

                                .map((empresa) => (

                                    <TableRow key={empresa.id}>

                                        <TableCell>{empresa.id}</TableCell>

                                        <TableCell>{empresa.razaoSocial}</TableCell>

                                        <TableCell>{empresa.cnpj}</TableCell>

                                        <TableCell>{empresa.cnae}</TableCell>

                                        <TableCell>{empresa.anoBase}</TableCell>

                                        <TableCell>

                                            <IconButton

                                                color="primary"

                                                onClick={() =>
                                                    editarEmpresa(empresa)
                                                }

                                            >

                                                <EditIcon />

                                            </IconButton>

                                            <IconButton

                                                color="error"

                                                onClick={() =>
                                                    excluirEmpresa(empresa.id)
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

                maxWidth="sm"

            >

                <DialogTitle>

                    {

                        editando

                            ? 'Editar Empresa'

                            : 'Nova Empresa'

                    }

                </DialogTitle>

                <DialogContent>

                    <TextField

                        fullWidth

                        label="Razão Social"

                        margin="normal"

                        value={empresaAtual.razaoSocial}

                        onChange={(e) =>
                            setEmpresaAtual({

                                ...empresaAtual,

                                razaoSocial: e.target.value

                            })
                        }

                    />

                    <TextField

                        fullWidth

                        label="CNPJ"

                        margin="normal"

                        value={empresaAtual.cnpj}

                        onChange={(e) =>
                            setEmpresaAtual({

                                ...empresaAtual,

                                cnpj: e.target.value

                            })
                        }

                    />

                    <TextField

                        fullWidth

                        label="CNAE"

                        margin="normal"

                        value={empresaAtual.cnae}

                        onChange={(e) =>
                            setEmpresaAtual({

                                ...empresaAtual,

                                cnae: e.target.value

                            })
                        }

                    />

                    <TextField

                        fullWidth

                        label="Ano Base"

                        margin="normal"

                        value={empresaAtual.anoBase}

                        onChange={(e) =>
                            setEmpresaAtual({

                                ...empresaAtual,

                                anoBase: e.target.value

                            })
                        }

                    />

                </DialogContent>

                <DialogActions>

                    <Button

                        onClick={() => setOpen(false)}

                    >

                        Cancelar

                    </Button>

                    <Button

                        variant="contained"

                        onClick={salvarEmpresa}

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