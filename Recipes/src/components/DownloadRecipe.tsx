import { IconButton, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

const DownloadRecipe = ({ recipe }: { recipe: any }) => {
    const handleDownload = () => {
        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica"); 
        doc.setFontSize(22);
        doc.text(recipe.title, 10, 20, { align: "left" });

        doc.setFontSize(16);
        doc.text("description:", 10, 40, { align: "left" });
        doc.text(recipe.description, 10, 50, { align: "left", maxWidth: 180 });

        doc.text("instructions:", 10, 70, { align: "left" });
        doc.text(recipe.instructions, 10, 80, { align: "left", maxWidth: 180 });

        doc.text("ingredients:", 10, 100, { align: "left" });
        if (Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach((ingredient: string, index: number) => {
                doc.text(`- ${ingredient}`, 10, 110 + index * 10, { align: "left" });
            });
        } else {
            doc.text(recipe.ingredients, 10, 110, { align: "left" });
        }

        doc.save(`${recipe.title}.pdf`);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
                onClick={handleDownload}
                sx={{
                    color: "#616161", 
                    "&:hover": { color: "#424242" }, 
                }}
            >
                <DownloadIcon fontSize="large" />
            </IconButton>
        </Box>
    );
};

export default DownloadRecipe;
