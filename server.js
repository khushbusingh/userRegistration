const express = require('express')
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const axios = require("axios");
const mysql = require("mysql2");
const uuid = require('uuid');
const jsonParser = bodyParser.json();
app.use(jsonParser);
const port = 8080;
const API_ADDRESS = "http://34.136.125.73";
app.use(cors());

const dataBaseDetails = {
   host: "34.136.125.73",
  user : "adauser",
  password : "AdAdhiomic$",
  database :"ada"
}
let db_con = mysql.createConnection(dataBaseDetails);

async function saveUserImage(id, data){
   return new Promise((resolve, reject) => {
       let query = `INSERT INTO image_storage (id, data) VALUES (?, ?);`;
       db_con.query(query, [id, data], function (err, result){
           if (err){
               console.log("Error while saving user image" + err);
               reject(err);
           }
           resolve(result)
       })
   })
}

async function getUserImage(){
  //simple function to get growth items
   return new Promise((resolve, reject) => {
       let query = `SELECT * FROM image_storage;`;
       db_con.query(query, function (err, result){
           if (err){
               console.log("Error while saving user image" + err);
               reject(err);
           }
           resolve(result)
       })
   })
}

 function noramalizeUserResp({allDetails, imageDetails, selectedUser} ){
  let allUsers = [];
  let currentUser = {};
  allDetails.map(currentDetail => {
    const { name, email, designation, qrcode, photo, id} = currentDetail;
    const { data } = imageDetails.find( img => img.id == photo) || {};
    let avatarImg = data ? data.toString('base64') : "";
    let user = {
      name,
      email,
      designation,
      qrCode:qrcode,
      avatarImg
    }
    if(selectedUser == id){
      currentUser = user;
    } else {
      allUsers.push(user);
    }
  });
  if(!selectedUser){
    currentUser = allUsers[0];
  } else {
    allUsers.unshift(currentUser);
  }
  return { currentUser, allUsers};
}

app.post('/api/register', async (req, res) => {
  try{
  
  const { name, email, designation, imageSrc} = req.body;

  let buff = Buffer.from(imageSrc.split(',')[1], 'base64')
  const usesrUuid = uuid.v4();

  const photoBlob = buff.toString();
// form_data.append("photo", buff.toString(), "image.png" );
 
  //Store image into Db
  const saveImgResp = await saveUserImage(usesrUuid, buff);

  //Register employee with uuid from add image response
  const addData = {photo: usesrUuid, name, email, designation}
  const registerResp = await axios.post(`${API_ADDRESS}/ada/employee`,addData);
  
  //Get Details of all employee
  const getImgResp = await getUserImage();

  const { employee_id } = registerResp.data;
  let allEmpResp = await axios.get(`${API_ADDRESS}/ada/get_all_employees`);
  const {allUsers, currentUser }= noramalizeUserResp({allDetails: allEmpResp.data, imageDetails: getImgResp, selectedUser: employee_id});
  console.log(allUsers,currentUser );
  return res.send({status:"success", data: {allUsers, currentUser }});

  } catch(err) {
    console.log(err);
  }
})

app.get('/api/getAllUsers', async (req, res) => {
  try {
    //Get Details of all employee
    const getImgResp = await getUserImage();

    let allEmpResp = await axios.get(`${API_ADDRESS}/ada/get_all_employees`);

    const {allUsers, currentUser }= noramalizeUserResp({allDetails: allEmpResp.data, imageDetails: getImgResp});
    console.log(allUsers,currentUser )
    return res.send({status:"success", data: {allUsers, currentUser }});
  } catch(err) {
      console.log(err)
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})