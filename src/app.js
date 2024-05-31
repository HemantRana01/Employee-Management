const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const { sequelize } = require('./models');

const app = express();

const employeeRoutes = require('./routes/employee');
const departmentRoutes = require('./routes/department');

app.use(cors());
app.use(bodyParser.json());
app.use('/public',
  express.static( path.resolve( __dirname, './public' ) )
);
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.get('/',(req,res)=>{
  res.send("Hello")
})
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true, force :false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;
