import {commonParams} from './config'
import axios from 'axios'
// import jsonp from 'common/js/jsonp'

export function getLyric(mid) {
  const url = '/api/getLyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    pcachetime: +new Date(),
    hostUin: 0,
    g_tk: 1567445276,
    format: 'jsonp',
    needNewCode: 0,
    notice: 0
  })
  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(function (e) {
    console.log(e)
  })
}
