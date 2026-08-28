# 更新记录

这里记录本次提交的 v57、v58 与 v61 三份脚本之间的主要差异。更早的细粒度历史仍保留在每个 JavaScript 文件头部。

## V61 — 快速故障切换与规则维护修正版（2026-08-28）

- 缩短核心自动组、地区自动组和全球家宽组的检测周期与超时。
- 增加 `max-failed-times`，降低坏节点持续占用连接的时间。
- 统一使用 HTTP 204 健康检查。
- 修复精确硬拦截规则被宽泛业务规则覆盖的优先级问题。
- 规范 `fake-ip-filter-mode: rule` 的规则语法，并兼容原 whitelist 语义。
- 删除未被最终规则引用的 rule-provider，减少 46 个无效资源的下载与刷新。
- 保留 v60 Microsoft UWP、v59 Xbox、v58 中国访问、v57 迅雷以及既有节点与业务分流逻辑。

## V60 — FlClash Microsoft UWP 真实 IP 兼容修复（2026-08-20）

- 将微软商店、账号、Windows、Office 与 Xbox 核心域名加入真实 IP 例外。
- 真实 IP 只改变 DNS 应答，流量仍按原规则进入微软策略组。
- 补充境外 DNS 策略与强制域名嗅探，改善 Windows UWP 在 TUN/Fake-IP 下的兼容性。

## V59 — Xbox / Microsoft 全链路统一兼容修复（2026-08-20）

- Xbox Android/PC App、Gaming Services、Game Bar 与 Microsoft Store 统一进入 `Ⓜ️ 微软服务`。
- 补齐 Xbox Live、XSTS、商店、授权、购买、推送与图片链路。
- Windows NCSI 与 Teredo/IPv6 探测保持直连。
- 避免同一登录会话被拆到游戏、微软和工具等多个出口。

## V58 — 中国域名与 App 兼容修复（2026-08-13）

- 修复 `119.29.29.29` 被香港流媒体 IP 规则抢走的问题。
- 国内 DNS/DoH 端点最高优先级直连。
- `.cn`、中文顶级域名与中国规则集使用 AliDNS + DNSPod 双国内 DoH。
- 最终 `GEOIP,CN` 兜底允许真实 IP 解析，降低国内 App 批量失败和误拦截。
- 保留 MineRadio 音乐分流、迅雷直连、ASN 修复与既有策略组结构。

## V57.1 — MineRadio 音乐分流修复（2026-08-11）

- 将 `mineradio.cn` 及子域名统一送入 `🎧 音乐流媒体`。
- 不新增策略组，不改动迅雷、DNS、自动测速或其他业务分流。

## V57 — 迅雷全链路直连修复（2026-08-10）

- 迅雷官网、账号、会员、云盘、下载/CDN、P2P 与官方客户端进程优先直连。
- 迅雷核心域名使用 AliDNS + DNSPod 国内 DoH。
- 迅雷域名加入 Fake-IP 过滤与嗅探跳过列表，改善断点续传、签名下载与 P2P 链路。
- 不新增策略组或规则源，不改变其他业务默认选择。
