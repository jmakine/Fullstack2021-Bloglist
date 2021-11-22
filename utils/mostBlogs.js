const groupByOcc = (blogs) => {
    let groupedArr = [];
      
    blogs.forEach((blog)=>{
         
        if(groupedArr.some((val)=>{ return val["author"] == blog["author"] })) {
           
        groupedArr.forEach((object)=>{
           if(object["author"] === blog["author"]){ 
             object["blogs"]++
           }
        })
           
       } else {
         let a = {}
         a["author"] = blog["author"]
         a["blogs"] = 1
         groupedArr.push(a);
       }
    })
    return groupedArr    
  }

const mostBlogs = (blogsArr) => {
    const groupedBlogs = groupByOcc(blogsArr)
    const maxBlogs = Math.max(...groupedBlogs.map(item => item.blogs), 0)
    return groupedBlogs.filter(item => item.blogs === maxBlogs)
}

module.exports = {
   mostBlogs
}