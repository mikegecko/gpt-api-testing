import { PropTypes } from 'prop-types';
import { Box, Button, Divider, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Modal } from "@chakra-ui/react"

export default function ProfileModal({isOpen, onOpen, onClose, tokenInfo}){
    return(
        <Box display="flex" justifyContent="center" alignItems="center">
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader >
                        Profile
                        <Divider mt={2} />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Email: { tokenInfo ? tokenInfo.email : null}

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

ProfileModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    tokenInfo: PropTypes.object
};