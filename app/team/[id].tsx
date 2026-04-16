import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { teams } from "../../data/teams";

export default function TeamDetailScreen() {
    //lee el id desde la ruta dinamica /team/[id].
    const { id} = useLocalSearchParams<{ id: string}>();
    //Busca el equipo correspondiente en el arreglo de datos local.
    const team = teams.find((t) => t.id === id);

    //Muestra un estado vacio si el id no existe en los datos.
    if (!team) {
        return (
            <View style={styles.center}>
                <Text>Equipo no encontrado 🥺</Text>
            </View>
        );
    }

    return (

        <View style={styles.container}>
            {/*Actualiza el titulo del header con el nombre del equipo */}
            <Stack.Screen options={{ title: team.name }} />
            <Image source={team.logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.name}>{team.name}</Text>
            <Text style={styles.city}>📍{team.city}</Text>
            <Text style={styles.colores}>🎨 {team.colores.join(", ")}</Text>
            <Text style={styles.fundacion}>Fundado: {team.fundacion}</Text>
            <Text style={styles.partidosGanados}>Partidos Ganados: {team.partidosGanados}</Text>
            <Text style={styles.partidosPerdidos}>Partidos Perdidos: {team.partidosPerdidos}</Text>
            <Text style={styles.empates}>Empates: {team.empates}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    //Contenedor principal centrado para la pantalla de detalle.
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f4f8",
    },

    //Variante centrada usada en el estado de equipo no encontrado.
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    
    //Tamaño del escudo/logo en la vista de detalle.
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },

    //Estilo destacado para el nombre del equipo.
    name: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1a1a2e",
        marginBottom: 8,
    },

    //Estilo secundario para mostrar la ciudad.
    city: {
        fontSize: 16,
        color: "#666",
    },
    //Estilo para mostrar los colores del equipo.
    colores: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
    },
    //Estilo para mostrar el año de fundación del equipo.
    fundacion: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
    },
    //Estilo para mostrar el número de partidos ganados.
    partidosGanados: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
    },
    //Estilo para mostrar el número de partidos perdidos.
    partidosPerdidos: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
    },
    //Estilo para mostrar el número de empates.
    empates: {
        fontSize: 16,
        color: "#666",
        marginTop: 4,
    },
});
