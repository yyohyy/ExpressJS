import app from './app'
import { envConfig} from './config/env.config';

const port = envConfig.PORT || 3000

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
