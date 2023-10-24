/*
app --> Router --> Controller <-- DB연동 필요시 --> Repository
                        |
                        |
                    결과전송
*/
import * as dwitterRepository from '../repository/dwitterRepository.js'
import ejs from 'ejs';

/** getAll **/
export async function getAll(req, res){
  const rows=await dwitterRepository.getAll()
  
      ejs.renderFile("./template/index.ejs", { list: rows }).then((data) => {
        res.end(data);
     
  });
}

/** create **/
export async function create(req, res){
  const { id, name, content } = req.body;
  // 데이터 값은 아직이지만 자리는 확정되어있다는 뜻으로 ? 입력 (prepare statement)
  // 한개일때는 값, 두개이상일때는 순서에 맞춰 배열형식
  const result = await dwitterRepository.create(id,name,content);
  if(result=='success') res.redirect("/dwitter");
 
  
}

/** getDwitter */
export async function getDwitter(req, res){
  const id = req.params.id;
  const rows=await dwitterRepository.getDwitter(id)
      ejs.renderFile("./template/index.ejs", { list: rows }).then((data) => {
        res.end(data);
      })
}
/** update */
export async function update(req, res){
  const {id,content}=req.body;
  const result= await dwitterRepository.update(id,content)
  if(result=='success') res.status(204).send("update success"); //then()으로 넘어감
}

/** remove */
export async function remove(req, res){
  const {id}=req.body;
  const result= await dwitterRepository.remove(id)
  if(result=='success')   res.status(204).send("delete success");
  

}