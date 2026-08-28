// FlClash 覆写脚本 — 标准 Mihomo 内核动态分流版
// 版本:v5.3.2-flclash.1 (2026-05-03)
// 修改:补全 Qure 图标链接；保留 emoji 分组名；恢复完整规则；清理 classical RULE-SET 外挂 no-resolve。
// 架构:18 url-test 区域组(9 全部 + 9 家宽)+ 34 业务策略组(新增独立 TikTok)+ 371+ rule-providers
// 100%+ 服务覆盖
// 基线:Clash Party Normal v5.3.2(规则 100% 等价;区域组为 url-test — FlClash 内核为标准 Mihomo,不支持
// smart + LightGBM)
// 适用:FlClash >= v0.8.85(覆盖脚本功能自该版本引入);其他使用标准 Mihomo 内核的客戶端
// 变更历史:见 `FlClash/CHANGELOG.md`
//
// === v6-noresolve-clean 修改记录 ===
// 1. 仅清理 classical rule-provider 对应 RULE-SET 末尾的 ,no-resolve。
// 2. 保留 ipcidr rule-provider 的 ,no-resolve，避免 IP 规则触发额外 DNS 解析。
// 3. 不改策略组名称、emoji、Qure icon、节点分类、rule-providers、DNS、TUN、sniffer 主逻辑。
//
// === v11-node-select 修改记录 ===
// 1. 仅新增可见总控策略组：🎯 节点选择。
// 2. 各业务策略组默认优先跟随 🎯 节点选择，避免每个分组都手动切换 🚀/⚡/🛟。
// 3. 不改 rule-providers、rules、DNS、TUN、sniffer、节点分类与图标映射主逻辑。
//
// === v13-no-all-auto-region-icons 修改记录 ===
// 1. 修复地区自动/手动组图标：香港/台湾/新加坡/日本/韩国/美国/欧洲等使用对应国家/地区图标。
// 2. 移除 ALL - 自动优选：避免与 🚀 自动优选 / ♻️ 自动选择产生重复入口。
// 3. 保留 ♻️ 自动选择：作为聚合入口，统一收纳 🚀/⚡/🛟 和各地区自动优选。
//
// === v12-wuzhenshi-node-ui 修改记录 ===
// 1. 融合 Wuzhenshi Fusion 的节点选择手感：🎯 节点选择、🚀 自动优选、⚡ 极速自动、🛟 自动兜底、♻️ 自动选择、🛜 全部节点、⚖️ 负载均衡。
// 2. 新增各地区「自动优选 + 手动选择」入口，并补充独立 🇯🇵 日本 / 🇰🇷 韩国 分组，不再只能通过「🇯🇵 日韩节点」混合选择。
// 3. 各业务策略组继续默认优先跟随 🎯 节点选择，同时保留原 Smart-Config 的 371+ rule-providers 与完整规则主逻辑。
// 4. 不改 DNS、TUN、sniffer、rule-providers、rules 主体，仅增强 proxy-groups 节点选择 UI。
//
//
// === v15-morphe-youtube-process 修改记录 ===
// 1. 新增 Morphe YouTube 包名进程级分流：
//    PROCESS-NAME,app.morphe.android.youtube,▶️ YouTube
// 2. 用于让 Morphe / 改包名 YouTube 客户端优先命中 YouTube 策略组。
// 3. 不改 rule-providers、rules 主体、DNS、TUN、sniffer、节点分类与策略组结构。
//
// === v17-xiaomi-system-fix-plus 修改记录 ===
// 1. 新增小米系统服务强保护白名单：小米云、查找手机、主题、账号、XMSF、定位/安全中心等优先 DIRECT。
// 2. 小米系统 DIRECT 规则最后注入并前置到 rules 最顶部，优先级高于 anti-ad / hagezi / miuiprivacy / App 噪音拦截。
// 3. 补充 Xiaomi / MiCloud / MIUI / Theme / Account 的 DNS policy、fake-ip-filter、sniffer skip-domain。
// 4. 不改 rule-providers、核心 rules 主体、节点分组、Qure 图标、Morphe YouTube 进程规则。
//
//
// === v18-geosite-tracker-fix 修改记录 ===
// 1. 修复 GeoSite.dat 不存在 tracker 分类导致配置应用失败的问题。
// 2. 移除无效规则：GEOSITE,tracker,🧲 BT/PT Tracker。
// 3. 保留后续手写 BT/PT Tracker 域名规则，不影响 Tracker 分流兜底。
// 4. 不改小米系统服务修复、Qure 图标、节点选择 UI、rule-providers、DNS/TUN/sniffer 主体。
//

//
// === v24-google-play-unified 修改记录 ===
// 1. 新增 🛒 Google Play 策略组，统一 Play 商店 / GMS / GSF / 下载 CDN 流量。
// 2. 前置 Google Play 规则：com.android.vending / com.google.android.gms / com.google.android.gsf / play.googleapis.com / android.clients.google.com / dl.google.com / gvt1/2/3 / googleusercontent / xn--ngstr。
// 3. 避免 Google Play 被拆到 下载更新 / 工具与服务 / 漏网之鱼 多个策略组，解决部分机场开脚本无法下载应用的问题。
// 4. 保留小米系统服务修复、GEOSITE tracker 修复、日本/韩国拆分、台湾 🇨🇳 识别、快速自动响应参数。
//
// === v26-google-play-downloadmanager-fakeipfix 修改记录 ===
// 1. 从 fake-ip-filter 清理 Google Play 下载链路域名：play / android / dl / gvt / xn--ngstr / play-lh。
// 2. 保留 fallback-filter 与 nameserver-policy 的 Google Play 外部解析策略，不全局禁 UDP/QUIC，不改 TUN。
// 3. 补充 Android 系统下载管理器进程：com.android.providers.downloads / downloads.ui → 🛒 Google Play。
// 4. 继续保持 FlClash / FlyClash / Bettbox 通用 Mihomo 兼容，不动小米系统修复、节点 UI、规则库主体。
//
// === v27-youtube-rvx-unified 修改记录 ===
// 1. 新增 RVX / ReVanced YouTube 包名进程级分流：app.rvx.android.youtube / app.revanced.android.youtube → ▶️ YouTube。
// 2. 前置 YouTube API 与改版客户端辅助接口：youtubei.googleapis.com / youtube.googleapis.com / sponsor.ajay.app / returnyoutubedislikeapi.com。
// 3. 只修复 YouTube/RVX 分流不统一导致首屏加载慢的问题；不改自动优选、节点选择、测速间隔、DNS/TUN 主体。
//
// === v28-region-auto-in-biz 修改记录 ===
// 1. 修复业务策略组候选列表缺少 Fusion 地区自动组的问题。
// 2. 🤖 AI 服务 / YouTube / Google Play / 工具与服务 / 社交媒体等业务组现在可直接选择：
//    🇭🇰 香港 - 自动优选、🏡 香港家宽 - 自动优选、🇹🇼 台湾 - 自动优选、🏡 台湾家宽 - 自动优选、🇸🇬 新加坡 - 自动优选、🏡 新加坡家宽 - 自动优选等。
// 3. 保留原始 Smart 区域组与 🏡 全球家宽自动，同时不改 rules、rule-providers、DNS/TUN、小米修复和 Google Play 修复主体。
// 4. 通过 activeSmartNames 过滤不存在的空地区组，避免 proxy not found。


//
// === v29-region-manual-in-biz-dedupe 修改记录 ===
// 1. 修复业务策略组候选列表缺少 Fusion 地区手动选择组的问题。
// 2. 🤖 AI 服务 / YouTube / Google Play / 工具与服务 / 社交媒体等业务组现在可直接选择：
//    🇭🇰 香港 - 手动选择、🇹🇼 台湾 - 手动选择、🇸🇬 新加坡 - 手动选择、🇯🇵 日本 - 手动选择、🇰🇷 韩国 - 手动选择，以及对应家宽手动选择。
// 3. 业务策略组不再塞入旧 Smart 区域组（如 🇹🇼 台湾节点 / 🇭🇰 香港节点），避免与 Fusion 自动/手动组重复。
// 4. 旧 Smart 区域组本体仍会创建并保留在底部，避免兼容性问题；只是不再作为业务策略组候选。

//
// === v31-remove-legacy-smart-region-groups 修改记录(2026-05-15) ===
// 1. 仅修复代理页/策略组页多出旧 Smart 地区组的问题。
// 2. 不再创建旧 Smart 地区组：🇭🇰 香港节点、🇹🇼 台湾节点、🇯🇵 日本节点、🇰🇷 韩国节点、🇺🇸 美国节点、🇪🇺 欧洲节点、🌏 亚太节点、🌎 美洲节点、🌍 非洲节点，以及对应家宽旧组。
// 3. 保留并继续使用 Fusion 地区组：地区 - 自动优选 / 地区 - 手动选择 / 地区家宽 - 自动优选 / 地区家宽 - 手动选择。
// 4. 保留 🏡 全球家宽自动，作为全局家宽聚合兜底；不修改 rules、rule-providers、DNS、TUN、sniffer、节点分类、业务策略组候选逻辑。


//
// === v32-tiktok-ciciai-isolation 修改记录(2026-05-15) ===
// 1. 仅修复 TikTok / CiciAI 分流污染问题，不修改 DNS、TUN、sniffer、Google Play、小米系统修复、节点 UI 与 rule-providers 主体。
// 2. 新增 TikTok 前置保护规则：TikTok App 进程、tiktok.com / tiktokv.com / tiktokcdn.com / musical.ly / byteoversea / ibytedtos / ibyteimg 等核心域名优先走 🌐 社交媒体。
// 3. TikTok 保护规则最终位于 szkane-ciciai、hagezi-tif、google-ip、cloudflare-ip 等宽规则之前，避免 TikTok 被 🤖 AI 服务 / 广告拦截 / 泛 IP 规则误吞。
// 4. CiciAI / Coze 仅通过更精准的 App 进程规则优先进入 🤖 AI 服务，减少 CiciAI 规则集对 TikTok 本体流量的污染。
// 5. 对 log/mon 开头的 tiktokv 日志/监控域名保留广告拦截入口；frontier / webcast-frontier / mssdk / vcs 等 TikTok 功能链路优先保护到 🌐 社交媒体。


// === v34-vidhub-jumbov6-mirror 修改记录 ===
// 1. 仅修正 V33 VidHub 域名/IP 清单，使其与「巨无霸6号-v1-VidHub全域补强版」保持一致。
// 2. 保留 🎬 VidHub 专属策略组，默认候选保持 Fusion 统一风格，首选 🎯 节点选择。
// 3. 使用 Qure Emby 图标：https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Emby.png
// 4. 保留 VidHub 进程级归位：com.oumi.utility.media.hub → 🎬 VidHub。
// 5. VidHub 域名/IP 清单严格对齐巨无霸6号-v1：onyra、okaapps、api.7littlemen.com、image.tmdb.org、www.premiumize.me、premiumize.me、121.43.145.95/32。
// 6. 删除 V33 额外补入但巨无霸6号-v1未写入的 vh.verify.okaapps.com、vidhub.okaapps.com、7littlemen.com 后缀、api.themoviedb.org、tmdb/themoviedb 后缀、api.premiumize.me。
// 7. 继续不接管 223.5.5.5，避免误伤阿里 DNS。
// 8. 不修改 DNS、TUN、sniffer、Google Play、小米系统修复、TikTok/CiciAI、地区 UI、rule-providers 主体。
//
//
// === v35-hbo-max-icon-flyclash-fix 修改记录 ===
// 1. 仅修复 FlyClash 中 🎞️ HBO/Max 策略组图标加载不出来的问题。
// 2. 将 HBO/Max 图标映射从 Qure 的 HBO_Max.png 改为 Qure 官方清单中存在的 HBO.png。
// 3. 不修改 HBO/Max 策略组名称、规则、域名、IP、节点候选、DNS、TUN、sniffer、VidHub、TikTok/CiciAI、Google Play、小米系统修复。
//
// === v36-hbo-max-icon-fastly-restore 修改记录 ===
// 1. 仅按用户指定恢复 🎞️ HBO/Max 策略组图标链接为 HBO_Max.png。
// 2. 指定图标链接：https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/HBO_Max.png
// 3. 不修改 HBO/Max 策略组名称、规则、域名、IP、节点候选。
// 4. 不修改 DNS、TUN、sniffer、VidHub、TikTok/CiciAI、Google Play、小米系统修复、地区 UI、rule-providers 主体。
// 4. 版本号递增为 V35，不覆盖 V34。

//
// === v37-neverless-financial-fix 修改记录 ===
// 1. 仅修复 Neverless（包名 money.boku.android）显示“无互联网连接”的误拦截问题。
// 2. 新增 Neverless 前置金融支付保护规则：
//    PROCESS-NAME,money.boku.android,💳 金融支付
//    DOMAIN,neverless.com,💳 金融支付
//    DOMAIN-SUFFIX,neverless.com,💳 金融支付
// 3. 这些规则通过前置注入，最终优先级高于 anti-ad / sukka-phishing / hagezi-tif 等广告、钓鱼、威胁拦截规则，避免 neverless.com 被 hagezi-tif 误杀。
// 4. 不全局放行 graph.facebook.com / appsflyersdk.com，避免污染其他 App 的广告/追踪拦截；由 PROCESS-NAME,money.boku.android 兜住 Neverless 进程流量。
// 5. 不修改 DNS、TUN、sniffer、VidHub、TikTok/CiciAI、Google Play、小米系统修复、HBO/Max 图标、地区 UI、rule-providers 主体。
//


// === v38-neverless-verified-financial-fix 修改记录 ===
// 1. 按最新日志结论整理 Neverless 修复说明，并继续保留 V37 的核心前置规则：
//    PROCESS-NAME,money.boku.android,💳 金融支付
//    DOMAIN,neverless.com,💳 金融支付
//    DOMAIN-SUFFIX,neverless.com,💳 金融支付
// 2. 明确修复目标：money.boku.android -> neverless.com 不再命中 hagezi-tif / anti-ad / sukka-phishing 的 🛡️ 广告拦截[REJECT]，而是优先命中 💳 金融支付。
// 3. 继续不全局放行 graph.facebook.com / appsflyersdk.com；只依靠 PROCESS-NAME,money.boku.android 让 Neverless 进程访问这些通用 SDK 域名时进入金融支付，避免污染其他 App 的广告/追踪拦截效果。
// 4. Neverless 规则仍通过前置注入，最终优先级高于 anti-ad / sukka-phishing / hagezi-tif 等广告、钓鱼、威胁拦截规则。
// 5. 不修改 DNS、TUN、sniffer、VidHub、TikTok/CiciAI、Google Play、小米系统修复、HBO/Max 图标、地区 UI、rule-providers 主体。
//


// === v39-ifastgb-financial-login-fix 修改记录(2026-06-10) ===
// 1. 将「巨无霸9号-v1-iFASTGB金融登录修复版」的核心修复同步到 V 系列脚本。
// 2. 新增 iFAST GB App 进程级前置归位：
//    PROCESS-NAME,com.ifast.gb,💳 金融支付
// 3. 新增 iFAST GB 登录/静态资源/通信链路前置金融支付保护：
//    www.ifastgb.com / ifastgb.com / static.ifastgb.com / communication-app.ifastgb.com / sentry.ifastgb.com / DOMAIN-SUFFIX,ifastgb.com
// 4. 新增 Fundsupermart 与安全检测链路前置金融支付保护：
//    secure.fundsupermart.com / DOMAIN-SUFFIX,fundsupermart.com / stest.zimperium.com
// 5. 规则优先级高于 anti-ad / sukka-phishing / hagezi-tif / cloudfront-ip / proxy 等通用规则，避免登录链路被国外网站、广告拦截、泛 CDN/IP 规则误抢。
// 6. 不全局放行 graph.facebook.com / ytimg.com / msftncsi.com，优先依赖 PROCESS-NAME,com.ifast.gb，避免污染其他 App 的广告、流媒体和系统探测分流。
// 7. 不修改 DNS、TUN、sniffer、VidHub、TikTok/CiciAI、Google Play、小米系统修复、HBO/Max 图标、地区 UI、rule-providers 主体。
//


// === v40-jumbo15-mainline-lite-sync 修改记录(2026-06-29) ===
// 1. 将巨无霸系列截至「巨无霸15号-v1-giffgaff登录修复版」的共用主干同步到 V 系列；只同步精准补丁与基础骨架，不导入 18MB+ Loyalsoldier 全量内联规则。
// 2. 新增 OpenAI/ChatGPT 上传与附件链路、FlClash/Meta 客户端自身进程保护，并补齐 IPv6、DNS policy、sniffer force-domain 主干。
// 3. 新增 Telegram 内置翻译加速、DeepL App/网页/文件翻译归位；均复用现有 🛠️ 工具与服务，不增加重型 provider。
// 4. 新增 NoOnes Google 登录与 LAMS 二次修复：NoOnes 归入 ₿ 加密货币，Google OAuth/Firebase/LAMS 归入 🛒 Google Play。
// 5. 新增独立 🎵 TikTok 策略组；TikTok 主体、Live/CDN、局域网代理与修改版依赖统一归组，CiciAI/Coze 继续进入 🤖 AI 服务，log/mon 遥测继续进入 🛡️ 广告拦截。
// 6. 新增 OKX/欧易 App、官方域名与日志确认备用域名归入 ₿ 加密货币；新增 giffgaff 登录所需 Dynamic Yield/OneTrust 精准兼容规则。
// 7. 保持 V 系列定位：不复制巨无霸全量内联规则、不增加大体积规则表、不改 371+ rule-providers 主体，继续以轻量、好用、省电为优先。
//
// === v41-jumbo16-xiaomi-hyperos-ota-fix 修改记录(2026-06-30) ===
// 1. 将「巨无霸16号-v1-小米HyperOS系统更新修复版」的 OTA 共用主干同步到 V 系列；仅增加精准系统更新补丁，不导入巨无霸重型内联规则。
// 2. 新增 HyperOS / MIUI OTA 主下载域名 DIRECT 前置：ultimateota.d.miui.com、superota.d.miui.com、bigota.d.miui.com、+.d.miui.com。
// 3. 新增日志确认的迅雷 OTA 辅助链路精准直连：etl-xlmc-ssl.sandai.net、+.xlmc.sandai.net、+.shub.sandai.net、+.rcv.sandai.net；不放行整个 sandai.net。
// 4. 新增系统更新器进程直连：com.android.updater / com.miui.updater；保留 com.android.providers.downloads → 🛒 Google Play，依靠更高优先级 OTA 域名规则避免误伤 Play 商店下载。
// 5. OTA 域名使用 AliDNS + DNSPod 双国内 DoH，并开启 direct-nameserver-follow-policy，降低系统更新域名解析失败概率。
// 6. OTA 与断点续传域名加入 fake-ip-filter 和 sniffer skip-domain，保持真实 IP、签名域名与 SNI 一致。
// 7. 不修改节点分组、rule-providers、现有业务规则、Google Play 主干及其他 V40 功能；继续保持 V 系列轻量、省电路线。
//
// === v42-metamask-startup-fix 修改记录(2026-07-01) ===
// 1. 根据 Clash 日志修复 MetaMask 启动链路被广告规则误杀：api2.branch.io / cdn.branch.io 原先命中 anti-ad → REJECT。
// 2. 新增 MetaMask Android 进程精准归组：io.metamask 及其冒号子进程 → ₿ 加密货币。
// 3. 新增 MetaMask 官方域名优先归组：DOMAIN-SUFFIX,metamask.io → ₿ 加密货币，确保核心 API 不被后续宽规则抢走。
// 4. 仅放行日志确认参与启动的 Branch 主机 api2.branch.io、cdn.branch.io；不放行整个 branch.io，避免其他 App 的归因/追踪流量被全局绕过广告拦截。
// 5. 不放行 q.stripe.com：该域名只影响买币/支付遥测，不是钱包主页启动所必需，继续保持 V 系列轻量与隐私优先。
// 6. 不修改节点分组、rule-providers、DNS、TUN、sniffer、HyperOS OTA 及其他 V41 功能。
//
// === v43-tiktok-playback-stability-fix 修改记录(2026-07-02) ===
// 1. 根据 TikTok.Mod.Jaggu 日志修复视频偶发无法播放、持续转圈与连接风暴问题。
// 2. 新增日志确认的修改版进程精准归组：TikTok.Mod.Jaggu 及其冒号子进程 → 🎵 TikTok，确保该修改版全部请求使用同一出口。
// 3. 将旧的 log/mon tiktokv 遥测规则从可手动切换的 🛡️ 广告拦截组改为固定 REJECT；即使广告组被切到 DIRECT，也不会再尝试直连污染 IP、触发 connection refused / i/o timeout 重试风暴。
// 4. 为 tiktok.com / tiktokv.com / tiktokcdn.com / ibyteimg / ibytedtos / byteoversea 等核心链路补充 Google DoH nameserver-policy 与 fallback-filter，降低 DNS 污染和异常 IPv4/IPv6 解析概率。
// 5. 补充 TikTok 核心域名强制嗅探，维持域名、SNI 与策略组一致；不全局关闭 IPv6、不禁用 QUIC、不修改其他 App 的广告策略。
// 6. 不新增 rule-provider，不扩大巨无霸规则，不修改 MetaMask、HyperOS OTA、Neverless、Google Play 及其他 V42 功能，继续保持 V 系列轻量、省电路线。
//
// === v44-adguard-dns-lite-enhancement 已跳过 ===
// 本分支按用户要求不启用 AdGuard DNS：不把 fallback 改到 dns.adguard-dns.com，避免 DNS 层误杀。
//
// === v45-adguard-firefox-extension-compatibility-fix 修改记录(2026-07-03) ===
// 1. 根据 Firefox 日志修复 AdGuard 浏览器扩展无法初始化/加载过滤器的问题：filters.adtidy.org、AdGuard 官方域名及 Mozilla 扩展商店链路优先进入工具/下载组。
// 2. 新增 api.ipify.org 出口 IP 检测白名单，避免被 hagezi-tif 误判后导致扩展测试页和部分诊断页面反复失败。
// 3. 对 incoming.telemetry.mozilla.org 使用 REJECT-DROP 静默丢弃，继续阻止遥测上传，同时避免普通 REJECT 引发 Firefox 毫秒级重试风暴。
// 4. 为 AdGuard/Firefox 扩展所需域名补充 Google + Cloudflare 干净 DoH nameserver-policy，绕过 AdGuard DNS 自身可能造成的循环误杀。
// 5. 修正 TikTok log/mon 遥测规则优先级：域名硬拒绝置于 TikTok.Mod.Jaggu 进程规则之前，确保遥测不会被整包进程归组抢走。
// 6. 不放行整个 Firefox、不放行整个 mozilla.org，不降低网页广告拦截强度；不新增 rule-provider，保持 V44 轻量结构。
//
// === v46-financial-risk-core-service-fix 修改记录(2026-07-03) ===
// 1. 根据最新日志修复 Checkout.com 支付风控链路误杀：fpjs.checkout.com / fpjscache.checkout.com / risk.checkout.com 优先进入 💳 金融支付。
// 2. 修复 OKX 钱包调用 ThreatMetrix 设备风控时被 anti-ad 误杀：DOMAIN-SUFFIX,online-metrix.net → 💳 金融支付；不放行 AppsFlyer、Crashlytics、Mixpanel 等普通统计 SDK。
// 3. 修复 voilatile-pa.googleapis.com 被 hagezi-tif 误判导致 Google 定位/设备服务潜在异常：仅精准归入 🛠️ 工具与服务。
// 4. 修复 settings-win.data.microsoft.com 被激进规则反复拒绝导致 Windows/Xbox 动态配置潜在异常：仅精准归入 🛠️ 工具与服务。
// 5. 为上述 6 条关键链路补充 Google + Cloudflare 干净 DoH nameserver-policy，避免 AdGuard DNS 与激进规则形成双重误杀。
// 6. 不放行整个 checkout.com / googleapis.com / microsoft.com，不改 Customer.io、Sentry、Mixpanel、AppsFlyer、Datadog 等广告与统计拦截，保持 V45 去广告强度。
//
//
// === v47-microsoft-signup-human-verify-fix 修改记录(2026-07-06) ===
// 1. 根据微软注册日志修复 HUMAN / PerimeterX 人机验证链路被 hagezi-tif 误杀：hsprotect.net / px-cloud.net / px-cdn.net 优先进入 Ⓜ️ 微软服务。
// 2. 将 signup.live.com / login.live.com / account.live.com / fpt.live.com / login.microsoftonline.com 等注册登录主链路前置到 Ⓜ️ 微软服务，避免被 AI/广告/宽泛规则抢先命中。
// 3. 补充 msftauth.net、df.cfp.microsoft.com、account.microsoft.com 等微软认证与设备风险判断域名的前置规则和干净 DoH 策略。
// 4. 不放行 browser.events.data.microsoft.com、mobile.events.data.microsoft.com 等普通微软遥测；不放行整个 microsoft.com / live.com / HUMAN 全量域名，保持 V46 去广告强度。
// 5. 不新增 rule-provider，不改变金融、AdGuard、Firefox、TikTok、小米 OTA 等既有修复，继续保持 V 系列轻量路线。
//
// === v48-no-adguard-dns-safe-sync 修改记录(2026-07-07) ===
// 1. 以 V43 TikTok 播放稳定修复版为安全底座，同步当前已验证的兼容性修复，但不启用 V44 AdGuard DNS。
// 2. 移除/跳过 AdGuard DNS fallback、dns.adguard-dns.com hosts/bootstrap、AdGuard DoH fake-ip-filter 与 sniffer 绑定。
// 3. 保留 V45 Firefox/AdGuard 扩展兼容的普通域名前置规则，但这些规则只做路由兼容，不把 AdGuard 当系统 DNS 使用。
// 4. 保留 V46 Checkout.com / ThreatMetrix / Google 定位 / Windows 动态配置误拦截修复。
// 5. 保留 V47 Microsoft 注册、登录与 HUMAN/PerimeterX 人机验证链路修复，避免 signup.live.com 流程中验证码 404。
// 6. 继续保持 V 系列轻量路线：不新增 rule-provider，不导入巨无霸重型规则，不降低广告组 REJECT 强度。
//


// === v49-login-core-anti-falseblock 修改记录(2026-07-07) ===
// 1. 新增登录/账号核心链路防误拦截补丁：把 Google 登录、Google Play 账号同步、Android WebView 登录依赖域名前置到 🛒 Google Play / 🛠️ 工具与服务。
// 2. 重点修复日志确认的 clientservices.googleapis.com 被 anti-ad → 🛡️ 广告拦截[REJECT] 误杀，导致 MuMu / Android 模拟器登录 Google 一直转圈的问题。
// 3. 补充 Microsoft fpt.microsoft.com 登录/账号页面链路，避免 Edge / Microsoft/Xbox 账号页被广告规则误吞。
// 4. 不放行整个 googleapis.com、gstatic.com、Microsoft 遥测或广告 SDK；只前置登录、账号、WebView 初始化所需的窄域名。
// 5. 继续保持无 AdGuard DNS：不启用 dns.adguard-dns.com，不修改 fallback 到 AdGuard DoH，仅保留浏览器扩展兼容规则。
//
//
// === v50-grok-google-login-init-fix 修改记录(2026-07-10) ===
// 1. 根据 Grok App 登录 Google 日志修复：ai.x.grok 在进入 Google OAuth 前，AppsFlyer/Braze/Mixpanel/Firebase 初始化链路被 anti-ad / hagezi-tif 反复 REJECT，导致登录页一直转圈。
// 2. 新增 Grok App 进程级前置归组：PROCESS-NAME,ai.x.grok → 🤖 AI 服务，确保 Grok App 自身所有启动/登录/授权回跳链路先于广告规则命中。
// 3. 补充日志确认的 Grok 登录前初始化与网页 SSO 窄域名：9zje6z.*.appsflyersdk.com、sdk.iad-04.braze.com、api.mixpanel.com、geolocation.onetrust.com、websdk.appsflyersdk.com、auth.grok.com / auth.x.ai / accounts.x.ai / challenges.cloudflare.com。
// 4. 补充 oauth2.googleapis.com、apis.google.com、ogs.google.com、time.google.com 到 Google 登录/时间同步保护；解决 Google OAuth 尚未启动或 NTP 解析异常时的转圈/回跳失败。
// 5. 不关闭广告拦截、不删除 anti-ad / hagezi-tif，不放行 doubleclick / googleadservices / ads-api.x.com；仍保持 V 系列轻量与隐私优先。
//
// === v51.1-node-select-logic-restore 修改记录(2026-07-10) ===
// 1. 撤销未获授权的“🔐 登录支付固定出口”策略组及其所有引用。
// 2. 恢复原有主链路：业务策略组默认首选 🎯 节点选择；🎯 节点选择默认首选 🚀 自动优选。
// 3. AI 服务、Google Play、金融支付、微软服务不再被强制改写默认出口，继续服从用户的主策略组选择。
// 4. 广告拦截组恢复为 REJECT / DIRECT，不再插入额外兼容出口。
// 5. 保留已确认的结构修复：Hagezi Ultimate 替换、公共 SDK 全局 AI 规则清理、Google Play Fake-IP 清理、DNS 补齐、台湾分类修复、Grok 正则修复。
// 6. 不新增策略组、不改变用户原有自动优选逻辑，不启用 AdGuard DNS，不修改 Qure 图标链接主干。
//
// === v51.2-login-payment-maintenance 修改记录(2026-07-10) ===
// 1. 修复无现成 DNS 配置时被业务补丁提前创建空壳对象、导致完整基础 DNS 初始化失效的问题。
// 2. 调整 Grok 进程兜底与核心登录/支付规则的注入顺序，确保 Google/Microsoft 登录和金融风控域名优先命中专属业务组。
// 3. 删除已被官方 DOMAIN-SUFFIX 规则完全覆盖的 xiaomi/miui/micloud 宽泛关键词直连，避免陌生域名仅因名称包含关键词而绕过安全规则。
// 4. 不新增策略组、规则源、域名或功能；保留节点选择、业务组默认项、广告拦截、DNS/TUN/Sniffer 与规则主体结构。
//
// === v51.3-youtube-caption-anti-falseblock 修改记录(2026-07-11) ===
// 1. 根据 YouTube 播放日志补齐字幕、自动翻译与嵌入播放器窄链路，避免字幕请求被后续广告/宽泛 Google 规则抢走。
// 2. 将 www.youtube.com、youtubei.googleapis.com、youtube.googleapis.com、jnn-pa.googleapis.com、youtubeembeddedplayer.googleapis.com、video.google.com 等字幕相关端点最终前置到 ▶️ YouTube。
// 3. 为上述字幕链路补充干净境外 DNS、fallback-filter 与 Sniffer force-domain，降低字幕列表消失、自动翻译不出现和切换字幕无响应的概率。
// 4. 不全局放行 www.google-analytics.com、DoubleClick 或 Cookiebot；继续保留广告拦截强度，避免为了字幕放开整套跟踪域名。
// 5. 不新增策略组或规则源，不改变 🎯 节点选择、业务组默认项、自动优选、DNS/TUN 主结构及其他既有功能。
//
// === v52-routing-healthcheck-fix 修改记录(2026-07-15) ===
// 1. 修复 PreRepairEasyPrivacy 被整包送入广告拦截的反向逻辑：按上游 DIRECT / PROXY / REJECT 三类拆分引用，并前置到所有广告规则之前。
// 2. 修复 UnsupportVPN 被误送入广告拦截：该规则集语义为“不支持 VPN、但可直连的网站”，改为 DIRECT 并前置保护。
// 3. 修复全量海外节点高频测速风暴：自动优选、极速自动和自动兜底统一启用 lazy，测速周期调整为 300 / 180 / 180 秒。
// 4. 自动测速统一校验 HTTP 204；负载均衡周期调整为 600 秒，降低移动端耗电、流量和大量节点下的并发压力。
// 5. 保留 V51.3 YouTube 字幕防误拦补丁、节点选择默认链路、DNS/TUN/Sniffer 与其他业务规则不变。
//
// === v53-fast-auto-background-switch 修改记录(2026-07-15) ===
// 1. 按用户确认将 ⚡ 极速自动恢复为每 60 秒检测，满足长时间后台挂代理时及时发现低延迟节点和断联节点。
// 2. ⚡ 极速自动继续使用 url-test、20ms 切换容差、lazy:true 与 HTTP 204 健康校验；仅该策略组被实际使用时定期检测。
// 3. 将 ⚡ 极速自动的 max-failed-times 从 3 调整为 2，缩短节点连续失败后的健康检查响应时间。
// 4. 不修改 🚀 自动优选、🛟 自动兜底、⚖️ 负载均衡、地区分组、规则、rule-providers、DNS、TUN、Sniffer 或其他功能。
//
// === v54-legacy-healthcheck-restore 修改记录(2026-07-16) ===
// 1. 按用户确认，完整恢复 V51.3 的后台自动测速策略，不再使用 V52/V53 的按需测速参数。
// 2. 🚀 自动优选恢复为 180 秒、30ms 容差、lazy:false；⚡ 极速自动恢复为 60 秒、0ms 容差、lazy:false。
// 3. 🛟 自动兜底恢复为 20 秒、lazy:false；⚖️ 负载均衡恢复为 300 秒、lazy:true。
// 4. 🏡 全球家宽自动恢复为 120 秒；地区自动与地区家宽自动保持 300 秒，并移除 V52 新增的 expected-status 字段。
// 5. 四个核心测速组均恢复 V51.3 原字段，移除 V52/V53 新增的 expected-status 与 max-failed-times。
// 6. 不修改任何策略组名称、组内节点、业务组默认选择、节点选择结构、规则、rule-providers、DNS、TUN、Sniffer 或其他功能。
//
// === v55-block-rules-last 修改记录(2026-07-17) ===
// 1. 按用户确认采用“正常功能优先、拦截规则最后兜底”的全局优先级。
// 2. 所有指向 🛡️ 广告拦截 的规则，以及所有 REJECT / REJECT-* 规则，在全部业务补丁完成后统一移动到唯一 MATCH 之前。
// 3. 广告、追踪、钓鱼、恶意域名、威胁情报及脚本内硬拒绝规则均进入最终拦截层；只在前面的正常功能规则均未命中时生效。
// 4. 保持全部拦截规则原有相对顺序；PreRepairEasyPrivacy 的 DIRECT / PROXY 修复例外与 UnsupportVPN DIRECT 仍位于拦截层之前。
// 5. 保留 V54 旧版后台自动测速参数，不修改策略组、业务组默认选择、节点分类、rule-providers、DNS、TUN、Sniffer 或其他业务规则。
//
// === v55.1-modelflare-proxy-routing-fix 修改记录(2026-07-20) ===
// 1. 根据日志修复 modelflare.dev 被异常解析到 127.0.0.2 后命中 GEOIP,private → DIRECT，导致 IPv4 拒绝连接、IPv6 不可达的问题。
// 2. 仅新增 DOMAIN-SUFFIX,modelflare.dev → 🤖 AI 服务，并置于 GEOSITE/GEOIP private 直连规则之前。
// 3. 主域名及 origin/api 等同域子域统一进入 🤖 AI 服务，并继续默认服从 🎯 节点选择。
// 4. 不修改自动测速、策略组结构、业务组默认选择、DNS、IPv6、广告拦截、rule-providers、TUN、Sniffer 或其他业务规则。
//
// === v56-asn-database-fix 修改记录(2026-08-03) ===
// 1. 修复 Unsupported ASN type: GeoLite2-Country：为 Mihomo 明确注入独立的 GeoLite2 ASN 数据库地址。
// 2. 只补齐 geox-url.asn，并保留订阅原有的 geoip、geosite、mmdb 及其他 GeoX 字段。
// 3. 不修改自动测速、DNS、策略组、规则顺序、广告后置、ModelFlare 路由、节点分类或业务分流。
//
// === v57-xunlei-full-chain-direct-fix 修改记录(2026-08-10) ===
// 1. 修复迅雷官网、账号、会员、云盘、下载/CDN 与客户端传输链路在脚本开启后无法访问的问题。
// 2. 迅雷核心域名与官方客户端进程统一优先 DIRECT，并使用 AliDNS + DNSPod 国内 DoH 解析。
// 3. 迅雷域名加入 fake-ip-filter 与 sniffer skip-domain，避免 P2P、断点续传和签名下载链路被 Fake-IP/SNI 干扰。
// 4. 不新增策略组或规则源，不修改 V56 ASN、自动测速、DNS 主结构、广告规则后置及其他业务分流。
//
// === v57.1-mineradio-music-routing-fix 修改记录(2026-08-11) ===
// 1. 按用户指定，将 mineradio.cn 主域名及全部子域名统一归入 🎧 音乐流媒体策略组并走代理。
// 2. 仅新增 DOMAIN-SUFFIX,mineradio.cn → 🎧 音乐流媒体，不扩展到其他域名或服务。
// 3. 不新增、删除或改名策略组，不修改 V57 迅雷修复、自动测速、DNS、广告后置及其他业务分流。
//
// === v58-cn-access-compatibility-fix 修改记录(2026-08-13) ===
// 1. 修复 119.29.29.29 被香港流媒体 IP 规则抢走，导致 QQ、微信、腾讯、B站及小米域名批量解析失败的问题。
// 2. 国内 DNS/DoH 端点最高优先级 DIRECT；中国规则集与 .cn/中文顶级域名统一使用 AliDNS + DNSPod 双国内 DoH。
// 3. 将脚本写入的单一 119.29.29.29 域名策略升级为双国内 DoH，避免节点波动拖垮国内 App DNS。
// 4. 最终 GEOIP,CN 兜底允许按域名触发真实 IP 解析，并继续位于广告/REJECT 最终层之前，减少中国站点被 anti-ad 误杀。
// 5. 保留 MineRadio → 🎧 音乐流媒体、迅雷 DIRECT、V56 ASN、策略组结构、默认选择、旧版自动测速、TUN 与 Sniffer 不变。
//
// === 导入方法(FlClash,两步操作) ===
//
// 必须先「创建」脚本再「关联」到订阅!
//
// 【第 1 步:创建覆写脚本】
// FlClash → 配置 →「覆写脚本」→ 右上⻆ + → 输入名称
// 方式 A(URL):填入 https://raw.githubusercontent.com/IvanSolis1989/Smart-Config-Kit/main/
// FlClash/FlClash(mihomo).js
// 方式 B(粘贴):打开上方 GitHub 链接,全选复制粘贴
// 方式 C(jsdelivr):https://cdn.jsdelivr.net/gh/IvanSolis1989/Smart-Config-Kit@main/FlClash/
// FlClash(mihomo).js
// 保存。
//
// 【第 2 步:关联到订阅】
// 配置页 → 订阅卡片 ⋮ →「更多」→「覆写」→ 点选刚才创建的脚本 → 确定 → 下拉刷新。
//
// GitHub 被墙时先确保代理已通,或用 jsdelivr CDN / 手动粘贴。
//
// === 脚本导入后必做的手动配置(FlClash UI 内操作) ===
// 外部资源与 DNS 仍可由 FlClash App UI 管理；V56 会自动补齐 geox-url.asn:
// 1. 外部资源(GeoX URL):V56 自动写入 ASN；geoip / geosite / mmdb 继续沿用订阅或 UI 配置
// 2. 进阶配置(DNS):编辑订阅 →「进阶配置」标签 → 粘贴 dns YAML
// 完整 YAML 见:FlClash/README.md → 第 4 步 必改配置
//
// === 与 CMFA YAML 的选择 ===
// - 本 JS 脚本:动态节点分类(word-boundary 正则,精确度高于 YAML filter:)、
// 自动清理订阅垃圾组、家宽识别、空区域自动不建组
// - CMFA YAML:静态配置,适合不想用脚本的用戶;导入即用无需额外操作
// ================================================================
// 版本常量
// ================================================================
const VERSION = 'v5.3.2-flclash.1-qure-iconfix.58-cn-access-compatibility-fix'
const V56_ASN_URL = 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb'
// FlClash JS 引擎环境兼容:QuickJS 可能不提供 console,安全包装
var log = (typeof console !== 'undefined' && console.log) ? console.log.bind(console) :
function(){}
// ================================================================
// 模块 A:节点过滤 / 家宽识别
// ================================================================
function isInfoNode(name) {
const infoPatterns = ['导航网址', '距离下次重置', '剩余流量', '套餐到期', '网址导航', '官网', '订阅',
'到期', '剩余', '重置']
const s = String(name || '')

return infoPatterns.some(p => s.includes(p))
}
const RESIDENTIAL_PATTERNS = [
/家宽|家庭宽带|家庭住宅|住宅宽带|住宅|宽带/,
/\bresi(?:dential)?\b/i,
/\bhome(?:\s|-|_)?ip\b/i,
/\bhome(?:\s|-|_)?broadband\b/i,
/\bbroadband\b/i,
/\bisp\b/i,
]
function isResidentialNode(name) {
const s = String(name || '')
return RESIDENTIAL_PATTERNS.some(re => re.test(s))
}
// ================================================================
// 模块 B:国家/地区分类数据库(v4.5.1 修复 CN 区域)
// ================================================================
const REGION_DB = [
// v5.2.6-normal.1 FIX#24-P0: 补⻬ ISO alpha-3 代码(TWN/JPN/KOR/SGP/CHN),
// 与 Clash Smart 内核覆写脚本.js 保持对⻬(见 Smart 版同编号修复)
{ id: 'HK', kw: ['香港', 'hong kong', 'hongkong', 'hkg'], iso: ['HK'] },
{ id: 'TW', kw: ['台湾', '台北', '台中', '高雄', '新北', '桃园', 'taiwan', 'taipei', 'taichung',
'kaohsiung', 'tpe', 'twn', '🇹🇼'], iso: ['TW'] },
{ id: 'CN', kw: ['🇨🇳', '中国', '大陆', '国内', '中国大陆', 'china', 'mainland', '回国节点', '回国专线', '回国线路', '回国加速', '回国服务', '直连国内', '国内直连', '中转国内', '落地国内', '北京', '上海', '广州', '深圳', 'beijing', 'shanghai', 'guangzhou', 'shenzhen', '成都', '重庆', '杭州', '南京', '武汉', '天津',
'苏州', '西安', '⻓沙', 'chengdu', 'chongqing', 'hangzhou', 'nanjing', 'wuhan', 'tianjin',
'suzhou', 'xian', 'changsha', '沈阳', '⻘岛', '郑州', '大连', '东莞', '宁波', '厦门', '济南', '无锡',
'合肥', '昆明', '福州', '哈尔滨', '佛山', '⻓春', '石家庄', '太原', '南宁', '贵阳', '乌鲁木⻬', '兰州', '海口', '银川', '西宁', '拉萨', '呼和浩特', '电信', '联通', '移动', '铁通', 'chinatelecom', 'chinaunicom',
'chinamobile', 'chn', 'pek', 'pkx', 'pvg', 'szx', 'ctu', 'ckg', 'hgh', 'nkg', 'wuh', 'tsn',
'syx', 'xiy', 'csx', 'kmg', 'hak', 'dlc', 'tao', 'she', 'hrb', 'cgo'], iso: ['CN'] },
{ id: 'JP', kw: ['日本', '东京', '大阪', '横滨', '名古屋', '福冈', '札幌', '京都', '神戶', '千叶', '埼玉', '仙台', '广岛', '冲绳', '那霸', 'japan', 'tokyo', 'osaka', 'yokohama', 'nagoya', 'fukuoka',
'sapporo', 'kyoto', 'kobe', 'chiba', 'sendai', 'hiroshima', 'okinawa', 'naha', 'jpn', 'nrt',
'hnd', 'kix', 'ngo', 'fuk', 'cts', 'oka'], iso: ['JP'] },
{ id: 'KR', kw: ['韩国', '首尔', '釜山', '仁川', '大田', '大邱', '光州', '济州', 'korea', 'seoul',
'busan', 'incheon', 'daejeon', 'daegu', 'gwangju', 'jeju', 'kor', 'icn', 'gmp', 'pus'], iso:
['KR'] },
{ id: 'SG', kw: ['新加坡', 'singapore', 'sgp', 'sin'], iso: ['SG'] },
{ id: 'US', kw: ['美国', 'united states', 'america', 'usa', '洛杉矶', 'los angeles', '圣何塞',
'san jose', '旧金山', '三藩市', 'san francisco', '西雅图', 'seattle', '纽约', 'new york', '芝加哥',
'chicago', '达拉斯', 'dallas', '丹佛', 'denver', '凤凰城', 'phoenix', '亚特兰大', 'atlanta', '迈阿密',
'miami', '波士顿', 'boston', '华盛顿', 'washington', '费城', 'philadelphia', '休斯顿', 'houston', '圣地亚哥', 'san diego', '拉斯维加斯', 'las vegas', '波特兰', 'portland', '硅谷', 'silicon valley', '弗吉尼亚', 'virginia', '夏洛特', 'charlotte', '奥斯汀', 'austin', '纳什维尔', 'nashville', '盐湖城', 'saltlake', '明尼阿波利斯', 'minneapolis', '圣路易斯', 'st louis', '堪萨斯', 'kansas city', '底特律',
'detroit', '匹兹堡', 'pittsburgh', '克利夫兰', 'cleveland', '檀香山', 'honolulu', '安克雷奇',
'anchorage', 'lax', 'sjc', 'sfo', 'sea', 'jfk', 'ewr', 'ord', 'dfw', 'iad', 'atl', 'mia', 'bos',
'den', 'phx', 'iah', 'msp', 'dtw', 'phl', 'san', 'las', 'slc', 'pdx', 'clt', 'hnl', 'anc'], iso:
['US'] },
{ id: 'EU', kw: ['欧洲', 'europe', '英国', 'united kingdom', 'england', 'britain', 'london', '伦敦', 'manchester', '曼彻斯特', 'birmingham', 'glasgow', 'edinburgh', 'liverpool', 'leeds',
'bristol', 'lhr', 'lgw', 'man', 'edi', '爱尔兰', 'ireland', 'dublin', '都柏林', '法国', 'france',

'paris', '巴黎', 'marseille', '马赛', 'lyon', '里昂', 'nice', 'toulouse', 'cdg', 'ory', '德国',
'germany', 'frankfurt', '法兰克福', 'berlin', '柏林', 'munich', '慕尼黑', 'hamburg', '汉堡',
'dusseldorf', 'cologne', 'fra', 'muc', 'ber', '荷兰', 'netherlands', 'holland', 'amsterdam', '阿姆斯特丹', 'rotterdam', 'ams', '比利时', 'belgium', 'brussels', '布鲁塞尔', '卢森堡', 'luxembourg', '瑞士', 'switzerland', 'zurich', '苏黎世', 'geneva', '日内瓦', 'bern', 'zrh', '奥地利', 'austria',
'vienna', '维也纳', 'vie', '列支敦士登', 'liechtenstein', '摩纳哥', 'monaco', '丹⻨', 'denmark',
'copenhagen', '哥本哈根', '冰岛', 'iceland', 'reykjavik', '挪威', 'norway', 'oslo', '奥斯陆', '瑞典',
'sweden', 'stockholm', '斯德哥尔摩', '芬兰', 'finland', 'helsinki', '赫尔辛基', '爱沙尼亚', 'estonia',
'tallinn', '塔林', '拉脱维亚', 'latvia', 'riga', '里加', '立陶宛', 'lithuania', 'vilnius', '维尔纽斯',
'意大利', 'italy', 'rome', '罗马', 'milan', '米兰', 'naples', 'florence', 'fco', 'mxp', '西班牙',
'spain', 'madrid', '马德里', 'barcelona', '巴塞罗那', 'mad', 'bcn', '葡萄牙', 'portugal', 'lisbon',
'里斯本', '希腊', 'greece', 'athens', '雅典', '马耳他', 'malta', '安道尔', 'andorra', '圣马力诺', 'sanmarino', '波兰', 'poland', 'warsaw', '华沙', 'krakow', 'waw', '捷克', 'czech', 'prague', '布拉格',
'斯洛伐克', 'slovakia', 'bratislava', '匈牙利', 'hungary', 'budapest', '布达佩斯', '罗马尼亚',
'romania', 'bucharest', '布加勒斯特', '保加利亚', 'bulgaria', 'sofia', '索菲亚', '俄罗斯', 'russia',
'moscow', '莫斯科', 'svo', 'dme', '乌克兰', 'ukraine', 'kiev', 'kyiv', '基辅', '白俄罗斯', 'belarus',
'minsk', '明斯克', '摩尔多瓦', 'moldova', 'chisinau', '塞尔维亚', 'serbia', 'belgrade', '贝尔格莱德',
'黑山', 'montenegro', '克罗地亚', 'croatia', 'zagreb', '斯洛文尼亚', 'slovenia', 'ljubljana', '波黑',
'bosnia', 'herzegovina', 'sarajevo', '马其顿', 'macedonia', 'skopje', '阿尔巴尼亚', 'albania',
'tirana', '科索沃', 'kosovo', 'pristina', '塞浦路斯', 'cyprus', 'nicosia', '格鲁吉亚', 'georgia',
'tbilisi', '第比利斯'], iso: ['GB', 'UK', 'IE', 'FR', 'DE', 'NL', 'LU', 'CH', 'DK', 'SE', 'FI',
'EE', 'LV', 'LT', 'ES', 'PT', 'GR', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'RU', 'UA', 'MD', 'RS',
'HR', 'SI', 'MK', 'XK', 'CY', 'GE', 'EU'] },
{ id: 'AM', kw: ['美洲', 'americas', '拉丁美洲', 'latin america', '南美', 'south america', '中美洲', 'central america', '加勒比', 'caribbean', '加拿大', 'canada', 'toronto', '多伦多', 'vancouver',
'温哥华', 'montreal', '蒙特利尔', 'ottawa', '渥太华', 'calgary', '卡尔加里', 'edmonton', 'winnipeg',
'yyz', 'yvr', 'yul', '墨西哥', 'mexico', 'mexico city', '墨西哥城', 'cancun', '坎昆', 'guadalajara',
'monterrey', 'mex', '危地马拉', 'guatemala', '伯利兹', 'belize', '萨尔瓦多', 'el salvador', '洪都拉斯', 'honduras', '尼加拉瓜', 'nicaragua', '哥斯达黎加', 'costa rica', '巴拿马', 'panama', '古巴',
'cuba', '牙买加', 'jamaica', '多米尼加', 'dominican republic', '波多黎各', 'puerto rico', '巴哈马',
'bahamas', '巴巴多斯', 'barbados', '特立尼达', 'trinidad', '海地', 'haiti', '巴西', 'brazil', 'saopaulo', '圣保罗', 'rio de janeiro', '里约热内卢', 'gru', 'gig', '阿根廷', 'argentina', 'buenosaires', '布宜诺斯艾利斯', 'eze', '智利', 'chile', 'santiago', '秘鲁', 'peru', 'lima', '利马', '哥伦比亚', 'colombia', 'bogota', '波哥大', 'medellin', '委内瑞拉', 'venezuela', '厄瓜多尔', 'ecuador', '玻利维亚', 'bolivia', '巴拉圭', 'paraguay', '乌拉圭', 'uruguay', 'montevideo', '圭亚那', 'guyana', '苏里南', 'suriname'], iso: ['CA', 'MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 'CR', 'PA', 'CU', 'JM', 'PR',
'BS', 'BB', 'TT', 'HT', 'BR', 'AR', 'CL', 'PE', 'CO', 'VE', 'EC', 'BO', 'PY', 'UY', 'GY', 'SR']
},
{ id: 'AF', kw: ['非洲', 'africa', '埃及', 'egypt', 'cairo', '开罗', 'cai', '苏丹', 'sudan', '南苏丹', 'south sudan', '利比亚', 'libya', '突尼斯', 'tunisia', '阿尔及利亚', 'algeria', '摩洛哥',
'morocco', 'casablanca', '埃塞俄比亚', 'ethiopia', '索马里', 'somalia', '肯尼亚', 'kenya', 'nairobi',
'nbo', '坦桑尼亚', 'tanzania', '乌干达', 'uganda', '卢旺达', 'rwanda', '布隆迪', 'burundi', '厄立特里亚', 'eritrea', '吉布提', 'djibouti', '马达加斯加', 'madagascar', '毛里求斯', 'mauritius', '莫桑比克',
'mozambique', '塞舌尔', 'seychelles', '赞比亚', 'zambia', '津巴布韦', 'zimbabwe', '马拉维', 'malawi',
'喀⻨隆', 'cameroon', '刚果', 'congo', '安哥拉', 'angola', '加蓬', 'gabon', '乍得', 'chad', '中非',
'central african', '赤道几内亚', 'equatorial guinea', '南非', 'south africa', 'johannesburg', '约翰内斯堡', 'cape town', '开普敦', 'pretoria', 'jnb', 'cpt', '纳米比亚', 'namibia', '博茨瓦纳', 'botswana',
'莱索托', 'lesotho', '斯威士兰', 'eswatini', 'swaziland', '尼日利亚', 'nigeria', 'lagos', 'abuja',
'加纳', 'ghana', 'accra', '塞内加尔', 'senegal', 'dakar', '马里', 'mali', '布基纳法索', 'burkinafaso', '几内亚', 'guinea', '科特迪瓦', 'ivory coast', "cote d'ivoire", '塞拉利昂', 'sierra leone',
'利比里亚', 'liberia', '多哥', 'togo', '贝宁', 'benin', '尼日尔', 'niger', '毛里塔尼亚', 'mauritania',
'冈比亚', 'gambia', '佛得⻆', 'cape verde'], iso: ['EG', 'SD', 'SS', 'LY', 'TN', 'DZ', 'ET', 'KE',
'TZ', 'UG', 'RW', 'MG', 'MU', 'MZ', 'ZM', 'ZW', 'MW', 'CM', 'CD', 'CG', 'AO', 'GA', 'TD', 'ZA',
'BW', 'LS', 'SZ', 'NG', 'GH', 'SN', 'ML', 'BF', 'GN', 'CI', 'SL', 'LR', 'TG', 'BJ', 'NE', 'MR',

'GM', 'CV'] },
{ id: 'APAC_OTHER', kw: ['马来','亚太', 'apac', 'asia pacific', 'asia', '亚洲', '大洋洲',
'oceania', 'iplc', 'iepl', '专线', '低延迟', 'cn2', 'gia', '马来西亚', 'malaysia', 'kuala lumpur',
'吉隆坡', 'kul', '印度尼西亚', '印尼', 'indonesia', 'jakarta', '雅加达', '泰国', 'thailand',
'bangkok', '曼谷', 'bkk', '越南', 'vietnam', 'hanoi', '河内', 'ho chi minh', '胡志明', 'saigon',
'sgn', 'han', '菲律宾', 'philippines', 'manila', '马尼拉', 'mnl', '柬埔寨', 'cambodia', 'phnompenh', '金边', '缅甸', 'myanmar', 'yangon', '老挝', 'laos', 'vientiane', '文莱', 'brunei', '东帝汶',
'timor-leste', '印度', 'india', 'mumbai', '孟买', 'delhi', '新德里', 'bangalore', '班加罗尔',
'chennai', 'hyderabad', 'kolkata', 'bom', 'del', 'blr', '巴基斯坦', 'pakistan', 'karachi',
'islamabad', '孟加拉', 'bangladesh', 'dhaka', '斯里兰卡', 'sri lanka', 'colombo', '尼泊尔', 'nepal',
'kathmandu', '马尔代夫', 'maldives', '不丹', 'bhutan', '阿富汗', 'afghanistan', '土耳其', 'turkey',
'turkiye', 'istanbul', '伊斯坦布尔', 'ankara', 'ist', '以色列', 'israel', 'tel aviv', 'tlv', '沙特',
'saudi', 'riyadh', '阿联酋', 'uae', 'emirates', 'dubai', '迪拜', 'abu dhabi', 'dxb', 'auh', '卡塔尔', 'qatar', 'doha', 'doh', '科威特', 'kuwait', '巴林', 'bahrain', '阿曼', 'oman', 'muscat', '伊拉克', 'iraq', 'baghdad', '伊朗', 'iran', 'tehran', '约旦', 'jordan', 'amman', '黎巴嫩', 'lebanon',
'beirut', '叙利亚', 'syria', '也门', 'yemen', '巴勒斯坦', 'palestine', '亚美尼亚', 'armenia',
'yerevan', '阿塞拜疆', 'azerbaijan', 'baku', '哈萨克斯坦', 'kazakhstan', 'almaty', 'astana', '乌兹别克斯坦', 'uzbekistan', 'tashkent', '吉尔吉斯斯坦', 'kyrgyzstan', '土库曼斯坦', 'turkmenistan', '塔吉克斯坦', 'tajikistan', '澳门', 'macau', 'macao', '蒙古', 'mongolia', 'ulaanbaatar', '澳大利亚',
'australia', 'sydney', '悉尼', 'melbourne', '墨尔本', 'brisbane', 'perth', 'adelaide', 'syd',
'mel', '新西兰', 'new zealand', 'auckland', '奥克兰', 'wellington', 'akl', '斐济', 'fiji', '巴布亚新几内亚', 'papua new guinea', '关岛', 'guam', '新喀里多尼亚', 'new caledonia'], iso:
['IN','IND','MY','ID', 'TH', 'VN', 'PH', 'KH', 'MM', 'BN', 'TL', 'PK', 'BD', 'LK', 'NP', 'MV',
'BT', 'AF', 'TR', 'IL', 'AE', 'QA', 'KW', 'BH', 'OM', 'IQ', 'IR', 'JO', 'LB', 'SY', 'YE', 'PS',
'AZ', 'KZ', 'UZ', 'KG', 'TM', 'TJ', 'MO', 'MN', 'AU', 'NZ', 'FJ', 'PG', 'GU', 'NC', 'PF'] },
]
// ================================================================
// 模块 C:单次分类引擎
// ================================================================
const _regexCache = new Map()
function _getWordBoundaryRegex(keyword, caseSensitive) {
const key = (caseSensitive ? 'S:' : 'I:') + keyword
if (_regexCache.has(key)) return _regexCache.get(key)
const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const flags = caseSensitive ? '' : 'i'
const re = new RegExp('(^|[^a-zA-Z])' + escaped + '([^a-zA-Z]|$)', flags)
_regexCache.set(key, re)
return re
}
function _isChinese(str) { return /[\u4e00-\u9fa5]/.test(str) }
const _compiledRegions = REGION_DB.map(function(region) {
var matchers = []
for (var i = 0; i < region.iso.length; i++) {
matchers.push({ type: 'iso', regex: _getWordBoundaryRegex(region.iso[i], true) })
}
for (var j = 0; j < region.kw.length; j++) {
var kw = region.kw[j]
if (_isChinese(kw)) { matchers.push({ type: 'cn', text: kw }) }
else { matchers.push({ type: 'en', regex: _getWordBoundaryRegex(kw, false) }) }
}
return { id: region.id, matchers: matchers }
})
function classifyNode(name) {
var nameStr = String(name || '')
if (!nameStr) return null
for (var i = 0; i < _compiledRegions.length; i++) {

var region = _compiledRegions[i]
for (var j = 0; j < region.matchers.length; j++) {
var m = region.matchers[j]
if (m.type === 'cn') { if (nameStr.indexOf(m.text) !== -1) return region.id }
else { if (m.regex.test(nameStr)) return region.id }
}
}
return null
}
function classifyAllNodes(proxies) {
var result = {
HK: [], TW: [], CN: [], JP: [], KR: [], SG: [], US: [], EU: [], AM: [], AF: [], APAC_OTHER:
[], UNCLASSIFIED: [], ALL: [],
HOME_HK: [], HOME_TW: [], HOME_CN: [], HOME_JP: [], HOME_KR: [], HOME_SG: [], HOME_US: [],
HOME_EU: [], HOME_AM: [], HOME_AF: [], HOME_APAC_OTHER: [], HOME_UNCLASSIFIED: [], HOME_ALL: [],
}
for (var i = 0; i < proxies.length; i++) {
var p = proxies[i]
if (!p || typeof p !== 'object' || !p.name) continue
if (isInfoNode(p.name)) continue
var name = String(p.name)
var isHome = isResidentialNode(name)
result.ALL.push(name)
if (isHome) result.HOME_ALL.push(name)
var region = classifyNode(name)
if (region && result[region]) {
result[region].push(name)
if (isHome && result['HOME_' + region]) result['HOME_' + region].push(name)
} else {
result.UNCLASSIFIED.push(name)
if (isHome) result.HOME_UNCLASSIFIED.push(name)
}
}
return result
}
// ================================================================
// 模块 D:常量定义
// ================================================================
const SMART = {
  GLOBAL: '🌍 全球节点', GLOBAL_HOME: '🏡 全球家宽自动',
  HK: '🇭🇰 香港节点', HK_HOME: '🏡 香港家宽',
  TW: '🇹🇼 台湾节点', TW_HOME: '🏡 台湾家宽',
  JP: '🇯🇵 日本节点', JP_HOME: '🏡 日本家宽',
  KR: '🇰🇷 韩国节点', KR_HOME: '🏡 韩国家宽',
  APAC: '🌏 亚太节点', APAC_HOME: '🏡 亚太家宽',
  US: '🇺🇸 美国节点', US_HOME: '🏡 美国家宽',
  EU: '🇪🇺 欧洲节点', EU_HOME: '🏡 欧洲家宽',
  AMERICAS: '🌎 美洲节点', AMERICAS_HOME: '🏡 美洲家宽',
  AFRICA: '🌍 非洲节点', AFRICA_HOME: '🏡 非洲家宽',
}
const BIZ = {
  AI: '🤖 AI 服务', CRYPTO: '₿ 加密货币', PAYMENTS: '💳 金融支付',
  IM: '💬 即时通讯', SOCIAL: '🌐 社交媒体',
  WORK: '💼 会议协作', CNMEDIA: '📺 国内流媒体', VIDHUB: '🎬 VidHub',
  TIKTOK: '🎵 TikTok', NFLX: '🎬 Netflix', DSNP: '🏰 Disney+', HBO: '🎞️ HBO/Max',
  HULU: '📺 Hulu', PRIME: '🎥 Prime Video',
  YT: '▶️ YouTube', MUSIC: '🎧 音乐流媒体',
  STREAM_HK: '🇭🇰 香港流媒体', STREAM_TW: '🇹🇼 台湾流媒体',
  STREAM_JP: '🇯🇵 日韩流媒体', STREAM_EU: '🇪🇺 欧洲流媒体',
  STREAM_OTHER: '🌍 其他国外流媒体',
  GAME_CN: '🎮 国内游戏', GAME_INTL: '🕹️ 国外游戏',
  TOOLS: '🛠️ 工具与服务', GPLAY: '🛒 Google Play', MS: 'Ⓜ️ 微软服务', APPLE: '🍎 苹果服务',
  DOWNLOAD: '⬇️ 下载更新', TRACKER: '🧲 BT/PT Tracker',
  CN_SITE: '🇨🇳 国内网站',
  GFW: '🚧 受限网站', INTL_SITE: '🌍 国外网站',
  FINAL: '🐟 漏网之鱼', AD: '🛡️ 广告拦截',
}

// Fusion 可见自动入口：v9 起真正创建这些组，不再只靠“🌍 全球节点”承担自动优选语义。
// 作用：让 FlClash 策略组页面能直接看到 🚀/⚡/🛟 三个入口，同时业务组也能选择它们。
const FUSION_AUTO = {
  SELECT: '🎯 节点选择',
  AUTO: '🚀 自动优选',
  FAST: '⚡ 极速自动',
  FALLBACK: '🛟 自动兜底',
  AUTO_SELECT: '♻️ 自动选择',
  ALL_NODES: '🛜 全部节点',
  BALANCE: '⚖️ 负载均衡',
}

const FUSION_REGION_UI = [
  { id: 'HK', label: '🇭🇰 香港', source: function(c) { return c.HK || [] }, home: function(c) { return c.HOME_HK || [] } },
  { id: 'TW', label: '🇹🇼 台湾', source: function(c) { return c.TW || [] }, home: function(c) { return c.HOME_TW || [] } },
  { id: 'SG', label: '🇸🇬 新加坡', source: function(c) { return c.SG || [] }, home: function(c) { return c.HOME_SG || [] } },
  { id: 'JP', label: '🇯🇵 日本', source: function(c) { return c.JP || [] }, home: function(c) { return c.HOME_JP || [] } },
  { id: 'KR', label: '🇰🇷 韩国', source: function(c) { return c.KR || [] }, home: function(c) { return c.HOME_KR || [] } },
  { id: 'US', label: '🇺🇸 美国', source: function(c) { return c.US || [] }, home: function(c) { return c.HOME_US || [] } },
  { id: 'EU', label: '🇪🇺 欧洲', source: function(c) { return c.EU || [] }, home: function(c) { return c.HOME_EU || [] } },
  { id: 'APAC', label: '🌏 亚太', source: function(c) { return c.HK.concat(c.TW, c.JP, c.KR, c.SG, c.APAC_OTHER) }, home: function(c) { return c.HOME_HK.concat(c.HOME_TW, c.HOME_JP, c.HOME_KR, c.HOME_SG, c.HOME_APAC_OTHER) } },
  { id: 'AM', label: '🌎 美洲', source: function(c) { return c.US.concat(c.AM) }, home: function(c) { return c.HOME_US.concat(c.HOME_AM) } },
  { id: 'AF', label: '🌍 非洲', source: function(c) { return c.AF || [] }, home: function(c) { return c.HOME_AF || [] } },
]

// ================================================================
//  分组图标链接(仅新增 icon 字段,不改分组逻辑)
// ================================================================

const ICON_BASE = 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/'

function qIcon(name) {
  return ICON_BASE + name + '.png'
}

function iconForGroupName(name) {
  var s = String(name || '')

  // v13: 地区自动/手动组优先使用国家/地区图标。
  // 避免“🇭🇰 香港 - 自动优选 / 🇯🇵 日本 - 自动优选”等被下面的“自动优选”规则误判成 Auto 图标。
  if (s.indexOf(' - 自动优选') !== -1 || s.indexOf(' - 手动选择') !== -1 || s.indexOf('家宽 - 自动优选') !== -1 || s.indexOf('家宽 - 手动选择') !== -1) {
    if (s.indexOf('香港') !== -1) return qIcon('HK')
    if (s.indexOf('台湾') !== -1) return qIcon('TW')
    if (s.indexOf('新加坡') !== -1) return qIcon('Singapore')
    if (s.indexOf('日本') !== -1) return qIcon('JP')
    if (s.indexOf('韩国') !== -1) return qIcon('Korea')
    if (s.indexOf('美国') !== -1) return qIcon('US')
    if (s.indexOf('欧洲') !== -1) return qIcon('European_Union')
    if (s.indexOf('亚太') !== -1) return qIcon('Asia_Map')
    if (s.indexOf('美洲') !== -1) return qIcon('America_Map')
    if (s.indexOf('非洲') !== -1) return qIcon('Africa_Map')
  }

  // 可见总控/自动入口
  if (s.indexOf('节点选择') !== -1) return qIcon('Static')
  if (s.indexOf('自动选择') !== -1) return qIcon('Auto')
  if (s.indexOf('自动优选') !== -1) return qIcon('Auto')
  if (s.indexOf('极速自动') !== -1) return qIcon('Speedtest')
  if (s.indexOf('自动兜底') !== -1) return qIcon('Available')
  if (s.indexOf('全部节点') !== -1) return qIcon('Global')
  if (s.indexOf('负载均衡') !== -1) return qIcon('Round_Robin')


  // 业务策略组：先匹配，避免「欧洲流媒体」被误当成「欧洲节点」
  if (s.indexOf('VidHub') !== -1 || s.indexOf('vidhub') !== -1) return qIcon('Emby')
  if (s.indexOf('AI 服务') !== -1 || s.indexOf('AI服务') !== -1) return qIcon('Copilot')
  if (s.indexOf('加密货币') !== -1 || s.indexOf('加密') !== -1) return qIcon('Cryptocurrency')
  if (s.indexOf('金融支付') !== -1 || s.indexOf('金融') !== -1 || s.indexOf('支付') !== -1) return qIcon('PayPal')
  if (s.indexOf('即时通讯') !== -1) return qIcon('Telegram')
  if (s.indexOf('社交媒体') !== -1 || s.indexOf('社交') !== -1) return qIcon('Twitter')
  if (s.indexOf('会议协作') !== -1 || s.indexOf('会议') !== -1 || s.indexOf('协作') !== -1) return qIcon('Microsoft')

  if (s.indexOf('国内流媒体') !== -1) return qIcon('DomesticMedia')
  if (s.indexOf('香港流媒体') !== -1) return qIcon('HKMTMedia')
  if (s.indexOf('台湾流媒体') !== -1) return qIcon('Taiwan')
  if (s.indexOf('日韩流媒体') !== -1) return qIcon('Streaming')
  if (s.indexOf('欧洲流媒体') !== -1) return qIcon('Europe_Map')
  if (s.indexOf('其他国外流媒体') !== -1 || s.indexOf('国外流媒体') !== -1) return qIcon('ForeignMedia')

  if (s.indexOf('TikTok') !== -1) return qIcon('TikTok')
  if (s.indexOf('Netflix') !== -1) return qIcon('Netflix')
  if (s.indexOf('Disney') !== -1) return qIcon('Disney+')
  if (s.indexOf('HBO') !== -1 || s.indexOf('Max') !== -1) return 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/HBO_Max.png'
  if (s.indexOf('Hulu') !== -1) return qIcon('Hulu')
  if (s.indexOf('Prime') !== -1) return qIcon('Prime_Video')
  if (s.indexOf('YouTube') !== -1) return qIcon('YouTube')
  if (s.indexOf('音乐流媒体') !== -1 || s.indexOf('音乐') !== -1) return qIcon('Spotify')

  if (s.indexOf('国内游戏') !== -1) return qIcon('Game')
  if (s.indexOf('国外游戏') !== -1) return qIcon('Game')
  if (s.indexOf('Google Play') !== -1) return qIcon('Google')
  if (s.indexOf('工具与服务') !== -1 || s.indexOf('工具') !== -1) return qIcon('Google')
  if (s.indexOf('微软服务') !== -1 || s.indexOf('微软') !== -1) return qIcon('Microsoft')
  if (s.indexOf('苹果服务') !== -1 || s.indexOf('苹果') !== -1) return qIcon('Apple')
  if (s.indexOf('下载更新') !== -1 || s.indexOf('下载') !== -1 || s.indexOf('更新') !== -1) return qIcon('Download')
  if (s.indexOf('BT/PT Tracker') !== -1 || s.indexOf('Tracker') !== -1 || s.indexOf('BT/PT') !== -1) return qIcon('Download')
  if (s.indexOf('国内网站') !== -1) return qIcon('China_Map')
  if (s.indexOf('受限网站') !== -1 || s.indexOf('受限') !== -1) return qIcon('Proxy')
  if (s.indexOf('国外网站') !== -1) return qIcon('Global')
  if (s.indexOf('漏网之鱼') !== -1) return qIcon('Final')
  if (s.indexOf('广告拦截') !== -1 || s.indexOf('广告') !== -1) return qIcon('Advertising')

  // 区域 url-test 组
  if (s.indexOf('全球家宽') !== -1) return qIcon('Global')
  if (s.indexOf('全球节点') !== -1) return qIcon('Global')
  if (s.indexOf('香港家宽') !== -1 || s.indexOf('香港节点') !== -1 || s.indexOf('香港') !== -1) return qIcon('HK')
  if (s.indexOf('台湾家宽') !== -1 || s.indexOf('台湾节点') !== -1 || s.indexOf('台湾') !== -1) return qIcon('TW')
  if (s.indexOf('日本') !== -1) return qIcon('JP')
  if (s.indexOf('韩国') !== -1 || s.indexOf('韩国家宽') !== -1) return qIcon('Korea')
  if (s.indexOf('日韩家宽') !== -1 || s.indexOf('日韩节点') !== -1 || s.indexOf('日韩') !== -1) return qIcon('JP')
  if (s.indexOf('亚太家宽') !== -1 || s.indexOf('亚太节点') !== -1 || s.indexOf('亚太') !== -1) return qIcon('Asia_Map')
  if (s.indexOf('美国家宽') !== -1 || s.indexOf('美国节点') !== -1 || s.indexOf('美国') !== -1) return qIcon('US')
  if (s.indexOf('欧洲家宽') !== -1 || s.indexOf('欧洲节点') !== -1 || s.indexOf('欧洲') !== -1) return qIcon('European_Union')
  if (s.indexOf('美洲家宽') !== -1 || s.indexOf('美洲节点') !== -1 || s.indexOf('美洲') !== -1) return qIcon('America_Map')
  if (s.indexOf('非洲家宽') !== -1 || s.indexOf('非洲节点') !== -1 || s.indexOf('非洲') !== -1) return qIcon('Africa_Map')

  return qIcon('Proxy')
}

const REGION_ORDER = ['HK', 'TW', 'SG', 'JP', 'KR', 'APAC', 'US', 'EU', 'AMERICAS', 'AFRICA']
const REGION_HOME_MAP = {
HK: 'HK_HOME', TW: 'TW_HOME', SG: 'SG_HOME', JP: 'JP_HOME', KR: 'KR_HOME',
APAC: 'APAC_HOME', US: 'US_HOME',
EU: 'EU_HOME', AMERICAS: 'AMERICAS_HOME', AFRICA: 'AFRICA_HOME',
}
const FUSION_REGION_KEY_MAP = {
HK: 'HK', TW: 'TW', SG: 'SG', JP: 'JP', KR: 'KR',
APAC: 'APAC', US: 'US', EU: 'EU',
AMERICAS: 'AM', AFRICA: 'AF',
}
function withResidential(keys) {
var result = []
for (var i = 0; i < keys.length; i++) {
var key = keys[i]
if (SMART[key]) result.push(SMART[key])
var homeKey = REGION_HOME_MAP[key]
if (homeKey && SMART[homeKey]) result.push(SMART[homeKey])
}
return result
}
function buildVisibleAutoProxies() {
return [FUSION_AUTO.SELECT, FUSION_AUTO.AUTO, FUSION_AUTO.FAST, FUSION_AUTO.FALLBACK, FUSION_AUTO.AUTO_SELECT, FUSION_AUTO.ALL_NODES, FUSION_AUTO.BALANCE]
}
function _getFusionRegionDefByKey(key) {
var fusionId = FUSION_REGION_KEY_MAP[key] || key
for (var i = 0; i < FUSION_REGION_UI.length; i++) {
var def = FUSION_REGION_UI[i]
if (def && def.id === fusionId) return def
}
return null
}
function buildFusionRegionChoiceProxies(keys, homeFirst) {
var homes = []
var normals = []
for (var i = 0; i < keys.length; i++) {
var def = _getFusionRegionDefByKey(keys[i])
if (!def) continue
var names = makeFusionRegionGroupNames(def.label)
// v29: 业务组候选统一使用 Fusion 地区组，包含自动 + 手动。
// 不再把旧 Smart 区域组（如 🇹🇼 台湾节点）塞进业务组，避免 UI 重复。
var normalChoices = [names.auto, names.manual]
var homeChoices = [names.homeAuto, names.homeManual]
if (homeFirst) {
homes = homes.concat(homeChoices)
normals = normals.concat(normalChoices)
} else {
normals = normals.concat(normalChoices, homeChoices)
}
}
return unique(homeFirst ? homes.concat(normals) : normals)
}
function buildFusionRegionAutoProxies(keys) {
var result = []
for (var i = 0; i < keys.length; i++) {
var def = _getFusionRegionDefByKey(keys[i])
if (!def) continue
var names = makeFusionRegionGroupNames(def.label)
result.push(names.auto)
result.push(names.homeAuto)
}
return unique(result)
}
function buildStandardProxies() {
return unique(buildVisibleAutoProxies().concat(buildFusionRegionChoiceProxies(REGION_ORDER, false), [SMART.GLOBAL_HOME], ['DIRECT']))
}
function buildHomeFirstProxies(keys) {
return unique(buildVisibleAutoProxies().concat(buildFusionRegionChoiceProxies(keys, true), [SMART.GLOBAL_HOME], ['DIRECT']))
}
function buildRegionPreferredProxies(primaryKey) {
var order = [primaryKey].concat(REGION_ORDER.filter(function(key) { return key !== primaryKey
}))
return unique(buildVisibleAutoProxies().concat(buildFusionRegionChoiceProxies(order, false), [SMART.GLOBAL_HOME], ['DIRECT']))
}
function buildDirectFirstProxies() {
return unique(['DIRECT'].concat(buildVisibleAutoProxies(), buildFusionRegionChoiceProxies(REGION_ORDER, false), [SMART.GLOBAL_HOME]))
}
function buildTrackerProxies() {
return unique(['REJECT', 'DIRECT'].concat(buildVisibleAutoProxies(), buildFusionRegionChoiceProxies(['HK', 'APAC'], false), [SMART.GLOBAL_HOME]))
}
function buildSeaProxies() {
return unique(buildVisibleAutoProxies().concat(buildFusionRegionChoiceProxies(['APAC', 'HK', 'JP', 'KR', 'US'], false), [SMART.GLOBAL_HOME], ['DIRECT']))

}

// v5.1.2: GeoRouting 区域列表(module-level,供 providers + rules 共用)
// ★ FIX#1: Asia_China 从 INTL 循环剥离,单独映射 CN_SITE(v5.1.1 误将中国域名/IP 路由到国外网站)
const GEO_REGIONS_ALL = [
'Asia_East', 'Asia_EastSouth', 'Asia_South', 'Asia_Central', 'Asia_West',
'Asia_China',
'America_North', 'America_South',
'Europe_West', 'Europe_East',
'Oceania', 'Antarctica',
'Africa_North', 'Africa_South', 'Africa_West', 'Africa_East', 'Africa_Central'
]
const GEO_REGIONS_INTL = GEO_REGIONS_ALL.filter(r => r !== 'Asia_China')
// ================================================================
// 模块 E:区域组创建(url-test,非 Smart 内核等价写法)
// ================================================================
function upsertSmartGroup(config, name, proxies) {
var group = { name: name, type: 'url-test', url: 'https://www.gstatic.com/generate_204',
interval: 120, tolerance: 30, lazy: true, icon: iconForGroupName(name), proxies: proxies.slice() }
var idx = config['proxy-groups'].findIndex(function(g) { return g && g.name === name })
if (idx !== -1) { config['proxy-groups'][idx] = group } else { config['proxy-groups'].push(group) }
log(`[${VERSION}] url-test: "${name}" -> ${proxies.length} nodes`)
}

function unique(arr) {
return Array.from(new Set((arr || []).filter(Boolean)))
}

function makeFusionRegionGroupNames(label) {
return {
auto: label + ' - 自动优选',
manual: label + ' - 手动选择',
homeAuto: '🏡 ' + label.replace(/^[^\s]+\s*/, '') + '家宽 - 自动优选',
homeManual: '🏡 ' + label.replace(/^[^\s]+\s*/, '') + '家宽 - 手动选择',
}
}

function _upsertProxyGroup(config, group) {
var idx = config['proxy-groups'].findIndex(function(g) { return g && g.name === group.name })
if (idx !== -1) { config['proxy-groups'][idx] = group } else { config['proxy-groups'].push(group) }
}

function upsertFusionAutoGroups(config, proxies) {
upsertFusionNodeUiGroups(config, proxies, null)
}

// v12: Wuzhenshi Fusion 风格节点选择 UI。
// 只增强 proxy-groups：不改 rules/rule-providers/DNS/TUN/sniffer 主体。
function upsertFusionNodeUiGroups(config, proxies, classified) {
if (!Array.isArray(proxies) || proxies.length === 0) return

var regionAutoNames = []
var regionManualNames = []
var regionHomeNames = []

if (classified) {
for (var i = 0; i < FUSION_REGION_UI.length; i++) {
var def = FUSION_REGION_UI[i]
var nodes = unique(def.source(classified))
var homeNodes = unique(def.home(classified))
if (nodes.length > 0) {
var names = makeFusionRegionGroupNames(def.label)
var autoGroup = { name: names.auto, type: 'url-test', url: 'https://www.gstatic.com/generate_204', interval: 300, tolerance: 50, timeout: 3000, lazy: true, icon: iconForGroupName(names.auto), proxies: nodes.slice() }
var manualGroup = { name: names.manual, type: 'select', icon: iconForGroupName(names.manual), proxies: nodes.slice() }
_upsertProxyGroup(config, autoGroup)
_upsertProxyGroup(config, manualGroup)
regionAutoNames.push(names.auto)
regionManualNames.push(names.manual)
}
if (homeNodes.length > 0) {
var hnames = makeFusionRegionGroupNames(def.label)
var homeAutoGroup = { name: hnames.homeAuto, type: 'url-test', url: 'https://www.gstatic.com/generate_204', interval: 300, tolerance: 50, timeout: 3000, lazy: true, icon: iconForGroupName(hnames.homeAuto), proxies: homeNodes.slice() }
var homeManualGroup = { name: hnames.homeManual, type: 'select', icon: iconForGroupName(hnames.homeManual), proxies: homeNodes.slice() }
_upsertProxyGroup(config, homeAutoGroup)
_upsertProxyGroup(config, homeManualGroup)
regionAutoNames.push(hnames.homeAuto)
regionManualNames.push(hnames.homeManual)
regionHomeNames.push(hnames.homeAuto, hnames.homeManual)
}
}
}

// v51: 海外自动组排除中国大陆出口；中国节点仍保留在“全部节点”中供手动选择。
var cnNodeSet = new Set((classified && classified.CN) ? classified.CN : [])
var overseasAutoProxies = unique(proxies.filter(function(name) { return !cnNodeSet.has(name) }))
if (overseasAutoProxies.length === 0) overseasAutoProxies = proxies.slice()
var visibleRegions = unique(regionAutoNames.concat(regionManualNames))
var autoSelectProxies = unique([FUSION_AUTO.AUTO, FUSION_AUTO.FAST, FUSION_AUTO.FALLBACK].concat(regionAutoNames))
var selectorProxies = unique([FUSION_AUTO.AUTO, FUSION_AUTO.FAST, FUSION_AUTO.FALLBACK, FUSION_AUTO.AUTO_SELECT, FUSION_AUTO.ALL_NODES, FUSION_AUTO.BALANCE].concat(visibleRegions, proxies.slice(), ['DIRECT']))
var groups = [
{ name: FUSION_AUTO.SELECT, type: 'select', icon: iconForGroupName(FUSION_AUTO.SELECT), proxies: selectorProxies },
{ name: FUSION_AUTO.AUTO, type: 'url-test', url: 'https://www.gstatic.com/generate_204', interval: 180, tolerance: 30, timeout: 3000, lazy: false, icon: iconForGroupName(FUSION_AUTO.AUTO), proxies: overseasAutoProxies.slice() },
{ name: FUSION_AUTO.FAST, type: 'url-test', url: 'https://www.gstatic.com/generate_204', interval: 60, tolerance: 0, timeout: 3000, lazy: false, icon: iconForGroupName(FUSION_AUTO.FAST), proxies: overseasAutoProxies.slice() },
{ name: FUSION_AUTO.FALLBACK, type: 'fallback', url: 'https://www.gstatic.com/generate_204', interval: 20, timeout: 3000, lazy: false, icon: iconForGroupName(FUSION_AUTO.FALLBACK), proxies: overseasAutoProxies.slice() },
{ name: FUSION_AUTO.BALANCE, type: 'load-balance', url: 'https://www.gstatic.com/generate_204', interval: 300, timeout: 3000, strategy: 'consistent-hashing', lazy: true, icon: iconForGroupName(FUSION_AUTO.BALANCE), proxies: overseasAutoProxies.slice() },
{ name: FUSION_AUTO.ALL_NODES, type: 'select', icon: iconForGroupName(FUSION_AUTO.ALL_NODES), proxies: proxies.slice() },
{ name: FUSION_AUTO.AUTO_SELECT, type: 'select', icon: iconForGroupName(FUSION_AUTO.AUTO_SELECT), proxies: autoSelectProxies },
]
for (var j = 0; j < groups.length; j++) {
_upsertProxyGroup(config, groups[j])
}
log(`[${VERSION}] Wuzhenshi node UI injected: core=${groups.length}, region=${visibleRegions.length}, home=${regionHomeNames.length}`)
}
// ================================================================
// 模块 F:业务策略组注入(34组)
// ================================================================
function injectBusinessGroups(config, activeSmartNames) {
function filterActive(arr) {
if (!activeSmartNames) return arr.slice()
return arr.filter(function(p) { return activeSmartNames.has(p) })
}
var aiProxies = filterActive(buildHomeFirstProxies(REGION_ORDER))
var standardProxies = filterActive(buildStandardProxies())
var streamUsProxies = filterActive(buildRegionPreferredProxies('US'))
var streamHkProxies = filterActive(buildRegionPreferredProxies('HK'))
var streamTwProxies = filterActive(buildRegionPreferredProxies('TW'))
var streamJpProxies = filterActive(buildRegionPreferredProxies('JP'))
var streamEuProxies = filterActive(buildRegionPreferredProxies('EU'))
var directFirstProxies = filterActive(buildDirectFirstProxies())
var trackerProxies = filterActive(buildTrackerProxies())
var seaProxies = filterActive(buildSeaProxies())
var groups = [
{ name: BIZ.AI, type: 'select', proxies: aiProxies.slice() },
{ name: BIZ.CRYPTO, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.PAYMENTS, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.IM, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.SOCIAL, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.WORK, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.CNMEDIA, type: 'select', proxies: directFirstProxies.slice() },
{ name: BIZ.VIDHUB, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.TIKTOK, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.NFLX, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.DSNP, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.HBO, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.HULU, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.PRIME, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.YT, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.MUSIC, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.STREAM_HK, type: 'select', proxies: streamHkProxies.slice() },
{ name: BIZ.STREAM_TW, type: 'select', proxies: streamTwProxies.slice() },
{ name: BIZ.STREAM_JP, type: 'select', proxies: streamJpProxies.slice() },

{ name: BIZ.STREAM_EU, type: 'select', proxies: streamEuProxies.slice() },
{ name: BIZ.STREAM_OTHER, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.GAME_CN, type: 'select', proxies: directFirstProxies.slice() },
{ name: BIZ.GAME_INTL, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.TOOLS, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.GPLAY, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.MS, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.APPLE, type: 'select', proxies: directFirstProxies.slice() },
{ name: BIZ.DOWNLOAD, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.TRACKER, type: 'select', proxies: trackerProxies.slice() },
{ name: BIZ.CN_SITE, type: 'select', proxies: directFirstProxies.slice() },
{ name: BIZ.GFW, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.INTL_SITE, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.FINAL, type: 'select', proxies: standardProxies.slice() },
{ name: BIZ.AD, type: 'select', proxies: ['REJECT', 'DIRECT'] },
]
var _smartNameSet = new Set(Object.values(SMART))
var firstSmartIdx = config['proxy-groups'].findIndex(function(g) { return g &&
_smartNameSet.has(g.name) })
groups.forEach(function(group, i) {
group.icon = iconForGroupName(group.name)
var existIdx = config['proxy-groups'].findIndex(function(g) { return g && g.name ===
group.name })
if (existIdx !== -1) { config['proxy-groups'][existIdx] = group }
else if (firstSmartIdx !== -1) { config['proxy-groups'].splice(firstSmartIdx + i, 0, group) }
else { config['proxy-groups'].push(group) }
})
log(`[${VERSION}] Injected ${groups.length} business groups`)
}
// ================================================================
// 模块 G:rule-providers 注入(v5.0: 326 providers)
// ================================================================
function injectRuleProviders(config) {
if (!config['rule-providers']) config['rule-providers'] = {}
// v5.1.6 P0-FIX#2: CDN 切换(raw.githubusercontent.com → fastly.jsdelivr.net)消除启动 EOF 风暴
const META = 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo'
// v5.1.8 PERF#2: BM7 常量移至下方 CDN 混合策略区块(BM7_FASTLY + BM7_CF)
const ACC = 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main'
// v5.1.6 P0-FIX#1: 所有 rule-providers 走代理下载,避免 DIRECT 在墙内环境拉取失败
// v5.2.1 FIX: jsdelivr 和 rule-provider 下载走受限网站组(中国用代理,印尼用直连)
const RP_PROXY = BIZ.GFW
const RP_BASE = 85500
const RP_STEP = 15
let _rpIdx = 0
// v5.1.8 PERF#2: 随机抖动 0~59s 打破整⻬步⻓的周期性并发浪峰
const nextInterval = () => RP_BASE + ((_rpIdx++) * RP_STEP) + Math.floor(Math.random() * 60)
// v5.1.8 PERF#2: bm7 CDN 混合策略(奇偶轮替 Fastly / Cloudflare,分散 EOF 风暴)
const BM7_FASTLY = 'https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash'
const BM7_CF = 'https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash'
let _bm7Idx = 0
const metaDomain = (id, name) => {
config['rule-providers'][id] = { type: 'http', behavior: 'domain', format: 'mrs', url:
`${META}/geosite/${name}.mrs`, path: `./ruleset/meta-${name}.mrs`, interval: nextInterval(),
proxy: RP_PROXY }
}
const metaIpCidr = (id, name) => {
config['rule-providers'][id] = { type: 'http', behavior: 'ipcidr', format: 'mrs', url:

`${META}/geoip/${name}.mrs`, path: `./ruleset/meta-ip-${name}.mrs`, interval: nextInterval(),
proxy: RP_PROXY }
}
const bm7 = (id, name) => {
const cdn = ((_bm7Idx++) % 2 === 0) ? BM7_FASTLY : BM7_CF
config['rule-providers'][id] = { type: 'http', behavior: 'classical', url: `${cdn}/${name}/${name}.yaml`, path: `./ruleset/bm7-${name}.yaml`, interval: nextInterval(), proxy: RP_PROXY }
}
const bm7Custom = (id, dir, file) => {
const cdn = ((_bm7Idx++) % 2 === 0) ? BM7_FASTLY : BM7_CF
config['rule-providers'][id] = { type: 'http', behavior: 'classical', url: `${cdn}/${dir}/${file}.yaml`, path: `./ruleset/bm7-${id}.yaml`, interval: nextInterval(), proxy: RP_PROXY }
}
// ============ #1 广告拦截 ============
// v5.1.7 PERF: anti-ad → DustinWin ads.mrs(同源 privacy-protection-tools/anti-AD,domain
// behavior + mrs format)
// 备选方案(若 DustinWin .mrs 源不可用,取消下方注释并注释掉 mrs 版本):
// config['rule-providers']['anti-ad'] = { type: 'http', behavior: 'domain', url: 'https://
// anti-ad.net/clash.yaml', path: './ruleset/anti-ad.yaml', interval: nextInterval(), proxy:
// RP_PROXY }
config['rule-providers']['anti-ad'] = { type: 'http', behavior: 'domain', format: 'mrs', url:
'https://fastly.jsdelivr.net/gh/DustinWin/ruleset_geodata@mihomo-ruleset/ads.mrs', path: './ruleset/anti-ad.mrs', interval: nextInterval(), proxy: RP_PROXY }
// ============ #2~5 AI 服务 ============
metaDomain('openai', 'openai')
bm7('claude', 'Claude')
bm7('gemini', 'Gemini')
bm7('copilot', 'Copilot')
// ============ #6 加密货币 ============
bm7('cryptocurrency', 'Cryptocurrency')
// ============ #7~12 即时通讯 ============
metaDomain('telegram', 'telegram')
metaIpCidr('telegram-ip', 'telegram')
bm7('discord', 'Discord')
bm7('line', 'Line')
bm7('whatsapp', 'Whatsapp')
bm7('kakaotalk', 'KakaoTalk')
// ============ #13~22 社交媒体 ============
metaDomain('twitter', 'twitter')
metaIpCidr('twitter-ip', 'twitter')
metaDomain('tiktok', 'tiktok')
bm7('reddit', 'Reddit')
bm7('facebook', 'Facebook')
bm7('instagram', 'Instagram')
// v5.2.3 FIX: Snap 规则改用 Meta geosite(兼容 mihomo,不再触发 USER-AGENT,TikTok* 解析警告)
// bm7 Apple 相关 provider 含格式错误 IP-CIDR(多余空格),每次 reload 产生 warning,不影响功能
// v5.2.4 FIX#22-P0: MetaCubeX geosite 的实际文件名是 `snap.mrs` 不是 `snapchat.mrs`,
// 之前 metaDomain('snapchat','snapchat') 会产生 [Provider] snapchat pull error: 403 Forbidden
metaDomain('snapchat', 'snap')
bm7('pinterest', 'Pinterest')
bm7('linkedin', 'LinkedIn')
metaIpCidr('facebook-ip', 'facebook')
// ============ #23~25 会议协作 ============
bm7('slack', 'Slack')
config['rule-providers']['zoom'] = { type: 'http', behavior: 'classical', url: 'https://fastly.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/Providers/Ruleset/Zoom.yaml', path: './ruleset/acl4ssr-Zoom.yaml', interval: nextInterval(), proxy: RP_PROXY }
bm7('teams', 'Teams')
// ============ #26~29 搜索引擎 ============
metaDomain('google', 'google')
metaIpCidr('google-ip', 'google')
bm7('bing', 'Bing')
bm7('googlesearch', 'GoogleSearch')
// ============ #30~41 美国流媒体 ============
metaDomain('youtube', 'youtube')
metaDomain('netflix', 'netflix')
metaIpCidr('netflix-ip', 'netflix')
metaDomain('spotify', 'spotify')
bm7('disney', 'Disney')
bm7('hbo', 'HBO')
bm7('primevideo', 'PrimeVideo')
bm7('hulu', 'Hulu')
bm7('paramount', 'ParamountPlus')
bm7('amazon', 'Amazon')
bm7('peacock', 'Peacock')
bm7('twitch', 'Twitch')
// ============ #42~43 台湾流媒体 ============
metaDomain('bahamut', 'bahamut')
bm7('kktv', 'KKTV')
// ============ #44~45 日韩流媒体 ============
metaDomain('abema', 'abema')
bm7('dazn', 'DAZN')
// ============ #46 欧洲流媒体 ============
// v5.2.3 FIX: BBC 规则改用 Meta geosite(兼容 mihomo,不再触发 USER-AGENT,BBCiPlayer* 解析警告)
metaDomain('bbc', 'bbc')
// ============ #47~53 国外游戏 ============
bm7('steam', 'Steam')
bm7('epic', 'Epic')
bm7('playstation', 'PlayStation')
bm7('nintendo', 'Nintendo')
bm7('xbox', 'Xbox')
bm7('ea', 'EA')
bm7('blizzard', 'Blizzard')
// ============ #54~55 微软服务 ============
metaDomain('microsoft', 'microsoft')
metaDomain('onedrive', 'onedrive')
// ============ #56~58 苹果服务 ============
metaDomain('apple', 'apple')
metaDomain('icloud', 'icloud')
bm7('applemusic', 'AppleMusic')
// ============ #59~61 开发者服务 ============
metaDomain('github', 'github')
bm7('docker', 'Docker')
bm7('gitlab', 'GitLab')
// ============ #62 金融支付 ============
bm7('paypal', 'PayPal')
// ============ #63~65 云与CDN ============

metaIpCidr('cloudflare-ip', 'cloudflare')
metaIpCidr('cloudfront-ip', 'cloudfront')
metaIpCidr('fastly-ip', 'fastly')
// ============ #66 下载更新 ============
bm7('systemota', 'SystemOTA')
// ============ #67 东南亚流媒体 ============
bm7('viu', 'ViuTV')
// ============ #68~69 国内流媒体 ============
metaDomain('bilibili', 'bilibili')
metaDomain('biliintl', 'biliintl')
// ============ #70~72 国内/国外兜底 ============
metaDomain('cn', 'cn')
metaIpCidr('cn-ip', 'cn')
metaDomain('proxy', 'geolocation-!cn')
// ============ v5.0 新增 254 providers (bm7) ============
bm7('advertising', 'Advertising')
bm7('advertisingmitv', 'AdvertisingMiTV')
bm7('adobeactivation', 'AdobeActivation')
bm7('blockhttpdns', 'BlockHttpDNS')
bm7('domob', 'Domob')
bm7('hijacking', 'Hijacking')
bm7('jiguangtuisong', 'JiGuangTuiSong')
bm7('marketing', 'Marketing')
bm7('miuiprivacy', 'MIUIPrivacy')
bm7('privacy', 'Privacy')
bm7('youmengchuangxiang', 'YouMengChuangXiang')
bm7('civitai', 'Civitai')
bm7('binance', 'Binance')
bm7('stripe', 'Stripe')
bm7('visa', 'VISA')
bm7('tigerfintech', 'TigerFintech')
bm7('mail', 'Mail')
bm7('mailru', 'Mailru')
bm7('protonmail', 'Protonmail')
bm7('spark', 'Spark')
bm7('telegramnl', 'TelegramNL')
bm7('telegramsg', 'TelegramSG')
bm7('telegramus', 'TelegramUS')
bm7('zalo', 'Zalo')
bm7('googlevoice', 'GoogleVoice')
bm7('italkbb', 'iTalkBB')
bm7('tumblr', 'Tumblr')
bm7('clubhouse', 'Clubhouse')
bm7('clubhouseip', 'ClubhouseIP')
bm7('pixiv', 'Pixiv')
bm7('truthsocial', 'TruthSocial')
bm7('vk', 'VK')
bm7('blued', 'Blued')
bm7('disqus', 'Disqus')
bm7('imgur', 'Imgur')
bm7('pixnet', 'Pixnet')
bm7('atlassian', 'Atlassian')
bm7('notion', 'Notion')
bm7('teamviewer', 'TeamViewer')
bm7('zoho', 'Zoho')
bm7('salesforce', 'Salesforce')
bm7('zendesk', 'Zendesk')
bm7('intercom', 'Intercom')
bm7('remotedesktop', 'RemoteDesktop')

bm7('iqiyi', 'iQIYI')
bm7('youku', 'Youku')
bm7('tencentvideo', 'TencentVideo')
bm7('douyin', 'DouYin')
bm7('bytedance', 'ByteDance')
bm7('kuaishou', 'KuaiShou')
bm7('weibo', 'Weibo')
bm7('xiaohongshu', 'XiaoHongShu')
bm7('neteasemusic', 'NetEaseMusic')
bm7('kugoukuwo', 'KugouKuwo')
bm7('sohu', 'Sohu')
bm7('acfun', 'AcFun')
bm7('douyu', 'Douyu')
bm7('huya', 'HuYa')
bm7('himalaya', 'Himalaya')
bm7('cctv', 'CCTV')
bm7('hunantv', 'HunanTV')
bm7('pptv', 'PPTV')
bm7('funshion', 'Funshion')
bm7('letv', 'LeTV')
bm7('taihemusic', 'TaiheMusic')
bm7('kukemusic', 'KuKeMusic')
bm7('hibymusic', 'HibyMusic')
bm7('miwu', 'MiWu')
bm7('migu', 'Migu')
bm7('iptvmainland', 'IPTVMainland')
bm7('iptvother', 'IPTVOther')
bm7('cibn', 'CIBN')
bm7('bestv', 'BesTV')
bm7('huashutv', 'HuaShuTV')
bm7('smg', 'SMG')
bm7('hwtv', 'HWTV')
bm7('nivodtv', 'NivodTV')
bm7('olevod', 'Olevod')
bm7('dandanzan', 'DanDanZan')
bm7('dandanplay', 'Dandanplay')
bm7('tiantiankankan', 'TianTianKanKan')
bm7('yizhibo', 'YiZhiBo')
bm7('ku6', 'Ku6')
bm7('56', '56')
bm7('cetv', 'CETV')
bm7('yyets', 'YYeTs')
bm7('asianmedia', 'AsianMedia')
bm7('iqiyiintl', 'iQIYIIntl')
bm7('joox', 'JOOX')
bm7('mewatch', 'MeWatch')
bm7('viki', 'Viki')
bm7('wetv', 'WeTV')
bm7('zee', 'Zee')
bm7('cbs', 'CBS')
bm7('nbc', 'NBC')
bm7('pbs', 'PBS')
bm7('attwatchtv', 'ATTWatchTV')
bm7('fox', 'Fox')
bm7('fubotv', 'FuboTV')
bm7('sling', 'Sling')
bm7('soundcloud', 'SoundCloud')
bm7('pandora', 'Pandora')
bm7('pandoratv', 'PandoraTV')
bm7('tidal', 'TIDAL')
bm7('vimeo', 'Vimeo')
bm7('dailymotion', 'Dailymotion')
bm7('deezer', 'Deezer')
bm7('discoveryplus', 'DiscoveryPlus')
bm7('overcast', 'Overcast')

bm7('americasvoice', 'Americasvoice')
bm7('cake', 'Cake')
bm7('dood', 'Dood')
bm7('ehgallery', 'EHGallery')
bm7('lastfm', 'LastFM')
bm7('emby', 'Emby')
bm7('mytvsuper', 'myTVSUPER')
bm7('tvb', 'TVB')
bm7('encoretvb', 'EncoreTVB')
bm7('nowe', 'NowE')
bm7('rthk', 'RTHK')
bm7('cabletv', 'CableTV')
bm7('moov', 'MOOV')
bm7('litv', 'LiTV')
bm7('friday', 'friDay')
bm7('hamivideo', 'HamiVideo')
bm7('linetv', 'LineTV')
bm7('vidoltv', 'VidolTV')
bm7('taiwangood', 'TaiWanGood')
bm7('cht', 'CHT')
bm7('dmm', 'DMM')
bm7('tver', 'TVer')
bm7('niconico', 'Niconico')
bm7('rakuten', 'Rakuten')
bm7('japonx', 'Japonx')
bm7('nikkei', 'Nikkei')
bm7('itv', 'ITV')
bm7('all4', 'All4')
bm7('my5', 'My5')
bm7('skygo', 'SkyGO')
bm7('britboxuk', 'BritboxUK')
bm7('londonreal', 'LondonReal')
bm7('qobuz', 'Qobuz')
bm7('steamcn', 'SteamCN')
bm7('wanmeishijie', 'WanMeiShiJie')
bm7('wankahuanju', 'WanKaHuanJu')
bm7('majsoul', 'Majsoul')
bm7('rockstar', 'Rockstar')
bm7('riot', 'Riot')
bm7('gog', 'Gog')
bm7('supercell', 'Supercell')
bm7('garena', 'Garena')
bm7('hoyoverse', 'HoYoverse')
bm7('ubi', 'UBI')
bm7('wildrift', 'WildRift')
bm7('sony', 'Sony')
bm7('yandex', 'Yandex')
bm7('googledrive', 'GoogleDrive')
bm7('googleearth', 'GoogleEarth')
bm7('naver', 'Naver')
bm7('scholar', 'Scholar')
bm7('developer', 'Developer')
bm7('python', 'Python')
bm7('gitbook', 'GitBook')
bm7('jfrog', 'Jfrog')
bm7('sublimetext', 'SublimeText')
bm7('wordpress', 'Wordpress')
bm7('wix', 'WIX')
bm7('cisco', 'Cisco')
bm7('ibm', 'IBM')
bm7('oracle', 'Oracle')
bm7('unity', 'Unity')
bm7('microsoftedge', 'MicrosoftEdge')
bm7('appstore', 'AppStore')
bm7('appletv', 'AppleTV')

bm7('applenews', 'AppleNews')
bm7('appledev', 'AppleDev')
bm7('appleproxy', 'AppleProxy')
bm7('siri', 'Siri')
bm7('testflight', 'TestFlight')
bm7('applefirmware', 'AppleFirmware')
bm7('findmy', 'FindMy')
bm7('download', 'Download')
bm7('ubuntu', 'Ubuntu')
bm7('mozilla', 'Mozilla')
bm7('apkpure', 'Apkpure')
bm7('android', 'Android')
bm7('googlefcm', 'GoogleFCM')
bm7('intel', 'Intel')
bm7('nvidia', 'Nvidia')
bm7('dell', 'Dell')
bm7('hp', 'HP')
bm7('canon', 'Canon')
bm7('lg', 'LG')
bm7('cloudflare', 'Cloudflare')
bm7('akamai', 'Akamai')
// v5.1.2 FIX#6: 删除 bm7 DNS provider(混合中外DNS锁死CLOUD_CDN,改为自然分流)
// bm7('dns', 'DNS') ← REMOVED
bm7('digicert', 'DigiCert')
bm7('globalsign', 'GlobalSign')
bm7('sectigo', 'Sectigo')
bm7('brightcove', 'BrightCove')
bm7('jwplayer', 'Jwplayer')
bm7('privatetracker', 'PrivateTracker')
bm7('cnn', 'CNN')
bm7('nytimes', 'NYTimes')
bm7('bloomberg', 'Bloomberg')
bm7('ebay', 'eBay')
bm7('nike', 'Nike')
bm7('adobe', 'Adobe')
bm7('samsung', 'Samsung')
bm7('tesla', 'Tesla')
bm7('dropbox', 'Dropbox')
bm7('mega', 'MEGA')
bm7('wikipedia', 'Wikipedia')
bm7('duolingo', 'Duolingo')
// ================================================================
// v5.1 Step 1: P0/P2 安全规则 + 量化交易增强
// ================================================================
// P0: Ckrvxr/MihomoRules 安全防护
// v5.2.1 REMOVED: ckrvxr-antipcdn 和 ckrvxr-antifraud 规则源已下线(持续 404),已删除
// P0: SukkaW 13万钓鱼域名拦截(domain behavior + text format)
config['rule-providers']['sukka-phishing'] = {
type: 'http', behavior: 'domain', format: 'text',
url: 'https://ruleset.skk.moe/Clash/domainset/reject_phishing.txt',
path: './ruleset/sukka-reject-phishing.txt',
interval: nextInterval(),
proxy: RP_PROXY
}
// v5.1.6-P0: Hagezi Threat Intelligence Feeds(威胁情报:malware/cryptojacking/C2/scam/spam)
// 优先方案:MiHomoer .mrs 二进制格式(domain behavior,冷启动开销极小)
// 备选方案(若 mrs 源不可用,取消下方注释并注释掉 mrs 版本):
// config['rule-providers']['hagezi-tif'] = {
// type: 'http', behavior: 'domain', format: 'text',
// url: 'https://fastly.jsdelivr.net/gh/hagezi/dns-blocklists@main/domains/

// tif.medium.txt',
// path: './ruleset/hagezi-tif-medium.txt',
// interval: nextInterval(),
// proxy: RP_PROXY
// }
config['rule-providers']['hagezi-tif'] = {
type: 'http', behavior: 'domain', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/hagezi/dns-blocklists@latest/wildcard/tif.medium-onlydomains.txt',
path: './ruleset/hagezi-tif-medium.txt',
interval: nextInterval(),
proxy: RP_PROXY
}
// ================================================================
// v5.1 Step 3: szkane/ClashRuleSet 全量补充
// ================================================================
// szkane AI 服务(OpenAI/Claude/Grok/Perplexity/Gemini 合并)──
config['rule-providers']['szkane-ai'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/Ruleset/AiDomain.list',
path: './ruleset/szkane-AiDomain.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane CiciAI(字节海外AI:Coze International/Luma AI,需新加坡节点)──
// v5.2.7 FIX#27-P1: upstream `Clash/Ruleset/CiciAi.list` 含 `USER-AGENT,TikTok*`,mihomo
// classical provider 不识别 USER-AGENT 会触发 `parse classical rule [USER-AGENT,TikTok*]
// error: unsupported rule type: USER-AGENT`。改用本仓库 mirrors/ 的清洗副本(仅删该行,
// TikTok 域名已由 metaDomain('tiktok','tiktok') 覆盖)。
config['rule-providers']['szkane-ciciai'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/IvanSolis1989/Smart-Config-Kit@main/mirrors/CiciAi.list',
path: './ruleset/szkane-CiciAi.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane Web3(DeFi/NFT/区块链RPC/交易所)★量化交易核心
config['rule-providers']['szkane-web3'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/Web3.list',
path: './ruleset/szkane-Web3.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane Developer(Docker镜像/HuggingFace模型/开发者下载)──
config['rule-providers']['szkane-developer'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/Ruleset/Developer.list',
path: './ruleset/szkane-Developer.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane Education(Khan Academy)──
config['rule-providers']['szkane-khan'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/Ruleset/Khan.list',
path: './ruleset/szkane-Khan.list',
interval: nextInterval(),
proxy: RP_PROXY
}

// szkane Education(Coursera/edX/Udacity等)──
config['rule-providers']['szkane-edutools'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/Ruleset/Edutools.list',
path: './ruleset/szkane-Edutools.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane UK Apps
// v5.2.7 FIX#27-P1: upstream `Clash/Ruleset/UK.list` 含 `USER-AGENT,BBCiPlayer*`,
// mihomo classical provider 不识别 USER-AGENT 会触发
// `parse classical rule [USER-AGENT,BBCiPlayer*] error: unsupported rule type: USER-
// AGENT`。
// 改用本仓库 mirrors/ 的清洗副本(BBC 域名已由 metaDomain('bbc','bbc') 覆盖)。
config['rule-providers']['szkane-uk'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/IvanSolis1989/Smart-Config-Kit@main/mirrors/UK.list',
path: './ruleset/szkane-UK.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane BilibiliHMT(港澳台哔哩哔哩)──
config['rule-providers']['szkane-bilihmt'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/Ruleset/BilibiliHMT.list',
path: './ruleset/szkane-BilibiliHMT.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane Netflix IP 段
config['rule-providers']['szkane-netflixip'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/Ruleset/NetflixIP.list',
path: './ruleset/szkane-NetflixIP.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// szkane ProxyGFWlist(GFW域名补充)──
config['rule-providers']['szkane-proxygfw'] = {
type: 'http', behavior: 'classical', format: 'text',
url: 'https://fastly.jsdelivr.net/gh/szkane/ClashRuleSet@main/Clash/ProxyGFWlist.list',
path: './ruleset/szkane-ProxyGFWlist.list',
interval: nextInterval(),
proxy: RP_PROXY
}
// ================================================================
// v5.1.4: Loyalsoldier/clash-rules GFW 封锁域名规则集
// ★ 中国 GFW 领域最权威的 Clash 格式规则源( 3.6k)
// 上游数据链:
// gfwlist/gfwlist( 11k,GFW 封锁域名原始列表)
// + v2fly/domain-list-community( 7.1k,V2Ray 社区域名分类数据库)
// + GreatFire Analyzer(独立封锁探测机构)
// → Loyalsoldier/v2ray-rules-dat(聚合转换)
// → Loyalsoldier/clash-rules(Clash 格式 GitHub Actions 每日北京时间6:30自动构建)
// 排除 tld-not-cn.txt:包含所有非CN顶级域名(.com/.net/.org),太宽泛会吞掉几乎所有国外域名
// ================================================================
// GFWList 封锁域名(核心列表,~4000+ 域名)──

// v5.1.7 PERF: text → MetaCubeX geosite:gfw.mrs(同源 gfwlist → v2fly/domain-list-
// community)
// 备选方案(若 MetaCubeX .mrs 源不可用,取消下方注释并注释掉 mrs 版本):
// config['rule-providers']['loyalsoldier-gfw'] = {
// type: 'http', behavior: 'domain', format: 'text',
// url: 'https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt',
// path: './ruleset/loyalsoldier-gfw.txt',
// interval: nextInterval(),
// proxy: RP_PROXY
// }
metaDomain('loyalsoldier-gfw', 'gfw')
// GreatFire 封锁域名(独立探测源,与 GFWList 互补)──
// v5.1.7 PERF: text → MetaCubeX geosite:greatfire.mrs(同源 GreatFire Analyzer → v2fly)
// 备选方案(若 MetaCubeX .mrs 源不可用,取消下方注释并注释掉 mrs 版本):
// config['rule-providers']['loyalsoldier-greatfire'] = {
// type: 'http', behavior: 'domain', format: 'text',
// url: 'https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/greatfire.txt',
// path: './ruleset/loyalsoldier-greatfire.txt',
// interval: nextInterval(),
// proxy: RP_PROXY
// }
metaDomain('loyalsoldier-greatfire', 'greatfire')
// ================================================================
// v5.1 Step 2: Accademia/Additional_Rule_For_Clash 全量35目录
// ★ 作为 blackmatrix7/ios_rule_script 的补充规则
// ================================================================
// AI 服务补充
config['rule-providers']['acc-appleai'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/AppleAI/AppleAI.yaml',
path: './ruleset/acc-AppleAI.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// v5.2.7 FIX#27-P1: upstream `Grok/Grok.yaml` 含 `IP-CIDR , 17.253.4.125`
// (多余空格 + 缺 CIDR 掩码)会触发
// `parse classical rule [IP-CIDR , 17.253.4.125] error: payloadRule error`。
// 改用本仓库 mirrors/ 的清洗副本(仅删该行 + 规整空格)。
config['rule-providers']['acc-grok'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/IvanSolis1989/Smart-Config-Kit@main/mirrors/Grok.yaml',
path: './ruleset/acc-Grok.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-gemini'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Gemini/Gemini.yaml',
path: './ruleset/acc-Gemini.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-copilot'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Copilot/Copilot.yaml',
path: './ruleset/acc-Copilot.yaml',

interval: nextInterval(),
proxy: RP_PROXY
}
// 金融服务:Bank × 10国(原 acc-bank 404 → 拆分为子 provider)──
for (const cc of ['US', 'UK', 'HK', 'SG', 'JP', 'AU', 'CA', 'DE', 'NL', 'FR']) {
config['rule-providers'][`acc-bank-${cc.toLowerCase()}`] = {
type: 'http', behavior: 'classical',
url: `${ACC}/Bank/Bank${cc}.yaml`,
path: `./ruleset/acc-Bank${cc}.yaml`,
interval: nextInterval(),
proxy: RP_PROXY
}
}
// 金融服务:VirtualFinance × 4(原 acc-virtualfinance 404 → 拆分)──
for (const svc of ['Paypal', 'Wise', 'Monzo', 'Revolut']) {
config['rule-providers'][`acc-vf-${svc.toLowerCase()}`] = {
type: 'http', behavior: 'classical',
url: `${ACC}/VirtualFinance/${svc}.yaml`,
path: `./ruleset/acc-${svc}.yaml`,
interval: nextInterval(),
proxy: RP_PROXY
}
}
// 苹果补充
config['rule-providers']['acc-applenews'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/AppleNews/AppleNews.yaml',
path: './ruleset/acc-AppleNews.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-apple'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Apple/Apple.yaml',
path: './ruleset/acc-Apple.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// 微软补充
config['rule-providers']['acc-microsoftapps'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/MicrosoftAPPs/MicrosoftAPPs.yaml',
path: './ruleset/acc-MicrosoftAPPs.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// 即时通讯
config['rule-providers']['acc-signal'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Signal/Signal.yaml',
path: './ruleset/acc-Signal.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// 远程协作

config['rule-providers']['acc-rustdesk'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/RustDesk/RustDesk.yaml',
path: './ruleset/acc-RustDesk.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-parsec'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Parsec/Parsec.yaml',
path: './ruleset/acc-Parsec.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// 国内云盘/流媒体
config['rule-providers']['acc-alipan'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Alipan/Alipan.yaml',
path: './ruleset/acc-Alipan.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-baidunetdisk'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/BaiduNetDisk/BaiduNetDisk.yaml',
path: './ruleset/acc-BaiduNetDisk.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-weiyun'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/WeiYun/WeiYun.yaml',
path: './ruleset/acc-WeiYun.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-kwai'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Kwai/Kwai.yaml',
path: './ruleset/acc-Kwai.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// v5.1.1: FakeLocation × 10 平台(原 acc-fakelocation 404 → 拆分)
for (const app of [
'BiliBili', 'DouYin', 'KuaiShou', 'XiaoHongShu', 'XiGua',
'WeiBo', 'ZhiHu', 'TieBa', 'DouBan', 'XianYu'
]) {
config['rule-providers'][`acc-fl-${app.toLowerCase()}`] = {
type: 'http', behavior: 'classical',
url: `${ACC}/FakeLocation/FakeLocation${app}.yaml`,
path: `./ruleset/acc-FakeLocation${app}.yaml`,
interval: nextInterval(),
proxy: RP_PROXY
}
}

// 广告/安全/隐私
config['rule-providers']['acc-hijackingplus'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/HijackingPlus/HijackingPlus.yaml',
path: './ruleset/acc-HijackingPlus.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-blockhttpdnsplus'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/BlockHttpDNSPlus/BlockHttpDNSPlus.yaml',
path: './ruleset/acc-BlockHttpDNSPlus.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// v52: PreRepairEasyPrivacy 同时包含放行、代理与拒绝语义，不能整包绑定同一个策略。
// 按上游拆分文件分别引用，规则区再赋予对应出口，并保证位于所有广告规则之前。
config['rule-providers']['acc-prerepair-direct'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/PreRepairEasyPrivacy/PreRepairEasyPrivacy_DIRECT.yaml',
path: './ruleset/acc-PreRepairEasyPrivacy-DIRECT.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-prerepair-proxy'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/PreRepairEasyPrivacy/PreRepairEasyPrivacy_PROXY.yaml',
path: './ruleset/acc-PreRepairEasyPrivacy-PROXY.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-prerepair-reject'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/PreRepairEasyPrivacy/PreRepairEasyPrivacy_REJECT.yaml',
path: './ruleset/acc-PreRepairEasyPrivacy-REJECT.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-unsupportvpn'] = {
type: 'http', behavior: 'domain',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/UnsupportVPN/UnsupportVPN_Domain.yaml',
path: './ruleset/acc-UnsupportVPN-Domain.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// 下载更新
config['rule-providers']['acc-macappupgrade'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/MacAppUpgrade/MacAppUpgrade.yaml',
path: './ruleset/acc-MacAppUpgrade.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// CDN/DNS
config['rule-providers']['acc-fastly'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Fastly/Fastly.yaml',
path: './ruleset/acc-Fastly.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// v5.1.2 FIX#6: 删除 acc-globaldns provider(国外DNS由各服务商规则自然分流)
// acc-globaldns ← REMOVED
// v5.1.2 FIX#6: 删除 acc-chinadns provider(中国DNS由CN兜底规则自然分流到直连)
// acc-chinadns ← REMOVED
// v5.2.5 FIX#23-P1: acc-geositecn + acc-china 删除
// 这两个是 geosite:cn (metaDomain('cn', 'cn') 已提供) 的纯重复,
// 保留 acc-chinamax 作为 ChinaMax 独立补充覆盖
// 国内兜底补充

config['rule-providers']['acc-chinamax'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/ChinaMax/ChinaMax.yaml',
path: './ruleset/acc-ChinaMax.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// v5.1.1: HomeIP × 2国(原 acc-homeip 404 → 拆分)
for (const cc of ['US', 'JP']) {
config['rule-providers'][`acc-homeip-${cc.toLowerCase()}`] = {
type: 'http', behavior: 'classical',
url: `${ACC}/HomeIP/HomeIP${cc}.yaml`,
path: `./ruleset/acc-HomeIP${cc}.yaml`,
interval: nextInterval(),
proxy: RP_PROXY
}
}
// 国外网站
config['rule-providers']['acc-waybackmachine'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/WaybackMachine/WaybackMachine.yaml',
path: './ruleset/acc-WaybackMachine.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-pornhub'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/Pornhub/Pornhub.yaml',
path: './ruleset/acc-Pornhub.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// IoT:Aqara × 2(原 acc-aqara 404 → 拆分国内/国际)──
config['rule-providers']['acc-aqara-cn'] = {
type: 'http', behavior: 'classical',
url: `${ACC}/Aqara/AqaraCN.yaml`,
path: './ruleset/acc-AqaraCN.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
config['rule-providers']['acc-aqara-global'] = {
type: 'http', behavior: 'classical',
url: `${ACC}/Aqara/AqaraGlobal.yaml`,
path: './ruleset/acc-AqaraGlobal.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// P2P/Tracker
config['rule-providers']['acc-emuleserver'] = {
type: 'http', behavior: 'classical',
url: 'https://fastly.jsdelivr.net/gh/Accademia/Additional_Rule_For_Clash@main/eMuleServer/eMuleServer.yaml',
path: './ruleset/acc-eMuleServer.yaml',
interval: nextInterval(),
proxy: RP_PROXY
}
// GeoRouting Domain × 17 区域(原 acc-georouting-domain 404 → 按区域拆分,Domain版=作者推荐

// )──
for (const region of GEO_REGIONS_ALL) {
const slug = region.toLowerCase().replace(/_/g, '-')
config['rule-providers'][`acc-geo-d-${slug}`] = {
type: 'http', behavior: 'domain',
url: `${ACC}/GeoRouting_For_Domain/GeoRouting_${region}_ccTLD_Domain.yaml`,
path: `./ruleset/acc-GeoD-${region}.yaml`,
interval: nextInterval(),
proxy: RP_PROXY
}
}
// GeoRouting IP × 17 区域(原 acc-georouting-ip 404 → 按区域拆分)──
for (const region of GEO_REGIONS_ALL) {
const slug = region.toLowerCase().replace(/_/g, '-')
config['rule-providers'][`acc-geo-ip-${slug}`] = {
type: 'http', behavior: 'classical',
url: `${ACC}/GeoRouting_For_IP/GeoRouting_${region}_GeoIP.yaml`,
path: `./ruleset/acc-GeoIP-${region}.yaml`,
interval: nextInterval(),
proxy: RP_PROXY
}
}
const count = Object.keys(config['rule-providers']).length
log(`[${VERSION}] Injected ${count} rule-providers (base=${RP_BASE}s step=${RP_STEP}sspread=${_rpIdx * RP_STEP}s/${(_rpIdx * RP_STEP / 60).toFixed(1)}min)`)
}
// ================================================================
// 模块 H:规则注入
// ================================================================
function injectRules(config) {
// FlClash: 先构建完整数组,再原地写入(不能 config.rules = [...] 因为 QuickJS FFI 不支持数组重赋值)
var _newRules = [
// v8 LOGFIX#1: FlClash/FollowClash 出口 IP 检测域名白名单
// Hagezi TIF 会拦截部分 IP 查询服务，导致 checkIp 多源检测被 REJECT；
// 这些域名只用于显示当前出口 IP/地区，提前路由到工具组，避免被广告/威胁情报规则误杀。
`DOMAIN-SUFFIX,ip-api.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ipwho.is,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ipapi.co,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ipinfo.io,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ident.me,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ip.sb,${BIZ.TOOLS}`,
`DOMAIN,api.myip.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ifconfig.me,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,icanhazip.com,${BIZ.TOOLS}`,

// v52 P0：先执行 EasyPrivacy / AdvertisingLite 的修复例外，再进入任何广告、安全或隐私规则。
// 上游拆分语义：DIRECT=直连例外，PROXY=代理例外，REJECT=确认应拦截的遥测补充。
`RULE-SET,acc-prerepair-direct,DIRECT`,
`RULE-SET,acc-prerepair-proxy,${BIZ.INTL_SITE}`,
`RULE-SET,acc-prerepair-reject,${BIZ.AD}`,
// v52 P0：UnsupportVPN 是“不支持 VPN、但可直连”的兼容清单，不是广告黑名单。
`RULE-SET,acc-unsupportvpn,DIRECT`,

`RULE-SET,anti-ad,${BIZ.AD}`,
// v5.1: P0 安全 - 钓鱼域名拦截(13万条,SukkaW)
`RULE-SET,sukka-phishing,${BIZ.AD}`,
// v5.1.6: P0 安全 - 威胁情报(Hagezi TIF:malware/cryptojacking/C2/scam/spam)
`RULE-SET,hagezi-tif,${BIZ.AD}`,
// v5.2.1 REMOVED: ckrvxr-antifraud 和 ckrvxr-antipcdn 规则源已下线
// v5.1: Accademia 安全补充
`RULE-SET,acc-hijackingplus,${BIZ.AD}`,
`RULE-SET,acc-blockhttpdnsplus,${BIZ.AD}`,
`GEOSITE,category-ads-all,${BIZ.AD}`,
`RULE-SET,advertising,${BIZ.AD}`,
`RULE-SET,advertisingmitv,${BIZ.AD}`,
`RULE-SET,adobeactivation,${BIZ.AD}`,
`RULE-SET,blockhttpdns,${BIZ.AD}`,
`RULE-SET,domob,${BIZ.AD}`,
`RULE-SET,hijacking,${BIZ.AD}`,
`RULE-SET,jiguangtuisong,${BIZ.AD}`,
`RULE-SET,marketing,${BIZ.AD}`,
`RULE-SET,miuiprivacy,${BIZ.AD}`,
`RULE-SET,privacy,${BIZ.AD}`,
`RULE-SET,youmengchuangxiang,${BIZ.AD}`,
// v55 功能优先：本条硬拒绝最终由拦截层收口器移动到 MATCH 前；正常功能与私网规则优先。
'DST-PORT,7680,REJECT',
// v55.1：ModelFlare 主域名的本地异常解析会落入 127.0.0.0/8；域名规则必须先于 private IP 规则命中并交由代理远端解析。
`DOMAIN-SUFFIX,modelflare.dev,${BIZ.AI}`,
'GEOSITE,private,DIRECT',
'GEOIP,private,DIRECT,no-resolve',
'IP-CIDR,172.90.1.130/32,DIRECT,no-resolve',

'PROCESS-NAME,WorkPro.exe,DIRECT',
'PROCESS-NAME,GCUService.exe,DIRECT',
'PROCESS-NAME,GCUBridge.exe,DIRECT',
'PROCESS-NAME,CCUWinUI.exe,DIRECT',
'PROCESS-NAME,HipsDaemon.exe,DIRECT',
'PROCESS-NAME,gdphost.exe,DIRECT',
'PROCESS-NAME,gehsender.exe,DIRECT',
'PROCESS-NAME,GSCService.exe,DIRECT',
// v5.1.8 FIX#12-P1: GSCService.exe 每 2h 访问 ip.cip.cc 做外部 IP 检测,TUN 下 DNS 解析失败
// 日志:dial DIRECT (match ProcessName/GSCService.exe) --> ip.cip.cc:80 error: dns resolve
// failed
'DOMAIN,ip.cip.cc,DIRECT',
'PROCESS-NAME,gsupservice.exe,DIRECT',
'PROCESS-NAME,gchsvc.exe,DIRECT',
'PROCESS-NAME,Weixin.exe,DIRECT',
'PROCESS-NAME,WeChatAppEx.exe,DIRECT',
'PROCESS-NAME,QQ.exe,DIRECT',
'PROCESS-NAME,WeChat.exe,DIRECT',
'DST-PORT,26880,DIRECT',
'DST-PORT,6540,DIRECT',
'DST-PORT,33068,DIRECT',
'DST-PORT,123,DIRECT',
'DST-PORT,3478,DIRECT',
'DST-PORT,3479,DIRECT',
'DOMAIN-SUFFIX,chiphell.com,DIRECT',
'DOMAIN-SUFFIX,iwipwedabay.com,DIRECT',
// v5.2.0 CLEAN#2: Binance 精确 DOMAIN 规则已清理(全部被同组 DOMAIN-SUFFIX 覆盖)
// 保留 fake-ip-filter 中的精确域名(DNS 层独立于规则层,不受影响)
`DOMAIN-SUFFIX,binance.vision,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,binance.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,binance.info,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,binance.cloud,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,binance.me,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,binance.org,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,binancefuture.com,${BIZ.CRYPTO}`,
// v5.1.8 FIX#11-P0: dns.google 是 DoH 服务,前置拦截防止 szkane-ai 宽规则吞入 AI 组
// v5.2.10 FIX#39: 由 云与CDN 改路由到 受限网站——dns.google 在境内被封,
// 若用戶把 CDN 组误设直连,DoH 必失败;放在 GFW 组语义更准确
`DOMAIN,dns.google,${BIZ.GFW}`,
`DOMAIN,dns.google.com,${BIZ.GFW}`,
// v5.1.8 FIX#14-P0: YouTube/googlevideo 被 szkane-ai 宽规则吞入 AI 组
// szkane AiDomain.list 含 Google 宽域名(因 Gemini),导致 YouTube 全系误走 AI 代理
// 日志:[TCP] dial AI 服务 (match RuleSet/szkane-ai) --> www.youtube.com / yt3.ggpht.com /
// googlevideo.com
// 前置精准拦截到 STREAM_US,优先于 RULE-SET,szkane-ai 生效
`DOMAIN-SUFFIX,youtube.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtu.be,${BIZ.YT}`,
`DOMAIN-SUFFIX,googlevideo.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,ytimg.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,ggpht.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtube-nocookie.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtubekids.com,${BIZ.YT}`,
`RULE-SET,openai,${BIZ.AI}`,
`RULE-SET,claude,${BIZ.AI}`,
`RULE-SET,gemini,${BIZ.AI}`,
`RULE-SET,copilot,${BIZ.AI}`,
`DOMAIN-SUFFIX,perplexity.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,mistral.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,x.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,grok.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,deepseek.com,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,huggingface.co,${BIZ.AI}`,

`DOMAIN-SUFFIX,replicate.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,together.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,cohere.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,cohere.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,midjourney.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,stability.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,anthropic.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,cursor.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,cursor.sh,${BIZ.AI}`,
`DOMAIN-SUFFIX,v0.dev,${BIZ.AI}`,
`DOMAIN-SUFFIX,vercel.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,notebooklm.google,${BIZ.AI}`,
`DOMAIN-SUFFIX,poe.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,character.ai,${BIZ.AI}`,
// v5.2.2: PI.ai/Inflection → GFW(中国被墙需代理,印尼可直连)
`DOMAIN-SUFFIX,inflection.ai,${BIZ.GFW}`,
`DOMAIN-SUFFIX,pi.ai,${BIZ.GFW}`,
`DOMAIN-SUFFIX,suno.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,suno.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,runway.ml,${BIZ.AI}`,
`DOMAIN-SUFFIX,runwayml.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,openrouter.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,fireworks.ai,${BIZ.AI}`,
`DOMAIN-SUFFIX,modal.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,modal.run,${BIZ.AI}`,
`DOMAIN-SUFFIX,runpod.io,${BIZ.AI}`,
`RULE-SET,civitai,${BIZ.AI}`,
//
// v5.1.8 FIX#14-P0:Google 子服务防吞盾
// szkane AiDomain.list 含 Google 宽域名(因 Gemini/Bard),导致 Google 全系误走 AI 代理
// 解法:在 RULE-SET,szkane-ai 之前前置所有 Google 非 AI 子服务精准规则
// 已安全(在此之前已匹配):Gemini(RULE-SET) / NotebookLM / YouTube / dns.google
// ▼ 以下规则从各业务区块提升至此,原位置 dead rules 已在 v5.1.9 清除
//
// Google 邮件
`DOMAIN-SUFFIX,gmail.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,googlemail.com,${BIZ.INTL_SITE}`,
`DOMAIN,mail.google.com,${BIZ.INTL_SITE}`,
`DOMAIN,inbox.google.com,${BIZ.INTL_SITE}`,
// Google 即时通讯
`RULE-SET,googlevoice,${BIZ.IM}`,
// Google 会议协作
`DOMAIN-SUFFIX,meet.google.com,${BIZ.WORK}`,
`DOMAIN,meet.googleapis.com,${BIZ.WORK}`,
// Google 下载更新
`DOMAIN-SUFFIX,dl.google.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,play.googleapis.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,android.clients.google.com,${BIZ.DOWNLOAD}`,
`RULE-SET,googlefcm,${BIZ.DOWNLOAD}`,
// Google 搜索引擎(兜底:MetaCubeX geosite:google 覆盖 google.com/co.*/com.*)──
`RULE-SET,googlesearch,${BIZ.TOOLS}`,
`RULE-SET,googledrive,${BIZ.TOOLS}`,
`RULE-SET,googleearth,${BIZ.TOOLS}`,
`RULE-SET,google,${BIZ.TOOLS}`,
`RULE-SET,google-ip,${BIZ.TOOLS},no-resolve`,
//

// v5.1: szkane AI 综合 + Accademia AI 补充
`RULE-SET,szkane-ai,${BIZ.AI}`,
`RULE-SET,szkane-ciciai,${BIZ.AI}`,
`RULE-SET,acc-appleai,${BIZ.AI}`,
`RULE-SET,acc-grok,${BIZ.AI}`,
`RULE-SET,acc-gemini,${BIZ.AI}`,
// v5.1.8 FIX#13-P2: 微软 Delivery Optimization 遥测非 Copilot AI,前置拦截
// 日志:match RuleSet/acc-copilot) --> geover.prod.do.dsp.mp.microsoft.com:443
`DOMAIN-SUFFIX,do.dsp.mp.microsoft.com,${BIZ.DOWNLOAD}`,
`RULE-SET,acc-copilot,${BIZ.AI}`,
`DOMAIN-SUFFIX,tradingview.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,tvcdn.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,coinglass.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,hyperliquid.xyz,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,hyperliquid-testnet.xyz,${BIZ.CRYPTO}`,
`RULE-SET,cryptocurrency,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,eth.limo,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,glitternode.ru,${BIZ.CRYPTO}`,
`RULE-SET,binance,${BIZ.CRYPTO}`,
// v5.1: szkane Web3(DeFi/NFT/区块链RPC)★量化交易核心
`RULE-SET,szkane-web3,${BIZ.CRYPTO}`,
`RULE-SET,paypal,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,stripe.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,stripe.network,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,stripecdn.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,stripe.dev,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,wise.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,transferwise.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,revolut.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,revolut.me,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,braintreegateway.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,braintree-api.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,venmo.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,cash.app,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,squareup.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,square.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,adyen.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,checkout.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,klarna.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,afterpay.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,plaid.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,midtrans.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,gopay.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,ovo.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,dana.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,shopeepay.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,xendit.co,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,doku.com,${BIZ.PAYMENTS}`,
`RULE-SET,stripe,${BIZ.PAYMENTS}`,
`RULE-SET,visa,${BIZ.PAYMENTS}`,
`RULE-SET,tigerfintech,${BIZ.PAYMENTS}`,
// v5.1.1: Accademia 银行 × 10国 + 虚拟金融 × 4
// ...['US','UK','HK','SG','JP','AU','CA','DE','NL','FR'].map(cc => `RULE-SET,acc-bank-
// ${cc.toLowerCase()},${BIZ.PAYMENTS}`),
// ...['paypal','wise','monzo','revolut'].map(svc => `RULE-SET,acc-vf-${svc},${BIZ.PAYMENTS}`),
`DOMAIN,login.live.com,${BIZ.MS}`,
`DOMAIN,g.live.com,${BIZ.MS}`,
`DOMAIN-SUFFIX,officeapps.live.com,${BIZ.MS}`,
// v5.1.9 CLEAN#1: gmail.com/googlemail.com/mail.google.com/inbox.google.com 已提升至防吞盾
// (FIX#14),dead rules 已清除
`DOMAIN-SUFFIX,outlook.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,outlook.live.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,hotmail.com,${BIZ.INTL_SITE}`,

`DOMAIN,mail.live.com,${BIZ.INTL_SITE}`,
`DOMAIN,outlook.office365.com,${BIZ.INTL_SITE}`,
`DOMAIN,outlook.office.com,${BIZ.INTL_SITE}`,
`DOMAIN,mail.yahoo.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,ymail.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,protonmail.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,proton.me,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,pm.me,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,tutanota.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,tuta.com,${BIZ.INTL_SITE}`,
// v5.1.3 FIX#7: Zoho 宽域名收窄为邮件专用子域名(防止吞掉 RULE-SET,zoho 会议协作规则)
`DOMAIN,mail.zoho.com,${BIZ.INTL_SITE}`,
`DOMAIN,mail.zoho.eu,${BIZ.INTL_SITE}`,
`DOMAIN,mail.zoho.in,${BIZ.INTL_SITE}`,
`DOMAIN,mail.zoho.com.au,${BIZ.INTL_SITE}`,
`DOMAIN,mail.zoho.jp,${BIZ.INTL_SITE}`,
`DOMAIN,mail.me.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,fastmail.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,fastmail.fm,${BIZ.INTL_SITE}`,
`RULE-SET,mail,${BIZ.INTL_SITE}`,
`RULE-SET,mailru,${BIZ.INTL_SITE}`,
`RULE-SET,protonmail,${BIZ.INTL_SITE}`,
`RULE-SET,spark,${BIZ.INTL_SITE}`,
'DOMAIN-SUFFIX,mail.qq.com,DIRECT',
'DOMAIN-SUFFIX,mail.163.com,DIRECT',
'DOMAIN-SUFFIX,mail.126.com,DIRECT',
'DOMAIN-SUFFIX,mail.sina.com.cn,DIRECT',
'DOMAIN-SUFFIX,mail.aliyun.com,DIRECT',
`RULE-SET,telegram,${BIZ.IM}`,
`RULE-SET,telegram-ip,${BIZ.IM},no-resolve`,
`RULE-SET,discord,${BIZ.IM}`,
`RULE-SET,whatsapp,${BIZ.IM}`,
`RULE-SET,line,${BIZ.IM}`,
`RULE-SET,kakaotalk,${BIZ.IM}`,
`DOMAIN-SUFFIX,skype.com,${BIZ.IM}`,
`DOMAIN-SUFFIX,skypeecs.net,${BIZ.IM}`,
`DOMAIN-SUFFIX,skypeforbusiness.com,${BIZ.IM}`,
`DOMAIN-SUFFIX,sfbassets.com,${BIZ.IM}`,
`DOMAIN-SUFFIX,lync.com,${BIZ.IM}`,
`DOMAIN-SUFFIX,signal.org,${BIZ.IM}`,
`DOMAIN-SUFFIX,whispersystems.org,${BIZ.IM}`,
`DOMAIN-SUFFIX,signal.art,${BIZ.IM}`,
`DOMAIN-SUFFIX,viber.com,${BIZ.IM}`,
`DOMAIN-SUFFIX,viber.io,${BIZ.IM}`,
`DOMAIN-SUFFIX,element.io,${BIZ.IM}`,
`DOMAIN-SUFFIX,matrix.org,${BIZ.IM}`,
`DOMAIN-SUFFIX,zalo.me,${BIZ.IM}`,
`DOMAIN-SUFFIX,zalopay.vn,${BIZ.IM}`,
`DOMAIN-SUFFIX,wire.com,${BIZ.IM}`,
`DOMAIN-SUFFIX,threema.ch,${BIZ.IM}`,
`RULE-SET,telegramnl,${BIZ.IM}`,
`RULE-SET,telegramsg,${BIZ.IM}`,
`RULE-SET,telegramus,${BIZ.IM}`,
`RULE-SET,zalo,${BIZ.IM}`,
// v5.1.9 CLEAN#1: googlevoice 已提升至防吞盾(FIX#14),dead rule 已清除
`RULE-SET,italkbb,${BIZ.IM}`,
// v5.1: Accademia Signal 补充
`RULE-SET,acc-signal,${BIZ.IM}`,
`DOMAIN-SUFFIX,icq.com,${BIZ.IM}`,
`RULE-SET,twitter,${BIZ.SOCIAL}`,
`RULE-SET,twitter-ip,${BIZ.SOCIAL},no-resolve`,
`RULE-SET,tiktok,${BIZ.TIKTOK}`,
`RULE-SET,reddit,${BIZ.SOCIAL}`,
`RULE-SET,facebook,${BIZ.SOCIAL}`,

`RULE-SET,facebook-ip,${BIZ.SOCIAL},no-resolve`,
`RULE-SET,instagram,${BIZ.SOCIAL}`,
`RULE-SET,snapchat,${BIZ.SOCIAL}`,
`RULE-SET,pinterest,${BIZ.SOCIAL}`,
`RULE-SET,linkedin,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,mastodon.social,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,joinmastodon.org,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,threads.net,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,bsky.app,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,bsky.social,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,tumblr.com,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,quora.com,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,medium.com,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,flickr.com,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,clubhouse.com,${BIZ.SOCIAL}`,
`DOMAIN-SUFFIX,lemon8-app.com,${BIZ.SOCIAL}`,
`RULE-SET,tumblr,${BIZ.SOCIAL}`,
`RULE-SET,clubhouse,${BIZ.SOCIAL}`,
`RULE-SET,clubhouseip,${BIZ.SOCIAL}`,
`RULE-SET,pixiv,${BIZ.SOCIAL}`,
`RULE-SET,truthsocial,${BIZ.SOCIAL}`,
`RULE-SET,vk,${BIZ.SOCIAL}`,
`RULE-SET,blued,${BIZ.CN_SITE}`,
`RULE-SET,disqus,${BIZ.SOCIAL}`,
`RULE-SET,imgur,${BIZ.SOCIAL}`,
`RULE-SET,pixnet,${BIZ.SOCIAL}`,
`RULE-SET,zoom,${BIZ.WORK}`,
`RULE-SET,slack,${BIZ.WORK}`,
`RULE-SET,teams,${BIZ.WORK}`,
// v5.1.9 CLEAN#1: meet.google.com/meet.googleapis.com 已提升至防吞盾(FIX#14),dead rules 已清除
`DOMAIN-SUFFIX,webex.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,wbx2.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,ciscospark.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,notion.so,${BIZ.WORK}`,
`DOMAIN-SUFFIX,notion.site,${BIZ.WORK}`,
`DOMAIN-SUFFIX,figma.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,linear.app,${BIZ.WORK}`,
`DOMAIN-SUFFIX,atlassian.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,jira.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,trello.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,bitbucket.org,${BIZ.WORK}`,
`DOMAIN-SUFFIX,asana.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,monday.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,clickup.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,basecamp.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,airtable.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,miro.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,canva.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,coda.io,${BIZ.WORK}`,
`DOMAIN-SUFFIX,loom.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,larksuite.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,larkoffice.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,gotomeeting.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,logmein.com,${BIZ.WORK}`,
`DOMAIN-SUFFIX,goto.com,${BIZ.WORK}`,
`RULE-SET,atlassian,${BIZ.WORK}`,
`RULE-SET,notion,${BIZ.WORK}`,
`RULE-SET,teamviewer,${BIZ.WORK}`,
`RULE-SET,zoho,${BIZ.WORK}`,
`RULE-SET,salesforce,${BIZ.WORK}`,
`RULE-SET,zendesk,${BIZ.WORK}`,
`RULE-SET,intercom,${BIZ.WORK}`,
`RULE-SET,remotedesktop,${BIZ.WORK}`,
// v5.1: Accademia 远程桌面补充
`RULE-SET,acc-rustdesk,${BIZ.WORK}`,

`RULE-SET,acc-parsec,${BIZ.WORK}`,
'DOMAIN-SUFFIX,feishu.cn,DIRECT',
'DOMAIN-SUFFIX,dingtalk.com,DIRECT',
'DOMAIN-SUFFIX,welink.huaweicloud.com,DIRECT',
`RULE-SET,bilibili,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,iqiyi.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,iqiyipic.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,71.am,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,youku.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,ykimg.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,soku.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,v.qq.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,video.qq.com,${BIZ.CNMEDIA}`,
`DOMAIN-KEYWORD,tencentvideo,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,mgtv.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,hitv.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,hunantv.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,douyin.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,douyinpic.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,douyinvod.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,ixigua.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,pstatp.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,snssdk.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,sohu.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,music.163.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,ntes53.netease.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,y.qq.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,music.qq.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,kugou.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,kuwo.cn,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,xiaohongshu.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,xhscdn.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,kuaishou.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,gifshow.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,weibo.com,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,weibo.cn,${BIZ.CNMEDIA}`,
`DOMAIN-SUFFIX,sinaimg.cn,${BIZ.CNMEDIA}`,
`RULE-SET,iqiyi,${BIZ.CNMEDIA}`,
`RULE-SET,youku,${BIZ.CNMEDIA}`,
`RULE-SET,tencentvideo,${BIZ.CNMEDIA}`,
`RULE-SET,douyin,${BIZ.CNMEDIA}`,
`RULE-SET,bytedance,${BIZ.CNMEDIA}`,
`RULE-SET,kuaishou,${BIZ.CNMEDIA}`,
`RULE-SET,weibo,${BIZ.CNMEDIA}`,
`RULE-SET,xiaohongshu,${BIZ.CNMEDIA}`,
`RULE-SET,neteasemusic,${BIZ.CNMEDIA}`,
`RULE-SET,kugoukuwo,${BIZ.CNMEDIA}`,
`RULE-SET,sohu,${BIZ.CNMEDIA}`,
`RULE-SET,acfun,${BIZ.CNMEDIA}`,
`RULE-SET,douyu,${BIZ.CNMEDIA}`,
`RULE-SET,huya,${BIZ.CNMEDIA}`,
`RULE-SET,himalaya,${BIZ.CNMEDIA}`,
`RULE-SET,cctv,${BIZ.CNMEDIA}`,
`RULE-SET,hunantv,${BIZ.CNMEDIA}`,
`RULE-SET,pptv,${BIZ.CNMEDIA}`,
`RULE-SET,funshion,${BIZ.CNMEDIA}`,
`RULE-SET,letv,${BIZ.CNMEDIA}`,
`RULE-SET,taihemusic,${BIZ.CNMEDIA}`,
`RULE-SET,kukemusic,${BIZ.CNMEDIA}`,
`RULE-SET,hibymusic,${BIZ.CNMEDIA}`,
`RULE-SET,miwu,${BIZ.CNMEDIA}`,
`RULE-SET,migu,${BIZ.CNMEDIA}`,
`RULE-SET,iptvmainland,${BIZ.CNMEDIA}`,
`RULE-SET,iptvother,${BIZ.CNMEDIA}`,
`RULE-SET,cibn,${BIZ.CNMEDIA}`,

`RULE-SET,bestv,${BIZ.CNMEDIA}`,
`RULE-SET,huashutv,${BIZ.CNMEDIA}`,
`RULE-SET,smg,${BIZ.CNMEDIA}`,
`RULE-SET,hwtv,${BIZ.CNMEDIA}`,
`RULE-SET,nivodtv,${BIZ.CNMEDIA}`,
`RULE-SET,olevod,${BIZ.CNMEDIA}`,
`RULE-SET,dandanzan,${BIZ.CNMEDIA}`,
`RULE-SET,dandanplay,${BIZ.CNMEDIA}`,
`RULE-SET,tiantiankankan,${BIZ.CNMEDIA}`,
`RULE-SET,yizhibo,${BIZ.CNMEDIA}`,
`RULE-SET,ku6,${BIZ.CNMEDIA}`,
`RULE-SET,56,${BIZ.CNMEDIA}`,
`RULE-SET,cetv,${BIZ.CNMEDIA}`,
`RULE-SET,yyets,${BIZ.CNMEDIA}`,
// v5.1: Accademia 国内云盘/媒体补充
`RULE-SET,acc-alipan,${BIZ.CNMEDIA}`,
`RULE-SET,acc-baidunetdisk,${BIZ.CNMEDIA}`,
`RULE-SET,acc-weiyun,${BIZ.CNMEDIA}`,
// v5.1.3 FIX#8: acc-kwai(Kwai国际版)从 CNMEDIA 移到 STREAM_SEA(海外APP需代理)
// RULE-SET,acc-kwai 已移至东南亚流媒体区块
// v5.1.1: Accademia FakeLocation × 10 平台(国内APP IP归属地伪装)
...['bilibili','douyin','kuaishou','xiaohongshu','xigua',
'weibo','zhihu','tieba','douban','xianyu'].map(app => `RULE-SET,acc-fl-${app},${BIZ.CNMEDIA}`),
// v5.1.2 FIX#2: 港澳台哔哩哔哩需港区代理解锁(v5.1.1 误归入 CNMEDIA/DIRECT 导致 412)
`RULE-SET,szkane-bilihmt,${BIZ.STREAM_HK}`,
`RULE-SET,viu,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,wetv.vip,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,wetvinfo.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,iq.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,vidio.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,vidio.static6.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,rctiplus.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,visionplus.id,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,genflix.co.id,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,goplay.co.id,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,maxstream.tv,${BIZ.STREAM_OTHER}`,
`RULE-SET,biliintl,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,viki.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,viki.io,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,iflix.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,catchplay.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,mewatch.sg,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,trueid.net,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,dimsum.my,${BIZ.STREAM_OTHER}`,
`RULE-SET,asianmedia,${BIZ.STREAM_OTHER}`,
`RULE-SET,iqiyiintl,${BIZ.STREAM_OTHER}`,
`RULE-SET,joox,${BIZ.STREAM_OTHER}`,
`RULE-SET,mewatch,${BIZ.STREAM_OTHER}`,
`RULE-SET,viki,${BIZ.STREAM_OTHER}`,
`RULE-SET,wetv,${BIZ.STREAM_OTHER}`,
`RULE-SET,zee,${BIZ.STREAM_OTHER}`,
// v5.1.3 FIX#8: acc-kwai(Kwai国际版)移入东南亚流媒体(巴西/印尼主战场需代理)
`RULE-SET,acc-kwai,${BIZ.STREAM_OTHER}`,
`RULE-SET,youtube,${BIZ.YT}`,
`RULE-SET,netflix,${BIZ.NFLX}`,
`RULE-SET,netflix-ip,${BIZ.NFLX},no-resolve`,
`RULE-SET,spotify,${BIZ.MUSIC}`,
`RULE-SET,disney,${BIZ.DSNP}`,
`RULE-SET,hbo,${BIZ.HBO}`,
`RULE-SET,primevideo,${BIZ.PRIME}`,
`RULE-SET,hulu,${BIZ.HULU}`,
`RULE-SET,paramount,${BIZ.STREAM_OTHER}`,
`RULE-SET,peacock,${BIZ.STREAM_OTHER}`,

`RULE-SET,twitch,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,amazonaws.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,awsstatic.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,aws.amazon.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,elasticbeanstalk.com,${BIZ.TOOLS}`,
`RULE-SET,amazon,${BIZ.PRIME}`,
`DOMAIN-SUFFIX,crunchyroll.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,vrv.co,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,soundcloud.com,${BIZ.MUSIC}`,
`DOMAIN-SUFFIX,sndcdn.com,${BIZ.MUSIC}`,
`DOMAIN-SUFFIX,pandora.com,${BIZ.MUSIC}`,
`DOMAIN-SUFFIX,pluto.tv,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,tubi.tv,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,fubo.tv,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,discoveryplus.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,max.com,${BIZ.HBO}`,
`DOMAIN-SUFFIX,appletv.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,deezer.com,${BIZ.MUSIC}`,
`DOMAIN-SUFFIX,tidal.com,${BIZ.MUSIC}`,
`DOMAIN-SUFFIX,vimeo.com,${BIZ.STREAM_OTHER}`,
`DOMAIN-SUFFIX,dailymotion.com,${BIZ.STREAM_OTHER}`,
`RULE-SET,cbs,${BIZ.STREAM_OTHER}`,
`RULE-SET,nbc,${BIZ.STREAM_OTHER}`,
`RULE-SET,pbs,${BIZ.STREAM_OTHER}`,
`RULE-SET,attwatchtv,${BIZ.STREAM_OTHER}`,
`RULE-SET,fox,${BIZ.STREAM_OTHER}`,
`RULE-SET,fubotv,${BIZ.STREAM_OTHER}`,
`RULE-SET,sling,${BIZ.STREAM_OTHER}`,
`RULE-SET,soundcloud,${BIZ.MUSIC}`,
`RULE-SET,pandora,${BIZ.MUSIC}`,
`RULE-SET,pandoratv,${BIZ.MUSIC}`,
`RULE-SET,tidal,${BIZ.MUSIC}`,
`RULE-SET,vimeo,${BIZ.STREAM_OTHER}`,
`RULE-SET,dailymotion,${BIZ.STREAM_OTHER}`,
`RULE-SET,deezer,${BIZ.MUSIC}`,
`RULE-SET,discoveryplus,${BIZ.STREAM_OTHER}`,
`RULE-SET,overcast,${BIZ.MUSIC}`,
`RULE-SET,americasvoice,${BIZ.STREAM_OTHER}`,
`RULE-SET,cake,${BIZ.STREAM_OTHER}`,
`RULE-SET,dood,${BIZ.STREAM_OTHER}`,
// v5.1.3 FIX#9: ehgallery 从 STREAM_US 移到 INTL_SITE(非流媒体,全球节点更灵活)
// RULE-SET,ehgallery 已移至国外网站区块
`RULE-SET,lastfm,${BIZ.MUSIC}`,
`RULE-SET,emby,${BIZ.STREAM_OTHER}`,
// v5.1: szkane Netflix IP 段补充
`RULE-SET,szkane-netflixip,${BIZ.NFLX}`,
`DOMAIN-SUFFIX,mytvsuper.com,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,mytv.com.hk,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,viu.com,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,viu.tv,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,hktv.com.hk,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,hktvmall.com,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,nowtv.com,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,nowe.com,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,rthk.hk,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,icable.com,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,cabletv.com.hk,${BIZ.STREAM_HK}`,
`DOMAIN-SUFFIX,hmvod.com.hk,${BIZ.STREAM_HK}`,
`RULE-SET,mytvsuper,${BIZ.STREAM_HK}`,
`RULE-SET,tvb,${BIZ.STREAM_HK}`,
`RULE-SET,encoretvb,${BIZ.STREAM_HK}`,
`RULE-SET,nowe,${BIZ.STREAM_HK}`,
`RULE-SET,rthk,${BIZ.STREAM_HK}`,
`RULE-SET,cabletv,${BIZ.STREAM_HK}`,

`RULE-SET,moov,${BIZ.STREAM_HK}`,
`RULE-SET,bahamut,${BIZ.STREAM_TW}`,
`RULE-SET,kktv,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,litv.tv,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,video.friday.tw,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,friday.tw,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,linetv.tw,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,elta.tv,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,mod.cht.com.tw,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,hamivideo.hinet.net,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,ofiii.com,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,pts.org.tw,${BIZ.STREAM_TW}`,
`DOMAIN-SUFFIX,4gtv.tv,${BIZ.STREAM_TW}`,
`RULE-SET,litv,${BIZ.STREAM_TW}`,
`RULE-SET,friday,${BIZ.STREAM_TW}`,
`RULE-SET,hamivideo,${BIZ.STREAM_TW}`,
`RULE-SET,linetv,${BIZ.STREAM_TW}`,
`RULE-SET,vidoltv,${BIZ.STREAM_TW}`,
`RULE-SET,taiwangood,${BIZ.STREAM_TW}`,
`RULE-SET,cht,${BIZ.STREAM_TW}`,
`RULE-SET,abema,${BIZ.STREAM_JP}`,
`RULE-SET,dazn,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,tver.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,unext.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,video.unext.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,nhk.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,nhk.or.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,dmm.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,dmm.co.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,dtv.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,paravi.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,videomarket.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,fod.fujitv.co.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,hulu.jp,${BIZ.HULU}`,
`DOMAIN-SUFFIX,happyon.jp,${BIZ.HULU}`,
`DOMAIN-SUFFIX,gyao.yahoo.co.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,music.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,nicovideo.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,nicovideo.me,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,dmc.nico,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,radiko.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,lemino.docomo.ne.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,wowow.co.jp,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,wavve.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,tving.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,watcha.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,coupangplay.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,sbs.co.kr,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,kbs.co.kr,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,mbc.co.kr,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,jtbc.co.kr,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,tvn.cjenm.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,afreecatv.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,tv.naver.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,now.naver.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,vod.naver.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,navertv.naver.com,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,kakaotv.daum.net,${BIZ.STREAM_JP}`,
`DOMAIN-SUFFIX,navercorp.com,${BIZ.STREAM_JP}`,
`RULE-SET,dmm,${BIZ.STREAM_JP}`,
`RULE-SET,tver,${BIZ.STREAM_JP}`,
`RULE-SET,niconico,${BIZ.STREAM_JP}`,
`RULE-SET,rakuten,${BIZ.STREAM_JP}`,
`RULE-SET,japonx,${BIZ.STREAM_JP}`,
`RULE-SET,nikkei,${BIZ.STREAM_JP}`,

`RULE-SET,bbc,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,itv.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,itvstatic.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,channel4.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,channel5.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,sky.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,nowtv.co.uk,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,britbox.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,canalplus.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,mycanal.fr,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,france.tv,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,tf1.fr,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,molotov.tv,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,arte.tv,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,joyn.de,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,zdf.de,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,ard.de,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,ardmediathek.de,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,rtlplus.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,raiplay.it,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,rtve.es,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,videoland.com,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,ruutu.fi,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,tv2.dk,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,svtplay.se,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,nrk.no,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,ivi.ru,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,kinopoisk.ru,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,okko.tv,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,more.tv,${BIZ.STREAM_EU}`,
`RULE-SET,itv,${BIZ.STREAM_EU}`,
`RULE-SET,all4,${BIZ.STREAM_EU}`,
`RULE-SET,my5,${BIZ.STREAM_EU}`,
`RULE-SET,skygo,${BIZ.STREAM_EU}`,
`RULE-SET,britboxuk,${BIZ.STREAM_EU}`,
`RULE-SET,londonreal,${BIZ.STREAM_EU}`,
`RULE-SET,qobuz,${BIZ.MUSIC}`,
// v5.1: szkane UK Apps
`RULE-SET,szkane-uk,${BIZ.STREAM_EU}`,
`DOMAIN-SUFFIX,mihoyo.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,miyoushe.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,yuanshen.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,bhsr.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,zenlesszonezero.com,${BIZ.GAME_CN}`,
`DOMAIN,game.163.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,gm.163.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,ds.163.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,nie.163.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,nie.netease.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,update.netease.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,netease.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,wegame.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,wegame.com.cn,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,perfect-world.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,wanmei.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,xd.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,taptap.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,taptap.io,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,papegames.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,hypergryph.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,gryphline.com,${BIZ.GAME_CN}`,
`DOMAIN-SUFFIX,lilith.com,${BIZ.GAME_CN}`,
`RULE-SET,steamcn,${BIZ.GAME_CN}`,
`RULE-SET,wanmeishijie,${BIZ.GAME_CN}`,
`RULE-SET,wankahuanju,${BIZ.GAME_CN}`,

`RULE-SET,majsoul,${BIZ.GAME_CN}`,
`RULE-SET,steam,${BIZ.GAME_INTL}`,
`RULE-SET,epic,${BIZ.GAME_INTL}`,
`RULE-SET,playstation,${BIZ.GAME_INTL}`,
`RULE-SET,nintendo,${BIZ.GAME_INTL}`,
`RULE-SET,xbox,${BIZ.GAME_INTL}`,
`RULE-SET,ea,${BIZ.GAME_INTL}`,
`RULE-SET,blizzard,${BIZ.GAME_INTL}`,
`GEOSITE,category-games,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,ubisoft.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,ubi.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,riotgames.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,leagueoflegends.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,valorant.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,rockstargames.com,${BIZ.GAME_INTL}`,
// v5.2.0 CLEAN#3: socialclub.rockstargames.com 已被上行 SUFFIX 覆盖,dead rule 已清除
`DOMAIN-SUFFIX,gog.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,gogalaxy.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,bethesda.net,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,supercell.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,garena.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,hoyoverse.com,${BIZ.GAME_INTL}`,
`DOMAIN-SUFFIX,hoyolab.com,${BIZ.GAME_INTL}`,
`RULE-SET,rockstar,${BIZ.GAME_INTL}`,
`RULE-SET,riot,${BIZ.GAME_INTL}`,
`RULE-SET,gog,${BIZ.GAME_INTL}`,
`RULE-SET,supercell,${BIZ.GAME_INTL}`,
`RULE-SET,garena,${BIZ.GAME_INTL}`,
`RULE-SET,hoyoverse,${BIZ.GAME_INTL}`,
`RULE-SET,ubi,${BIZ.GAME_INTL}`,
`RULE-SET,wildrift,${BIZ.GAME_INTL}`,
`RULE-SET,sony,${BIZ.GAME_INTL}`,
// v5.1.9 CLEAN#1: googlesearch/googledrive/googleearth/google/google-ip + dl.google.com/
// play.googleapis.com/android.clients.google.com
// 已提升至防吞盾(FIX#14),dead rules 已清除
`RULE-SET,bing,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,yahoo.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,yahoo.co.jp,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,duckduckgo.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ddg.co,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,brave.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,yandex.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,yandex.ru,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,ecosia.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,startpage.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,you.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,search.naver.com,${BIZ.TOOLS}`,
// v5.1.2 FIX#3: 补充孤儿 provider 规则引用(v5.1.1 定义了 provider 但未注入 RULE-SET)
// v5.1.9 CLEAN#1: googledrive/googleearth 已提升至防吞盾,此处仅保留 scholar/yandex
`RULE-SET,scholar,${BIZ.TOOLS}`,
`RULE-SET,yandex,${BIZ.TOOLS}`,
`RULE-SET,github,${BIZ.TOOLS}`,
`RULE-SET,onedrive,${BIZ.MS}`,
`RULE-SET,microsoft,${BIZ.MS}`,
`RULE-SET,microsoftedge,${BIZ.MS}`,
// v5.1: Accademia 微软APP补充
`RULE-SET,acc-microsoftapps,${BIZ.MS}`,
`RULE-SET,applemusic,${BIZ.APPLE}`,
`RULE-SET,icloud,${BIZ.APPLE}`,
`RULE-SET,apple,${BIZ.APPLE}`,
`RULE-SET,appstore,${BIZ.APPLE}`,
`RULE-SET,appletv,${BIZ.APPLE}`,
`RULE-SET,applenews,${BIZ.APPLE}`,
`RULE-SET,appledev,${BIZ.APPLE}`,

`RULE-SET,appleproxy,${BIZ.APPLE}`,
`RULE-SET,siri,${BIZ.APPLE}`,
`RULE-SET,testflight,${BIZ.APPLE}`,
`RULE-SET,applefirmware,${BIZ.APPLE}`,
`RULE-SET,findmy,${BIZ.APPLE}`,
// v5.1: Accademia 苹果补充(AppleAI与AppleNews交叉规则,建议同节点)
`RULE-SET,acc-applenews,${BIZ.APPLE}`,
`RULE-SET,acc-apple,${BIZ.APPLE}`,
`RULE-SET,docker,${BIZ.TOOLS}`,
`RULE-SET,gitlab,${BIZ.TOOLS}`,
`GEOSITE,category-dev,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,npmjs.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,npmjs.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,yarnpkg.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,pypi.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,pythonhosted.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,crates.io,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,rubygems.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,packagist.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,maven.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,nuget.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,cocoapods.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,stackoverflow.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,stackexchange.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,sstatic.net,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,vercel.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,vercel.app,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,netlify.app,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,netlify.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,pages.dev,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,workers.dev,${BIZ.TOOLS}`,
// v5.2.0 FIX#16: cloudflare.com 收窄为开发者入口精确匹配
// 原 DOMAIN-SUFFIX 会吞掉 cdnjs.cloudflare.com 等 CDN 子域名,导致无法命中后续 RULE-SET,cloudflare
// → CLOUD_CDN
`DOMAIN,dash.cloudflare.com,${BIZ.TOOLS}`,
`DOMAIN,api.cloudflare.com,${BIZ.TOOLS}`,
`DOMAIN,developers.cloudflare.com,${BIZ.TOOLS}`,
`DOMAIN,www.cloudflare.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,heroku.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,herokuapp.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,fly.io,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,railway.app,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,render.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,supabase.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,supabase.co,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,planetscale.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,neon.tech,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,digitalocean.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,vultr.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,linode.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,sentry.io,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,datadog.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,grafana.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,postman.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,jetbrains.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,hashicorp.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,terraform.io,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,vagrantup.com,${BIZ.TOOLS}`,
`RULE-SET,developer,${BIZ.TOOLS}`,
`RULE-SET,python,${BIZ.TOOLS}`,
`RULE-SET,gitbook,${BIZ.TOOLS}`,
`RULE-SET,jfrog,${BIZ.TOOLS}`,
`RULE-SET,sublimetext,${BIZ.TOOLS}`,
`RULE-SET,wordpress,${BIZ.TOOLS}`,

`RULE-SET,wix,${BIZ.TOOLS}`,
`RULE-SET,cisco,${BIZ.TOOLS}`,
`RULE-SET,ibm,${BIZ.TOOLS}`,
`RULE-SET,oracle,${BIZ.TOOLS}`,
`RULE-SET,unity,${BIZ.TOOLS}`,
// v5.1: szkane Developer(Docker镜像/模型文件下载)
`RULE-SET,szkane-developer,${BIZ.TOOLS}`,
`RULE-SET,systemota,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,windowsupdate.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,update.microsoft.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,download.microsoft.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,delivery.mp.microsoft.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,dl.delivery.mp.microsoft.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,officecdn.microsoft.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,officecdn.microsoft.com.edgesuite.net,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,download.mozilla.org,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,archive.mozilla.org,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,releases.ubuntu.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,archive.ubuntu.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,security.ubuntu.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,mirrors.kernel.org,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,dl.fedoraproject.org,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,repo.anaconda.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,conda.anaconda.org,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,repo.continuum.io,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,sourceforge.net,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,fosshub.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,filehippo.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,softonic.com,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,gcr.io,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,ghcr.io,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,quay.io,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,registry.k8s.io,${BIZ.DOWNLOAD}`,
`RULE-SET,download,${BIZ.DOWNLOAD}`,
`RULE-SET,ubuntu,${BIZ.DOWNLOAD}`,
`RULE-SET,mozilla,${BIZ.DOWNLOAD}`,
`RULE-SET,apkpure,${BIZ.DOWNLOAD}`,
`RULE-SET,android,${BIZ.DOWNLOAD}`,
// v5.1.9 CLEAN#1: googlefcm 已提升至防吞盾(FIX#14),dead rule 已清除
`RULE-SET,intel,${BIZ.DOWNLOAD}`,
`RULE-SET,nvidia,${BIZ.DOWNLOAD}`,
`RULE-SET,dell,${BIZ.DOWNLOAD}`,
`RULE-SET,hp,${BIZ.DOWNLOAD}`,
`RULE-SET,canon,${BIZ.DOWNLOAD}`,
`RULE-SET,lg,${BIZ.DOWNLOAD}`,
// v5.1: Accademia MacApp升级规则(Homebrew/Sparkle源)
`RULE-SET,acc-macappupgrade,${BIZ.DOWNLOAD}`,
`RULE-SET,cloudflare-ip,${BIZ.INTL_SITE},no-resolve`,
`RULE-SET,cloudfront-ip,${BIZ.INTL_SITE},no-resolve`,
`RULE-SET,fastly-ip,${BIZ.INTL_SITE},no-resolve`,
`DOMAIN-SUFFIX,akamai.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,akamaized.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,akamaihd.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,akamaiedge.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,akamaitechnologies.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,edgekey.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,edgesuite.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,cloudfront.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,fastly.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,fastlylb.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,kxcdn.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,stackpathdns.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,stackpathcdn.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,b-cdn.net,${BIZ.INTL_SITE}`,

`DOMAIN-SUFFIX,bunny.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,bunnycdn.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,cdn77.org,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,azureedge.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,azurefd.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,msecnd.net,${BIZ.INTL_SITE}`,
// v5.2.1 FIX: jsdelivr 走受限网站组(中国用代理,海外可设直连),避免 rule-provider 刷新时 DNS 循环依
// 赖
`DOMAIN-SUFFIX,jsdelivr.net,${BIZ.GFW}`,
`DOMAIN-SUFFIX,unpkg.com,${BIZ.INTL_SITE}`,
// v5.2.10 FIX#39: 同 dns.google 改到 GFW 组(cloudflare-dns.com 在境内被封)
`DOMAIN-SUFFIX,cloudflare-dns.com,${BIZ.GFW}`,
`DOMAIN-SUFFIX,cloudflarestorage.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,r2.dev,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,ziffstatic.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,ucoz.ru,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,ucoz.net,${BIZ.INTL_SITE}`,
`RULE-SET,cloudflare,${BIZ.INTL_SITE}`,
`RULE-SET,akamai,${BIZ.INTL_SITE}`,
// v5.1.2 FIX#6: RULE-SET,dns 已删除(DNS自然分流,不锁死代理组)
`RULE-SET,digicert,${BIZ.INTL_SITE}`,
`RULE-SET,globalsign,${BIZ.INTL_SITE}`,
`RULE-SET,sectigo,${BIZ.INTL_SITE}`,
`RULE-SET,brightcove,${BIZ.INTL_SITE}`,
`RULE-SET,jwplayer,${BIZ.INTL_SITE}`,
// v5.1: Accademia CDN 补充
`RULE-SET,acc-fastly,${BIZ.INTL_SITE}`,
// v5.1.2 FIX#6: RULE-SET,acc-globaldns 已删除(DNS自然分流)
`DOMAIN-SUFFIX,letsencrypt.org,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,lencr.org,${BIZ.INTL_SITE}`,
// v18 FIX: 当前 GeoSite.dat 不包含 tracker 分类，保留下方手写 Tracker 域名规则兜底。
// `GEOSITE,tracker,${BIZ.TRACKER}`,
`DOMAIN-SUFFIX,tracker.opentrackr.org,${BIZ.TRACKER}`,
`DOMAIN-SUFFIX,open.stealth.si,${BIZ.TRACKER}`,
`DOMAIN-SUFFIX,tracker.torrent.eu.org,${BIZ.TRACKER}`,
`DOMAIN-SUFFIX,exodus.desync.com,${BIZ.TRACKER}`,
`DOMAIN-SUFFIX,tracker.openbittorrent.com,${BIZ.TRACKER}`,
`DOMAIN-SUFFIX,tracker.publicbt.com,${BIZ.TRACKER}`,
`DOMAIN-SUFFIX,tracker.dler.org,${BIZ.TRACKER}`,
`RULE-SET,privatetracker,${BIZ.TRACKER}`,
// v5.1: Accademia eMule服务器
`RULE-SET,acc-emuleserver,${BIZ.TRACKER}`,
// v5.1.5: 原「印尼本地」规则重分配 → 银行/证券归入金融支付
`DOMAIN-SUFFIX,bca.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,klikbca.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,bni.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,bri.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,bankmandiri.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,danamon.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,permatabank.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,cimbniaga.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,btn.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,ocbcnisp.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,banksinarmas.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,idx.co.id,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,ksei.co.id,${BIZ.PAYMENTS}`,
// v5.1.5: 原「印尼本地」规则重分配 → 电商/出行/外卖/电信/政府/新闻归入国外网站
`DOMAIN-SUFFIX,tokopedia.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,tokopedia.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,shopee.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,bukalapak.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,blibli.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,lazada.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,grab.com,${BIZ.INTL_SITE}`,

`DOMAIN-SUFFIX,gojek.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,gojek.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,traveloka.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,tiket.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,telkomsel.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,telkom.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,indosatooredoo.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,im3.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,xl.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,smartfren.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,tri.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,by.u.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,myrepublic.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,firstmedia.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,biznet.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,go.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,or.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,kompas.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,detik.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,tempo.co,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,cnnindonesia.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,cnbcindonesia.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,liputan6.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,tribunnews.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,kumparan.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,idntimes.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,gofood.co.id,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,grabfood.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,66tutup.com,${BIZ.INTL_SITE}`,
// v5.1.5: GEOIP,ID 归入国外网站(与 GEOIP,CN→国内网站 对称)
`GEOIP,ID,${BIZ.INTL_SITE},no-resolve`,
`DOMAIN-SUFFIX,163.com,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,126.com,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,126.net,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,jianguoyun.com,${BIZ.CN_SITE}`,
`RULE-SET,cn,${BIZ.CN_SITE}`,
`RULE-SET,cn-ip,${BIZ.CN_SITE},no-resolve`,
`DOMAIN-SUFFIX,alimama.com,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,zxtdjy.com,${BIZ.CN_SITE}`,
// v5.1.2 FIX#6: RULE-SET,acc-chinadns 已删除(中国DNS由CN兜底自然直连)
// v5.2.5 FIX#23-P1: acc-geositecn / acc-china 删除(与 metaDomain('cn','cn') 纯重复)
`RULE-SET,acc-chinamax,${BIZ.CN_SITE}`,
// v5.1.2 FIX#4: HomeIP × 2国 → INTL_SITE(v5.1.1 误归入 CN_SITE 导致美日IP段走直连)
`RULE-SET,acc-homeip-us,${BIZ.INTL_SITE}`,
`RULE-SET,acc-homeip-jp,${BIZ.INTL_SITE}`,
// v5.1.2 FIX#5: Aqara 国内 → CN_SITE,国际 → INTL_SITE(v5.1.1 Global 误归入 CN_SITE)
`RULE-SET,acc-aqara-cn,${BIZ.CN_SITE}`,
`RULE-SET,acc-aqara-global,${BIZ.INTL_SITE}`,
// v5.1.4: 受限网站(GFW 封锁域名兜底,位于 INTL_SITE 之前)═══
// 语义区分:GFW 组 = 确认被中国 GFW 封锁的域名 / INTL_SITE = 普通国外域名
// 在中国:GFW 组手动选代理节点,INTL_SITE 保持默认可探测直连
// 在印尼:GFW 组选 DIRECT(被墙站点在印尼可直连),INTL_SITE 也选 DIRECT
// routefix.3: 避免未配置 GeoX 时 GEOSITE 规则导致配置应用失败，GFW 交给 RULE-SET + MATCH 兜底
`RULE-SET,loyalsoldier-gfw,${BIZ.GFW}`,
`RULE-SET,loyalsoldier-greatfire,${BIZ.GFW}`,
`RULE-SET,szkane-proxygfw,${BIZ.GFW}`,
`RULE-SET,cnn,${BIZ.INTL_SITE}`,
`RULE-SET,nytimes,${BIZ.INTL_SITE}`,
`RULE-SET,bloomberg,${BIZ.INTL_SITE}`,
`RULE-SET,ebay,${BIZ.INTL_SITE}`,
`RULE-SET,nike,${BIZ.INTL_SITE}`,

`RULE-SET,adobe,${BIZ.INTL_SITE}`,
`RULE-SET,samsung,${BIZ.INTL_SITE}`,
`RULE-SET,tesla,${BIZ.INTL_SITE}`,
`RULE-SET,dropbox,${BIZ.INTL_SITE}`,
`RULE-SET,mega,${BIZ.INTL_SITE}`,
`RULE-SET,wikipedia,${BIZ.INTL_SITE}`,
`RULE-SET,duolingo,${BIZ.INTL_SITE}`,
`RULE-SET,proxy,${BIZ.INTL_SITE}`,
// v5.1.4: szkane-proxygfw 已移至「 受限网站」GFW 组(见上方)
// v5.1: Accademia 国外网站补充
`RULE-SET,acc-waybackmachine,${BIZ.INTL_SITE}`,
`RULE-SET,acc-pornhub,${BIZ.INTL_SITE}`,
// v5.1: szkane Education
`RULE-SET,szkane-khan,${BIZ.INTL_SITE}`,
`RULE-SET,szkane-edutools,${BIZ.INTL_SITE}`,
// v5.1.2 FIX#3: naver 宽域名兜底(子域名已精准分流到日韩流媒体/搜索引擎)
`RULE-SET,naver,${BIZ.INTL_SITE}`,
// v5.1.3 FIX#9: ehgallery 移入国外网站(非流媒体服务,全球节点更灵活)
`RULE-SET,ehgallery,${BIZ.INTL_SITE}`,
// v5.1.2 FIX#1: GeoRouting Domain × 16国外 + 1中国(Asia_China → CN_SITE)
// ...GEO_REGIONS_INTL.map(r => `RULE-SET,acc-geo-d-${r.toLowerCase().replace(/_/g,'-')},
// ${BIZ.INTL_SITE}`),
// ...GEO_REGIONS_INTL.map(r => `RULE-SET,acc-geo-ip-${r.toLowerCase().replace(/_/g,'-')},
// ${BIZ.INTL_SITE},no-resolve`),
`RULE-SET,acc-geo-d-asia-china,${BIZ.CN_SITE}`,
`RULE-SET,acc-geo-ip-asia-china,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,archive.org,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,udemy.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,udemycdn.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,grammarly.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,grammarly.io,${BIZ.INTL_SITE}`,
// v5.1.6 P0-FIX#7: jetbrains.com 已在 DEV 组覆盖(line ~1796),此处为死规则,已删除
`DOMAIN-SUFFIX,jetbrains.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,theguardian.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,guardianapis.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,box.com,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,boxcdn.net,${BIZ.INTL_SITE}`,
`DOMAIN-SUFFIX,noip.com,${BIZ.INTL_SITE}`,
// 211⁄2 v5.1: Loyalsoldier GEOIP 精准标签路由(需 Loyalsoldier 加强版 MMDB)
`GEOIP,cloudflare,${BIZ.INTL_SITE},no-resolve`,
`GEOIP,telegram,${BIZ.IM},no-resolve`,
`GEOIP,netflix,${BIZ.NFLX},no-resolve`,
`GEOIP,facebook,${BIZ.SOCIAL},no-resolve`,
`GEOIP,twitter,${BIZ.SOCIAL},no-resolve`,
`GEOIP,google,${BIZ.TOOLS},no-resolve`,
// 22 GEOIP CN
`GEOIP,CN,${BIZ.CN_SITE},no-resolve`,
`MATCH,${BIZ.FINAL}`,


]
// FlClash: 原地写入(splice 清空 + 逐个 push),不能在 QuickJS FFI 桥接层直接重赋值
config.rules.splice(0, config.rules.length)
for (var _ri = 0; _ri < _newRules.length; _ri++) { config.rules.push(_newRules[_ri]) }
log(`[${VERSION}] Injected ${config.rules.length} rules`)
}

// ================================================================
// 模块 H2:Wuzhenshi Fusion 实战补丁
// ================================================================
const FUSION_ROUTER_IP = '192.168.31.1'
const FUSION_CN_DNS = ['https://dns.alidns.com/dns-query', 'https://doh.pub/dns-query']
const FUSION_FOREIGN_DNS = ['https://dns.google/dns-query', 'https://1.1.1.1/dns-query']

function _fusionMergeUniqueArray(base, extra) {
if (!Array.isArray(base)) base = []
for (var i = 0; i < extra.length; i++) {
var item = extra[i]
if (item && base.indexOf(item) === -1) base.push(item)
}
return base
}

function _fusionPrependUniqueRules(config, rules) {
if (!Array.isArray(config.rules)) config.rules = []
for (var i = rules.length - 1; i >= 0; i--) {
var rule = rules[i]
if (rule && config.rules.indexOf(rule) === -1) config.rules.splice(0, 0, rule)
}
}

// ================================================================
// 模块 H1+: 小米系统服务强保护补丁(v17)
// 说明：这些规则必须最终前置到 rules 顶部，避免被广告/隐私/MIUIPrivacy 规则误杀。
// 覆盖：小米云服务、查找手机、主题商店、小米账号、XMSF 推送、定位/安全中心、相册云同步等。
// ================================================================
function injectXiaomiSystemFix(config) {
var rules = [
// 小米系统核心进程：优先直连，避免查找手机/云服务/主题/定位被代理或拦截
'PROCESS-NAME,com.xiaomi.xmsf,DIRECT',
'PROCESS-NAME,com.miui.cloudservice,DIRECT',
'PROCESS-NAME,com.miui.cloudbackup,DIRECT',
'PROCESS-NAME,com.miui.micloudsync,DIRECT',
'PROCESS-NAME,com.xiaomi.finddevice,DIRECT',
'PROCESS-NAME,com.android.thememanager,DIRECT',
'PROCESS-NAME,com.miui.securitycenter,DIRECT',
'PROCESS-NAME,com.xiaomi.account,DIRECT',
'PROCESS-NAME,com.xiaomi.market,DIRECT',
'PROCESS-NAME,com.miui.gallery,DIRECT',
'PROCESS-NAME,com.miui.yellowpage,DIRECT',
'PROCESS-NAME,com.miui.weather2,DIRECT',
'PROCESS-NAME,com.lbe.security.miui,DIRECT',

// 小米云 / 账号 / 查找手机 / 主题 / 系统服务域名
'DOMAIN-SUFFIX,mi.com,DIRECT',
'DOMAIN-SUFFIX,xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,xiaomi.cn,DIRECT',
'DOMAIN-SUFFIX,miui.com,DIRECT',
'DOMAIN-SUFFIX,micloud.xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,i.mi.com,DIRECT',
'DOMAIN-SUFFIX,account.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,api.account.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,find.api.micloud.xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,location.api.micloud.xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,api.micloud.xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,market.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,global.market.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,themes.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,theme.market.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,zhuti.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,api.zhuti.xiaomi.com,DIRECT',
'DOMAIN-SUFFIX,msg.xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,resolver.msg.xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,api.io.mi.com,DIRECT',
'DOMAIN-SUFFIX,device.xiaomi.net,DIRECT',
'DOMAIN-SUFFIX,api.device.xiaomi.net,DIRECT'
]
_fusionPrependUniqueRules(config, rules)

// DNS / fake-ip：小米系统服务不要 fake-ip，避免主题/云/查找手机拿到虚拟地址后抽风
if (!config.hosts || typeof config.hosts !== 'object') config.hosts = {}
Object.assign(config.hosts, {
'miwifi.com': [FUSION_ROUTER_IP],
'router.miwifi.com': [FUSION_ROUTER_IP],
'api.miwifi.com': [FUSION_ROUTER_IP]
})

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
config.dns['fake-ip-filter'] = _fusionMergeUniqueArray(config.dns['fake-ip-filter'], [
'*.mi.com', '*.xiaomi.com', '*.xiaomi.net', '*.xiaomi.cn', '*.miui.com', '*.micloud.xiaomi.net',
'i.mi.com', '*.i.mi.com', 'account.xiaomi.com', '*.account.xiaomi.com', 'api.account.xiaomi.com',
'find.api.micloud.xiaomi.net', 'location.api.micloud.xiaomi.net', 'api.micloud.xiaomi.net',
'market.xiaomi.com', '*.market.xiaomi.com', 'global.market.xiaomi.com',
'themes.xiaomi.com', '*.themes.xiaomi.com', 'theme.market.xiaomi.com', 'zhuti.xiaomi.com', '*.zhuti.xiaomi.com', 'api.zhuti.xiaomi.com',
'*.msg.xiaomi.net', 'resolver.msg.xiaomi.net', 'api.io.mi.com', '*.device.xiaomi.net', 'api.device.xiaomi.net'
])
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
Object.assign(config.dns['nameserver-policy'], {
'+.mi.com': '119.29.29.29',
'+.xiaomi.com': '119.29.29.29',
'+.xiaomi.net': '119.29.29.29',
'+.xiaomi.cn': '119.29.29.29',
'+.miui.com': '119.29.29.29',
'+.micloud.xiaomi.net': '119.29.29.29',
'i.mi.com': '119.29.29.29',
'+.i.mi.com': '119.29.29.29',
'account.xiaomi.com': '119.29.29.29',
'+.account.xiaomi.com': '119.29.29.29',
'api.account.xiaomi.com': '119.29.29.29',
'find.api.micloud.xiaomi.net': '119.29.29.29',
'location.api.micloud.xiaomi.net': '119.29.29.29',
'api.micloud.xiaomi.net': '119.29.29.29',
'market.xiaomi.com': '119.29.29.29',
'+.market.xiaomi.com': '119.29.29.29',
'global.market.xiaomi.com': '119.29.29.29',
'+.themes.xiaomi.com': '119.29.29.29',
'theme.market.xiaomi.com': '119.29.29.29',
'+.zhuti.xiaomi.com': '119.29.29.29',
'api.zhuti.xiaomi.com': '119.29.29.29',
'+.msg.xiaomi.net': '119.29.29.29',
'resolver.msg.xiaomi.net': '119.29.29.29',
'api.io.mi.com': '119.29.29.29',
'+.device.xiaomi.net': '119.29.29.29',
'api.device.xiaomi.net': '119.29.29.29'
})

// Sniffer：小米系统服务跳过嗅探，减少 TUN/fake-ip 下误嗅探与日志噪音
if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['skip-domain'] = _fusionMergeUniqueArray(config.sniffer['skip-domain'], [
'+.mi.com', '+.xiaomi.com', '+.xiaomi.net', '+.xiaomi.cn', '+.miui.com', '+.micloud.xiaomi.net',
'i.mi.com', '+.i.mi.com', 'account.xiaomi.com', '+.account.xiaomi.com', 'api.account.xiaomi.com',
'find.api.micloud.xiaomi.net', 'location.api.micloud.xiaomi.net', 'api.micloud.xiaomi.net',
'market.xiaomi.com', '+.market.xiaomi.com', 'global.market.xiaomi.com',
'+.themes.xiaomi.com', 'theme.market.xiaomi.com', '+.zhuti.xiaomi.com', 'api.zhuti.xiaomi.com',
'+.msg.xiaomi.net', 'resolver.msg.xiaomi.net', 'api.io.mi.com', '+.device.xiaomi.net', 'api.device.xiaomi.net'
])
log(`[${VERSION}] Xiaomi system fix injected: rules=${rules.length}, total=${config.rules.length}`)
}

function injectFusionRules(config) {
var rules = [
// 小米路由 / 局域网入口保护：防止 TUN / fake-ip 场景下路由器后台被代理吞掉
'DOMAIN-SUFFIX,miwifi.com,DIRECT',
'DOMAIN,router.miwifi.com,DIRECT',
'DOMAIN,api.miwifi.com,DIRECT',
'IP-CIDR,192.168.31.1/32,DIRECT,no-resolve',

// Android 进程级分流：比单纯域名规则更适合移动端 App
`PROCESS-NAME,com.google.android.apps.translate,${BIZ.TOOLS}`,
`PROCESS-NAME,com.android.vending,${BIZ.DOWNLOAD}`,
`PROCESS-NAME,com.google.android.gms,${BIZ.TOOLS}`,
`PROCESS-NAME,com.google.android.apps.maps,${BIZ.TOOLS}`,

`PROCESS-NAME,org.telegram.messenger,${BIZ.IM}`,
`PROCESS-NAME,org.telegram.messenger.web,${BIZ.IM}`,
`PROCESS-NAME,nu.gpu.nagram,${BIZ.IM}`,
`PROCESS-NAME,tw.nekomimi.nekogram,${BIZ.IM}`,

`PROCESS-NAME,com.spotify.music,${BIZ.MUSIC}`,

// Google Translate 精准域名：避免被 AI / Google 宽规则吞错组
`DOMAIN,translate.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN,translate.google.com,${BIZ.TOOLS}`,
`DOMAIN,translate.google.cn,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,translate.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN-KEYWORD,translate,${BIZ.TOOLS}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] Fusion rules injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3:Android App 进程级精细分流补丁(v10)
// 说明:这些规则会被插入到 rules 最前面,优先级高于 DOMAIN/RULE-SET。
// 作用:移动端 App 先按包名命中,再由规则库兜底,避免重点 App 被宽泛规则吞错组。
// ================================================================
function injectAppProcessPatch(config) {
var rules = [
// 小米 /  telemetry 噪音控制
'PROCESS-NAME,com.xiaomi.gamecenter.sdk.service,REJECT-DROP',

// Google / Android 生态
`PROCESS-NAME,com.android.vending,${BIZ.DOWNLOAD}`,
`PROCESS-NAME,com.google.android.gms,${BIZ.TOOLS}`,
`PROCESS-NAME,com.google.android.gsf,${BIZ.TOOLS}`,
`PROCESS-NAME,com.google.android.apps.maps,${BIZ.TOOLS}`,
`PROCESS-NAME,com.google.android.apps.translate,${BIZ.TOOLS}`,
`PROCESS-NAME,com.google.android.youtube,${BIZ.YT}`,
`PROCESS-NAME,app.morphe.android.youtube,${BIZ.YT}`,
`PROCESS-NAME,com.google.android.apps.youtube.music,${BIZ.MUSIC}`,

// AI / 搜索类 App
`PROCESS-NAME,com.openai.chatgpt,${BIZ.AI}`,
`PROCESS-NAME,com.google.android.apps.bard,${BIZ.AI}`,
`PROCESS-NAME,ai.perplexity.app.android,${BIZ.AI}`,

// Telegram 系客户端
`PROCESS-NAME,org.telegram.messenger,${BIZ.IM}`,
`PROCESS-NAME,org.telegram.messenger.web,${BIZ.IM}`,
`PROCESS-NAME,org.thunderdog.challegram,${BIZ.IM}`,
`PROCESS-NAME,nu.gpu.nagram,${BIZ.IM}`,
`PROCESS-NAME,tw.nekomimi.nekogram,${BIZ.IM}`,

// 即时通讯 / 社交
`PROCESS-NAME,com.discord,${BIZ.IM}`,
`PROCESS-NAME,com.twitter.android,${BIZ.SOCIAL}`,
`PROCESS-NAME,com.reddit.frontpage,${BIZ.SOCIAL}`,
`PROCESS-NAME,com.instagram.android,${BIZ.SOCIAL}`,
`PROCESS-NAME,com.facebook.katana,${BIZ.SOCIAL}`,
`PROCESS-NAME,com.facebook.orca,${BIZ.SOCIAL}`,

// TikTok 系客户端：走独立 TikTok 组，避免被社交媒体/普通国外网站/AI/Google 规则误吞
`PROCESS-NAME,com.zhiliaoapp.musically,${BIZ.TIKTOK}`,
`PROCESS-NAME,com.zhiliaoapp.musically.go,${BIZ.TIKTOK}`,
`PROCESS-NAME,com.ss.android.ugc.trill,${BIZ.TIKTOK}`,
`PROCESS-NAME,com.rezvorck.tiktokplugin,${BIZ.TIKTOK}`,
`PROCESS-NAME-REGEX,(?i).*tiktok.*,${BIZ.TIKTOK}`,
`PROCESS-NAME-REGEX,(?i).*musically.*,${BIZ.TIKTOK}`,
`PROCESS-NAME-REGEX,(?i).*trill.*,${BIZ.TIKTOK}`,

// 流媒体 / 音乐
`PROCESS-NAME,com.spotify.music,${BIZ.MUSIC}`,
`PROCESS-NAME,com.netflix.mediaclient,${BIZ.NFLX}`,
`PROCESS-NAME,com.disney.disneyplus,${BIZ.DSNP}`,
`PROCESS-NAME,com.amazon.avod.thirdpartyclient,${BIZ.PRIME}`,
`PROCESS-NAME,com.hulu.plus,${BIZ.HULU}`,
`PROCESS-NAME,com.hbo.hbonow,${BIZ.HBO}`,
`PROCESS-NAME,com.hbo.max,${BIZ.HBO}`,

// 游戏 / 平台客户端
`PROCESS-NAME,com.valvesoftware.android.steam.community,${BIZ.GAME_INTL}`,
`PROCESS-NAME,com.microsoft.xboxone.smartglass,${BIZ.GAME_INTL}`,

// 国内输入法 / 国内服务直连
'PROCESS-NAME,com.iflytek.inputmethod,DIRECT'
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] App process rules injected: ${rules.length} candidates, total=${config.rules.length}`)
}




// ================================================================
// 模块 H3.3: VidHub 全域归位补强补丁(v34 - 巨无霸6号镜像规则)
// 说明：此模块按“巨无霸6号-v1-VidHub全域补强版”保持一致，只把该版本确认的 VidHub 策略组、域名与关键 IP 移植到 V 系列。
// 不动 DNS、TUN、sniffer、Google Play、小米系统修复、TikTok/CiciAI 与 rule-providers 主体。
// ================================================================
function injectVidHubUnifiedPatch(config) {
if (!Array.isArray(config['proxy-groups'])) config['proxy-groups'] = []
if (!Array.isArray(config.rules)) config.rules = []
var standardProxies = buildStandardProxies()
var activeNames = new Set(config['proxy-groups'].filter(function(g) { return g && g.name }).map(function(g) { return g.name }))
activeNames.add('DIRECT'); activeNames.add('REJECT')
standardProxies = standardProxies.filter(function(p) { return activeNames.has(p) })
if (standardProxies.length === 0) standardProxies = [FUSION_AUTO.SELECT, 'DIRECT']
var group = { name: BIZ.VIDHUB, type: 'select', icon: iconForGroupName(BIZ.VIDHUB), proxies: standardProxies.slice() }
_upsertProxyGroup(config, group)
var patchRules = [
`PROCESS-NAME,com.oumi.utility.media.hub,${BIZ.VIDHUB}`,

// VidHub 播放/源站核心域名：必须高优先级归位，防止被欧洲流媒体 / 漏网之鱼 / 国内网站规则抢走
`DOMAIN,stream.onyra.uk,${BIZ.VIDHUB}`,
`DOMAIN,bps8m.onyra.cc,${BIZ.VIDHUB}`,
`DOMAIN-SUFFIX,onyra.uk,${BIZ.VIDHUB}`,
`DOMAIN-SUFFIX,onyra.cc,${BIZ.VIDHUB}`,

// VidHub App API / 图片 / 元数据域名：日志里已确认由 com.oumi.utility.media.hub 访问
`DOMAIN,vh.api.okaapps.com,${BIZ.VIDHUB}`,
`DOMAIN,vh.image.okaapps.com,${BIZ.VIDHUB}`,
`DOMAIN,vh.image1.okaapps.com,${BIZ.VIDHUB}`,
`DOMAIN-SUFFIX,okaapps.com,${BIZ.VIDHUB}`,
`DOMAIN,api.7littlemen.com,${BIZ.VIDHUB}`,
`DOMAIN,image.tmdb.org,${BIZ.VIDHUB}`,
`DOMAIN,www.premiumize.me,${BIZ.VIDHUB}`,
`DOMAIN-SUFFIX,premiumize.me,${BIZ.VIDHUB}`,

// 注意：不全局接管 223.5.5.5，避免把系统/其他 App 的阿里 DNS 也误拉进 VidHub
// 121.43.145.95 是日志中 VidHub 直连 IP 访问，加入兜底；若未来确认影响其他 App，可删除这一条
`IP-CIDR,121.43.145.95/32,${BIZ.VIDHUB},no-resolve`,
]
var exists = new Set(config.rules)
for (var i = patchRules.length - 1; i >= 0; i--) {
var r = patchRules[i]
if (!exists.has(r)) config.rules.unshift(r)
}
log(`[${VERSION}] VidHub patch injected: ${BIZ.VIDHUB}`)
}


// ================================================================
// 模块 H3.4: Neverless 金融支付误杀修复补丁(v38 verified)
// 说明：Neverless（money.boku.android）访问 neverless.com 时可能被 hagezi-tif / anti-ad / sukka-phishing 等广告、钓鱼、威胁规则误杀。
// 本补丁只前置 Neverless 进程和 neverless.com 到 💳 金融支付，不全局放行 graph.facebook.com / appsflyersdk.com，避免污染其他 App。
// ================================================================
function injectNeverlessFinancialFix(config) {
var rules = [
`PROCESS-NAME,money.boku.android,${BIZ.PAYMENTS}`,
`DOMAIN,neverless.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,neverless.com,${BIZ.PAYMENTS}`,
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] Neverless verified financial fix injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.4.1: Telegram 内置翻译加速补丁(v40，源自巨无霸8号-v1)
// 域名规则必须位于 Telegram 进程规则之前，才能让翻译链路独立进入 🛠️ 工具与服务。
// ================================================================
function injectTelegramTranslateBoostPatch(config) {
var rules = [
`DOMAIN,www.google.com,${BIZ.TOOLS}`,
`DOMAIN,translate.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,translate.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN,translation.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,translation.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN,translate-pa.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,translate-pa.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN,translate.google.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,translate.google.com,${BIZ.TOOLS}`,
`DOMAIN,translate.google.cn,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,translate.google.cn,${BIZ.TOOLS}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] Telegram translate boost injected: ${rules.length} candidates, total=${config.rules.length}`)
}

// ================================================================
// 模块 H3.4.2: DeepL 翻译专项优化补丁(v40，源自巨无霸8号-v2)
// 复用现有 🛠️ 工具与服务，不增加策略组和 rule-provider。
// ================================================================
function injectDeepLTranslateBoostPatch(config) {
var rules = [
`PROCESS-NAME,com.deepl.mobiletranslator,${BIZ.TOOLS}`,
`DOMAIN,www.deepl.com,${BIZ.TOOLS}`,
`DOMAIN,api.deepl.com,${BIZ.TOOLS}`,
`DOMAIN,www2.deepl.com,${BIZ.TOOLS}`,
`DOMAIN,dict.deepl.com,${BIZ.TOOLS}`,
`DOMAIN,static.deepl.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,deepl.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,deeplpro.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,deeplusercontent.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,linguee.com,${BIZ.TOOLS}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] DeepL translate boost injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.4.3: iFAST GB 金融登录修复补丁(v39)
// 来源：巨无霸9号-v1-iFASTGB金融登录修复版核心修复逻辑。
// 说明：iFAST GB（com.ifast.gb）登录链路可能被 🌍 国外网站 / 🐟 漏网之鱼 / hagezi-tif / anti-ad / cloudfront-ip / proxy 等通用规则抢走。
// 本补丁只前置 iFAST GB 进程、iFAST GB 主域名、Fundsupermart 账号链路和 Zimperium 安全检测域名到 💳 金融支付。
// 不全局放行 graph.facebook.com / ytimg.com / msftncsi.com，避免污染其他 App。
// ================================================================
function injectIFastGBFinancialLoginFix(config) {
var rules = [
`PROCESS-NAME,com.ifast.gb,${BIZ.PAYMENTS}`,

// iFAST GB 主登录/静态资源/通信接口：避免继续被国外网站、泛 CDN/IP 或广告/威胁规则抢走
`DOMAIN,www.ifastgb.com,${BIZ.PAYMENTS}`,
`DOMAIN,ifastgb.com,${BIZ.PAYMENTS}`,
`DOMAIN,static.ifastgb.com,${BIZ.PAYMENTS}`,
`DOMAIN,communication-app.ifastgb.com,${BIZ.PAYMENTS}`,
`DOMAIN,sentry.ifastgb.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,ifastgb.com,${BIZ.PAYMENTS}`,

// iFAST / Fundsupermart 账号与安全链路：日志确认 secure.fundsupermart.com、stest.zimperium.com 参与访问
`DOMAIN,secure.fundsupermart.com,${BIZ.PAYMENTS}`,
`DOMAIN-SUFFIX,fundsupermart.com,${BIZ.PAYMENTS}`,
`DOMAIN,stest.zimperium.com,${BIZ.PAYMENTS}`,
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] iFAST GB financial login fix injected: ${rules.length} candidates, total=${config.rules.length}`)
}

// ================================================================
// 模块 H3.4.4: NoOnes Google 登录修复补丁(v40，源自巨无霸10号)
// NoOnes 主体进入 ₿ 加密货币；Google OAuth/Firebase 登录必要链路进入 🛒 Google Play。
// ================================================================
function injectNoOnesGoogleLoginPatch(config) {
var rules = [
`PROCESS-NAME,team.noones.mobilemessenger,${BIZ.CRYPTO}`,
`DOMAIN,noones.com,${BIZ.CRYPTO}`,
`DOMAIN,www.noones.com,${BIZ.CRYPTO}`,
`DOMAIN,api.noones.com,${BIZ.CRYPTO}`,
`DOMAIN,auth.noones.com,${BIZ.CRYPTO}`,
`DOMAIN,static.noones.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,noones.com,${BIZ.CRYPTO}`,
`DOMAIN,sentry.noones.com,${BIZ.CRYPTO}`,
`DOMAIN,noonessupport.zendesk.com,${BIZ.CRYPTO}`,
`DOMAIN,accounts.google.com,${BIZ.GPLAY}`,
`DOMAIN,oauth2.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,oauth2.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,openidconnect.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,www.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,apis.google.com,${BIZ.GPLAY}`,
`DOMAIN,people.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,people-pa.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,android.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,identitytoolkit.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,securetoken.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,firebaseinstallations.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,firebaseappcheck.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,firebaselogging.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,ssl.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN,www.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN,accounts.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN,fonts.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,recaptcha.net,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,recaptcha-cn.net,${BIZ.GPLAY}`,
`DOMAIN,www.googletagmanager.com,${BIZ.CRYPTO}`,
`DOMAIN,graph.facebook.com,${BIZ.SOCIAL}`,
`DOMAIN,connect.facebook.net,${BIZ.SOCIAL}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] NoOnes Google login patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}

// ================================================================
// 模块 H3.4.5: NoOnes Google LAMS 二次修复(v40，源自巨无霸11号)
// ================================================================
function injectNoOnesGoogleLoginSecondPatch(config) {
var rules = [
`DOMAIN,lamssettings-pa.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,lamssettings.googleapis.com,${BIZ.GPLAY}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] NoOnes Google login second patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.5: TikTok 独立归组 / CiciAI 隔离补丁(v40，源自巨无霸12号主干)
// TikTok 主体统一进入独立策略组；CiciAI/Coze 仅以进程规则进入 AI，避免字节系规则相互污染。
// 保留 log/mon 遥测拦截，不改 DNS、TUN、sniffer、Google Play、小米系统修复与节点 UI。
// ================================================================
function injectTikTokCiciAiIsolationPatch(config) {
var rules = [
// CiciAI / Coze：优先用进程规则进 AI，避免依赖过宽的字节系域名规则集
`PROCESS-NAME,com.larus.nova,${BIZ.AI}`,
`PROCESS-NAME,ai.cici.android,${BIZ.AI}`,
`PROCESS-NAME,com.ciciai.app,${BIZ.AI}`,
`PROCESS-NAME,com.coze.android,${BIZ.AI}`,
`PROCESS-NAME,ai.coze.app,${BIZ.AI}`,
`PROCESS-NAME-REGEX,(?i).*(ciciai|cici|coze|larus).*,${BIZ.AI}`,

// TikTok App：明确归入独立 TikTok 组，避免被社交媒体 / AI / 国外网站 / 工具组误吞
`PROCESS-NAME,com.zhiliaoapp.musically,${BIZ.TIKTOK}`,
`PROCESS-NAME,com.zhiliaoapp.musically.go,${BIZ.TIKTOK}`,
`PROCESS-NAME,com.ss.android.ugc.trill,${BIZ.TIKTOK}`,
`PROCESS-NAME,com.rezvorck.tiktokplugin,${BIZ.TIKTOK}`,
`PROCESS-NAME-REGEX,(?i).*tiktok.*,${BIZ.TIKTOK}`,
`PROCESS-NAME-REGEX,(?i).*musically.*,${BIZ.TIKTOK}`,
`PROCESS-NAME-REGEX,(?i).*trill.*,${BIZ.TIKTOK}`,

// TikTok 日志/监控：继续留在广告拦截，不放行 log / mon 遥测
`DOMAIN-REGEX,^(log|mon)[0-9A-Za-z.-]*\\.tiktokv\\.com$,${BIZ.AD}`,

// TikTok 主站、API、CDN 与字节海外资源
`DOMAIN-SUFFIX,tiktok.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokv.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokcdn.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokcdn-us.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokcdn-eu.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktok-row.org,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,musical.ly,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,muscdn.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,ttwstatic.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,ttwebview.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,byteoversea.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,bytefcdn-oversea.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,ibytedtos.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,ibyteimg.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,byteintlapi.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,bytegecko-i18n.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,ipstatp.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,isnssdk.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,sgpstatp.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,snssdk.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tik-tokapi.com,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokd.net,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokd.org,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokmusic.app,${BIZ.TIKTOK}`,
`DOMAIN-SUFFIX,tiktokv.us,${BIZ.TIKTOK}`,
`DOMAIN,p16-tiktokcdn-com.akamaized.net,${BIZ.TIKTOK}`,

// Live / 实时连接 / SDK 常见链路
`DOMAIN,frontier.tiktokv.com,${BIZ.TIKTOK}`,
`DOMAIN-KEYWORD,webcast-frontier,${BIZ.TIKTOK}`,
`DOMAIN-KEYWORD,mssdk,${BIZ.TIKTOK}`,
`DOMAIN-KEYWORD,tiktokcdn,${BIZ.TIKTOK}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] TikTok dedicated routing/CiciAI isolation patch injected: ${rules.length} candidates, TikTok -> ${BIZ.TIKTOK}, total=${config.rules.length}`)
}

// ================================================================
// 模块 H3.6: TikTok 局域网代理 / 修改版依赖兼容补丁(v40，源自巨无霸13号)
// 局域网设备没有 PROCESS-NAME 元数据，只精准补齐日志确认被误杀的依赖；不放行遥测与归因域名。
// ================================================================
function injectTikTokLanProxyCompatibilityPatch(config) {
var rules = [
`DOMAIN-SUFFIX,tiktokmod.pro,${BIZ.TIKTOK}`,
`DOMAIN,update.9mod.com,${BIZ.TIKTOK}`,
`DOMAIN,rezvorck.github.io,${BIZ.TIKTOK}`,
`DOMAIN,vcs.zijieapi.com,${BIZ.TIKTOK}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] TikTok LAN proxy/mod compatibility patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}

// ================================================================
// 模块 H3.6.1: TikTok 修改版播放稳定补丁(v43)
// 日志依据：TikTok.Mod.Jaggu 的 log/mon 遥测命中可切换广告组；当广告组为 DIRECT 时，
// 污染 IPv4/IPv6 会持续超时/拒绝，形成连接风暴并拖慢视频线程。
// ================================================================
function injectTikTokPlaybackStabilityFix(config) {
if (!Array.isArray(config.rules)) config.rules = []

// 清理 V40-V42 旧的“遥测 -> 可切换广告组”规则，避免广告组被设为 DIRECT 后真的发起连接。
var legacyTelemetryRule = `DOMAIN-REGEX,^(log|mon)[0-9A-Za-z.-]*\\.tiktokv\\.com$,${BIZ.AD}`
for (var i = config.rules.length - 1; i >= 0; i--) {
if (config.rules[i] === legacyTelemetryRule) config.rules.splice(i, 1)
}

var rules = [
// log/mon 遥测必须先于进程规则匹配，否则 TikTok.Mod.Jaggu 整包规则会抢先放行。
'DOMAIN-REGEX,^(log|mon)[0-9A-Za-z.-]*\\.tiktokv\\.com$,REJECT',

// 日志显示的修改版进程名；除遥测外，其余请求整包走同一个 TikTok 出口。
`PROCESS-NAME,TikTok.Mod.Jaggu,${BIZ.TIKTOK}`,
`PROCESS-NAME-REGEX,(?i)^TikTok\\.Mod\\.Jaggu(?::.*)?$,${BIZ.TIKTOK}`
]
_fusionPrependUniqueRules(config, rules)

// TikTok 核心域名强制使用海外 DoH，降低国内 DNS 污染与异常 IPv4/IPv6 回答。
if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
Object.assign(config.dns['nameserver-policy'], {
'+.tiktok.com': 'https://dns.google/dns-query',
'+.tiktokv.com': 'https://dns.google/dns-query',
'+.tiktokcdn.com': 'https://dns.google/dns-query',
'+.tiktokcdn-us.com': 'https://dns.google/dns-query',
'+.tiktokcdn-eu.com': 'https://dns.google/dns-query',
'+.musical.ly': 'https://dns.google/dns-query',
'+.ibyteimg.com': 'https://dns.google/dns-query',
'+.ibytedtos.com': 'https://dns.google/dns-query',
'+.byteoversea.com': 'https://dns.google/dns-query',
'+.bytefcdn-oversea.com': 'https://dns.google/dns-query'
})
if (!config.dns['fallback-filter'] || typeof config.dns['fallback-filter'] !== 'object') config.dns['fallback-filter'] = { geoip: true, 'geoip-code': 'CN' }
config.dns['fallback-filter'].domain = _fusionMergeUniqueArray(config.dns['fallback-filter'].domain, [
'+.tiktok.com', '+.tiktokv.com', '+.tiktokcdn.com', '+.tiktokcdn-us.com', '+.tiktokcdn-eu.com',
'+.musical.ly', '+.ibyteimg.com', '+.ibytedtos.com', '+.byteoversea.com', '+.bytefcdn-oversea.com'
])

// 强制保留 TikTok 域名/SNI，避免 CDN 连接只剩异常 IP 后落入泛 IP 规则。
if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['force-domain'] = _fusionMergeUniqueArray(config.sniffer['force-domain'], [
'+.tiktok.com', '+.tiktokv.com', '+.tiktokcdn.com', '+.tiktokcdn-us.com', '+.tiktokcdn-eu.com',
'+.musical.ly', '+.ibyteimg.com', '+.ibytedtos.com', '+.byteoversea.com', '+.bytefcdn-oversea.com'
])

log(`[${VERSION}] TikTok playback stability fix injected: ${rules.length} rules, DNS policy hardened, total=${config.rules.length}`)
}

// ================================================================
// 模块 H3.7: OKX / 欧易全流量归组补丁(v40，源自巨无霸14号)
// 只匹配确认的 App 包名、官方域名与日志确认备用域名，不使用 okx/ouyi 关键词宽匹配。
// ================================================================
function injectOKXFullTrafficRoutingPatch(config) {
var rules = [
`PROCESS-NAME,com.okinc.okex.gp,${BIZ.CRYPTO}`,
`PROCESS-NAME-REGEX,(?i)^com\\.okinc\\.okex\\.gp(?::.*)?$,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,ouyich.biz,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,ouyich.show,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,cnouyi.pizza,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okx.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okex.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,oklink.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okx-dns.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okx-dns1.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okx-dns2.com,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okx.ac,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okx.cab,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,xlayer.tech,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,okx.com.cdn.cloudflare.net,${BIZ.CRYPTO}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] OKX full traffic routing patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}

// ================================================================
// 模块 H3.8: giffgaff 登录兼容补丁(v40，源自巨无霸15号)
// 只救回登录必需的 Dynamic Yield / OneTrust 主机，不放行分析、崩溃与 Firebase Logging 流量。
// ================================================================
function injectGiffgaffLoginCompatibilityPatch(config) {
var rules = [
`DOMAIN-SUFFIX,giffgaff.com,${BIZ.INTL_SITE}`,
`DOMAIN,cdn-eu.dynamicyield.com,${BIZ.INTL_SITE}`,
`DOMAIN,privacyportal-uk.onetrust.com,${BIZ.INTL_SITE}`,
`DOMAIN,mobile-data.onetrust.io,${BIZ.INTL_SITE}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] giffgaff login compatibility patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.8.1: MetaMask 启动链路精准修复补丁(v42)
// 日志依据：MetaMask 核心 API 已进入 ₿ 加密货币，但 api2.branch.io / cdn.branch.io 被 anti-ad 拒绝。
// 原则：只救回 MetaMask 进程、官方域名和日志确认的两个 Branch 启动主机，不放行整个 branch.io。
// ================================================================
function injectMetaMaskStartupFix(config) {
var rules = [
`PROCESS-NAME,io.metamask,${BIZ.CRYPTO}`,
`PROCESS-NAME-REGEX,(?i)^io\\.metamask(?::.*)?$,${BIZ.CRYPTO}`,
`DOMAIN-SUFFIX,metamask.io,${BIZ.CRYPTO}`,
`DOMAIN,api2.branch.io,${BIZ.CRYPTO}`,
`DOMAIN,cdn.branch.io,${BIZ.CRYPTO}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] MetaMask startup fix injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.9: 小米 HyperOS / MIUI 系统更新专项修复补丁(v41，源自巨无霸16号)
// 日志依据：2026-06-30 中 ultimateota.d.miui.com / superota.d.miui.com 解析失败；
// 同时 com.android.providers.downloads 将迅雷 OTA 辅助链路误送入 🛒 Google Play。
// 原则：只前置 OTA 下载域名与更新器进程，不把整个系统下载器改为 DIRECT，避免破坏 Google Play 下载。
// ================================================================
function injectXiaomiHyperOSOtaUpdatePatch(config) {
var rules = [
// HyperOS / MIUI OTA 主下载域名：必须位于系统 DownloadManager 进程规则之前
'DOMAIN,ultimateota.d.miui.com,DIRECT',
'DOMAIN,superota.d.miui.com,DIRECT',
'DOMAIN,bigota.d.miui.com,DIRECT',
'DOMAIN-SUFFIX,d.miui.com,DIRECT',

// 日志确认的小米 OTA / 迅雷下载辅助链路；只放行下载相关子域，不放行整个 sandai.net
'DOMAIN,etl-xlmc-ssl.sandai.net,DIRECT',
'DOMAIN-SUFFIX,xlmc.sandai.net,DIRECT',
'DOMAIN-SUFFIX,shub.sandai.net,DIRECT',
'DOMAIN-SUFFIX,rcv.sandai.net,DIRECT',

// 系统更新器本体直连；保留 com.android.providers.downloads → Google Play 的旧规则，靠上方域名精准抢回 OTA
'PROCESS-NAME,com.android.updater,DIRECT',
'PROCESS-NAME,com.miui.updater,DIRECT'
]
_fusionPrependUniqueRules(config, rules)

// OTA 域名使用双国内 DoH 冗余，替代旧的单一 119.29.29.29 解析，降低 couldn't find ip 风险
if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var otaCnDns = ['https://dns.alidns.com/dns-query', 'https://doh.pub/dns-query']
Object.assign(config.dns['nameserver-policy'], {
'ultimateota.d.miui.com': otaCnDns.slice(),
'superota.d.miui.com': otaCnDns.slice(),
'bigota.d.miui.com': otaCnDns.slice(),
'+.d.miui.com': otaCnDns.slice(),
'etl-xlmc-ssl.sandai.net': otaCnDns.slice(),
'+.xlmc.sandai.net': otaCnDns.slice(),
'+.shub.sandai.net': otaCnDns.slice(),
'+.rcv.sandai.net': otaCnDns.slice()
})

// DIRECT 出口重新解析时继续服从上面的 nameserver-policy，防止又退回单一/异常 DNS
config.dns['direct-nameserver'] = _fusionMergeUniqueArray(config.dns['direct-nameserver'], otaCnDns)
config.dns['direct-nameserver-follow-policy'] = true

// OTA 下载与 P2P 辅助域名返回真实 IP，避免 Fake-IP 与系统更新器/断点续传链路冲突
config.dns['fake-ip-filter'] = _fusionMergeUniqueArray(config.dns['fake-ip-filter'], [
'ultimateota.d.miui.com', 'superota.d.miui.com', 'bigota.d.miui.com', '*.d.miui.com',
'etl-xlmc-ssl.sandai.net', '*.xlmc.sandai.net', '*.shub.sandai.net', '*.rcv.sandai.net'
])

// 跳过 OTA 域名嗅探，保持下载签名域名、SNI 与实际目标一致
if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['skip-domain'] = _fusionMergeUniqueArray(config.sniffer['skip-domain'], [
'+.d.miui.com', 'etl-xlmc-ssl.sandai.net', '+.xlmc.sandai.net', '+.shub.sandai.net', '+.rcv.sandai.net'
])

log(`[${VERSION}] Xiaomi HyperOS OTA update patch injected: ${rules.length} rules, domestic DoH redundancy enabled, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.9.1: 迅雷官网 / 账号 / 云盘 / 下载全链路直连补丁(v57)
// 说明：V41 只保护了小米 OTA 借用的 4 条迅雷辅助域名，无法覆盖迅雷自身网站、
// 登录、会员、云盘、下载/CDN、P2P 与客户端进程。本补丁只补齐迅雷体系，不影响其他业务。
// ================================================================
function injectXunleiFullChainDirectFix(config) {
var xunleiDomains = [
'xunlei.com', 'xunlei.cn', 'xunlei.net',
'sandai.net', 'thundercdn.com', 'thunderurl.com',
'xlpan.com', 'xbase.cloud', 'xbase.xyz', 'xcloudbase.com',
'p2cdn.com', '00cdn.com', '88cdn.com', 'gigaget.com', 'xlisp.net', '8uri.cn',
'geilijiasu.com', 'geilijiasu.net', 'kankan.com', 'kanimg.com', 'xlyouxi.net'
]

var rules = []
for (var i = 0; i < xunleiDomains.length; i++) {
rules.push(`DOMAIN-SUFFIX,${xunleiDomains[i]},DIRECT`)
}

// Android 官方包名及子进程；Windows/macOS 迅雷主程序与下载服务。
rules.push('PROCESS-NAME,com.xunlei.downloadprovider,DIRECT')
rules.push('PROCESS-NAME-REGEX,(?i)^com\\.xunlei\\..*,DIRECT')
rules.push('PROCESS-NAME-REGEX,(?i)^(Thunder|ThunderStart|ThunderNewTask|ThunderPlatform|ThunderService|XLServicePlatform|DownloadSDKServer)(\\.exe)?$,DIRECT')
_fusionPrependUniqueRules(config, rules)

// 迅雷国内业务使用双国内 DoH；DIRECT 出口继续服从该策略。
if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var xunleiCnDns = FUSION_CN_DNS.slice()
for (var d = 0; d < xunleiDomains.length; d++) {
config.dns['nameserver-policy']['+.' + xunleiDomains[d]] = xunleiCnDns.slice()
}
config.dns['direct-nameserver'] = _fusionMergeUniqueArray(config.dns['direct-nameserver'], xunleiCnDns)
config.dns['direct-nameserver-follow-policy'] = true

// P2P、断点续传和签名下载使用真实 IP，并保持域名/SNI 不被嗅探改写。
var realIpDomains = []
var skipDomains = []
for (var f = 0; f < xunleiDomains.length; f++) {
realIpDomains.push(xunleiDomains[f])
realIpDomains.push('*.' + xunleiDomains[f])
skipDomains.push('+.' + xunleiDomains[f])
}
config.dns['fake-ip-filter'] = _fusionMergeUniqueArray(config.dns['fake-ip-filter'], realIpDomains)
if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['skip-domain'] = _fusionMergeUniqueArray(config.sniffer['skip-domain'], skipDomains)

log(`[${VERSION}] Xunlei full-chain direct fix injected: ${rules.length} rules, ${xunleiDomains.length} domain families, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.9.2: MineRadio 音乐流媒体分流补丁(v57.1)
// 仅将 mineradio.cn 及其子域名归入现有 🎧 音乐流媒体策略组，不修改其他链路。
// ================================================================
function injectMineRadioMusicRoutingFix(config) {
var rules = [
`DOMAIN-SUFFIX,mineradio.cn,${BIZ.MUSIC}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] MineRadio music routing fix injected: ${rules.length} rule, MineRadio -> ${BIZ.MUSIC}, total=${config.rules.length}`)
}


// ================================================================
// 模块 H3.9.3: 中国域名 / App 通用访问兼容补丁(v58)
// 日志依据：119.29.29.29 被 szkane-bilihmt 抢入香港流媒体，节点抖动时会让
// QQ、微信、腾讯、B站和小米等共用该解析器的服务成片失败。
// 原则：只修国内 DNS 路由与最终中国兜底，不按 App 包名堆重型白名单；
// MineRadio 等更具体业务规则仍保持更高优先级，广告/REJECT 仍在最终层。
// ================================================================
function injectChinaAccessCompatibilityFix(config) {
var criticalDnsRules = [
// 国内 DoH 主机和脚本会用到的明文 DNS 端点必须直连，避免被流媒体/IP 宽规则抢走。
'DOMAIN,dns.alidns.com,DIRECT',
'DOMAIN,doh.pub,DIRECT',
'DOMAIN,doh.360.cn,DIRECT',
'IP-CIDR,223.5.5.5/32,DIRECT,no-resolve',
'IP-CIDR,223.6.6.6/32,DIRECT,no-resolve',
'IP-CIDR,119.29.29.29/32,DIRECT,no-resolve',
'IP-CIDR,120.53.53.53/32,DIRECT,no-resolve',
'IP-CIDR,1.12.12.12/32,DIRECT,no-resolve',
'IP-CIDR,180.76.76.76/32,DIRECT,no-resolve',
'IP-CIDR,101.198.198.198/32,DIRECT,no-resolve',
'IP-CIDR,114.114.114.114/32,DIRECT,no-resolve'
]
_fusionPrependUniqueRules(config, criticalDnsRules)

// .cn 与中文顶级域名在最终广告层前兜底；插在末端而非最顶部，确保
// mineradio.cn 等已经明确指定业务组的规则仍先命中。
var cnSuffixRules = [
`DOMAIN-SUFFIX,cn,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,xn--fiqs8s,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,xn--fiqz9s,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,xn--55qx5d,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,xn--io0a7i,${BIZ.CN_SITE}`,
`DOMAIN-SUFFIX,xn--zfr164b,${BIZ.CN_SITE}`
]

var geoIpOld = `GEOIP,CN,${BIZ.CN_SITE},no-resolve`
var geoIpNew = `GEOIP,CN,${BIZ.CN_SITE}`
var geoIpIndex = config.rules.indexOf(geoIpOld)
if (geoIpIndex !== -1) config.rules[geoIpIndex] = geoIpNew
geoIpIndex = config.rules.indexOf(geoIpNew)
if (geoIpIndex === -1) {
geoIpIndex = config.rules.findIndex(function(rule) { return String(rule || '').indexOf('MATCH,') === 0 })
if (geoIpIndex === -1) geoIpIndex = config.rules.length
config.rules.splice(geoIpIndex, 0, geoIpNew)
}

for (var i = 0; i < cnSuffixRules.length; i++) {
var rule = cnSuffixRules[i]
if (config.rules.indexOf(rule) !== -1) continue
geoIpIndex = config.rules.indexOf(geoIpNew)
config.rules.splice(geoIpIndex, 0, rule)
}

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
config.dns['respect-rules'] = true
config.dns.nameserver = _fusionMergeUniqueArray(config.dns.nameserver, FUSION_CN_DNS)
config.dns['proxy-server-nameserver'] = _fusionMergeUniqueArray(config.dns['proxy-server-nameserver'], FUSION_CN_DNS)
config.dns['direct-nameserver'] = _fusionMergeUniqueArray(config.dns['direct-nameserver'], FUSION_CN_DNS)
config.dns['direct-nameserver-follow-policy'] = true

if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var policy = config.dns['nameserver-policy']
var policyKeys = Object.keys(policy)
for (var p = 0; p < policyKeys.length; p++) {
var key = policyKeys[p]
// V57.1 中这些值均由脚本写入；升级为双 DoH，避免单一 119.29.29.29 再次形成故障点。
if (policy[key] === '119.29.29.29') policy[key] = FUSION_CN_DNS.slice()
}
policy['rule-set:cn'] = FUSION_CN_DNS.slice()
policy['+.cn'] = FUSION_CN_DNS.slice()
policy['+.xn--fiqs8s'] = FUSION_CN_DNS.slice()
policy['+.xn--fiqz9s'] = FUSION_CN_DNS.slice()
policy['+.xn--55qx5d'] = FUSION_CN_DNS.slice()
policy['+.xn--io0a7i'] = FUSION_CN_DNS.slice()
policy['+.xn--zfr164b'] = FUSION_CN_DNS.slice()

// 将明显的 DNS 黑洞结果交给 fallback 复核，避免 0.0.0.0 / 127.0.0.1 伪响应造成整页失败。
if (!config.dns['fallback-filter'] || typeof config.dns['fallback-filter'] !== 'object') {
config.dns['fallback-filter'] = { geoip: true, 'geoip-code': 'CN' }
}
config.dns['fallback-filter'].ipcidr = _fusionMergeUniqueArray(config.dns['fallback-filter'].ipcidr, [
'0.0.0.0/32', '127.0.0.0/8'
])

log(`[${VERSION}] China access compatibility fix injected: DNS direct=${criticalDnsRules.length}, CN suffix=${cnSuffixRules.length}, GEOIP resolve enabled, total=${config.rules.length}`)
}


// ================================================================
// 模块 H4: Google Play 统一链路补丁(v26 fake-ip/downloadmanager fix)
// 说明：Google Play 下载会同时调用 Play 商店、GMS/GSF、Google API、下载 CDN。
// 某些机场/客户端在精细分流下会被拆到多个策略组导致下载失败；这里用窄域名统一走 🛒 Google Play。
// v26: 补系统下载管理器进程；Google Play 下载域名不再加入 fake-ip-filter，避免真实 IP/DownloadManager 组合导致卡 0%。
// ================================================================
function injectGooglePlayUnifiedPatch(config) {
var rules = [
// Google Play / GMS 进程：统一到 Google Play 组
`PROCESS-NAME,com.android.vending,${BIZ.GPLAY}`,
`PROCESS-NAME,com.google.android.gms,${BIZ.GPLAY}`,
`PROCESS-NAME,com.google.android.gsf,${BIZ.GPLAY}`,
`PROCESS-NAME,com.google.android.packageinstaller,${BIZ.GPLAY}`,
`PROCESS-NAME,com.android.packageinstaller,${BIZ.GPLAY}`,
`PROCESS-NAME,com.android.providers.downloads,${BIZ.GPLAY}`,
`PROCESS-NAME,com.android.providers.downloads.ui,${BIZ.GPLAY}`,

// Google Play 接口与下载 CDN
`DOMAIN-SUFFIX,play.google.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,play.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,play-fe.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,playatoms-pa.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,play-apps-fe-pa.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,android.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,android.clients.google.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,android.clients.google.com.cn,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,dl.google.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,dl.l.google.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,gvt1.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,gvt2.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,gvt3.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,play-lh.googleusercontent.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,xn--ngstr-lra8j.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,xn--ngstr-cn-8za9o.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,services.googleapis.cn,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,googleapis.cn,${BIZ.GPLAY}`,
`RULE-SET,googlefcm,${BIZ.GPLAY}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] Google Play v26 unified downloadmanager/fake-ip patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H4.5: YouTube RVX / ReVanced 统一分流补丁(v27)
// 说明：改版 YouTube 客户端会同时请求 YouTube API、视频 CDN、SponsorBlock、Return YouTube Dislike 等接口。
// 如果这些流量被拆到不同策略组，会出现首屏加载慢、转圈久、评论/缩略图/API 先后卡顿。
// 本补丁只前置 YouTube/RVX 相关进程与窄域名到 ▶️ YouTube，不修改自动优选/测速/节点 UI。
// ================================================================
function injectYoutubeRvxUnifiedPatch(config) {
var rules = [
// YouTube / RVX / ReVanced 进程：统一到 YouTube 组
`PROCESS-NAME,com.google.android.youtube,${BIZ.YT}`,
`PROCESS-NAME,app.morphe.android.youtube,${BIZ.YT}`,
`PROCESS-NAME,app.rvx.android.youtube,${BIZ.YT}`,
`PROCESS-NAME,app.revanced.android.youtube,${BIZ.YT}`,
`PROCESS-NAME,app.rvx.android.apps.youtube,${BIZ.YT}`,

// YouTube 核心 API / 播放 / 缩略图 / 搜索建议
`DOMAIN-SUFFIX,youtube.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtu.be,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtube-nocookie.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtubekids.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtubei.googleapis.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtube.googleapis.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,googlevideo.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,ytimg.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,ggpht.com,${BIZ.YT}`,
`DOMAIN,suggestqueries.google.com,${BIZ.YT}`,
`DOMAIN,www.youtube.com,${BIZ.YT}`,
`DOMAIN,m.youtube.com,${BIZ.YT}`,
`DOMAIN,music.youtube.com,${BIZ.MUSIC}`,

// RVX / ReVanced 常用辅助接口：SponsorBlock / Return YouTube Dislike / DeArrow
`DOMAIN-SUFFIX,sponsor.ajay.app,${BIZ.YT}`,
`DOMAIN-SUFFIX,dearrow.ajay.app,${BIZ.YT}`,
`DOMAIN-SUFFIX,dearrow-thumb.ajay.app,${BIZ.YT}`,
`DOMAIN-SUFFIX,returnyoutubedislikeapi.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,returnyoutubedislike.com,${BIZ.YT}`
]
_fusionPrependUniqueRules(config, rules)
log(`[${VERSION}] YouTube RVX/ReVanced unified patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}

// ================================================================
// 模块 H4.5.1: YouTube 字幕 / 自动翻译链路防误拦补丁(v51.3)
// 说明：只前置字幕与嵌入播放器的窄域名；不放行 Google Analytics / DoubleClick 等广告跟踪域名。
// 不新增策略组和 rule-provider，继续复用 ▶️ YouTube 与现有 🎯 节点选择链路。
// ================================================================
function injectYoutubeCaptionCompatibilityFix(config) {
var rules = [
// YouTube 字幕正文、字幕轨道元数据、网页/嵌入播放器
`DOMAIN,www.youtube.com,${BIZ.YT}`,
`DOMAIN,m.youtube.com,${BIZ.YT}`,
`DOMAIN,youtubei.googleapis.com,${BIZ.YT}`,
`DOMAIN,youtube.googleapis.com,${BIZ.YT}`,
`DOMAIN,youtubeembeddedplayer.googleapis.com,${BIZ.YT}`,
`DOMAIN,jnn-pa.googleapis.com,${BIZ.YT}`,
`DOMAIN,video.google.com,${BIZ.YT}`,

// 视频清单、字幕关联资源与缩略图；移动到广告规则之前，避免被宽规则抢先命中
`DOMAIN-SUFFIX,youtube.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtubei.googleapis.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,youtube.googleapis.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,googlevideo.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,ytimg.com,${BIZ.YT}`,
`DOMAIN-SUFFIX,ggpht.com,${BIZ.YT}`
]

// 旧版本中相同规则可能位于较后位置；先移除再最终前置，确保字幕链路高于广告/宽泛 Google 规则。
if (!Array.isArray(config.rules)) config.rules = []
for (var i = config.rules.length - 1; i >= 0; i--) {
if (rules.indexOf(config.rules[i]) !== -1) config.rules.splice(i, 1)
}
_fusionPrependUniqueRules(config, rules)

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['fallback-filter'] || typeof config.dns['fallback-filter'] !== 'object') {
config.dns['fallback-filter'] = { geoip: true, 'geoip-code': 'CN', domain: [] }
}
config.dns['fallback-filter'].domain = _fusionMergeUniqueArray(config.dns['fallback-filter'].domain, [
'+.youtube.com', '+.youtubei.googleapis.com', '+.youtube.googleapis.com', '+.googlevideo.com', '+.ytimg.com', '+.ggpht.com',
'jnn-pa.googleapis.com', 'youtubeembeddedplayer.googleapis.com', 'video.google.com'
])
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var cleanForeignDns = FUSION_FOREIGN_DNS.slice()
Object.assign(config.dns['nameserver-policy'], {
'+.youtube.com': cleanForeignDns.slice(),
'+.youtubei.googleapis.com': cleanForeignDns.slice(),
'+.youtube.googleapis.com': cleanForeignDns.slice(),
'+.googlevideo.com': cleanForeignDns.slice(),
'+.ytimg.com': cleanForeignDns.slice(),
'+.ggpht.com': cleanForeignDns.slice(),
'jnn-pa.googleapis.com': cleanForeignDns.slice(),
'youtubeembeddedplayer.googleapis.com': cleanForeignDns.slice(),
'video.google.com': cleanForeignDns.slice()
})

if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['force-domain'] = _fusionMergeUniqueArray(config.sniffer['force-domain'], [
'+.youtube.com', '+.youtubei.googleapis.com', '+.youtube.googleapis.com', '+.googlevideo.com', '+.ytimg.com', '+.ggpht.com',
'jnn-pa.googleapis.com', 'youtubeembeddedplayer.googleapis.com', 'video.google.com'
])

log(`[${VERSION}] YouTube caption compatibility fix injected: ${rules.length} rules, clean DNS policies=9, total=${config.rules.length}`)
}

// ================================================================
// 模块 H4.7: OpenAI 上传链路 + FlClash 客户端自身流量补丁(v40，源自巨无霸4号主干)
// V 系列仅保留精准进程/域名与少量 DNS/Sniffer 条目，不导入巨无霸内联规则。
// ================================================================
function injectOpenAIUploadPatch(config) {
var rules = [
`PROCESS-NAME,com.follow.clash,${BIZ.TOOLS}`,
`PROCESS-NAME,com.follow.clash.beta,${BIZ.TOOLS}`,
`PROCESS-NAME,com.github.metacubex.clash.meta,${BIZ.TOOLS}`,
`PROCESS-NAME,com.github.metacubex.clash.meta.beta,${BIZ.TOOLS}`,
`PROCESS-NAME,com.openai.chatgpt,${BIZ.AI}`,
`PROCESS-NAME,com.openai.chat,${BIZ.AI}`,
`PROCESS-NAME-REGEX,(?i).*(openai|chatgpt).*,${BIZ.AI}`,
`DOMAIN-SUFFIX,chatgpt.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,chat.openai.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,openai.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,api.openai.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,auth0.openai.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,oaistatic.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,oaiusercontent.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,files.oaiusercontent.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,cdn.openai.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,livekit.cloud,${BIZ.AI}`,
`DOMAIN-SUFFIX,statsigapi.net,${BIZ.AI}`
]
_fusionPrependUniqueRules(config, rules)
if (!config.dns || typeof config.dns !== 'object') config.dns = {}
config.dns.ipv6 = true
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
Object.assign(config.dns['nameserver-policy'], {
'+.chatgpt.com': 'https://dns.google/dns-query',
'+.openai.com': 'https://dns.google/dns-query',
'+.auth0.openai.com': 'https://dns.google/dns-query',
'+.oaistatic.com': 'https://dns.google/dns-query',
'+.oaiusercontent.com': 'https://dns.google/dns-query',
'+.files.oaiusercontent.com': 'https://dns.google/dns-query',
'+.cdn.openai.com': 'https://dns.google/dns-query',
'+.livekit.cloud': 'https://dns.google/dns-query',
'+.statsigapi.net': 'https://dns.google/dns-query'
})
if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['force-domain'] = _fusionMergeUniqueArray(config.sniffer['force-domain'], [
'+.chatgpt.com', '+.openai.com', '+.auth0.openai.com', '+.oaistatic.com',
'+.oaiusercontent.com', '+.files.oaiusercontent.com', '+.cdn.openai.com',
'+.livekit.cloud', '+.statsigapi.net'
])
log(`[${VERSION}] OpenAI upload/client patch injected: ${rules.length} candidates, total=${config.rules.length}`)
}


// ================================================================
// 模块 H4.8: AdGuard DNS 轻量增强补丁(v44)已跳过
// 本分支不启用 AdGuard Public DNS，不修改 fallback 到 dns.adguard-dns.com。
// ================================================================
// ================================================================
// 模块 H4.9: AdGuard 浏览器扩展 / Firefox 加载兼容补丁(v45)
// 只放行扩展更新、官方页面和 Mozilla 扩展商店所需域名；不放行整个 Firefox 进程。
// ================================================================
function injectAdGuardFirefoxExtensionCompatibilityFix(config) {
var rules = [
// AdGuard 浏览器扩展过滤器、用户脚本与官方接口
`DOMAIN-SUFFIX,adtidy.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,adguard.com,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,adguard.org,${BIZ.TOOLS}`,
`DOMAIN-SUFFIX,adguard-dns.io,${BIZ.TOOLS}`,

// Firefox 扩展安装、版本检查与 CDN
`DOMAIN-SUFFIX,addons.mozilla.org,${BIZ.DOWNLOAD}`,
`DOMAIN-SUFFIX,addons.cdn.mozilla.net,${BIZ.DOWNLOAD}`,

// 扩展测试页/诊断页常用出口 IP 查询，日志确认被 hagezi-tif 误杀
`DOMAIN,api.ipify.org,${BIZ.TOOLS}`,

// 保留隐私拦截，但改为静默丢弃，避免普通 REJECT 导致 Firefox 毫秒级重试风暴
'DOMAIN,incoming.telemetry.mozilla.org,REJECT-DROP'
]
_fusionPrependUniqueRules(config, rules)

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var cleanForeignDns = FUSION_FOREIGN_DNS.slice()
Object.assign(config.dns['nameserver-policy'], {
'+.adtidy.org': cleanForeignDns.slice(),
'+.adguard.com': cleanForeignDns.slice(),
'+.adguard.org': cleanForeignDns.slice(),
'+.adguard-dns.io': cleanForeignDns.slice(),
'+.addons.mozilla.org': cleanForeignDns.slice(),
'+.addons.cdn.mozilla.net': cleanForeignDns.slice(),
'api.ipify.org': cleanForeignDns.slice()
})

log(`[${VERSION}] AdGuard/Firefox extension compatibility fix injected: ${rules.length} rules, clean DNS policies=7, total=${config.rules.length}`)
}

// ================================================================
// 模块 H4.10: 金融风控与系统核心服务误拦截修复补丁(v46)
// 仅救回日志确认的支付风控、设备识别、Google 定位与 Windows 动态配置主机。
// 不放行整个厂商域名，不放行普通广告归因/统计 SDK。
// ================================================================
function injectFinancialRiskCoreServiceCompatibilityFix(config) {
var rules = [
// Checkout.com Risk.js / 设备风险评估：支付、3DS 与 Google Pay 流程需要
`DOMAIN,fpjs.checkout.com,${BIZ.PAYMENTS}`,
`DOMAIN,fpjscache.checkout.com,${BIZ.PAYMENTS}`,
`DOMAIN,risk.checkout.com,${BIZ.PAYMENTS}`,

// ThreatMetrix 设备画像与反欺诈；日志确认 OKX 钱包访问 aa/h64 子域
`DOMAIN-SUFFIX,online-metrix.net,${BIZ.PAYMENTS}`,

// Google 定位/设备服务与 Windows/Xbox 动态配置，只做精准放行
`DOMAIN,voilatile-pa.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN,settings-win.data.microsoft.com,${BIZ.TOOLS}`
]
_fusionPrependUniqueRules(config, rules)

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var cleanForeignDns = FUSION_FOREIGN_DNS.slice()
Object.assign(config.dns['nameserver-policy'], {
'fpjs.checkout.com': cleanForeignDns.slice(),
'fpjscache.checkout.com': cleanForeignDns.slice(),
'risk.checkout.com': cleanForeignDns.slice(),
'+.online-metrix.net': cleanForeignDns.slice(),
'voilatile-pa.googleapis.com': cleanForeignDns.slice(),
'settings-win.data.microsoft.com': cleanForeignDns.slice()
})

log(`[${VERSION}] Financial risk/core service compatibility fix injected: ${rules.length} rules, clean DNS policies=6, total=${config.rules.length}`)
}

// ================================================================
// 模块 H4.11: 微软注册 / 人机验证兼容补丁(v47)
// 只救回微软账号创建、登录与 HUMAN/PerimeterX 验证链路；不放行微软普通遥测。
// ================================================================
function injectMicrosoftSignupHumanVerifyCompatibilityFix(config) {
var rules = [
// Microsoft 账号创建 / 登录 / 认证 CDN
`DOMAIN,signup.live.com,${BIZ.MS}`,
`DOMAIN,login.live.com,${BIZ.MS}`,
`DOMAIN,account.live.com,${BIZ.MS}`,
`DOMAIN,fpt.live.com,${BIZ.MS}`,
`DOMAIN,account.microsoft.com,${BIZ.MS}`,
`DOMAIN,login.microsoftonline.com,${BIZ.MS}`,
`DOMAIN-SUFFIX,msftauth.net,${BIZ.MS}`,

// Microsoft 设备风险判断 / 浏览器指纹校验
`DOMAIN,df.cfp.microsoft.com,${BIZ.MS}`,

// HUMAN / PerimeterX 人机验证链路；日志确认 collector/stk/captcha/ift 子域被 hagezi-tif 误杀
`DOMAIN-SUFFIX,hsprotect.net,${BIZ.MS}`,
`DOMAIN-SUFFIX,px-cloud.net,${BIZ.MS}`,
`DOMAIN-SUFFIX,px-cdn.net,${BIZ.MS}`
]

// 这些规则部分在旧规则表中已存在但位置较低；这里先移除同名旧规则再前置，避免被宽泛 RuleSet 抢先命中。
if (!Array.isArray(config.rules)) config.rules = []
for (var _msi = config.rules.length - 1; _msi >= 0; _msi--) {
if (rules.indexOf(config.rules[_msi]) !== -1) config.rules.splice(_msi, 1)
}
_fusionPrependUniqueRules(config, rules)

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var cleanForeignDns = FUSION_FOREIGN_DNS.slice()
Object.assign(config.dns['nameserver-policy'], {
'signup.live.com': cleanForeignDns.slice(),
'login.live.com': cleanForeignDns.slice(),
'account.live.com': cleanForeignDns.slice(),
'fpt.live.com': cleanForeignDns.slice(),
'account.microsoft.com': cleanForeignDns.slice(),
'login.microsoftonline.com': cleanForeignDns.slice(),
'+.msftauth.net': cleanForeignDns.slice(),
'df.cfp.microsoft.com': cleanForeignDns.slice(),
'+.hsprotect.net': cleanForeignDns.slice(),
'+.px-cloud.net': cleanForeignDns.slice(),
'+.px-cdn.net': cleanForeignDns.slice()
})

log(`[${VERSION}] Microsoft signup/human verification compatibility fix injected: ${rules.length} rules, clean DNS policies=11, total=${config.rules.length}`)
}


// ================================================================
// 模块 H4.12: 登录 / 账号核心链路防误拦截补丁(v49)
// 目标：登录、账号同步、OAuth、WebView 账号页不能被 anti-ad / hagezi-tif 抢先 REJECT。
// 原则：只前置日志确认与账号登录强相关的窄域名，不放行整个 googleapis.com / gstatic.com / 微软遥测。
// ================================================================
function injectLoginAccountCoreAntiFalseBlockFix(config) {
var rules = [
// Google / Android 登录与账号同步：日志确认 clientservices.googleapis.com 被 anti-ad 误杀
`DOMAIN,clientservices.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,clientservices.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,accounts.google.com,${BIZ.GPLAY}`,
`DOMAIN,oauthaccountmanager.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,android.clients.google.com,${BIZ.GPLAY}`,
`DOMAIN-SUFFIX,android.clients.google.com,${BIZ.GPLAY}`,
`DOMAIN,android.apis.google.com,${BIZ.GPLAY}`,
`DOMAIN,play-fe.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,play.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,playservices.google.com,${BIZ.GPLAY}`,
`DOMAIN,accounts.youtube.com,${BIZ.GPLAY}`,

// Google 登录页 / WebView / Autofill 依赖资源：不拦截、不全局放行广告域
`DOMAIN,content-autofill.googleapis.com,${BIZ.TOOLS}`,
`DOMAIN,signin.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN,ssl.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN,www.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN,fonts.gstatic.com,${BIZ.GPLAY}`,
`DOMAIN,fonts.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,geller-pa.googleapis.com,${BIZ.TOOLS}`,

// Microsoft 账号页/登录页补洞：日志确认 fpt.microsoft.com 被 anti-ad 抢走
`DOMAIN,fpt.microsoft.com,${BIZ.MS}`,
`DOMAIN,login.microsoft.com,${BIZ.MS}`,
`DOMAIN,mucp.api.account.microsoft.com,${BIZ.MS}`,
`DOMAIN,paymentinstruments.mp.microsoft.com,${BIZ.MS}`
]

// 先移除旧位置相同规则，再前置，确保在 anti-ad / hagezi-tif 之前命中。
if (!Array.isArray(config.rules)) config.rules = []
for (var _lgi = config.rules.length - 1; _lgi >= 0; _lgi--) {
if (rules.indexOf(config.rules[_lgi]) !== -1) config.rules.splice(_lgi, 1)
}
_fusionPrependUniqueRules(config, rules)

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var cleanForeignDns = FUSION_FOREIGN_DNS.slice()
Object.assign(config.dns['nameserver-policy'], {
'clientservices.googleapis.com': cleanForeignDns.slice(),
'+.clientservices.googleapis.com': cleanForeignDns.slice(),
'accounts.google.com': cleanForeignDns.slice(),
'oauthaccountmanager.googleapis.com': cleanForeignDns.slice(),
'android.clients.google.com': cleanForeignDns.slice(),
'+.android.clients.google.com': cleanForeignDns.slice(),
'android.apis.google.com': cleanForeignDns.slice(),
'play-fe.googleapis.com': cleanForeignDns.slice(),
'play.googleapis.com': cleanForeignDns.slice(),
'playservices.google.com': cleanForeignDns.slice(),
'accounts.youtube.com': cleanForeignDns.slice(),
'content-autofill.googleapis.com': cleanForeignDns.slice(),
'signin.gstatic.com': cleanForeignDns.slice(),
'ssl.gstatic.com': cleanForeignDns.slice(),
'www.gstatic.com': cleanForeignDns.slice(),
'fonts.gstatic.com': cleanForeignDns.slice(),
'fonts.googleapis.com': cleanForeignDns.slice(),
'geller-pa.googleapis.com': cleanForeignDns.slice(),
'fpt.microsoft.com': cleanForeignDns.slice(),
'login.microsoft.com': cleanForeignDns.slice(),
'mucp.api.account.microsoft.com': cleanForeignDns.slice(),
'paymentinstruments.mp.microsoft.com': cleanForeignDns.slice()
})

config.dns['fake-ip-filter'] = _fusionMergeUniqueArray(config.dns['fake-ip-filter'], [
'clientservices.googleapis.com', '*.clientservices.googleapis.com',
'accounts.google.com', 'oauthaccountmanager.googleapis.com',
'android.apis.google.com', 'playservices.google.com',
'accounts.youtube.com', 'content-autofill.googleapis.com', 'signin.gstatic.com', 'ssl.gstatic.com',
'www.gstatic.com', 'fonts.gstatic.com', 'fonts.googleapis.com', 'geller-pa.googleapis.com',
'fpt.microsoft.com', 'login.microsoft.com', 'mucp.api.account.microsoft.com', 'paymentinstruments.mp.microsoft.com'
])

if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['force-domain'] = _fusionMergeUniqueArray(config.sniffer['force-domain'], [
'clientservices.googleapis.com', '+.clientservices.googleapis.com',
'accounts.google.com', 'oauthaccountmanager.googleapis.com', 'android.clients.google.com',
'android.apis.google.com', 'play-fe.googleapis.com', 'play.googleapis.com', 'playservices.google.com',
'accounts.youtube.com', 'content-autofill.googleapis.com', 'signin.gstatic.com', 'ssl.gstatic.com',
'www.gstatic.com', 'fonts.gstatic.com', 'fonts.googleapis.com', 'geller-pa.googleapis.com',
'fpt.microsoft.com', 'login.microsoft.com', 'mucp.api.account.microsoft.com', 'paymentinstruments.mp.microsoft.com'
])

log(`[${VERSION}] Login/account core anti-falseblock fix injected: ${rules.length} rules, clean DNS policies=22, total=${config.rules.length}`)
}


// ================================================================
// 模块 H4.18: Grok Google 登录初始化防误拦补丁(v50)
// 日志依据：ai.x.grok 在进入 Google OAuth 前，9zje6z.*.appsflyersdk.com / sdk.iad-04.braze.com /
// api.mixpanel.com / firebaselogging-pa.googleapis.com 被 anti-ad / hagezi-tif 反复 REJECT，导致 Grok Google 登录一直转圈。
// 原则：只救回 Grok App 进程与日志确认的登录初始化窄域名；不全局放行 doubleclick / googleadservices / ads-api.x.com。
// ================================================================
function injectGrokGoogleLoginInitFix(config) {
var rules = [
// Google OAuth 与时间/日志基础链路必须先于 Grok 进程兜底；Google Play 默认继续跟随 🎯 节点选择。
`DOMAIN,oauth2.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,apis.google.com,${BIZ.GPLAY}`,
`DOMAIN,ogs.google.com,${BIZ.GPLAY}`,
`DOMAIN,time.google.com,${BIZ.GPLAY}`,
`DOMAIN,firebaselogging-pa.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,firebaselogging.googleapis.com,${BIZ.GPLAY}`,
`DOMAIN,crashlyticsreports-pa.googleapis.com,${BIZ.GPLAY}`,

// Grok / xAI 专属登录入口归 AI；公共 Cloudflare challenge 不做全局域名归组，由 Grok 进程兜底处理。
`DOMAIN,accounts.x.ai,${BIZ.AI}`,
`DOMAIN,auth.x.ai,${BIZ.AI}`,
`DOMAIN,auth.grok.com,${BIZ.AI}`,
`DOMAIN,auth.grokusercontent.com,${BIZ.AI}`,
`DOMAIN,auth.grokipedia.com,${BIZ.AI}`,

// Grok / xAI 主体与静态资源归 AI；AI 组默认第一项仍是 🎯 节点选择。
`DOMAIN,grok.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,grok.com,${BIZ.AI}`,
`DOMAIN-SUFFIX,x.ai,${BIZ.AI}`,
`DOMAIN,assets.x.ai,${BIZ.AI}`,
`DOMAIN,cdn.grok.com,${BIZ.AI}`,
`DOMAIN,status.x.ai,${BIZ.AI}`,

// 最后才使用进程兜底：仅 Grok App 内的 AppsFlyer/Braze/Mixpanel/OneTrust 等初始化请求被救回；
// 其他 App 访问这些公共 SDK 时仍按原广告/隐私规则处理，不再全局送入 AI。
`PROCESS-NAME,ai.x.grok,${BIZ.AI}`,
`PROCESS-NAME-REGEX,(?i)^ai\\.x\\.grok(?::.*)?$,${BIZ.AI}`
]

if (!Array.isArray(config.rules)) config.rules = []
// 清理 V50 曾写入的公共 SDK 全局 AI 规则，防止从旧配置/重复覆写残留。
var obsoleteGlobalRules = [
`DOMAIN,9zje6z.cdn-settings.appsflyersdk.com,${BIZ.AI}`,
`DOMAIN,9zje6z.launches.appsflyersdk.com,${BIZ.AI}`,
`DOMAIN,9zje6z.inapps.appsflyersdk.com,${BIZ.AI}`,
`DOMAIN,websdk.appsflyersdk.com,${BIZ.AI}`,
`DOMAIN,sdk.iad-04.braze.com,${BIZ.AI}`,
`DOMAIN,api.mixpanel.com,${BIZ.AI}`,
`DOMAIN,geolocation.onetrust.com,${BIZ.AI}`,
`DOMAIN,privacyportal.onetrust.com,${BIZ.AI}`,
`DOMAIN,challenges.cloudflare.com,${BIZ.AI}`
]
for (var _gri = config.rules.length - 1; _gri >= 0; _gri--) {
if (rules.indexOf(config.rules[_gri]) !== -1 || obsoleteGlobalRules.indexOf(config.rules[_gri]) !== -1) config.rules.splice(_gri, 1)
}
_fusionPrependUniqueRules(config, rules)

if (!config.dns || typeof config.dns !== 'object') config.dns = {}
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
var cleanForeignDns = FUSION_FOREIGN_DNS.slice()
Object.assign(config.dns['nameserver-policy'], {
'grok.com': cleanForeignDns.slice(), '+.grok.com': cleanForeignDns.slice(), '+.x.ai': cleanForeignDns.slice(),
'accounts.x.ai': cleanForeignDns.slice(), 'auth.x.ai': cleanForeignDns.slice(), 'auth.grok.com': cleanForeignDns.slice(),
'auth.grokusercontent.com': cleanForeignDns.slice(), 'auth.grokipedia.com': cleanForeignDns.slice(),
'assets.x.ai': cleanForeignDns.slice(), 'cdn.grok.com': cleanForeignDns.slice(), 'status.x.ai': cleanForeignDns.slice(),
'oauth2.googleapis.com': cleanForeignDns.slice(),
'apis.google.com': cleanForeignDns.slice(),
'ogs.google.com': cleanForeignDns.slice(),
'time.google.com': cleanForeignDns.slice(),
'firebaselogging-pa.googleapis.com': cleanForeignDns.slice(),
'firebaselogging.googleapis.com': cleanForeignDns.slice(),
'crashlyticsreports-pa.googleapis.com': cleanForeignDns.slice()
})

// 仅登录主体需要真实解析；公共统计 SDK 不再加入全局 fake-ip-filter/sniffer。
config.dns['fake-ip-filter'] = _fusionMergeUniqueArray(config.dns['fake-ip-filter'], [
'grok.com', '*.grok.com', '*.x.ai', 'accounts.x.ai', 'auth.x.ai', 'auth.grok.com', 'auth.grokusercontent.com', 'auth.grokipedia.com',
'assets.x.ai', 'cdn.grok.com', 'status.x.ai',
'oauth2.googleapis.com', 'apis.google.com', 'ogs.google.com', 'time.google.com',
'firebaselogging-pa.googleapis.com', 'firebaselogging.googleapis.com', 'crashlyticsreports-pa.googleapis.com'
])

if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer['force-domain'] = _fusionMergeUniqueArray(config.sniffer['force-domain'], [
'+.grok.com', '+.x.ai', 'accounts.x.ai', 'auth.x.ai', 'auth.grok.com', 'auth.grokusercontent.com', 'auth.grokipedia.com',
'assets.x.ai', 'cdn.grok.com', 'status.x.ai',
'oauth2.googleapis.com', 'apis.google.com', 'ogs.google.com', 'time.google.com',
'firebaselogging-pa.googleapis.com', 'firebaselogging.googleapis.com', 'crashlyticsreports-pa.googleapis.com'
])

log(`[${VERSION}] Grok login architecture fix injected: ${rules.length} ordered rules, public SDK global routes removed, total=${config.rules.length}`)
}

// v51.1 最终结构收口：只保留 DNS 与 Google Play Fake-IP 修复，绝不改写策略组默认项。
function finalizeV511StructuralFix(config) {
if (!config.dns || typeof config.dns !== 'object') config.dns = {}
config.dns['respect-rules'] = true
config.dns['proxy-server-nameserver'] = _fusionMergeUniqueArray(config.dns['proxy-server-nameserver'], FUSION_CN_DNS)

var dirty = {
'play.google.com': true, 'play.googleapis.com': true, 'play-fe.googleapis.com': true,
'playatoms-pa.googleapis.com': true, 'play-apps-fe-pa.googleapis.com': true,
'android.googleapis.com': true, 'android.clients.google.com': true, 'android.clients.google.com.cn': true,
'dl.google.com': true, 'dl.l.google.com': true, 'play-lh.googleusercontent.com': true,
'gvt1.com': true, 'gvt2.com': true, 'gvt3.com': true,
'xn--ngstr-lra8j.com': true, 'xn--ngstr-cn-8za9o.com': true,
'services.googleapis.cn': true, 'googleapis.cn': true
}
config.dns['fake-ip-filter'] = (config.dns['fake-ip-filter'] || []).filter(function(item) {
var normalized = String(item || '').trim().replace(/^\+\./, '').replace(/^\*\./, '')
return !dirty[normalized]
})

log(`[${VERSION}] V51.1 structural finalizer: strategy defaults untouched, DNS rule-following enabled, Google Play fake-ip cleaned`)
}

// v55 最终拦截层收口：正常功能规则优先，所有广告/拦截规则只在 MATCH 前最后兜底。
function isV55FinalBlockRule(rule) {
var s = String(rule || '')
if (!s) return false
if (s.indexOf(',' + BIZ.AD) !== -1) return true
return /(^|,)REJECT(?:-[A-Z0-9_-]+)?(,|$)/.test(s)
}

function finalizeV55BlockRulesLast(config) {
if (!Array.isArray(config.rules)) config.rules = []
var normalRules = []
var blockRules = []
var finalMatch = null

for (var i = 0; i < config.rules.length; i++) {
var rule = config.rules[i]
var s = String(rule || '')
if (s.indexOf('MATCH,') === 0) {
if (finalMatch === null) finalMatch = rule
continue
}
if (isV55FinalBlockRule(rule)) blockRules.push(rule)
else normalRules.push(rule)
}

if (finalMatch === null) finalMatch = `MATCH,${BIZ.FINAL}`
config.rules.splice(0, config.rules.length)
for (var n = 0; n < normalRules.length; n++) config.rules.push(normalRules[n])
for (var b = 0; b < blockRules.length; b++) config.rules.push(blockRules[b])
config.rules.push(finalMatch)

log(`[${VERSION}] V55 final block tier: normal=${normalRules.length}, block=${blockRules.length}, MATCH=1`)
}

// v56：ASN 查询必须使用独立的 GeoLite2-ASN 数据库，不能把 GeoLite2-Country 国家库当作 ASN 库。
// 仅覆盖 asn 字段，其余 GeoX 地址保持原样。
function injectV56AsnDatabaseFix(config) {
var geox = config['geox-url']
if (!geox || typeof geox !== 'object' || Array.isArray(geox)) {
geox = {}
config['geox-url'] = geox
}
geox.asn = V56_ASN_URL
log(`[${VERSION}] V56 ASN database fixed: ${geox.asn}`)
}

function injectFusionRuntimePatch(config) {
// IPv6：保持 config.ipv6 / dns.ipv6 开启，不采用一刀切关闭方案。
config.ipv6 = true

// Hosts：优先保证 DoH 域名、miwifi/router 在 DNS 异常时仍有硬兜底
if (!config.hosts || typeof config.hosts !== 'object') config.hosts = {}
Object.assign(config.hosts, {
'dns.alidns.com': ['223.5.5.5', '223.6.6.6'],
'doh.pub': ['120.53.53.53', '1.12.12.12'],
'doh.360.cn': ['101.198.198.198'],
'dns.google': ['8.8.8.8', '8.8.4.4'],
'cloudflare-dns.com': ['1.1.1.1', '1.0.0.1'],
'miwifi.com': [FUSION_ROUTER_IP],
'router.miwifi.com': [FUSION_ROUTER_IP],
'api.miwifi.com': [FUSION_ROUTER_IP]
})

// DNS：若配置里没有 DNS，则给一个安全基础模板；若已有 DNS，只追加关键过滤和策略，不粗暴覆盖用户设置
if (!config.dns || typeof config.dns !== 'object') {
config.dns = {
enable: true,
ipv6: true,
'prefer-h3': false,
'enhanced-mode': 'fake-ip',
'fake-ip-range': '198.18.0.1/16',
'respect-rules': true,
nameserver: FUSION_CN_DNS.slice(),
fallback: FUSION_FOREIGN_DNS.slice(),
'proxy-server-nameserver': FUSION_CN_DNS.slice(),
'fallback-filter': { geoip: true, 'geoip-code': 'CN', ipcidr: ['240.0.0.0/4'], domain: [] },
'fake-ip-filter': [],
'nameserver-policy': {}
}
}
// v51: 已有 DNS 配置也必须补齐；避免境外 DoH 按 DIRECT 连接而在国内超时。
config.dns['respect-rules'] = true
config.dns['proxy-server-nameserver'] = _fusionMergeUniqueArray(config.dns['proxy-server-nameserver'], FUSION_CN_DNS)
config.dns.ipv6 = true
if (!config.dns['fallback-filter'] || typeof config.dns['fallback-filter'] !== 'object') config.dns['fallback-filter'] = { geoip: true, 'geoip-code': 'CN' }
config.dns['fallback-filter'].domain = _fusionMergeUniqueArray(config.dns['fallback-filter'].domain, [
'+.google.com', '+.googleapis.com', '+.googleapis.cn', '+.services.googleapis.cn', '+.gstatic.com', '+.googleusercontent.com',
'+.play.google.com', '+.play.googleapis.com', '+.play-fe.googleapis.com', '+.playatoms-pa.googleapis.com', '+.play-apps-fe-pa.googleapis.com', '+.android.googleapis.com', '+.android.clients.google.com', '+.dl.google.com', '+.dl.l.google.com', '+.play-lh.googleusercontent.com',
'+.gvt1.com', '+.gvt2.com', '+.gvt3.com', '+.youtube.com', '+.youtubei.googleapis.com', '+.translate.googleapis.com',
'translate.google.com', 'translate.google.cn', '+.gemini.google.com', '+.generativelanguage.googleapis.com', '+.maps.googleapis.com', '+.maps.gstatic.com',
'+.spotify.com', '+.spotifycdn.com', '+.spotifycdn.net', '+.scdn.co', '+.pscdn.co', '+.telegram.org', '+.t.me', '+.telegra.ph', '+.telesco.pe',
'+.github.com', '+.githubusercontent.com', '+.jsdelivr.net', '+.firebaseio.com', '+.fcm.googleapis.com',
'+.chatgpt.com', '+.openai.com', '+.auth0.openai.com', '+.oaistatic.com', '+.oaiusercontent.com', '+.files.oaiusercontent.com', '+.cdn.openai.com', '+.livekit.cloud'
])
config.dns['fake-ip-filter'] = _fusionMergeUniqueArray(config.dns['fake-ip-filter'], [
'*.lan', '*.local', '*.internal', '*.localdomain', 'home.arpa', '+.home.arpa',
'dns.msftncsi.com', 'stun.*', '*.stun.*', '*.turn.*', '*.turn.twilio.com', '*.stun.twilio.com',
'miwifi.com', '*.miwifi.com', 'router.miwifi.com', 'api.miwifi.com',
// v26: Google Play 下载链路域名不放 fake-ip-filter；保留 fake-ip 让 TUN/规则接管，避免 DownloadManager 真实 IP 解析后卡 0%。
'*.telegram.org', '*.telegram.me', '*.t.me', '*.telegra.ph', '*.telesco.pe', '*.tdesktop.com',
'dns.alidns.com', 'doh.pub', 'doh.360.cn', 'dns.google', 'cloudflare-dns.com'
])
// v26: 如果订阅/旧配置里已经带了这些 Google Play 下载域名，也主动从 fake-ip-filter 清退。
var _gplayFakeIpDirty = {
'play.google.com': true, 'play.googleapis.com': true, 'play-fe.googleapis.com': true,
'playatoms-pa.googleapis.com': true, 'play-apps-fe-pa.googleapis.com': true,
'android.googleapis.com': true, 'android.clients.google.com': true, 'android.clients.google.com.cn': true,
'dl.google.com': true, 'dl.l.google.com': true, 'play-lh.googleusercontent.com': true,
'gvt1.com': true, 'gvt2.com': true, 'gvt3.com': true,
'xn--ngstr-lra8j.com': true, 'xn--ngstr-cn-8za9o.com': true,
'services.googleapis.cn': true, 'googleapis.cn': true
}
config.dns['fake-ip-filter'] = (config.dns['fake-ip-filter'] || []).filter(function(item) {
var s = String(item || '').trim()
var normalized = s.replace(/^\+\./, '').replace(/^\*\./, '')
return !_gplayFakeIpDirty[normalized]
})
if (!config.dns['nameserver-policy'] || typeof config.dns['nameserver-policy'] !== 'object') config.dns['nameserver-policy'] = {}
Object.assign(config.dns['nameserver-policy'], {
'dns.alidns.com': '223.5.5.5',
'miwifi.com': 'system', '*.miwifi.com': 'system', 'router.miwifi.com': 'system', 'api.miwifi.com': 'system',
'+.google.com': 'https://dns.google/dns-query', '+.googleapis.com': 'https://dns.google/dns-query', '+.googleapis.cn': 'https://dns.google/dns-query',
'+.services.googleapis.cn': 'https://dns.google/dns-query', '+.gstatic.com': 'https://dns.google/dns-query', '+.googlevideo.com': 'https://dns.google/dns-query',
'+.ytimg.com': 'https://dns.google/dns-query', '+.youtube.com': 'https://dns.google/dns-query', '+.translate.googleapis.com': 'https://dns.google/dns-query',
'translate.google.com': 'https://dns.google/dns-query', 'translate.google.cn': 'https://dns.google/dns-query', '+.play.google.com': 'https://dns.google/dns-query', '+.play.googleapis.com': 'https://dns.google/dns-query', '+.play-fe.googleapis.com': 'https://dns.google/dns-query', '+.playatoms-pa.googleapis.com': 'https://dns.google/dns-query', '+.play-apps-fe-pa.googleapis.com': 'https://dns.google/dns-query', '+.android.googleapis.com': 'https://dns.google/dns-query', '+.android.clients.google.com': 'https://dns.google/dns-query', '+.play-lh.googleusercontent.com': 'https://dns.google/dns-query',
'+.spotify.com': 'https://dns.google/dns-query', '+.spotifycdn.com': 'https://dns.google/dns-query', '+.spotifycdn.net': 'https://dns.google/dns-query',
'+.telegram.org': 'https://dns.google/dns-query', '+.t.me': 'https://dns.google/dns-query', '+.telegra.ph': 'https://dns.google/dns-query', '+.telesco.pe': 'https://dns.google/dns-query',
'+.github.com': 'https://dns.google/dns-query', '+.githubusercontent.com': 'https://dns.google/dns-query', '+.jsdelivr.net': 'https://dns.google/dns-query',
'+.chatgpt.com': 'https://dns.google/dns-query', '+.openai.com': 'https://dns.google/dns-query', '+.auth0.openai.com': 'https://dns.google/dns-query', '+.oaistatic.com': 'https://dns.google/dns-query', '+.oaiusercontent.com': 'https://dns.google/dns-query', '+.files.oaiusercontent.com': 'https://dns.google/dns-query', '+.cdn.openai.com': 'https://dns.google/dns-query', '+.livekit.cloud': 'https://dns.google/dns-query',
'+.taobao.com': '223.5.5.5', '+.tmall.com': '223.5.5.5', '+.alipay.com': '223.5.5.5',
'+.qq.com': '119.29.29.29', '+.tencent.com': '119.29.29.29', '+.weixin.com': '119.29.29.29',
'+.bilibili.com': '119.29.29.29', '+.mi.com': '119.29.29.29', '+.xiaomi.com': '119.29.29.29', '+.baidu.com': '180.76.76.76',
'*.lan': 'system', '*.local': 'system', '*.internal': 'system', '*.localdomain': 'system', '+.home.arpa': 'system'
})

// Sniffer：融合 Fusion 的降噪与关键域名强制嗅探；不拦截连接，只降低误嗅探/日志雨风险
if (!config.sniffer || typeof config.sniffer !== 'object') config.sniffer = {}
config.sniffer.enable = true
config.sniffer['parse-pure-ip'] = true
config.sniffer['force-dns-mapping'] = true
config.sniffer['override-destination'] = true
if (!config.sniffer.sniff || typeof config.sniffer.sniff !== 'object') config.sniffer.sniff = {}
config.sniffer.sniff.HTTP = config.sniffer.sniff.HTTP || { ports: [80, '8080-8880'], 'override-destination': true }
config.sniffer.sniff.TLS = config.sniffer.sniff.TLS || { ports: [443, 8443] }
config.sniffer.sniff.QUIC = config.sniffer.sniff.QUIC || { ports: [443, 8443] }
config.sniffer['force-domain'] = _fusionMergeUniqueArray(config.sniffer['force-domain'], [
'+.google.com', '+.googleapis.com', '+.googleapis.cn', '+.services.googleapis.cn', '+.gstatic.com', '+.googleusercontent.com',
'+.play.google.com', '+.play.googleapis.com', '+.play-fe.googleapis.com', '+.android.googleapis.com', '+.android.clients.google.com', '+.play-lh.googleusercontent.com', '+.youtube.com', '+.ytimg.com', '+.googlevideo.com', '+.youtubei.googleapis.com', '+.translate.googleapis.com',
'translate.google.com', 'translate.google.cn', '+.gemini.google.com', '+.maps.googleapis.com', '+.maps.gstatic.com',
'+.spotify.com', '+.spotifycdn.com', '+.spotifycdn.net', '+.scdn.co', '+.pscdn.co', '+.telegram.org', '+.t.me',
'+.chatgpt.com', '+.openai.com', '+.auth0.openai.com', '+.oaistatic.com', '+.oaiusercontent.com', '+.files.oaiusercontent.com', '+.cdn.openai.com', '+.livekit.cloud'
])
config.sniffer['skip-domain'] = _fusionMergeUniqueArray(config.sniffer['skip-domain'], [
'+.push.apple.com', '+.apple.com', '+.oray.com', 'miwifi.com', '+.miwifi.com', 'router.miwifi.com', 'api.miwifi.com',
'captive.apple.com', 'connectivitycheck.gstatic.com'
])
config.sniffer['skip-src-address'] = _fusionMergeUniqueArray(config.sniffer['skip-src-address'], ['fe80::/10', 'fc00::/7'])
config.sniffer['skip-dst-address'] = _fusionMergeUniqueArray(config.sniffer['skip-dst-address'], [
'149.154.160.0/20', '91.108.4.0/22', '91.108.8.0/21', '91.108.56.0/22', '194.221.61.2/32'
])

// TUN：尊重 FlClash UI 开关；只有用户/原配置已启用时才补充关键项，不强制打开
if (config.tun && typeof config.tun === 'object' && config.tun.enable) {
config.tun.stack = config.tun.stack || 'system'
config.tun['dns-hijack'] = _fusionMergeUniqueArray(config.tun['dns-hijack'], ['any:53', 'tcp://any:53'])
if (typeof config.tun['auto-route'] === 'undefined') config.tun['auto-route'] = true
if (typeof config.tun['auto-detect-interface'] === 'undefined') config.tun['auto-detect-interface'] = true
if (typeof config.tun['strict-route'] === 'undefined') config.tun['strict-route'] = true
}

log(`[${VERSION}] Fusion runtime patch applied: hosts/dns/sniffer/conditional-tun`)
}

// ================================================================
// 模块 I:全局参数覆写
// ================================================================
function overwriteGeneral(config) {
config['unified-delay'] = true
config['tcp-concurrent'] = true

config['find-process-mode'] = 'strict'
config['keep-alive-idle'] = 30
config['keep-alive-interval'] = 15
// FlClash: 端口/TUN/DNS/GeoX 均由 App UI 管理,脚本不覆写。
// - 外部资源(GeoX URL):见 FlClash/README.md §必改配置
// - 进阶配置(DNS):见 FlClash/README.md §必改配置
// (与 Clash Party Sub-Store 版不同,后者由脚本注入全部全局设置)
if (!config.profile) config.profile = {}
config.profile['store-selected'] = true
config.profile['store-fake-ip'] = true
config.profile['tracing'] = true
}
// ================================================================
// 模块 J:清理订阅自带的旧组和旧规则
// ================================================================
function cleanupSubscription(config) {
// FlClash: 必须用原地修改(splice/length=0),不能重新赋值(= [])。
// QuickJS ↔ Dart FFI 桥接层:若创建新数组,Dart 端仍持有旧引用 → 修改丢失。
// 旧注释(v5.2.6-normal.1 FIX#26-P0): 4 关键词黑名单无法清除机场模板 → 全量重建。
var removed = (config['proxy-groups'] || []).length
if (config['proxy-groups'] && config['proxy-groups'].length > 0) {
config['proxy-groups'].splice(0, config['proxy-groups'].length)
}
if (removed > 0) log(`[${VERSION}] Cleared ${removed} subscription proxy-groups`)
if (config.rules && config.rules.length > 0) {
config.rules.splice(0, config.rules.length)
}
if (config['rule-providers']) {
var rpKeys = Object.keys(config['rule-providers'])
for (var i = 0; i < rpKeys.length; i++) { delete config['rule-providers'][rpKeys[i]] }
}
}
// ================================================================
// 模块 K:注入智能 TLS 指纹
// ================================================================
function _simpleHash(str) {
var hash = 0
for (var i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash |=
0 }
// >>> 0 converts to unsigned 32-bit; avoids Math.abs(-2147483648) === -2147483648 edge case
return hash >>> 0
}
function injectSmartFingerprint(config) {
if (!Array.isArray(config.proxies)) return
const fpByPurpose = { STREAM: 'chrome', GAME: 'ios', SOCIAL: 'firefox', DEV: 'edge' }
const fpFallbackCandidates = ['chrome','firefox','safari','ios','android','edge']
config.proxies.forEach(p => {
if (!p || typeof p !== 'object') return
// v5.2.0 FIX#15: 先判断协议类型,再判断是否需要指纹(逻辑顺序优化)
if (['vless','vmess','trojan'].indexOf(p.type) === -1) return
const isReality = !!(p['reality-opts'] || p['reality_opts'])
const flow = (p.flow || '').toLowerCase()
const isXTLS = /xtls-rprx/.test(flow)
// 仅对 TLS 或 Reality/XTLS 节点注入指纹(非加密连接无需指纹)
if (!p.tls && !isReality && !isXTLS) return
// v5.1.6 P0-FIX#4: 不覆盖节点已有 fingerprint(机场可能为 Reality 节点调优过)
if (p['client-fingerprint']) return

let chosenFP = null
const name = String(p.name)
if (/netflix|youtube|hulu|primevideo|disney|twitch/i.test(name)) { chosenFP =
fpByPurpose.STREAM }
else if (/game|steam|playstation|nintendo|epic|valorant/i.test(name)) { chosenFP =
fpByPurpose.GAME }
else if (/twitter|facebook|instagram|tiktok|snapchat|linkedin/i.test(name)) { chosenFP =
fpByPurpose.SOCIAL }
else if (/api|dev|github|gitlab|npm|pypi|docker/i.test(name)) { chosenFP = fpByPurpose.DEV }
if (!chosenFP) { const idx = _simpleHash(name) % fpFallbackCandidates.length; chosenFP =
fpFallbackCandidates[idx] }
p['client-fingerprint'] = chosenFP
})
}
// ================================================================
// 模块 L:proxy-groups 最终排序
// ================================================================
function sortProxyGroups(config) {
const fusionAutoGroups = [], bizGroups = [], smartGroups = [], otherGroups = []
const fusionAutoNames = new Set(Object.values(FUSION_AUTO))
const bizNames = new Set(Object.values(BIZ))
const smartNames = new Set(Object.values(SMART))
config['proxy-groups'].forEach(g => {
if (!g || !g.name) return
if (fusionAutoNames.has(g.name)) { fusionAutoGroups.push(g) }
else if (bizNames.has(g.name)) { bizGroups.push(g) }
else if (smartNames.has(g.name)) { smartGroups.push(g) }
else { otherGroups.push(g) }
})
const bizOrder = Object.values(BIZ)
bizGroups.sort((a, b) => bizOrder.indexOf(a.name) - bizOrder.indexOf(b.name))
const smartOrder = Object.values(SMART)
smartGroups.sort((a, b) => { const ia = smartOrder.indexOf(a.name); const ib =
smartOrder.indexOf(b.name); return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) })
// FlClash: 必须原地修改,不能重新赋值(QuickJS FFI 桥接层限制)
config['proxy-groups'].splice(0, config['proxy-groups'].length)
const fusionAutoOrder = Object.values(FUSION_AUTO)
fusionAutoGroups.sort((a, b) => fusionAutoOrder.indexOf(a.name) - fusionAutoOrder.indexOf(b.name))
var sorted = fusionAutoGroups.concat(bizGroups, otherGroups, smartGroups)
for (var i = 0; i < sorted.length; i++) { config['proxy-groups'].push(sorted[i]) }
}
// ================================================================
// 主函数
// ================================================================
function main(config) {
try {
if (!config || typeof config !== 'object') return config
if (!Array.isArray(config.proxies) || config.proxies.length === 0) return config
log(`[${VERSION}] Start processing, ${config.proxies.length} proxies`)
if (!Array.isArray(config['proxy-groups'])) config['proxy-groups'] = []
if (!Array.isArray(config.rules)) config.rules = []
overwriteGeneral(config)
cleanupSubscription(config)
injectSmartFingerprint(config)
var c = classifyAllNodes(config.proxies)
log(`[${VERSION}] Classification: ALL=${c.ALL.length} HOME_ALL=${c.HOME_ALL.length}HK=${c.HK.length}/${c.HOME_HK.length} TW=${c.TW.length}/${c.HOME_TW.length} CN=${c.CN.length}/${c.HOME_CN.length} JP=${c.JP.length}/${c.HOME_JP.length} KR=${c.KR.length}/${c.HOME_KR.length}SG=${c.SG.length}/${c.HOME_SG.length} US=${c.US.length}/${c.HOME_US.length} EU=${c.EU.length}/${c.HOME_EU.length} AM=${c.AM.length}/${c.HOME_AM.length} AF=${c.AF.length}/${c.HOME_AF.length}APAC_OTHER=${c.APAC_OTHER.length}/${c.HOME_APAC_OTHER.length}UNCLASSIFIED=${c.UNCLASSIFIED.length}/${c.HOME_UNCLASSIFIED.length}`)
var apacNodes = c.HK.concat(c.TW, c.CN, c.JP, c.KR, c.SG, c.APAC_OTHER)

var americasNodes = c.US.concat(c.AM)
var homeApacNodes = c.HOME_HK.concat(c.HOME_TW, c.HOME_CN, c.HOME_JP, c.HOME_KR, c.HOME_SG,
c.HOME_APAC_OTHER)
var homeAmericasNodes = c.HOME_US.concat(c.HOME_AM)
// v20+: 不再创建 🌍 全球节点/全球自动，避免和 🚀 自动优选重复；保留 🏡 全球家宽自动。
if (c.HOME_ALL.length > 0) upsertSmartGroup(config, SMART.GLOBAL_HOME, c.HOME_ALL)
// v31: 不再创建旧 Smart 地区组，避免与 Fusion「地区 - 自动优选 / 地区 - 手动选择」重复。
// 保留上方 🏡 全球家宽自动作为全局家宽聚合兜底；其余地区入口统一交给 Fusion UI。
upsertFusionNodeUiGroups(config, c.ALL, c)
// 收集实际创建的节点/区域/UI 组名，过滤业务组的 proxy 引用，避免引用不存在导致 proxy not found。
var activeSmartNames = new Set(config['proxy-groups'].filter(function(g) { return g && g.name }).map(function(g) { return g.name }))
activeSmartNames.add('DIRECT'); activeSmartNames.add('REJECT')
log(`[${VERSION}] Active selectable node groups: ${[...activeSmartNames].filter(function(n) {return n !== 'DIRECT' && n !== 'REJECT' }).join(', ')}`)
injectBusinessGroups(config, activeSmartNames)
injectRuleProviders(config)
injectRules(config)
// 必须先于会创建 config.dns 空壳的业务补丁执行，确保“原配置无 DNS”分支能够完整初始化。
injectFusionRuntimePatch(config)
injectV56AsnDatabaseFix(config)
injectFusionRules(config)
injectAppProcessPatch(config)
injectTikTokCiciAiIsolationPatch(config)
injectGooglePlayUnifiedPatch(config)
injectYoutubeRvxUnifiedPatch(config)
injectOpenAIUploadPatch(config)
injectVidHubUnifiedPatch(config)
injectNeverlessFinancialFix(config)
injectTelegramTranslateBoostPatch(config)
injectDeepLTranslateBoostPatch(config)
injectIFastGBFinancialLoginFix(config)
injectNoOnesGoogleLoginPatch(config)
injectNoOnesGoogleLoginSecondPatch(config)
injectTikTokLanProxyCompatibilityPatch(config)
injectOKXFullTrafficRoutingPatch(config)
injectGiffgaffLoginCompatibilityPatch(config)
injectMetaMaskStartupFix(config)
injectTikTokPlaybackStabilityFix(config)
injectXiaomiHyperOSOtaUpdatePatch(config)
injectXunleiFullChainDirectFix(config)
injectMineRadioMusicRoutingFix(config)
injectAdGuardFirefoxExtensionCompatibilityFix(config)
// Grok 整包进程规则先注入；后续核心域名补丁再前置，避免进程兜底吞掉登录与支付链路。
injectGrokGoogleLoginInitFix(config)
injectFinancialRiskCoreServiceCompatibilityFix(config)
injectMicrosoftSignupHumanVerifyCompatibilityFix(config)
injectLoginAccountCoreAntiFalseBlockFix(config)
// 字幕补丁最后前置，避免被后续登录/Google 宽规则或广告规则覆盖；不改变任何策略组默认项。
injectYoutubeCaptionCompatibilityFix(config)
finalizeV511StructuralFix(config)
// 小米系统保护最后前置，继续保持其 DIRECT 白名单最高优先级。
injectXiaomiSystemFix(config)
// 国内 DNS 与中国兜底在小米补丁之后收口，替换其单一 119.29.29.29 策略并保护国内解析端点。
injectChinaAccessCompatibilityFix(config)
// 所有业务补丁完成后再收口，确保广告、追踪、钓鱼、恶意域名与硬拒绝规则统一位于 MATCH 前的最后一层。
finalizeV55BlockRulesLast(config)
sortProxyGroups(config)
log(`[${VERSION}] Done! Groups: ${config['proxy-groups'].length}, Rules:${config.rules.length}, Providers: ${Object.keys(config['rule-providers']).length}`)
return config
} catch (e) {
log(`[${VERSION}] Error:`, e)
return config
}
}
