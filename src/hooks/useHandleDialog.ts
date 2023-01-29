import { useCallback, useState } from "react";

/**
 * 確認ダイアログの開閉を扱うフック
 * @returns handleClose モーダルを閉じる
 * @returns handleOpen モーダルを開く
 * @returns isOpenDialog true: 開, false: 閉
 */
export const useHandleDialog = () => {
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setOpenDialog(false);
  }, [setOpenDialog]);

  const handleOpen = useCallback(() => {
    setOpenDialog(true);
  }, [setOpenDialog]);

  return { handleClose, isOpenDialog, handleOpen };
};
