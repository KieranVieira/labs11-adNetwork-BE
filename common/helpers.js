const db = require("../data/dbConfig");

const get = tbl => db(tbl);

const findBy = (tbl, filter) =>
  db(tbl)
    .where(filter)
    .first();

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

const analyticsWithPricing = id =>
  db("agreements as ag")
    .join("analytics as an", "an.agreement_id", "ag.id")
    .join("offers as o", "o.id", "ag.offer_id")
    .where("ag.affiliate_id", id)
    .select("an.*", "o.price_per_click", "o.price_per_impression");

const actionCountAffiliate = (id, filter) =>
  db
    .select("an.*", "o.price_per_click", "o.price_per_impression")
    .from("analytics as an")
    .join("agreements as ag", "ag.affiliate_id", id)
    .join("offers as o", "ag.offer_id", "o.id")
    .where("action", filter);

const analyticsWithPricingAdvertiser = id =>
  db
    .select("an.*", "o.price_per_click", "o.price_per_impression")
    .from("analytics as an")
    .join("agreements as ag", "ag.id", "an.agreement_id")
    .join("offers as o", "ag.offer_id", "o.id")
    .where("user_id", id);

const getAdvertiserEmail = id =>
  db
    .select("u.*")
    .from("agreements as ag")
    .join("offers as o", "o.id", id)
    .join("users as u", "o.user_id", "u.id");

const actionCount = (filter, id) =>
  db
    .select()
    .from("analytics as an")
    .join("agreements as ag", "ag.id", "an.agreement_id")
    .join("offers as o", "ag.offer_id", "o.id")
    .where("user_id", id)
    .andWhere("action", filter);

const browserCountAdvertisers = (filter, id) =>
  db
    .select()
    .from("analytics as an")
    .join("agreements as ag", "ag.id", "an.agreement_id")
    .join("offers as o", "ag.offer_id", "o.id")
    .where("user_id", id)
    .andWhere("browser", filter);

const browserCountAffiliates = (filter, id) =>
  db
    .select()
    .from("analytics as an")
    .join("agreements as ag", "ag.id", "an.agreement_id")
    .join("offers as o", "ag.affiliate_id", id)
    // .where("user_id", id)
    .where("browser", filter);
module.exports = {
  get,
  findBy,
  add,
  remove,
  update,
  findAllBy,
  queryByDate,
  analyticsWithPricing,
  analyticsWithPricingAdvertiser,
  getAdvertiserEmail,
  actionCount,
  actionCountAffiliate,
  browserCountAdvertisers,
  browserCountAffiliates
};
