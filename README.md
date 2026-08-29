# 🚀 FlClash V 系列 / 巨无霸脚本仓库

> 面向 FlClash、FlyClash、Bettbox 与标准 Mihomo 内核的覆写脚本仓库。  
> 本仓库包含轻量 V 系列脚本说明，也包含巨无霸系列使用说明。

![FlClash](https://img.shields.io/badge/FlClash-%E2%89%A5%200.8.85-5B8FF9?style=flat-square)
![Mihomo](https://img.shields.io/badge/Core-Mihomo-00B894?style=flat-square)
![JavaScript](https://img.shields.io/badge/Override-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
![V Series](https://img.shields.io/badge/V%20Series-Lightweight-00B894?style=flat-square)
![Jumbo](https://img.shields.io/badge/Jumbo-Heavy%20Rules-FF7675?style=flat-square)

---

## ⚠️ 重要提醒：巨无霸脚本不是给所有人用的

**巨无霸17号属于超大体积、超多规则、强兼容补丁型脚本。**  
它不是普通轻量脚本，不建议新手或老设备直接使用。

请先看清楚风险：

- **规则非常庞大**：巨无霸系列包含大量内联规则和专项补丁，体积远大于 V 系列。
- **老设备慎用**：低内存、老 CPU、旧安卓设备、低端机可能出现 FlClash/FlyClash/Bettbox 卡顿、加载很慢，甚至软件卡死或闪退。
- **刷新配置更慢**：规则多、provider 多、DNS/Fake-IP/Sniffer 逻辑多，刷新订阅和启动配置可能明显慢于轻量脚本。
- **广告屏蔽规则较多**：广告、威胁、隐私、反追踪规则强度较高，某些 App 登录、注册、支付、风控、验证码或网页组件可能被误杀。
- **需要会看日志**：遇到 App 打不开时，必须能看 FlClash 日志，判断是 DNS、节点、规则、广告拦截、Fake-IP、TUN 还是 App 自身问题。
- **不建议盲目使用**：如果你不是高手，或者不愿意排查日志，建议不要直接用巨无霸系列。

### ✅ 普通用户推荐

大多数用户请直接使用轻量 V 系列：

```text
FlClash-V61.js
```

V 系列更适合日常使用：

- 更轻量；
- 更省电；
- 更少卡顿；
- 更适合普通设备；
- 更适合新手；
- 出问题时更容易排查。

### 🧠 巨无霸系列适合谁？

巨无霸系列更适合：

- 会看 Clash/Mihomo/FlClash 日志的人；
- 愿意按日志逐条修复误杀的人；
- 设备性能较强、内存充足的人；
- 需要大量 App 专项兼容补丁的人；
- 能接受脚本庞大、启动慢、偶发误杀的人。

一句话：

```text
新手、老设备、只想稳定省心 → 用 V 系列
高手、强设备、愿意看日志排查 → 再考虑巨无霸系列
```

---

## 📌 当前仓库文件说明

```text
.
├── FlClash-V61.js                     # 推荐入口：轻量 V 系列，普通用户优先使用
├── README.md                          # 仓库主页说明
├── CHANGELOG.md                       # V 系列变更摘要
├── SHA256SUMS.txt                     # 文件完整性校验
├── 巨无霸17号-使用说明.md              # 巨无霸17号详细说明与风险提示
└── versions/
    ├── FlClash-V57-Xunlei-Direct.js
    ├── FlClash-V58-China-Compatibility.js
    └── FlClash-V61-Fast-Failover.js
```

> 注意：如果仓库里没有看到 `巨无霸17号.js` 或 `巨无霸17号.js.zip`，说明脚本本体尚未上传到仓库。当前 GitHub 插件可以更新文本说明，但大体积脚本/ZIP 建议由仓库所有者在 GitHub 网页手动上传。

---

## 🚀 推荐入口：V 系列脚本

新用户、普通用户、老设备用户，优先使用：

```text
FlClash-V61.js
```

GitHub Raw：

```text
https://raw.githubusercontent.com/Wuzhenshi8874/flclash-v-series/main/FlClash-V61.js
```

jsDelivr：

```text
https://cdn.jsdelivr.net/gh/Wuzhenshi8874/flclash-v-series@main/FlClash-V61.js
```

V 系列定位：

- 轻量；
- 好用；
- 省电；
- 稳定；
- 不复制巨无霸全量内联规则；
- 不盲目增加超大规则表；
- 保留必要的实际兼容修复。

---

## 🧱 巨无霸17号说明

巨无霸17号是在巨无霸16号基础上同步 V61 骨架维护能力的重型脚本。

它保留了巨无霸系列历史专项修复，例如：

| 场景 | 说明 |
|---|---|
| TikTok | 独立 TikTok 分组、局域网代理兼容、修改版依赖归组 |
| OKX / 欧易 | 主域名、Web3、行情、备用域名统一进入加密货币分组 |
| giffgaff | 登录页 Dynamic Yield / OneTrust 兼容修复 |
| 小米 HyperOS OTA | 系统更新 OTA 域名和下载辅助链路精准直连 |
| NoOnes | Google 登录链路与 LAMS 二次修复 |
| iFAST GB | 金融登录链路专项保护 |
| Neverless | 金融 App 启动与登录误杀修复 |
| Google Play | GMS/GSF/下载 CDN/系统下载器统一保护 |
| Microsoft / Xbox | 微软商店、Xbox、UWP、登录链路兼容 |
| 迅雷 | 官网、会员、云盘、下载/CDN、客户端链路直连 |
| YouTube | RVX/ReVanced/Morphe、字幕与自动翻译链路补强 |
| ModelFlare | OpenAI 兼容中转域名分流修复 |

但是，巨无霸17号风险也更高：

```text
规则越多 → 启动越慢
广告规则越强 → 误杀概率越高
补丁越多 → 排查门槛越高
内联规则越大 → 老设备越容易卡
```

所以请不要把巨无霸17号当成“所有人默认推荐脚本”。

---

## 🧭 FlClash 导入教程

### 第 1 步：创建覆写脚本

进入：

```text
FlClash → 配置 → 覆写脚本 → 右上角「+」
```

输入名称，例如：

```text
V61 动态分流
```

或者：

```text
巨无霸17号
```

### 第 2 步：导入脚本

#### V 系列 URL 导入

```text
https://raw.githubusercontent.com/Wuzhenshi8874/flclash-v-series/main/FlClash-V61.js
```

国内访问 GitHub Raw 不稳定时，可使用：

```text
https://cdn.jsdelivr.net/gh/Wuzhenshi8874/flclash-v-series@main/FlClash-V61.js
```

#### 手动粘贴

1. 打开脚本文件；
2. 点击 Raw；
3. 全选复制；
4. 粘贴到 FlClash 覆写脚本编辑器；
5. 保存。

如果出现：

```text
SyntaxError: unexpected token '<'
```

通常表示复制到了 GitHub 网页 HTML，而不是 Raw JS 源码。

### 第 3 步：关联订阅

只创建脚本没有用，必须关联订阅：

```text
配置页 → 订阅卡片右上角「⋮」→ 更多 → 覆写
       → 选择脚本 → 确定 → 下拉刷新
```

忘了这一步，脚本不会生效。

---

## ✅ 导入后检查

导入后先检查：

- 是否出现 `🎯 节点选择`；
- 是否出现 AI、Google Play、TikTok、加密货币、金融支付、微软服务等业务组；
- 日志里是否有 `SyntaxError`；
- 日志里是否有 `proxy not found`；
- 日志里是否有 `rule provider not found`；
- 节点是否能正常测速；
- 国内网站是否能直连；
- 境外网站是否能代理；
- 广告拦截是否按预期命中。

---

## 🎛️ 推荐设置

### 普通日常

```text
🎯 节点选择 → 🚀 自动优选
🛡️ 广告拦截 → REJECT
🐟 漏网之鱼 → 🎯 节点选择
```

### 登录、支付、金融、账号验证

登录银行、交易所、giffgaff、Google、Microsoft、OpenAI 等账号时，建议临时固定相关分组到同一个稳定节点，避免中途换 IP：

```text
🤖 AI 服务
🛒 Google Play
💳 金融支付
₿ 加密货币
Ⓜ️ 微软服务
🌍 国外网站
```

### 误杀排查

如果某个 App 登录失败，可以临时把：

```text
🛡️ 广告拦截 → DIRECT
```

测试一次。  
如果恢复，说明大概率是广告/隐私/威胁规则误杀。确认后应精准加白名单，不建议长期关闭广告拦截。

---

## 🔧 常见问题

### 脚本保存了但没生效

通常是没关联订阅。重新执行：

```text
订阅卡片 → 更多 → 覆写 → 选择脚本 → 刷新订阅
```

### 老设备卡死怎么办？

如果使用巨无霸系列出现卡顿、卡死、闪退、刷新非常慢，直接换回：

```text
FlClash-V61.js
```

不要在老设备上硬扛巨无霸脚本。

### App 登录失败怎么办？

先看日志，不要乱加规则。重点看：

```text
REJECT
广告拦截
hagezi-tif
anti-ad
DNS failed
context deadline exceeded
proxy not found
```

如果不会看日志，建议使用 V 系列，不建议使用巨无霸系列。

### GitHub Raw 打不开怎么办？

可尝试：

```text
https://cdn.jsdelivr.net/gh/Wuzhenshi8874/flclash-v-series@main/FlClash-V61.js
```

或者先开代理，再打开 Raw。

---

## 🛡️ 安全提醒

- 不要公开上传含订阅 token 的日志；
- 不要把机场订阅链接写进 GitHub；
- 不要把银行卡、手机号、邮箱、Cookie、API Key、助记词、私钥写进 issue；
- 钱包、OKX、银行 App 出问题时，不要随便清除应用数据；
- 不确定的规则不要乱删；
- 不会排查日志时，优先使用 V 系列。

---

## 🧯 回滚方法

如果导入后出现问题：

1. 打开 FlClash 配置页；
2. 找到订阅卡片；
3. 进入 `更多 → 覆写`；
4. 取消当前脚本或切回旧版；
5. 下拉刷新订阅；
6. 重启 FlClash。

建议每次升级前保存上一版脚本。

---

## 🧠 维护原则

本仓库脚本维护原则：

```text
轻量优先
稳定优先
日志优先
少动优先
不乱删旧规则
不粗暴放行大域名
不为一个 App 牺牲整套安全规则
不确定就先看日志
```

V 系列继续作为普通用户推荐入口。  
巨无霸系列只建议高手、强设备和愿意看日志排查的人使用。