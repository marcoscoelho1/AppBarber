import React from 'react';
import PropTypes from 'prop-types';
import { Modal, TouchableHighlight, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ModalContainer, ModalBody, ModalHeader, HeaderTitle } from './styles';

const MyModal = ({ modalVisible, onClose, children, title }) => (
  <ScrollView style={{ padding: 25 }}>
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <ModalContainer>
        <ModalHeader>
          <HeaderTitle>{title}</HeaderTitle>

          <TouchableHighlight
            onPress={() => {
              onClose();
            }}
          >
            <Icon
              name="close"
              size={40}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </TouchableHighlight>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Modal>
  </ScrollView>
);

MyModal.propTypes = {
  title: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

export default MyModal;
