module.exports = {
    lintOnSave: false, //禁止eslint-loader於編譯時檢查語法
    devServer: {
        proxy: {
        }
    },
    transpileDependencies: ['vuetify'],
    //publicPath: process.env.NODE_ENV === 'production' ? '/apimgr/' : '/',
}