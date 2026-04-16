import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import TeamCard from "../components/TeamCard";
import { teams } from "../data/teams";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 ESTADÍSTICAS
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

  type Match = {
    id: string;
    home: string;
    away: string;
    date: string;
  };
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
        renderItem={({ item }) => <TeamCard team={item} />}
        contentContainerStyle={styles.list}
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
                  ⚽ {match.home} vs {match.away}S
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
  //Contenedor base de la pantalla.
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },

  //Espaciado vertical interno de la lista.
  list: {
    paddingVertical: 10,
  },
  //Estilo del input de búsqueda con fondo claro y bordes redondeados.
  input: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    elevation: 2,
  },
  //Contenedor de estadísticas con fondo destacado y margen.
  statsBox: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    alignItems: "center",
  },
  //Estilo del título de la sección de estadísticas.
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  //Estilo del texto de cada estadística individual.
  statsText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  //Estilo del título de la sección de calendario.
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginLeft: 10,
    marginTop: 20,
  },
  //Contenedor para cada bloque de fecha en el calendario.
  dayBlock: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  //Estilo del texto que muestra la fecha de los partidos.
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  //Estilo del texto que muestra el enfrentamiento entre equipos.
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
