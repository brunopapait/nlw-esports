import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return <Text>{props.title}</Text>;
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Araruna" />
      <Button title="Botão 3" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
