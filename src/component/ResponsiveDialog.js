import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const ResponsiveDialog = (props) => {
  const {
    fullScreen, open, title, children, onClose
  } = props;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired
};

ResponsiveDialog.defaultProps = {
  open: false,
  title: '',
  children: <div />
};

export default withMobileDialog()(ResponsiveDialog);
