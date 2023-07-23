import { Box, Button, Text } from "@chakra-ui/react";
import { router } from "../main";
import { decodeToken, logout, verify } from "../utils/api";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const [tokenInfo, setTokenInfo] = useState(null);

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        const jwt = localStorage.getItem('gptapi-token');
        decodeToken(jwt).then(res => {setTokenInfo(res);})
    },[])

    useEffect(() => {
        console.log(tokenInfo);
    }, [tokenInfo])

    const tokenInfoString = JSON.stringify(tokenInfo);

    return(
        <Box display='flex' height='100vh' >
            <Box flex='1'>
                <h1>Dashboard</h1>
                <Button onClick={handleLogout}>Logout</Button>
                <Text>{tokenInfoString}</Text>
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