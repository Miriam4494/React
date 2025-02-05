import { Box, Typography, Link, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FeedbackIcon from "@mui/icons-material/Feedback";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                display: "flex",
                justifyContent: "space-between", 
                alignItems: "center",
                backgroundColor: "#333",
                color: "white",
                padding: "10px 20px",
                position: "fixed",
                bottom: 0,
                width: "100%",
            }}
        >


            <Link
                href="https://github.com/Miriam4494/React"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "flex", alignItems: "center", color: "white", textDecoration: "none" }}
            >
                <GitHubIcon sx={{ mr: 1 }} />
                <Typography>✨ GitHub ✨</Typography>
            </Link>

            <Box sx={{ display: "flex", alignItems: "center", ml: "auto", mr: "auto" }}>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#f5e1a4",
                        "&:hover": { backgroundColor: "#f1c27d" },
                        ml: 2,
                        color: "#333",
                    }}
                    startIcon={<FeedbackIcon />}
                    onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=miri64494@gmail.com&su=📝 פידבק על האתר&body=שלום מירי, רציתי לשתף אותך במשוב שלי על האתר! 😊", "_blank")}
                >
                    ?רוצים לפדבק אותנו
                </Button>


                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#f5e1a4",
                        "&:hover": { backgroundColor: "#f1c27d" },
                        ml: 2,
                        color: "#333",
                    }}
                    startIcon={<EmailIcon />}
                    onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=miri64494@gmail.com&su=צור%20קשר&body=שלום,%20אני%20רוצה%20לדבר%20איתך...", "_blank")}
                >
                    צור קשר
                </Button>
            </Box>

        </Box>
    );
};

export default Footer;
