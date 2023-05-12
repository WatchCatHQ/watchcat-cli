# ![](https://github.com/WatchCatHQ/watchcat-assets/blob/main/watchcat_logo_tiny.png?raw=true) @watchcathq/cli

CLI tool for [watchcat.io](https://watchcat.io).

## Installation and Usage

To install the package, use your preferred package manager:

```shell
npm install @watchcathq/cli
yarn add @watchcathq/cli
```

## Upload Source Maps

This command can be used as part of a CI pipeline to upload source maps when an application is built. It will recursively search for maps in the specified directory and upload them for a given application, determined by the provided token. The token can be found in the application detail at https://app.watchcat.io/applications.

```
watchcat sourcemap [app_token] [directory]
```

#### Example

```shell
watchcat sourcemap app_12345 build/
```

In the example above, `app_12345` is the application token, and `build/` is the directory where the command will recursively search for source maps to upload.

## Documentation

See https://watchcat.io/docs
