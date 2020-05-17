import Vue from 'vue';

import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'ar',
  fallbackLocale: 'en',
  messages: {    
    'en': {
      logo: 'Qurani',
      info: ''
    },    
    'ar': {
      logo: 'قرآنى',
      info: 'تمت برمجة هذا التطبيق عن طريق تزويدنا ب API  من خلال'
    }
  }
});