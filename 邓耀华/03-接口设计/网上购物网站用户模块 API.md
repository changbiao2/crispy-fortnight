---
title: 网上购物网站用户模块 API
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 网上购物网站用户模块 API

用户注册登录、个人中心、留言系统、在线客服相关接口

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# Default

<a id="opIdregister"></a>

## POST 用户注册

POST /auth/register

> Body 请求参数

```json
{
  "username": "cb123",
  "password": "Abc123456",
  "email": "cb@example.com",
  "phone": "13800138000",
  "code": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRegisterReq](#schemauserregisterreq)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "userId": "u_01j3k4m5n6p7q8r9s0t",
    "username": "cb123",
    "nickname": "小明",
    "avatar": "https://cdn.example.com/avatars/001.jpg",
    "email": "string",
    "phone": "string",
    "status": 1,
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|注册成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|参数错误 / 用户名已存在|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

<a id="opIdlogin"></a>

## POST 用户登录

POST /auth/login

> Body 请求参数

```json
{
  "username": "cb123",
  "password": "Abc123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserLoginReq](#schemauserloginreq)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": "u_01j3k4m5n6p7q8r9s0t",
      "username": "cb123",
      "nickname": "小明",
      "avatar": "https://cdn.example.com/avatars/001.jpg",
      "email": "string",
      "phone": "string",
      "status": 1,
      "createTime": "2019-08-24T14:15:22Z"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|登录成功|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|用户名或密码错误|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

<a id="opIdlogout"></a>

## POST 退出登录

POST /auth/logout

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|退出成功|[ApiResponse](#schemaapiresponse)|

<a id="opIdresetPassword"></a>

## PUT 重置密码

PUT /auth/password

> Body 请求参数

```json
{
  "email": "user@example.com",
  "code": "string",
  "newPassword": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 是 |none|
|» email|body|string(email)| 是 |none|
|» code|body|string| 是 |none|
|» newPassword|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|密码重置成功|[ApiResponse](#schemaapiresponse)|

<a id="opIdgetUserInfo"></a>

## GET 获取当前用户信息

GET /user/info

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "userId": "u_01j3k4m5n6p7q8r9s0t",
    "username": "cb123",
    "nickname": "小明",
    "avatar": "https://cdn.example.com/avatars/001.jpg",
    "email": "string",
    "phone": "string",
    "status": 1,
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

<a id="opIdupdateUserInfo"></a>

## PUT 修改用户信息

PUT /user/info

> Body 请求参数

```json
{
  "nickname": "string",
  "avatar": "http://example.com",
  "email": "user@example.com",
  "phone": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserUpdateReq](#schemauserupdatereq)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "userId": "u_01j3k4m5n6p7q8r9s0t",
    "username": "cb123",
    "nickname": "小明",
    "avatar": "https://cdn.example.com/avatars/001.jpg",
    "email": "string",
    "phone": "string",
    "status": 1,
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|修改成功|Inline|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

<a id="opIdlistAddresses"></a>

## GET 获取我的收货地址列表

GET /address

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "addressId": "string",
      "receiverName": "string",
      "phone": "string",
      "province": "string",
      "city": "string",
      "district": "string",
      "detailAddress": "string",
      "isDefault": false
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

<a id="opIdcreateAddress"></a>

## POST 新增收货地址

POST /address

> Body 请求参数

```json
{
  "receiverName": "string",
  "phone": "string",
  "province": "string",
  "city": "string",
  "district": "string",
  "detailAddress": "string",
  "isDefault": false
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AddressCreateOrUpdateReq](#schemaaddresscreateorupdatereq)| 是 |none|

> 返回示例

> 201 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "addressId": "string",
    "receiverName": "string",
    "phone": "string",
    "province": "string",
    "city": "string",
    "district": "string",
    "detailAddress": "string",
    "isDefault": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|创建成功|Inline|

### 返回数据结构

<a id="opIdupdateAddress"></a>

## PUT 修改收货地址

PUT /address/{addressId}

> Body 请求参数

```json
{
  "receiverName": "string",
  "phone": "string",
  "province": "string",
  "city": "string",
  "district": "string",
  "detailAddress": "string",
  "isDefault": false
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|addressId|path|string| 是 |地址ID|
|body|body|[AddressCreateOrUpdateReq](#schemaaddresscreateorupdatereq)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "addressId": "string",
    "receiverName": "string",
    "phone": "string",
    "province": "string",
    "city": "string",
    "district": "string",
    "detailAddress": "string",
    "isDefault": false
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|修改成功|Inline|

### 返回数据结构

<a id="opIddeleteAddress"></a>

## DELETE 删除收货地址

DELETE /address/{addressId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|addressId|path|string| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|删除成功|[ApiResponse](#schemaapiresponse)|

<a id="opIdlistMessages"></a>

## GET 获取留言列表（分页）

GET /message

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |none|
|pageSize|query|integer| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "total": 0,
    "page": 0,
    "pageSize": 0,
    "list": [
      {
        "messageId": "string",
        "userId": "string",
        "username": "string",
        "avatar": "string",
        "content": "string",
        "parentId": "string",
        "createTime": "2019-08-24T14:15:22Z"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

<a id="opIdcreateMessage"></a>

## POST 发表留言

POST /message

> Body 请求参数

```json
{
  "content": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 是 |none|
|» content|body|string| 是 |none|

> 返回示例

> 201 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "messageId": "string",
    "userId": "string",
    "username": "string",
    "avatar": "string",
    "content": "string",
    "parentId": "string",
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|发表成功|Inline|

### 返回数据结构

<a id="opIdreplyMessage"></a>

## POST 回复留言

POST /message/{messageId}/reply

> Body 请求参数

```json
{
  "content": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|messageId|path|string| 是 |要回复的父留言ID|
|body|body|object| 是 |none|
|» content|body|string| 是 |none|

> 返回示例

> 201 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "messageId": "string",
    "userId": "string",
    "username": "string",
    "avatar": "string",
    "content": "string",
    "parentId": "string",
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|回复成功|Inline|

### 返回数据结构

<a id="opIdgetChatHistory"></a>

## GET 获取某会话的聊天记录

GET /chat/history

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|conversationId|query|string| 是 |会话ID|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "recordId": "string",
      "conversationId": "string",
      "senderType": 1,
      "senderId": "string",
      "senderName": "string",
      "content": "string",
      "createTime": "2019-08-24T14:15:22Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|senderType|1|
|senderType|2|

<a id="opIdsendChatMessage"></a>

## POST 发送客服消息

POST /chat/send

> Body 请求参数

```json
{
  "conversationId": "string",
  "content": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 是 |none|
|» conversationId|body|string| 是 |none|
|» content|body|string| 是 |none|

> 返回示例

> 201 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "recordId": "string",
    "conversationId": "string",
    "senderType": 1,
    "senderId": "string",
    "senderName": "string",
    "content": "string",
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|发送成功|Inline|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|senderType|1|
|senderType|2|

# 数据模型

<h2 id="tocS_ApiResponse">ApiResponse</h2>

<a id="schemaapiresponse"></a>
<a id="schema_ApiResponse"></a>
<a id="tocSapiresponse"></a>
<a id="tocsapiresponse"></a>

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|true|none||none|
|message|string|true|none||none|
|data|object¦null|false|none||none|

<h2 id="tocS_ErrorResponse">ErrorResponse</h2>

<a id="schemaerrorresponse"></a>
<a id="schema_ErrorResponse"></a>
<a id="tocSerrorresponse"></a>
<a id="tocserrorresponse"></a>

```json
{
  "code": 400,
  "message": "用户名已存在",
  "data": null
}

```

### 属性

allOf

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[ApiResponse](#schemaapiresponse)|false|none||none|

and

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|object|false|none||none|
|» data|null|false|none||none|

<h2 id="tocS_UserRegisterReq">UserRegisterReq</h2>

<a id="schemauserregisterreq"></a>
<a id="schema_UserRegisterReq"></a>
<a id="tocSuserregisterreq"></a>
<a id="tocsuserregisterreq"></a>

```json
{
  "username": "cb123",
  "password": "Abc123456",
  "email": "cb@example.com",
  "phone": "13800138000",
  "code": "123456"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|true|none||none|
|password|string|true|none||none|
|email|string(email)|false|none||none|
|phone|string|false|none||none|
|code|string|false|none||邮箱或手机验证码（视注册方式而定）|

<h2 id="tocS_UserLoginReq">UserLoginReq</h2>

<a id="schemauserloginreq"></a>
<a id="schema_UserLoginReq"></a>
<a id="tocSuserloginreq"></a>
<a id="tocsuserloginreq"></a>

```json
{
  "username": "cb123",
  "password": "Abc123456"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|true|none||none|
|password|string|true|none||none|

<h2 id="tocS_UserLoginResp">UserLoginResp</h2>

<a id="schemauserloginresp"></a>
<a id="schema_UserLoginResp"></a>
<a id="tocSuserloginresp"></a>
<a id="tocsuserloginresp"></a>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "u_01j3k4m5n6p7q8r9s0t",
    "username": "cb123",
    "nickname": "小明",
    "avatar": "https://cdn.example.com/avatars/001.jpg",
    "email": "string",
    "phone": "string",
    "status": 1,
    "createTime": "2019-08-24T14:15:22Z"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|token|string|false|none||none|
|user|[UserInfo](#schemauserinfo)|false|none||none|

<h2 id="tocS_UserInfo">UserInfo</h2>

<a id="schemauserinfo"></a>
<a id="schema_UserInfo"></a>
<a id="tocSuserinfo"></a>
<a id="tocsuserinfo"></a>

```json
{
  "userId": "u_01j3k4m5n6p7q8r9s0t",
  "username": "cb123",
  "nickname": "小明",
  "avatar": "https://cdn.example.com/avatars/001.jpg",
  "email": "string",
  "phone": "string",
  "status": 1,
  "createTime": "2019-08-24T14:15:22Z"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|userId|string|false|none||none|
|username|string|false|none||none|
|nickname|string¦null|false|none||none|
|avatar|string¦null|false|none||none|
|email|string¦null|false|none||none|
|phone|string¦null|false|none||none|
|status|integer|false|none||none|
|createTime|string(date-time)|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

<h2 id="tocS_UserUpdateReq">UserUpdateReq</h2>

<a id="schemauserupdatereq"></a>
<a id="schema_UserUpdateReq"></a>
<a id="tocSuserupdatereq"></a>
<a id="tocsuserupdatereq"></a>

```json
{
  "nickname": "string",
  "avatar": "http://example.com",
  "email": "user@example.com",
  "phone": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|nickname|string|false|none||none|
|avatar|string(uri)|false|none||none|
|email|string(email)|false|none||none|
|phone|string|false|none||none|

<h2 id="tocS_Address">Address</h2>

<a id="schemaaddress"></a>
<a id="schema_Address"></a>
<a id="tocSaddress"></a>
<a id="tocsaddress"></a>

```json
{
  "addressId": "string",
  "receiverName": "string",
  "phone": "string",
  "province": "string",
  "city": "string",
  "district": "string",
  "detailAddress": "string",
  "isDefault": false
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|addressId|string|true|none||none|
|receiverName|string|true|none||none|
|phone|string|true|none||none|
|province|string|false|none||none|
|city|string|false|none||none|
|district|string|false|none||none|
|detailAddress|string|true|none||none|
|isDefault|boolean|false|none||none|

<h2 id="tocS_AddressCreateOrUpdateReq">AddressCreateOrUpdateReq</h2>

<a id="schemaaddresscreateorupdatereq"></a>
<a id="schema_AddressCreateOrUpdateReq"></a>
<a id="tocSaddresscreateorupdatereq"></a>
<a id="tocsaddresscreateorupdatereq"></a>

```json
{
  "receiverName": "string",
  "phone": "string",
  "province": "string",
  "city": "string",
  "district": "string",
  "detailAddress": "string",
  "isDefault": false
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|receiverName|string|true|none||none|
|phone|string|true|none||none|
|province|string|false|none||none|
|city|string|false|none||none|
|district|string|false|none||none|
|detailAddress|string|true|none||none|
|isDefault|boolean|false|none||none|

<h2 id="tocS_Message">Message</h2>

<a id="schemamessage"></a>
<a id="schema_Message"></a>
<a id="tocSmessage"></a>
<a id="tocsmessage"></a>

```json
{
  "messageId": "string",
  "userId": "string",
  "username": "string",
  "avatar": "string",
  "content": "string",
  "parentId": "string",
  "createTime": "2019-08-24T14:15:22Z"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|messageId|string|false|none||none|
|userId|string|false|none||none|
|username|string|false|none||none|
|avatar|string¦null|false|none||none|
|content|string|false|none||none|
|parentId|string¦null|false|none||none|
|createTime|string(date-time)|false|none||none|

<h2 id="tocS_MessagePageResp">MessagePageResp</h2>

<a id="schemamessagepageresp"></a>
<a id="schema_MessagePageResp"></a>
<a id="tocSmessagepageresp"></a>
<a id="tocsmessagepageresp"></a>

```json
{
  "total": 0,
  "page": 0,
  "pageSize": 0,
  "list": [
    {
      "messageId": "string",
      "userId": "string",
      "username": "string",
      "avatar": "string",
      "content": "string",
      "parentId": "string",
      "createTime": "2019-08-24T14:15:22Z"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|total|integer|false|none||none|
|page|integer|false|none||none|
|pageSize|integer|false|none||none|
|list|[[Message](#schemamessage)]|false|none||none|

<h2 id="tocS_ChatMessage">ChatMessage</h2>

<a id="schemachatmessage"></a>
<a id="schema_ChatMessage"></a>
<a id="tocSchatmessage"></a>
<a id="tocschatmessage"></a>

```json
{
  "recordId": "string",
  "conversationId": "string",
  "senderType": 1,
  "senderId": "string",
  "senderName": "string",
  "content": "string",
  "createTime": "2019-08-24T14:15:22Z"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|recordId|string|false|none||none|
|conversationId|string|false|none||none|
|senderType|integer|false|none||1=用户 2=客服|
|senderId|string|false|none||none|
|senderName|string¦null|false|none||none|
|content|string|false|none||none|
|createTime|string(date-time)|false|none||none|

#### 枚举值

|属性|值|
|---|---|
|senderType|1|
|senderType|2|

