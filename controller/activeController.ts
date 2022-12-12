// const fetch = require('node-fetch')
import React from 'react'
const axios = require('axios').default
const { getTagId } = require('./tags')

const headers = {
  'Api-Token': `c58479894c10e112481efe9e1deb776a470a1d92525c8cc2ec7c863dd5abe6b8a279995d`,
  'Content-Type': 'application/json'
}

const url = 'contact/sync'
const base_url = 'https://proenem50713.api-us1.com/api/3'
const tag_url = 'contactTags'

exports.active = async (req: any, res: any) => {
  try {
    if (req.body.contactTag.tag) {
      const resp = await axios.post(
        `${base_url}/${url}`,
        JSON.stringify(req.body),
        {
          headers
        }
      )

      const id = resp.data.contact.id
      const tag = req.body.contactTag.tag

      if (!tag) {
        throw new Error('Tag não cadastrada')
      }

      const contact_id = await getTagId(tag)

      const contactTag = {
        contactTag: {
          contact: id,
          tag: contact_id.toString()
        }
      }

      await axios.post(`${base_url}/${tag_url}`, JSON.stringify(contactTag), {
        headers
      })

      res.send({ ...resp.data })
    } else {
      throw new Error('Tags não foram encontrados')
    }
  } catch (err: any) {
    res.send({ ...err })
  }
}
