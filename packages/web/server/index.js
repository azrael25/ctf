import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack/dev.config';

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

const app = express(),
    compiler = webpack(config),
    port = 3000;

app.set('port', process.env.PORT || port);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(app.get('port'), () => console.log(`Start on port ${ app.get('port') }`));
