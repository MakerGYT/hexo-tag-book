/**
* hexo-tag-book-douban
* https://github.com/MakerGYT/hexo-tag-book-douban
* Copyright (c) 2020, MakerGYT
* Licensed under the MIT license.
* Syntax:
* {% dbook [id] %}
*/

hexo.config.dbook = Object.assign({
  enable: true,
  proxy: 'https://douban.uieee.com',
  powered: true
}, hexo.config.dbook);
const dbookCfg = hexo.config.dbook;

const axios = require('axios');
const log = require('hexo-log')({ name: 'hexo-tag-book-douban'});

const getBook = async (isbn) => {
  let fields = 'id,title,alt,image,publisher,pubdate,author,translator,price,rating,summary,isbn13';
  return await axios.get(`${dbookCfg.proxy}/v2/book/isbn/${isbn}?fields=${fields}`);
}

const renderBook = async(ISBN, width) => {

  return getBook(ISBN).then(async(res) => {

    if (200 === res.status) {

      let ejs = require('ejs');
      let path = require('path');
      return await ejs.renderFile(path.join(__dirname, 'templates/dbook.ejs'), 
        { ...res.data, powered: dbookCfg.powered, width },{async: true});

    } else {
      log.info(`Unknown error, please issue ${res}`);
    }
  }).catch((err)=> {
    
    if(404 === err.response.status) {
      let {msg, request} = err.response.data;
      log.warn(`[hexo-tag-book-douban]=>${request}:${msg}`)
    } else if(400 === err.response.status){
      let {msg} = err.response.data;
      log.warn(`[hexo-tag-book-douban]=>${msg},Try again in an hour`)
    }
    return ;
  });
}

hexo.extend.tag.register('dbook', (args) => {
  if (!dbookCfg.enable) {
    log.info('dbook support is disabled, cannot resolve the dbook tags properly.');
    return ;
  }
  let ISBN = parseInt(args[0]);
  let width = args[1]? args[1]: '60%';
  return renderBook(ISBN, width).then((res) => {
    return res;
  });
}, { async: true });