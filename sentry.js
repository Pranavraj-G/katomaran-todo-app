// sentry.js
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: '', 
  enableInExpoDevelopment: true,
  debug: true
});
