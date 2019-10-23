module.exports = {
    entry:{
        editAddress: './src/pages/editAddress/index.js',
    },
    html:{
        editAddress:{
            filename:"index",
            chunks: ['editAddress']
        },
    },
    cache:{}
}
