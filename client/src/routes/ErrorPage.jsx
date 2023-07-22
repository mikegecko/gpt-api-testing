import { Box, Button, Heading, Text } from "@chakra-ui/react";

export default function ErrorPage() {
    return(
        <Box width='100vw' height='100vh' display="flex" flexDir="column" justifyContent="center" alignItems="center">
            <Text fontSize='lg' color='brand.600'>404</Text>
            <Heading as='h1' size='4xl'>Page not found</Heading>
            <Text mt='4' fontSize='lg'>Sorry, we couldn't find the page you're looking for</Text>
            <Box mt='4' display='flex' gap='2'>
                <Button as='a' variant="solid">Go back home</Button>
                <Button as='a' variant="ghost">Contact Support</Button>
            </Box>
        </Box>
    )
}