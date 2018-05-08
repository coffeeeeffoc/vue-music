import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function GetSinger() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    platform: 'yqq',
    uin: 0,
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
export function GetSingerData(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 100,
    begin: 0,
    uin: 1278699477,
    singerid: singerId
  })
  return jsonp(url, data, options)
}
