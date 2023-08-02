import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { Avatar, Button, Menu } from "@chakra-ui/react";
import { router } from '../main';
import { logout } from '../utils/api';
import { useRef } from 'react';

export default function AvatarMenu(){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();


    const handleLogout = () => {
        logout();
        router.navigate("/");
      };

    return(
        <>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Logout</AlertDialogHeader>
                    <AlertDialogBody>Are you sure?</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button colorScheme='red' onClick={handleLogout} ml={3}>
                            Logout
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        <Menu>
            <MenuButton>
                <Avatar size='sm' name={'temp'} src={null} />
            </MenuButton>
            <MenuList>
                <MenuItem as='a' href='/dashboard'>Play</MenuItem>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={onOpen}>Logout</MenuItem>
            </MenuList>
        </Menu>
        </>
    )
}