const express = require('express')
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

app.use(jsonParser);
const port = 8080;

app.use(cors());

let allUsersData = [{
  qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg",
  avatarImg: "https://i.pravatar.cc/150?img=1",
  name: "sample 1", 
  email: "sample1@abc.com", 
  designation: "executive 1"
}, {
  qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg",
  avatarImg: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  name: "sample 12", 
  email: "sample12@abc.com", 
  designation: "executive 12"
}, {
  qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg",
  avatarImg: "https://i.pravatar.cc/150?img=2",
  name: "sample 13", 
  email: "sample13@abc.com", 
  designation: "executive 13"
},
{
  qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg",
  avatarImg: "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg",
  name: "sample 14", 
  email: "sample14@abc.com", 
  designation: "executive 14"
},
{
  qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg",
  avatarImg: "https://i.pravatar.cc/150?img=5",
  name: "sample 15", 
  email: "sample15@abc.com", 
  designation: "executive 15"
}, {
  qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg",
  avatarImg: "https://i.pravatar.cc/150?img=4",
  name: "sample 16", 
  email: "sample16@abc.com", 
  designation: "executive 16"
},
{
  qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg",
  avatarImg: "https://i.pravatar.cc/150?img=3",
  name: "sample 17", 
  email: "sample17@abc.com", 
  designation: "executive 17"
}
]

app.post('/api/register', (req, res) => {

  const { name, email, designation} = req.body;
  const currentuser = { 
    qrCode:"https://upload.wikimedia.org/wikipedia/commons/4/41/QR_Code_Example.svg", 
    avatarImg: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50", 
    name, 
    email,
    designation
   }
   allUsersData.unshift(currentuser) 
   res.send({status:"success", data: { currentuser,allUsers:allUsersData }
  })
})

app.get('/api/getAllUsers', (req, res) => {

  res.send({status:"success", data: {allUsers:allUsersData}})
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})