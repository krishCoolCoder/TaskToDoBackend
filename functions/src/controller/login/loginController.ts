const { Router } = require('express'); 
const app = Router(); 

app.get('/login', (req : any, res : any) => { 
    if (req.query.userId != undefined && req.query.userId !== "" && req.query.userId) {
        if (req.query.userId == "saikrishnatechno@gmail.com") {
            res.send("Successfully authenticated.")
        }
    } else {
        res.send("User authentication failed."); 
    }
}); 

module.exports = app;
