import { FC } from "react";

import { Center, Container, Heading, Image, HStack, Stack, Box } from "@chakra-ui/react";

import { Content, configs, useContent, MarkdownFile } from "shared/content/Content";
import { Socials } from "shared/socials/Socials";

export const Landing: FC = () => {
    const content = useContent(MarkdownFile.Landing);

    return (
        <Box id="page-landing">
            <Center pb={{ base: 16, md: 32 }}>
                <HStack spacing="16" justifyContent="space-between" alignItems="flex-start">
                    <Stack flex={{ base: "1", lg: "0.6" }} spacing="16">
                        <Stack spacing="8">
                            <Heading
                                fontSize={{ base: "5xl", md: "7xl" }}
                                lineHeight="1"
                                data-aos="fade-down"
                                data-aos-delay="400"
                            >
                                {configs.landing.headline}
                            </Heading>
                            <Content data-aos="fade-up" data-aos-delay="500" fontSize="lg">
                                {content.landing}
                            </Content>
                        </Stack>

                        <Socials delay={1000} />
                    </Stack>
                    <Container
                        alignItems="center"
                        flex="0.4"
                        display={{ base: "none", lg: "block" }}
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <picture>
                            <source type="image/webp" src={configs.landing.picture}></source>
                            <source type="image/jpeg" src={configs.landing.jpg}></source>
                            <Image borderRadius="xl" src={configs.landing.jpg} alt={`face-cover-image`} />
                        </picture>
                    </Container>
                </HStack>
            </Center>
        </Box>
    );
};