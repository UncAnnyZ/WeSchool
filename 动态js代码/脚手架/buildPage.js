const {
  checkPrimeSync
} = require('crypto');
const fs = require('fs')
var inlineCss = require('inline-css');
const mineType = require('mime-types');
const path = require('path');
const {
  ids
} = require('webpack');
var base64img = function (file) {

  let filePath = path.resolve(file);
  let data = fs.readFileSync(path.resolve(filePath));
  data = new Buffer(data).toString('base64');
  return 'data:' + mineType.lookup(filePath) + ';base64,' + data;
}

fs.readFile('src/index.js', (err, buffer) => {

  if (err) {
    console.log(err)
  } else {

    options = {}

    options.url = "index.css"

    fs.readFile('src/index.wxml', (err, buffer1) => {
      fs.readFile('src/index.css', (err, buffer2) => {
        if (err) {
          console.log(err)
        } else {
          // css处理
          let css = buffer2.toString()
          //防止不同文件打开格式不同
          css1 = css.replace(/[\n\r]/g, "");
          //匹配暗黑模式
          let darkCss = css1.match(/dark\s*\)\s*{(.*?)}\s*}/g);
          darkCss = darkCss ? darkCss[0].match(/\.(.*?)(.*?){(.*?)}/g) : darkCss;
          let darks = new Set()
          for (i in darkCss) {
            var regexp = /\.(.*?)(.*?){(.*?)}/;
            let p = darkCss[i].match(regexp);

            darks.add({
              [p[2].split(/\s+/)[0]]: p[3]
            })
          }
          console.log(darks, 233)
          let noChange = []
          css = css ? css : '.page{}'

          let tagRE = /<[^>]*>/g;
          let html = buffer1.toString()
          let html3 = html.match(tagRE)
       
          for (i in html3) {
            let a = html3[i].match(/\s*(.*?)\s*\/>/)
           
            if (a) {
              b = html3[i].replace('\\>', '>')
              a[1] = a[1].replace('<', '')
              html = html.replace(html3[i], b + "</" + a[1] + ">")
            }
          }
     
∑
          tagRE = /{{.*?}}/g
          let html4 = html.match(tagRE)
          for (i in html4) {
            // console.log(html4[i], 233)
            let a = html4[i].match(/{{(.*?)}}/)
            if (a && a[1].match(/>/)) {

              html = html.replace(a[1], a[1].replace('>', '!!!'))
            }
          }

          // console.log(html)
          html = '<style>' + css + '</style>' + html
          html = html.replace(/<!--(.*?)-->/g, "")
          html = html.replace(/'/g, `"`)
          html = html.replace(/input/g, `input1`)


          inlineCss(html, options)
            .then(function (html) {
              //内部css处理
              console.log(css)
              css = css.replace(/[\n\r]/g, "");

              var regexp = /\.(.*?)(.*?){(.*?)}/g;
              allcss = css.match(regexp);
              let s = new Set()
              
              for (i in allcss) {
                var regexp = /\.(.*?)(.*?){(.*?)}/;
                let p = allcss[i].match(regexp);
                s.add({
                  [p[2].split(/\s+/)[0]]: p[3]
                })
              }
    
              let allStrClass = html.match(/class=".*?{{(.*?)}}\s*"/g)
              let allStrClass1 = html.match(/class=".*?{{(.*?)}}\s*"/g)

              for (i in allStrClass) {

                var regexp = /{{(.*?)}}/;
                let p = allStrClass[i].match(regexp);
      
                if (!p) {
                  continue
                }
                p = p[1]
                var fh
          
                fh = p.match(/["]/g)
                
                for (j in fh) {
                  p = p.replaceAll(fh[j], ` ${fh[j]} `)

                }

                let newStyle = p.split(/\s+/)
             
                let Style = ""
                for (j in newStyle) {
                  // console.log(newStyle[j].match(/"(.*)"/))
                  for (let x of s) {
                    
                    try {
                      if (newStyle[j] === Object.keys(x)[0]) {
                
                        newStyle[j] = "wx&class ;" + x[Object.keys(x)[0]]
                        // console.log(newStyle[j])
                        break;
                      }
                      // console.log(newStyle[j].match(/"(.*)"/)[1] ,Object.keys(x)[0])
                      if (newStyle[j].match(/"(.*)"/)[1] === Object.keys(x)[0] && Object.keys(x)[0] !== '') {
                        newStyle[j] =  newStyle[j].replace(/"(.*)"/, '"wx&class ;' + x[Object.keys(x)[0]] + '"')
                    
                        break
                      }
                    } catch {

                    }

                  }
                  Style += newStyle[j]

                }

                if (Style) {
                  allStrClass[i] = allStrClass[i].replace(regexp, '{{' + Style + '}}')

                }

                // console.log(allStrClass[i])
              }
              // console.log(allStrClass)

         
              for (i in allStrClass1) {
                // console.log(allStrClass1[i], allStrClass[i])
                allStrClass[i] = allStrClass[i].replace('class', 'style')
                html = html.replace(allStrClass1[i], allStrClass[i])
              }

  
              html = html.replace(/input1/g, `input`)

      
              let y = 0;
              let tagRE = /<[^>]*>/g;

              let tagAll = []
              let html2 = html.match(tagRE)
              for (i in html2) {

                let a = ''
                for (let x of darks) {
                  if (html2[i].match(Object.keys(x)[0])) {
                    a = x[Object.keys(x)[0]]
                  }
                }
               
                if (a) {
                  // console.log(html2[i])
                  tag1 = html2[i].replace (/(<\/?([^\s]+?)[/\s>])/,"$1 ${this.data.dark === 'dark' ? 'style=\"" + a + "\"' : ''} g=" + y + " ")
                } else {
                  tag1 = html2[i].replace(">", " g=" + y + ">")
                }

                //图片处理
                try {
                  let src = tag1.match(/src="(.*?)"/)
                  if (src) {
                    let src1
                    if (src[1].match(/\.\.\//)) {
                      src1 = src[1].replace('../', './')
                    } else {
                      src1 = src[1].replace('./', './src/')
                    }

                    let img01 = base64img(src1);
                    img01 = img01.replace(/[\n]/g, "");
                    img01 = img01.replace(/\s+/g, "");
                    tag1 = tag1.replace(/src="(.*?)"/, "src=\"" + img01 + "\"")
                  }

                } catch (e) {

                }

                html = html.replace(html2[i], tag1)
                y += 1
              }


              let elseNumber = 0 //wx:if,wx:elif的嵌套标识

              html.replace(tagRE, function (tag, index) {

                let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);

                let type = tagMatch[1] + ".0";
       
                if (tag.match(/wx:for/)) {
                  // console.log(0)
                  type = tagMatch[1] + ".1"
                  let t = tag.match(/wx:for="{{(.*?)}}"/);
                  let item = tag.match(/wx:for-item="(.*?)?"/) ? tag.match(/wx:for-item="(.*?)?"/)[1] : 'item'
                  let index = tag.match(/wx:for-index="(.*?)?"/) ? tag.match(/wx:for-index="(.*?)?"/)[1] : 'index'
                  let tag1 = tag.replace(/wx:for="{{(.*)}}"/, '')
                  tag1 = tag1.replace(/wx:for-index="{{(.*)}}"/, '')
                  tag1 = tag1.replace(/wx:for-item="{{(.*)}}"/, '')
                  noChange.push(item)
                  noChange.push(index)
                  html = html.replaceAll(tag, `\${this.data.${t[1]}.map((${item}, ${index}) =>  \` ` + tag1)
                }


                if (tag.match(/wx:if/)) {
          
                  let t = tag.match(/wx:if="{{(.*)}}"/);

                  if (t) {
                    type = tagMatch[1] + ".2"
                    let tag1 = tag.replace(/wx:if="{{(.*)}}"/, '');
                    html = html.replaceAll(tag, `\{{"wx&if" ${t[1]}}} ? \`` + tag1)
                    
                    elseNumber += 1
                  }

                }

                if (tag.match(/wx:elif/)) {

                  type = tagMatch[1] + ".2"
                  let t = tag.match(/wx:elif="{{(.*)}}"/);
                  let tag1 = tag.replace(/wx:elif="{{(.*)}}"/, '');
                  html = html.replace('`: `' + (elseNumber) + '`}', '`: ' + `\{{"wx&elif" ${t[1]}}} ? \`` + tag1)
                  elseNumber += 1
                }

                if (tag.match(/wx:else/)) {

                  type = tagMatch[1] + ".3"
                  html = html.replace('`: `' + (elseNumber) + '`}', '`: `')
                  elseNumber -= 1
                }

                function truncate(arr) {
                  var m = arr.slice(0);
                  m.splice(m.length - 1, 1);
                  return m;
                }

                if (tag.match(/<(\s*?)\//)) {

                  if (tagAll[tagAll.length - 1] && tagAll[tagAll.length - 1].split(".")[1] === "1") {

                    html = html.replace(tag, tag + '`)}')
                  }
                  if (tagAll[tagAll.length - 1] && tagAll[tagAll.length - 1].split(".")[1] === "2") {

                    html = html.replace(tag, tag + '`: `' + elseNumber + '`}')
                  }
                  if (tagAll[tagAll.length - 1] && tagAll[tagAll.length - 1].split(".")[1] === "3") {
                    html = html.replace(tag, tag + '`}')
                  }
                  tagAll = truncate(tagAll)

                } else {
                  tagAll.push(type)
                }

              });

              let k = 0

      
              html.replace(tagRE, function (tag, index) {

                html = html.replaceAll(" g=" + y, '')
                y -= 1
              })

              for(k = 0; k < elseNumber; k++){
                html = html.replace('`: `' + (k) + '`}', '`: ``}')
              }

              html = html.replaceAll(" g=0", '')

              var regexp = /{{(.*?)}}/g;
              let p = html.match(regexp)

              for (i in p) {
                let k = p[i].match(/{{(.*?)}}/)[1]
                let p1 = ''
                try {
                  JSON.parse(k)
                  p1 = JSON.stringify(k)

                } catch (e) {
                  const re = (k, p1) =>{
            
                    var fh = k.match(/[`~!@#$%^*()+<>?:{},\/;\=]/g)
                    if(k.match(/wx&class/)){
                      var fh = k.match(/[`~@%^*+<>?:{},\/;\=]/g)
                    }
         
                    for (j in fh) {
  
                      k = k.replaceAll(fh[j], ` ${fh[j]} `)
  
                    }
              
                    let dz = k.match(/"(.*?)"/g)
         
                    k = k.replace(/"(.*?)"/g, '~~~')
                    let array = k.split(/\s+/g)
 
   
                    
                    // console.log( re(array[0].match(/\[(.*?)\]/g), ''))
                    for (j in array) {
                      if(array[j].match(/\[(.*?)\]/g)){
                        let arrayre  = re(array[j].match(/\[(.*?)\]/)[1], '')
                        // console.log(arrayre, 233)
                        try{
                          if(arrayre){
                            array[j] = array[j].replaceAll(array[j].match(/\[(.*?)\]/)[1], arrayre)
                          }
                        }catch{}
          
                
           
                      }
                      // console.log(array[j], 244)
                      if (array[j].match(/^[a-zA-Z]/)) {
                  
                        // p1 += `${array[j]}`
                        p1 += 'typeof this.data.' + array[j] + ' === "object" ? JSON.stringify( ' + 'this.data.' + array[j] + ') : this.data.' + array[j]
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
               
                      p1 = p1.replace(/~~~/, dz[j])
                    }
                    return p1
                  }
           
                  p1 = re(k, p1)
                }

                if (p[i].match(/wx&if/)) {

                  html = html.replace(p[i], `\${${p1}`)
                } else if (p[i].match(/wx&elif/)) {
                  html = html.replace(p[i], `${p1}`)
                } else {

                  html = html.replace(p[i], `\${${p1}}`)
                }

              }

              // wx:for的内容转换
              html = html.replace(/[\n\r]/g, "");
              html = html.replace(/"wx&if"/g, "");
              html = html.replace(/"wx&class"/g, "");
              html = html.replace(/"wx&elif"/g, "");
              html = html.replace(/!!!/g, ">");
              let wxForexp = /\.map(.*?)`\)}/g;
              let wxForhtml = html.match(wxForexp)
              let wxForhtml1 = html.match(wxForexp)

      
              for (i in wxForhtml) {  
  
                for (j in noChange) {
                  if (wxForhtml[i].match(noChange[j])) {
                    wxForhtml[i] = wxForhtml[i].replaceAll('this.data.' + noChange[j], noChange[j])
                  }
                }
                html = html.replace(wxForhtml1[i], wxForhtml[i])
  
              }
              html = html.replaceAll('this.data.item', 'item')
              console.log(html)
              let str = buffer.toString()
              str = `function runCode(){
              `
              str += buffer.toString()
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
                        if(c[0] === 'style'){
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
            var html = \`${html}\`
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
            });

        }
      })

    })



  }
})