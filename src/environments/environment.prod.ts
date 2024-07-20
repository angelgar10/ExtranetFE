import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  name: "dev",
  url: 'http://localhost:5000/'
};
