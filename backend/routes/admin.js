const express = require('express')

const router = express.Router();
const {login,register} = require('../controller/admin');
const { AddBlog } = require('../model/blogschema');
const { Product } = require('../model/product');

const { Admin } = require('../model/admin');
const { Order } = require('../model/order');
const { User } = require('../model/user');
router.post("/adminlogin",login)
router.post("/adminRegister",register)

router.post("/addadmin",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const result=await Admin.create({
      email:email,
      password:password,
    })
    res.status(200).json({
      Mss:"Admin Created Successfully",
    })
})
router.get("/demo", async(req,res)=>{

  const getdata=await Admin.find({});
  res.json({
    getdata
  })
  
})
router.post("/newblogs", async (req,res)=>{
  const title=req.body.title
  const description=req.body.description
  const img=req.body.image
   
  const result= await AddBlog.create({
        title:title,
        description:description,
        image:img
  })
  res.status(200).json({
    result:result
  })
})
//const upload = multer({ storage });
/*router.post('/addblog', upload.single('image'), async (req, res) => {
  try {
      const newblog = new AddBlog({
          title: req.body.title,
          description:req.body.description,
          image: {
              data: fs.readFileSync(path.join('./backend' + req.file.filename)),
              contentType: 'image/png', // Adjust this based on the uploaded file type
          },
      });
      await newblog.save();
      res.json({ message: 'Image uploaded successfully!' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
*/
router.get("/getblog", async (req,res)=>{
  const totalblog= await AddBlog.find({})

    
  res.json({
    totalblog
  })
})
router.post("/addpro",async (req,res)=>{
  const {name,desc,price,photo} = req.body
  const added= await Product.create({
    name,desc,price,photo
  })

  res.status(200).json({
    New:added
  })
  res.status(400);
})

router.get("/orders",async(req,res)=>{
  const ord=await Order.find({})

  res.json({
    ord
  })
})

router.get('/totalorder',async(req,res)=>{
 
  const totalorder= await Order.countDocuments({})

    
res.json({
  totalorder
})
   
   
})

router.get("/users",async(req,res)=>{
  const totaluser= await User.countDocuments({})

    
  res.json({
    totaluser
  })
})

router.get("/admins",async(req,res)=>{
  const ord=await Admin.find({})

  res.json({
    ord
  })
})

module.exports  = router