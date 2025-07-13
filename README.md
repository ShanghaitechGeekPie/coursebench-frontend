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

### Mock Data Configuration

To enable mock data during development, modify the `USE_MOCK` setting in `/src/config/environment.js`:

```javascript
development: {
  USE_MOCK: true,  // Set to false to use real API
  API_BASE_URL: 'http://localhost:3000',
}
```

Mock data is automatically disabled in production builds.
