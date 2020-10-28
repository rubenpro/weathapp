import { createUseStyles } from 'react-jss';

export const WeatherCardStyles = createUseStyles({
  card: {
    width: 300,
    '& .euiCard__content .euiCard__description': {
      margin: 0,
    },
  },
});
