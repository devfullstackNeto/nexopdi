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

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState(() => {

        const dados = localStorage.getItem('usuarios')

        return dados

            ? JSON.parse(dados)

            : [

                {

                    id: 1,

                    nome: 'Administrador',

                    email: 'admin@nexo.com',

                    perfil: 'ADMIN'

                }

            ]

    })

    useEffect(() => {

        localStorage.setItem(

            'usuarios',

            JSON.stringify(usuarios)

        )

    }, [usuarios])

    const [open, setOpen] = useState(false)

    const [editando, setEditando] = useState(false)

    const [busca, setBusca] = useState('')

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const [mensagem, setMensagem] = useState('')

    const [usuarioAtual, setUsuarioAtual] = useState({

        id: null,

        nome: '',

        email: '',

        perfil: 'EMPRESA'

    })

    function novoUsuario() {

        setEditando(false)

        setUsuarioAtual({

            id: null,

            nome: '',

            email: '',

            perfil: 'EMPRESA'

        })

        setOpen(true)
    }

    function editarUsuario(usuario) {

        setEditando(true)

        setUsuarioAtual(usuario)

        setOpen(true)
    }

    function excluirUsuario(id) {

        setUsuarios(

            usuarios.filter(

                usuario => usuario.id !== id

            )

        )

        setMensagem('Usuário removido')

        setSnackbarOpen(true)
    }

    function salvarUsuario() {

        if (editando) {

            setUsuarios(

                usuarios.map(usuario =>

                    usuario.id === usuarioAtual.id

                        ? usuarioAtual

                        : usuario

                )

            )

        }

        else {

            setUsuarios([

                ...usuarios,

                {

                    ...usuarioAtual,

                    id: usuarios.length + 1

                }

            ])

        }

        setMensagem('Usuário salvo com sucesso')

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

                    Usuários

                </Typography>

                <Button

                    variant="contained"

                    onClick={novoUsuario}

                >

                    Novo Usuário

                </Button>

            </Box>

            <TextField

                fullWidth

                label="Pesquisar Usuário"

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

                            <TableCell>Nome</TableCell>

                            <TableCell>E-mail</TableCell>

                            <TableCell>Perfil</TableCell>

                            <TableCell>Ações</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            usuarios

                                .filter(

                                    usuario =>

                                        usuario.nome

                                            .toLowerCase()

                                            .includes(

                                                busca.toLowerCase()

                                            )

                                )

                                .map(usuario => (

                                    <TableRow key={usuario.id}>

                                        <TableCell>

                                            {usuario.id}

                                        </TableCell>

                                        <TableCell>

                                            {usuario.nome}

                                        </TableCell>

                                        <TableCell>

                                            {usuario.email}

                                        </TableCell>

                                        <TableCell>

                                            {usuario.perfil}

                                        </TableCell>

                                        <TableCell>

                                            <IconButton

                                                color="primary"

                                                onClick={() =>
                                                    editarUsuario(usuario)
                                                }

                                            >

                                                <EditIcon />

                                            </IconButton>

                                            <IconButton

                                                color="error"

                                                onClick={() =>
                                                    excluirUsuario(
                                                        usuario.id
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

                maxWidth="sm"

                fullWidth

            >

                <DialogTitle>

                    {

                        editando

                            ? 'Editar Usuário'

                            : 'Novo Usuário'

                    }

                </DialogTitle>

                <DialogContent>

                    <TextField

                        fullWidth

                        label="Nome"

                        margin="normal"

                        value={usuarioAtual.nome}

                        onChange={(e) =>
                            setUsuarioAtual({

                                ...usuarioAtual,

                                nome: e.target.value

                            })
                        }

                    />

                    <TextField

                        fullWidth

                        label="E-mail"

                        margin="normal"

                        value={usuarioAtual.email}

                        onChange={(e) =>
                            setUsuarioAtual({

                                ...usuarioAtual,

                                email: e.target.value

                            })
                        }

                    />

                    <TextField

                        select

                        fullWidth

                        label="Perfil"

                        margin="normal"

                        value={usuarioAtual.perfil}

                        onChange={(e) =>
                            setUsuarioAtual({

                                ...usuarioAtual,

                                perfil: e.target.value

                            })
                        }

                    >

                        <MenuItem value="ADMIN">

                            ADMIN

                        </MenuItem>

                        <MenuItem value="CONSULTOR">

                            CONSULTOR

                        </MenuItem>

                        <MenuItem value="EMPRESA">

                            EMPRESA

                        </MenuItem>

                        <MenuItem value="AUDITOR">

                            AUDITOR

                        </MenuItem>

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

                        onClick={salvarUsuario}

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