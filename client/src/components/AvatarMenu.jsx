import { MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Avatar, Button, Menu } from "@chakra-ui/react";

export default function AvatarMenu(){
    return(
        <Menu>
            <MenuButton>
                <Avatar size='sm' name={'temp'} src={null} />
            </MenuButton>
            <MenuList>
                <MenuItem as='a' href='/dashboard'>Play</MenuItem>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
            </MenuList>
        </Menu>
    )
}