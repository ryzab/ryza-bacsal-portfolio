import { FC, useState } from "react";
import { 
    Box, 
    SimpleGrid, 
    Heading, 
    Text, 
    VStack, 
    Badge, 
    Image, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalBody, 
    ModalCloseButton, 
    useDisclosure 
} from "@chakra-ui/react";

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    description: string;
    imagePath?: string;
}

const certificatesData: Certificate[] = [
    {
        title: "TOEIC Certification",
        issuer: "ETS",
        date: "February 2025",
        description: "Score: 895 • CEFR Level B2 Upper-Intermediate English Proficiency.",
        imagePath: "/assets/certificates/Cert_TOEIC.jpeg",
    },
    {
        title: "Information Technology Specialist - Databases",
        issuer: "Certiport",
        date: "June 2025",
        description: "Validated professional competency in database administration and SQL querying.",
        imagePath: "/assets/certificates/Cert_Database.jpeg",
    },
    {
        title: "Information Technology Specialist - HTML and CSS",
        issuer: "Certiport",
        date: "June 2026",
        description: "Validated professional proficiency in modern web markup, responsive design, and CSS styling.",
        imagePath: "/assets/certificates/Cert_HTMLandCSS.jpeg",
    },
];

export const Certificates: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

    const handleImageClick = (imagePath?: string, title?: string) => {
        if (imagePath && title) {
            setSelectedImage({ src: imagePath, title });
            onOpen();
        }
    };

    return (
        <Box id="certificates-section" py={10}>
            {/* @ts-ignore */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                {certificatesData.map((cert, index) => (
                    <Box
                        key={index}
                        bg="white"
                        p={6}
                        borderRadius="xl"
                        boxShadow="sm"
                        border="1px solid"
                        borderColor="gray.100"
                        transition="all 0.3s ease-in-out"
                        _hover={{ boxShadow: "md", transform: "translateY(-4px)" }}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <VStack align="start" spacing={4} w="100%">
                            {cert.imagePath && (
                                <Box
                                    w="100%"
                                    h="160px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    bg="gray.50"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="1px solid"
                                    borderColor="gray.100"
                                    cursor="pointer"
                                    onClick={() => handleImageClick(cert.imagePath, cert.title)}
                                    title="Click to view larger"
                                >
                                    <Image
                                        src={cert.imagePath}
                                        alt={cert.title}
                                        maxH="160px"
                                        objectFit="contain"
                                        transition="transform 0.2s"
                                        _hover={{ transform: "scale(1.03)" }}
                                    />
                                </Box>
                            )}
                            <Badge colorScheme="orange" px={3} py={1} borderRadius="md" fontSize="xs">
                                {cert.issuer}
                            </Badge>
                            <Heading size="md" lineHeight="short" color="gray.800">
                                {cert.title}
                            </Heading>
                            <Text fontSize="xs" fontWeight="600" color="gray.500">
                                {cert.date}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                {cert.description}
                            </Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>

            {/* Fullscreen Modal Popup for Image Preview */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay backdropFilter="blur(4px)" />
                <ModalContent bg="gray.900" p={4} borderRadius="xl">
                    <ModalCloseButton color="white" />
                    <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pt={6}>
                        {selectedImage && (
                            <>
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    maxH="80vh"
                                    objectFit="contain"
                                    borderRadius="md"
                                />
                                <Text color="white" mt={4} fontSize="md" fontWeight="bold">
                                    {selectedImage.title}
                                </Text>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};