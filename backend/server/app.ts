import express from 'express';

const app = express();

app.listen(3301, () => {
  console.log('listening on 3301');
});

app.get('/', (req, res) => {
  res.send({
    message: 'hey ma'
  });
});
