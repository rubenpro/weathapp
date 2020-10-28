import { createUseStyles } from 'react-jss';

export const WeatherInfoStyles = createUseStyles({
  container: {
    position: 'relative',
    top: 50,
    padding: '2rem',
  },
  currentSearch: {
    marginRight: '2em',
  },
  searchCombo: {
    width: 300,
    '& .euiFormControlLayout .euiFormControlLayoutCustomIcon--clickable:focus': {
      animation: 'none !important',
    },
  },
});
