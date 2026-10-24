import { FC, useState } from "react";
import { Box, Flex, Heading, Image, Text, Button, HStack } from "@chakra-ui/react";
import { Tags } from "shared/tags/Tags";
import { ProjectCardFooter } from "shared/project-card-footer/ProjectCardFooter";

export enum ImagePosition {
    Right,
    Left,
}

interface Props {
    id: string;
    title: string;
    year: string;
    location: string;
    demo?: string;
    github?: string;
    tags: string[];
    description: string;
    readMore?: string;
    image: string;
    imagePosition: ImagePosition;
    jpg: string;
    allImages?: string[];
    mobileImages?: string[];
    webImages?: string[];
}

const ImagePositionLayoutMapper: Record<ImagePosition, "row" | "row-reverse"> = {
    [ImagePosition.Right]: "row",
    [ImagePosition.Left]: "row-reverse",
};

const ImagePositionPaddingRightMapper: Record<ImagePosition, string> = {
    [ImagePosition.Right]: "8",
    [ImagePosition.Left]: "0",
};

const ImagePositionPaddingLeftMapper: Record<ImagePosition, string> = {
    [ImagePosition.Right]: "0",
    [ImagePosition.Left]: "8",
};

export const FeaturedProjectCard: FC<Props> = ({
    id,
    title,
    demo,
    github,
    tags,
    description,
    readMore,
    image,
    imagePosition,
    location,
    year,
    jpg,
    allImages,
    mobileImages,
    webImages,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<"mobile" | "web">("mobile");

    let activeImages = allImages && allImages.length > 0 ? allImages : [image || jpg];
    if (mobileImages && webImages) {
        activeImages = viewMode === "mobile" ? mobileImages : webImages;
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
    };

    const currentImageSrc = activeImages[currentIndex] || image || jpg;

    return (
        /* @ts-ignore */
        <Flex
            justifyContent="space-between"
            id="featured-project-card"
            py={{ base: "12", md: "12", lg: "28" }}
            direction={{ base: "column-reverse", lg: ImagePositionLayoutMapper[imagePosition] }}
            alignItems="center"
        >
            {/* Text & Content Section */}
            <Flex
                h="auto"
                pr={{ base: "0", lg: ImagePositionPaddingRightMapper[imagePosition] }}
                pl={{ base: "0", lg: ImagePositionPaddingLeftMapper[imagePosition] }}
                direction="column"
                justifyContent="space-between"
                flex={{ base: 1, lg: 0.6 }}
            >
                <Box>
                    <Heading data-aos="fade-down" data-aos-offset="200" fontSize="4xl" lineHeight="1">
                        {title}
                    </Heading>
                    <Text
                        pt="2"
                        fontSize="sm"
                        fontWeight="600"
                        opacity="0.6"
                        data-aos="fade"
                        data-aos-delay="100"
                        data-aos-offset="200"
                    >
                        {year} • {location}
                    </Text>

                    {/* CuiZin Platform Toggle Switcher Buttons */}
                    {mobileImages && webImages && (
                        <HStack spacing={3} pt="4">
                            <Button
                                size="sm"
                                variant={viewMode === "mobile" ? "solid" : "outline"}
                                colorScheme="orange"
                                onClick={() => {
                                    setViewMode("mobile");
                                    setCurrentIndex(0);
                                }}
                            >
                                Mobile View
                            </Button>
                            <Button
                                size="sm"
                                variant={viewMode === "web" ? "solid" : "outline"}
                                colorScheme="orange"
                                onClick={() => {
                                    setViewMode("web");
                                    setCurrentIndex(0);
                                }}
                            >
                                Web View
                            </Button>
                        </HStack>
                    )}

                    <Text
                        fontSize="lg"
                        pt={{ base: 4, lg: "4" }}
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay="200"
                        pb="2"
                    >
                        {description}
                    </Text>

                    <Tags tags={tags} id={id} />
                </Box>

                <ProjectCardFooter readMore={readMore} github={github} demo={demo} />
            </Flex>

            {/* Image Preview Container with Clean Browser Header Bar */}
            <Box
                data-aos="fade-up"
                data-aos-offset="200"
                flex={{ base: 1, lg: 0.6 }}
                w="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                pl={{ base: "0", lg: ImagePositionPaddingRightMapper[imagePosition] }}
                pr={{ base: "0", lg: ImagePositionPaddingLeftMapper[imagePosition] }}
            >
                <Box
                    w="100%"
                    borderRadius="xl"
                    overflow="hidden"
                    boxShadow="lg"
                    bg="gray.900"
                    border="1px solid"
                    borderColor="gray.700"
                >
                    {/* Window Header Bar */}
                    <Flex px={4} py={3} bg="gray.800" align="center" justify="space-between">
                        <HStack spacing={2}>
                            <Box borderRadius="full" bg="red.400" w="10px" h="10px" />
                            <Box borderRadius="full" bg="yellow.400" w="10px" h="10px" />
                            <Box borderRadius="full" bg="green.400" w="10px" h="10px" />
                        </HStack>
                        <Text fontSize="xs" color="gray.400" fontWeight="medium" letterSpacing="wider">
                            {title.toUpperCase()} PREVIEW
                        </Text>
                        <Box w="40px" />
                    </Flex>

                    {/* Image Viewport Container */}
                    <Box
                        position="relative"
                        w="100%"
                        maxH="350px"
                        h="350px"
                        bg="blackAlpha.800"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            src={currentImageSrc}
                            alt={`${title}-screenshot-${currentIndex + 1}`}
                            maxH="350px"
                            maxW="100%"
                            objectFit="contain"
                        />
                    </Box>
                </Box>

                {/* Carousel Navigation Buttons & Counter */}
                {activeImages.length > 1 && (
                    <>
                        {/* @ts-ignore */}
                        <HStack spacing={4} mt={4}>
                            <Button size="sm" onClick={handlePrev} variant="outline">
                                Prev
                            </Button>
                            <Text fontSize="sm" fontWeight="bold" opacity="0.8">
                                {currentIndex + 1} / {activeImages.length}
                            </Text>
                            <Button size="sm" onClick={handleNext} variant="outline">
                                Next
                            </Button>
                        </HStack>
                    </>
                )}
            </Box>
        </Flex>
    );
};