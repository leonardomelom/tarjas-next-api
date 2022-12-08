import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs/promises')
const path = require('path')
const process = require('process')

function SendData(request: any) {
  // console.log(`{Dados: ${JSON.stringify(request.body)}}`)
  const data = {
    contact: {
      firstName: request.body.firstName,
      email: request.body.email
    },
    contactTag: {
      tag: request.body.tag
    }
  }

  var https = require('follow-redirects').https

  var options = {
    method: 'POST',
    hostname: 'pure-retreat-83785.herokuapp.com',
    path: '/',
    headers: {
      'Content-Type': 'application/json'
    },
    maxRedirects: 20
  }

  var req = https.request(options, function (res: any) {
    var chunks = <any[]>[]

    res.on('data', function (chunk: any) {
      chunks.push(chunk)
    })

    res.on('end', function (chunk: any) {
      var body = Buffer.concat(chunks)
      console.log(`Body: ${body.toString()}`)
    })

    res.on('error', function (error: any) {
      console.error(error)
    })
  })

  var postData = JSON.stringify({
    ...data
  })
  console.log(data)
  req.write(postData)

  req.end()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'GET') {
    try {
      const payload = await fs
        .readFile(path.join(process.cwd(), 'active.json'), 'utf8')
        .then(JSON.parse)

      res.status(200).json(payload)
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else if (method === 'PUT') {
    try {
      await fs.writeFile(
        path.join(process.cwd(), `active.json`),
        JSON.stringify(req.body),

        await SendData(req)
      )
      res.status(200).json({ message: 'Dados modificados com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  return res.status(404).json({ message: 'Route note found.' })
}
