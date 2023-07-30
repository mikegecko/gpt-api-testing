import { ArrowForwardIcon, HamburgerIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, IconButton, Link, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Background from '../components/Background';
import { verify } from '../utils/api';
import { useLoaderData } from 'react-router-dom';


export default function Root() {

    const {colorMode, toggleColorMode} = useColorMode();
    const loaderData = useLoaderData();
    const bg_circle = useColorModeValue('brand.800', 'brand.100');
    const bg_header = useColorModeValue('brand.400', 'brand.600');
    const bg_text = useColorModeValue('gray.800', 'gray.200');
    const bg_button = useColorModeValue('white', ' brand.800');


    return(
        <Box display='flex' height='100vh' width='100vw' flexDirection='column' overflow='hidden' >  
            <Box zIndex={10} height='60px' background={bg_header} display='flex' alignItems='center' justifyContent='space-between' >
                <Box display={{base: 'none', lg: 'flex'}} alignItems='center' width='10%' ml={8} >
                    <IconButton onClick={toggleColorMode} background={bg_button} aria-label="color mode" icon={<QuestionOutlineIcon />} />
                </Box>
                <Box display={{base: 'none', lg: 'flex'}} width='30%' alignItems='center' justifyContent='space-evenly'>
                    <Link fontWeight='semibold' href="#">Product</Link>
                    <Link fontWeight='semibold' href="#">Features</Link>
                    <Link fontWeight='semibold' href="#">FAQ</Link>
                    <Link fontWeight='semibold' href="/mp">Company</Link>
                </Box>
                <Box display={{base: 'none', lg: 'flex'}} alignItems='center' justifyContent='flex-end' width='10%' mr={8}>
                    {loaderData.jwtValid ? (<Button display='flex' alignItems='center' justifyContent='center' variant='unstyled' as='a' href='/dashboard'><Avatar size='sm' name={'temp'} src={null} /></Button>): (<Button color={bg_text} variant='link' as='a' rightIcon={<ArrowForwardIcon />} href="/auth/login">Log in</Button>)}
                </Box>
                {/* Mobile View */}
                <Box display={{base: 'flex', lg: 'none'}} alignItems='center' justifyContent='flex-end' width='100%' mr={4}>
                    <IconButton variant='unstyled' aria-label="menu" icon={<HamburgerIcon boxSize={8} />} />
                </Box>
            </Box>
            <Box zIndex={10} flex='1' display='flex' alignItems='center' justifyContent='center' flexDirection='column' >
                <Text  fontSize={{base: '4xl', md: '4xl', lg: '6xl'}} fontWeight='bold' textAlign='center'>
                    Welcome to the GPT Dungeon
                </Text>
                <Text fontSize={{base: 'md', md: 'md', lg: 'xl'}} mr={24} ml={24} fontWeight='300' textAlign='center' mb={8}>
                Embark on an unforgettable adventure like never before with GPT Dungeon - the ultimate AI-powered text-based game. Immerse yourself in a world of limitless possibilities, where your choices shape the story. Are you ready to test your wits and unravel the mysteries of the GPT Dungeon? Prepare for a thrilling journey into the unknown. Begin your adventure now!
                </Text>
                <Box>
                    <Button color={bg_text} backdropFilter='blur(4px)' variant='solid' as='a' rightIcon={<ArrowForwardIcon />} href="#">Get Started</Button>
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