import { useEffect, useState } from "react";
import { router } from "../main";
import { createNewConversation, decodeToken, getConversationIds, verify } from "../utils/api";
import { useLoaderData } from "react-router-dom";
import { Box, Divider, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import AdventureCard from "../components/AdventureCard";

export default function Dashboard() {
    const loaderData = useLoaderData();
    const [tokenInfo, setTokenInfo] = useState(null);
    const [newConvo, setNewConvo] = useState(null); 
    const [convoIds, setConvoIds] = useState([]);
    const newAdventure = () => {
        //console.log("New Adventure");
        // const newConvo = {
        //     title: 'Test',
        //     messages:[{role: 'system', content: 'Welcome to the new conversation!'}],
        // }
        //createNewConversation(newConvo, loaderData.jwt).then(res => {console.log(res)});
        router.navigate('/new');
    }

    const resumeAdventure = () => {
        console.log("resume Adventure");
    }

    useEffect(() => {
        const jwt = localStorage.getItem('gptapi-token');
        decodeToken(jwt).then(res => {setTokenInfo(res)});

        const getConvoIds = async () => {
            getConversationIds(loaderData.jwt).then(res => {setConvoIds(res)});
        }
        getConvoIds();
    },[])

    return(
        <Box display='flex' minH='100vh' height='100%' width='100%' flexDir='column' backdropFilter='blur(100px)'>
            <Header jwtValid={loaderData.jwtValid} />
            <Box display='flex' flexDir='column' justifyContent='flex-start' alignItems='center' padding='1rem'>
                <Box display='grid' gridTemplateColumns={{base: '1fr', lg: '1fr 1fr'}} flexDir='row' flexGrow='1' justifyContent='flex-start' alignItems='flex-start' padding='1rem' gap='2rem'>
                    <AdventureCard title="New Adventure" onClick={newAdventure} />
                    <AdventureCard title="Resume Adventure" onClick={resumeAdventure} />
                </Box>
                <Text fontSize='2xl' mt={8}>Previous Adventures</Text>
                <Divider />
                <Box display='grid' gridTemplateColumns={{base: '1fr', lg: '1fr 1fr'}} mt={4} flexDir='row' flexGrow='1' justifyContent='flex-start' alignItems='flex-start' padding='1rem' gap='2rem'>
                    {convoIds.map((convoId, index) => {
                        return(<AdventureCard key={index} id={convoId} title={convoId} onClick={resumeAdventure} />)
                    })}
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