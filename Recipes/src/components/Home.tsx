import { useState } from "react";
import { Box, Typography, Button, Container, Collapse, Modal } from "@mui/material";
import { EmojiFoodBeverage, Search, Info } from "@mui/icons-material";
const Home = () => {
    const [showMore, setShowMore] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #fff3e0 30%, #ffccbc 100%)",
            }}
        >
            <Container
                sx={{
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                    maxWidth: "550px",
                }}
            >
                <EmojiFoodBeverage sx={{ fontSize: 60, color: "#d32f2f" }} />
                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#d32f2f", mt: 2 }}>
                    Welcome, Chef!
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: "#444", mt: 2, fontStyle: "italic", fontWeight: "light", }}
                >
                    "Cooking is an art, and every dish tells a story."
                </Typography>
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#d32f2f",
                            color: "#fff",
                            fontSize: "1rem",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#b71c1c" },
                        }}
                        startIcon={<Search />}
                        onClick={handleOpenModal}
                    >
                        Get Recipe Tips
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#d32f2f",
                            color: "#d32f2f",
                            fontSize: "1rem",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#d32f2f", color: "#fff" },
                        }}
                        startIcon={<Info />}
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? "Learn Less" : "Learn More"}
                    </Button>
                </Box>
                <Collapse in={showMore} sx={{ mt: 3 }}>
                    <Typography variant="body1" sx={{ color: "#666", textAlign: "left" }}>
                        Our platform offers a vast collection of recipes from around the world,
                        designed for both beginners and professional chefs. Join our community and start
                        your culinary journey today! From delicious appetizers to decadent desserts,
                        we provide step-by-step instructions that are easy to follow. Whether you're craving
                        something traditional or adventurous, we've got you covered. Start exploring our
                        extensive recipe database now and create mouthwatering dishes with ease!
                    </Typography>
                </Collapse>
                <Modal open={openModal} onClose={handleCloseModal}
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                    <Box
                        sx={{ bgcolor: "background.paper", padding: 3, borderRadius: 2, boxShadow: 24, maxWidth: 400, textAlign: "center", }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Recipe Tips and Ideas
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            Explore a wide range of recipes, learn how to prepare dishes from different
                            cultures, and get creative in the kitchen! Our tips will help you master culinary
                            techniques, discover new ingredients, and elevate your cooking skills.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 3, bgcolor: "#d32f2f", color: "#fff" }} onClick={handleCloseModal}> Close </Button>
                    </Box>
                </Modal>
            </Container>
        </Box>
    );
};
export default Home;
