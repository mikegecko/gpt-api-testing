import { Box, Button, Input, Text } from "@chakra-ui/react";
import { router } from "../main";
import { decodeToken, gptChatCompletion, gptProxyChatCompletion, verify } from "../utils/api";
import { useEffect, useRef, useState } from "react";
import { ArrowForwardIcon} from "@chakra-ui/icons";
import Sidebar from "../components/Sidebar";
import { useLoaderData } from "react-router-dom";

//Remake this into a conversation component

export default function Dashboard_old() {
    const encodedToken = useLoaderData();
    const [tokenInfo, setTokenInfo] = useState(null);
    const [input, setInput] = useState("");
    const [response, setResponse] = useState(null);
    const [messages, setMessages] = useState([]);
    const messageContainerRef = useRef(null);
    // Rework this prompt
    const systemMessage = "You are the controller of a text-based adventure game. Begin by populating the player data. Modify things like health and experience using the appropriate functions, call functions in succession if two or more values need updating"
    //const tokenInfoString = JSON.stringify(tokenInfo);

    const scrollToBottom = () => {
        if(messageContainerRef.current){
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }

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
            if(res.choices !== undefined){
                const message = res.choices[0].message;
                setMessages([...messages, message]);
            }
            if(res.response_message !== undefined && res.function_response_data !== undefined && res.second_response_data !== undefined){
                const call_message = {role: res.response_message.role, content: `Calling function ${res.response_message.function_call.name} . . .`};
                const func_message = res.function_response_data;
                const message = res.second_response_data.choices[0].message;
                setMessages([...messages, call_message, func_message, message]);
            }
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
            // gptChatCompletion(messages, tokenInfo.apiKey).then(res => {
            //   addResponseToMessage(res, userMessage);
            //   setResponse(res);
            //   console.log(res);
            // });
            gptProxyChatCompletion(messages, encodedToken).then(res => {
                console.log(res);
                //Destructure the response
                if(res.choices !== undefined){
                    addResponseToMessage(res, userMessage);
                    setResponse(res);
                }
                if(res.response_message !== undefined && res.function_response_data !== undefined && res.second_response_data !== undefined){
                    addResponseToMessage(res, userMessage);
                    setResponse(res.second_response_data);
                }
                
            })
          }
          //If messages is too long, truncate it
          if(messages.length > 20){
            setMessages(truncateMessages(messages));
          }
          scrollToBottom(); //Scroll to bottom when new message is added
        console.log(messages);
    }, [messages])

    return(
        <Box display='flex' height='100vh' width='100vw' flexDir='row' backgroundColor='brand.900' >
            <Sidebar tokenInfo={tokenInfo} />
            <Box display='flex' flexDir='column' width='100%' height='100%' mr={40} ml={40}>
                <Box display='flex' gap={2} p={2} flex='1' flexDir='column' overflowY='auto' height='100%' ref={messageContainerRef}>
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
    return jwt;
}