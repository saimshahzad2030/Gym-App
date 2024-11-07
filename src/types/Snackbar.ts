import React from "react";
export type SnackBarType = {
    message: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};