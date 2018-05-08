import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// import axios from 'axios'
// var qs = require('qs')
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    _: 1524672882498
  })
  return jsonp(url, data, options)
}
export function getDiscList() {
  const url = '/api/getDisc'
  const data = Object.assign({}, commonParams, {
    // picmid: 1,
    rnd: Math.random(),
    // g_tk: 1042976578,
    // jsonpCallback: 'getPlaylist',
    // loginUin: 1521152077,
    hostUin: 0,
    format: 'json',
    // inCharset: 'utf-8',
    // outCharset: 'utf-8',
    // notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(function(e) {
    console.log(e)
  })
}
export function getDiscSongList(disstid) {
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const url = '/api/getDiscSongList'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    format: 'json',
    disstid,
    needNewCode: 0,
    hostUin: 0
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
