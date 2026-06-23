import {

    Button,
    Container,
    Paper,
    TextField,
    Typography

} from '@mui/material'

import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

    return (

        <Container maxWidth="sm">

            <Paper

                elevation={6}

                sx={{

                    p: 5,
                    mt: 10

                }}
            >

                <Typography
                    variant="h3"
                    align="center"
                >

                    NEXO PD&I

                </Typography>

                <Typography
                    align="center"
                    sx={{ mb: 3 }}
                >

                    Plataforma Inteligente para Gestão da Lei do Bem

                </Typography>

                <TextField
                    label="E-mail"
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    margin="normal"
                />

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    onClick={() => navigate('/dashboard')}
                >

                    Entrar

                </Button>

            </Paper>

        </Container>

    )

}