import { ArrowForwardIcon, HamburgerIcon, QuestionOutlineIcon, TimeIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Divider, IconButton, Link, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Background from '../components/Background';
import { verify } from '../utils/api';
import { useLoaderData } from 'react-router-dom';
import ImageCarousel from "../components/ImageCarousel";
import { CurrencyIcon } from "../components/CurrencyIcon";
import Header from "../components/Header";


export default function Root() {

    const {colorMode, toggleColorMode} = useColorMode();
    const loaderData = useLoaderData();
    const bg_circle = useColorModeValue('brand.800', 'brand.100');
    const bg_header = useColorModeValue('brand.400', 'brand.600');
    const bg_text = useColorModeValue('gray.800', 'gray.200');
    const bg_button = useColorModeValue('white', ' brand.800');
    // Replace with actual images and add in headers + text
    const images = ["https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",]

    return(
        <Box display='flex'minHeight='100vh' height='100%' width='100%' flexDirection='column' backdropFilter='blur(100px)' >
            <Header jwtValid={loaderData.jwtValid} />
            <Box zIndex={10} flex='1' display='flex' alignItems='center' justifyContent='flex-start' flexDirection='column' mt={4} >
                <ImageCarousel images={images} />
                <Text  fontSize={{base: '4xl', md: '4xl', lg: '6xl'}} fontWeight='bold' textAlign='center'>
                    Welcome to the GPT Dungeon
                </Text>
                <Text fontSize={{base: 'md', md: 'md', lg: 'xl'}} mr={24} ml={24} fontWeight='300' textAlign='center' mb={4} maxW="1037px">
                Embark on an unforgettable adventure like never before with GPT Dungeon - the ultimate AI-powered text-based game. Immerse yourself in a world of limitless possibilities, where your choices shape the story. Are you ready to test your wits and unravel the mysteries of the GPT Dungeon? Prepare for a thrilling journey into the unknown.
                </Text>
                <Box>
                    <Button color={bg_text} backdropFilter='blur(4px)' variant='solid' as='a' rightIcon={<ArrowForwardIcon />} href="#">Get Started</Button>
                </Box>
                <Box display={!loaderData.jwtValid ? 'none' : 'flex'} flexDirection="column" alignItems="center" justifyContent="center" mt={8} width='100%'>
                    <Box display='flex' flexDir='row' alignItems='center' justifyContent='center' width='100%' mb={4} gap={4}>
                    <TimeIcon boxSize={6}  />
                    <Text fontSize={{base: 'md', md: 'md', lg: 'xl'}} fontWeight='300' textAlign='center' >Recently Played</Text>
                    </Box>
                    <Divider w='80%' mb={8} />
                    
                </Box>
            </Box>
        </Box>

    )
}

export async function rootLoader () {
    //Show/hide avatar if logged in
    const jwt = localStorage.getItem('gptapi-token');
    let jwtValid = false;
    if(!jwt){
        //No token found
        return({
            jwtValid: jwtValid,
            jwt: jwt,
         })
    }
    if(jwt){
    try {
        const res = await verify(localStorage.getItem('gptapi-token'));
        //console.log(res);
        if(res === undefined){
            //Token is invalid
            return({
                jwtValid: jwtValid,
                jwt: jwt,
            })
        }
        if(!res.success){
            //Token is invalid
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
        return({
            jwtValid: jwtValid,
            jwt: jwt,
        }
        )
    }
    }
}