import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  name: "dev",
  url: 'http://localhost:5000/'
};
