import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const ConfirmButton = styled.TouchableOpacity`
  height: 66px;
  background: #ea8d00;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ConfirmText = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 28px;
`;

export const BarbershopAddressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 0px;
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

export const BarbershopName = styled.Text`
  font-size: 21;
`;

export const BarbershopAddress = styled.Text`
  font-size: 16;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
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

export const AvaliationContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const StarsContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
`;

export const InputForm = styled(Input)`
  margin-bottom: 16px;
`;
