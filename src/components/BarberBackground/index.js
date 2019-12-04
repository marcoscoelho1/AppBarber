import React from 'react';
import PropTypes from 'prop-types';
import Background from '~/assets/images/Background.png';

import { ImgBackground } from './styles';

export default function BarberBackground({ children }) {
  return <ImgBackground source={Background}>{children}</ImgBackground>;
}

BarberBackground.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
