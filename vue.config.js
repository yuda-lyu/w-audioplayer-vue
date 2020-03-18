module.exports = {
    lintOnSave: false, //禁止eslint-loader於編譯時檢查語法
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                pathRewrite: {
                    '^/api': '/api' 
                },
            },
            '/swdoc': {
                target: 'http://localhost:9000',
                pathRewrite: {
                    '^/swdoc': '/swdoc' 
                },
            },
        }
    },
    transpileDependencies: ['vuetify'],
    //publicPath: process.env.NODE_ENV === 'production' ? '/apimgr/' : '/',
}