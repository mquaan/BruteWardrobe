const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
    const dataToSend = { key: 'value' };
    res.json(dataToSend);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


export default router;
