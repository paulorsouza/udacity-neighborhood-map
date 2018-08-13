import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const TipCard = (props) => {
  const {
    classes, user, link, text
  } = props;
  const bull = (
    <span className={classes.bullet}>
      •
    </span>
  );

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography component="p">
            {text}
            {bull}
            {link && (
              <span>
                <a href={link}>
                  Foursquare.
                </a>
              </span>
            )}
          </Typography>
          <Typography className={classes.title} color="textSecondary">
            {user}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

TipCard.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  user: PropTypes.string
};

TipCard.defaultProps = {
  link: null,
  user: ''
};

export default withStyles(styles)(TipCard);
