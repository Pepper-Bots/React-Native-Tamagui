// tamagui.config.ts
import { createTamagui } from 'tamagui';
import {config} from "@tamagui/config";
// Vous pouvez utiliser une configuration plus complète comme celle de @tamagui/config/v3 ou v4
// Pour cet exemple, nous utilisons la configuration par défaut de v4 pour être compatible avec l'import de l'utilisateur.
// Si vous utilisez une autre version (ex: v3), ajustez l'import.

// Si vous utilisez des polices spécifiques, assurez-vous qu'elles sont configurées ici
// et chargées dans votre application (voir _layout.tsx).
// Exemple: import { interFont } from './theme/fonts'

const appConfig = createTamagui(config); // 'config' importé de @tamagui/config/v4

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;