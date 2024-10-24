import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export function useConfirmDialog() {
  const [dialogProps, setDialogProps] = useState<{ header: string; content: string; okBtn: boolean; resolve: (value: boolean) => void } | null>(null);

  const confirmDialog = (header: string, content: string, okBtn: boolean = false) => {
    return new Promise<boolean>((resolve) => {
      setDialogProps({ header, content, okBtn, resolve, });
    });
  };

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
    >
      <DialogTitle id="alert-dialog-title">{dialogProps.header}</DialogTitle>
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
