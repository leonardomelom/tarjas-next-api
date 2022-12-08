import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs/promises')
const path = require('path')
const process = require('process')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'GET') {
    try {
      const payload = await fs
        .readFile(path.join(process.cwd(), 'proenem.json'), 'utf8')
        .then(JSON.parse)

      res.status(200).json(payload)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else if (method === 'PUT') {
    try {
      await fs.writeFile(
        path.join(process.cwd(), 'proenem.json'),
        JSON.stringify(req.body)
      )

      res.status(200).json({ message: 'Dados modificados com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  return res.status(404).json({ message: 'Route note found.' })
}
