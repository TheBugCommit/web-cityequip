import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackConfig = {
    entry: './public/js/index.js',
    devtool: 'source-map',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'public', 'dist'),
    }
}

export default webpackConfig