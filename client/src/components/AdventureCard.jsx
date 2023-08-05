import { PropTypes } from "prop-types";
import { Box, Divider, Text, useTheme } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdventureCard({ onClick, title, description }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const boxVariants = {
    initial: { backgroundColor: theme.colors.brand[500] },
    hover: { backgroundColor: theme.colors.brand[400] },
  };

  const boxStyle = {
    borderRadius: "10px",
    padding: "0rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
  };
  return (
    <motion.div initial='initial' whileHover='hover' onClick={onClick} style={{cursor: 'pointer'}}>
      <Box
        display={{base: 'flex', lg: 'flex'}}
        height={{base: '100%', lg: '300px'}}
        width={{base: '100%', lg: '300px'}}
        as={motion.div}
        variants={boxVariants}
        style={boxStyle}
      >
        <Divider w='100%' />
        <Text fontSize='lg' fontWeight='bold' color='white'>
          {description}
        </Text>
        <Text fontSize='lg' fontWeight='bold' padding='.5rem 1rem .5rem 1rem'>{title}</Text>
      </Box>
    </motion.div>
  );
}

AdventureCard.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string,
};
