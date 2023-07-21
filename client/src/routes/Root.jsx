import { React, useState } from 'react';
import { ArrowForwardIcon, HamburgerIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Link, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import Background from '../components/Background';


export default function Root() {

    const {colorMode, toggleColorMode} = useColorMode();


    const bg_circle = useColorModeValue('brand.800', 'brand.100');
    const bg_header = useColorModeValue('brand.400', 'brand.600');
    const bg_text = useColorModeValue('gray.800', 'gray.200');
    const bg_button = useColorModeValue('white', ' brand.800');

    


    return(
        <Box display='flex' height='100vh' width='100vw' flexDirection='column' overflow='hidden' >  
            <Box zIndex={10} height='20' background={bg_header} display='flex' alignItems='center' justifyContent='space-between'  >
                <Box display={{base: 'none', lg: 'flex'}} alignItems='center' width='10%' ml={8} >
                    <IconButton onClick={toggleColorMode} background={bg_button} aria-label="color mode" icon={<QuestionOutlineIcon />} />
                </Box>
                <Box display={{base: 'none', lg: 'flex'}} width='30%' alignItems='center' justifyContent='space-evenly'>
                    <Link fontWeight='semibold' href="#">Product</Link>
                    <Link fontWeight='semibold' href="#">Features</Link>
                    <Link fontWeight='semibold' href="#">FAQ</Link>
                    <Link fontWeight='semibold' href="#">Company</Link>
                </Box>
                <Box display={{base: 'none', lg: 'flex'}} justifyContent='flex-end' width='10%' mr={8}>
                    <Button color={bg_text} variant='link' as='a' rightIcon={<ArrowForwardIcon />} href="/auth/login">Log in</Button>
                </Box>
                {/* Mobile View */}
                <Box display={{base: 'flex', lg: 'none'}} alignItems='center' justifyContent='flex-end' width='100%' mr={4}>
                    <IconButton variant='unstyled' aria-label="menu" icon={<HamburgerIcon boxSize={8} />} />
                </Box>
            </Box>
            <Box zIndex={10} flex='1' display='flex' alignItems='center' justifyContent='center' flexDirection='column' >
                <Text  fontSize={{base: '4xl', md: '4xl', lg: '6xl'}} fontWeight='bold' textAlign='center'>
                    Welcome to the future of AI
                </Text>
                <Text fontSize={{base: 'xl', md: 'xl', lg: '2xl'}} fontWeight='300' textAlign='center' mb={2}>
                    AI is changing how business works, lets change it together
                </Text>
                <Box>
                    <Button color={bg_text} backdropFilter='blur(4px)' variant='solid' as='a' rightIcon={<ArrowForwardIcon />} href="#">Get Started</Button>
                </Box>
            </Box>
        </Box>

    )
}