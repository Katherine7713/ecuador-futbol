import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Team } from "../data/teams";

interface Props {
    //Datos del equipo para renderizar la tarjeta y construir la ruta de detalle.
    team: Team;
}

export default function TeamCard({ team }: Props) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.card}
            //navega a la pantalla de detalle dinamica del equipo seleccionado.
            onPress={() => router.push(`/team/${team.id}`)}
        >
            <Image source={team.logo} style={styles.logo} resizeMode="contain"/>
            <View>
                <Text style={styles.name}>{team.name}</Text>
                <Text style={styles.copas}>🏆{team.copas}</Text>
                <Text style={styles.city}>📍{team.city}</Text>
                <Text style={styles.estadio}>🏟️ {team.estadio}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    //Diseño horizontal de la tarjeta con elevación sutil para listas.
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 12,
        padding: 12,
        elevation: 3,
    },
    
    // Tamaño del logo y separación respecto al bloque de texto
    logo: {
        width: 60,
        height: 60,
        marginRight: 14,
    },

    //Estilo principal de texto para eñ nombre del equipo.
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0e0b0b",
    },

    //Estilo secundario de texto para la ciudad/ubicacion.
    city: {
        fontSize: 13,
        color: "#666",
        marginTop: 4,
    },
    //Estilo para mostrar el numero de copas ganadas.
    copas: {
        fontSize: 13,
        color: "#666",
        marginTop: 2,
    },
    //Estilo para mostrar el estadio del equipo.
    estadio: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
});