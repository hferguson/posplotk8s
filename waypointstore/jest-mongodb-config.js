module.exports = {
    mongodbMemoryServer: {
        debug: "1",
        MONGOMS_VERSION: "6.0.6"
    },
    mongodbMemoryServerOptions: {
      binary: {
        version: '6.0.6',
        skipMD5: true,
      },
      instance: {},
      autoStart: false,
    },
    mongoURLEnvName: 'MONGO_URI',
  };