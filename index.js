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
          '<img src="' + image + '" alt="' + title + '" style="width: 135px; display:inline-block; margin-right: 14px;"  referrerpolicy="no-referrer" />',
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
    return '<div class="hexo-tag-book-douban" style="position:relative;width:60%;border-radius: 4px;box-shadow: 3px 3px 10px #ccc;margin:10px auto;padding: 10px;">'
      + tpl
      + '<div ><a href="https://github.com/MakerGYT/hexo-tag-book-douban" style="width: 24px;height: 24px;position: absolute;right: 10px;bottom: 10px;"><svg t="1585487528993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1132" data-spm-anchor-id="a313x.7781069.0.i0" width="32" height="16"><path d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z" p-id="1133" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg></a></div>'
      + '</div>';
  }).catch((err)=> {
    
    if(404 === err.response.status) {
      console.error(err.response.data.msg);
      tpl = err.response.data.msg;
    } else {
      console.error(err.response);
      tpl = 'Interface call failed, possibly due to current restriction'
    }
    return '<div class="hexo-tag-book-douban" style="position:relative;width:60%;border: 1px solid red;border-radius: 4px;box-shadow: 3px 3px 10px #ccc;margin:10px auto;padding: 10px;">'
      + tpl
      + '<div ><a href="https://github.com/MakerGYT/hexo-tag-book-douban" style="width: 24px;height: 24px;position: absolute;right: 10px;bottom: 10px;"><svg t="1585487528993" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1132" data-spm-anchor-id="a313x.7781069.0.i0" width="32" height="16"><path d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z" p-id="1133" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg></a></div>'
      + '</div>';
  });
}, { async: true });