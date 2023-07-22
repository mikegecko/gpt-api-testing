import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, FormControl, Heading, IconButton, Input, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createUser } from "../utils/api";
import { router } from "../main";

export default function Signup() {

    const [newAccntInfo, setAccntInfo] = useState({email: '', password: '', confirmPw: ''});

    const handleInfoChange = (e) => {
        setAccntInfo({...newAccntInfo, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(newAccntInfo.password !== newAccntInfo.confirmPw) {
            alert('Passwords do not match')
        }
        else{
            const res = createUser(newAccntInfo.email, newAccntInfo.password);
            //console.log(res)
            res.then((data) => {console.log(data); data.status === 200 ? router.navigate('/') : console.log(data.message)}).catch((err) => console.log(err));
            setAccntInfo({email: '', password: '', confirmPw: ''});
        }
    }

    // useEffect(() => {
    //     console.log(newAccntInfo);
    // }, [newAccntInfo])

    return(
        <Box>
            <Box display="flex" flexDir='column' justifyContent="center" alignItems="center" height="100vh" width="100vw">
            <IconButton as='a' href='/' aria-label='Home' icon={<QuestionOutlineIcon />} />
            <Heading mt={8} as='h1' fontSize='4xl' >Create a new account</Heading>
            <Box width='50%' mt={12}>
                <form onSubmit={handleSubmit} method="POST">
                <FormControl>
                    <Input id='email' onChange={handleInfoChange} value={newAccntInfo.email} type="email" name="email" placeholder="Email" borderRadius='5px 5px 0px 0px' />
                    <Input id="pw" onChange={handleInfoChange} value={newAccntInfo.password} mt='-1px' name="password" type="password" placeholder="Password" borderRadius='0px 0px 0px 0px' />
                    <Input id="confirmPw" onChange={handleInfoChange} value={newAccntInfo.confirmPw} mt='-1px' name="confirmPw" type="password" placeholder="Confirm Password" borderRadius='0px 0px 5px 5px' />
                    <Box display='flex' justifyContent='space-between' alignItems='center' mt='8px'>
                    </Box>
                    <Button type="submit" mt='16px' width='100%' borderRadius='5px' bgColor='blue.500' color='white'>Create Account</Button>
                </FormControl>
                </form>
                <Box display='flex' justifyContent='center' alignItems='center' mt='8'>
                    <Link href='/auth/login'>Already have an account? Log in</Link>
                </Box>
            </Box>
        </Box>
        </Box>
    )
}