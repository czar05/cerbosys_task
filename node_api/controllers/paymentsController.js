const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment");
const instance = new Razorpay({
  key_id: "rzp_test_nRtyPjgsqyDu7d",
  key_secret: "Dn8DxQ7akp6wcSyQCTY5uDBJ",
});
module.exports.checkout = async function (req, res) {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(500).json({ message: Error.message });
  }
};
module.exports.paymentVerification = async function (req, res) {
  try {
    console.log("payment verification");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "Dn8DxQ7akp6wcSyQCTY5uDBJ")
      .update(body.toString())
      .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      // Database comes here

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: Error.message });
  }
};
