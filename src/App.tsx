import { FC, useEffect, lazy, Suspense } from "react";

import { Box, Container, Center, Spinner } from "@chakra-ui/react";
import AOS from "aos";

import { NavbarHeight } from "theme";
import { AboutPageId, WorkPageId } from "utils/useScroll";

// @ts-ignore
import "./App.scss";
// @ts-ignore
import "aos/dist/aos.css";

const Navbar = lazy(() => import("shared/navbar/Navbar").then((module) => ({ default: module.Navbar })));
const Landing = lazy(() => import("pages/landing/Landing").then((module) => ({ default: module.Landing })));
const PageHeader = lazy(() =>
    import("shared/page-header/PageHeader").then((module) => ({ default: module.PageHeader })),
);

const Certificates = lazy(() =>
    import("pages/about/certificates/Certificates").then((module) => ({
        default: module.Certificates,
    })),
);

const Footer = lazy(() => import("shared/footer/Footer").then((module) => ({ default: module.Footer })));
const FeaturedProjects = lazy(() =>
    import("pages/featured-projects/FeaturedProjects").then((module) => ({
        default: module.FeaturedProjects,
    })),
);
const About = lazy(() => import("pages/about/About").then((module) => ({ default: module.About })));

const Loader: FC = () => (
    <Center w="100%" h="100%">
        <Spinner size="lg" color="primary.500" />
    </Center>
);

export const App: FC = () => {
    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    return (
        <Suspense fallback={<Loader />}>
            {/* @ts-ignore */}
            <Container h="100%" px={{ base: 6, md: 6, lg: 4 }}>
                <Navbar />

                <Box mt={{ base: "96px", md: NavbarHeight }}>
                    <Landing />
                    <Box id={WorkPageId}>
                        <PageHeader label="Selected Technical Projects" />
                        <FeaturedProjects />
                    </Box>

                    <Box id={AboutPageId}>
                        <PageHeader label="About Me" />
                        <About />

                        <PageHeader label="Certifications" />
                        <Certificates />
                    </Box>
                </Box>
                <Footer />
            </Container>
        </Suspense>
    );
};