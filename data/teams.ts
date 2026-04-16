import { ImageSourcePropType } from "react-native";

export interface Team {
    id: string;
    name: string;
    copas: number;
    city: string;
    estadio: string;
    colores: string[];
    fundacion: number;
    partidosGanados: number;
    partidosPerdidos: number;
    empates: number;
    logo: ImageSourcePropType;
}

export const teams: Team[] = [
    {
        id: "1",
        name: "Barcelona SC",
        copas: 16,
        city: "Guayaquil",
        estadio: "Estadio Monumental",
        colores: ["Amarillo","Negro", "Rojo"],
        fundacion: 1925,
        partidosGanados: 17,
        partidosPerdidos: 25,
        empates: 24,
        logo: require("../assets/logos/BARCELONA.png"),
    },
    {
        id: "2",
        name: "LDU",
        copas: 22,
        city: "Quito",
        estadio: "Estadio Rodrigo Paz Delgado",
        colores: ["Blanco", "Azul", "Rojo"],
        fundacion: 1930,
        partidosGanados: 25,
        partidosPerdidos: 20,
        empates: 15,
        logo: require("../assets/logos/LDU.png"),
    },
    {
        id: "3",
        name: "Emelec",
        copas: 14,
        city: "Guayaquil",
        estadio: "Estadio George Capwell",
        colores: ["Azul", "Gris", "Blanco"],
        fundacion: 1929,
        partidosGanados: 23,
        partidosPerdidos: 24,
        empates: 20,
        logo: require("../assets/logos/EMELEC.png"),
    },
];