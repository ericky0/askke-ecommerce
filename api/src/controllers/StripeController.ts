import { Request, Response } from 'express'
import Stripe from 'stripe'

const secret = process.env.STRIPE_KEY
const stripe = new Stripe(secret, {
  apiVersion: '2020-08-27'
})

class StripeController {
  async payment(req: Request, res: Response) {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
      },
      //@ts-ignore
      (stripeErr: Error, stripeRes: Response) => {
        if (stripeErr) {
          res.status(500).json(stripeErr)
        } else {
          res.status(200).json(stripeRes)
        }
      }
    )
  }
}

export { StripeController }
