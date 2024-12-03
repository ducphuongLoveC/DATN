import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Paper, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import html2pdf from 'html2pdf.js';

import certificateBackground from '@/assets/images/certificate/certificate.png';
import { getCertificateByCertificateId } from '@/api/certificate';
interface CertificateProp {
  certificate_code?: string;
  name: string;
  description: string;
}
const Certificate: React.FC<CertificateProp> = ({ certificate_code, name, description }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ['certificate'],
    queryFn: () => getCertificateByCertificateId(certificate_code || ''),
    enabled: certificate_code ? true : false,
  });
  const downloadPDF = () => {
    if (certificateRef.current) {
      const element = certificateRef.current;

      const options = {
        filename: 'Certificate.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 4 },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'landscape',
        },
      };
      html2pdf().from(element).set(options).save();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
      <Box display={'none'}>
        <Paper
          ref={certificateRef}
          elevation={0}
          sx={{
            width: '100%',
            height: '107.5vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            backgroundImage: `url(${certificateBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box mt={22} textAlign={'center'}>
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
              Completion Date: [Date]
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',

          textAlign: 'center',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              width: '80%',
              height: 'auto',
              margin: '0 auto',
              backgroundImage: `url(${certificateBackground})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '500px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box mt={17.5} textAlign={'center'}>
              <Typography variant="h5" fontSize={12} color="primary" gutterBottom>
                FTECH Academy
              </Typography>
              <Typography mt={0} variant="h3" fontWeight="bold" fontSize={15} color="primary" gutterBottom>
                Certificate of Completion
              </Typography>
              <Typography variant="h6" fontSize={12} color="textSecondary" gutterBottom>
                This certifies that
              </Typography>
              <Typography variant="h4" fontSize={12} fontWeight="bold" gutterBottom>
                [Your Name]
              </Typography>
              <Typography variant="h6" fontSize={12} color="textSecondary" gutterBottom>
                has successfully completed the course
              </Typography>
              <Typography variant="h5" fontSize={15} fontWeight="bold" gutterBottom>
                JAVASCRIPT ADVANCED
              </Typography>
              <Typography variant="body1" fontSize={12} color="textSecondary" sx={{ marginTop: 1 }}>
                Special Recognition: Outstanding Performance
              </Typography>
              <Typography variant="body2" fontSize={12} color="textSecondary" sx={{ marginTop: 1 }}>
                Completion Date: [Date]
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          onClick={downloadPDF}
          variant="contained"
          color="primary"
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '30px',
            textTransform: 'none',
            marginBottom: '16px',
          }}
          startIcon={<DownloadIcon />}
        >
          Tải xuống chứng chỉ
        </Button>
      </Box>
    </Box>
  );
};

export default Certificate;
