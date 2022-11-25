import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { EditProfileButton } from "./components/ui/Button";

const Container = styled(View)`
  flex: 1;
  background-color: #050505;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <Container>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <EditProfileButton>
        <Text style={{ color: "white" }}>Hello</Text>
      </EditProfileButton>
    </Container>
  );
}
