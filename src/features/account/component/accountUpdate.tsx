import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { SideBarLayout } from './sideBarLayout';
import { LoadingButton } from '@mui/lab';
import { ERR_REQUIRE_MESSAGE, MAX_USERNAME_LENGTH } from '@/const/const';
import { useAuth } from '@/lib/auth';
import { useMutation } from '@tanstack/react-query';
import { updateAccount, UpdateAccountDTO } from '../api/updateAccount';
import { ErrResponse } from '@/lib/axios';

/**
 * アカウント更新
 */
export const AccountUpdate: React.FC = React.memo(() => {
  const { user } = useAuth();
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      familyName: user?.familyName || '',
      familyNameKana: user?.familyNameKana || "",
      firstName: user?.firstName || "",
      firstNameKana: user?.firstNameKana || "",
    },
  });

  const { isLoading, mutate } = useMutation((data: UpdateAccountDTO) => updateAccount(data),
    {
      onSuccess: () => {
      },
      onError: (err: ErrResponse) => {
        console.log(err);
      },
    }
  )
  return (
    <SideBarLayout>
      <Box component="h1" color="primary.main">
        アカウント更新
      </Box>

      <Box my="60px" />

      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <Box marginBottom="24px">
          <Box mb="4px">姓（全角）</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("familyName", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
              maxLength: {
                value: MAX_USERNAME_LENGTH.VALUE,
                message: MAX_USERNAME_LENGTH.MESSAGE,
              },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.familyName?.message}</Box>
        </Box>

        <Box marginBottom="24px">
          <Box mb="4px">名（全角）</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("firstName", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
              maxLength: {
                value: MAX_USERNAME_LENGTH.VALUE,
                message: MAX_USERNAME_LENGTH.MESSAGE,
              },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.firstName?.message}</Box>
        </Box>

        <Box marginBottom="24px">
          <Box mb="4px">姓カナ（全角）</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("familyNameKana", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
              maxLength: {
                value: MAX_USERNAME_LENGTH.VALUE,
                message: MAX_USERNAME_LENGTH.MESSAGE,
              },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.familyNameKana?.message}</Box>
        </Box>

        <Box marginBottom="24px">
          <Box mb="4px">名カナ（全角）</Box>
          <TextField
            fullWidth
            variant="outlined"
            {...register("firstNameKana", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
              maxLength: {
                value: MAX_USERNAME_LENGTH.VALUE,
                message: MAX_USERNAME_LENGTH.MESSAGE,
              },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.firstNameKana?.message}</Box>
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
            loading={isLoading}
          >
            変更
          </LoadingButton>
        </Box>
        <Box my="80px" />
      </form>
    </SideBarLayout>
  )
})