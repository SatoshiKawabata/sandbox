import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import Html from './Html';
import App from './App';

const app = express();

const initialData = {
    name: 'World'
};

const router = express.Router();

router.get('*', (req, res) => {
    const node = ReactDOMServer.renderToNodeStream(
        <Html initialData={JSON.stringify(initialData)}>
            <App {...initialData} />
        </Html>
    );
    console.log("node", node);
    node.pipe(res);
});

app.use(express.static('public'));
app.use("/", router);
app.listen(3000);