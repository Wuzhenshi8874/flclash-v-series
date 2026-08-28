# 🚀 FlClash V 系列覆写脚本

> 面向 FlClash 与标准 Mihomo 内核的动态分流覆写脚本。自动识别节点地区与家宽属性，生成区域测速组和业务策略组，并重点修复迅雷、中国域名/App、Xbox/Microsoft UWP 以及快速故障切换等实际使用问题。

![FlClash](https://img.shields.io/badge/FlClash-%E2%89%A5%200.8.85-5B8FF9?style=flat-square)
![Mihomo](https://img.shields.io/badge/Core-Mihomo-00B894?style=flat-square)
![JavaScript](https://img.shields.io/badge/Override-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
![Version](https://img.shields.io/badge/Latest%20in%20this%20archive-V61-8E44AD?style=flat-square)

## 📌 先看结论

- 新用户直接使用根目录的 [`FlClash-V61.js`](./FlClash-V61.js)。
- `versions/` 保存本次整理的 v57、v58 与 v61 原始版本，便于回退和比较。
- 脚本只负责“覆写”订阅生成的 Mihomo 配置，不包含机场订阅、代理节点、账号、密码或密钥。
- 需要 **FlClash 0.8.85 或更高版本**；其他支持 JavaScript 覆写的标准 Mihomo 客户端可自行测试。
- FlClash 使用标准 Mihomo 内核，区域自动选择采用 `url-test`，不使用 Clash Smart 的 `smart + LightGBM`。

> [!IMPORTANT]
> 本仓库中的“V61”是这组三份提交文件里的最新版本，不代表其他同名项目或上游仓库的全局最新版本。升级前请先备份当前可用配置。

## ✨ 核心能力

### 动态节点整理

- 按香港、台湾、新加坡、日本、韩国、美国、欧洲等地区自动分类。
- 识别“家宽 / 住宅 / residential / broadband”等节点标签，建立独立家宽组。
- 过滤剩余流量、到期时间、官网、订阅提示等非代理节点。
- 没有节点的地区不会创建空策略组，减少无效入口。
- 保留统一总控入口：`🎯 节点选择`、自动优选、极速自动、自动兜底、全部节点与负载均衡。

### 丰富的业务分流

脚本覆盖 AI、YouTube、Google Play、TikTok、社交媒体、流媒体、音乐、游戏、微软服务、开发工具、金融支付、加密货币、下载更新、广告拦截等常见场景。业务组默认可跟随 `🎯 节点选择`，也可以单独指定地区、家宽或具体节点。

### DNS、TUN 与嗅探协同

- 国内与境外 DNS 分层处理，支持 AliDNS、DNSPod、Google DNS 与 Cloudflare DNS。
- 对中国域名、系统服务、微软 UWP、下载链路等场景设置针对性的真实 IP/Fake-IP 兼容策略。
- 通过 `nameserver-policy`、`direct-nameserver-follow-policy`、`fake-ip-filter` 和域名嗅探降低分流漂移。
- 保留 TUN 与业务规则的整体结构，尽量避免为了修复单一 App 而全局关闭 UDP、QUIC 或广告拦截。

### 精准兼容补丁

| 场景 | 处理方式 |
|---|---|
| 迅雷 | 官网、账号、会员、云盘、CDN、P2P 与客户端进程全链路优先直连 |
| 中国域名与 App | 国内 DNS 端点优先直连，`.cn`/中文顶级域名和 `GEOIP,CN` 兜底 |
| 小米 HyperOS/MIUI OTA | OTA 域名与更新器进程精准直连，保留 Google Play 下载管理器逻辑 |
| Xbox / Microsoft | Xbox App、商店、Gaming Services 与登录链路统一进入微软策略组 |
| Microsoft UWP | 核心微软域名返回真实 IP，同时继续按原规则选择代理出口 |
| Google Play | 商店、GMS/GSF、下载 CDN 与系统下载进程统一分流 |
| TikTok / CiciAI | 主体流量、功能链路与遥测规则分离，减少互相污染 |
| 金融与账号登录 | 对 Neverless、iFAST GB、NoOnes、Grok 等使用进程与窄域名规则降低误拦截 |
| 广告/威胁规则 | 最终统一收口到 `MATCH` 前，修复宽泛业务规则抢先命中的问题 |

## 🆕 V61 重点改进

1. 缩短核心与地区自动组的检测周期和单次超时。
2. 为自动组设置 `max-failed-times`，让坏节点更快退出当前选择。
3. 地区自动组与全球家宽组统一使用 HTTP 204 健康检查。
4. 修复三条精确硬拦截规则的优先级回归。
5. 修复 `fake-ip-filter-mode: rule` 中混入普通通配符的问题。
6. 自动移除最终规则未引用的 rule-provider；脚本头部记录的结果为 **341 个有效 provider**，减少无效下载、解析和定时刷新。

完整版本差异见 [`CHANGELOG.md`](./CHANGELOG.md)。

## 📁 文件说明

```text
.
├── FlClash-V61.js                     # 推荐入口，本批文件最新版本
├── README.md                          # 项目介绍与完整教程
├── CHANGELOG.md                       # v57 → v61 变更摘要
├── SHA256SUMS.txt                     # 文件完整性校验
└── versions/
    ├── FlClash-V57-Xunlei-Direct.js
    ├── FlClash-V58-China-Compatibility.js
    └── FlClash-V61-Fast-Failover.js
```

## 🧭 使用前准备

你需要：

1. 已安装 FlClash 0.8.85 或更高版本。
2. 一条可正常更新的原生 Clash/Mihomo 订阅。
3. 至少一个可用代理节点。
4. 第一次操作前导出或截图保存当前配置。

推荐优先使用机场提供的原生 Mihomo/Clash 订阅。多机场聚合时，先用可信工具输出一条标准 Mihomo 订阅，再给这条订阅关联覆写脚本。

## 🚀 FlClash 导入教程

### 第 1 步：创建覆写脚本

进入：

```text
FlClash → 配置 → 覆写脚本 → 右上角「+」
```

输入一个容易识别的名称，例如 `V61 动态分流`，然后选择以下任一方式。

#### 方法 A：URL 导入（推荐）

GitHub Raw 地址：

```text
https://raw.githubusercontent.com/Wuzhenshi8874/flclash-v-series/main/FlClash-V61.js
```

国内访问 GitHub Raw 不稳定时，可使用 jsDelivr：

```text
https://cdn.jsdelivr.net/gh/Wuzhenshi8874/flclash-v-series@main/FlClash-V61.js
```

> [!TIP]
> URL 导入的优点是以后更新仓库文件后，客户端可重新拉取；jsDelivr 可能存在缓存，紧急更新时优先使用 Raw 或手动粘贴。

#### 方法 B：手动粘贴

1. 打开 `FlClash-V61.js`。
2. 点击 GitHub 文件页中的 **Raw**。
3. 全选并复制全部 JavaScript 内容。
4. 回到 FlClash 的覆写脚本编辑器，粘贴并保存。

如果出现 `SyntaxError: unexpected token '<'`，通常表示粘贴的是 GitHub 网页 HTML，而不是 Raw JavaScript。重新打开 Raw 链接再复制。

### 第 2 步：关联订阅

创建脚本后还必须把它关联到订阅：

```text
配置页 → 订阅卡片右上角「⋮」→ 更多 → 覆写
       → 选择“V61 动态分流”→ 确定
```

随后返回配置页下拉刷新，必要时重启 FlClash。

### 第 3 步：启用 Android 全流量接管

Android 用户若希望所有 App 都经过规则引擎，建议：

- 开启 VPN/TUN。
- 关闭“仅系统代理”。
- 关闭“允许应用绕过 VPN”，除非确实需要例外。
- 开启 DNS 劫持，路由模式选择“使用配置”。
- DNS 模式使用 `fake-ip`；若现有配置开启了 IPv6 或 PreferH3，遇到兼容问题时先关闭后复测。

只开启系统代理时，浏览器可能正常，但游戏、部分 WebView 和不遵守系统代理的 App 不一定会进入 Mihomo 规则引擎。

### 第 4 步：检查 GeoX 资源

V61 会补齐 ASN 数据库地址，但 `geoip`、`geosite`、`mmdb` 仍可能沿用订阅或客户端设置。可在 FlClash 的资源设置中确认这些地址可访问：

```yaml
geox-url:
  geoip: https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/geoip.dat
  mmdb: https://fastly.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb
  asn: https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb
  geosite: https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat
geo-auto-update: true
```

若你的订阅已经提供可用 GeoX 配置，不必重复覆盖。

## ✅ 导入后的快速验证

刷新配置后，用一分钟完成以下检查：

- “代理”页面出现 `🎯 节点选择` 和多个业务策略组。
- 有对应节点的地区出现自动/手动组；没有节点的地区不应生成空组。
- `🎯 节点选择` 中至少有一个可用节点或自动组。
- 打开日志，确认没有 `proxy not found`、`rule provider not found` 或 JavaScript 语法错误。
- 测试一个国内网站、一个境外网站和一个需要代理的 App。
- 使用迅雷时，查看连接记录是否命中 `DIRECT`。
- Microsoft Store/Xbox 出现问题时，确认相关流量命中 `Ⓜ️ 微软服务`，而不是被拆到多个出口。
- 等待一次规则资源更新，确认 provider 下载成功。

## 🎛️ 推荐使用方式

### 日常稳定优先

将 `🎯 节点选择` 设为自动优选或自动兜底，各业务组保持跟随总控。这样只需维护一个入口。

### 流媒体地区解锁

为 Netflix、Disney+、YouTube 等业务组单独选择目标地区组；其他业务仍跟随总控。

### 家宽节点优先

确认节点名称中带有“家宽”“住宅”“residential”等可识别标签，然后在对应业务组选择地区家宽自动组。节点命名不规范时，可先修改节点备注。

## 🔧 常见问题

### 脚本保存了但完全没变化

最常见原因是只创建了覆写脚本，没有把它关联到订阅。返回订阅卡片的“更多 → 覆写”重新选择脚本。

### 出现 `unexpected token '<'`

导入的是网页 HTML。请使用 GitHub Raw 链接、jsDelivr 链接，或从 Raw 页面复制内容。

### 区域组为空或节点分类错误

检查节点名称是否包含可识别的中文地区名、英文地区名、机场代码或国旗。脚本会自动跳过没有匹配节点的地区。

### 规则集下载失败

1. 先确认当前代理本身可用。
2. 尝试重新刷新订阅和外部资源。
3. 检查系统时间是否准确。
4. 检查 DNS 是否能解析 GitHub、jsDelivr、MetaCubeX 与规则源域名。
5. 若仅 jsDelivr 失败，换用源站链接；反之亦然。

### 国内 App 批量无法联网

检查日志中 `119.29.29.29`、`223.5.5.5` 等国内 DNS 是否被错误送入流媒体或代理策略。V58 及以后版本已将关键国内 DNS 端点前置直连，并为中国域名配置双国内 DoH。

### 迅雷无法登录、云盘无法打开或下载失败

确认使用 v57 或更高版本；日志中的迅雷域名与官方进程应优先命中 `DIRECT`。如果机场订阅自身添加了更高优先级规则，需要检查最终生成配置中的实际规则顺序。

### Microsoft Store 或 Xbox 一直转圈

确认使用 v60 或更高版本，并检查：

- VPN/TUN 是否真正开启；
- 微软域名是否返回真实 IP；
- 登录、商店和 Xbox 流量是否统一命中 `Ⓜ️ 微软服务`；
- Windows NCSI 与 Teredo 探测是否保持直连。

### 为什么不是 `smart` 策略组

FlClash 使用标准 Mihomo 内核，不支持 Clash Smart 的 `type: smart + LightGBM`。本脚本使用标准 `url-test` 健康检查实现自动选择和故障切换。

## ↩️ 回退方法

1. 在 FlClash 中取消当前订阅与 V61 覆写的关联。
2. 选择 `versions/` 中上一版脚本，或恢复之前导出的配置。
3. 刷新订阅并复测关键 App。

建议只在确认新版本解决问题后删除旧覆写脚本。

## 🔐 隐私与安全

- 本次整理未发现明文 token、密码、API key 或私钥。
- 脚本会访问多个公开规则源、Geo 数据库、图标 CDN 和 DNS-over-HTTPS 服务；使用前请自行评估这些第三方服务。
- 不要把机场订阅 URL、节点密码、私钥、日志中的个人账号或设备信息提交到公开 Issue。
- 公开发布前建议再次运行 GitHub Secret Scanning 或本地秘密扫描工具。

## 🙏 第三方资源

脚本运行时会引用 MetaCubeX、blackmatrix7、ACL4SSR、Loyalsoldier、DustinWin、HaGeZi、Koolson/Qure 等公开项目或 CDN 资源。各资源的著作权和许可归原作者所有；请遵守对应项目许可及服务条款。

## ⚠️ 免责声明

本项目仅用于网络配置研究、兼容性测试和个人设备管理，不提供代理节点或订阅服务。使用者应遵守所在地法律法规和网络服务条款，并自行承担配置变更、第三方规则更新及网络可用性带来的风险。

## 📄 许可说明

提交文件中未附带明确的软件许可证，因此本整理包暂不擅自添加 LICENSE。公开发布或允许他人复制、修改、再分发前，建议由代码权利人选择并补充合适的开源许可证。
