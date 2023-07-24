import {
  AddIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  QuestionOutlineIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "../utils/api";
import { router } from "../main";

export default function Sidebar() {
  const { isOpen, onToggle } = useDisclosure();
  const bg_sidebar = useColorModeValue('brand.400', 'brand.600');

  const handleLogout = () => {
    logout();
    router.navigate("/");
  };

  return (
    <Box height="100%" display="flex">
      <IconButton
        zIndex={0}
        position="absolute"
        top={"48px"}
        left={0}
        m={4}
        hidden={!isOpen}
        onClick={onToggle}
        aria-label="Open sidebar"
        icon={<ArrowRightIcon />}
      />
      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{
              x: isOpen ? "100%" : "0%",
              display: isOpen ? "none" : "block",
            }}
            exit={{ x: "-100%", transition: { duration: 0.2 } }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 0, width: "300px", position: "relative" }}
          >
            <Box
              maxW="300px"
              minW="250px"
              width="100%"
              height="100%"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
              background={bg_sidebar}
            >
              <Box>
                <Box m={2} display="flex" flexDir="row" alignItems="center">
                  <IconButton as="a" href="/" icon={<QuestionOutlineIcon />} />
                  <Heading size="md" ml={2} mr={2}>
                    Sidebar
                  </Heading>
                </Box>
                <Box display="flex" gap={2} m={2}>
                  <Button
                    display="flex"
                    flex="1"
                    justifyContent="flex-start"
                    variant="outline"
                    gap={2}
                    alignItems="center"
                    leftIcon={<AddIcon />}
                  >
                    New Game
                  </Button>
                  <IconButton
                    onClick={onToggle}
                    aria-label="close sidebar"
                    icon={<ArrowLeftIcon />}
                    variant="outline"
                  />
                </Box>
              </Box>
              <Box display="flex" flexDir="column" gap={2}>
                <Divider />
                <Menu display="flex" placement="top">
                  <MenuButton
                    height={14}
                    mb={2}
                    ml={2}
                    mr={2}
                    display="flex"
                    as={Button}
                    variant="ghost"
                  >
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      gap={2}
                      alignItems="center"
                    >
                      <Avatar
                        size="sm"
                        name="temp"
                        src={null}
                      />
                      <Text p={2} mt={0.25}>
                        Username
                      </Text>
                    </Box>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
          </motion.aside>
        )}
      </AnimatePresence>
    </Box>
  );
}
