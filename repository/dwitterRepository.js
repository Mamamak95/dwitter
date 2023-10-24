import { db } from "../db/database.js";

export async function getAll() {
  return db
    .execute(
      "select id,name,left(date,10) as date,date as sort,content from dwitter order by sort"
    )
    .then((result) => result[0]);
}

export async function create(id, name, content) {
  return db
    .execute(
      "insert into dwitter(id,name,date,content) values(?,?,curdate(),?)",
      [id, name, content]
    )
    .then((result) => "success");
}

export async function getDwitter(id) {
  return db
    .execute(
      "select id,name,date as sort,left(date,10) as date,content from dwitter where id=?  order by sort",
      [id]
    )
    .then((result) => result[0]);
}

export async function update(id, content) {
  return db
    .execute("update dwitter set content=? where id=?", [content, id])
    .then((result) => "success");
}
export async function remove(id) {
  return db
    .execute("delete from dwitter where id=?", [id])
    .then((result) => "success");
}
