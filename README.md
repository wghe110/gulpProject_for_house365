#gulp_project_for_house365

http://www.house365.com

针对365淘房南京站的微信端开发
这个项目只针对于移动端，不适用于pc端

###安装使用:

1.安装 node.js

2.全局安装gulp

    npm install -g gulp

3.安装项目

    npm install gulp_project_for_house365

4.进去gulp_project_for_house365文件夹，安装需要的插件

    npm install

*版本清缓存的另一种方法：http://www.tuicool.com/articles/UbaqyyJ*

###使用:
*使用前请先配置好gulpfile.js里面的上传路径和用户名以及密码*

1.开发监听并开启本地服务器

    gulp server

2.清空dist、rev目录下的文件

    gulp clean

3.压缩资源(图片、css、js)、移动音频、视频

    gulp min

4.根据文件MD5码生成版本号(格式?v=xxxxxx)

    gulp rev

5.上传到服务器，并打开目标地址

    gulp upload

6.重置目录结构

    gulp reset
