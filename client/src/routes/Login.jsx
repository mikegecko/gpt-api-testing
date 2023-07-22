import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, FormControl, Heading, IconButton, Input, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Login() {

    const [loginInfo, setLoginInfo] = useState({email: '', password: ''});

    const handleInfoChange = (e) => {
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //api call and token authentication
    }
    // useEffect(() => {
    //     console.log(loginInfo);
    // },[loginInfo])

    return(
        <Box display="flex" flexDir='column' justifyContent="center" alignItems="center" height="100vh" width="100vw">
            <IconButton icon={<QuestionOutlineIcon />} />
            <Heading mt={8} as='h1' fontSize='4xl' >Sign in to your account</Heading>
            <Box mt={12}>
                <FormControl onSubmit={handleSubmit}>
                    <Input id='email' onChange={handleInfoChange} value={loginInfo.email} type="email" name="email" placeholder="Email" borderRadius='5px 5px 0px 0px' />
                    <Input id="pw" onChange={handleInfoChange} value={loginInfo.password} mt='-1px' name="password" type="password" placeholder="Password" borderRadius='0px 0px 5px 5px' />
                    <Box display='flex' justifyContent='space-between' alignItems='center' mt='8px'>
                    <Checkbox>Remember me</Checkbox>
                    <Link href="/forgot-password">Forgot password?</Link>
                    </Box>
                    <Button type="submit" mt='16px' width='100%' borderRadius='5px' bgColor='blue.500' color='white'>Sign in</Button>
                </FormControl>
                <Box display='flex' justifyContent='center' alignItems='center' mt='8'>
                    <Link href="/auth/signup">Don't have an account? Sign up</Link>
                </Box>
            </Box>
        </Box>
    )
}