import { FC } from "react";
import { Box, Flex, Heading, Text, Image, IconButton } from "@chakra-ui/react";

import { configs, Content, MarkdownFile, useContent } from "shared/content/Content";
import { Education } from "pages/about/education/Education";
import { Experience } from "pages/about/experience/Experience";
import { Skills } from "pages/about/skills/Skills";
import { VolumeIcon } from "utils/Icons";

export const About: FC = () => {
    const content = useContent(MarkdownFile.About);

    const onPlay = () => {
        const audio = new Audio(configs.common.audioFile);
        audio.play();
    };

    return (
        <Box>
            {/* @ts-ignore */}
            <Flex pt="8" gap={6} direction={{ base: "column", md: "row" }}>
                <Box flex="0.35" data-aos="fade-up">
                    <picture>
                        <source type="image/webp" srcSet={configs.common.mainPicture} />
                        <source type="image/jpeg" srcSet={configs.common.mainPictureJPG} />
                        <Image borderRadius="xl" src={configs.common.mainPicture} w="100%" alt="profile image" />
                    </picture>
                </Box>
                <Box flex="0.85">
                    <Heading data-aos="fade-down">{configs.common.name}</Heading>
                    <Flex alignItems="center">
                        <Text fontWeight="bold" opacity="0.5" data-aos="fade" data-aos-delay="200">
                            {configs.common.pronunciation}
                        </Text>
                        <IconButton
                            size="xs"
                            aria-label="pronunciation button"
                            variant="icon"
                            fontSize="md"
                            icon={<VolumeIcon />}
                            onClick={onPlay}
                            data-aos="fade"
                            data-aos-delay="400"
                        />
                    </Flex>
                    <Box pt="4" data-aos="fade-up" data-aos-delay="400">
                        <Content fontSize="lg">{content.about}</Content>
                    </Box>
                </Box>
            </Flex>
            <Flex
                direction={{ base: "column", md: "row" }}
                gap={{ base: 16, md: 6, lg: 12 }}
                mt="16"
                justifyContent="space-between"
            >
                <Box flex="0.6" flexShrink={0} overflow="hidden">
                    <Education />
                </Box>
                <Box flex="0.6" flexShrink={0} overflow="hidden">
                    <Experience />
                </Box>
            </Flex>
            <Box pt="16">
                <Skills />
            </Box>
        </Box>
    );
};