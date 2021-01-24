import axios from 'axios'
import config from '../config.json'
import { HeroResult, StoryResult } from '../types'
const md5 = require('md5')

const ts = Date.now(),
      hash = md5(ts + config.privateKey + config.publicKey)

const instance = axios.create({
  params: {
    ts,
    apikey: config.publicKey,
    hash
  }
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async getHero(path: string): Promise<HeroResult> {
    const { data } = await instance.get(path, {})
    return data
  },

  async getStory(path: string, offset: number = 0): Promise<StoryResult> {
    const { data } = await instance.get(path, {
      params: {
        offset,
        limit: 1
      }
    })
    return data
  }
}
