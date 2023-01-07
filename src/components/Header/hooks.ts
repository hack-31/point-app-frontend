import React from "react";

/**
 * メニューの開閉を扱うフック
 * @returns anchorEl メニューを表示したいエレメント
 * @returns closeMenu メニューを閉じる
 * @returns openMenu 目ミューを開く
 */
export const useHandleMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const closeMenu = React.useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return { closeMenu, openMenu, anchorEl };
};
