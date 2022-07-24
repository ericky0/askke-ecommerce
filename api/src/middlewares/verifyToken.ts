import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // check header or url parameters or post parameters for token
  var authHeader = req.body.token || req.query.token || req.headers.token

  // decode token
  if (authHeader) {
    const token = authHeader.split(' ')[1].toString()
    console.log(token)
    // verifies secret and checks exp
    jwt.verify(token, 'erick', (err: Error, user: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      } else {
        // if everything is good, save to request for use in other routes
        req.user = user
        next()
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    })
  }
}

const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json('you are not allowed to do that')
    }
  })
}

export { verifyToken, verifyTokenAndAuthorization }
