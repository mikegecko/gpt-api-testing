import { PropTypes } from "prop-types";
import { Box, Divider, Text, useTheme } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function AdventureCard({ onClick, title, description }) {
  const theme = useTheme();


  const boxVariants = {
    initial: { 
        backgroundColor: theme.colors.brand[500],
        transition:{
            duration: 0.2
        }
    },
    hover: { 
        backgroundColor: theme.colors.brand[400],
        transition:{
            duration: 0.2
        }
    },
  };

  const arrowVariants = {
    initial:{
        opacity: 0,
    },
    hover:{
        opacity: 1,
        
    }
  }

  const boxStyle = {
    borderRadius: "10px",
    padding: "0rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
  };
  return (
    <motion.div initial='initial' whileHover='hover' onClick={onClick} style={{cursor: 'pointer'}} >
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
        <Box display='flex' flexDir='row' alignItems='center' justifyContent='space-between' width='100%' pr='1rem'>
        <Text fontSize='lg' fontWeight='bold' padding='.5rem 1rem .5rem 1rem'>{title}</Text>
        <motion.div variants={arrowVariants}>
            <ArrowForwardIcon fontSize='xl' variants={arrowVariants} />
            </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}

AdventureCard.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string,
};
