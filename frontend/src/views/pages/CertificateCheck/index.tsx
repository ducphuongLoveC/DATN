import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useMutation } from '@tanstack/react-query';
import { getCertificateByCertificateId } from '@/api/certificate';

import { Link } from '@mui/material';

type FormValues = {
  code: string;
};
import Certificate from '../Learning/Resource/Cetificate/Cetificate';
import { RootState } from '@/store/reducer';
import { Link as LinkDOM } from 'react-router-dom';
import { useState } from 'react';

const CertificateCheck: React.FC = () => {
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>();

  const [errorFind, setErrorFind] = useState('');

  const mutationFindCertificate = useMutation({
    mutationFn: getCertificateByCertificateId,
    onSuccess: () => {
      setErrorFind('');
    },
    onError: () => {
      setErrorFind('Không tìm thấy chứng chỉ');
    },
  });

  const user = useSelector((state: RootState) => state.authReducer.user);

  const onSubmit = (data: any) => {
    mutationFindCertificate.mutate(data.code);
  };

  return (
    <>
      <Box
        component={'form'}
        noValidate
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          width: '70%',
          margin: 'auto',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid mt={2} container>
          <Grid xs={12} md={10} item>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="Nhập code chứng chỉ"
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={2} item>
            <Button fullWidth variant="contained" sx={{ height: '100%' }} type="submit">
              Tìm chứng chỉ
            </Button>
          </Grid>
        </Grid>

        <Box mt={2}>
          {mutationFindCertificate?.data &&
            (mutationFindCertificate.data.user_id._id === user._id ? (
              <Box>
                <Typography>Chứng chỉ của bạn</Typography>
              </Box>
            ) : (
              <Box>
                <Typography component={'span'}>Chứng chỉ của </Typography>
                <Link
                  component={LinkDOM}
                  to={`/profile?id=${mutationFindCertificate?.data?.user_id._id}`}
                  sx={{ color: 'primary.main' }}
                >
                  {mutationFindCertificate?.data?.user_id?.name}
                </Link>
                <Typography component={'span'}> Khóa học </Typography>
                <Link
                  component={LinkDOM}
                  to={`/learning/${mutationFindCertificate?.data?.course_id._id}`}
                  sx={{ color: 'primary.main' }}
                >
                  {mutationFindCertificate?.data?.course_id?.title}
                </Link>
              </Box>
            ))}
        </Box>
        {errorFind && 'Không tìm thấy chứng chỉ'}
      </Box>
      {mutationFindCertificate?.data && (
        <Certificate
          code={mutationFindCertificate.data.certificate_code}
          name={mutationFindCertificate.data.name}
          description={mutationFindCertificate.data.description}
        />
      )}
    </>
  );
};
export default CertificateCheck;
