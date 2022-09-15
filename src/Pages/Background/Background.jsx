import { Box, Flex } from "@chakra-ui/react";
import BGvideo from "../../../Public/img/BgVideo.mp4"
import Footer from "./Footer";

export default function Background({ children, props }) {
    let position = props?.position || "relative";
    return (<Box position={position} w="100%" h="100%">
        {children}
        <Box position="absolute" width="100%" h="100%" bg="rgba(0,0,0,0.25)"></Box>
        <Box position="absolute" width="100%" h="100%" bg="rgba(0,0,0,0.07)"></Box>
        <video src={BGvideo} autoPlay loop muted />
        <Footer />
    </Box>)
}