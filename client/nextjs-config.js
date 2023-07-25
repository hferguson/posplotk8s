const nextConfig = {
    env:{
      HEALTHMON_URL: process.env.HEALTHMON_URL
    }
  }
module.exports = {
    webpack: (config) => {
      config.watchOptions.poll = 300;
      return config;
    },
  };