module.exports = function (content, map, meta) {
    console.log('my-loader3 异步loader');
    const callback = this.async();
    callback(null, content, map, meta);
    return;
}