import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Team } from "../data/teams";

interface Props {
    team: Team;
    isFavorite: boolean;
    onPress: () => void;
}

export default function TeamCard({ team, isFavorite, onPress }: Props) {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                isFavorite && styles.favoriteCard
            ]}
            onPress={onPress}
        >
            <Image source={team.logo} style={styles.logo} resizeMode="contain" />

            <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                    {team.name} {isFavorite && "⭐"}
                </Text>
                <Text style={styles.copas}>🏆 {team.copas}</Text>
                <Text style={styles.city}>📍 {team.city}</Text>
                <Text style={styles.estadio}>🏟️ {team.estadio}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 12,
        padding: 12,
        elevation: 3,
    },

    favoriteCard: {
        borderWidth: 2,
        borderColor: "#FFD700",
    },

    logo: {
        width: 60,
        height: 60,
        marginRight: 14,
    },

    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0e0b0b",
    },

    city: {
        fontSize: 13,
        color: "#666",
        marginTop: 4,
    },

    copas: {
        fontSize: 13,
        color: "#666",
        marginTop: 2,
    },

    estadio: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
});