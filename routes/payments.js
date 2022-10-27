const express = require("express");
const { networkInterfaces } = require("os");
const router = express.Router();
const db = require("../db");

router.get("/", async function(req, res, next) {
  try {
    const results = await db.query("SELECT * FROM payment");
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const result = await db.query(
      "INSERT into payment (sender, payment_id,chain_id,initiated_at,status,created_by,payment_type,completed_at,transaction_hash,task_id,currency,amount,dao,receiver,updated_at,created_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'"+Date().toString()+"','"+Date().toString()+"') RETURNING *",
      [req.body.name, req.body.type]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const result = await db.query(
      "UPDATE payment SET Sender=($1), Payment_id=($2), Chain_id=($3),Initiated_at=($4),Status=($5),Created_by=($6),Payment_type=($7),Updated_at=($8),Created_at=($9),Completed_at=($10),Transaction_hash=($11),Task_id=($12),Currency=($13),Amount=($14),Dao=($15),Receiver=($16) WHERE id=($17) RETURNING *",
      [req.body.name, req.body.type, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const result = await db.query("DELETE FROM payment WHERE id=$1", [
      req.params.id
    ]);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;