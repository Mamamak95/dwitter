import express from "express";
import * as dwitterController from '../controller/dwitterController.js'


/* import ejs from "ejs";
import dbConfig from "../db/database.js";

const conn = dbConfig.init();
dbConfig.connect(conn);*/
const router = express.Router(); 
/* let dwitterList = [
  {
    pid: 100,
    id: "james",
    name: "제임스",
    date: "2023.10.5",
    content: "안녕하세요~",
    
  },
  {
    pid: 101,
    id: "hong",
    name: "홍길동",
    date: "2023.10.4",
    content: "홍홍홍",
  
      
  },
]; */
let dwitterList = [];
router
  .use(express.json())
  .use(express.urlencoded())
  .get("/", dwitterController.getAll)
  .post("/", dwitterController.create)
  .get("/:id", dwitterController.getDwitter)
  .put("/", dwitterController.update)
  .delete("/", dwitterController.remove);

export default router;
