import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// import axios from 'axios'

export function getRank() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    // format: 'json',
    uin: 0,
    needNewCode: 1,
    g_tk: 5381
  })
  return jsonp(url, data, options)
}
export function getTopSongs(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    // format: 'json',
    uin: 0,
    needNewCode: 1,
    g_tk: 5381,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid
  })
  return jsonp(url, data, options)
}
