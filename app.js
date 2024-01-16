const express = require("express");
const app = express();
const path = require('path')
port = 3000;
//=================================================================================================================================================

app.use(express.static('public'));
app.use(express.json());





app.get('/notes', (req, res) => {
    res.sendFile(path.resolve('public', 'notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'))
})



//=================================================================================================================================================
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
