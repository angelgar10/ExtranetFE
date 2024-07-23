import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  name: "dev",
  url: 'http://localhost:5021/',
  firebase: {
    "projectId":"extranet-a4a1c",
    "appId":"1:612273775473:web:076683cb0dcf0601dc8cd0",
    "storageBucket":"extranet-a4a1c.appspot.com",
    "apiKey":"AIzaSyAHFyHDKOF54a6PAk-Htb-rgiyT3p42OG8",
    "authDomain":"extranet-a4a1c.firebaseapp.com",
    "messagingSenderId":"612273775473",
    "measurementId":"G-8CLFQBX277"
  }
};
