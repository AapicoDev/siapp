import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export function useConfirmDialog() {
  const [dialogProps, setDialogProps] = useState<{ header: string; content: string; okBtn: boolean; theme: string; resolve: (value: boolean) => void } | null>(null);

  const confirmDialog = (header: string, content: string, okBtn: boolean = false, theme = "primary") => {
    return new Promise<boolean>((resolve) => {
      setDialogProps({ header, content, okBtn, resolve, theme});
    });
  };

  const dialogTitleThemeColor = dialogProps?.theme === "danger" ? "#F66262" :
                                dialogProps?.theme === "warning" ? "#FFB169" : 
                                dialogProps?.theme === "success" ? "#2BA441" : "#4C9BF5"

  const handleClose = (result: boolean) => {
    if (dialogProps) {
      dialogProps.resolve(result);
      setDialogProps(null);
    }
  };

  const ConfirmAlertDialog = dialogProps ? (
    <Dialog
      open={true}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // PaperProps={{
      //   sx: {
      //     backgroundColor: "#FFE8E8",
      //   },
      // }}
    >
      <DialogTitle id="alert-dialog-title" sx={{color: dialogTitleThemeColor}}>{dialogProps.header}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialogProps.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {!dialogProps.okBtn ? 
        <>
        <Button onClick={() => handleClose(false)}>No</Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          Yes
        </Button>
        </>
        :
        <Button onClick={() => handleClose(true)} autoFocus>
          OK
        </Button>
        }
      </DialogActions>
    </Dialog>
  ) : null;

  return { confirmDialog, ConfirmAlertDialog };
}
