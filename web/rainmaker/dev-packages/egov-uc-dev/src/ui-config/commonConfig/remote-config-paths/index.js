const remoteConfigPath = (path, screenKey) => {
  let config = {};
  switch (path) {
    default:
      try {
        // config=import(`ui-config/screens/specs/${path}/${screenKey}`);
        // .then(screen => {
        //   console.log(screen);
        //   return screen.default;
        // });
        // console.log("import",import(`ui-config/screens/specs/${path}/${screenKey}`).then(screen => screen.default));
        // config=import(`ui-config/screens/specs/${path}/${screenKey}`).default;
        config=require(`ui-config/screens/specs/${path}/${screenKey}`).default;
      } catch (e) {
        console.log(e);
      }
      break;
  }
  return config;
};

export default remoteConfigPath;
