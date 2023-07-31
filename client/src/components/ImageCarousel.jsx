import { PropTypes } from 'prop-types';
import { Box, IconButton, Text } from "@chakra-ui/react";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
//Add in props for headers and content (possible actions aswell)
export default function ImageCarousel({images}){
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const nextImage = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1 === images.length ? 0 : prevIndex + 1);
    }
    const prevImage = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1);
    }
    const handleDotClick = (index) => {
        setCurrentIndex(index);
    }

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }
    


    return(
        
        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' width='100%' maxW="1080px" height='360px' maxHeight='360px' p={4}>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%' width='100%' >
                
                <Box className='image-container' display="flex" justifyContent="center" alignItems="center" position='relative' boxSizing='border-box' minHeight='100px' height='100%' minWidth='100%' >
                <Box className='arrow-container' position='absolute' display='flex' justifyContent='space-between' alignItems='center' width='100%' p={4} zIndex={5} >
                <IconButton variant='ghost' aria-label="Previous image" icon={<ChevronLeftIcon fontSize='2xl' />} onClick={prevImage} />
                <IconButton variant='ghost' aria-label="Next image" icon={<ChevronRightIcon fontSize='2xl' />} onClick={nextImage} />
                </Box>
                <AnimatePresence >
                    {/* <motion.img 
                        className='carousel-image'
                        key={currentIndex}
                        src={images[currentIndex]}
                        initial={{opacity: 0,}}
                        animate={{opacity: 1, x: "0"}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                        /> */}
                        <motion.div
                        className='carousel-bg'
                        key={currentIndex}
                        initial={{opacity: 0, backgroundImage: `url(${images[currentIndex]})`}}
                        animate={{opacity: 1, }}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                        />
                    <motion.div
                        className='carousel-text'
                        initial={{opacity: 0,}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}>
                            <Box display='flex' flexDirection='column' justifyContent='flex-end' alignItems='flex-start' height='100%' width='100%' position='absolute' top='0' left='0' zIndex='1' pb='1rem'>
                        <Text fontSize='3xl' fontWeight='semibold'>A header for the image</Text>
                        <Text fontSize='md'>
                            Some text that goes over the image
                        </Text>
                        </Box>
                    </motion.div>
                </AnimatePresence>
                </Box>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
};