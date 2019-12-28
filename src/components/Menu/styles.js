import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
`;

export const ContainerAvatar = styled.View`
  height: 50%;
  justify-content: center;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const ItemList = styled.TouchableOpacity`
  flex-direction: row;
  background: rgba(0, 0, 0, 0.5);
  height: 57;
  align-items: center;
  border: solid 1px #fff;
  padding: 0px 32px;
  margin-bottom: 5px;
`;

export const ItemText = styled.Text`
  color: #fff;
  font-size: 21px;
`;
