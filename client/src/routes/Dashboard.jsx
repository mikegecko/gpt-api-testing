import { Box } from "@chakra-ui/react";
import { router } from "../main";
import { verify } from "../utils/api";

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
    //Redirects to login if no token is found
    const jwt = localStorage.getItem('gptapi-token');
    if(!jwt){
    router.navigate('/auth/login');
    }
    if(jwt){
    verify(localStorage.getItem('gptapi-token')).then((res) => {res.success ? console.log("Token is valid") : router.navigate('/auth/login')}).catch(err => { router.navigate('/auth/login'); console.log(err)})
    }
    return null;
}