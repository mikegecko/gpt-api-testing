import { useEffect, useRef, useState } from "react";
import _ from 'lodash';
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Background(props) {
    const [mousePosition, setMousePosition] = useState({x:0, y:0});
    const [backgroundTranslate, setBackgroundTranslate] = useState({x: 0, y: 0});
    const bg_circle = useColorModeValue('brand.800', 'brand.100');

    const handleMouseMove = (e) => {
        const {clientX, clientY} = e;
        setMousePosition({x: clientX, y: clientY});
    }

    useEffect(() => {
        //Updates bg position on mouse move
        const updateBackgroundPosition = () => {
            const targetTranslateX = -(mousePosition.x - window.innerWidth / 2) / 20;
            const targetTranslateY = -(mousePosition.y - window.innerHeight / 2) / 20;
            //Smooth interpolation
            setBackgroundTranslate(prevTranslate => ({
                x: prevTranslate.x + (targetTranslateX - prevTranslate.x) * 0.1,
                y: prevTranslate.y + (targetTranslateY - prevTranslate.y) * 0.1,
            }));
            //requestAnimationFrame(updateBackgroundPosition);
        }

        //Throttle updates
        const throttledUpdate = _.throttle(updateBackgroundPosition, 100);
        window.addEventListener('mousemove', throttledUpdate);
        //requestAnimationFrame(updateBackgroundPosition);

        return () => {
            window.removeEventListener('mousemove', throttledUpdate);
            //cancelAnimationFrame(updateBackgroundPosition);
        };
    }, [mousePosition])

    

    return(
        <Box sx={{ overflow: 'hidden', zIndex: 0 ,position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `radial-gradient(circle, ${bg_circle} 2px, rgba(0, 0, 0, 0) 3px);`, backgroundSize: '60px 60px', transform: `translate(${backgroundTranslate.x}px, ${backgroundTranslate.y}px)`, transition: 'transform 0.2s ease'}}>
        </Box>
    )
}