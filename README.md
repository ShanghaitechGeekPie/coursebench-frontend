# CourseBench Frontend

The frontend of the CourseBench.

### How to use

Fetch the dependencies first by using the command below.

```
yarn --ignore-engines
```

Run this command to build it.

```
yarn run build
```

You will get the `dist` folder. Upload it to your server.

Run this command if you feel like debuging it.

```
yarn run serve
```

Modify `export const USE_MOCK_DATA = false;` to `true` in the file `/src/composables/global/usePhantomData.js` to use mock data.
