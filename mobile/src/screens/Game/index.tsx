import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { GameParams } from "../../@types/navigation";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const navigation = useNavigation();
  const routes = useRoute();
  const game = routes.params as GameParams;

  useEffect(() => {
    fetch(`http://192.168.1.102:3333/games/${game.gameId}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length ? styles.contentList : styles.emptyListTextContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
