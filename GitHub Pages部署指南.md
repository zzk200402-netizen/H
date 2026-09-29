# 《不还》GitHub Pages 部署指南

网站包已经是完整静态网站，不需要再次转换 Word，也不需要安装网站编译工具。解压“不还-网站包.zip”，发布其中的网页文件即可。正文、插图及封面均已包含。

## 推荐方式：GitHub Desktop 上传

1. 登录 GitHub，新建仓库，例如 buhuan-reader。免费账户选 Public（公开），勾选 Add a README file，让 main 分支先建立起来，然后创建仓库。
2. 安装并登录 [GitHub Desktop](https://desktop.github.com/)。选择 File → Clone repository，在 GitHub.com 页签选刚创建的仓库，选择本机保存位置，点击 Clone。
3. 解压网站包，将解压后全部文件和 data、assets 两个文件夹复制到刚克隆的仓库文件夹中。index.html 必须直接位于仓库根目录。复制的是解压目录里的内容，不是额外套一层“不还阅读器”文件夹；不要上传 ZIP 或 Word。保留已有的 .git 文件夹。
4. 回到 GitHub Desktop，Changes 中会列出新增文件。Summary 填“发布不还阅读器”，点击 Commit to main，再点击 Push origin。
5. 打开 GitHub 上的仓库，进入 Settings → Pages。Build and deployment 的 Source 选 Deploy from a branch，Branch 选 main，Folder 选 /(root)，点击 Save。
6. 等待部署完成。在同一个 Pages 页面点击 Visit site；以该页面显示的网址为准。普通项目仓库的网址形式为 https://你的用户名.github.io/buhuan-reader/（将用户名和仓库名替换为实际值）。

[官方克隆说明](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)、[官方 Pages 发布设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 上传后根目录应当这样

```
index.html
style.css
app.js
sw.js
manifest.webmanifest
offline-files.json
favicon.svg
icon-192.png
icon-512.png
.nojekyll
data/
  book.json
  preface.json
  afterword.json
  chapters/
    c001.json ... c161.json
assets/
  image1.webp ... image154.webp
  chapter32-replacement.webp
  chapter137-replacement.webp
```

使用说明和本指南也可保留在仓库中。`.nojekyll` 已包含在网站包中，让 Pages 直接发布现成文件。整个网页约 70.1 MB，整理 Word 约 460 MB，不需要上传 Word。

## 如果只用 GitHub 网页上传

可通过 Add file → Upload files 上传，保留目录层级。GitHub 网页每批最多 100 个文件、单文件最多 25 MiB，因此不能一次拖入整个网站，也不能把压缩包当网站上传。[官方上传限制](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

先上传根目录文件。在仓库内创建 data、data/chapters、assets 目录（可用 Add file → Create new file，输入 data/chapters/.gitkeep 等路径建立目录）。进入每个目录后上传相应文件：data 下三个索引文件；data/chapters 的 161 个文件分两批；assets 的 156 个图片分两批。每批提交后继续下一批。检查 index.html、全部章节及全部图片都存在，再按前述第 5 步启用 Pages。用 Desktop 更容易保证文件齐全。

## 发布后的检查

打开正式 HTTPS 网址，核对：

- 首页显示 3 卷、161 章、约 126 万字（含标点）。
- 第一章正文结束后只出现一次 image3 插图；第一、五、六、七章的同章重复插图已去除。下一章开头直接显示第二章正文。
- 第二章结尾出现 image4；第六十二章、第六十三章交界处章末图与第三卷卷首图分开。
- 图片在本章正文之后、下一章按钮之前，无文字遮挡。
- 字号、夜间模式及阅读位置保存正常。
- 等到底部显示“全书已准备好，可离线阅读”后断网，打开尚未读过的章节检查正文及插图。首次访问需要联网。

## 常见问题

首页 404：检查 index.html 是否在 main 分支根目录，Pages 是否选择 main + /(root)，Actions 中部署是否成功。

首页能开但无正文或图片：检查 data 与 assets 是否漏传，名称大小写及目录层级是否一致。不要把文件扁平化。

仍显示旧版错位或重复插图：本次已更新离线缓存版本。联网重新打开网站，让新版接管后刷新页面；等待全书离线准备完成。必要时先记录当前章号，再清除此站点缓存并重新打开；清除全部网站数据会丢失本机阅读位置。

本机直接双击 index.html：文件地址不能可靠加载正文和离线功能，应使用 GitHub Pages 的 HTTPS 网址。

## 后续更新

收到新的完整网站包后，把新包内容覆盖仓库中的对应文件，移除新版不再使用的文件，再 Commit 与 Push。Pages 会发布更新。必须一起更新 sw.js、offline-files.json、程序及数据；本次缓存版本已根据全部发布文件重新生成，不能只替换某章正文而沿用旧缓存。

本次只生成可发布文件和说明，没有代你向 GitHub 上传或公开发布。

本次更新：第 32 章使用用户提供的「第三十二章.png」，第 137 章使用「第一百三十七章 第一天.png」，均在章末。请整体覆盖新包内容并提交，联网刷新两次获取新缓存。
