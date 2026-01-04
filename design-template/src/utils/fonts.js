import {
  Inter,
  Roboto,
  Montserrat,
  Lora,
  Oswald,
  Poppins,
  Merriweather,
  Open_Sans,
  Playfair_Display,
  Lobster,
  Lobster_Two,
  Raleway,
  DM_Sans,
  Quicksand,
  Bebas_Neue,
  Libre_Baskerville,
  Abril_Fatface,
  Prata,
} from "next/font/google";


// Organize fonts by type
export const displayFonts = [
  "Lobster",
  "Lobster Two",
  "Bebas Neue",
  "Oswald",
  "Abril Fatface",
  "Playfair Display",
  "Prata",
];
export const bodyFonts = [
  "Inter",
  "Roboto",
  "Montserrat",
  "Lora",
  "Poppins",
  "Merriweather",
  "Open Sans",
  "Raleway",
  "DM Sans",
  "Quicksand",
  "Libre Baskerville",
];
export const allFonts = [...displayFonts, ...bodyFonts];

// Google font instances
const inter = Inter({ subsets: ["latin"], weight: "400" });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const lora = Lora({ subsets: ["latin"], weight: "400" });
const oswald = Oswald({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });
const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: "400" });
const lobster = Lobster({ subsets: ["latin"], weight: "400" });
const lobsterTwo = Lobster_Two({ subsets: ["latin"], weight: "400" });
const raleway = Raleway({ subsets: ["latin"], weight: "400" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: "400" });
const quicksand = Quicksand({ subsets: ["latin"], weight: "400" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
});
const abrilFatface = Abril_Fatface({ subsets: ["latin"], weight: "400" });
const prata = Prata({ subsets: ["latin"], weight: "400" });

// Map font names to classNames
export const fontMap = {
  Inter: inter.className,
  Roboto: roboto.className,
  Montserrat: montserrat.className,
  Lora: lora.className,
  Oswald: oswald.className,
  Poppins: poppins.className,
  Merriweather: merriweather.className,
  "Open Sans": openSans.className,
  "Playfair Display": playfairDisplay.className,
  Lobster: lobster.className,
  "Lobster Two": lobsterTwo.className,
  Raleway: raleway.className,
  "DM Sans": dmSans.className,
  Quicksand: quicksand.className,
  "Bebas Neue": bebasNeue.className,
  "Libre Baskerville": libreBaskerville.className,
  "Abril Fatface": abrilFatface.className,
  Prata: prata.className,
};