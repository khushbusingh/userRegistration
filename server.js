const express = require('express')
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser')
const axios = require("axios");
const jsonParser = bodyParser.json();
app.use(jsonParser);
const port = 8080;
const API_ADDRESS = "http://34.136.125.73";
app.use(cors());


app.post('/api/register', async (req, res) => {
  try{
  const { name, email, designation, imageSrc} = req.body;

  //Store image into Db
  const dbResp = await axios.post(`${API_ADDRESS}/ada/insert_into_db`, {imageSrc});

  
  //Register employee with uuid from add image response
  const { uuid } = dbResp.data;
  const registerResp = await axios.post(`${API_ADDRESS}/ada/employee`,{uuid, name, email, designation });



  //Get Details of all employee
  const { employee_id } = registerResp.data;
  let allEmpResp = await axios.get(`${API_ADDRESS}/ada/get_all_employees`);
  const allUsers = allEmpResp.data;
  const currentUser = allUsers.find(user => user.id == employee_id);
  res.send({status:"success", data: {allUsers, currentUser }});

  } catch(err) {
    console.log(err);
  }
})

app.get('/api/getAllUsers', async (req, res) => {
  try {
    let resp = await axios.get(`${API_ADDRESS}/ada/get_all_employees`)
    res.send({status:"success", data: {allUsers:resp.data}})
  } catch(err) {
      console.log(err)
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})