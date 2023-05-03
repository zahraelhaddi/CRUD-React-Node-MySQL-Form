const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.listen('1111', () => {
    console.log('listening on port 1111');
})


const mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'studentSystem',
    password: 'password',
    multipleStatements: true
}
);

app.get('/students', (req, res) => {
    mysqlconnection.query('select * from studentsinfo', (err, results) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

app.get('/student:id', (req, res) => {
    const wantedid = req.params.id;
    mysqlconnection.query('select * from studentsinfo where studid = ?', [wantedid], (err, results) => {
        if (!err)
            res.send(results);
        else
            res.send(err);
    });
});


app.post('/create', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    mysqlconnection.query('insert into studentsinfo(studname,studemail) values(?,?)', [name, email], (err, result) => {
        if (!err)
            res.send(result);
        else
            res.send(err);
    });
});


app.put('/update/:id', (req, res) => {
    const wantedStudent = req.params.id;
    mysqlconnection.query('update studentsinfo set studname = "known" where studid =?', [wantedStudent], (err, response) => {
        res.send(response);
    })
});



app.delete('/delete/:id', (req, res) => {
    const wantedid = req.params.id;
    mysqlconnection.query('delete from studentsinfo where studid=?', [wantedid], (err, result) => {
        mysqlconnection.query('update studentsinfo set studid= studid - 1 where studid > ?', [wantedid], (err, response) => {
        });
        res.send(result);
    });

});




