import polandFlag from "@/assets/flags/poland.png";
import germanyFlag from "@/assets/flags/germany.png";
import franceFlag from "@/assets/flags/france.png";
import spainFlag from "@/assets/flags/spain.png";
import italyFlag from "@/assets/flags/italy.png";
import ukFlag from "@/assets/flags/uk.png";
import swedenFlag from "@/assets/flags/sweden.png";
import norwayFlag from "@/assets/flags/norway.png";
import greeceFlag from "@/assets/flags/greece.png";
import portugalFlag from "@/assets/flags/portugal.png";
import netherlandsFlag from "@/assets/flags/netherlands.png";
import belgiumFlag from "@/assets/flags/belgium.png";
import austriaFlag from "@/assets/flags/austria.png";
import czechFlag from "@/assets/flags/czech.png";
import denmarkFlag from "@/assets/flags/denmark.png";

export interface Country {
  id: string;
  name: string;
  capital: string;
  flag: string;
  region: string;
  population: string;
  area: string;
  languages: string[];
  funFact: string;
}

export const europeanCountries: Country[] = [
  {
    id: "poland",
    name: "Polska",
    capital: "Warszawa",
    flag: polandFlag,
    region: "Europa Środkowa",
    population: "38 mln",
    area: "312 696 km²",
    languages: ["Polski"],
    funFact: "Polska ma najdłuższą linię brzegową Morza Bałtyckiego!"
  },
  {
    id: "germany",
    name: "Niemcy",
    capital: "Berlin",
    flag: germanyFlag,
    region: "Europa Środkowa",
    population: "83 mln",
    area: "357 022 km²",
    languages: ["Niemiecki"],
    funFact: "Niemcy mają ponad 1500 różnych rodzajów piwa!"
  },
  {
    id: "france",
    name: "Francja",
    capital: "Paryż",
    flag: franceFlag,
    region: "Europa Zachodnia",
    population: "67 mln",
    area: "643 801 km²",
    languages: ["Francuski"],
    funFact: "Wieża Eiffla może się wydłużyć o 15 cm w upalne dni!"
  },
  {
    id: "spain",
    name: "Hiszpania",
    capital: "Madryt",
    flag: spainFlag,
    region: "Europa Południowa",
    population: "47 mln",
    area: "505 990 km²",
    languages: ["Hiszpański"],
    funFact: "Hiszpania ma ponad 8000 km wybrzeża!"
  },
  {
    id: "italy",
    name: "Włochy",
    capital: "Rzym",
    flag: italyFlag,
    region: "Europa Południowa",
    population: "60 mln",
    area: "301 340 km²",
    languages: ["Włoski"],
    funFact: "We Włoszech znajduje się najwięcej wulkanów w Europie!"
  },
  {
    id: "uk",
    name: "Wielka Brytania",
    capital: "Londyn",
    flag: ukFlag,
    region: "Europa Zachodnia",
    population: "67 mln",
    area: "242 495 km²",
    languages: ["Angielski"],
    funFact: "W Londynie jest więcej Indian niż w jakimkolwiek innym mieście poza Indiami!"
  },
  {
    id: "sweden",
    name: "Szwecja",
    capital: "Sztokholm",
    flag: swedenFlag,
    region: "Europa Północna",
    population: "10 mln",
    area: "450 295 km²",
    languages: ["Szwedzki"],
    funFact: "Szwecja ma ponad 100 000 jezior!"
  },
  {
    id: "norway",
    name: "Norwegia",
    capital: "Oslo",
    flag: norwayFlag,
    region: "Europa Północna",
    population: "5 mln",
    area: "385 207 km²",
    languages: ["Norweski"],
    funFact: "Norwegia ma najdłuższą linię brzegową na świecie!"
  },
  {
    id: "greece",
    name: "Grecja",
    capital: "Ateny",
    flag: greeceFlag,
    region: "Europa Południowa",
    population: "11 mln",
    area: "131 957 km²",
    languages: ["Grecki"],
    funFact: "Grecja ma ponad 6000 wysp!"
  },
  {
    id: "portugal",
    name: "Portugalia",
    capital: "Lizbona",
    flag: portugalFlag,
    region: "Europa Zachodnia",
    population: "10 mln",
    area: "92 090 km²",
    languages: ["Portugalski"],
    funFact: "Portugalia jest najstarszym krajem w Europie z niezmienionymi granicami!"
  },
  {
    id: "netherlands",
    name: "Holandia",
    capital: "Amsterdam",
    flag: netherlandsFlag,
    region: "Europa Zachodnia",
    population: "17 mln",
    area: "41 543 km²",
    languages: ["Holenderski"],
    funFact: "W Holandii jest więcej rowerów niż ludzi!"
  },
  {
    id: "belgium",
    name: "Belgia",
    capital: "Bruksela",
    flag: belgiumFlag,
    region: "Europa Zachodnia",
    population: "11 mln",
    area: "30 528 km²",
    languages: ["Holenderski", "Francuski", "Niemiecki"],
    funFact: "Belgia produkuje 220 000 ton czekolady rocznie!"
  },
  {
    id: "austria",
    name: "Austria",
    capital: "Wiedeń",
    flag: austriaFlag,
    region: "Europa Środkowa",
    population: "9 mln",
    area: "83 871 km²",
    languages: ["Niemiecki"],
    funFact: "Austria jest jednym z najbardziej zalesionnych krajów w Europie!"
  },
  {
    id: "czech",
    name: "Czechy",
    capital: "Praga",
    flag: czechFlag,
    region: "Europa Środkowa",
    population: "11 mln",
    area: "78 867 km²",
    languages: ["Czeski"],
    funFact: "Czesi piją więcej piwa na osobę niż jakikolwiek inny naród!"
  },
  {
    id: "denmark",
    name: "Dania",
    capital: "Kopenhaga",
    flag: denmarkFlag,
    region: "Europa Północna",
    population: "6 mln",
    area: "42 933 km²",
    languages: ["Duński"],
    funFact: "Dania składa się z jednego półwyspu i 443 wysp!"
  }
];
