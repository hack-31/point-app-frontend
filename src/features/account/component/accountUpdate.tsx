import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { SideBarLayout } from './sideBarLayout';
import { LoadingButton } from '@mui/lab';

/**
 * アカウント更新
 */
export const AccountUpdate: React.FC = React.memo(() => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      familyName: "",
      familyNameKana: "",
      firstName: "",
      firstNameKana: "",
    },
  });
  return (
    <SideBarLayout>
      <Box component="h1" color="primary.main">
        アカウント更新
      </Box>

      <Box my="60px" />

      <form onSubmit={handleSubmit((data) => console.log('送信データ', data))}>
        <Box marginBottom="24px">
          <Box mb="4px">苗字</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("familyName")}
          />
        </Box>

        <Box marginBottom="24px">
          <Box mb="4px">苗字カナ</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("familyNameKana")}
          />
        </Box>

        <Box marginBottom="24px">
          <Box mb="4px">名前</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("firstName")}
          />
        </Box>

        <Box marginBottom="24px">
          <Box mb="4px">名前カナ</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("firstNameKana")}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <LoadingButton
            size="large"
            sx={[
              ({ breakpoints }) => ({
                marginTop: "50px",
                width: "100%",
                [breakpoints.up("sm")]: {
                  width: "150px",
                },
              }),
            ]}
            variant='contained'
            type="submit"
            color="primary"
            loading={false}
          >
            変更
          </LoadingButton>
        </Box>
        <Box my="80px" />
      </form>
    </SideBarLayout>
  )
})