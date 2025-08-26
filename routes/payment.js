const express = require("express");
const router = express.Router();
const { verifyPayment } = require("../controllers/payment");

/*
    ?billplz[id]=8cba2024b6076939&billplz[paid]=true&billplz[paid_at]=2025-08-26+11%3A19%3A41+%2B0800&billplz[x_signature]=e5a75457a5688b4d27c067a533d0c15092e18563fc655a2ac80444bde64af8e7
*/

router.post("/", async (req, res) => {
  try {
    const billplz_id = req.body.billplz_id;
    const billplz_paid = req.body.billplz_paid;
    const billplz_paid_at = req.body.billplz_paid_at;
    const billplz_x_signature = req.body.billplz_x_signature;

    const updatedOrder = await verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: "Unable to verify payment",
    });
  }
});

module.exports = router;
