import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
`;

export const SessionMainContainer = styled.ScrollView`
  height: 50%;
`;

export const HeaderImageBackground = styled.ImageBackground`
  width: 100%;
  height: 150px;
  margin-bottom: 32px;
`;

export const Header = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  padding: 16px;
`;

export const BarbershopName = styled.Text`
  color: #fff;
  font-size: 21;
`;

export const BarbershopAddress = styled.Text`
  color: #fff;
  font-size: 12;
`;

export const SessionContainer = styled.View`
  padding: 0px 16px;
  margin-bottom: 32px;
`;

export const SessionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const SessionSubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const SessionText = styled.Text`
  font-size: 14px;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 60;
  background-color: #ea8d00;
  bottom: 10;
  right: 10;
  justify-content: center;
  align-items: center;
`;
