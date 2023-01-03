import { useCallback, useState } from "react";

/**
 * 確認ダイアログの開閉を扱うフック
 * @returns handleClose モーダルを閉じる
 * @returns ChandleOpen モーダルを開く
 * @returns true: 開, false: 閉
 */
export const useHandleConfirmDialog = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  const handleOpen = useCallback(() => {
    setOpenDialog(true);
  }, [setOpenDialog]);

  return { handleClose, openDialog, handleOpen };
};
