import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const ServiceContainer = styled.View`
  flex-direction: row;
  border: solid 1px #3e2622;
  padding: 16px;
  margin-bottom: 8px;
`;
export const InfoContainer = styled.View`
  flex: 1;
`;

export const ServiceLine = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 8px;
`;

export const ServiceText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 21px;
  margin-bottom: 16px;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 0px;
`;

export const HourContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 0px;
`;

export const HourText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
`;

export const DateText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
`;
