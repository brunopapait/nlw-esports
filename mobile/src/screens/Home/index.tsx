import { useEffect, useState } from "react";
import { View, Image, FlatList } from "react-native";
import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch("http://192.168.1.102:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />

      <Heading
        title="Encontre o seu duo !"
        subtitle="Selecione o game que deseja jogar .."
      />

      <FlatList
        contentContainerStyle={styles.contentList}
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
