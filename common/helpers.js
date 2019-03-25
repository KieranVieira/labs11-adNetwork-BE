const db = require("../data/dbConfig");

const get = tbl => db(tbl);

const findBy = (tbl, filter) =>
  db(tbl)
    .where(filter)
    .first()

const findAllBy = (tbl, filter) => db(tbl).where(filter);

const add = (tbl, item) =>
  db(tbl)
    .insert(item)
    .returning("id");

const remove = (tbl, id) =>
  db(tbl)
    .where({ id })
    .del();

const update = (tbl, id, item) =>
  db(tbl)
    .where({ id })
    .update(item);

const queryByDate = (tbl, started_at, ended_at) =>
  db(tbl)
    .where("created_at", ">=", started_at)
    .where("created_at", "<", ended_at);

module.exports = {
  get,
  findBy,
  add,
  remove,
  update,
  findAllBy,
  queryByDate
};
