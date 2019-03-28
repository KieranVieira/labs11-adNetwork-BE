require("dotenv").config();
const route = require("express").Router();
const models = require("../../common/helpers");
const pubKey = process.env.PUBLIC_KEY;
const stripe = require("stripe")(process.env.SECRET_KEY);
const { authenticate } = require("../../common/authentication");
<<<<<<< HEAD


// @route    /api/checkout
// @desc     GET checkout
// @Access   Public
=======
>>>>>>> 44f41ef4a73f02da6c8baf92ffb4cfb502434c2f
route.get("/", (req, res) => {
  res.render("index.pug", { pubKey });
});

<<<<<<< HEAD
// @route    /api/checkout/create_customer
// @desc     Post Cosumter/create
// @Access   Private
=======
>>>>>>> 44f41ef4a73f02da6c8baf92ffb4cfb502434c2f
route.post("/create_customer", authenticate, async (req, res) => {
  // Create a one time use token from User Payment Info entered on front end
  try {
    const customer = await stripe.customers.create({
      account_balance: req.body.amount || 0,
      coupon: req.body.coupon || null,
      email: req.body.stripeEmail || req.decoded.email,
      description:
        req.body.description ||
        `Stripe Account for ${req.body.stripeEmail || req.decoded.email}`,
      source: req.body.stripeToken || "tok_visa"
    });

    if (customer.id) {
      const success = await models.updateStripe(
        "users",
        { email: customer.email, id: req.decoded.id },
        { stripe_cust_id: customer.id }
      );
      res
        .status(201)
        .json({ message: "Customer created successfully", customer });
    } else {
      res
        .status(500)
        .json({ message: "There was an issue creating the customer." });
    }
  } catch ({ message }) {
    res.status(404).json({ message });
  }
});

<<<<<<< HEAD
// @route    /api/checkout/charge_customer
// @desc     POST charge customer
// @Access   Private
=======
>>>>>>> 44f41ef4a73f02da6c8baf92ffb4cfb502434c2f
route.post("/charge_customer", authenticate, async (req, res) => {
  const _customer = await models.findBy("users", { id: req.decoded.id });

  try {
    const charge = await stripe.charges.create({
      amount: Math.floor(Math.abs(_customer.amount) * 100) || 0,
      currency: "usd",
      customer: _customer.stripe_cust_id,
      receipt_email: _customer.email,
      description: "Your payment receipt from the LAD Network"
    });

    await models.update("users", req.decoded.id, {
      amount: 0
    });
    res.status(200).json(charge);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

route.post("/payout", authenticate, async (req, res) => {
  const _customer = await models.findBy("users", { id: req.decoded.id });

  try {
    await stripe.payouts.create(
      {
        amount: Math.floor(_customer.amount * 100) || 0,
        currency: "usd"
      },
      async (err, payout) => {
        if (err) return res.status(500).json({ message: err });

        const success = await models.update("users", req.decoded.id, {
          amount: 0
        });

        res.json(payout);
      }
    );
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

route.get("/payout", authenticate, async (req, res) => {
  const _customer = await models.findBy("users", { id: req.decoded.id });

  try {
    await stripe.payouts.list(
      {
        limit: 10
      },
      (err, payouts) => {
        if (err) return res.status(500).json({ message: err });

        res.json({ _customer, payouts });
      }
    );
  } catch ({ message }) {}
});

route.get("/payments", authenticate, async (req, res) => {
  const _customer = await models.findBy("users", { id: req.decoded.id });

  try {
    await stripe.charges.list(
      {
        limit: 10
      },
      (err, charges) => {
        if (err) return res.status(500).json({ message: err });
        const chargesHolder = [];
        charges.data.map(charge => {
          if (charge.customer === _customer.stripe_cust_id) {
            chargesHolder.push(charge);
          }
        });
        res.json(chargesHolder);
      }
    );
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
//Stripe apparently handles source updating for bank cards on their own so we'll leave that lone
module.exports = route;
<<<<<<< HEAD


=======
>>>>>>> 44f41ef4a73f02da6c8baf92ffb4cfb502434c2f
