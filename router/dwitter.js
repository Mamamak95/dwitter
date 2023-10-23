import express from "express";
import ejs from "ejs";

const router = express.Router();
let dwitterList = [
  {
    pid: 100,
    id: "james",
    name: "제임스",
    date: "2023.10.5",
    content: "안녕하세요~",
    imgUrl:
      "https://www.shutterstock.com/image-vector/man-icon-vector-250nw-1040084344.jpg",
  },
  {
    pid: 101,
    id: "hong",
    name: "홍길동",
    date: "2023.10.4",
    content: "홍홍홍",
    imgUrl:
      "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/DCTM_Penguin_UK_DK_AL526630_wkmzns.jpg",
  },
];

router
  .use(express.json())
  .use(express.urlencoded())
  .get("/", (req, res, next) => {
    ejs.renderFile("./template/index.ejs", { dwitterList }).then((data) => {
      res.end(data);
    });
    
  })
  .post("/", (req, res, next) => {
    const { id, name, content,imgUrl } = req.body;
    //pid 할당 및 중복체크
    let pid
    while (true) {
      pid = Math.trunc(Math.random() * 1000);
      if(dwitterList.findIndex((el) => el.pid == pid)==-1) break
    }

    let date = new Date(Date.now());
    date = date.toLocaleDateString();
    let newData = { id, name, content, pid, date,imgUrl };
    dwitterList.push(newData);
    res.redirect("/dwitter");
  })
  .get("/:id", (req, res, next) => {
    let id=req.params.id
    let list=dwitterList.filter(user=>user.id===id)
    ejs.renderFile("./template/index.ejs",{dwitterList:list}).then(data=>{
      res.end(data)
    })
  })
  .put("/", (req, res, next) => {
    const {content,pid}=req.body
    dwitterList.filter(user=>{
      if(user.pid===parseInt(pid)) user.content=content
    })
    res.status(204).send('update success')//then()으로 넘어감
  })
  .delete("/", (req, res, next) => {
    const {pid}=req.body
    // let ind=dwitterList.findIndex(el=>el.pid==pid)
    // dwitterList.splice(ind,1)
    dwitterList=dwitterList.filter(user=>user.pid!==parseInt(pid))
    res.status(204).send('delete success')
    
  });

export default router;
