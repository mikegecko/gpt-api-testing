import { Box, Button, Divider, Input, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { router } from "../main";
import { verify } from "../utils/api";
import Header from "../components/Header";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export default function NewAdventure(){
    const loaderData = useLoaderData();
    const [tabIndex, setTabIndex] = useState(0)
    const [classValue, setClassValue] = useState(1)


    const onTabChange = (index) => {
        setClassValue(null);
        (index) => setTabIndex(index)
    }

    return(
        <Box display='flex' height='100%' minH='100vh' width='100%' flexDirection='column' backdropFilter='blur(100px)'>
            <Header jwtValid={loaderData.jwtValid} />
            <Box mt={8} mb={8} flex='1' display='flex' flexDir='column' justifyContent='flex-start' alignItems='center'>
                <Text fontSize='4xl' fontWeight='bold'>New Adventure</Text>
                <Divider m={4} width='75%' />
                <Box display='flex' flexDir="column" gap='1rem'>
                    <Input variant='' placeholder='Adventure Title' />
                    <Input variant='' placeholder='Player Name' />
                </Box>
                <Text fontSize='4xl' mt={8} fontWeight='bold'>Setting</Text>
                <Divider m={4} width='75%' />
                <Box display='flex' flexDir="column" gap='1rem'>
                    <Tabs onChange={onTabChange} variant='soft-rounded' >
                        <TabList gap='1rem'>
                            <Tab>Fantasy</Tab>
                            <Tab>Mystery</Tab>
                            <Tab>Zombies</Tab>
                            <Tab>Apocalyptic</Tab>
                            <Tab>Cyberpunk</Tab>
                            <Tab>Isekai</Tab>
                            <Tab>Custom</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel id="fantasy" display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                                <Text fontSize='2xl'>Classes</Text>
                                <Divider m={4} />
                                <RadioGroup onChange={setClassValue} value={classValue}>
                                <Stack>
                                    <Radio value="1">Warrior</Radio>
                                    <Radio value="2">Mage</Radio>
                                    <Radio value="3">Ranger</Radio>
                                    <Radio value="4">Bard</Radio>
                                    <Radio value="5">Thief</Radio>
                                    <Radio value="6">Cleric</Radio>
                                    <Radio value="7">Paladin</Radio>
                                    <Radio value="8">Druid</Radio>
                                    <Radio value="9">Rogue</Radio>
                                    <Radio value="10">Monk</Radio>
                                    <Radio value="11">Assassin</Radio>
                                </Stack>
                                </RadioGroup>
                            </TabPanel>
                            <TabPanel id="mystery" display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                            <Text fontSize='2xl'>Classes</Text>
                                <Divider m={4} />
                                <RadioGroup onChange={setClassValue} value={classValue}>
                                <Stack>
                                    <Radio value="1">Patient</Radio>
                                    <Radio value="2">Detective</Radio>
                                    <Radio value="3">Spy</Radio>
                                    <Radio value="4">Doctor</Radio>
                                    <Radio value="5">Nurse</Radio>
                                    <Radio value="6">Police Officer</Radio>
                                </Stack>
                                </RadioGroup>
                            </TabPanel>
                            <TabPanel id="zombies" display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                            <Text fontSize='2xl'>Classes</Text>
                                <Divider m={4} />
                                <RadioGroup onChange={setClassValue} value={classValue}>
                                <Stack>
                                    <Radio value="1">Survivor</Radio>
                                    <Radio value="2">Scientist</Radio>
                                    <Radio value="3">Soldier</Radio>
                                    <Radio value="4">Zombie</Radio>
                                    <Radio value="5">Medic</Radio>
                                    <Radio value="6">Boss</Radio>
                                </Stack>
                                </RadioGroup>
                            </TabPanel>
                            <TabPanel id="apocalyptic" display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                            <Text fontSize='2xl'>Classes</Text>
                                <Divider m={4} />
                                <RadioGroup onChange={setClassValue} value={classValue}>
                                <Stack>
                                    <Radio value="1">Survivor</Radio>
                                    <Radio value="2">Scientist</Radio>
                                    <Radio value="3">Soldier</Radio>
                                    <Radio value="4">Infected</Radio>
                                    <Radio value="5">Medic</Radio>
                                    <Radio value="6">Mechanic</Radio>
                                </Stack>
                                </RadioGroup>
                            </TabPanel>
                            <TabPanel id="cyberpunk" display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                            <Text fontSize='2xl'>Classes</Text>
                                <Divider m={4} />
                                <RadioGroup onChange={setClassValue} value={classValue}>
                                <Stack>
                                    <Radio value="1">Cyborg</Radio>
                                    <Radio value="2">Robot</Radio>
                                    <Radio value="3">Android</Radio>
                                    <Radio value="4">Mechanic</Radio>
                                    <Radio value="5">Programmer</Radio>
                                    <Radio value="6">Engineer</Radio>
                                    <Radio value="7">Security</Radio>
                                </Stack>
                                </RadioGroup>
                            </TabPanel>
                            <TabPanel id="isekai" display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                            <Text fontSize='2xl'>Classes</Text>
                                <Divider m={4} />
                                <RadioGroup onChange={setClassValue} value={classValue}>
                                <Stack>
                                    <Radio value="1">Unemployed</Radio>
                                    <Radio value="2">Student</Radio>
                                    <Radio value="3">Teacher</Radio>
                                    <Radio value="4">Lawyer</Radio>
                                    

                                </Stack>
                                </RadioGroup>
                            </TabPanel>
                            <TabPanel id="custom" display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                                <Text>Custom</Text>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Divider m={4} width='75%' />
                    <Box>
                        <Button>Start Adventure</Button>
                    </Box>
            </Box>
        </Box>
    )

}

export async function newAdventureLoader () {
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