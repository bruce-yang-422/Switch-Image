/**
 * Additional UI, format, and template translations.
 * Loaded before i18n.js on the conversion and error pages.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});
  SI.extendedLocales = {
    "zh-Hans": {
      "messages": {
        "meta.title": "免费在线图像转换器|本地批量转换 | Switch Image",
        "meta.description": "在线批量转换 JPG、PNG、WebP、AVIF 和 JPEG XL。导入 HEIC、PSD、TIFF 和 RAW 预览。无需上传即可调整图像大小、压缩图像并为其添加水印。",
        "nav.aria": "站点导航",
        "nav.badgeMain": "100%本地化",
        "nav.badgeExtra": "· 禁止上传",
        "nav.langAria": "切换界面语言",
        "nav.themeTitle": "切换浅色/深色主题",
        "nav.infoTitle": "站点信息和设置",
        "hero.titleMain": "通用图像转换器",
        "hero.subtitleHtml": "在本地转换图像，包括 JPEG XL 和 RAW 预览。 <strong>选择格式→放置图像→下载</strong><span class=\"hero-sub-extra\"> — 文件永远不会离开您的设备</span>。",
        "trust.aria": "核心保障",
        "trust.fastTitle": "批量转换",
        "trust.fastDetail": "· ZIP 打包",
        "trust.fastTip": "通过一键 ZIP 导出拖放数百张图像",
        "trust.formatsTitle": "格式支持",
        "trust.formatsDetail": "· 14 类输入，9 种输出",
        "trust.formatsTip": "在 Web、设计、图标和 iPhone HEIC 格式之间自由切换",
        "trust.freeTitle": "无需注册",
        "trust.freeDetail": "· 无限",
        "trust.freeTip": "无登录或每日转化限制",
        "trust.privacyTitle": "本地处理",
        "trust.privacyDetail": "· 无广告",
        "trust.privacyTip": "完全免费、无广告且完全在设备上处理",
        "step1.title": "选择输出格式",
        "step1.moreFormats": "所有格式",
        "step1.fewerFormats": "显示更少",
        "step1.aria": "选择目标输出格式",
        "quick.bgLabel": "透明区域填充：",
        "quick.bgWhite": "白色",
        "quick.bgBlack": "黑色",
        "quick.icoLabel": "ICO 尺寸（可多选）：",
        "quick.icoCount": "已选 {n} 项",
        "quick.icoPresetWeb": "网页图标",
        "quick.icoPresetStd": "标准多尺寸",
        "quick.svgModeLabel": "SVG 模式：",
        "quick.svgColorsLabel": "颜色：",
        "quick.colorsUnit": "{n} 色",
        "drop.headingHtml": "将图像拖放到此处即可转换为 <strong id=\"emptyTargetFormat\">{ext}</strong>",
        "drop.subHtml": "1个文件直接下载，多个文件自动打包为ZIP · 按<strong>Ctrl + V</strong>粘贴截图",
        "drop.selectFiles": "选择图像",
        "drop.selectFolder": "选择文件夹",
        "drop.supportedInput": "支持的输入： PNG · JPG · WebP · AVIF · GIF · ICO · SVG · BMP · HEIC · PSD · TIFF/TIF · JPEG XL · TGA · RAW",
        "decode.rawPreview": "嵌入预览{w}×{h}",
        "decode.rawMissing": "没有可用的嵌入式 JPEG 预览。从照片编辑器导出 JPEG 或 TIFF。",
        "decode.format.raw": "从 RAW、DNG、CR2、CR3、NEF 和 ARW 中提取嵌入的 JPEG 预览。",
        "decode.firstPage": "仅第 1 页",
        "decode.psdComposite": "PSD 没有复合材料。在 Photoshop 中启用“最大化兼容性”并再次保存。",
        "decode.variant": "不支持此颜色模式或编码。",
        "decode.size": "文件或图像超出了解码器限制。",
        "decode.module": "无法加载解码器。检查您的连接。",
        "decode.worker": "无法启动解码器。通过 HTTP(S) 打开站点。",
        "decode.timeout": "解码超时。",
        "decode.failed": "无法解码该文件。它可能已损坏或不受支持。",
        "decode.format.psd": "读取保存的 8 位 PSD 复合图像。",
        "decode.format.tiff": "转换常见 RGB 或灰度 TIFF 的第一页。",
        "decode.format.jxl": "静态图像 JPEG XL 导入和导出，质量和透明度可调。",
        "encode.jxlModule": "无法加载 JPEG XL 编码器。检查您的连接。",
        "encode.jxlFailed": "JPEG XL 编码失败。",
        "decode.format.tga": "读取未压缩或 RLE 真彩色 TGA。",
        "drop.compactHtml": "拖入更多图片，按 <strong>Ctrl + V</strong> 粘贴，或",
        "drop.addFiles": "添加图片",
        "drop.addFolder": "添加文件夹",
        "dock.label": "可选工具：",
        "dock.basic": "画质与尺寸",
        "dock.ecommerce": "尺寸模板",
        "dock.rename": "批量重命名",
        "dock.watermark": "水印",
        "dock.reconvert": "重新转换",
        "dock.reconvertTitle": "使用当前设置重新转换所有文件",
        "dock.badgeEnabled": "· 已启用",
        "dock.badgeOn": "· 开",
        "dock.autoDim": "自动",
        "presets.label": "快速预设：",
        "basic.quality": "输出画质",
        "basic.qualityHintDefault": "建议 75% – 92%",
        "basic.qualityHintAvif": "建议 65% – 85%",
        "basic.qualityLossless": "无损",
        "basic.qualityLosslessHint": "{label} 使用无损输出",
        "basic.sizeLimit": "最大尺寸（像素）",
        "basic.sizeHint": "等比缩小，留空则保留原尺寸。",
        "basic.limitHeight": "限制高度",
        "basic.limitWidth": "限制宽度",
        "basic.limitLongest": "限制长边",
        "basic.limitShortest": "限制短边",
        "basic.widthPh": "宽度",
        "basic.heightPh": "高度",
        "basic.resizeMode": "调整大小模式",
        "basic.modeContain": "等比缩放（不裁剪）",
        "basic.modePad": "居中补边",
        "basic.modeCover": "居中裁剪至指定尺寸",
        "basic.bgTitle": "透明背景",
        "basic.bgHintAlpha": "保留透明背景，或填充纯色。",
        "basic.bgHintNoAlpha": "{label} 不支持透明背景，将自动填充底色。",
        "basic.bgTransparent": "保持透明背景",
        "basic.bgFill": "用纯色填充",
        "tpl.searchPh": "搜索：Google 表单、FB、1080...",
        "tpl.suffix": "文件名后缀",
        "tpl.suffixName": "模板名称",
        "tpl.suffixSize": "尺寸（宽x高）",
        "tpl.suffixDigits": "流水号位数",
        "tpl.suffixOff": "不加流水号",
        "tpl.resetSize": "重置尺寸",
        "tpl.empty": "没有模板匹配“{q}”。尝试其他类别或清除搜索。",
        "tpl.modePad": "居中补边",
        "tpl.modeCover": "居中裁剪",
        "tpl.modeContain": "等比缩放",
        "rename.prefix": "前缀",
        "rename.prefixHint": "加在文件名开头",
        "rename.prefixPh": "例如商店_",
        "rename.suffix": "后缀",
        "rename.suffixHint": "加在扩展名之前",
        "rename.suffixPh": "例如_800像素",
        "rename.base": "统一文件名",
        "rename.baseHint": "留空则保留原文件名",
        "rename.basePh": "例如产品",
        "rename.seqToggle": "添加流水号",
        "rename.seqPad": "位数",
        "rename.reset": "重置命名",
        "wm.enable": "启用水印（适用于所有非 ICO 输出）",
        "wm.type": "类型",
        "wm.typeText": "文字水印",
        "wm.typeImage": "图片标志水印",
        "wm.position": "位置",
        "wm.posBR": "右下角",
        "wm.posBL": "左下角",
        "wm.posTR": "右上",
        "wm.posTL": "左上",
        "wm.posCenter": "居中",
        "wm.posTile": "斜向平铺",
        "wm.opacity": "不透明度",
        "wm.angle": "角度",
        "wm.text": "水印文字",
        "wm.textPh": "输入品牌或版权文字",
        "wm.fontSize": "字体大小",
        "wm.color": "文字颜色",
        "wm.uploadLogo": "上传标志",
        "wm.chooseLogo": "选择标志",
        "wm.logoHint": "推荐透明 PNG 或 SVG",
        "wm.logoLoaded": "已加载：{name} ({w}×{h})",
        "wm.logoScale": "Logo 大小",
        "results.clear": "清空列表",
        "results.downloadAll": "单独下载",
        "results.downloadDefault": "下载图片",
        "results.downloadSingle": "下载{label}",
        "results.downloadZip": "下载 ZIP（{n} 文件）",
        "results.downloadZipDefault": "下载 SwitchImage_Batch.zip",
        "results.statsCountHtml": "<strong>{total}</strong> 总计（<strong>{done}</strong> 已准备好）",
        "results.savedBadge": "节省 {size}（-{pct}%）",
        "results.largerBadge": "+{size} (+{pct}%)",
        "item.saved": "-{pct}%",
        "item.larger": "+{pct}%",
        "item.converting": "转换…",
        "item.preview": "预览",
        "item.download": "下载",
        "item.remove": "删除",
        "item.thumbTitle": "单击可预览转换后的输出（检查裁剪、背景和水印）",
        "item.formatTitle": "覆盖该图像的输出格式",
        "matrix.summary": "查看所有 14 种支持的格式和浏览器编解码器功能",
        "matrix.useCases": "将 HEIC 批量转换为 JPG，并将 PSD 图像批量转换为 PNG。导入和导出 JPEG XL，或从 RAW 照片转换嵌入的 JPEG 预览。",
        "matrix.readOk": "解码",
        "matrix.readHeic": "浏览器解码或按需加载",
        "matrix.writeLocal": "本地编码",
        "matrix.writeNative": "本机编码",
        "matrix.writeWasm": "WASM 编码",
        "matrix.writeReadOnly": "仅支持输入",
        "matrix.writeUnsupported": "不支持",
        "footer.tip": "提示：单击任意缩略图即可预览转换后的图像（裁剪、背景和水印），或使用右侧下拉菜单切换每个图像的格式。",
        "footer.privacy": "Switch Image 在您的浏览器中本地运行 100% · 无广告 · 您的文件永远不会离开您的设备。",
        "sheet.title": "关于和设置",
        "sheet.titleDesktop": "关于",
        "sheet.closeAria": "关闭关于和设置",
        "sheet.langHeading": "语言",
        "sheet.themeHeading": "外观",
        "sheet.themeLight": "浅色模式",
        "sheet.themeDark": "深色模式",
        "sheet.themeSystem": "跟随系统",
        "sheet.matrixHeading": "支持的格式与浏览器能力",
        "about.tagline": "浏览器本地图片转换工具",
        "about.infoHeading": "处理方式与隐私",
        "about.processingLabel": "处理方式",
        "about.processingVal": "全部在浏览器中完成",
        "about.privacyLabel": "隐私",
        "about.privacyVal": "零上传·无追踪",
        "about.stackLabel": "技术架构",
        "about.shortcutsLabel": "快捷方式",
        "about.shortcutsHtml": "<kbd>Ctrl</kbd>+<kbd>V</kbd> 粘贴 · <kbd>Esc</kbd> 关闭",
        "modal.title": "输出预览",
        "modal.closeAria": "关闭预览",
        "modal.downloadThis": "下载{label}",
        "modal.downloadFallback": "下载文件",
        "modal.meta": "{label} {outSize} ({w}×{h}) |原版{origSize} ({delta}) |点击图片查看100%",
        "modal.hint": "单击图像可切换 100% 实际尺寸",
        "compat.noWebp": "您的浏览器不支持本机 WebP 编码。 PNG、JPG、GIF、ICO、SVG 和 BMP 仍然完全可用。",
        "toast.reconverted": "应用更新的设置并重新转换",
        "toast.skipped": "添加了{added}图像（跳过了{skipped}非图像文件）",
        "toast.pasted": "从剪贴板粘贴{n}图像",
        "toast.downloadedSeq": "单独下载了{n}个文件",
        "toast.downloadedOne": "已下载{name}",
        "toast.zipDone": "将 {n} 图像打包到 SwitchImage_Batch.zip 中",
        "toast.zipFail": "ZIP 导出失败：{msg}",
        "toast.presetApplied": "应用预设“{name}”({tag})",
        "toast.templateApplied": "应用“{platform}{name}”({w}×{h})",
        "toast.templateReset": "清除尺寸限制",
        "toast.renameReset": "命名规则清除",
        "toast.logoError": "无法读取水印徽标图像",
        "toast.icoMinOne": "选择至少 1 个 ICO 大小",
        "err404.pageTitle": "404 页面未找到 — Switch Image",
        "err404.heading": "找不到页面",
        "err404.desc": "链接可能已更改、删除或输入有误。请返回首页继续转换图片。",
        "err404.pathLabel": "请求的路径：{path}",
        "err404.goHome": "返回首页",
        "err404.goBack": "返回",
        "err404.formatsNote": "JPEG XL、HEIC、PSD、TIFF、TGA 和 RAW 预览的本地转换",
        "pwa.win.title": "安装 Windows 版 Switch Image",
        "pwa.win.desc": "直接从“开始”或“桌面”在自己的窗口中启动，并提供完整的离线支持。",
        "pwa.mac.title": "安装 Mac 桌面应用程序",
        "pwa.mac.desc": "在具有离线缓存的专用窗口中运行 — 像本机 Mac 实用程序一样快。",
        "pwa.macSafari.title": "将 Switch Image 添加到 Mac Dock",
        "pwa.macSafari.desc": "在 Safari 中，选择“文件”→“添加到 Dock”以将 Switch Image 作为离线应用程序启动。",
        "pwa.ios.title": "添加到 iPhone / iPad 主屏幕",
        "pwa.ios.desc": "点击下面的共享图标，然后选择“添加到主屏幕”以进行离线应用程序访问。",
        "pwa.android.title": "安装到主屏幕",
        "pwa.android.desc": "轻量级、离线就绪的批量转换器只需从主屏幕上轻轻一按即可访问。",
        "pwa.linux.title": "安装桌面应用程序",
        "pwa.linux.desc": "在独立窗口中启动，并进行完整的离线本地图像转换。",
        "pwa.desktop.title": "安装离线应用程序",
        "pwa.desktop.desc": "在具有离线缓存的专用窗口中运行，以实现即时本地转换。",
        "pwa.entry.windows": "安装Windows应用程序",
        "pwa.entry.macos": "安装Mac应用程序",
        "pwa.entry.macSafari": "添加到 Mac Dock",
        "pwa.entry.ios": "添加到主屏幕",
        "pwa.entry.android": "安装安卓应用程序",
        "pwa.entry.desktop": "安装离线应用程序",
        "pwa.cta.install": "安装",
        "pwa.cta.installMobile": "立即安装",
        "pwa.cta.gotIt": "知道了",
        "pwa.cta.later": "稍后",
        "pwa.toastInstalled": "已安装 Switch Image，可从设备直接打开。"
      },
      "formats": {
        "webp": {
          "badge": "推荐",
          "desc": "文件小，支持透明背景，适合网页和应用。"
        },
        "png": {
          "badge": "无损",
          "desc": "无损压缩并保留透明背景，适合界面、Logo 和截图。"
        },
        "jpg": {
          "badge": "通用",
          "desc": "适合照片，兼容大多数设备。透明区域会填充背景色。"
        },
        "avif": {
          "badge": "高压缩",
          "desc": "采用 AV1 压缩，文件小，支持透明背景。"
        },
        "gif": {
          "badge": "256 色",
          "desc": "支持最多 256 色及单色透明。"
        },
        "ico": {
          "badge": "多尺寸",
          "desc": "将多个尺寸的图标打包为一个 ICO，适合制作网站图标。"
        },
        "svg": {
          "badge": "两种模式",
          "desc": "可将 SVG 转为位图，或将位图嵌入 SVG、描摹为矢量。"
        },
        "bmp": {
          "badge": "未压缩",
          "desc": "标准 Windows 24 位 BMP，兼容旧版软件。"
        },
        "heic": {
          "badge": "仅输入",
          "desc": "将 iPhone 的 HEIC 或 HEIF 照片转为 JPG、PNG、WebP 等格式。"
        }
      },
      "options": {
        "ico": {
          "16": "单人16×16",
          "32": "单32×32",
          "48": "单48×48",
          "64": "单64×64",
          "128": "单128×128",
          "256": "单256×256",
          "multi": "标准多尺寸（16 / 32 / 48 / 256px）",
          "favicon": "紧凑型网络图标 (16 / 32 / 48px)"
        },
        "svg": {
          "embed": "嵌入原图（无损）",
          "vector": "矢量描摹（适合图标和 Logo）"
        },
        "presets": {
          "web-webp": {
            "name": "网页优化",
            "tag": "WebP · 85%"
          },
          "ultra-avif": {
            "name": "高效压缩",
            "tag": "AVIF · 75%"
          },
          "photo-jpg": {
            "name": "通用照片",
            "tag": "JPG · 90%"
          },
          "lossless-png": {
            "name": "无损透明图",
            "tag": "PNG · 无损"
          },
          "site-ico": {
            "name": "网站图标",
            "tag": "ICO · 多尺寸"
          },
          "vector-svg": {
            "name": "Logo 转矢量",
            "tag": "SVG · 矢量描摹"
          },
          "social-1920": {
            "name": "社交平台分享图",
            "tag": "JPG · 1920 px"
          }
        },
        "categories": {
          "all": "全部",
          "ecommerce": "电商",
          "fb": "脸书",
          "ig": "Instagram",
          "yt": "YouTube",
          "seo": "SEO / 网站",
          "misc": "表格 / LINE / 其他"
        }
      },
      "templates": {
        "shopee-800": [
          "虾皮",
          "标准商品方图"
        ],
        "shopee-1024": [
          "虾皮",
          "高清产品图片"
        ],
        "shopee-banner": [
          "虾皮",
          "店铺轮播横幅"
        ],
        "momo-pchome": [
          "陌陌/PChome",
          "商品主图（方形）"
        ],
        "pinkoi-711": [
          "Pinkoi / 我的船",
          "商品详情方图"
        ],
        "amazon-2000": [
          "亚马逊",
          "高清商品方图"
        ],
        "shopify-2048": [
          "购物",
          "店铺商品方图"
        ],
        "fb-post-square": [
          "脸书",
          "方形帖子 1:1"
        ],
        "fb-post-portrait": [
          "脸书",
          "竖版帖子 4:5"
        ],
        "fb-post-landscape": [
          "脸书",
          "横版链接帖子"
        ],
        "fb-page-cover": [
          "脸书",
          "主页封面（标准）"
        ],
        "fb-page-cover-hd": [
          "脸书",
          "页封面 2x 高清"
        ],
        "fb-group-cover": [
          "脸书",
          "团体封面横幅"
        ],
        "fb-event-cover": [
          "脸书",
          "活动封面"
        ],
        "fb-story-reels": [
          "脸书",
          "快拍 / Reels 9:16"
        ],
        "ig-square": [
          "Instagram",
          "方形帖子 1:1"
        ],
        "ig-portrait-45": [
          "Instagram",
          "竖版帖子 4:5"
        ],
        "ig-grid-34": [
          "Instagram",
          "个人主页网格 3:4"
        ],
        "ig-landscape": [
          "Instagram",
          "横版帖子 1.91:1"
        ],
        "ig-story": [
          "Instagram",
          "限时动态 / Reels 9:16"
        ],
        "ig-avatar-highlight": [
          "Instagram",
          "头像/精彩封面"
        ],
        "yt-thumb-hd": [
          "YouTube",
          "缩略图 16:9 高清"
        ],
        "yt-thumb-fhd": [
          "YouTube",
          "全高清缩略图"
        ],
        "yt-banner-tv": [
          "YouTube",
          "频道横幅（电视）"
        ],
        "yt-banner-safe": [
          "YouTube",
          "横幅安全区"
        ],
        "yt-shorts": [
          "YouTube",
          "Shorts 封面 9:16"
        ],
        "yt-avatar": [
          "YouTube",
          "频道头像"
        ],
        "yt-watermark": [
          "YouTube",
          "频道订阅水印"
        ],
        "seo-og-share": [
          "打开图",
          "OG 分享预览"
        ],
        "seo-google-discover": [
          "谷歌发现",
          "Discover 封面 4:3"
        ],
        "seo-twitter-card": [
          "X（推特）卡",
          "摘要大图"
        ],
        "seo-blog-hero": [
          "博客/WordPress",
          "文章头图 16:9"
        ],
        "seo-pwa-512": [
          "网络/PWA",
          "应用程序图标 512px"
        ],
        "seo-apple-touch": [
          "苹果iOS",
          "Apple Touch 图标"
        ],
        "seo-favicon-ico": [
          "网站图标",
          "多尺寸 favicon.ico"
        ],
        "misc-google-forms": [
          "谷歌表单",
          "标题横幅 4:1"
        ],
        "misc-google-classroom": [
          "谷歌课堂",
          "类标头 4:1"
        ],
        "misc-line-richmenu-lg": [
          "LINE 官方",
          "大尺寸图文菜单"
        ],
        "misc-line-richmenu-sm": [
          "LINE 官方",
          "小尺寸图文菜单"
        ],
        "misc-line-sticker": [
          "LINE 创作者",
          "贴纸 PNG"
        ],
        "misc-notion-cover": [
          "观念",
          "封面"
        ],
        "misc-x-header": [
          "X（推特）",
          "个人主页横幅 3:1"
        ],
        "misc-linkedin-banner": [
          "领英",
          "个人资料背景 4:1"
        ],
        "misc-discord-banner": [
          "不和谐",
          "服务器横幅 16:9"
        ],
        "misc-ppt-169": [
          "幻灯片/主题演讲",
          "全高清幻灯片 16:9"
        ]
      }
    },
    "ko": {
      "messages": {
        "meta.title": "무료 온라인 이미지 변환기 | 로컬에서 일괄 변환 | Switch Image",
        "meta.description": "JPG, PNG, WebP, AVIF 및 JPEG XL을 온라인으로 일괄 변환합니다. HEIC, PSD, TIFF 및 RAW 미리 보기를 가져옵니다. 업로드하지 않고도 이미지 크기 조정, 압축 및 워터마킹이 가능합니다.",
        "nav.aria": "사이트 탐색",
        "nav.badgeMain": "100% 현지",
        "nav.badgeExtra": "· 업로드 없음",
        "nav.langAria": "인터페이스 언어 전환",
        "nav.themeTitle": "밝은 테마/어두운 테마 전환",
        "nav.infoTitle": "사이트 정보 및 설정",
        "hero.titleMain": "범용 이미지 변환기",
        "hero.subtitleHtml": "JPEG XL과 RAW 미리보기를 포함한 이미지를 기기에서 변환하세요. <strong>형식 선택 → 이미지 끌어놓기 → 다운로드</strong><span class=\"hero-sub-extra\"> — 파일은 기기 밖으로 전송되지 않습니다</span>.",
        "trust.aria": "핵심 보장",
        "trust.fastTitle": "일괄 변환",
        "trust.fastDetail": "· ZIP 다운로드",
        "trust.fastTip": "원클릭 ZIP 내보내기로 수백 개의 이미지를 드래그 앤 드롭하세요.",
        "trust.formatsTitle": "지원 형식",
        "trust.formatsDetail": "· 입력 14종, 출력 9종",
        "trust.formatsTip": "웹, 디자인, 아이콘, iPhone HEIC 형식 간에 자유롭게 전환하세요.",
        "trust.freeTitle": "가입 없이 사용",
        "trust.freeDetail": "· 무제한",
        "trust.freeTip": "로그인 또는 일일 전환 제한 없음",
        "trust.privacyTitle": "기기에서 처리",
        "trust.privacyDetail": "· 광고 없음",
        "trust.privacyTip": "완전히 무료이고, 광고가 없으며, 전적으로 기기 내에서 처리됩니다.",
        "step1.title": "출력 형식 선택",
        "step1.moreFormats": "모든 형식",
        "step1.fewerFormats": "간략히 표시",
        "step1.aria": "대상 출력 형식 선택",
        "quick.bgLabel": "투명 영역 채우기:",
        "quick.bgWhite": "화이트",
        "quick.bgBlack": "블랙",
        "quick.icoLabel": "ICO 크기(복수 선택):",
        "quick.icoCount": "{n}개 선택",
        "quick.icoPresetWeb": "웹 파비콘",
        "quick.icoPresetStd": "기본 크기 세트",
        "quick.svgModeLabel": "SVG 모드:",
        "quick.svgColorsLabel": "색상:",
        "quick.colorsUnit": "{n}색",
        "drop.headingHtml": "<strong id=\"emptyTargetFormat\">{ext}</strong>로 변환하려면 여기에 이미지를 드롭하세요.",
        "drop.subHtml": "파일 1개 직접 다운로드, 여러 파일은 ZIP으로 자동 압축 · 스크린샷을 붙여넣으려면 <strong>Ctrl + V</strong>를 누르세요.",
        "drop.selectFiles": "이미지 선택",
        "drop.selectFolder": "폴더 선택",
        "drop.supportedInput": "지원되는 입력: PNG · JPG · WebP · AVIF · GIF · ICO · SVG · BMP · HEIC · PSD · TIFF/TIF · JPEG XL · TGA · RAW",
        "decode.rawPreview": "삽입된 미리보기 {w}×{h}",
        "decode.rawMissing": "사용할 수 있는 내장 JPEG 미리보기가 없습니다. 사진 편집기에서 JPEG 또는 TIFF를 내보냅니다.",
        "decode.format.raw": "RAW, DNG, CR2, CR3, NEF 및 ARW에서 포함된 JPEG 미리 보기를 추출합니다.",
        "decode.firstPage": "1페이지만",
        "decode.psdComposite": "PSD에는 합성물이 없습니다. Photoshop에서 호환성 최대화를 활성화하고 다시 저장하십시오.",
        "decode.variant": "이 색상 모드 또는 인코딩은 지원되지 않습니다.",
        "decode.size": "파일 또는 이미지가 디코더 제한을 초과했습니다.",
        "decode.module": "디코더를 로드할 수 없습니다. 연결을 확인하세요.",
        "decode.worker": "디코더를 시작할 수 없습니다. HTTP(S)를 통해 사이트를 엽니다.",
        "decode.timeout": "디코딩 시간이 초과되었습니다.",
        "decode.failed": "이 파일을 디코딩할 수 없습니다. 손상되었거나 지원되지 않을 수 있습니다.",
        "decode.format.psd": "저장된 8비트 PSD 합성을 읽습니다.",
        "decode.format.tiff": "일반 RGB 또는 회색조 TIFF의 첫 번째 페이지를 변환합니다.",
        "decode.format.jxl": "품질과 투명도를 조정할 수 있는 스틸 이미지 JPEG XL 가져오기 및 내보내기.",
        "encode.jxlModule": "JPEG XL 인코더를 로드할 수 없습니다. 연결을 확인하세요.",
        "encode.jxlFailed": "JPEG XL 인코딩에 실패했습니다.",
        "decode.format.tga": "비압축 또는 RLE 트루 컬러 TGA를 읽습니다.",
        "drop.compactHtml": "더 많은 이미지를 드롭하고 <strong>Ctrl + V</strong>를 눌러 붙여넣거나",
        "drop.addFiles": "이미지 추가",
        "drop.addFolder": "폴더 추가",
        "dock.label": "옵션 도구:",
        "dock.basic": "화질 및 크기",
        "dock.ecommerce": "크기 템플릿",
        "dock.rename": "일괄 이름 변경",
        "dock.watermark": "워터마크",
        "dock.reconvert": "다시 변환",
        "dock.reconvertTitle": "현재 설정으로 모든 파일을 다시 변환",
        "dock.badgeEnabled": "· 사용 중",
        "dock.badgeOn": "· 켜짐",
        "dock.autoDim": "자동",
        "presets.label": "빠른 사전 설정:",
        "basic.quality": "출력 화질",
        "basic.qualityHintDefault": "권장 75% – 92%",
        "basic.qualityHintAvif": "권장 65% – 85%",
        "basic.qualityLossless": "무손실",
        "basic.qualityLosslessHint": "{label} 무손실 출력 사용",
        "basic.sizeLimit": "최대 크기(px)",
        "basic.sizeHint": "비율을 유지해 축소합니다. 비워 두면 원본 크기를 유지합니다.",
        "basic.limitHeight": "높이 제한",
        "basic.limitWidth": "너비 제한",
        "basic.limitLongest": "긴 변 제한",
        "basic.limitShortest": "짧은 변 제한",
        "basic.widthPh": "폭",
        "basic.heightPh": "높이",
        "basic.resizeMode": "크기 조정 모드",
        "basic.modeContain": "비율 유지(자르지 않음)",
        "basic.modePad": "가운데 배치 후 여백 채우기",
        "basic.modeCover": "지정 크기에 맞춰 가운데 자르기",
        "basic.bgTitle": "투명 배경",
        "basic.bgHintAlpha": "투명 배경을 유지하거나 단색으로 채웁니다.",
        "basic.bgHintNoAlpha": "{label} 형식은 투명 배경을 지원하지 않아 배경색을 자동으로 채웁니다.",
        "basic.bgTransparent": "투명한 배경 유지",
        "basic.bgFill": "단색으로 채우기",
        "tpl.searchPh": "검색: Google 양식, FB, 1080...",
        "tpl.suffix": "파일 이름 접미사",
        "tpl.suffixName": "템플릿 이름",
        "tpl.suffixSize": "크기(WxH)",
        "tpl.suffixDigits": "일련번호 자릿수",
        "tpl.suffixOff": "일련번호 없음",
        "tpl.resetSize": "크기 재설정",
        "tpl.empty": "'{q}'와 일치하는 템플릿이 없습니다. 다른 카테고리를 시도하거나 검색을 삭제하세요.",
        "tpl.modePad": "가운데 배치 및 여백 채우기",
        "tpl.modeCover": "가운데 자르기",
        "tpl.modeContain": "비율 유지",
        "rename.prefix": "접두사",
        "rename.prefixHint": "파일 이름 앞에 추가",
        "rename.prefixPh": "예를 들어 가게_",
        "rename.suffix": "접미사",
        "rename.suffixHint": "확장자 앞에 추가",
        "rename.suffixPh": "예를 들어 _800px",
        "rename.base": "공통 파일 이름",
        "rename.baseHint": "비워 두면 원래 이름 유지",
        "rename.basePh": "예를 들어 제품",
        "rename.seqToggle": "일련번호 추가",
        "rename.seqPad": "자릿수",
        "rename.reset": "이름 재설정",
        "wm.enable": "워터마크 활성화(모든 비ICO 출력에 적용)",
        "wm.type": "종류",
        "wm.typeText": "텍스트 워터마크",
        "wm.typeImage": "이미지 로고 워터마크",
        "wm.position": "위치",
        "wm.posBR": "오른쪽 하단",
        "wm.posBL": "왼쪽 하단",
        "wm.posTR": "오른쪽 상단",
        "wm.posTL": "왼쪽 상단",
        "wm.posCenter": "가운데",
        "wm.posTile": "대각선으로 반복",
        "wm.opacity": "불투명도",
        "wm.angle": "각도",
        "wm.text": "워터마크 텍스트",
        "wm.textPh": "브랜드 또는 저작권 텍스트를 입력하세요.",
        "wm.fontSize": "글꼴 크기",
        "wm.color": "텍스트 색상",
        "wm.uploadLogo": "로고 업로드",
        "wm.chooseLogo": "로고 선택",
        "wm.logoHint": "투명한 PNG 또는 SVG 권장",
        "wm.logoLoaded": "로드됨: {name} ({w}×{h})",
        "wm.logoScale": "로고 크기",
        "results.clear": "목록 비우기",
        "results.downloadAll": "개별 다운로드",
        "results.downloadDefault": "이미지 다운로드",
        "results.downloadSingle": "다운로드 {label}",
        "results.downloadZip": "ZIP({n} 파일) 다운로드",
        "results.downloadZipDefault": "SwitchImage_Batch.zip 다운로드",
        "results.statsCountHtml": "<strong>{total}</strong> 총 (<strong>{done}</strong> 준비)",
        "results.savedBadge": "{size} 절약 (-{pct}%)",
        "results.largerBadge": "+{size} (+{pct}%)",
        "item.saved": "-{pct}%",
        "item.larger": "+{pct}%",
        "item.converting": "변환 중…",
        "item.preview": "미리보기",
        "item.download": "다운로드",
        "item.remove": "제거",
        "item.thumbTitle": "변환된 출력을 미리 보려면 클릭하세요(자르기, 배경 및 워터마크 확인).",
        "item.formatTitle": "이 이미지의 출력 형식 재정의",
        "matrix.summary": "지원되는 14가지 형식 및 브라우저 코덱 기능 모두 보기",
        "matrix.useCases": "HEIC를 JPG로 일괄 변환하고 PSD 이미지를 PNG로 일괄 변환합니다. JPEG XL을 가져오고 내보내거나 RAW 사진에 포함된 JPEG 미리 보기를 변환하세요.",
        "matrix.readOk": "디코드",
        "matrix.readHeic": "브라우저 디코딩 또는 코덱 로드",
        "matrix.writeLocal": "로컬 인코딩",
        "matrix.writeNative": "네이티브 인코딩",
        "matrix.writeWasm": "WASM 인코딩",
        "matrix.writeReadOnly": "입력 전용",
        "matrix.writeUnsupported": "지원되지 않음",
        "footer.tip": "팁: 변환된 이미지(자르기, 배경 및 워터마크)를 미리 보려면 축소판을 클릭하거나 오른쪽 드롭다운을 사용하여 이미지별 형식을 전환하세요.",
        "footer.privacy": "Switch Image 브라우저에서 100% 로컬로 실행됩니다. · 광고 없음 · 파일이 기기를 떠나지 않습니다.",
        "sheet.title": "정보 및 설정",
        "sheet.titleDesktop": "소개",
        "sheet.closeAria": "정보 및 설정 닫기",
        "sheet.langHeading": "언어",
        "sheet.themeHeading": "테마",
        "sheet.themeLight": "라이트 모드",
        "sheet.themeDark": "다크 모드",
        "sheet.themeSystem": "시스템 설정 따르기",
        "sheet.matrixHeading": "지원 형식과 브라우저 기능",
        "about.tagline": "브라우저에서 사용하는 이미지 변환 도구",
        "about.infoHeading": "처리 방식 및 개인정보 보호",
        "about.processingLabel": "처리 방식",
        "about.processingVal": "브라우저에서 처리",
        "about.privacyLabel": "개인 정보 보호",
        "about.privacyVal": "제로 업로드 · 추적 없음",
        "about.stackLabel": "기술 구성",
        "about.shortcutsLabel": "단축키",
        "about.shortcutsHtml": "<kbd>Ctrl</kbd>+<kbd>V</kbd> 붙여넣기 · <kbd>Esc</kbd> 닫기",
        "modal.title": "출력 미리보기",
        "modal.closeAria": "미리보기 닫기",
        "modal.downloadThis": "다운로드 {label}",
        "modal.downloadFallback": "파일 다운로드",
        "modal.meta": "{label} {outSize} ({w}×{h}) | 원본 {origSize} ({delta}) | 100% 이미지를 클릭하세요",
        "modal.hint": "100% 실제 크기로 전환하려면 이미지를 클릭하세요.",
        "compat.noWebp": "귀하의 브라우저는 기본 WebP 인코딩을 지원하지 않습니다. PNG, JPG, GIF, ICO, SVG 및 BMP는 계속해서 완벽하게 사용할 수 있습니다.",
        "toast.reconverted": "업데이트된 설정을 적용하고 다시 변환했습니다.",
        "toast.skipped": "{added} 이미지 추가됨({skipped} 이미지가 아닌 파일 생략)",
        "toast.pasted": "클립보드에서 {n} 이미지를 붙여넣었습니다.",
        "toast.downloadedSeq": "{n} 파일을 개별적으로 다운로드함",
        "toast.downloadedOne": "다운로드됨 {name}",
        "toast.zipDone": "SwitchImage_Batch.zip에 {n} 이미지 압축",
        "toast.zipFail": "ZIP 내보내기 실패: {msg}",
        "toast.presetApplied": "프리셋 \"{name}\" 적용 ({tag})",
        "toast.templateApplied": "\"{platform} {name}\" 적용 ({w}×{h})",
        "toast.templateReset": "크기 제약이 지워졌습니다.",
        "toast.renameReset": "명명 규칙이 지워졌습니다.",
        "toast.logoError": "워터마크 로고 이미지를 읽을 수 없습니다.",
        "toast.icoMinOne": "최소 1개의 ICO 크기를 선택하세요.",
        "err404.pageTitle": "404 페이지를 찾을 수 없음 — Switch Image",
        "err404.heading": "페이지를 찾을 수 없음",
        "err404.desc": "링크가 변경 또는 삭제되었거나 주소가 잘못되었을 수 있습니다. 홈으로 돌아가 이미지 변환을 계속하세요.",
        "err404.pathLabel": "요청 경로: {path}",
        "err404.goHome": "홈으로",
        "err404.goBack": "돌아가기",
        "err404.formatsNote": "JPEG XL, HEIC, PSD, TIFF, TGA 및 RAW 미리 보기를 위한 로컬 변환",
        "pwa.win.title": "Windows용 Switch Image 설치",
        "pwa.win.desc": "완전한 오프라인 지원을 통해 자체 창에서 시작 또는 데스크탑에서 바로 실행하세요.",
        "pwa.mac.title": "Mac 데스크탑 앱 설치",
        "pwa.mac.desc": "기본 Mac 유틸리티처럼 빠르게 오프라인 캐싱을 사용하여 전용 창에서 실행하세요.",
        "pwa.macSafari.title": "Mac Dock에 Switch Image 추가",
        "pwa.macSafari.desc": "Safari에서 파일 → Dock에 추가를 선택하여 Switch Image를 오프라인 앱으로 실행하세요.",
        "pwa.ios.title": "iPhone/iPad 홈 화면에 추가",
        "pwa.ios.desc": "아래의 공유 아이콘을 탭한 다음 오프라인 앱 액세스를 위해 \"홈 화면에 추가\"를 선택하세요.",
        "pwa.android.title": "홈 화면에 설치",
        "pwa.android.desc": "홈 화면에서 한 번의 탭으로 액세스할 수 있는 경량의 오프라인 지원 일괄 변환기입니다.",
        "pwa.linux.title": "데스크톱 앱 설치",
        "pwa.linux.desc": "전체 오프라인 로컬 이미지 변환 기능을 갖춘 독립형 창에서 실행하세요.",
        "pwa.desktop.title": "오프라인 앱 설치",
        "pwa.desktop.desc": "즉각적인 로컬 변환을 위해 오프라인 캐싱이 포함된 전용 창에서 실행하세요.",
        "pwa.entry.windows": "윈도우 앱 설치",
        "pwa.entry.macos": "맥 앱 설치",
        "pwa.entry.macSafari": "Mac Dock에 추가",
        "pwa.entry.ios": "홈 화면에 추가",
        "pwa.entry.android": "안드로이드 앱 설치",
        "pwa.entry.desktop": "오프라인 앱 설치",
        "pwa.cta.install": "설치",
        "pwa.cta.installMobile": "지금 설치",
        "pwa.cta.gotIt": "확인",
        "pwa.cta.later": "나중에",
        "pwa.toastInstalled": "Switch Image를 설치했습니다. 기기에서 바로 열 수 있습니다."
      },
      "formats": {
        "webp": {
          "badge": "추천",
          "desc": "용량이 작고 투명 배경을 지원해 웹과 앱에 적합합니다."
        },
        "png": {
          "badge": "무손실",
          "desc": "투명 배경을 살리는 무손실 압축으로 UI, 로고, 스크린샷에 적합합니다."
        },
        "jpg": {
          "badge": "높은 호환성",
          "desc": "대부분의 기기에서 열 수 있어 사진에 적합합니다. 투명 영역은 배경색으로 채웁니다."
        },
        "avif": {
          "badge": "고압축",
          "desc": "AV1로 압축해 용량을 줄이고 투명 배경도 지원합니다."
        },
        "gif": {
          "badge": "256색",
          "desc": "최대 256색과 단색 투명도를 지원합니다."
        },
        "ico": {
          "badge": "여러 크기",
          "desc": "여러 크기의 아이콘을 ICO 파일 하나로 묶어 웹 파비콘으로 사용할 수 있습니다."
        },
        "svg": {
          "badge": "두 가지 모드",
          "desc": "SVG를 비트맵으로 변환하거나 비트맵을 SVG에 삽입 또는 벡터화할 수 있습니다."
        },
        "bmp": {
          "badge": "비압축",
          "desc": "이전 소프트웨어와 호환되는 표준 Windows 24비트 BMP입니다."
        },
        "heic": {
          "badge": "입력 전용",
          "desc": "iPhone의 HEIC 또는 HEIF 사진을 JPG, PNG, WebP 등으로 변환합니다."
        }
      },
      "options": {
        "ico": {
          "16": "싱글 16×16",
          "32": "싱글 32×32",
          "48": "싱글 48×48",
          "64": "싱글 64×64",
          "128": "싱글 128×128",
          "256": "싱글 256×256",
          "multi": "표준 멀티 사이즈 (16 / 32 / 48 / 256px)",
          "favicon": "컴팩트 웹 파비콘 (16 / 32 / 48px)"
        },
        "svg": {
          "embed": "원본 이미지 삽입(무손실)",
          "vector": "벡터 변환(아이콘 및 로고용)"
        },
        "presets": {
          "web-webp": {
            "name": "웹용 이미지",
            "tag": "WebP · 85%"
          },
          "ultra-avif": {
            "name": "고효율 압축",
            "tag": "AVIF · 75%"
          },
          "photo-jpg": {
            "name": "일반 사진",
            "tag": "JPG · 90%"
          },
          "lossless-png": {
            "name": "무손실 투명 이미지",
            "tag": "PNG · 무손실"
          },
          "site-ico": {
            "name": "웹 파비콘",
            "tag": "ICO · 여러 크기"
          },
          "vector-svg": {
            "name": "로고 벡터 변환",
            "tag": "SVG · 벡터화"
          },
          "social-1920": {
            "name": "SNS 공유 이미지",
            "tag": "JPG · 1920 px"
          }
        },
        "categories": {
          "all": "모두",
          "ecommerce": "쇼핑몰",
          "fb": "페이스북",
          "ig": "인스타그램",
          "yt": "유튜브",
          "seo": "SEO / 웹",
          "misc": "양식 / LINE / 기타"
        }
      },
      "templates": {
        "shopee-800": [
          "쇼피",
          "기본 정사각형 상품 이미지"
        ],
        "shopee-1024": [
          "쇼피",
          "HD 제품 이미지"
        ],
        "shopee-banner": [
          "쇼피",
          "스토어 캐러셀 배너"
        ],
        "momo-pchome": [
          "momo / PC홈",
          "정사각형 상품 대표 이미지"
        ],
        "pinkoi-711": [
          "핀코이 / 마이십",
          "정사각형 상품 상세 이미지"
        ],
        "amazon-2000": [
          "아마존",
          "고해상도 정사각형 상품 이미지"
        ],
        "shopify-2048": [
          "쇼피파이",
          "스토어용 정사각형 상품 이미지"
        ],
        "fb-post-square": [
          "페이스북",
          "정사각형 게시물 1:1"
        ],
        "fb-post-portrait": [
          "페이스북",
          "세로형 게시물 4:5"
        ],
        "fb-post-landscape": [
          "페이스북",
          "가로형 링크 게시물"
        ],
        "fb-page-cover": [
          "페이스북",
          "페이지 커버(기본)"
        ],
        "fb-page-cover-hd": [
          "페이스북",
          "페이지 표지 2x HD"
        ],
        "fb-group-cover": [
          "페이스북",
          "그룹 표지 배너"
        ],
        "fb-event-cover": [
          "페이스북",
          "이벤트 커버"
        ],
        "fb-story-reels": [
          "페이스북",
          "스토리 / 릴스 9:16"
        ],
        "ig-square": [
          "인스타그램",
          "정사각형 게시물 1:1"
        ],
        "ig-portrait-45": [
          "인스타그램",
          "세로형 게시물 4:5"
        ],
        "ig-grid-34": [
          "인스타그램",
          "프로필 그리드 3:4"
        ],
        "ig-landscape": [
          "인스타그램",
          "가로형 게시물 1.91:1"
        ],
        "ig-story": [
          "인스타그램",
          "스토리 / 릴스 9:16"
        ],
        "ig-avatar-highlight": [
          "인스타그램",
          "아바타 / 하이라이트 커버"
        ],
        "yt-thumb-hd": [
          "유튜브",
          "썸네일 16:9 HD"
        ],
        "yt-thumb-fhd": [
          "유튜브",
          "썸네일 풀 HD"
        ],
        "yt-banner-tv": [
          "유튜브",
          "채널 배너(TV)"
        ],
        "yt-banner-safe": [
          "유튜브",
          "배너 안전 구역"
        ],
        "yt-shorts": [
          "유튜브",
          "Shorts 커버 9:16"
        ],
        "yt-avatar": [
          "유튜브",
          "채널 아바타"
        ],
        "yt-watermark": [
          "유튜브",
          "구독 워터마크"
        ],
        "seo-og-share": [
          "오픈 그래프",
          "OG 공유 미리보기"
        ],
        "seo-google-discover": [
          "구글 디스커버",
          "Discover 커버 4:3"
        ],
        "seo-twitter-card": [
          "X (트위터) 카드",
          "요약 큰 이미지"
        ],
        "seo-blog-hero": [
          "블로그 / 워드프레스",
          "게시글 대표 이미지 16:9"
        ],
        "seo-pwa-512": [
          "웹/PWA",
          "앱 아이콘 512px"
        ],
        "seo-apple-touch": [
          "애플 iOS",
          "Apple Touch 아이콘"
        ],
        "seo-favicon-ico": [
          "웹사이트 파비콘",
          "다양한 크기의 favicon.ico"
        ],
        "misc-google-forms": [
          "구글 양식",
          "헤더 배너 4:1"
        ],
        "misc-google-classroom": [
          "구글 클래스룸",
          "클래스 헤더 4:1"
        ],
        "misc-line-richmenu-lg": [
          "라인 공식",
          "대형 리치 메뉴"
        ],
        "misc-line-richmenu-sm": [
          "라인 공식",
          "소형 리치 메뉴"
        ],
        "misc-line-sticker": [
          "LINE 크리에이터스",
          "스티커 투명 PNG"
        ],
        "misc-notion-cover": [
          "개념",
          "페이지 표지"
        ],
        "misc-x-header": [
          "엑스(트위터)",
          "프로필 헤더 3:1"
        ],
        "misc-linkedin-banner": [
          "링크드인",
          "프로필 배경 4:1"
        ],
        "misc-discord-banner": [
          "불화",
          "서버 배너 16:9"
        ],
        "misc-ppt-169": [
          "슬라이드/키노트",
          "풀 HD 슬라이드 16:9"
        ]
      }
    },
    "th": {
      "messages": {
        "meta.title": "แปลงรูปภาพออนไลน์ฟรีและแปลงพร้อมกันหลายไฟล์ | Switch Image",
        "meta.description": "ชุดแปลง JPG, PNG, WebP, AVIF และ JPEG XL ออนไลน์ นำเข้าตัวอย่าง HEIC, PSD, TIFF และ RAW ปรับขนาด บีบอัด และใส่ลายน้ำรูปภาพโดยไม่ต้องอัปโหลด",
        "nav.aria": "การนำทางไซต์",
        "nav.badgeMain": "ท้องถิ่น 100%",
        "nav.badgeExtra": "· ไม่มีการอัพโหลด",
        "nav.langAria": "สลับภาษาอินเทอร์เฟซ",
        "nav.themeTitle": "สลับธีมสว่าง / มืด",
        "nav.infoTitle": "ข้อมูลไซต์และการตั้งค่า",
        "hero.titleMain": "โปรแกรมแปลงรูปภาพสากล",
        "hero.subtitleHtml": "แปลงรูปภาพในเครื่อง รวมถึงการแสดงตัวอย่าง JPEG XL และ RAW <strong>เลือกรูปแบบ → วางภาพ → ดาวน์โหลด</strong><span class=\"hero-sub-extra\"> — ไฟล์จะไม่มีวันออกจากอุปกรณ์ของคุณ</span>",
        "trust.aria": "การค้ำประกันหลัก",
        "trust.fastTitle": "แปลงหลายไฟล์",
        "trust.fastDetail": "· ดาวน์โหลดเป็น ZIP",
        "trust.fastTip": "ลากและวางรูปภาพนับร้อยด้วยการส่งออก ZIP เพียงคลิกเดียว",
        "trust.formatsTitle": "รูปแบบที่รองรับ",
        "trust.formatsDetail": "· รองรับไฟล์ต้นฉบับ 14 กลุ่ม ส่งออกได้ 9 รูปแบบ",
        "trust.formatsTip": "สลับได้อย่างอิสระทั้งบนเว็บ การออกแบบ ไอคอน และรูปแบบ HEIC ของ iPhone",
        "trust.freeTitle": "ไม่ต้องสมัคร",
        "trust.freeDetail": "· ไม่จำกัด",
        "trust.freeTip": "ไม่มีการจำกัดการเข้าสู่ระบบหรือการแปลงรายวัน",
        "trust.privacyTitle": "ประมวลผลบนอุปกรณ์",
        "trust.privacyDetail": "·ไม่มีโฆษณา",
        "trust.privacyTip": "ฟรี ไม่มีโฆษณา และประมวลผลบนอุปกรณ์ทั้งหมด",
        "step1.title": "เลือกรูปแบบผลลัพธ์",
        "step1.moreFormats": "ทุกรูปแบบ",
        "step1.fewerFormats": "แสดงให้น้อยลง",
        "step1.aria": "เลือกรูปแบบผลลัพธ์เป้าหมาย",
        "quick.bgLabel": "เติมสีในพื้นที่โปร่งใส:",
        "quick.bgWhite": "ขาว",
        "quick.bgBlack": "สีดำ",
        "quick.icoLabel": "ขนาด ICO (เลือกได้หลายขนาด):",
        "quick.icoCount": "เลือกแล้ว {n} ขนาด",
        "quick.icoPresetWeb": "เว็บฟาวิคอน",
        "quick.icoPresetStd": "ชุดขนาดมาตรฐาน",
        "quick.svgModeLabel": "โหมด SVG:",
        "quick.svgColorsLabel": "สี:",
        "quick.colorsUnit": "{n} สี",
        "drop.headingHtml": "วางรูปภาพที่นี่เพื่อแปลงเป็น <strong id=\"emptyTargetFormat\">{ext}</strong>",
        "drop.subHtml": "ดาวน์โหลดไฟล์โดยตรง 1 ไฟล์ หลายไฟล์บรรจุอัตโนมัติเป็น ZIP · กด <strong>Ctrl + V</strong> เพื่อวางภาพหน้าจอ",
        "drop.selectFiles": "เลือกรูปภาพ",
        "drop.selectFolder": "เลือกโฟลเดอร์",
        "drop.supportedInput": "อินพุตที่รองรับ: PNG · JPG · WebP · AVIF · GIF · ICO · SVG · BMP · HEIC · PSD · TIFF/TIF · JPEG XL · TGA · RAW",
        "decode.rawPreview": "ตัวอย่างแบบฝัง {w}×{h}",
        "decode.rawMissing": "ไม่มีการแสดงตัวอย่าง JPEG แบบฝังที่ใช้งานได้ ส่งออก JPEG หรือ TIFF จากโปรแกรมแก้ไขรูปภาพของคุณ",
        "decode.format.raw": "แยกตัวอย่าง JPEG ที่ฝังมาจาก RAW, DNG, CR2, CR3, NEF และ ARW",
        "decode.firstPage": "หน้าที่ 1 เท่านั้น",
        "decode.psdComposite": "PSD ไม่มีคอมโพสิต เปิดใช้งานการขยายความเข้ากันได้สูงสุดใน Photoshop แล้วบันทึกอีกครั้ง",
        "decode.variant": "ไม่รองรับโหมดสีหรือการเข้ารหัสนี้",
        "decode.size": "ไฟล์หรือรูปภาพเกินขีดจำกัดตัวถอดรหัส",
        "decode.module": "ไม่สามารถโหลดตัวถอดรหัสได้ ตรวจสอบการเชื่อมต่อของคุณ",
        "decode.worker": "ไม่สามารถเริ่มตัวถอดรหัสได้ เปิดไซต์ผ่าน HTTP(S)",
        "decode.timeout": "การถอดรหัสหมดเวลา",
        "decode.failed": "ไม่สามารถถอดรหัสไฟล์นี้ได้ อาจเสียหายหรือไม่ได้รับการสนับสนุน",
        "decode.format.psd": "อ่านคอมโพสิต PSD 8 บิตที่บันทึกไว้",
        "decode.format.tiff": "แปลงหน้าแรกของ RGB หรือ TIFF ระดับสีเทาทั่วไป",
        "decode.format.jxl": "นำเข้าและส่งออกภาพนิ่ง JPEG XL พร้อมคุณภาพและความโปร่งใสที่ปรับได้",
        "encode.jxlModule": "ไม่สามารถโหลดตัวเข้ารหัส JPEG XL ตรวจสอบการเชื่อมต่อของคุณ",
        "encode.jxlFailed": "การเข้ารหัส JPEG XL ล้มเหลว",
        "decode.format.tga": "อ่าน TGA สีจริงที่ไม่มีการบีบอัดหรือ RLE",
        "drop.compactHtml": "วางภาพเพิ่มเติม กด <strong>Ctrl + V</strong> เพื่อวาง หรือ",
        "drop.addFiles": "เพิ่มรูปภาพ",
        "drop.addFolder": "เพิ่มโฟลเดอร์",
        "dock.label": "เครื่องมือเสริม:",
        "dock.basic": "คุณภาพและขนาด",
        "dock.ecommerce": "เทมเพลตขนาดภาพ",
        "dock.rename": "เปลี่ยนชื่อหลายไฟล์",
        "dock.watermark": "ลายน้ำ",
        "dock.reconvert": "แปลงอีกครั้ง",
        "dock.reconvertTitle": "แปลงไฟล์ทั้งหมดใหม่ด้วยการตั้งค่าปัจจุบัน",
        "dock.badgeEnabled": "· ใช้งานอยู่",
        "dock.badgeOn": "· เปิด",
        "dock.autoDim": "อัตโนมัติ",
        "presets.label": "การตั้งค่าล่วงหน้าด่วน:",
        "basic.quality": "คุณภาพของไฟล์ที่ได้",
        "basic.qualityHintDefault": "แนะนำ 75% – 92%",
        "basic.qualityHintAvif": "แนะนำ 65% – 85%",
        "basic.qualityLossless": "ไม่สูญเสียคุณภาพ",
        "basic.qualityLosslessHint": "{label} ใช้เอาต์พุตแบบไม่สูญเสียข้อมูล",
        "basic.sizeLimit": "ขนาดสูงสุด (px)",
        "basic.sizeHint": "ย่อภาพโดยคงสัดส่วน เว้นว่างเพื่อใช้ขนาดเดิม",
        "basic.limitHeight": "จำกัดความสูง",
        "basic.limitWidth": "จำกัดความกว้าง",
        "basic.limitLongest": "จำกัดด้านยาว",
        "basic.limitShortest": "จำกัดด้านสั้น",
        "basic.widthPh": "ความกว้าง",
        "basic.heightPh": "ความสูง",
        "basic.resizeMode": "โหมดปรับขนาด",
        "basic.modeContain": "ปรับให้พอดีโดยคงสัดส่วน",
        "basic.modePad": "จัดกึ่งกลางและเติมขอบ",
        "basic.modeCover": "ครอปกึ่งกลางตามขนาดที่กำหนด",
        "basic.bgTitle": "พื้นหลังโปร่งใส",
        "basic.bgHintAlpha": "คงพื้นหลังโปร่งใสหรือเติมสีพื้น",
        "basic.bgHintNoAlpha": "{label} ไม่รองรับพื้นหลังโปร่งใส ระบบจะเติมสีพื้นให้อัตโนมัติ",
        "basic.bgTransparent": "เก็บพื้นหลังโปร่งใส",
        "basic.bgFill": "เติมด้วยสีทึบ",
        "tpl.searchPh": "ค้นหา: Google Forms, FB, 1080...",
        "tpl.suffix": "ส่วนต่อท้ายชื่อไฟล์",
        "tpl.suffixName": "ชื่อเทมเพลต",
        "tpl.suffixSize": "ขนาด (กxส)",
        "tpl.suffixDigits": "จำนวนหลักของเลขลำดับ",
        "tpl.suffixOff": "ไม่ใส่เลขลำดับ",
        "tpl.resetSize": "รีเซ็ตขนาด",
        "tpl.empty": "ไม่มีเทมเพลตที่ตรงกับ \"{q}\" ลองหมวดหมู่อื่นหรือล้างการค้นหา",
        "tpl.modePad": "จัดกึ่งกลางและเติมขอบ",
        "tpl.modeCover": "ครอปกึ่งกลาง",
        "tpl.modeContain": "ปรับขนาดโดยคงสัดส่วน",
        "rename.prefix": "คำนำหน้า",
        "rename.prefixHint": "เพิ่มหน้าชื่อไฟล์",
        "rename.prefixPh": "เช่น ร้านค้า_",
        "rename.suffix": "คำต่อท้าย",
        "rename.suffixHint": "เพิ่มก่อนนามสกุลไฟล์",
        "rename.suffixPh": "เช่น _800px",
        "rename.base": "ชื่อไฟล์หลัก",
        "rename.baseHint": "เว้นว่างเพื่อใช้ชื่อเดิม",
        "rename.basePh": "เช่น สินค้า",
        "rename.seqToggle": "เพิ่มหมายเลขลำดับ",
        "rename.seqPad": "จำนวนหลัก",
        "rename.reset": "รีเซ็ตการตั้งชื่อ",
        "wm.enable": "เปิดใช้งานลายน้ำ (ใช้กับเอาต์พุตที่ไม่ใช่ ICO ทั้งหมด)",
        "wm.type": "ประเภท",
        "wm.typeText": "ลายน้ำข้อความ",
        "wm.typeImage": "ภาพลายน้ำโลโก้",
        "wm.position": "ตำแหน่ง",
        "wm.posBR": "ล่างขวา",
        "wm.posBL": "ล่างซ้าย",
        "wm.posTR": "ขวาบน",
        "wm.posTL": "ซ้ายบน",
        "wm.posCenter": "กึ่งกลาง",
        "wm.posTile": "วางซ้ำแนวทแยง",
        "wm.opacity": "ความทึบ",
        "wm.angle": "มุม",
        "wm.text": "ข้อความลายน้ำ",
        "wm.textPh": "ป้อนข้อความของแบรนด์หรือลิขสิทธิ์",
        "wm.fontSize": "ขนาดตัวอักษร",
        "wm.color": "สีข้อความ",
        "wm.uploadLogo": "อัพโหลดโลโก้",
        "wm.chooseLogo": "เลือกโลโก้",
        "wm.logoHint": "แนะนำให้ใช้ PNG หรือ SVG แบบโปร่งใส",
        "wm.logoLoaded": "โหลดแล้ว: {name} ({w}×{h})",
        "wm.logoScale": "ขนาดโลโก้",
        "results.clear": "ล้างรายการ",
        "results.downloadAll": "ดาวน์โหลดทีละรายการ",
        "results.downloadDefault": "ดาวน์โหลดรูปภาพ",
        "results.downloadSingle": "ดาวน์โหลด {label}",
        "results.downloadZip": "ดาวน์โหลด ZIP ({n} ไฟล์)",
        "results.downloadZipDefault": "ดาวน์โหลด SwitchImage_Batch.zip",
        "results.statsCountHtml": "<strong>{total}</strong> รวม (<strong>{done}</strong> พร้อม)",
        "results.savedBadge": "ประหยัด {size} (-{pct}%)",
        "results.largerBadge": "+{size} (+{pct}%)",
        "item.saved": "-{pct}%",
        "item.larger": "+{pct}%",
        "item.converting": "กำลังแปลง...",
        "item.preview": "ดูตัวอย่าง",
        "item.download": "ดาวน์โหลด",
        "item.remove": "ลบ",
        "item.thumbTitle": "คลิกเพื่อดูตัวอย่างผลลัพธ์ที่แปลงแล้ว (ตรวจสอบการครอบตัด พื้นหลัง และลายน้ำ)",
        "item.formatTitle": "แทนที่รูปแบบเอาต์พุตสำหรับรูปภาพนี้",
        "matrix.summary": "ดูรูปแบบที่รองรับทั้งหมด 14 รูปแบบและความสามารถตัวแปลงสัญญาณของเบราว์เซอร์",
        "matrix.useCases": "แปลง HEIC เป็น JPG และภาพรวมจาก PSD เป็น PNG พร้อมกันหลายไฟล์ นำเข้าและส่งออก JPEG XL หรือแปลงภาพตัวอย่าง JPEG ที่ฝังอยู่ในไฟล์ RAW",
        "matrix.readOk": "ถอดรหัส",
        "matrix.readHeic": "ถอดรหัสในเบราว์เซอร์หรือโหลดตัวถอดรหัส",
        "matrix.writeLocal": "เข้ารหัสท้องถิ่น",
        "matrix.writeNative": "เข้ารหัสเนทิฟ",
        "matrix.writeWasm": "เข้ารหัส WASM",
        "matrix.writeReadOnly": "นำเข้าได้อย่างเดียว",
        "matrix.writeUnsupported": "ไม่รองรับ",
        "footer.tip": "เคล็ดลับ: คลิกภาพขนาดย่อเพื่อดูตัวอย่างภาพที่แปลงแล้ว (ครอบตัด พื้นหลัง และลายน้ำ) หรือใช้เมนูแบบเลื่อนลงทางขวาเพื่อเปลี่ยนรูปแบบต่อภาพ",
        "footer.privacy": "Switch Image ทำงาน 100% ภายในเบราว์เซอร์ของคุณ · ไม่มีโฆษณา · ไฟล์ของคุณจะไม่มีวันออกจากอุปกรณ์ของคุณ",
        "sheet.title": "เกี่ยวกับและการตั้งค่า",
        "sheet.titleDesktop": "เกี่ยวกับ",
        "sheet.closeAria": "ปิดเกี่ยวกับ & การตั้งค่า",
        "sheet.langHeading": "ภาษา",
        "sheet.themeHeading": "ธีม",
        "sheet.themeLight": "โหมดสว่าง",
        "sheet.themeDark": "โหมดมืด",
        "sheet.themeSystem": "ตามการตั้งค่าระบบ",
        "sheet.matrixHeading": "รูปแบบที่รองรับและความสามารถของเบราว์เซอร์",
        "about.tagline": "เครื่องมือแปลงรูปภาพในเบราว์เซอร์",
        "about.infoHeading": "การประมวลผลและความเป็นส่วนตัว",
        "about.processingLabel": "วิธีประมวลผล",
        "about.processingVal": "ประมวลผลทั้งหมดในเบราว์เซอร์",
        "about.privacyLabel": "ความเป็นส่วนตัว",
        "about.privacyVal": "การอัปโหลดเป็นศูนย์ · ไม่มีการติดตาม",
        "about.stackLabel": "เทคโนโลยีที่ใช้",
        "about.shortcutsLabel": "ทางลัด",
        "about.shortcutsHtml": "<kbd>Ctrl</kbd>+<kbd>V</kbd> วาง · <kbd>Esc</kbd> ปิด",
        "modal.title": "ดูตัวอย่างผลลัพธ์",
        "modal.closeAria": "ปิดการแสดงตัวอย่าง",
        "modal.downloadThis": "ดาวน์โหลด {label}",
        "modal.downloadFallback": "ดาวน์โหลดไฟล์",
        "modal.meta": "{label} {outSize} ({w}×{h}) | ต้นฉบับ {origSize} ({delta}) | คลิกที่ภาพ 100%",
        "modal.hint": "คลิกที่ภาพเพื่อสลับขนาดจริง 100%",
        "compat.noWebp": "เบราว์เซอร์ของคุณไม่รองรับการเข้ารหัส WebP ดั้งเดิม PNG, JPG, GIF, ICO, SVG และ BMP ยังคงใช้งานได้เต็มรูปแบบ",
        "toast.reconverted": "ใช้การตั้งค่าที่อัปเดตและแปลงใหม่",
        "toast.skipped": "เพิ่ม {added} รูปภาพ (ข้าม {skipped} ไฟล์ที่ไม่ใช่รูปภาพ)",
        "toast.pasted": "วาง {n} รูปภาพจากคลิปบอร์ดแล้ว",
        "toast.downloadedSeq": "ดาวน์โหลด {n} ไฟล์ทีละไฟล์แล้ว",
        "toast.downloadedOne": "ดาวน์โหลดแล้ว {name}",
        "toast.zipDone": "บรรจุ {n} รูปภาพลงใน SwitchImage_Batch.zip",
        "toast.zipFail": "การส่งออก ZIP ล้มเหลว: {msg}",
        "toast.presetApplied": "ใช้ค่าที่ตั้งล่วงหน้า \"{name}\" ({tag})",
        "toast.templateApplied": "ใช้ \"{platform} {name}\" ({w}×{h})",
        "toast.templateReset": "ล้างข้อจำกัดด้านขนาดแล้ว",
        "toast.renameReset": "ล้างกฎการตั้งชื่อแล้ว",
        "toast.logoError": "ไม่สามารถอ่านรูปภาพโลโก้ลายน้ำได้",
        "toast.icoMinOne": "เลือกขนาด ICO อย่างน้อย 1 ขนาด",
        "err404.pageTitle": "ไม่พบหน้า 404 — Switch Image",
        "err404.heading": "ไม่พบเพจ",
        "err404.desc": "ลิงก์อาจถูกย้าย ลบ หรือพิมพ์ผิด กลับไปหน้าแรกเพื่อแปลงรูปภาพต่อ",
        "err404.pathLabel": "เส้นทางที่ร้องขอ: {path}",
        "err404.goHome": "กลับหน้าแรก",
        "err404.goBack": "กลับไป",
        "err404.formatsNote": "การแปลงไฟล์ในเครื่องสำหรับการแสดงตัวอย่าง JPEG XL, HEIC, PSD, TIFF, TGA และ RAW",
        "pwa.win.title": "ติดตั้ง Switch Image สำหรับ Windows",
        "pwa.win.desc": "เปิดตัวโดยตรงจาก Start หรือ Desktop ในหน้าต่างของตัวเองพร้อมการสนับสนุนออฟไลน์เต็มรูปแบบ",
        "pwa.mac.title": "ติดตั้งแอป Mac Desktop",
        "pwa.mac.desc": "ทำงานในหน้าต่างเฉพาะที่มีการแคชแบบออฟไลน์ รวดเร็วเหมือนกับยูทิลิตี้ Mac แบบเนทีฟ",
        "pwa.macSafari.title": "เพิ่ม Switch Image ไปที่ Mac Dock",
        "pwa.macSafari.desc": "ใน Safari ให้เลือกไฟล์ → เพิ่มลงใน Dock เพื่อเปิด Switch Image เป็นแอปออฟไลน์",
        "pwa.ios.title": "เพิ่มไปที่หน้าจอโฮมของ iPhone / iPad",
        "pwa.ios.desc": "แตะไอคอนแชร์ด้านล่าง จากนั้นเลือก \"เพิ่มไปที่หน้าจอหลัก\" เพื่อเข้าถึงแอปแบบออฟไลน์",
        "pwa.android.title": "ติดตั้งไปที่หน้าจอหลัก",
        "pwa.android.desc": "ตัวแปลงแบตช์น้ำหนักเบาและพร้อมใช้งานออฟไลน์สามารถเข้าถึงได้ด้วยการแตะเพียงครั้งเดียวจากหน้าจอหลักของคุณ",
        "pwa.linux.title": "ติดตั้งแอปเดสก์ท็อป",
        "pwa.linux.desc": "เปิดตัวในหน้าต่างแบบสแตนด์อโลนพร้อมการแปลงรูปภาพในเครื่องแบบออฟไลน์เต็มรูปแบบ",
        "pwa.desktop.title": "ติดตั้งแอปออฟไลน์",
        "pwa.desktop.desc": "ทำงานในหน้าต่างเฉพาะพร้อมแคชออฟไลน์สำหรับการแปลงในเครื่องทันที",
        "pwa.entry.windows": "ติดตั้งแอพ Windows",
        "pwa.entry.macos": "ติดตั้งแอพ Mac",
        "pwa.entry.macSafari": "เพิ่มลงใน Mac Dock",
        "pwa.entry.ios": "เพิ่มไปที่หน้าจอหลัก",
        "pwa.entry.android": "ติดตั้งแอพ Android",
        "pwa.entry.desktop": "ติดตั้งแอปออฟไลน์",
        "pwa.cta.install": "ติดตั้ง",
        "pwa.cta.installMobile": "ติดตั้งทันที",
        "pwa.cta.gotIt": "รับทราบ",
        "pwa.cta.later": "ไว้ทีหลัง",
        "pwa.toastInstalled": "ติดตั้ง Switch Image แล้ว เปิดจากอุปกรณ์ได้เลย"
      },
      "formats": {
        "webp": {
          "badge": "แนะนำ",
          "desc": "ไฟล์เล็ก รองรับพื้นหลังโปร่งใส เหมาะกับเว็บและแอป"
        },
        "png": {
          "badge": "ไม่สูญเสียข้อมูล",
          "desc": "บีบอัดแบบไม่สูญเสียข้อมูลและคงความโปร่งใส เหมาะกับโลโก้และภาพหน้าจอ"
        },
        "jpg": {
          "badge": "รองรับกว้าง",
          "desc": "เหมาะกับภาพถ่ายและเปิดได้บนอุปกรณ์ส่วนใหญ่ พื้นที่โปร่งใสจะถูกเติมสีพื้น"
        },
        "avif": {
          "badge": "บีบอัดสูง",
          "desc": "ใช้ AV1 เพื่อลดขนาดไฟล์และรองรับพื้นหลังโปร่งใส"
        },
        "gif": {
          "badge": "256 สี",
          "desc": "รองรับสูงสุด 256 สีและกำหนดสีโปร่งใสได้หนึ่งสี"
        },
        "ico": {
          "badge": "หลายขนาด",
          "desc": "รวมไอคอนหลายขนาดในไฟล์ ICO เดียว เหมาะสำหรับทำ favicon"
        },
        "svg": {
          "badge": "สองโหมด",
          "desc": "แปลง SVG เป็นบิตแมป หรือฝังบิตแมปใน SVG และแปลงเป็นเวกเตอร์ได้"
        },
        "bmp": {
          "badge": "ไม่บีบอัด",
          "desc": "ไฟล์ BMP ของ Windows แบบ 24 บิต เหมาะกับโปรแกรมรุ่นเก่า"
        },
        "heic": {
          "badge": "นำเข้าเท่านั้น",
          "desc": "แปลงภาพ HEIC หรือ HEIF จาก iPhone เป็น JPG, PNG, WebP และรูปแบบอื่นๆ"
        }
      },
      "options": {
        "ico": {
          "16": "เดี่ยว 16 × 16",
          "32": "เดี่ยว 32 × 32",
          "48": "เดี่ยว 48 × 48",
          "64": "เดี่ยว 64 × 64",
          "128": "เดี่ยว 128 × 128",
          "256": "เดี่ยว 256 × 256",
          "multi": "หลายขนาดมาตรฐาน (16 / 32 / 48 / 256px)",
          "favicon": "เว็บ Favicon ขนาดกะทัดรัด (16 / 32 / 48px)"
        },
        "svg": {
          "embed": "ฝังภาพต้นฉบับโดยไม่สูญเสียข้อมูล",
          "vector": "แปลงเป็นเวกเตอร์ (สำหรับไอคอนและโลโก้)"
        },
        "presets": {
          "web-webp": {
            "name": "รูปสำหรับเว็บไซต์",
            "tag": "WebP · 85%"
          },
          "ultra-avif": {
            "name": "บีบอัดไฟล์ให้เล็ก",
            "tag": "AVIF · 75%"
          },
          "photo-jpg": {
            "name": "ภาพถ่ายทั่วไป",
            "tag": "JPG · 90%"
          },
          "lossless-png": {
            "name": "ภาพโปร่งใสแบบไม่สูญเสียข้อมูล",
            "tag": "PNG · ไม่สูญเสียข้อมูล"
          },
          "site-ico": {
            "name": "ไอคอนเว็บไซต์",
            "tag": "ICO · หลายขนาด"
          },
          "vector-svg": {
            "name": "แปลงโลโก้เป็นเวกเตอร์",
            "tag": "SVG · แปลงเป็นเวกเตอร์"
          },
          "social-1920": {
            "name": "รูปสำหรับแชร์บนโซเชียล",
            "tag": "JPG · 1920 px"
          }
        },
        "categories": {
          "all": "ทั้งหมด",
          "ecommerce": "อีคอมเมิร์ซ",
          "fb": "เฟสบุ๊ค",
          "ig": "อินสตาแกรม",
          "yt": "ยูทูบ",
          "seo": "SEO / เว็บไซต์",
          "misc": "แบบฟอร์ม / LINE / อื่นๆ"
        }
      },
      "templates": {
        "shopee-800": [
          "ช้อปปี้",
          "ภาพสินค้าสี่เหลี่ยมจัตุรัสมาตรฐาน"
        ],
        "shopee-1024": [
          "ช้อปปี้",
          "ภาพผลิตภัณฑ์แบบ HD"
        ],
        "shopee-banner": [
          "ช้อปปี้",
          "แบนเนอร์สไลด์หน้าร้าน"
        ],
        "momo-pchome": [
          "โมโม่ / พีซีโฮม",
          "ภาพหลักสินค้าทรงสี่เหลี่ยมจัตุรัส"
        ],
        "pinkoi-711": [
          "ปิ่นคอย / มายชิป",
          "ภาพรายละเอียดสินค้าทรงสี่เหลี่ยมจัตุรัส"
        ],
        "amazon-2000": [
          "อเมซอน",
          "ภาพสินค้าสี่เหลี่ยมจัตุรัสความละเอียดสูง"
        ],
        "shopify-2048": [
          "Shopify",
          "ภาพสินค้าสี่เหลี่ยมจัตุรัสสำหรับหน้าร้าน"
        ],
        "fb-post-square": [
          "เฟสบุ๊ค",
          "โพสต์สี่เหลี่ยมจัตุรัส 1:1"
        ],
        "fb-post-portrait": [
          "เฟสบุ๊ค",
          "โพสต์แนวตั้ง 4:5"
        ],
        "fb-post-landscape": [
          "เฟสบุ๊ค",
          "โพสต์ลิงก์แนวนอน"
        ],
        "fb-page-cover": [
          "เฟสบุ๊ค",
          "ภาพปกเพจมาตรฐาน"
        ],
        "fb-page-cover-hd": [
          "เฟสบุ๊ค",
          "หน้าปก 2x HD"
        ],
        "fb-group-cover": [
          "เฟสบุ๊ค",
          "แบนเนอร์ปกกลุ่ม"
        ],
        "fb-event-cover": [
          "เฟสบุ๊ค",
          "หน้าปกกิจกรรม"
        ],
        "fb-story-reels": [
          "เฟสบุ๊ค",
          "สตอรี่ / Reels 9:16"
        ],
        "ig-square": [
          "อินสตาแกรม",
          "โพสต์สี่เหลี่ยมจัตุรัส 1:1"
        ],
        "ig-portrait-45": [
          "อินสตาแกรม",
          "โพสต์แนวตั้ง 4:5"
        ],
        "ig-grid-34": [
          "อินสตาแกรม",
          "กริดโปรไฟล์ 3:4"
        ],
        "ig-landscape": [
          "อินสตาแกรม",
          "โพสต์แนวนอน 1.91:1"
        ],
        "ig-story": [
          "อินสตาแกรม",
          "สตอรี่ / Reels 9:16"
        ],
        "ig-avatar-highlight": [
          "อินสตาแกรม",
          "ปกอวตาร / ไฮไลท์"
        ],
        "yt-thumb-hd": [
          "ยูทูบ",
          "ภาพขนาดย่อ 16:9 HD"
        ],
        "yt-thumb-fhd": [
          "ยูทูบ",
          "ภาพขนาดย่อแบบ Full HD"
        ],
        "yt-banner-tv": [
          "ยูทูบ",
          "แบนเนอร์ช่อง (ทีวี)"
        ],
        "yt-banner-safe": [
          "ยูทูบ",
          "แบนเนอร์พื้นที่ปลอดภัย"
        ],
        "yt-shorts": [
          "ยูทูบ",
          "ภาพปก Shorts 9:16"
        ],
        "yt-avatar": [
          "ยูทูบ",
          "อวตารของช่อง"
        ],
        "yt-watermark": [
          "ยูทูบ",
          "ลายน้ำปุ่มติดตามช่อง"
        ],
        "seo-og-share": [
          "เปิดกราฟ",
          "OG แชร์ ดูตัวอย่าง"
        ],
        "seo-google-discover": [
          "Google ค้นพบ",
          "ภาพปก Discover 4:3"
        ],
        "seo-twitter-card": [
          "การ์ด X (ทวิตเตอร์)",
          "สรุปภาพขนาดใหญ่"
        ],
        "seo-blog-hero": [
          "บล็อก / เวิร์ดเพรส",
          "ภาพปกบทความ 16:9"
        ],
        "seo-pwa-512": [
          "เว็บ/กปภ",
          "ไอคอนแอป 512px"
        ],
        "seo-apple-touch": [
          "แอปเปิล ไอโอเอส",
          "ไอคอน Apple Touch"
        ],
        "seo-favicon-ico": [
          "เว็บไซต์ Favicon",
          "favicon.ico หลายขนาด"
        ],
        "misc-google-forms": [
          "Google ฟอร์ม",
          "แบนเนอร์ส่วนหัว 4:1"
        ],
        "misc-google-classroom": [
          "Google ห้องเรียน",
          "ส่วนหัวของชั้นเรียน 4:1"
        ],
        "misc-line-richmenu-lg": [
          "ไลน์อย่างเป็นทางการ",
          "ริชเมนูขนาดใหญ่"
        ],
        "misc-line-richmenu-sm": [
          "ไลน์อย่างเป็นทางการ",
          "ริชเมนูขนาดเล็ก"
        ],
        "misc-line-sticker": [
          "ผู้สร้าง LINE",
          "สติ๊กเกอร์โปร่งใส PNG"
        ],
        "misc-notion-cover": [
          "ความคิด",
          "หน้าปก"
        ],
        "misc-x-header": [
          "เอ็กซ์ (ทวิตเตอร์)",
          "แบนเนอร์โปรไฟล์ 3:1"
        ],
        "misc-linkedin-banner": [
          "ลิงค์อิน",
          "พื้นหลังโปรไฟล์ 4:1"
        ],
        "misc-discord-banner": [
          "ความไม่ลงรอยกัน",
          "แบนเนอร์เซิร์ฟเวอร์ 16:9"
        ],
        "misc-ppt-169": [
          "สไลด์/ประเด็นสำคัญ",
          "สไลด์ Full HD 16:9"
        ]
      }
    },
    "id": {
      "messages": {
        "meta.title": "Pengonversi Gambar Online Gratis | Konversi Batch Secara Lokal | Switch Image",
        "meta.description": "Konversi batch JPG, PNG, WebP, AVIF, dan JPEG XL online. Impor pratinjau HEIC, PSD, TIFF, dan RAW. Ubah ukuran, kompres, dan tanda air pada gambar tanpa mengunggah.",
        "nav.aria": "Navigasi situs",
        "nav.badgeMain": "100% Lokal",
        "nav.badgeExtra": "· Tidak Ada Unggahan",
        "nav.langAria": "Ganti bahasa antarmuka",
        "nav.themeTitle": "Alihkan tema terang / gelap",
        "nav.infoTitle": "Info & pengaturan situs",
        "hero.titleMain": "Pengonversi Gambar Universal",
        "hero.subtitleHtml": "Konversi gambar langsung di perangkat, termasuk JPEG XL dan pratinjau RAW. <strong>Pilih format → Seret gambar → Unduh</strong><span class=\"hero-sub-extra\"> — file tetap di perangkat Anda</span>.",
        "trust.aria": "Jaminan inti",
        "trust.fastTitle": "Konversi massal",
        "trust.fastDetail": "· Unduh ZIP",
        "trust.fastTip": "Seret dan lepas ratusan gambar dengan ekspor ZIP sekali klik",
        "trust.formatsTitle": "Format yang didukung",
        "trust.formatsDetail": "· 14 kelompok format masukan, 9 format hasil",
        "trust.formatsTip": "Beralih secara bebas di seluruh format web, desain, ikon, dan iPhone HEIC",
        "trust.freeTitle": "Tanpa daftar",
        "trust.freeDetail": "· Tidak terbatas",
        "trust.freeTip": "Tidak ada batasan login atau konversi harian",
        "trust.privacyTitle": "Diproses di perangkat",
        "trust.privacyDetail": "· Tidak Ada Iklan",
        "trust.privacyTip": "Sepenuhnya gratis, bebas iklan, dan diproses seluruhnya di perangkat",
        "step1.title": "Pilih format keluaran",
        "step1.moreFormats": "Semua format",
        "step1.fewerFormats": "Tampilkan lebih sedikit",
        "step1.aria": "Pilih format keluaran target",
        "quick.bgLabel": "Isi area transparan:",
        "quick.bgWhite": "Putih",
        "quick.bgBlack": "Hitam",
        "quick.icoLabel": "Ukuran ICO (pilih beberapa):",
        "quick.icoCount": "{n} ukuran dipilih",
        "quick.icoPresetWeb": "Favikon Web",
        "quick.icoPresetStd": "Paket ukuran standar",
        "quick.svgModeLabel": "Modus SVG:",
        "quick.svgColorsLabel": "Warna:",
        "quick.colorsUnit": "{n} warna",
        "drop.headingHtml": "Letakkan gambar di sini untuk dikonversi ke <strong id=\"emptyTargetFormat\">{ext}</strong>",
        "drop.subHtml": "1 file diunduh secara langsung, beberapa file dikemas otomatis sebagai ZIP · Tekan <strong>Ctrl + V</strong> untuk menempelkan tangkapan layar",
        "drop.selectFiles": "Pilih Gambar",
        "drop.selectFolder": "Pilih Folder",
        "drop.supportedInput": "Masukan yang didukung: PNG · JPG · WebP · AVIF · GIF · ICO · SVG · BMP · HEIC · PSD · TIFF/TIF · JPEG XL · TGA · RAW",
        "decode.rawPreview": "Pratinjau tersemat {w}×{h}",
        "decode.rawMissing": "Tidak ada pratinjau JPEG tertanam yang dapat digunakan. Ekspor JPEG atau TIFF dari editor foto Anda.",
        "decode.format.raw": "Mengekstrak pratinjau JPEG yang tertanam dari RAW, DNG, CR2, CR3, NEF, dan ARW.",
        "decode.firstPage": "Halaman 1 saja",
        "decode.psdComposite": "PSD tidak memiliki komposit. Aktifkan Maksimalkan Kompatibilitas di Photoshop dan simpan lagi.",
        "decode.variant": "Mode warna atau pengkodean ini tidak didukung.",
        "decode.size": "File atau gambar melebihi batas decoder.",
        "decode.module": "Tidak dapat memuat dekoder. Periksa koneksi Anda.",
        "decode.worker": "Tidak dapat memulai dekoder. Buka situs melalui HTTP(S).",
        "decode.timeout": "Waktu penguraian kode telah habis.",
        "decode.failed": "Tidak dapat memecahkan kode file ini. Mungkin rusak atau tidak didukung.",
        "decode.format.psd": "Membaca komposit PSD 8-bit yang disimpan.",
        "decode.format.tiff": "Mengonversi halaman pertama RGB umum atau TIFF skala abu-abu.",
        "decode.format.jxl": "Impor dan ekspor gambar diam JPEG XL dengan kualitas dan transparansi yang dapat disesuaikan.",
        "encode.jxlModule": "Tidak dapat memuat encoder JPEG XL. Periksa koneksi Anda.",
        "encode.jxlFailed": "Pengodean JPEG XL gagal.",
        "decode.format.tga": "Membaca TGA warna asli yang tidak terkompresi atau RLE.",
        "drop.compactHtml": "Letakkan lebih banyak gambar, tekan <strong>Ctrl + V</strong> untuk menempelkan, atau",
        "drop.addFiles": "Tambahkan Gambar",
        "drop.addFolder": "Tambah folder",
        "dock.label": "Alat opsional:",
        "dock.basic": "Kualitas dan ukuran",
        "dock.ecommerce": "Templat ukuran",
        "dock.rename": "Ubah nama sekaligus",
        "dock.watermark": "Tanda air",
        "dock.reconvert": "Konversi ulang",
        "dock.reconvertTitle": "Konversikan kembali semua file dengan pengaturan saat ini",
        "dock.badgeEnabled": "· Aktif",
        "dock.badgeOn": "· Aktif",
        "dock.autoDim": "Otomatis",
        "presets.label": "Preset cepat:",
        "basic.quality": "Kualitas hasil",
        "basic.qualityHintDefault": "Direkomendasikan 75% – 92%",
        "basic.qualityHintAvif": "Direkomendasikan 65% – 85%",
        "basic.qualityLossless": "Tanpa kehilangan kualitas",
        "basic.qualityLosslessHint": "{label} menggunakan keluaran tanpa kerugian",
        "basic.sizeLimit": "Dimensi Maks (px)",
        "basic.sizeHint": "Perkecil tanpa mengubah proporsi. Kosongkan untuk memakai ukuran asli.",
        "basic.limitHeight": "Batasi ketinggian",
        "basic.limitWidth": "Batasi lebarnya",
        "basic.limitLongest": "Batasi sisi terpanjang",
        "basic.limitShortest": "Batasi sisi terpendek",
        "basic.widthPh": "Lebar",
        "basic.heightPh": "Tinggi",
        "basic.resizeMode": "Modus Ubah Ukuran",
        "basic.modeContain": "Sesuaikan proporsi tanpa memotong",
        "basic.modePad": "Tengahkan dan isi ruang kosong",
        "basic.modeCover": "Potong bagian tengah sesuai ukuran",
        "basic.bgTitle": "Latar transparan",
        "basic.bgHintAlpha": "Pertahankan transparansi atau isi dengan warna solid.",
        "basic.bgHintNoAlpha": "{label} tidak mendukung transparansi. Latar diisi warna secara otomatis.",
        "basic.bgTransparent": "Pertahankan latar belakang transparan",
        "basic.bgFill": "Isi dengan warna solid",
        "tpl.searchPh": "Pencarian: Google Formulir, FB, 1080...",
        "tpl.suffix": "Akhiran nama file",
        "tpl.suffixName": "Nama templat",
        "tpl.suffixSize": "Dimensi (LxT)",
        "tpl.suffixDigits": "Jumlah digit nomor urut",
        "tpl.suffixOff": "Tanpa nomor urut",
        "tpl.resetSize": "Atur Ulang Ukuran",
        "tpl.empty": "Tidak ada templat yang cocok dengan \"{q}\". Coba kategori lain atau hapus pencarian.",
        "tpl.modePad": "Tengahkan dan isi ruang kosong",
        "tpl.modeCover": "Potong tengah",
        "tpl.modeContain": "Skalakan sesuai proporsi",
        "rename.prefix": "Awalan",
        "rename.prefixHint": "Tambahkan di awal nama file",
        "rename.prefixPh": "misalnya toko_",
        "rename.suffix": "Akhiran",
        "rename.suffixHint": "Tambahkan sebelum ekstensi",
        "rename.suffixPh": "misalnya _800 piksel",
        "rename.base": "Nama dasar file",
        "rename.baseHint": "Kosongkan untuk memakai nama asli",
        "rename.basePh": "misalnya produk",
        "rename.seqToggle": "Tambahkan nomor urut",
        "rename.seqPad": "Jumlah digit",
        "rename.reset": "Atur Ulang Penamaan",
        "wm.enable": "Aktifkan tanda air (berlaku untuk semua keluaran non-ICO)",
        "wm.type": "Jenis",
        "wm.typeText": "Tanda Air Teks",
        "wm.typeImage": "Tanda Air Logo Gambar",
        "wm.position": "Posisi",
        "wm.posBR": "Kanan Bawah",
        "wm.posBL": "Kiri Bawah",
        "wm.posTR": "Kanan Atas",
        "wm.posTL": "Kiri Atas",
        "wm.posCenter": "Tengah",
        "wm.posTile": "Ulangi secara diagonal",
        "wm.opacity": "Opasitas",
        "wm.angle": "Sudut",
        "wm.text": "Teks Tanda Air",
        "wm.textPh": "Masukkan teks merek atau hak cipta",
        "wm.fontSize": "Ukuran Huruf",
        "wm.color": "Warna Teks",
        "wm.uploadLogo": "Unggah Logo",
        "wm.chooseLogo": "Pilih Logo",
        "wm.logoHint": "PNG transparan atau SVG direkomendasikan",
        "wm.logoLoaded": "Dimuat: {name} ({w}×{h})",
        "wm.logoScale": "Ukuran logo",
        "results.clear": "Kosongkan daftar",
        "results.downloadAll": "Unduh Satu per satu",
        "results.downloadDefault": "Unduh Gambar",
        "results.downloadSingle": "Unduh {label}",
        "results.downloadZip": "Unduh ZIP ({n} file)",
        "results.downloadZipDefault": "Unduh SwitchImage_Batch.zip",
        "results.statsCountHtml": "<strong>{total}</strong> total (<strong>{done}</strong> siap)",
        "results.savedBadge": "Hemat {size} (-{pct}%)",
        "results.largerBadge": "+{size} (+{pct}%)",
        "item.saved": "-{pct}%",
        "item.larger": "+{pct}%",
        "item.converting": "Mengonversi…",
        "item.preview": "Pratinjau",
        "item.download": "Unduh",
        "item.remove": "Hapus",
        "item.thumbTitle": "Klik untuk melihat pratinjau keluaran yang dikonversi (periksa pangkas, latar belakang & tanda air)",
        "item.formatTitle": "Ganti format keluaran untuk gambar ini",
        "matrix.summary": "Lihat semua 14 format yang didukung & kemampuan codec browser",
        "matrix.useCases": "Konversi HEIC ke JPG dan gambar komposit PSD ke PNG secara massal. Impor dan ekspor JPEG XL atau konversi pratinjau JPEG yang tertanam dalam foto RAW.",
        "matrix.readOk": "Dekode",
        "matrix.readHeic": "Dekode di browser atau muat kodek",
        "matrix.writeLocal": "Enkode Lokal",
        "matrix.writeNative": "Enkode Asli",
        "matrix.writeWasm": "Pengkodean WASM",
        "matrix.writeReadOnly": "Hanya dapat diimpor",
        "matrix.writeUnsupported": "Tidak didukung",
        "footer.tip": "Tip: Klik thumbnail mana pun untuk melihat pratinjau gambar yang dikonversi (pangkas, latar belakang & tanda air), atau gunakan tarik-turun kanan untuk mengganti format per gambar.",
        "footer.privacy": "Switch Image berjalan 100% secara lokal di browser Anda · Bebas iklan · File Anda tidak pernah keluar dari perangkat Anda.",
        "sheet.title": "Tentang & Pengaturan",
        "sheet.titleDesktop": "Tentang",
        "sheet.closeAria": "Tutup tentang & pengaturan",
        "sheet.langHeading": "Bahasa",
        "sheet.themeHeading": "Tema",
        "sheet.themeLight": "Mode terang",
        "sheet.themeDark": "Mode Gelap",
        "sheet.themeSystem": "Ikuti sistem",
        "sheet.matrixHeading": "Format yang didukung dan kemampuan browser",
        "about.tagline": "Alat konversi gambar di browser",
        "about.infoHeading": "Pemrosesan dan privasi",
        "about.processingLabel": "Pemrosesan",
        "about.processingVal": "Seluruhnya di browser",
        "about.privacyLabel": "Privasi",
        "about.privacyVal": "Nol Unggahan · Tidak Ada Pelacakan",
        "about.stackLabel": "Teknologi",
        "about.shortcutsLabel": "Jalan pintas",
        "about.shortcutsHtml": "<kbd>Ctrl</kbd>+<kbd>V</kbd> Tempel · <kbd>Esc</kbd> Tutup",
        "modal.title": "Pratinjau Keluaran",
        "modal.closeAria": "Tutup pratinjau",
        "modal.downloadThis": "Unduh {label}",
        "modal.downloadFallback": "Unduh Berkas",
        "modal.meta": "{label} {outSize} ({w}×{h}) | Asli {origSize} ({delta}) | Klik gambar untuk 100%",
        "modal.hint": "Klik gambar untuk mengubah 100% ukuran sebenarnya",
        "compat.noWebp": "Browser Anda tidak mendukung pengkodean WebP asli. PNG, JPG, GIF, ICO, SVG, dan BMP tetap tersedia sepenuhnya.",
        "toast.reconverted": "Menerapkan pengaturan yang diperbarui dan dikonversi kembali",
        "toast.skipped": "Menambahkan {added} gambar (dilewati {skipped} file non-gambar)",
        "toast.pasted": "{n} gambar ditempel dari papan klip",
        "toast.downloadedSeq": "Mengunduh file {n} satu per satu",
        "toast.downloadedOne": "Diunduh {name}",
        "toast.zipDone": "Mengemas {n} gambar ke dalam SwitchImage_Batch.zip",
        "toast.zipFail": "Ekspor ZIP gagal: {msg}",
        "toast.presetApplied": "Prasetel yang diterapkan \"{name}\" ({tag})",
        "toast.templateApplied": "Diterapkan \"{platform} {name}\" ({w}×{h})",
        "toast.templateReset": "Batasan ukuran dihilangkan",
        "toast.renameReset": "Aturan penamaan dihapus",
        "toast.logoError": "Tidak dapat membaca gambar logo tanda air",
        "toast.icoMinOne": "Pilih setidaknya 1 ukuran ICO",
        "err404.pageTitle": "404 Halaman Tidak Ditemukan — Switch Image",
        "err404.heading": "Halaman Tidak Ditemukan",
        "err404.desc": "Tautan mungkin telah dipindahkan, dihapus, atau salah ketik. Kembali ke beranda untuk melanjutkan konversi.",
        "err404.pathLabel": "Jalur yang diminta: {path}",
        "err404.goHome": "Kembali ke beranda",
        "err404.goBack": "Kembali",
        "err404.formatsNote": "Konversi lokal untuk pratinjau JPEG XL, HEIC, PSD, TIFF, TGA, dan RAW",
        "pwa.win.title": "Instal Switch Image untuk Windows",
        "pwa.win.desc": "Luncurkan langsung dari Mulai atau Desktop di jendelanya sendiri dengan dukungan offline penuh.",
        "pwa.mac.title": "Instal Aplikasi Desktop Mac",
        "pwa.mac.desc": "Jalankan di jendela khusus dengan caching offline—cepat seperti utilitas Mac asli.",
        "pwa.macSafari.title": "Tambahkan Switch Image ke Mac Dock",
        "pwa.macSafari.desc": "Di Safari, pilih File → Tambahkan ke Dock untuk meluncurkan Switch Image sebagai aplikasi offline.",
        "pwa.ios.title": "Tambahkan ke Layar Utama iPhone / iPad",
        "pwa.ios.desc": "Ketuk ikon Bagikan di bawah, lalu pilih \"Tambahkan ke Layar Utama\" untuk akses aplikasi offline.",
        "pwa.android.title": "Instal ke Layar Beranda",
        "pwa.android.desc": "Konverter batch yang ringan dan siap offline dapat diakses dengan satu ketukan dari layar beranda Anda.",
        "pwa.linux.title": "Instal Aplikasi Desktop",
        "pwa.linux.desc": "Luncurkan di jendela mandiri dengan konversi gambar lokal offline penuh.",
        "pwa.desktop.title": "Instal Aplikasi Offline",
        "pwa.desktop.desc": "Jalankan di jendela khusus dengan cache offline untuk konversi lokal instan.",
        "pwa.entry.windows": "Instal Aplikasi Windows",
        "pwa.entry.macos": "Instal Aplikasi Mac",
        "pwa.entry.macSafari": "Tambahkan ke Mac Dock",
        "pwa.entry.ios": "Tambahkan ke Layar Utama",
        "pwa.entry.android": "Instal Aplikasi Android",
        "pwa.entry.desktop": "Instal Aplikasi Offline",
        "pwa.cta.install": "Instal",
        "pwa.cta.installMobile": "Instal Sekarang",
        "pwa.cta.gotIt": "Paham",
        "pwa.cta.later": "Nanti",
        "pwa.toastInstalled": "Switch Image sudah terpasang dan bisa langsung dibuka dari perangkat."
      },
      "formats": {
        "webp": {
          "badge": "Disarankan",
          "desc": "File kecil dan mendukung transparansi, cocok untuk web dan aplikasi."
        },
        "png": {
          "badge": "Lossless",
          "desc": "Kompresi lossless dengan transparansi, cocok untuk logo dan tangkapan layar."
        },
        "jpg": {
          "badge": "Kompatibel",
          "desc": "Cocok untuk foto dan dapat dibuka di sebagian besar perangkat. Area transparan diisi warna latar."
        },
        "avif": {
          "badge": "Kompresi tinggi",
          "desc": "Gunakan kompresi AV1 untuk file kecil dengan dukungan transparansi."
        },
        "gif": {
          "badge": "256 warna",
          "desc": "Mendukung hingga 256 warna dan satu warna transparan."
        },
        "ico": {
          "badge": "Multiukuran",
          "desc": "Gabungkan ikon beberapa ukuran ke satu file ICO untuk favicon."
        },
        "svg": {
          "badge": "Dua mode",
          "desc": "Ubah SVG menjadi bitmap, atau sematkan bitmap dalam SVG dan ubah menjadi vektor."
        },
        "bmp": {
          "badge": "Tanpa kompresi",
          "desc": "BMP Windows standar 24-bit yang kompatibel dengan perangkat lunak lama."
        },
        "heic": {
          "badge": "Khusus impor",
          "desc": "Konversi foto HEIC atau HEIF dari iPhone ke JPG, PNG, WebP, dan format lain."
        }
      },
      "options": {
        "ico": {
          "16": "Tunggal 16 × 16",
          "32": "Tunggal 32 × 32",
          "48": "Tunggal 48 × 48",
          "64": "Tunggal 64 × 64",
          "128": "Tunggal 128 × 128",
          "256": "Tunggal 256 × 256",
          "multi": "Standar Multi-ukuran (16/32/48/256px)",
          "favicon": "Favicon Web Ringkas (16/32/48 piksel)"
        },
        "svg": {
          "embed": "Sematkan gambar asli (lossless)",
          "vector": "Ubah menjadi vektor (untuk ikon dan logo)"
        },
        "presets": {
          "web-webp": {
            "name": "Optimalkan untuk web",
            "tag": "WebP · 85%"
          },
          "ultra-avif": {
            "name": "Kompresi efisien",
            "tag": "AVIF · 75%"
          },
          "photo-jpg": {
            "name": "Foto kompatibel luas",
            "tag": "JPG · 90%"
          },
          "lossless-png": {
            "name": "PNG transparan lossless",
            "tag": "PNG · Lossless"
          },
          "site-ico": {
            "name": "Favicon situs",
            "tag": "ICO · Multiukuran"
          },
          "vector-svg": {
            "name": "Ubah logo ke vektor",
            "tag": "SVG · Vektorisasi"
          },
          "social-1920": {
            "name": "Gambar untuk media sosial",
            "tag": "JPG · 1920 px"
          }
        },
        "categories": {
          "all": "Semua",
          "ecommerce": "E-commerce",
          "fb": "Facebook",
          "ig": "Instagram",
          "yt": "YouTube",
          "seo": "SEO / Web",
          "misc": "Formulir / LINE / Lain-lain"
        }
      },
      "templates": {
        "shopee-800": [
          "Tokopedia",
          "Foto produk persegi standar"
        ],
        "shopee-1024": [
          "Tokopedia",
          "Gambar Produk HD"
        ],
        "shopee-banner": [
          "Tokopedia",
          "Banner carousel toko"
        ],
        "momo-pchome": [
          "momo / PChome",
          "Foto utama produk persegi"
        ],
        "pinkoi-711": [
          "Pinkoi / Kapalku",
          "Foto detail produk persegi"
        ],
        "amazon-2000": [
          "Amazon",
          "Foto produk persegi beresolusi tinggi"
        ],
        "shopify-2048": [
          "Shopify",
          "Foto persegi untuk etalase toko"
        ],
        "fb-post-square": [
          "Facebook",
          "Postingan persegi 1:1"
        ],
        "fb-post-portrait": [
          "Facebook",
          "Postingan vertikal 4:5"
        ],
        "fb-post-landscape": [
          "Facebook",
          "Postingan tautan horizontal"
        ],
        "fb-page-cover": [
          "Facebook",
          "Sampul halaman standar"
        ],
        "fb-page-cover-hd": [
          "Facebook",
          "Sampul Halaman 2x HD"
        ],
        "fb-group-cover": [
          "Facebook",
          "Spanduk Sampul Grup"
        ],
        "fb-event-cover": [
          "Facebook",
          "Sampul Acara"
        ],
        "fb-story-reels": [
          "Facebook",
          "Story / Reels 9:16"
        ],
        "ig-square": [
          "Instagram",
          "Postingan persegi 1:1"
        ],
        "ig-portrait-45": [
          "Instagram",
          "Postingan vertikal 4:5"
        ],
        "ig-grid-34": [
          "Instagram",
          "Kisi profil 3:4"
        ],
        "ig-landscape": [
          "Instagram",
          "Postingan horizontal 1.91:1"
        ],
        "ig-story": [
          "Instagram",
          "Story / Reels 9:16"
        ],
        "ig-avatar-highlight": [
          "Instagram",
          "Avatar / Sampul Sorotan"
        ],
        "yt-thumb-hd": [
          "YouTube",
          "Gambar kecil 16:9 HD"
        ],
        "yt-thumb-fhd": [
          "YouTube",
          "Gambar kecil Full HD"
        ],
        "yt-banner-tv": [
          "YouTube",
          "Spanduk Saluran (TV)"
        ],
        "yt-banner-safe": [
          "YouTube",
          "Area Aman Spanduk"
        ],
        "yt-shorts": [
          "YouTube",
          "Sampul Shorts 9:16"
        ],
        "yt-avatar": [
          "YouTube",
          "Avatar Saluran"
        ],
        "yt-watermark": [
          "YouTube",
          "Tanda air langganan kanal"
        ],
        "seo-og-share": [
          "Buka Grafik",
          "Pratinjau Berbagi OG"
        ],
        "seo-google-discover": [
          "Google Temukan",
          "Sampul Discover 4:3"
        ],
        "seo-twitter-card": [
          "Kartu X (Twitter).",
          "Ringkasan Gambar Besar"
        ],
        "seo-blog-hero": [
          "Blog/WordPress",
          "Gambar utama artikel 16:9"
        ],
        "seo-pwa-512": [
          "Web / PWA",
          "Ikon Aplikasi 512 piksel"
        ],
        "seo-apple-touch": [
          "apel iOS",
          "Ikon Apple Touch"
        ],
        "seo-favicon-ico": [
          "Situs web Favicon",
          "favicon.ico multi-ukuran"
        ],
        "misc-google-forms": [
          "Google Formulir",
          "Spanduk Tajuk 4:1"
        ],
        "misc-google-classroom": [
          "Google Kelas",
          "Tajuk Kelas 4:1"
        ],
        "misc-line-richmenu-lg": [
          "Resmi LINE",
          "Rich Menu ukuran besar"
        ],
        "misc-line-richmenu-sm": [
          "Resmi LINE",
          "Rich Menu ukuran kecil"
        ],
        "misc-line-sticker": [
          "Pembuat GARIS",
          "Stiker Transparan PNG"
        ],
        "misc-notion-cover": [
          "Gagasan",
          "Sampul Halaman"
        ],
        "misc-x-header": [
          "X (Twitter)",
          "Banner profil 3:1"
        ],
        "misc-linkedin-banner": [
          "LinkedIn",
          "Latar Belakang Profil 4:1"
        ],
        "misc-discord-banner": [
          "Perselisihan",
          "Spanduk Server 16:9"
        ],
        "misc-ppt-169": [
          "Slide / Pembicaraan",
          "Slide Full HD 16:9"
        ]
      }
    },
    "vi": {
      "messages": {
        "meta.title": "Chuyển đổi hình ảnh trực tuyến miễn phí | Chuyển đổi hàng loạt cục bộ | Switch Image",
        "meta.description": "Chuyển đổi hàng loạt JPG, PNG, WebP, AVIF và JPEG XL trực tuyến. Nhập các bản xem trước HEIC, PSD, TIFF và RAW. Thay đổi kích thước, nén và tạo hình mờ cho hình ảnh mà không cần tải lên.",
        "nav.aria": "Điều hướng trang web",
        "nav.badgeMain": "100% địa phương",
        "nav.badgeExtra": "· Không tải lên",
        "nav.langAria": "Chuyển đổi ngôn ngữ giao diện",
        "nav.themeTitle": "Chuyển đổi chủ đề sáng / tối",
        "nav.infoTitle": "Thông tin và cài đặt trang web",
        "hero.titleMain": "Trình chuyển đổi hình ảnh phổ quát",
        "hero.subtitleHtml": "Chuyển đổi hình ảnh cục bộ, bao gồm cả bản xem trước JPEG XL và RAW. <strong>Chọn định dạng → Thả hình ảnh → Tải xuống</strong><span class=\"hero-sub-extra\"> — các tập tin không bao giờ rời khỏi thiết bị của bạn</span>.",
        "trust.aria": "Đảm bảo cốt lõi",
        "trust.fastTitle": "Chuyển đổi hàng loạt",
        "trust.fastDetail": "· Tải ZIP",
        "trust.fastTip": "Kéo và thả hàng trăm hình ảnh bằng cách xuất ZIP chỉ bằng một cú nhấp chuột",
        "trust.formatsTitle": "Định dạng hỗ trợ",
        "trust.formatsDetail": "· 14 nhóm định dạng đầu vào, 9 định dạng đầu ra",
        "trust.formatsTip": "Tự do chuyển đổi giữa các định dạng web, thiết kế, biểu tượng và iPhone HEIC",
        "trust.freeTitle": "Không cần đăng ký",
        "trust.freeDetail": "· Không giới hạn",
        "trust.freeTip": "Không có giới hạn đăng nhập hoặc chuyển đổi hàng ngày",
        "trust.privacyTitle": "Xử lý trên thiết bị",
        "trust.privacyDetail": "· Không có quảng cáo",
        "trust.privacyTip": "Hoàn toàn miễn phí, không có quảng cáo và được xử lý hoàn toàn trên thiết bị",
        "step1.title": "Chọn định dạng đầu ra",
        "step1.moreFormats": "Tất cả các định dạng",
        "step1.fewerFormats": "Hiển thị ít hơn",
        "step1.aria": "Chọn định dạng đầu ra mục tiêu",
        "quick.bgLabel": "Tô vùng trong suốt:",
        "quick.bgWhite": "trắng",
        "quick.bgBlack": "Đen",
        "quick.icoLabel": "Kích thước ICO (chọn nhiều):",
        "quick.icoCount": "Đã chọn {n} kích thước",
        "quick.icoPresetWeb": "Biểu tượng trang web",
        "quick.icoPresetStd": "Bộ kích thước chuẩn",
        "quick.svgModeLabel": "Chế độ SVG:",
        "quick.svgColorsLabel": "Màu sắc:",
        "quick.colorsUnit": "{n} màu",
        "drop.headingHtml": "Thả hình ảnh vào đây để chuyển đổi thành <strong id=\"emptyTargetFormat\">{ext}</strong>",
        "drop.subHtml": "Tải xuống trực tiếp 1 tệp, nhiều tệp tự động đóng gói dưới dạng ZIP · Nhấn <strong>Ctrl + V</strong> để dán ảnh chụp màn hình",
        "drop.selectFiles": "Chọn hình ảnh",
        "drop.selectFolder": "Chọn thư mục",
        "drop.supportedInput": "Đầu vào được hỗ trợ: PNG · JPG · WebP · AVIF · GIF · ICO · SVG · BMP · HEIC · PSD · TIFF/TIF · JPEG XL · TGA · RAW",
        "decode.rawPreview": "Bản xem trước được nhúng {w}×{h}",
        "decode.rawMissing": "Không có bản xem trước JPEG nhúng có thể sử dụng được. Xuất JPEG hoặc TIFF từ trình chỉnh sửa ảnh của bạn.",
        "decode.format.raw": "Trích xuất các bản xem trước JPEG được nhúng từ RAW, DNG, CR2, CR3, NEF và ARW.",
        "decode.firstPage": "Chỉ trang 1",
        "decode.psdComposite": "PSD không có hỗn hợp. Bật Tối đa hóa khả năng tương thích trong Photoshop và lưu lại.",
        "decode.variant": "Chế độ màu hoặc mã hóa này không được hỗ trợ.",
        "decode.size": "Tệp hoặc hình ảnh vượt quá giới hạn bộ giải mã.",
        "decode.module": "Không thể tải bộ giải mã. Kiểm tra kết nối của bạn.",
        "decode.worker": "Không thể khởi động bộ giải mã. Mở trang web qua HTTP(S).",
        "decode.timeout": "Đã hết thời gian giải mã.",
        "decode.failed": "Không thể giải mã tập tin này. Nó có thể bị hư hỏng hoặc không được hỗ trợ.",
        "decode.format.psd": "Đọc tổ hợp PSD 8 bit đã lưu.",
        "decode.format.tiff": "Chuyển đổi trang đầu tiên của TIFF thang độ xám hoặc RGB phổ biến.",
        "decode.format.jxl": "Nhập và xuất ảnh tĩnh JPEG XL với chất lượng và độ trong suốt có thể điều chỉnh.",
        "encode.jxlModule": "Không thể tải bộ mã hóa JPEG XL. Kiểm tra kết nối của bạn.",
        "encode.jxlFailed": "Mã hóa JPEG XL không thành công.",
        "decode.format.tga": "Đọc TGA màu thật không nén hoặc RLE.",
        "drop.compactHtml": "Thả thêm hình ảnh, nhấn <strong>Ctrl + V</strong> để dán hoặc",
        "drop.addFiles": "Thêm hình ảnh",
        "drop.addFolder": "Thêm thư mục",
        "dock.label": "Công cụ tùy chọn:",
        "dock.basic": "Chất lượng và kích thước",
        "dock.ecommerce": "Mẫu kích thước",
        "dock.rename": "Đổi tên hàng loạt",
        "dock.watermark": "Hình mờ",
        "dock.reconvert": "Chuyển đổi lại",
        "dock.reconvertTitle": "Chuyển đổi lại tất cả các tệp có cài đặt hiện tại",
        "dock.badgeEnabled": "· Đang dùng",
        "dock.badgeOn": "· Bật",
        "dock.autoDim": "Tự động",
        "presets.label": "Cài đặt trước nhanh:",
        "basic.quality": "Chất lượng ảnh đầu ra",
        "basic.qualityHintDefault": "Khuyến nghị 75% – 92%",
        "basic.qualityHintAvif": "Khuyến nghị 65% – 85%",
        "basic.qualityLossless": "Không mất chất lượng",
        "basic.qualityLosslessHint": "{label} sử dụng đầu ra không mất dữ liệu",
        "basic.sizeLimit": "Kích thước tối đa (px)",
        "basic.sizeHint": "Thu nhỏ theo tỷ lệ. Để trống để giữ nguyên kích thước.",
        "basic.limitHeight": "Giới hạn chiều cao",
        "basic.limitWidth": "Giới hạn chiều rộng",
        "basic.limitLongest": "Giới hạn cạnh dài",
        "basic.limitShortest": "Giới hạn cạnh ngắn",
        "basic.widthPh": "Chiều rộng",
        "basic.heightPh": "Chiều cao",
        "basic.resizeMode": "Chế độ thay đổi kích thước",
        "basic.modeContain": "Vừa khung, giữ tỷ lệ",
        "basic.modePad": "Căn giữa và thêm viền",
        "basic.modeCover": "Cắt giữa theo kích thước đã chọn",
        "basic.bgTitle": "Nền trong suốt",
        "basic.bgHintAlpha": "Giữ nền trong suốt hoặc tô màu đặc.",
        "basic.bgHintNoAlpha": "{label} không hỗ trợ nền trong suốt. Nền sẽ tự động được tô màu.",
        "basic.bgTransparent": "Giữ nền trong suốt",
        "basic.bgFill": "Tô màu đồng nhất",
        "tpl.searchPh": "Tìm kiếm: Google Biểu mẫu, FB, 1080...",
        "tpl.suffix": "Hậu tố tên tệp",
        "tpl.suffixName": "Tên mẫu",
        "tpl.suffixSize": "Kích thước (WxH)",
        "tpl.suffixDigits": "Số chữ số của số thứ tự",
        "tpl.suffixOff": "Không thêm số thứ tự",
        "tpl.resetSize": "Đặt lại kích thước",
        "tpl.empty": "Không có mẫu nào khớp với \"{q}\". Hãy thử danh mục khác hoặc xóa tìm kiếm.",
        "tpl.modePad": "Căn giữa, thêm viền",
        "tpl.modeCover": "Cắt giữa",
        "tpl.modeContain": "Co giãn theo tỷ lệ",
        "rename.prefix": "Tiền tố",
        "rename.prefixHint": "Thêm vào đầu tên tệp",
        "rename.prefixPh": "ví dụ. cửa hàng_",
        "rename.suffix": "Hậu tố",
        "rename.suffixHint": "Thêm trước phần mở rộng",
        "rename.suffixPh": "ví dụ: _800px",
        "rename.base": "Tên tệp chung",
        "rename.baseHint": "Để trống để giữ tên gốc",
        "rename.basePh": "ví dụ: sản phẩm",
        "rename.seqToggle": "Thêm số thứ tự",
        "rename.seqPad": "Số chữ số",
        "rename.reset": "Đặt lại cách đặt tên",
        "wm.enable": "Bật hình mờ (áp dụng cho tất cả các đầu ra không phải ICO)",
        "wm.type": "Loại",
        "wm.typeText": "Hình mờ văn bản",
        "wm.typeImage": "Hình mờ Logo Hình ảnh",
        "wm.position": "Vị trí",
        "wm.posBR": "Dưới cùng bên phải",
        "wm.posBL": "Dưới cùng bên trái",
        "wm.posTR": "Trên cùng bên phải",
        "wm.posTL": "Trên cùng bên trái",
        "wm.posCenter": "Chính giữa",
        "wm.posTile": "Lặp theo đường chéo",
        "wm.opacity": "Độ đục",
        "wm.angle": "Góc",
        "wm.text": "Văn bản hình mờ",
        "wm.textPh": "Nhập văn bản thương hiệu hoặc bản quyền",
        "wm.fontSize": "Cỡ chữ",
        "wm.color": "Màu văn bản",
        "wm.uploadLogo": "Tải lên biểu trưng",
        "wm.chooseLogo": "Chọn biểu tượng",
        "wm.logoHint": "Nên sử dụng PNG hoặc SVG trong suốt",
        "wm.logoLoaded": "Đã tải: {name} ({w}×{h})",
        "wm.logoScale": "Kích thước logo",
        "results.clear": "Xóa danh sách",
        "results.downloadAll": "Tải xuống riêng lẻ",
        "results.downloadDefault": "Tải xuống hình ảnh",
        "results.downloadSingle": "Tải xuống {label}",
        "results.downloadZip": "Tải xuống ZIP (tệp {n})",
        "results.downloadZipDefault": "Tải xuống SwitchImage_Batch.zip",
        "results.statsCountHtml": "Tổng cộng <strong>{total}</strong> (<strong>{done}</strong> sẵn sàng)",
        "results.savedBadge": "Tiết kiệm {size} (-{pct}%)",
        "results.largerBadge": "+{size} (+{pct}%)",
        "item.saved": "-{pct}%",
        "item.larger": "+{pct}%",
        "item.converting": "Đang chuyển đổi…",
        "item.preview": "Xem trước",
        "item.download": "Tải xuống",
        "item.remove": "Xóa",
        "item.thumbTitle": "Nhấp để xem trước đầu ra đã chuyển đổi (kiểm tra cắt, nền và hình mờ)",
        "item.formatTitle": "Ghi đè định dạng đầu ra cho hình ảnh này",
        "matrix.summary": "Xem tất cả 14 định dạng được hỗ trợ và khả năng codec của trình duyệt",
        "matrix.useCases": "Chuyển đổi hàng loạt HEIC sang JPG và ảnh tổng hợp PSD sang PNG. Nhập và xuất JPEG XL hoặc chuyển đổi ảnh xem trước JPEG nhúng trong tệp RAW.",
        "matrix.readOk": "Giải mã",
        "matrix.readHeic": "Giải mã bằng trình duyệt hoặc tải bộ giải mã",
        "matrix.writeLocal": "Mã hóa cục bộ",
        "matrix.writeNative": "Mã hóa gốc",
        "matrix.writeWasm": "Mã hóa WASM",
        "matrix.writeReadOnly": "Chỉ hỗ trợ nhập",
        "matrix.writeUnsupported": "Không được hỗ trợ",
        "footer.tip": "Mẹo: Nhấp vào bất kỳ hình thu nhỏ nào để xem trước hình ảnh đã chuyển đổi (cắt, nền & hình mờ) hoặc sử dụng menu thả xuống bên phải để chuyển đổi định dạng cho mỗi hình ảnh.",
        "footer.privacy": "Switch Image chạy cục bộ 100% trong trình duyệt của bạn · Không có quảng cáo · Các tệp của bạn không bao giờ rời khỏi thiết bị của bạn.",
        "sheet.title": "Giới thiệu & Cài đặt",
        "sheet.titleDesktop": "Giới thiệu",
        "sheet.closeAria": "Đóng giới thiệu & cài đặt",
        "sheet.langHeading": "Ngôn ngữ",
        "sheet.themeHeading": "Giao diện",
        "sheet.themeLight": "Chế độ sáng",
        "sheet.themeDark": "Chế độ tối",
        "sheet.themeSystem": "Theo hệ thống",
        "sheet.matrixHeading": "Định dạng hỗ trợ và khả năng của trình duyệt",
        "about.tagline": "Công cụ chuyển đổi ảnh trên trình duyệt",
        "about.infoHeading": "Xử lý và quyền riêng tư",
        "about.processingLabel": "Cách xử lý",
        "about.processingVal": "Hoàn toàn trong trình duyệt",
        "about.privacyLabel": "Quyền riêng tư",
        "about.privacyVal": "Không tải lên · Không theo dõi",
        "about.stackLabel": "Công nghệ",
        "about.shortcutsLabel": "Phím tắt",
        "about.shortcutsHtml": "<kbd>Ctrl</kbd>+<kbd>V</kbd> Dán · <kbd>Esc</kbd> Đóng",
        "modal.title": "Xem trước đầu ra",
        "modal.closeAria": "Đóng bản xem trước",
        "modal.downloadThis": "Tải xuống {label}",
        "modal.downloadFallback": "Tải tập tin xuống",
        "modal.meta": "{label} {outSize} ({w}×{h}) | Bản gốc {origSize} ({delta}) | Bấm vào hình để xem 100%",
        "modal.hint": "Bấm vào hình để chuyển sang kích thước thật 100%",
        "compat.noWebp": "Trình duyệt của bạn không hỗ trợ mã hóa WebP gốc. PNG, JPG, GIF, ICO, SVG và BMP vẫn có sẵn đầy đủ.",
        "toast.reconverted": "Đã áp dụng cài đặt cập nhật và chuyển đổi lại",
        "toast.skipped": "Đã thêm {added} hình ảnh (bỏ qua {skipped} tệp không phải hình ảnh)",
        "toast.pasted": "Đã dán {n} hình ảnh từ bảng nhớ tạm",
        "toast.downloadedSeq": "Đã tải xuống {n} tệp riêng lẻ",
        "toast.downloadedOne": "Đã tải xuống {name}",
        "toast.zipDone": "Đã đóng gói hình ảnh {n} vào SwitchImage_Batch.zip",
        "toast.zipFail": "Xuất ZIP không thành công: {msg}",
        "toast.presetApplied": "Đã áp dụng giá trị đặt trước \"{name}\" ({tag})",
        "toast.templateApplied": "Đã áp dụng \"{platform} {name}\" ({w}×{h})",
        "toast.templateReset": "Đã xóa giới hạn kích thước",
        "toast.renameReset": "Đã xóa quy tắc đặt tên",
        "toast.logoError": "Không thể đọc được hình ảnh logo hình mờ",
        "toast.icoMinOne": "Chọn ít nhất 1 kích thước ICO",
        "err404.pageTitle": "Không tìm thấy trang 404 — Switch Image",
        "err404.heading": "Không tìm thấy trang",
        "err404.desc": "Liên kết có thể đã thay đổi, bị xóa hoặc nhập sai. Về trang chủ để tiếp tục chuyển đổi ảnh.",
        "err404.pathLabel": "Đường dẫn được yêu cầu: {path}",
        "err404.goHome": "Về trang chủ",
        "err404.goBack": "Quay lại",
        "err404.formatsNote": "Chuyển đổi cục bộ cho các bản xem trước JPEG XL, HEIC, PSD, TIFF, TGA và RAW",
        "pwa.win.title": "Cài đặt Switch Image cho Windows",
        "pwa.win.desc": "Khởi chạy trực tiếp từ Start hoặc Desktop trong cửa sổ riêng với sự hỗ trợ ngoại tuyến đầy đủ.",
        "pwa.mac.title": "Cài đặt ứng dụng Mac Desktop",
        "pwa.mac.desc": "Chạy trong cửa sổ chuyên dụng với bộ nhớ đệm ngoại tuyến—nhanh như tiện ích Mac gốc.",
        "pwa.macSafari.title": "Thêm Switch Image vào Mac Dock",
        "pwa.macSafari.desc": "Trong Safari, chọn Tệp → Thêm vào Dock để khởi chạy Switch Image dưới dạng ứng dụng ngoại tuyến.",
        "pwa.ios.title": "Thêm vào màn hình chính iPhone/iPad",
        "pwa.ios.desc": "Nhấn vào biểu tượng Chia sẻ bên dưới, sau đó chọn \"Thêm vào Màn hình chính\" để truy cập ứng dụng ngoại tuyến.",
        "pwa.android.title": "Cài đặt vào màn hình chính",
        "pwa.android.desc": "Bộ chuyển đổi hàng loạt nhẹ, sẵn sàng ngoại tuyến có thể truy cập bằng một lần nhấn từ màn hình chính của bạn.",
        "pwa.linux.title": "Cài đặt ứng dụng máy tính để bàn",
        "pwa.linux.desc": "Khởi chạy trong một cửa sổ độc lập với tính năng chuyển đổi hình ảnh cục bộ ngoại tuyến đầy đủ.",
        "pwa.desktop.title": "Cài đặt ứng dụng ngoại tuyến",
        "pwa.desktop.desc": "Chạy trong một cửa sổ chuyên dụng với bộ nhớ đệm ngoại tuyến để chuyển đổi cục bộ ngay lập tức.",
        "pwa.entry.windows": "Cài đặt ứng dụng Windows",
        "pwa.entry.macos": "Cài đặt ứng dụng Mac",
        "pwa.entry.macSafari": "Thêm vào Mac Dock",
        "pwa.entry.ios": "Thêm vào màn hình chính",
        "pwa.entry.android": "Cài đặt ứng dụng Android",
        "pwa.entry.desktop": "Cài đặt ứng dụng ngoại tuyến",
        "pwa.cta.install": "cài đặt",
        "pwa.cta.installMobile": "Cài đặt ngay",
        "pwa.cta.gotIt": "Đã hiểu",
        "pwa.cta.later": "Để sau",
        "pwa.toastInstalled": "Đã cài đặt Switch Image. Bạn có thể mở trực tiếp trên thiết bị."
      },
      "formats": {
        "webp": {
          "badge": "Khuyên dùng",
          "desc": "Tệp nhỏ, hỗ trợ nền trong suốt, phù hợp với web và ứng dụng."
        },
        "png": {
          "badge": "Không mất dữ liệu",
          "desc": "Nén không mất dữ liệu, giữ nền trong suốt, phù hợp với logo và ảnh chụp màn hình."
        },
        "jpg": {
          "badge": "Tương thích cao",
          "desc": "Phù hợp với ảnh chụp và mở được trên hầu hết thiết bị. Vùng trong suốt được tô màu nền."
        },
        "avif": {
          "badge": "Nén cao",
          "desc": "Dùng AV1 để giảm dung lượng và hỗ trợ nền trong suốt."
        },
        "gif": {
          "badge": "256 màu",
          "desc": "Hỗ trợ tối đa 256 màu và một màu trong suốt."
        },
        "ico": {
          "badge": "Nhiều kích thước",
          "desc": "Gộp biểu tượng nhiều kích thước vào một tệp ICO để làm favicon."
        },
        "svg": {
          "badge": "Hai chế độ",
          "desc": "Đổi SVG thành ảnh bitmap hoặc nhúng bitmap vào SVG và chuyển thành vectơ."
        },
        "bmp": {
          "badge": "Không nén",
          "desc": "BMP Windows 24 bit tiêu chuẩn, tương thích với phần mềm cũ."
        },
        "heic": {
          "badge": "Chỉ nhập",
          "desc": "Chuyển ảnh HEIC hoặc HEIF từ iPhone sang JPG, PNG, WebP và các định dạng khác."
        }
      },
      "options": {
        "ico": {
          "16": "Đơn 16 × 16",
          "32": "Đơn 32 × 32",
          "48": "Đơn 48 × 48",
          "64": "Đơn 64 × 64",
          "128": "Đơn 128 × 128",
          "256": "Đơn 256 × 256",
          "multi": "Tiêu chuẩn Đa kích thước (16/32/48/256px)",
          "favicon": "Favicon Web nhỏ gọn (16/32/48px)"
        },
        "svg": {
          "embed": "Nhúng ảnh gốc (không mất dữ liệu)",
          "vector": "Chuyển sang vectơ (cho biểu tượng và logo)"
        },
        "presets": {
          "web-webp": {
            "name": "Tối ưu cho web",
            "tag": "WebP · 85%"
          },
          "ultra-avif": {
            "name": "Nén hiệu quả",
            "tag": "AVIF · 75%"
          },
          "photo-jpg": {
            "name": "Ảnh tương thích rộng",
            "tag": "JPG · 90%"
          },
          "lossless-png": {
            "name": "PNG trong suốt không mất dữ liệu",
            "tag": "PNG · Không mất dữ liệu"
          },
          "site-ico": {
            "name": "Biểu tượng trang web",
            "tag": "ICO · Nhiều kích thước"
          },
          "vector-svg": {
            "name": "Chuyển logo sang vectơ",
            "tag": "SVG · Chuyển sang vectơ"
          },
          "social-1920": {
            "name": "Ảnh chia sẻ mạng xã hội",
            "tag": "JPG · 1920 px"
          }
        },
        "categories": {
          "all": "Tất cả",
          "ecommerce": "Thương mại điện tử",
          "fb": "Facebook",
          "ig": "Instagram",
          "yt": "YouTube",
          "seo": "SEO / Web",
          "misc": "Biểu mẫu / LINE / Khác"
        }
      },
      "templates": {
        "shopee-800": [
          "SHOPPING",
          "Ảnh sản phẩm vuông tiêu chuẩn"
        ],
        "shopee-1024": [
          "SHOPPING",
          "Hình ảnh sản phẩm HD"
        ],
        "shopee-banner": [
          "SHOPPING",
          "Banner trình chiếu gian hàng"
        ],
        "momo-pchome": [
          "momo / PChome",
          "Ảnh chính sản phẩm dạng vuông"
        ],
        "pinkoi-711": [
          "Pinkoi / MyShip",
          "Ảnh chi tiết sản phẩm dạng vuông"
        ],
        "amazon-2000": [
          "Amazon",
          "Ảnh sản phẩm vuông độ phân giải cao"
        ],
        "shopify-2048": [
          "Shopify",
          "Ảnh vuông cho gian hàng"
        ],
        "fb-post-square": [
          "Facebook",
          "Bài đăng vuông 1:1"
        ],
        "fb-post-portrait": [
          "Facebook",
          "Bài đăng dọc 4:5"
        ],
        "fb-post-landscape": [
          "Facebook",
          "Bài đăng liên kết dạng ngang"
        ],
        "fb-page-cover": [
          "Facebook",
          "Ảnh bìa trang tiêu chuẩn"
        ],
        "fb-page-cover-hd": [
          "Facebook",
          "Bìa trang 2x HD"
        ],
        "fb-group-cover": [
          "Facebook",
          "Biểu ngữ bìa nhóm"
        ],
        "fb-event-cover": [
          "Facebook",
          "Ảnh bìa sự kiện"
        ],
        "fb-story-reels": [
          "Facebook",
          "Tin / Reels 9:16"
        ],
        "ig-square": [
          "Instagram",
          "Bài đăng vuông 1:1"
        ],
        "ig-portrait-45": [
          "Instagram",
          "Bài đăng dọc 4:5"
        ],
        "ig-grid-34": [
          "Instagram",
          "Lưới trang cá nhân 3:4"
        ],
        "ig-landscape": [
          "Instagram",
          "Bài đăng ngang 1.91:1"
        ],
        "ig-story": [
          "Instagram",
          "Tin / Reels 9:16"
        ],
        "ig-avatar-highlight": [
          "Instagram",
          "Ảnh đại diện / Ảnh bìa nổi bật"
        ],
        "yt-thumb-hd": [
          "YouTube",
          "Hình thu nhỏ 16:9 HD"
        ],
        "yt-thumb-fhd": [
          "YouTube",
          "Hình thu nhỏ Full HD"
        ],
        "yt-banner-tv": [
          "YouTube",
          "Biểu ngữ kênh (TV)"
        ],
        "yt-banner-safe": [
          "YouTube",
          "Khu vực an toàn biểu ngữ"
        ],
        "yt-shorts": [
          "YouTube",
          "Ảnh bìa Shorts 9:16"
        ],
        "yt-avatar": [
          "YouTube",
          "Hình đại diện kênh"
        ],
        "yt-watermark": [
          "YouTube",
          "Hình mờ đăng ký kênh"
        ],
        "seo-og-share": [
          "Mở đồ thị",
          "Xem trước chia sẻ OG"
        ],
        "seo-google-discover": [
          "Google Khám phá",
          "Ảnh bìa Discover 4:3"
        ],
        "seo-twitter-card": [
          "Thẻ X (Twitter)",
          "Tóm tắt Hình ảnh lớn"
        ],
        "seo-blog-hero": [
          "Blog / WordPress",
          "Ảnh bìa bài viết 16:9"
        ],
        "seo-pwa-512": [
          "Web / PWA",
          "Biểu tượng ứng dụng 512px"
        ],
        "seo-apple-touch": [
          "Apple iOS",
          "Biểu tượng Apple Touch"
        ],
        "seo-favicon-ico": [
          "Biểu tượng trang web",
          "Favicon.ico nhiều kích thước"
        ],
        "misc-google-forms": [
          "Google Biểu mẫu",
          "Biểu ngữ tiêu đề 4:1"
        ],
        "misc-google-classroom": [
          "Lớp học Google",
          "Tiêu đề lớp 4:1"
        ],
        "misc-line-richmenu-lg": [
          "LINE chính thức",
          "Rich Menu cỡ lớn"
        ],
        "misc-line-richmenu-sm": [
          "LINE chính thức",
          "Rich Menu cỡ nhỏ"
        ],
        "misc-line-sticker": [
          "Người tạo LINE",
          "Nhãn dán PNG trong suốt"
        ],
        "misc-notion-cover": [
          "khái niệm",
          "Bìa trang"
        ],
        "misc-x-header": [
          "X (Twitter)",
          "Ảnh bìa trang cá nhân 3:1"
        ],
        "misc-linkedin-banner": [
          "LinkedIn",
          "Hình nền hồ sơ 4:1"
        ],
        "misc-discord-banner": [
          "Bất hòa",
          "Biểu ngữ máy chủ 16:9"
        ],
        "misc-ppt-169": [
          "Trang trình bày/Bài phát biểu",
          "Trang trình chiếu Full HD 16:9"
        ]
      }
    }
  };
})(window);
