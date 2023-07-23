import { AddIcon, ArrowLeftIcon, ArrowRightIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";


export default function Sidebar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box height='100%' display='flex'>
      <IconButton position='absolute' top={'40px'} left={0} m={4} hidden={!isOpen} onClick={onToggle} aria-label="Open sidebar" icon={<ArrowRightIcon />} />
      <AnimatePresence>
        {!isOpen && (
      <motion.aside initial={{ x: '-100%' }} animate={{ x: isOpen ? '100%' : '0%', display: isOpen ? 'none' : 'block' }} exit={{ x: '-100%', transition: { duration: 0.2 } }} transition={{ duration: 0.2 }} style={{ zIndex: 0, width: '300px', position: 'relative'}}>
        <Box maxW='300px' minW='250px' width='100%' height='100%' display='flex' flexDir='column' background='brand.600'>
                <Box m={2} display='flex' flexDir='row' alignItems='center'>
                <IconButton as='a' href="/" icon={<QuestionOutlineIcon />} />
                <Heading size='md' ml={2} mr={2}>Sidebar</Heading>
                </Box>
                <Box display='flex' gap={2} m={2}>
                <Button display='flex' flex='1' justifyContent='flex-start' variant='outline' gap={2} alignItems='center' leftIcon={<AddIcon />}>New Game</Button>
                <IconButton onClick={onToggle} aria-label="close sidebar" icon={<ArrowLeftIcon />} variant='outline' />
                </Box>
        </Box>
      </motion.aside>
        )}
      </AnimatePresence>
    </Box>
  );
}
