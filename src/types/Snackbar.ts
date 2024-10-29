import React from "react";
export type SnackBarType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};