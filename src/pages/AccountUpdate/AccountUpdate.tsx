import React from 'react';
import { Box } from '@mui/material';
import { AccountUpdate } from '@/features/account';

/**
 * path: /profile
 */
export const AccountUpdatePage = React.memo(() => {
  return (
    <Box mx="10px">
      <AccountUpdate />
    </Box>
  )
});