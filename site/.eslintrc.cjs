module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-console": "error",
  },
  overrides: [
    process.env.NODE_ENV === "development" && {
      files: ["src/**/*.{js,jsx}"],
      rules: {
        "no-console": "off",
      },
    },
  ],
};
