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
    MenuItem,
    IconButton,
    Snackbar,
    Alert

} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import UploadFileIcon from '@mui/icons-material/UploadFile'

export default function Evidencias() {

    const projetos = JSON.parse(
        localStorage.getItem('projetos')
    ) || []

    const [evidencias, setEvidencias] = useState(() => {

        const dados = localStorage.getItem('evidencias')

        return dados

            ? JSON.parse(dados)

            : []

    })

    useEffect(() => {

        localStorage.setItem(
            'evidencias',
            JSON.stringify(evidencias)
        )

    }, [evidencias])

    const [open, setOpen] = useState(false)

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const [mensagem, setMensagem] = useState('')

    const [evidenciaAtual, setEvidenciaAtual] = useState({

        id: null,

        projeto: '',

        tipo: '',

        descricao: '',

        arquivo: '',

        nomeArquivo: ''

    })

    function abrirCadastro() {

        setEvidenciaAtual({

            id: null,

            projeto: '',

            tipo: '',

            descricao: '',

            arquivo: '',

            nomeArquivo: ''

        })

        setOpen(true)
    }

    function uploadArquivo(evento) {

        const arquivo = evento.target.files[0]

        if (!arquivo) return

        const reader = new FileReader()

        reader.onload = () => {

            setEvidenciaAtual({

                ...evidenciaAtual,

                arquivo: reader.result,

                nomeArquivo: arquivo.name

            })

        }

        reader.readAsDataURL(arquivo)
    }

    function salvarEvidencia() {

        setEvidencias([

            ...evidencias,

            {

                ...evidenciaAtual,

                id: evidencias.length + 1

            }

        ])

        setMensagem('Evidência salva com sucesso')

        setSnackbarOpen(true)

        setOpen(false)
    }

    function excluirEvidencia(id) {

        setEvidencias(

            evidencias.filter(

                e => e.id !== id

            )

        )

        setMensagem('Evidência removida')

        setSnackbarOpen(true)
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

                    Evidências

                </Typography>

                <Button

                    variant="contained"

                    onClick={abrirCadastro}

                >

                    Nova Evidência

                </Button>

            </Box>

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>

                            <TableCell>Projeto</TableCell>

                            <TableCell>Tipo</TableCell>

                            <TableCell>Descrição</TableCell>

                            <TableCell>Arquivo</TableCell>

                            <TableCell>Ações</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            evidencias.map((evidencia) => (

                                <TableRow key={evidencia.id}>

                                    <TableCell>

                                        {evidencia.id}

                                    </TableCell>

                                    <TableCell>

                                        {evidencia.projeto}

                                    </TableCell>

                                    <TableCell>

                                        {evidencia.tipo}

                                    </TableCell>

                                    <TableCell>

                                        {evidencia.descricao}

                                    </TableCell>

                                    <TableCell>

                                        <Button

                                            href={evidencia.arquivo}

                                            target="_blank"

                                        >

                                            {evidencia.nomeArquivo}

                                        </Button>

                                    </TableCell>

                                    <TableCell>

                                        <IconButton

                                            color="error"

                                            onClick={() =>
                                                excluirEvidencia(
                                                    evidencia.id
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

                maxWidth="md"

                fullWidth

            >

                <DialogTitle>

                    Nova Evidência

                </DialogTitle>

                <DialogContent>

                    <TextField

                        select

                        fullWidth

                        margin="normal"

                        label="Projeto"

                        value={evidenciaAtual.projeto}

                        onChange={(e) =>
                            setEvidenciaAtual({

                                ...evidenciaAtual,

                                projeto: e.target.value

                            })
                        }

                    >

                        {

                            projetos.map((projeto) => (

                                <MenuItem

                                    key={projeto.id}

                                    value={projeto.titulo}

                                >

                                    {projeto.titulo}

                                </MenuItem>

                            ))

                        }

                    </TextField>

                    <TextField

                        select

                        fullWidth

                        margin="normal"

                        label="Tipo"

                        value={evidenciaAtual.tipo}

                        onChange={(e) =>
                            setEvidenciaAtual({

                                ...evidenciaAtual,

                                tipo: e.target.value

                            })
                        }

                    >

                        <MenuItem value="Relatório Técnico">

                            Relatório Técnico

                        </MenuItem>

                        <MenuItem value="Nota Fiscal">

                            Nota Fiscal

                        </MenuItem>

                        <MenuItem value="Imagem">

                            Imagem

                        </MenuItem>

                        <MenuItem value="Protocolo">

                            Protocolo Experimental

                        </MenuItem>

                        <MenuItem value="Contrato">

                            Contrato

                        </MenuItem>

                    </TextField>

                    <TextField

                        fullWidth

                        multiline

                        rows={3}

                        margin="normal"

                        label="Descrição"

                        value={evidenciaAtual.descricao}

                        onChange={(e) =>
                            setEvidenciaAtual({

                                ...evidenciaAtual,

                                descricao: e.target.value

                            })
                        }

                    />

                    <Button

                        variant="outlined"

                        component="label"

                        startIcon={<UploadFileIcon />}

                        sx={{ mt: 2 }}

                    >

                        Selecionar Arquivo

                        <input

                            hidden

                            type="file"

                            onChange={uploadArquivo}

                        />

                    </Button>

                    <Typography sx={{ mt: 2 }}>

                        {

                            evidenciaAtual.nomeArquivo

                        }

                    </Typography>

                </DialogContent>

                <DialogActions>

                    <Button

                        onClick={() => setOpen(false)}

                    >

                        Cancelar

                    </Button>

                    <Button

                        variant="contained"

                        onClick={salvarEvidencia}

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