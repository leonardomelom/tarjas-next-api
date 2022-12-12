import { NextApiRequest, NextApiResponse } from 'next'
const { active } = require('../../../controller/activeController')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'POST') {
    return res.status(200).json(active)
  }
}
