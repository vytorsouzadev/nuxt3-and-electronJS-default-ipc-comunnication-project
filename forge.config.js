const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const startTime = new Date(); // Registra o tempo de início

module.exports = {
  packagerConfig: {
    asar: true,
  },
  extraResource: ['.output/public'],
  ignore: [
    /^\/\.output\/public/,
  ],
  copyFiles: {
    from: '.output/public',
    to: 'dist'
  },
  rebuildConfig: {
    parallel: true,
    numberOfCores: 0
  },
  electronRebuildConfig: {
    parallel: true,
    numberOfCores: 0,
    forceABI: 89
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        parallel: true
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          parallel: true
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          parallel: true
        }
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {
        parallel: true
      },
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    postMake: async () => {
      const endTime = new Date(); // Registra o tempo de término
      const duration = (endTime - startTime) / 1000; // Calcula a duração em segundos
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      console.log(`Build completed in ${minutes} minutes and ${seconds} seconds.`);
    }
  }
};