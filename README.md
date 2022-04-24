# Install packages
```
npm install
```

﻿# Start Client
```
npm start
```

In case you were changing server default configuration, make sure that client connects to correct address:port in src/App.tsc
```
export const port = 1337;
export const baseUrl = `http://localhost:${port}`
```
