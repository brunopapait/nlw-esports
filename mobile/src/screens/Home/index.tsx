import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.1.102:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  function handleOpenGame({ id: gameId, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { gameId, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logoImg} />

        <Heading
          title="Encontre o seu duo !"
          subtitle="Selecione o game que deseja jogar .."
        />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  );
}
