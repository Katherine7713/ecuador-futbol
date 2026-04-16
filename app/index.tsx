import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import TeamCard from "../components/TeamCard";
import { teams } from "../data/teams";

type Match = {
  id: string;
  home: string;
  away: string;
  date: string;
};

const STORAGE_KEY = "@favorite_teams";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // 📥 Cargar favoritos
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Error cargando favoritos:", e);
    }
  };

  // 💾 Guardar favoritos
  const saveFavorites = async (value: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
      console.log("Error guardando favoritos:", e);
    }
  };

  const toggleFavorite = (teamId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(teamId);

      const updated = isFav
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId];

      saveFavorites(updated);
      return updated;
    });
  };

  // 🔍 filtro equipos
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 estadísticas
  const totalTeams = teams.length;

  const totalWins = teams.reduce(
    (sum, team) => sum + team.partidosGanados,
    0
  );

  const totalMatches = teams.reduce(
    (sum, team) =>
      sum +
      team.partidosGanados +
      team.partidosPerdidos +
      team.empates,
    0
  );

  const winRate = ((totalWins / totalMatches) * 100).toFixed(1);

  // 📅 partidos
  const matches: Match[] = [
    { id: "1", home: "LDU", away: "Barcelona SC", date: "20 Abril" },
    { id: "2", home: "Emelec", away: "Delfín", date: "22 Abril" },
    { id: "3", home: "LDU", away: "Emelec", date: "22 Abril" },
  ];

  const grouped = matches.reduce<Record<string, Match[]>>(
    (acc, match) => {
      if (!acc[match.date]) acc[match.date] = [];
      acc[match.date].push(match);
      return acc;
    },
    {}
  );

  const calendarData = Object.keys(grouped).map((date) => ({
    date,
    matches: grouped[date],
  }));

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Equipos de Ecuador" }} />

      {/* 📊 ESTADÍSTICAS */}
      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>📊 Estadísticas Generales</Text>
        <Text style={styles.statsText}>🏟️ Equipos: {totalTeams}</Text>
        <Text style={styles.statsText}>⚽ Victorias: {totalWins}</Text>
        <Text style={styles.statsText}>📈 Win rate: {winRate}%</Text>
      </View>

      {/* 🔍 BUSCADOR */}
      <TextInput
        style={styles.input}
        placeholder="Buscar equipo..."
        value={search}
        onChangeText={setSearch}
      />

      {/* 📋 LISTA DE EQUIPOS */}
      <FlatList
        data={filteredTeams}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TeamCard
            team={item}
            isFavorite={favorites.includes(item.id)}
            onPress={() => toggleFavorite(item.id)}
          />
        )}
      />

      {/* 📅 CALENDARIO */}
      <Text style={styles.title}>📅 Calendario de partidos</Text>

      <FlatList
        data={calendarData}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.dayBlock}>
            <Text style={styles.date}>{item.date}</Text>

            {item.matches.map((match: Match) => (
              <View key={match.id} style={styles.card}>
                <Text style={styles.match}>
                  ⚽ {match.home} vs {match.away}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  list: {
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    elevation: 2,
  },
  statsBox: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    alignItems: "center",
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginLeft: 10,
    marginTop: 20,
  },
  dayBlock: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  match: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#f5f7ff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
});