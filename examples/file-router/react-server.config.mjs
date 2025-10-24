export default {
  root: "pages",
  router(config) {
    return {
      // include existing default router config
      ...config,
      excludes: [
        // Important: existing excludes
        ...config.excludes,
        // Exclude all files and directories within the "components" folder
        "components/**/*",
      ],
    };
  },
};
