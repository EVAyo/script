/*
京东种豆得豆互助码
此文件为Node.js专用。其他用户请忽略
支持京东N个账号
 */
//云服务器腾讯云函数等NOde.js用户在此处填写东东萌宠的好友码。
// 同一个京东账号的好友互助码用@符号隔开,不同京东账号之间用&符号或者换行隔开,下面给一个示例
// 如: 京东账号1的shareCode1@京东账号1的shareCode2&京东账号2的shareCode1@京东账号2的shareCode2
let PlantBeanShareCodes = [
'e7lhibzb3zek27a3vs4gqnlwgiwyubtcs2gcgfi@4npkonnsy7xi264hluoozsxocc4ytb2vf5f3b6q@mlrdw3aw26j3xz7w7vhqyzek4ypr2bxapckxsei@mlrdw3aw26j3xdbouwouuq5ltmmtdop76we6o7a@gou7sxm3hztwowqyjfxuoaukfk6pf5mlx7ror3y@c7wo4bwoto5dztn3rcyx3a6lde3h7wlwy7o5jii@olmijoxgmjutyi4b6q457uow45o3yczokzetxfa',
'lgidv7mol7kfp4brokv75ytttjfkdmtwo6cf4gq@4npkonnsy7xi264hluoozsxocc4ytb2vf5f3b6q@mlrdw3aw26j3xz7w7vhqyzek4ypr2bxapckxsei@mlrdw3aw26j3xdbouwouuq5ltmmtdop76we6o7a@gou7sxm3hztwowqyjfxuoaukfk6pf5mlx7ror3y@c7wo4bwoto5dztn3rcyx3a6lde3h7wlwy7o5jii@olmijoxgmjutyi4b6q457uow45o3yczokzetxfa',
'lgidv7mol7kfp4brokv75ytttjfkdmtwo6cf4gq@e7lhibzb3zek27a3vs4gqnlwgiwyubtcs2gcgfi@mlrdw3aw26j3xz7w7vhqyzek4ypr2bxapckxsei@mlrdw3aw26j3xdbouwouuq5ltmmtdop76we6o7a@gou7sxm3hztwowqyjfxuoaukfk6pf5mlx7ror3y@c7wo4bwoto5dztn3rcyx3a6lde3h7wlwy7o5jii@olmijoxgmjutyi4b6q457uow45o3yczokzetxfa',
'lgidv7mol7kfp4brokv75ytttjfkdmtwo6cf4gq@e7lhibzb3zek27a3vs4gqnlwgiwyubtcs2gcgfi@4npkonnsy7xi264hluoozsxocc4ytb2vf5f3b6q@mlrdw3aw26j3xdbouwouuq5ltmmtdop76we6o7a@gou7sxm3hztwowqyjfxuoaukfk6pf5mlx7ror3y@c7wo4bwoto5dztn3rcyx3a6lde3h7wlwy7o5jii@olmijoxgmjutyi4b6q457uow45o3yczokzetxfa',
'lgidv7mol7kfp4brokv75ytttjfkdmtwo6cf4gq@e7lhibzb3zek27a3vs4gqnlwgiwyubtcs2gcgfi@4npkonnsy7xi264hluoozsxocc4ytb2vf5f3b6q@mlrdw3aw26j3xz7w7vhqyzek4ypr2bxapckxsei@gou7sxm3hztwowqyjfxuoaukfk6pf5mlx7ror3y@c7wo4bwoto5dztn3rcyx3a6lde3h7wlwy7o5jii@olmijoxgmjutyi4b6q457uow45o3yczokzetxfa',
'lgidv7mol7kfp4brokv75ytttjfkdmtwo6cf4gq@e7lhibzb3zek27a3vs4gqnlwgiwyubtcs2gcgfi@4npkonnsy7xi264hluoozsxocc4ytb2vf5f3b6q@mlrdw3aw26j3xz7w7vhqyzek4ypr2bxapckxsei@mlrdw3aw26j3xdbouwouuq5ltmmtdop76we6o7a@c7wo4bwoto5dztn3rcyx3a6lde3h7wlwy7o5jii@olmijoxgmjutyi4b6q457uow45o3yczokzetxfa',
'lgidv7mol7kfp4brokv75ytttjfkdmtwo6cf4gq@e7lhibzb3zek27a3vs4gqnlwgiwyubtcs2gcgfi@4npkonnsy7xi264hluoozsxocc4ytb2vf5f3b6q@mlrdw3aw26j3xz7w7vhqyzek4ypr2bxapckxsei@mlrdw3aw26j3xdbouwouuq5ltmmtdop76we6o7a@gou7sxm3hztwowqyjfxuoaukfk6pf5mlx7ror3y@olmijoxgmjutyi4b6q457uow45o3yczokzetxfa',
'lgidv7mol7kfp4brokv75ytttjfkdmtwo6cf4gq@e7lhibzb3zek27a3vs4gqnlwgiwyubtcs2gcgfi@4npkonnsy7xi264hluoozsxocc4ytb2vf5f3b6q@mlrdw3aw26j3xz7w7vhqyzek4ypr2bxapckxsei@mlrdw3aw26j3xdbouwouuq5ltmmtdop76we6o7a@gou7sxm3hztwowqyjfxuoaukfk6pf5mlx7ror3y@c7wo4bwoto5dztn3rcyx3a6lde3h7wlwy7o5jii'

]
// 从日志获取互助码
const logShareCodes = require('./utils/jdShareCodes');
if (logShareCodes.PLANT_BEAN_SHARECODES.length > 0 && !process.env.PLANT_BEAN_SHARECODES) {
  process.env.PLANT_BEAN_SHARECODES = logShareCodes.PLANT_BEAN_SHARECODES.join('&');
}

// 判断github action里面是否有种豆得豆互助码
if (process.env.PLANT_BEAN_SHARECODES) {
  if (process.env.PLANT_BEAN_SHARECODES.indexOf('&') > -1) {
    console.log(`您的种豆互助码选择的是用&隔开\n`)
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split('&');
  } else if (process.env.PLANT_BEAN_SHARECODES.indexOf('\n') > -1) {
    console.log(`您的种豆互助码选择的是用换行隔开\n`)
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split('\n');
  } else {
    PlantBeanShareCodes = process.env.PLANT_BEAN_SHARECODES.split();
  }
} else {
  console.log(`由于您环境变量(PLANT_BEAN_SHARECODES)里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < PlantBeanShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['PlantBeanShareCodes' + index] = PlantBeanShareCodes[i];
}
