import { useEffect, useState } from "react";
import { router } from "../main";
import { decodeToken, verify } from "../utils/api";
import { useLoaderData } from "react-router-dom";
import { Box, Divider, Text } from "@chakra-ui/react";
import Header from "../components/Header";

export default function Dashboard() {
    const loaderData = useLoaderData();
    const [tokenInfo, setTokenInfo] = useState(null);

    const newAdventure = () => {
        console.log("New Adventure");
    }

    useEffect(() => {
        const jwt = localStorage.getItem('gptapi-token');
        decodeToken(jwt).then(res => {setTokenInfo(res)});
    },[])

    return(
        <Box display='flex' minH='100vh' minW='100vw' flexDir='column' backdropFilter='blur(100px)'>
            <Header jwtValid={loaderData.jwtValid} />
            <Box display='flex' flexDir='column' justifyContent='flex-start' alignItems='center' padding='1rem'>
                <Box display='flex' flexDir='row' flexGrow='1' justifyContent='flex-start' alignItems='flex-start' padding='1rem' gap='2rem'>
                    <Box onClick={newAdventure} height='300px' width='300px' backgroundColor='brand.500' borderRadius='10px' padding='1rem'>
                        New Adventure
                    </Box>
                    <Box height='300px' width='300px' backgroundColor='brand.500' borderRadius='10px' padding='1rem'>
                        Resume Adventure
                    </Box>
                </Box>
                <Text fontSize='2xl' mt={8}>Previous Adventures</Text>
                <Divider />
                <Box>
                    <Box display='flex' flexDir='row' flexGrow='1' justifyContent='flex-start' alignItems='flex-start' padding='1rem' gap='2rem' mt={4}>
                    <Box height='300px' width='300px' backgroundColor='brand.500' borderRadius='10px' padding='1rem' >
                        Adventure 1
                    </Box>
                    <Box height='300px' width='300px' backgroundColor='brand.500' borderRadius='10px' padding='1rem'>
                        Adventure 2
                    </Box>
                </Box>
                </Box>
            </Box>
        </Box>
    )

}

export async function dashboardLoader () {
    //Redirects to login if no token is found
    const jwt = localStorage.getItem('gptapi-token');
    let jwtValid = false;
    if(!jwt){
    router.navigate('/auth/login');
    }
    // if(jwt){
    //     //FIX: res.success is undefined when token is expired
    //     verify(localStorage.getItem('gptapi-token')).then((res) => {res.success ? console.log("Token is valid") : router.navigate('/auth/login')}).catch(err => { router.navigate('/auth/login'); console.log(err)})
    // }
    if(jwt){
        try {
            const res = await verify(localStorage.getItem('gptapi-token'));
            //console.log(res);
            if(res === undefined){
                //Token is invalid
                router.navigate('/auth/login')
                return({
                    jwtValid: jwtValid,
                    jwt: jwt,
                })
            }
            if(!res.success){
                //Token is invalid
                router.navigate('/auth/login')
                return({
                    jwtValid: jwtValid,
                    jwt: jwt,
                })
            }
            if(res.success){
                //Token is valid, show avatar and hide login button
                jwtValid = true;
                return({
                    jwtValid: jwtValid,
                    jwt: jwt,
                })
            }
        } catch (error) {
            console.log(error);
            //Token is invalid
            router.navigate('/auth/login')
            return({
                jwtValid: jwtValid,
                jwt: jwt,
            })
        }
    }
    return ({jwt: jwt, jwtValid: jwtValid});
}