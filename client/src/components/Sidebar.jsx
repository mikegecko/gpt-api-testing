import { AddIcon, ArrowLeftIcon, ArrowRightIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Divider, Heading, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";


export default function Sidebar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box height='100%' display='flex'>
      <IconButton zIndex={0} position='absolute' top={'48px'} left={0} m={4} hidden={!isOpen} onClick={onToggle} aria-label="Open sidebar" icon={<ArrowRightIcon />} />
      <AnimatePresence initial={false}>
        {!isOpen && (
      <motion.aside initial={{ x: '-100%' }} animate={{ x: isOpen ? '100%' : '0%', display: isOpen ? 'none' : 'block' }} exit={{ x: '-100%', transition: { duration: 0.2 } }} transition={{ duration: 0.2 }} style={{ zIndex: 0, width: '300px', position: 'relative'}}>
        <Box maxW='300px' minW='250px' width='100%' height='100%' display='flex' flexDir='column' justifyContent='space-between' background='brand.600'>
            <Box>
                <Box m={2} display='flex' flexDir='row' alignItems='center'>
                    <IconButton as='a' href="/" icon={<QuestionOutlineIcon />} />
                    <Heading size='md' ml={2} mr={2}>Sidebar</Heading>
                </Box>
                <Box display='flex' gap={2} m={2}>
                    <Button display='flex' flex='1' justifyContent='flex-start' variant='outline' gap={2} alignItems='center' leftIcon={<AddIcon />}>New Game</Button>
                    <IconButton onClick={onToggle} aria-label="close sidebar" icon={<ArrowLeftIcon />} variant='outline' />
                </Box>
            </Box>
            <Box display='flex' flexDir='column' gap={2} p={2}>
                <Divider />
                <Button display='flex' justifyContent='flex-start' gap={2} alignItems='center' variant='ghost'>
                    <Avatar size='sm' name="temp" src='https://bit.ly/broken-link' />
                    <Text p={2} mt={0.25}>Username</Text>
                </Button>
            </Box>
        </Box>
      </motion.aside>
        )}
      </AnimatePresence>
    </Box>
  );
}
