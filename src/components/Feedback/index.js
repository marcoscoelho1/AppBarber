import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hideFeedback } from '~/store/modules/feedback/actions';

const Feedback = ({ feedback, hideFeedback }) => {
  setTimeout(() => hideFeedback(), 5000);

  let backgroundColor = '#ccc';
  let icon = '';

  if (feedback.type === 'success') {
    icon = 'check';
    backgroundColor = '#25D276';
  } else if (feedback.type === 'error') {
    icon = 'error-outline';
    backgroundColor = '#EE3342';
  } else if (feedback.type === 'warning') {
    icon = 'warning';
    backgroundColor = '#EA8D00';
  }

  return (
    <Toast
      visible={feedback.visible}
      duration={5}
      position={10}
      shadow={false}
      opacity={1}
      backgroundColor={backgroundColor}
      animation
      onHide={() => hideFeedback()}
    >
      <Icon name={icon} size={20} color="#fff" />{' '}
      <Text style={{ paddingLeft: 25, color: '#fff' }}>{feedback.message}</Text>
    </Toast>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.any,
  hideFeedback: PropTypes.func,
};

Feedback.defaultProps = { feedback: null, hideFeedback: null };

const mapStateToProps = state => ({
  feedback: state.feedback.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ hideFeedback }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
