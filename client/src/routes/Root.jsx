import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/react";

export default function Root() {
    return(
        <Box display='flex' height='100vh' width='100vw' flexDirection='column' sx={{backgroundImage: 'radial-gradient(circle, #000000 2px, rgba(0, 0, 0, 0) 3px);', backgroundSize: '60px 60px'}} >
            <Box height='20' background='brand.400' display='flex' alignItems='center' justifyContent='space-between'  >
                <QuestionOutlineIcon boxSize={8} ml={8} />
                <Box display='flex'   alignItems='center'>
                    <Link href="#">Product</Link>
                    <Link href="#">Features</Link>
                    <Link href="#">FAQ</Link>
                    <Link href="#">Company</Link>
                </Box>
                <Box mr={8}>
                    <Link href="/auth/login">Log in</Link>
                </Box>
            </Box>
            <Box className="glass" flex='1' >

            </Box>
        </Box>
    )
}