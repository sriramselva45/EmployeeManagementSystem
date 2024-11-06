const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    port: '3306',
    database: 'empManagementSystem'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Server Connected");
  });

  function getEmployeeById(id) {
    return new Promise((req, res) => {
        con.query('SELECT * FROM empDetails where id = ?',[id], (err, rows) => {
            if(err)
                res(err);
            else
                req(rows);
        });
    });
}
function getAllEmployees() {
    return new Promise((req, res) => {
        con.query('SELECT * FROM empDetails', (err, rows) => {
            if(err)
                res(err);
            else
                req(rows);
        });
    });
}

function addEmployee(employeeData) {
    return new Promise((req, res) => {
        const { name, age, position, department, contact, email } = employeeData;
        con.query(
            'INSERT INTO empDetails (name, age, position, department, contact, email) VALUES (?, ?, ?, ?, ?, ?)',
            [name, age, position, department, contact, email],
            (err, result) => {
                if (err) {
                    res(err);
                } else {
                    req("New Employee Added Successfully");
                }
            }
        );
    });
}

function updateEmployeeById(id, employeeData) {
    return new Promise((req, res) => {
        const { name, age, position, department, contact, email } = employeeData;
        con.query(
            'UPDATE empDetails SET name = ?, age = ?, position = ?, department = ?, contact = ?, email = ? WHERE id = ?',
            [name, age, position, department, contact, email, id],
            (err, result) => {
                if (err) {
                    res(err);
                } else {
                    req("Employee Updated Successfully");
                }
            }
        );
    });
}

function deleteEmployeeById(id) {
    return new Promise((req, res) => {
        con.query('DELETE from empDetails where id = ?',[id], (err, rows) => {
            if(err)
                res(err);
            else
                req("deleted successfully");
        });
    });
}

app.get("/employees/:id", async function(req, res) {
    const id = req.params.id;
    const employee = await getEmployeeById(id);
    res.send(employee);
})

app.get("/employees", async function(req, res) {
    const employees = await getAllEmployees();
    res.send(employees);
})

app.post("/employees", async function(req, res) {
        const employeeData = req.body;
        const result = await addEmployee(employeeData);
        res.send(result);
    
});

app.put("/employees/:id", async function(req, res) {
        const id = req.params.id;
        const employeeData = req.body;
        const result = await updateEmployeeById(id, employeeData);
        res.send(result);
});

app.delete("/employees/:id", async function(req, res) {
    const id = req.params.id;
    const result = await deleteEmployeeById(id);
    res.send(result);
})

// app.get("/api", (req, res) => {
//     return res.json({message: "Hello From Backend"})
// })


app.listen(8000, ()=> {
    console.log("Server Listening")
})

