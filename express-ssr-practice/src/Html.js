import React from 'react';

const Html = (props) => {
    return (
        <html>
            <head>
                <title>App</title>
            </head>
            <body>
                <div id="app">{props.children}</div>
                <script
                    id="initial-data"
                    type="text/plain"
                    data-json={props.initialData}></script>
                <script src="/client.js"></script>
            </body>
        </html>
    );
};

export default Html;