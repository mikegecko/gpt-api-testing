import { PropTypes } from 'prop-types';
import { Box, Button, Divider, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Text, useColorMode } from '@chakra-ui/react';
import { Modal } from "@chakra-ui/react"

export default function SettingsModal({isOpen, onOpen, onClose}){
    const {colorMode, toggleColorMode} = useColorMode();
    return(
        <Box display="flex" justifyContent="center" alignItems="center">
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader >
                        Settings
                        <Divider mt={2} />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display='flex' flexDir='row' justifyContent='space-between'>
                        <Text>Color Mode</Text>
                        <Box display='flex' flexDir='row' justifyContent='center'>
                            <Text mr={2}>Dark</Text>
                        <Switch size='lg' isChecked={colorMode === 'light'} onChange={toggleColorMode} />
                            <Text ml={2}>Light</Text>
                        </Box>
                        </Box>
                        

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

SettingsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
};