import {

    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box

} from '@mui/material'

import { Outlet, useNavigate } from 'react-router-dom'

export default function AdminLayout() {

    const navigate = useNavigate()

    return (

        <Box sx={{ display: 'flex' }}>

            <AppBar position="fixed">

                <Toolbar>

                    <Typography variant="h6">

                        NEXO PD&I

                    </Typography>

                </Toolbar>

            </AppBar>

            <Drawer

                variant="permanent"

                sx={{

                    width: 240,

                    '& .MuiDrawer-paper': {

                        width: 240,
                        mt: 8

                    }

                }}

            >

                <List>

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={() => navigate('/dashboard')}
                        >

                            <ListItemText
                                primary="Dashboard"
                            />

                        </ListItemButton>

                    </ListItem>

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={() => navigate('/empresas')}
                        >

                            <ListItemText
                                primary="Empresas"
                            />

                        </ListItemButton>

                    </ListItem>

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={() => navigate('/projetos')}
                        >

                            <ListItemText
                                primary="Projetos PD&I"
                            />

                        </ListItemButton>

                    </ListItem>

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={() => navigate('/evidencias')}
                        >

                            <ListItemText
                                primary="Evidências"
                            />

                        </ListItemButton>

                    </ListItem>
                    <ListItem disablePadding>

                    <ListItemButton
                        onClick={() => navigate('/usuarios')}
                    >

                        <ListItemText
                            primary="Usuários"
                        />

                    </ListItemButton>

                </ListItem>
                <ListItem disablePadding>

    <ListItemButton
        onClick={() => navigate('/workflow')}
    >

        <ListItemText
            primary="Workflow"
        />

    </ListItemButton>

</ListItem>

                </List>

            </Drawer>

            <Box
    component="main"
    sx={{
        flexGrow: 1,
        p: 4,
        mt: '64px',
        width: 'calc(100vw - 240px)',
        overflowX: 'hidden'
    }}
>

                <Outlet />

            </Box>

        </Box>

    )

}