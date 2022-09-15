import { Box, Center, Text } from "@chakra-ui/react"

export default function Footer() {
    return (
        <>
            <Box bgColor="white" position="absolute" h=".5em" w="100%"></Box>
            <Box w="100%" h="17em" bgColor="black">
                <Center>
                <Text pt="2em" color="white" fontSize="3xl">©Copyright 2022</Text>
                </Center>
            </Box>
        </>
    )

}