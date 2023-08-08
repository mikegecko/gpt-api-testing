import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Input, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { router } from "../main";
import { verify } from "../utils/api";
import Header from "../components/Header";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewAdventure(){
    const loaderData = useLoaderData();
    const [tabIndex, setTabIndex] = useState(0)
    const [classValue, setClassValue] = useState(null)


    const genres = [
        {
            id: "fantasy",
            name: "Fantasy",
            classes: [
                "Knight","Warrior","Mage","Ranger","Bard","Thief","Cleric","Paladin","Druid","Rogue","Monk","Assassin",
            ]
        },
        {
            id: "mystery",
            name: "Mystery",
            classes: [
                "Patient",
                "Detective",
                "Spy",
                "Doctor",
                "Nurse",
                "Police Officer",
            ]
        },
        {
            id: "zombies",
            name: "Zombies",
            classes: [
                "Survivor",
                "Scientist",
                "Soldier",
                "Zombie",
                "Medic",
                "Boss",
            ]
        },
        {
            id: "apocalyptic",
            name: "Apocalyptic",
            classes: [
                "Survivor",
                "Scientist",
                "Soldier",
                "Infected",
                "Medic",
                "Mechanic",
            ]
        },
        {
            id: "cyberpunk",
            name: "Cyberpunk",
            classes: [
                "Cyborg",
                "Robot",
                "Android",
                "Mechanic",
                "Programmer",
                "Engineer",
                "Security",
            ]
        },
        {
            id: "isekai",
            name: "Isekai",
            classes: [
                "Unemployed",
                "Student",
                "Teacher",
                "Lawyer",
            ]
        },
        {
            id: "custom",
            name: "Custom",
            classes: [
                'test'
            ]
        },
    ]

    const onTabChange = (index) => {
        setClassValue(null);
        setTabIndex(index);
    }

    // useEffect(() => {
    //     console.log("Radio value:", classValue );
    // },[classValue])

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
                            {genres.map(genre => (
                                <Tab key={genre.id} id={genre.id} >{genre.name}</Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {genres.map(genre => (
                                <TabPanel key={genre.id} display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                                    <Text fontSize='2xl'>Classes</Text>
                                    <Divider m={4} />
                                    <RadioGroup onChange={setClassValue} value={classValue}>
                                        <Stack>
                                            {genre.classes.map((c, index) => (
                                                <Radio value={index.toString()} key={index}>{c}</Radio>
                                            ))}
                                        </Stack>
                                    </RadioGroup>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </Box>
                <Divider m={4} width='75%' />
                <Accordion mb={4} w='75%' allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box as='span' flex='1' textAlign='left'>
                                    Advanced
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                            <Box>
                                <Text>Advanced Settings</Text>
                            </Box>
                            <Divider m={4} />
                            <Box>
                                <Input variant='' placeholder='Temperature' type="number"  />
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
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