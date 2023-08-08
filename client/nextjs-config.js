const nextConfig = {
    env:{
      HEALTHMON_URL: process.env.HEALTHMON_URL,
      REACT_APP_GITHUB_CLIENT_ID: process.env
    }
  }
module.exports = {
    webpack: (config) => {
      config.watchOptions.poll = 300;
      return config;
    },
  };