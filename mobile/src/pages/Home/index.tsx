import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ibge from "../../services/ibge";
import SelectPicker from "../../components/SelectPicker";

import styles from "./styles";

interface IBGEUf {
  sigla: string;
  nome: string;
}

interface IBGECity {
  nome: string;
}

interface SelectOption {
  label: string;
  value: string;
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);

  const [selectedUf, setSelectedUf] = useState<string>("0");
  const [selectedCity, setSelectedCity] = useState<string>("0");

  useEffect(() => {
    async function loadIbgeUf() {
      const response = await ibge.get<IBGEUf[]>(
        "localidades/estados?orderBy=nome"
      );

      const ufInitials = response.data.map((uf) => {
        return {
          label: uf.nome,
          value: uf.sigla,
        };
      });

      setUfs(ufInitials);
    }

    loadIbgeUf();
  }, []);

  useEffect(() => {
    async function loadIbgeCity() {
      if (selectedUf === "0") return;

      const response = await ibge.get<IBGECity[]>(
        `localidades/estados/${selectedUf}/municipios`
      );

      const cityNames = response.data.map((city) => {
        return {
          label: city.nome,
          value: city.nome,
        };
      });

      setCities(cityNames);
    }

    loadIbgeCity();
  }, [selectedUf]);

  function handleNavigateToPoints() {
    if (selectedUf === "0" || selectedCity === "0")
      Alert.alert("Ops!", "Precisamos que selecione a Uf e a cidade.");
    else
      navigation.navigate("Points", {
        uf: selectedUf,
        city: selectedCity,
      });
  }

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <View>
          <Text style={styles.title}>
            Seu marketplace de coleta de resíduos
          </Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        {ufs.length > 0 && (
          <SelectPicker
            placeholder={{
              label: "Selecione uma UF",
              value: "0",
            }}
            items={ufs}
            onChange={(uf) => {
              setSelectedCity("0");
              setSelectedUf(String(uf));
            }}
          />
        )}

        {selectedUf !== "0" && (
          <SelectPicker
            placeholder={{
              label: "Selecione uma cidade",
              value: "0",
            }}
            onChange={(city) => setSelectedCity(String(city))}
            value={selectedCity}
            items={cities}
          />
        )}

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#fff" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
