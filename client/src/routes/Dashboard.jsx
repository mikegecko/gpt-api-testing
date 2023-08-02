import { useEffect, useState } from "react";
import { router } from "../main";
import { decodeToken, verify } from "../utils/api";
import { useLoaderData } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export default function Dashboard() {
    const encodedToken = useLoaderData();
    const [tokenInfo, setTokenInfo] = useState(null);



    useEffect(() => {
        const jwt = localStorage.getItem('gptapi-token');
        decodeToken(jwt).then(res => {setTokenInfo(res)});
    },[])

    return(
        <Box>
            
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
        //FIX: res.success is undefined when token is expired
        verify(localStorage.getItem('gptapi-token')).then((res) => {res.success ? console.log("Token is valid") : router.navigate('/auth/login')}).catch(err => { router.navigate('/auth/login'); console.log(err)})
    }
    return jwt;
}