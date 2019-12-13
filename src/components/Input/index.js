import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  InputContainer,
  LabelInput,
  TInput,
  MInput,
} from './styles';

function Input({ style, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color="#999"
          style={{ paddingBottom: 5, paddingRight: 5 }}
        />
      )}
      {rest.mask ? (
        <InputContainer>
          <LabelInput icon={icon}>
            {rest.value ? rest.placeholder : ''}
          </LabelInput>
          <MInput {...rest} ref={ref} />
        </InputContainer>
      ) : (
        <InputContainer>
          <LabelInput icon={icon}>
            {rest.value ? rest.placeholder : ''}
          </LabelInput>
          <TInput {...rest} ref={ref} />
        </InputContainer>
      )}
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = { style: {}, icon: null };

export default forwardRef(Input);
