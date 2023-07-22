import { Box } from "@chakra-ui/react";

export default function Dashboard() {
    return(
        <Box display='flex' height='100vh' >
            <Box flex='1'>
                <h1>Dashboard</h1>
            </Box>
        </Box>
    )
}

export async function dashboardLoader () {
    return null;
}