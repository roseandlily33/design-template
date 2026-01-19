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
  Lato,
  Pacifico,
  Nunito,
  Source_Sans_3,
  Josefin_Sans,
  Rubik,
  Mulish,
  Fira_Sans,
  Cabin,
  PT_Sans,
  Arimo,
  Work_Sans,
  Dancing_Script,
  Righteous,
  Anton,
  Barlow,
  Exo_2,
  Manrope,
  Satisfy,
  Oxygen,
  Ubuntu,
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
  "Pacifico",
  "Dancing Script",
  "Righteous",
  "Anton",
  "Satisfy",
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
  "Lato",
  "Nunito",
  "Source Sans 3",
  "Josefin Sans",
  "Rubik",
  "Mulish",
  "Fira Sans",
  "Cabin",
  "PT Sans",
  "Arimo",
  "Work Sans",
  "Barlow",
  "Exo 2",
  "Manrope",
  "Oxygen",
  "Ubuntu",
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
const lato = Lato({ subsets: ["latin"], weight: "400" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const nunito = Nunito({ subsets: ["latin"], weight: "400" });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], weight: "400" });
const josefinSans = Josefin_Sans({ subsets: ["latin"], weight: "400" });
const rubik = Rubik({ subsets: ["latin"], weight: "400" });
const mulish = Mulish({ subsets: ["latin"], weight: "400" });
const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });
const cabin = Cabin({ subsets: ["latin"], weight: "400" });
const ptSans = PT_Sans({ subsets: ["latin"], weight: "400" });
const arimo = Arimo({ subsets: ["latin"], weight: "400" });
const workSans = Work_Sans({ subsets: ["latin"], weight: "400" });
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: "400" });
const righteous = Righteous({ subsets: ["latin"], weight: "400" });
const anton = Anton({ subsets: ["latin"], weight: "400" });
const barlow = Barlow({ subsets: ["latin"], weight: "400" });
const exo2 = Exo_2({ subsets: ["latin"], weight: "400" });
const manrope = Manrope({ subsets: ["latin"], weight: "400" });
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const oxygen = Oxygen({ subsets: ["latin"], weight: "400" });
const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" });

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
  Lato: lato.className,
  Pacifico: pacifico.className,
  Nunito: nunito.className,
  "Source Sans 3": sourceSans3.className,
  "Josefin Sans": josefinSans.className,
  Rubik: rubik.className,
  Mulish: mulish.className,
  "Fira Sans": firaSans.className,
  Cabin: cabin.className,
  "PT Sans": ptSans.className,
  Arimo: arimo.className,
  "Work Sans": workSans.className,
  "Dancing Script": dancingScript.className,
  Righteous: righteous.className,
  Anton: anton.className,
  Barlow: barlow.className,
  "Exo 2": exo2.className,
  Manrope: manrope.className,
  Satisfy: satisfy.className,
  Oxygen: oxygen.className,
  Ubuntu: ubuntu.className,
};
