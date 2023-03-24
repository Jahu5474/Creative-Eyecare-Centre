import React from 'react';
import { Container, Heading, Stack } from '@chakra-ui/react'

const PAP = () => {
    return (
        <>
            <Container
                maxW="container.lg"
            >
                <Stack
                    display={{ base: "flex", md: "flex" }}
                    justify="center"
                    align="center"
                >
                    <Heading>
                        Privacy and Policy
                    </Heading>
                </Stack>
            </Container>
        </>
    )
}

export default PAP;