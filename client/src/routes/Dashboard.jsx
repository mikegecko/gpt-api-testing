import { Box, Button, Input, Text } from "@chakra-ui/react";
import { router } from "../main";
import { decodeToken, gptChatCompletion, logout, verify } from "../utils/api";
import { useEffect, useState } from "react";
import { AddIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

export default function Dashboard() {

    const [tokenInfo, setTokenInfo] = useState(null);
    const [input, setInput] = useState("");
    const [response, setResponse] = useState(null);
    const [messages, setMessages] = useState([]);

    const tokenInfoString = JSON.stringify(tokenInfo);

    const handleLogout = () => {
        logout();
    }

    const addUserMessage = (message) => {
        const formattedMessage = { "role": "user", "content": message };
        setMessages([...messages, formattedMessage]);
    }

    const handleSend = () => { 
        addUserMessage(input);
        //gptChatCompletion(messages, tokenInfo.apiKey).then(res => {addResponseToMessage(res); console.log(res);});
        setInput("");
    }

    const addResponseToMessage = (res) => {
        if(res != null){
            const message = res.choices[0].message;
            setMessages([...messages, message]);
        }
    }

    useEffect(() => {
        const jwt = localStorage.getItem('gptapi-token');
        decodeToken(jwt).then(res => {setTokenInfo(res);})

        const addSystemMessage = () => {
            setMessages([...messages, {"role": "system", "content": "You are a narrator in a text-based adventure game. Begin by asking the player for their name, class [mage, knight, assasin, archer] and where they would like to begin. Player stats are 100 health, 100 mana, and 100 stamina. Include the stats in every response."}]);
        }
        addSystemMessage();
    },[])

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].role === "user") {
            // Only trigger the API call when the user's input is added to messages
            const userMessage = messages[messages.length - 1].content;
            gptChatCompletion(messages, tokenInfo.apiKey).then(res => {
              addResponseToMessage(res, userMessage);
              setResponse(res);
              console.log(res);
            });
          }
        console.log(messages);
    }, [messages])

    return(
        <Box display='flex' height='100vh' width='100vw' flexDir='row' >
            <Box width='300px' height='100%' display='flex' flexDir='column' background='brand.800'>
                <h1>Sidebar</h1>
                <Box display='flex' gap={2} p={2}>
                <Button display='flex' flex='1' variant='outline' leftIcon={<AddIcon />}>New Game</Button>
                <Button variant='outline'><CloseIcon boxSize={3} /></Button>
                </Box>
            </Box>
            <Box display='flex' flexDir='column' width='100%' height='100%'>
                <Box display='flex' gap={2} p={2} flex='1' flexDir='column' overflowY='auto' height='100%'>
                {messages.map((message, index) => {
                    return(
                        <Text key={index}>{message.role} : {message.content}</Text>
                    )
                })}
                </Box>
                <Box>
                    <Text textAlign='center'>Total Tokens: { response != null ? response.usage.total_tokens : 0 }/4096 | Prompt Tokens: {response != null ? response.usage.prompt_tokens : 0} | Completion Tokens: {response != null ? response.usage.completion_tokens : 0}</Text>
                    <Box display='flex' gap='2'm={4} >
                        <Input onChange={(e) => setInput(e.target.value)} value={input} placeholder="Send message" />
                        <Button rightIcon={<ArrowForwardIcon />} onClick={handleSend}>Send</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export async function dashboardLoader () {
    //Redirects to login if no token is found
    const jwt = localStorage.getItem('gptapi-token');
    if(!jwt){
    router.navigate('/auth/login');
    }
    if(jwt){
    verify(localStorage.getItem('gptapi-token')).then((res) => {res.success ? console.log("Token is valid") : router.navigate('/auth/login')}).catch(err => { router.navigate('/auth/login'); console.log(err)})
    }
    return null;
}