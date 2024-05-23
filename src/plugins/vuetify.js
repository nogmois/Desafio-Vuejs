
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa os estilos do Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Importa os ícones do Material Design

import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Define o set de ícones padrão como MDI
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
});

export default vuetify;
