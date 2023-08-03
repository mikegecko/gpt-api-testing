import { PropTypes } from 'prop-types';
import { Avatar, Box, Button, IconButton, Link, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { CurrencyIcon } from "./CurrencyIcon";
import { ArrowForwardIcon, HamburgerIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import AvatarMenu from './AvatarMenu';

export default function Header({jwtValid}) {

    const {colorMode, toggleColorMode} = useColorMode();
    const bg_circle = useColorModeValue('brand.800', 'brand.100');
    const bg_header = useColorModeValue('brand.400', 'brand.600');
    const bg_text = useColorModeValue('gray.800', 'gray.200');
    const bg_button = useColorModeValue('white', ' brand.800');

    return(
        <Box zIndex={10} height='60px' width='100%' background={bg_header} position='sticky' sx={{top: 0, left: 0, zIndex: 15}} display='flex' alignItems='center' justifyContent='space-between' >
                <Box display={{base: 'none', lg: 'flex'}} alignItems='center' width='10%' ml={8} >
                    <IconButton onClick={toggleColorMode} background={bg_button} aria-label="color mode" icon={<QuestionOutlineIcon />} />
                </Box>
                <Box display={{base: 'none', lg: 'flex'}} width='30%' alignItems='center' justifyContent='space-evenly'>
                    <Link fontWeight='semibold' href="/">Product</Link>
                    <Link fontWeight='semibold' href="#">Features</Link>
                    <Link fontWeight='semibold' href="#">FAQ</Link>
                    <Link fontWeight='semibold' href="/mp">Company</Link>
                </Box>
                <Box display={{base: 'none', lg: 'flex'}} alignItems='center' justifyContent='flex-end' width='10%' mr={8}>
                    <Box display={jwtValid ? 'flex' : 'none'} alignItems='center' justifyContent='center' mr={4}>
                    <CurrencyIcon />
                    <Text>
                        100
                    </Text>
                    </Box>
                    {jwtValid ? (<AvatarMenu />): (<Button color={bg_text} variant='link' as='a' rightIcon={<ArrowForwardIcon />} href="/auth/login">Log in</Button>)}
                </Box>
                {/* Mobile View */}
                <Box display={{base: 'flex', lg: 'none'}} alignItems='center' justifyContent='flex-end' width='100%' mr={4}>
                    <IconButton variant='unstyled' aria-label="menu" icon={<HamburgerIcon boxSize={8} />} />
                </Box>
            </Box>
    )
}

Header.propTypes = {
    jwtValid: PropTypes.bool.isRequired
};