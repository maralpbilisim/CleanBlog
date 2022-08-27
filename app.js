const { request } = require('express');
const exprees = require('express');

const app = exprees();

app.get('/',(req,res)=>{
    const blog = { 
        id: 1, 
        title: "Blog title", 
        description: "Blog description" 
    }
  res.send(blog)
})

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port}unda başlatıldı`);
});