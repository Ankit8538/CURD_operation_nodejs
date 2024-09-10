const express = require ('express');
const app = express();
let port=8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const path=require("path");
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let post=[
  {
    id:uuidv4(),
    username:"Ankit8538",
    content:"I love coding daer"
  },
  {
    id:uuidv4(),
    username:"Chhoti390",
    content:"I am study delhi university"
  },
  {
    id:uuidv4(),
    username:"Manish90",
    content:"My collage is best collage in the india"
  }
]
app.get('/posts', function (req, res) {
  res.render("index.ejs",{allinfo:post});
  
})


app.get("/posts/new",function(req,res)
{
     res.render("new_poat.ejs");
})


app.post("/posts",function(req,res)
{
   
  let {username,content}=req.body
   post.push({username,content,id:uuidv4()});

  res.redirect("/posts");
})


app.get("/posts/:id",(req,res)=>
{
  let {id}=req.params;
  console.log(req.params);
  let personaldata=post.find(function(pos)
{
    return pos.id==id
})
console.log(personaldata);
res.render("show.ejs",{personaldata});
})

app.patch("/posts/:id",(req,res)=>
{
  let {id}=req.params;
  let newcontent=req.body.content;
  let postacc=post.find(function(el)
     {
      return(el.id==id)
   })
   postacc.content=newcontent
  console.log(postacc);
  res.redirect("/posts")

})

app.get("/posts/:id/edit",(req,res)=>
{
  let {id}=req.params;

  let finddata=post.find((el)=>
  {
    return(el.id==id);
  })
  console.log(finddata);
  res.render("edit.ejs",{finddata});
})

app.delete("/posts/:id",(req,res)=>
{
  let {id}=req.params;
  post=post.filter((el)=>
  {
    return(el.id!==id)
  })
  
  res.redirect("/posts");
  
})

app.listen(port,function()
{
    console.log("open REST API sever");
})