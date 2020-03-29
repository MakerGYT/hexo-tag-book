# hexo-tag-book-douban
[![hexo-tag-book-douban](https://badgen.net/npm/v/hexo-tag-book-douban)](https://www.npmjs.com/package/hexo-tag-book-douban)
![](https://img.shields.io/badge/Generator-Hexo-0e83cd?&logo=hexo)
![license](https://badgen.net/github/license/makergyt/hexo-tag-book-douban)
![last-commit](https://badgen.net/github/last-commit/makergyt/hexo-tag-book-douban)

A tag to display the information of Douban books in hexo post/page.

## Feature
- Rendering book information according to book ID
  - id,
  - title
  - alt
  - image
  - publisher
  - pubdate
  - author
  - translator
  - price
  - rating
  - summary

## Dependencies
- [axios](https://github.com/axios/axios) => GET book data
- [Douban API Proxy](https://douban.uieee.com/) => A proxy service of Douban API

## Install
```sh
npm i hexo-tag-book-douban --save
# Hexo/source/_posts/xxx.md
{% dbook [id] %}
```
## Example:
[demo](http://localhost:4000/about/#%E6%9C%80%E8%BF%91%E5%9C%A8%E8%AF%BB)
```sh
{% dbook 4913064 %}
```
![]()
## Development
```sh
git clone https://github.com/MakerGYT/hexo-tag-book-douban.git
```
If secondary development, please fork.
## Bug
If there is a bug, please feedback through [issues](https://github.com/MakerGYT/hexo-tag-book-douban/issues)

## Connect
If you have any questions, please contact me at the following contact information.

- Email: me@makergyt.com

## Todo
- [ ] Support for custom styles and templates

## License
MIT License

## Reference
- [hexo-tag-douban](https://github.com/YuyingWu/hexo-tag-douban): Didn't work because official interface requires certification.