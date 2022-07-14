"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(
  "sk_test_51LLNeRIPYDgU4wsGyR6YqpZ99umaLGKsKkLXpH1NJI6IZGzwrIEOoBZVE4XNfcWLXDsLH653gkc4wNb6nd1xE5Tx00QtZHFCOC"
);

module.exports = {
  //注文を作成する
  create: async (context) => {
    const { address, amount, dishes, token } = JSON.parse(context.request.body);

    const charge = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      source: token,
      description: `Order ${new Data()} by ${context.state.user_id}`,
    });

    const order = await strapi.services.order.create({
      user: context.state.user._id,
      charge_id: charge.id,
      amount: amount,
      address,
      dishes,
    });

    return order;
  },
};
