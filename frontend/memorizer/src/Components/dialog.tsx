import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme
} from '@mui/material';

import Dialog from '@mui/material/Dialog';

interface DialogComponentI {
  open: boolean;
  handleClose: () => void;
  title: string;
  text: string;
  btnLeftAction: () => void;
  btnLeftText: string;
  btnRightAction: () => void;
  btnRightText: string;
}
export function DialogComponent(props: DialogComponentI) {
  const {
    open,
    handleClose,
    title,
    text,
    btnLeftAction,
    btnLeftText,
    btnRightAction,
    btnRightText
  } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={btnLeftAction}>
          {btnLeftText}
        </Button>
        <Button onClick={btnRightAction} autoFocus>
          {btnRightText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
