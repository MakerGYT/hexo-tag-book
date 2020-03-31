# hexo-tag-book-douban
[![hexo-tag-book-douban](https://badgen.net/npm/v/hexo-tag-book-douban)](https://www.npmjs.com/package/hexo-tag-book-douban)
![](https://img.shields.io/badge/Generator-Hexo-0e83cd?&logo=hexo)
![license](https://badgen.net/github/license/makergyt/hexo-tag-book-douban)
![last-commit](https://badgen.net/github/last-commit/makergyt/hexo-tag-book-douban)

[![NPM](https://nodei.co/npm/hexo-tag-book-douban.png)](https://nodei.co/npm/hexo-tag-book-douban/)

A tag to display the information of Douban books in hexo post/page.

## Feature
- Rendering book information according to book ISBN
- Responsive design

## How to use
1. Install
```sh
npm i hexo-tag-book-douban --save
```
2. Import
```sh
# Hexo/source/_posts/xxx.md
{% dbook [ISBN] %}
```
The `{% dbook %}` options are shown below:
| Option| Default                  | Description                                                  |
| ----- | ------------------------ | ------------------------------------------------------------ |
| ISBN  | **required**             | New version of ISBN, consisting of 13 pure numbers without`-`|
| width | 40%                      | component width                                              |

3. (Optional) Config
The default config:
```yml
# Hexo/_config.yml
dbook:
  enable: true # Recommended to set it to false during `hexo server` and open during `hexo generate` to reduce requests.
  proxy: https://douban.uieee.com # Current limit that everyone shares : 10000 times / 1 hour
  powered: true  
```

## Sample:
[Demo](https://blog.makergyt.com/about/#%E6%9C%80%E8%BF%91%E5%9C%A8%E8%AF%BB)
```sh
{% dbook 4913064 40% %}
```
Screenshot:
![](https://imgkr.cn-bj.ufileos.com/342d1d01-aa88-4054-8ee6-37fccac84de5.png)

## Dependencies
- [axios](https://github.com/axios/axios) => GET book data
- [ejs](https://github.com/mde/ejs) => render template
- [Douban API Proxy](https://douban.uieee.com/) => A proxy service of Douban API

## Troubleshoot
1. Theme-next `_data/next.yml` config doesn't work
[Issue #1](https://github.com/MakerGYT/hexo-tag-book-douban/issues/1)

If there are other bugs, please feedback through [issues](https://github.com/MakerGYT/hexo-tag-book-douban/issues)
or connect: me@makergyt.com

## Todo
- [ ] Support other data sources to avoid official interface offline

## License
MIT License

## Reference
- [hexo-tag-douban](https://github.com/YuyingWu/hexo-tag-douban): Didn't work because official interface requires authorization.