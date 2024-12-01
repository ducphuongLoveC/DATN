import { Box, Typography, Paper, Button, Modal } from "@mui/material";
import certificateBackground from "@/assets/images/certificate/certificate.png";
import DownloadIcon from "@mui/icons-material/Download";
import logo from "@/assets/ftech-c.png";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import Draggable from "react-draggable";

const Certificate = () => {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);

    const downloadPDF = async () => {
        if (!certificateRef.current) {
            console.error("Certificate ref is not assigned yet.");
            return;
        }

        const element = certificateRef.current;

        try {
            // Dùng html2canvas để render nội dung
            const canvas = await html2canvas(element, {
                scale: 2, // Đảm bảo chất lượng tốt hơn
                useCORS: true,
                allowTaint: true,
                backgroundColor: null, // Background trong suốt
            });

            const imgData = canvas.toDataURL("image/png");

            // Lấy kích thước canvas gốc để tính toán tỷ lệ PDF
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Tạo file PDF với cùng tỷ lệ kích thước như preview
            const pdf = new jsPDF({
                orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
                unit: "px",
                format: [canvasWidth, canvasHeight],
            });

            // Vẽ hình ảnh vào PDF
            pdf.addImage(imgData, "PNG", 0, 0, canvasWidth, canvasHeight);

            // Tải xuống file PDF
            pdf.save("Certificate.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };


    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${certificateBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Paper
                ref={certificateRef}
                elevation={0}
                sx={{
                    width: "68%",
                    height: "91.8vh",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    borderRadius: "16px",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 0.5, marginBottom: 2 }}>
                    <img src={logo} alt="Logo" style={{ height: "80px" }} />
                </Box>
                <Typography variant="h5" fontSize={20} color="primary" marginBottom={2.5} gutterBottom>
                    FTECH Academy
                </Typography>
                <Typography variant="h3" fontWeight="bold" fontSize={30} color="primary" gutterBottom>
                    Certificate of Completion
                </Typography>
                <Typography variant="h6" fontSize={20} color="textSecondary" gutterBottom>
                    This certifies that
                </Typography>
                <Typography variant="h4" fontSize={25} fontWeight="bold" gutterBottom>
                    [Your Name]
                </Typography>
                <Typography variant="h6" fontSize={20} color="textSecondary" gutterBottom>
                    has successfully completed the course
                </Typography>
                <Typography variant="h5" fontSize={30} fontWeight="bold" gutterBottom>
                    JAVASCRIPT ADVANCED
                </Typography>
                <Typography variant="body1" fontSize={20} color="textSecondary" sx={{ marginTop: 1.5 }}>
                    Special Recognition: Outstanding Performance
                </Typography>
                <Typography variant="body2" fontSize={20} color="textSecondary" sx={{ marginTop: 1 }}>
                    Course Duration: 60 Hours | Completion Date: [Date]
                </Typography>
                <Box
                    sx={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "space-around",
                        paddingX: "40px",
                    }}
                >
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle1" color="textSecondary" fontSize={20} fontWeight={600}>
                            Instructor Signature
                        </Typography>
                        <img
                            src=""
                            alt="Instructor Signature"
                            style={{ height: "60px", marginBottom: "-10px", paddingTop: "20px" }}
                        />
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="subtitle1" color="textSecondary" fontSize={20} fontWeight={600}>
                            Organization Seal
                        </Typography>
                        <img
                            src=""
                            alt="Organization Seal"
                            style={{ height: "60px", marginBottom: "-10px", paddingTop: "20px" }}
                        />
                    </Box>
                </Box>
            </Paper>

            <Draggable>
                <Box
                    sx={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                            backgroundColor: "#145ea8",
                            transform: "scale(1.1)",
                            transition: "all 0.3s ease",
                        },
                    }}
                    onClick={() => setOpenPopup(true)}
                >
                    <DownloadIcon fontSize="large" />
                </Box>
            </Draggable>

            <Modal
                open={openPopup}
                onClose={() => setOpenPopup(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: 4,
                        borderRadius: 2,
                        textAlign: "center",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Typography variant="h5" color="primary" gutterBottom>
                        Download or Preview Certificate
                    </Typography>
                    <Button
                        onClick={downloadPDF}
                        variant="contained"
                        color="primary"
                        sx={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderRadius: "30px",
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                            margin: 1
                        }}
                    >
                        Download PDF
                    </Button>
                    <Button
                        onClick={() => setOpenPreview(true)}
                        variant="outlined"
                        color="primary"
                        sx={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderRadius: "30px",
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Preview
                    </Button>
                </Box>
            </Modal>

            <Modal
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        textAlign: "center",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        minWidth: "70%",
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                        
                            textAlign: "center",
                            backgroundImage: `url(${certificateBackground})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "16px",
                            transform: "scale(1)", 
                            position: "relative",
                            padding: "20px",
                            height: "75vh"
                        }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                height: "50px", 
                                marginBottom: 10,
                                margin: "30px auto 5px auto"
                            }}
                        />
                        <Typography
                            variant="h5"
                            color="primary"
                            fontSize={17} 
                            marginBottom={3}
                            gutterBottom
                        >
                            FTECH Academy
                        </Typography>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            fontSize={20} 
                            color="primary"
                            gutterBottom
                        >
                            Certificate of Completion
                        </Typography>
                        <Typography
                            variant="h6"
                            fontSize={16}
                            color="textSecondary"
                            gutterBottom
                        >
                            This certifies that
                        </Typography>
                        <Typography
                            variant="h4"
                            fontSize={17}
                            fontWeight="bold"
                            gutterBottom
                        >
                            [Your Name]
                        </Typography>
                        <Typography
                            variant="h6"
                            fontSize={16}
                            color="textSecondary"
                            gutterBottom
                        >
                            has successfully completed the course
                        </Typography>
                        <Typography
                            variant="h5"
                            fontSize={20}
                            fontWeight="bold"
                            gutterBottom
                        >
                            JAVASCRIPT ADVANCED
                        </Typography>
                        <Typography
                            variant="body1"
                            fontSize={16}
                            color="textSecondary"
                            sx={{ marginTop: 1.5 }}
                        >
                            Special Recognition: Outstanding Performance
                        </Typography>
                        <Typography
                            variant="body2"
                            fontSize={16}
                            color="textSecondary"
                            sx={{ marginTop: 1 }}
                        >
                            Course Duration: 60 Hours | Completion Date: [Date]
                        </Typography>
                        <Box
                            sx={{
                                marginTop: "10px",
                                display: "flex",
                                justifyContent: "space-around",
                                paddingX: "17%",
                            }}
                        >
                            <Box sx={{ textAlign: "center" }}>
                                <Typography variant="subtitle1" color="textSecondary" fontSize={14} fontWeight={600}>
                                    Instructor Signature
                                </Typography>
                                <img
                                    src=""
                                    alt="Instructor Signature"
                                    style={{ height: "60px", paddingTop: "5px" }}
                                />
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography variant="subtitle1" color="textSecondary" fontSize={14} fontWeight={600}>
                                    Organization Seal
                                </Typography>
                                <img
                                    src=""
                                    alt="Organization Seal"
                                    style={{ height: "60px", paddingTop: "5px" }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Button
                        onClick={() => setOpenPreview(false)}
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 2,
                            padding: "10px 20px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderRadius: "30px",
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                            position: "absolute",
                            left: "45%"
                            
                        }}
                    >
                        Close Preview
                    </Button>
                </Box>
            </Modal>

        </Box>
    );
};

export default Certificate;
