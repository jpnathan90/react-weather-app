import React from 'react';

const Html = ({ children, scripts }) => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <title>Weather App - Padmanathan</title>
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <link href="//timestamilnews.com/task.css" rel="stylesheet" id="custom-css" />
    </head>
    <body>
      <div className="container">
        <div className="row containerrow">
          <div
            id="app"
            dangerouslySetInnerHTML={{ __html: children }}
          />
        </div>
      </div>
      {scripts.map((item, index) => <script key={index} src={item} />)}
    </body>
  </html>
);

export default Html;
