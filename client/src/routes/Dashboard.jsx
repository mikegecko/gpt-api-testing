import { Box, Button, Input, Text } from "@chakra-ui/react";
import { router } from "../main";
import { decodeToken, gptChatCompletion, logout, verify } from "../utils/api";
import { useEffect, useState } from "react";
import { AddIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

    const [tokenInfo, setTokenInfo] = useState(null);
    const [input, setInput] = useState("");
    const [response, setResponse] = useState(null);
    const [messages, setMessages] = useState([]);
    const systemMessage = "You are a narrator in a text-based adventure game. Begin by asking the player for their name, class [mage, knight, assasin, archer] and where they would like to begin. When a user does an action add any of the following to the response [-10 health] [+10 health] [-10 mana] [+10 mana] [+10 gold] [-10 gold] [+10 stamina] [-10 stamina]."
    //const tokenInfoString = JSON.stringify(tokenInfo);

    const addUserMessage = (message) => {
        const formattedMessage = { "role": "user", "content": message };
        setMessages([...messages, formattedMessage]);
    }

    const handleSend = (e) => { 
        e.preventDefault();
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
    // This should be done by tokens not my message length
    const truncateMessages = (messageArr) => {
        if(messageArr.length > 20){
            return messageArr.slice(messageArr.length - 10, messageArr.length);
        }
    }

    useEffect(() => {
        const jwt = localStorage.getItem('gptapi-token');
        decodeToken(jwt).then(res => {setTokenInfo(res);})

        const addSystemMessage = () => {
            setMessages([...messages, {"role": "system", "content": systemMessage}]);
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
          //If messages is too long, truncate it
          if(messages.length > 20){
            setMessages(truncateMessages(messages));
          }
        console.log(messages);
    }, [messages])

    return(
        <Box display='flex' height='100vh' width='100vw' flexDir='row' >
            <Sidebar tokenInfo={tokenInfo} />
            <Box display='flex' flexDir='column' width='100%' height='100%' mr={40} ml={40}>
                <Box display='flex' gap={2} p={2} flex='1' flexDir='column' overflowY='auto' height='100%'>
                {messages.map((message, index) => {
                    return(
                        <Text key={index}>{message.role} : {message.content}</Text>
                    )
                })}
                </Box>
                <Box>
                    <Text textAlign='center'>Total Tokens: { response != null ? response.usage.total_tokens : 0 }/4096 | Prompt Tokens: {response != null ? response.usage.prompt_tokens : 0} | Completion Tokens: {response != null ? response.usage.completion_tokens : 0}</Text>
                    <form onSubmit={handleSend} method="POST">
                        <Box display='flex' gap='2'm={4} >
                            <Input type="text" variant='filled' onChange={(e) => setInput(e.target.value)} value={input} placeholder="Send message" />
                            <Button type="submit" rightIcon={<ArrowForwardIcon />}>Send</Button>
                        </Box>
                    </form>
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
        //FIX: res.success is undefined when token is expired
        verify(localStorage.getItem('gptapi-token')).then((res) => {res.success ? console.log("Token is valid") : router.navigate('/auth/login')}).catch(err => { router.navigate('/auth/login'); console.log(err)})
    }
    return null;
}