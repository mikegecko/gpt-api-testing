import { PropTypes } from 'prop-types';
import { Box, Text } from "@chakra-ui/react";
import { useState } from 'react';

export default function AdventureCard({onClick, cardHeader, }){
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    const boxtStyle = {
        height: '300px',
        width: '300px',
        backgroundColor: isHovered ? 'lightblue' : 'brand.500',
        borderRadius: '10px',
        padding: '1rem',
        cursor: 'pointer',
      }
    return(
        <Box style={boxtStyle} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
         >
            <Text>{cardHeader}</Text>
        </Box>
    )
}

AdventureCard.propTypes = {
    cardHeader: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}