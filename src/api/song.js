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
    format: 'json',
    needNewCode: 0,
    notice: 0
  })
  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log('api/song--res')
    console.log(res)
    var ret = res.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    return Promise.resolve(ret)
  }).catch(function (e) {
    console.log(e)
  })
}
