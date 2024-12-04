import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Paper, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import html2pdf from 'html2pdf.js';

import certificateBackground from '@/assets/images/certificate/certificate.png';
import { createCertificate, getCertificateByCertificateId } from '@/api/certificate';
import moment from 'moment';
interface CertificateProp {
  user_id?: string;
  course_id?: string;
  name?: string;
  description?: string;
  certificate_code?: string;
}
const Certificate: React.FC<CertificateProp> = ({ certificate_code, user_id, course_id, name, description }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const [id, setId] = useState<any>();

  const { data, isLoading } = useQuery({
    queryKey: ['certificate', id],
    queryFn: () => getCertificateByCertificateId(id || ''),
    enabled: id ? true : false,
  });

  useEffect(() => {
    const fetchCreate = async () => {
      if (user_id && course_id && name && description) {
        const payload = {
          user_id,
          course_id,
          name,
          description,
        };
        const data = await createCertificate(payload);
        setId(data.certificate_code);
      }
    };

    if (!certificate_code) {
      fetchCreate();
    } else {
      setId(certificate_code);
    }
  }, [user_id, course_id, name, description]);
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

  if (isLoading) return <div>Loading...</div>;

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
            position: 'relative',
          }}
        >
          <Box mt={22} textAlign={'center'}>
            <Box position={'absolute'} bottom={20} right={15}>
              <Typography variant="body2" fontSize={20} color="textSecondary" sx={{ marginTop: 1 }}>
                code: {data?.certificate_code}
              </Typography>
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
            <Typography variant="h4" fontSize={30} fontWeight="bold" gutterBottom>
              {data?.name}
            </Typography>
            <Typography variant="h6" fontSize={20} color="textSecondary" gutterBottom>
              has successfully completed the course
            </Typography>
            <Typography variant="h5" fontSize={30} fontWeight="bold" gutterBottom>
              {data?.description}
            </Typography>
            <Typography variant="body1" fontSize={20} color="textSecondary" sx={{ marginTop: 1.5 }}>
              Special Recognition: Outstanding Performance
            </Typography>
            <Typography variant="body2" fontSize={20} color="textSecondary" sx={{ marginTop: 1 }}>
              Completion Date: {data?.issue_date}
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
            position={'relative'}
          >
            <Box mt={17} textAlign={'center'}>
              <Box position={'absolute'} bottom={15} right={10}>
                <Typography variant="body2" fontSize={12} color="textSecondary" sx={{ marginTop: 1 }}>
                  code: {data?.certificate_code}
                </Typography>
              </Box>
              <Typography variant="h5" fontSize={12} color="primary" gutterBottom>
                FTECH Academy
              </Typography>
              <Typography mt={0} variant="h3" fontWeight="bold" fontSize={15} color="primary" gutterBottom>
                Certificate of Completion
              </Typography>
              <Typography variant="h6" fontSize={12} color="textSecondary" gutterBottom>
                This certifies that
              </Typography>
              <Typography variant="h4" fontSize={16} fontWeight="bold" gutterBottom>
                {data?.name}
              </Typography>
              <Typography variant="h6" fontSize={12} color="textSecondary" gutterBottom>
                has successfully completed the course
              </Typography>
              <Typography variant="h5" fontSize={15} fontWeight="bold" gutterBottom>
                {data?.description}
              </Typography>
              <Typography variant="body1" fontSize={12} color="textSecondary" sx={{ marginTop: 1 }}>
                Special Recognition: Outstanding Performance
              </Typography>
              <Typography variant="body2" fontSize={12} color="textSecondary" sx={{ marginTop: 1 }}>
                Completion Date: {moment(data?.issue_date).format('LLLL')}
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