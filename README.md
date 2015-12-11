# ibex-config

```js
import Ibex from 'ibex';
import config from 'ibex-config';

(async function main() {
    const app = new Ibex();
    await config('/js/config')(app);
})();
```
