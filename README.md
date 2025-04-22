# Sticky Mark

> 个人网页书签管理

## dev logs

### init

```bash
npx create-next-app@latest --use-pnpm
```

### database

使用 [supabase](https://supabase.com/docs)

配置数据库权限添加`policy`; `Policy Command` 选择 `ALL`; `Target Roles` 选择 `anon`; 表示开放所有的权限, 只需通过 api-key 即可操作数据库

## 使用 QQ 邮箱发送邮件

[POP3/IMAP/SMTP 服务](https://wx.mail.qq.com/list/readtemplate?name=app_intro.html#/agreement/authorizationCode)

### 已知的问题

- `next-auth` 无法使用 QQ 邮箱登录
- 部署阶段无法使用 `bcrypt`, 要改为 `bcryptjs`
- [useSearchParams 报错](https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
