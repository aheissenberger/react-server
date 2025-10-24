export default {
  root: "pages",
  router(config) {
    return {
      ...config,
      // Exclude all files and directories within the "components" folder
      excludes: ["components/**/*"],
    };
  },
};
