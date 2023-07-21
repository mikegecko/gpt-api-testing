import { ArrowForwardIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Link, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";

export default function Root() {

    const {colorMode, toggleColorMode} = useColorMode();

    const bg_circle = useColorModeValue('black', 'white');
    const bg_header = useColorModeValue('brand.400', 'brand.600');
    const bg_text = useColorModeValue('gray.800', 'gray.200');
    const bg_button = useColorModeValue('white', ' brand.800');
    return(
        <Box display='flex' height='100vh' width='100vw' flexDirection='column' sx={{backgroundImage: `radial-gradient(circle, ${bg_circle} 2px, rgba(0, 0, 0, 0) 3px);`, backgroundSize: '60px 60px'}} >
            <Box height='20' background={bg_header} display='flex' alignItems='center' justifyContent='space-between'  >
                <Box display='flex' alignItems='center' width='10%' ml={8} >
                    <IconButton onClick={toggleColorMode} background={bg_button} aria-label="color mode" icon={<QuestionOutlineIcon />} />
                </Box>
                <Box display='flex' width='30%' alignItems='center' justifyContent='space-evenly'>
                    <Link fontWeight='semibold' href="#">Product</Link>
                    <Link fontWeight='semibold' href="#">Features</Link>
                    <Link fontWeight='semibold' href="#">FAQ</Link>
                    <Link fontWeight='semibold' href="#">Company</Link>
                </Box>
                <Box display='flex' justifyContent='flex-end' width='10%' mr={8}>
                    <Button color={bg_text} variant='link' as='a' rightIcon={<ArrowForwardIcon />} href="/auth/login">Log in</Button>
                </Box>
            </Box>
            <Box className="" flex='1' >
                <Text  fontSize='4xl' fontWeight='bold' textAlign='center' mt={6}>
                    Welcome to the future of AI
                </Text>
            </Box>
        </Box>
    )
}