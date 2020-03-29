/**
* hexo-tag-book-douban
* https://github.com/MakerGYT/hexo-tag-book-douban
* Copyright (c) 2020, MakerGYT
* Licensed under the MIT license.
* Syntax:
* {% dbook [id] %}
*/

const axios = require('axios');

const getBook = async (id) => {
  let fields = 'id,title,alt,image,publisher,pubdate,author,translator,price,rating,summary,isbn13';
  return  await axios(
    {
      url: `https://douban.uieee.com/v2/book/${id}?fields=${fields}`,
      method: 'get',
    });
}

hexo.extend.tag.register('dbook', (args) => {
  let tpl;
  
  return getBook(args[0]).then((res) => {

    if (200 === res.status) {
      let { title,alt,image,publisher,pubdate,author,translator,price,rating,summary,isbn13 } = res.data;
      tpl = [
        '<a title="'+ summary +'" href="' + alt + '" target="_blank" style="color: #666;display:block;">',
          '<img src="' + image + '" alt="' + title + '" style="width: 135px; height: 192px; display:inline-block; margin-right: 14px;"  referrerpolicy="no-referrer" />',
          '<div class="info" style="display:inline-block; vertical-align: top;">',
            '<p style="margin:0; font-size: 16px; font-weight: bold;">' + title + '</p>',
            '<p style="margin:0; font-size: 14px;">作者：' + author.join(',') + '</p>',
            '<p style="margin:0; font-size: 14px;">出版社：' + publisher + '</p>',
            '<p style="margin:0; font-size: 14px;">出版日期：' + pubdate + '</p>',
            translator.length ? '<p style="margin:0; font-size: 14px;">译者：' + translator.join(',') + '</p>' : '',
            '<p style="margin:0; font-size: 14px;">定价：' + price + ' 评分：' + rating.average + '</p>',
            '<p style="margin:0; font-size: 14px;">ISBN：' + isbn13 + '</p>',
          '</div>',
        '</a>'
      ].join('');
    } else {
      tpl = JSON.stringify(res);
    }
    return '<div class="hexo-tag-book-douban" style="position:relative;width:60%;border-radius: 4px;box-shadow: 0 0 10px #ccc;margin:10px auto;padding: 10px;">'
      + tpl
      + '<a href="https://github.com/makergyt/hexo-tag-book-douban" title="hexo-tag-book-douban" target="_blank" style="display:block;width:24px;height:24px;position: absolute; bottom:10px;right: 39px;"><img src="https://github.com/fluidicon.png" alt="" style="display:block;width:24px;height:24px;" /></a>'
      + '</div>';
  }).catch((err)=> {
    console.error(err)
    if(404 === err.response.status) {
      tpl = err.response.data.msg;
    } else {
      tpl = 'Interface call failed, possibly due to current restriction'
    }
    return '<div class="hexo-tag-book-douban" style="position:relative;width:60%;border: 1px solid red;border-radius: 4px;box-shadow: 0 0 10px #ccc;margin:10px auto;padding: 10px;">'
      + tpl
      + '<a href="https://github.com/makergyt/hexo-tag-book-douban" title="hexo-tag-book-douban" target="_blank" style="display:block;width:24px;height:24px;position: absolute; bottom:10px;right: 39px;"><img src="https://github.com/fluidicon.png" alt="" style="display:block;width:24px;height:24px;" /></a>'
      + '</div>';
  });
}, { async: true });