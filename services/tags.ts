import React from 'react'
const axios = require('axios')

const params = {
  api_action: 'tags_list',
  api_key:
    'c58479894c10e112481efe9e1deb776a470a1d92525c8cc2ec7c863dd5abe6b8a279995d',
  api_output: 'json'
}

const url = 'https://proenem50713.api-us1.com/admin/api.php'

const getTagId = async (name: any) => {
  try {
    const resp = await axios.get(url, {
      params
    })
    const id = resp.data.find((ob: { name: any }) => ob.name === name).id
    return id
  } catch (error) {
    console.warn(error)
    return null
  }
}

module.exports = {
  getTagId
}
