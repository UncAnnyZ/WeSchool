const fs = require('fs')
var inlineCss = require('inline-css');
const mineType = require('mime-types');
const path = require('path');

// base图片转64
var base64img = function (file) {
  let filePath = path.resolve(file);
  let data = fs.readFileSync(path.resolve(filePath));
  data = new Buffer(data).toString('base64');
  return 'data:' + mineType.lookup(filePath) + ';base64,' + data;
}

// 运行转译过程
function AstRead(html, css, js, otherCss, darkCss) {

  css = css ? css : '.page{}'
  html = html.replaceAll(`"`, `'`)
  let options = {
    url: "index.css"
  }
  html = `<style>${css}</style>${html}`
  html = html.replace(/input/g, `input1`)

  inlineCss(html, options).then(function (html) {
    html = html.replace(/<!--(.*?)-->/g, "")
    let htmlAst = parse(html)
    const change = (htmlAst, item = '', index = '') => {
      htmlAst.forEach(htmlNode => {
        Object.keys(htmlNode).forEach(eKey => {

          item = htmlNode[' wx:for-item'] || item || 'item'
          index = htmlNode[' wx:for-index'] || index || 'index'
          
          if (htmlNode[eKey]) {
            let tagRE = /{{.*?}}/g
            let inside = (htmlNode[eKey]).toString().match(tagRE)
            if (inside) {

              inside.forEach(e => {
                let a = e.match(/{{(.*?)}}/)
                if (a && a[1]) {
                  let k = a[1]

                  let p1 = ''
                  try {
                    JSON.parse(k)
                    p1 = JSON.stringify(k)
                  } catch (e) {
                    p1 = re(k, p1, [item, index], eKey, otherCss)

                  }
                  if (eKey === ' wx:for' || eKey === ' wx:elif'|| eKey === ' wx:if' || eKey === ' wx:else') {
                    htmlNode[eKey] = htmlNode[eKey].replaceAll(a[0], `${p1}`)
                  } else if (eKey === ' class') {

                    htmlNode[' style'] += ';' + htmlNode[eKey].replaceAll(a[0], `\${${p1}}`)


                    htmlNode[eKey] = htmlNode[eKey].replaceAll(a[0], ``)
                  } else {
                    htmlNode[eKey] = htmlNode[eKey].replaceAll(a[0], `\${${p1}}`)
                  }

                }
              })

            }
            if (eKey === ' class') {
              let a = ''
              for (let dd of darkCss) {
                if (htmlNode[eKey].match(Object.keys(dd)[0])) {
                  a = dd[Object.keys(dd)[0]]
                }
              }
              if (a) {
                htmlNode[' style'] += ';' + "${this.data.dark === 'dark' ? '" + a + "' : ''}"
              }
            } else if (eKey === ' src') {
              try {
                let src1

                if (htmlNode[eKey].match(/\.\.\//)) {
                  src1 = htmlNode[eKey].replace('../', './')
                } else {
                  src1 = htmlNode[eKey].replace('./', './src/')
                }
                let img01 = base64img(src1);
                img01 = img01.replace(/[\n]/g, "");
                img01 = img01.replace(/\s+/g, "");
                htmlNode[eKey] = img01
              } catch (e) {

              }

            }

          }


        })
        if (htmlNode.children.length > 0) {

          change(htmlNode.children, item, index)
        }

      })
    }
    change(htmlAst)
    let newHtml = ''
    // 转回html
    const nodeReturn = (htmlNode) => {
      noInKey = ['type', 'name', 'voidElement', 'text', 'children', ' wx:if', ' wx:for', ' wx:else', ' wx:elif']
      return Object.keys(htmlNode).map(eKey => {
        if (noInKey.includes(eKey)) {
          return ''
        } else {
          return `${eKey}="${htmlNode[eKey]}"`
        }
      })
    }
    const parsehtml = (htmlAst) => {
      html = ''
      htmlAst.forEach((htmlNode, index) => {
        let forBoolean = false
        let ifBoolean = false
        if (htmlNode[' wx:if']) {
          html = html + `\${${htmlNode[' wx:if']} ? \``
          ifBoolean = true
        } else if (htmlNode[' wx:elif']) {
          html = html + `${htmlNode[' wx:elif']} ? \``
          ifBoolean = true
        } else if (htmlNode[' wx:for']) {
          let item = htmlNode[' wx:for-item'] || 'item'
          let index = htmlNode[' wx:for-index'] || 'index'
          html = html + `\${${htmlNode[' wx:for']}.map((${item}, ${index}) =>  \``
          forBoolean = true
        }
        html = html + `<${htmlNode.type} ${nodeReturn(htmlNode).join("")}> ${htmlNode.text || ''} ${htmlNode.children.length > 0 ? parsehtml(htmlNode.children ) : ''} </${htmlNode.type}> `
        if (htmlAst[index + 1] && htmlAst[index + 1][' wx:elif']) {
          html = html + `\` : `
        } else if ((htmlAst[index + 1] && htmlAst[index + 1][' wx:else'])|| ifBoolean) {
          html = html + `\` : \`\`}`
        } else if (forBoolean) {
          html = html + `\`\)\}`
        }
      })
      return html
    }
    newHtml = parsehtml(htmlAst)
    newHtml = newHtml.replace(/input1/g, `input`)

    let str = ''
    str = `function runCode(){
    `
    str += js.toString()
    str = str.replace(/setData/g, "setdata");

    let onload = /onLoad:(.*)function(.*)\((.*?)\)(.*){/
    let onloadJS = str.match(onload)
    if (onloadJS) {
      str = str.replace(onloadJS[0], onloadJS[0] + 'options = this.options; this.data.dark =wx.getSystemInfoSync().theme; wx.onThemeChange(e => {console.log(e.theme);this.setdata({dark: e.theme})}); this.setdata();')
    }

    str = str.replace('Page({', `  
  
  var Page = function(page){
    return page
  }
return Page({
  ${onloadJS ? '': `
  onLoad: function (options) {
    options = this.options;
    this.setdata({})
  },
  `}
  parseTag(tag) {
    let res = {
        type1: "tag",
        name: "",
        voidElement: false,
        // attrs: {},
        children: [],
    };
    let tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
    if (tagMatch) {
        // 标签名称为正则匹配的第2项
        res.type1 = tagMatch[1];
        if (tag.charAt(tag.length - 2) === "/") {
            // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
            res.voidElement = true;
        }
    }
    // 匹配所有的标签正则
    let classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);
  
    if (classList) {
      let style = ''
        for (let i = 0; i < classList.length; i++) {
            // 去空格再以= 分隔字符串  得到['属性名称','属性值']
   
            let c = classList[i].split("=");
            // c[1] = c[1].replace(/\\s*/g, "")
            c[0] = c[0].replace(/\\s*/g, "")
            // 循环设置属性
            var lengthc = 2
            for(lengthc; lengthc < c.length ; lengthc++){
              c[1] += "=" + c[lengthc]
            }
            let p = c[1].substring(1, c[1].length - 1)
            try{
              p = JSON.parse(c[1].substring(1, c[1].length - 1))
            }catch(e){
             
            }
  
            if (c[1]) {
              if(c[0] === ' style'){
                style = p + style
                res[c[0]] = style
              }else{
                res[c[0]] = p
              }
      
            };
  
        }
    }
    return res;
  },
  
  parse(html) {
    var that = this;
    let result = [];
    let current;
    let level = -1;
    let arr = [];
    let tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
    html.replace(tagRE, function (tag, index) {
        // 判断第二个字符是不是'/'来判断是否open
        let isOpen = tag.charAt(1) !== "/";
        // 获取标签末尾的索引
        let start = index + tag.length;
        // 标签之前的文本信息
        let text = html.slice(start, html.indexOf("<", start));
  
        let parent;
        if (isOpen) {
            level++;
            // 设置标签属性
            current = that.parseTag(tag);
            // 判断是否为文本信息，是就push一个text children  不等于'  '
            if (!current.voidElement && text.trim()) {
                current["text"] = text
            }
            // 如果我们是根用户，则推送新的基本节点
            if (level === 0) {
                result.push(current);
            }
            // 判断有没有上层，有就push当前标签
            parent = arr[level - 1];
            if (parent) {
                parent.children.push(current);
            }
            // console.log(current)
            arr[level] = current;
        }
        // 如果不是开标签，或者是空元素：</div><img>
        if (!isOpen || current.voidElement) {
            // level--
            level--;
        }
    });
    // console.log(result)
    return result;
  
  },
setdata: function setdata(dictData) {
  
  for(var i in dictData){
    this.data[i] = dictData[i]
  }
  var html = \`${newHtml}\`
  this.setData({html : this.parse(html)});
},
  `)
    str = str.replace(/\\n/g, "");
    str = str.replace(/\\"/g, "'");
    str += `
}
  window.exports = runCode;
  `

    fs.writeFile('dist/index.js', str, {
      encoding: 'utf8'
    }, err => {})




  })

}


//处理this.data
function re(k, p1, noChange, eKey, otherCss, noThisData = false) {

  var fh = k.match(/[`~!@#$%^*()+?:{},\/;]|[||]|[==]|[===]|[<=]|[>=]/g)

  for (j in fh) {
    k = k.replaceAll(fh[j], ` ${fh[j]} `)
  }
  if (k.match(/\[(.*?)\]/g)) {
    k = k.replaceAll(k.match(/\[(.*?)\]/g)[0],(k.match(/\[(.*?)\]/g)[0]).replace(/\s+/g, ""))
  }

  let dz = k.match(/'(.*?)'/g)
  k = k.replace(/'(.*?)'/g, '~~~')
  let array = k.split(/\s+/g)

  // console.log(p1, 2)
  for (j in array) {

    if (array[j].match(/^[a-zA-Z]/) || array[j].match(/^\[/)) {
      if (eKey == ' wx:for') {
        console.log(array[j].split(".")[0],233)
        if(noChange.includes(array[j].split(".")[0])){
          p1 +=  '(' + array[j] + ')'
        }else{
          p1 += '(this.data.' + array[j] + ')'
        }
  
      } else {
        noChange.forEach(e => {
          console.log(e, array[j])
          if (e === array[j].split('.')[0]) {
            noThisData = true
          }
        })

        if (array[j].match(/\[(.*?)\]/g)) {
          let arraytemp = array[j]
          let arrayre = re(array[j].match(/\[(.*?)\]/)[1], '', noChange, eKey, otherCss)
          array[j] = arraytemp.replaceAll(arraytemp.match(/\[(.*?)\]/)[1], arrayre)
        }
        if (noThisData) {
          p1 += '(typeof ' + array[j] + ' === "object" ? JSON.stringify( ' + array[j] + ') : ' + array[j] + ')'
        } else {
          p1 += '(typeof this.data.' + array[j] + ' === "object" ? JSON.stringify( ' + 'this.data.' + array[j] + ') : this.data.' + array[j] + ')'
        }

      }

    } else {
      try {
        JSON.parse(k)
        p1 += JSON.stringify(array[j])
      } catch {
        p1 += array[j]
      }
    }
  }

  for (j in dz) {

    for (let dd of otherCss) {

      if (`'${Object.keys(dd)[0]}'` === dz[j]) {
        dz[j] = `'${dd[Object.keys(dd)[0]]}'`

      }
    }
    // otherCss.
    p1 = p1.replace(/~~~/, dz[j])
  }
  return p1
}

function parseTag(tag) {
  let res = {
    type: "tag",
    name: "",
    voidElement: false,
    children: [],
  };
  let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
  if (tagMatch) {
    // 标签名称为正则匹配的第2项
    res.type = tagMatch[1];
    if (tag.charAt(tag.length - 2) === "/") {
      // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
      res.voidElement = true;
    }
  }
  // 匹配所有的标签正则
  let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);

  if (classList) {
    let style = ''
    for (let i = 0; i < classList.length; i++) {

      // 去空格再以= 分隔字符串  得到['属性名称','属性值']
      let c = classList[i].split("=");
      c[0] = c[0].replace(/\\s*/g, "")
      // 循环设置属性
      var lengthc = 2
      for (lengthc; lengthc < c.length; lengthc++) {
        c[1] += "=" + c[lengthc]
      }
      let p = c[1].substring(1, c[1].length - 1)

      if (c[1]) {
        if (c[0] === 'style') {
          style = p + style
          res[c[0]] = style
        } else {
          res[c[0]] = p
        }

      };

    }
  }
  if (tag.match(/wx:else/)) {
    res['wx:else'] = ''
  }
  return res;
}

function parse(html) {
  let result = [];
  let current;
  let level = -1;
  let arr = [];
  let tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
  html.replace(tagRE, function (tag, index) {
    // 判断第二个字符是不是'/'来判断是否open
    let isOpen = tag.charAt(1) !== "/";
    // 获取标签末尾的索引
    let start = index + tag.length;
    // 标签之前的文本信息
    let text = html.slice(start, html.indexOf("<", start));

    let parent;
    if (isOpen) {
      level++;
      // 设置标签属性
      current = parseTag(tag);
      // 判断是否为文本信息，是就push一个text children  不等于'  '
      if (!current.voidElement && text.trim()) {
        current["text"] = text
      }
      // 如果我们是根用户，则推送新的基本节点
      if (level === 0) {
        result.push(current);
      }
      // 判断有没有上层，有就push当前标签
      parent = arr[level - 1];
      if (parent) {
        parent.children.push(current);
      }
      // console.log(current)
      arr[level] = current;
    }
    // 如果不是开标签，或者是空元素：</div><img>
    if (!isOpen || current.voidElement) {
      // level--
      level--;
    }
  });
  // console.log(result)
  return result;

}

fs.readFile('src/index.js', (err, js) => {
  //第一步，读src/index.js
  if (err) {
    //报错
    console.log(err)
  } else {
    js = js.toString()
    fs.readFile('src/index.wxml', (err, html) => {
      html = html.toString()

      if (err) {
        //报错
        console.log(err)
      } else {
        fs.readFile('src/index.css', (err, css) => {
          css = css.toString()
          css1 = css.replace(/[\n\r]/g, "");

          let darkCss = css1.match(/dark\s*\)\s*{(.*?)}\s*}/g);
          darkCss = darkCss ? darkCss[0].match(/\.(.*?)(.*?){(.*?)}/g) : darkCss;
          var regexp = /\.(.*?)(.*?){(.*?)}/g;
          allcss = css1.match(regexp);
          let otherCss = new Set()

          for (i in allcss) {
            var regexp = /\.(.*?)(.*?){(.*?)}/;
            let p = allcss[i].match(regexp);
            otherCss.add({
              [p[2].split(/\s+/)[0]]: p[3]
            })
          }

          let darks = new Set()
          for (i in darkCss) {
            var regexp = /\.(.*?)(.*?){(.*?)}/;
            let p = darkCss[i].match(regexp);
            darks.add({
              [p[2].split(/\s+/)[0]]: p[3]
            })
          }
          if (err) {
            //报错
            console.log(err)
          } else {
            let tagRE = /<[^>]*>/g;
            let html3 = html.match(tagRE)
            for (i in html3) {
              let a = html3[i].match(/\s*(.*?)\s*\/>/)
              if (a) {
                b = html3[i].replace('\\>', '>')
                a[1] = a[1].replace('<', '')
                html = html.replace(html3[i], b + "</" + a[1] + ">")
              }
            }

            AstRead(html, css, js, otherCss, darks)


          }

        })
      }

    })

  }

})