// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  imageUrl: "http://localhost:8080/imreader/api/v0.1/image",
  sampleUrl: "http://localhost:8080/imreader/api/v0.1/image/sample",
  baseUrl: "http://localhost:8080"
};
