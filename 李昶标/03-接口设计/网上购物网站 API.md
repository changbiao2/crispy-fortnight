---
title: 网上购物网站 API
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

# 网上购物网站 API

## 概述
网上购物网站的商品展示、查询、购物车模块 RESTful API 接口文档。

## 模块说明
- **商品模块**：商品列表、商品详情、商品搜索
- **购物车模块**：购物车查看、添加、修改、删除、清空

## 认证方式
购物车相关接口需要在请求头中携带 `Authorization: Bearer {token}`

## 统一响应格式
```json
{
  "code": 200,
  "message": "操作成功",
  "data": { ... }
}
```

## 状态码说明
| 状态码 | 说明 |
|--------|------|
| 200 | 操作成功 |
| 400 | 请求参数错误 |
| 401 | 未登录或 token 过期 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

Base URLs:

Email: <a href="mailto:team@shopping.com">开发团队</a> 

# Authentication

- HTTP Authentication, scheme: bearer<br/>JWT Token 认证，格式：`Bearer {token}`
登录成功后获取 token，购物车相关接口需要携带此 token

# 商品管理

<a id="opIdgetProductList"></a>

## GET 获取商品列表

GET /api/products

分页获取商品列表，支持按分类筛选、关键词搜索、价格区间过滤、排序等功能。
不需要登录即可访问。

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|categoryId|query|string| 否 |分类ID，传入则只返回该分类下的商品|
|keyword|query|string| 否 |搜索关键词，模糊匹配商品名称和描述|
|minPrice|query|number(double)| 否 |最低价格（包含）|
|maxPrice|query|number(double)| 否 |最高价格（包含）|
|sortBy|query|string| 否 |排序字段：|
|sortOrder|query|string| 否 |排序方式：|
|page|query|integer| 否 |页码，从1开始|
|pageSize|query|integer| 否 |每页数量，最大50|

#### 详细说明

**sortBy**: 排序字段：
- `price` 按价格排序
- `sales` 按销量排序
- `createTime` 按上架时间排序

**sortOrder**: 排序方式：
- `asc` 升序
- `desc` 降序

#### 枚举值

|属性|值|
|---|---|
|sortBy|price|
|sortBy|sales|
|sortBy|createTime|
|sortOrder|asc|
|sortOrder|desc|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10,
    "list": [
      {
        "productId": "PROD001",
        "name": "iPhone 15 Pro",
        "categoryId": "CAT004",
        "categoryName": "手机",
        "price": 8999,
        "stock": 100,
        "description": "Apple iPhone 15 Pro 256GB",
        "imageUrl": "/images/iphone15.jpg",
        "status": 1,
        "createTime": "2026-01-15 10:30:00"
      },
      {
        "productId": "PROD002",
        "name": "MacBook Pro 14",
        "categoryId": "CAT005",
        "categoryName": "电脑",
        "price": 14999,
        "stock": 50,
        "description": "Apple MacBook Pro 14英寸 M3芯片",
        "imageUrl": "/images/macbook14.jpg",
        "status": 1,
        "createTime": "2026-01-10 09:00:00"
      }
    ]
  }
}
```

> 400 Response

```json
{
  "code": 400,
  "message": "价格区间参数错误，minPrice不能大于maxPrice",
  "data": null
}
```

> 500 Response

```json
{
  "code": 500,
  "message": "服务器内部错误",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误|[ErrorResponse](#schemaerrorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|服务器内部错误|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

状态码 **400**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

状态码 **500**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

<a id="opIdgetProductDetail"></a>

## GET 获取商品详情

GET /api/products/{productId}

根据商品ID获取商品的完整详细信息，包括商品基本信息和图片列表。
不需要登录即可访问。

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|productId|path|string| 是 |商品ID|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "productId": "PROD001",
    "name": "iPhone 15 Pro",
    "categoryId": "CAT004",
    "categoryName": "手机",
    "price": 8999,
    "stock": 100,
    "description": "Apple iPhone 15 Pro 256GB 原色钛金属，A17 Pro芯片，4800万像素主摄",
    "imageUrl": "/images/iphone15.jpg",
    "images": [
      {
        "imageId": "IMG001",
        "imageUrl": "/images/iphone15_1.jpg",
        "sortOrder": 1
      },
      {
        "imageId": "IMG002",
        "imageUrl": "/images/iphone15_2.jpg",
        "sortOrder": 2
      },
      {
        "imageId": "IMG003",
        "imageUrl": "/images/iphone15_3.jpg",
        "sortOrder": 3
      }
    ],
    "status": 1,
    "createTime": "2026-01-15 10:30:00",
    "updateTime": "2026-02-20 14:20:00"
  }
}
```

> 404 Response

```json
{
  "code": 404,
  "message": "商品不存在",
  "data": null
}
```

> 500 Response

```json
{
  "code": 500,
  "message": "服务器内部错误",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|商品不存在|[ErrorResponse](#schemaerrorresponse)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|服务器内部错误|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

状态码 **404**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

状态码 **500**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

<a id="opIdsearchProducts"></a>

## GET 搜索商品

GET /api/products/search

根据关键词搜索商品，模糊匹配商品名称和描述。
不需要登录即可访问。

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 是 |搜索关键词（必填）|
|page|query|integer| 否 |页码，从1开始|
|pageSize|query|integer| 否 |每页数量，最大50|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "搜索成功",
  "data": {
    "total": 2,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1,
    "list": [
      {
        "productId": "PROD004",
        "name": "华为 Mate 60 Pro",
        "categoryId": "CAT004",
        "categoryName": "手机",
        "price": 6999,
        "stock": 80,
        "description": "华为 Mate 60 Pro 512GB 雅丹黑",
        "imageUrl": "/images/mate60.jpg",
        "status": 1,
        "createTime": "2026-01-12 15:00:00"
      }
    ]
  }
}
```

> 400 Response

```json
{
  "code": 400,
  "message": "搜索关键词不能为空",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|搜索成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

状态码 **400**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

# 购物车管理

<a id="opIdgetCartList"></a>

## GET 获取购物车列表

GET /api/cart

获取当前登录用户的购物车商品列表，包含每个商品的小计和购物车总价。
**需要登录**。

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "items": [
      {
        "cartId": "CART001",
        "productId": "PROD001",
        "productName": "iPhone 15 Pro",
        "productImage": "/images/iphone15.jpg",
        "price": 8999,
        "quantity": 1,
        "subtotal": 8999,
        "stock": 100,
        "status": 1
      },
      {
        "cartId": "CART002",
        "productId": "PROD003",
        "productName": "AirPods Pro 2",
        "productImage": "/images/airpods.jpg",
        "price": 1799,
        "quantity": 2,
        "subtotal": 3598,
        "stock": 200,
        "status": 1
      },
      {
        "cartId": "CART003",
        "productId": "PROD008",
        "productName": "三只松鼠坚果礼盒",
        "productImage": "/images/nuts.jpg",
        "price": 128,
        "quantity": 3,
        "subtotal": 384,
        "stock": 1000,
        "status": 1
      }
    ],
    "totalCount": 3,
    "totalQuantity": 6,
    "totalAmount": 12981
  }
}
```

> 401 Response

```json
{
  "code": 401,
  "message": "请先登录",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|未登录或token过期|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

状态码 **401**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

<a id="opIdaddToCart"></a>

## POST 添加商品到购物车

POST /api/cart

将指定商品添加到当前用户的购物车中。
- 如果购物车中已有该商品，则累加数量
- 添加前会检查商品库存是否充足
- **需要登录**

> Body 请求参数

```json
{
  "productId": "PROD001",
  "quantity": 1
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[AddCartRequest](#schemaaddcartrequest)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "cartId": "CART008",
    "productId": "PROD001",
    "productName": "iPhone 15 Pro",
    "productImage": "/images/iphone15.jpg",
    "price": 8999,
    "quantity": 1,
    "subtotal": 8999,
    "stock": 100,
    "status": 1
  }
}
```

> 请求参数错误

```json
{
  "code": 400,
  "message": "商品ID不能为空",
  "data": null
}
```

```json
{
  "code": 400,
  "message": "商品数量必须大于0",
  "data": null
}
```

```json
{
  "code": 400,
  "message": "商品库存不足，当前库存：5",
  "data": null
}
```

> 401 Response

```json
{
  "code": 401,
  "message": "请先登录",
  "data": null
}
```

> 404 Response

```json
{
  "code": 404,
  "message": "商品不存在或已下架",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|添加成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误|[ErrorResponse](#schemaerrorresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|未登录|[ErrorResponse](#schemaerrorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|商品不存在|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

状态码 **400**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

状态码 **401**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

状态码 **404**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

<a id="opIdupdateCartQuantity"></a>

## PUT 修改购物车商品数量

PUT /api/cart/{cartId}

修改购物车中指定商品的数量。
- 数量必须大于0
- 修改前会检查商品库存是否充足
- 修改后自动重新计算小计金额
- **需要登录**

> Body 请求参数

```json
{
  "quantity": 3
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|cartId|path|string| 是 |购物车项ID|
|body|body|[UpdateCartRequest](#schemaupdatecartrequest)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": {
    "cartId": "CART001",
    "productId": "PROD001",
    "productName": "iPhone 15 Pro",
    "productImage": "/images/iphone15.jpg",
    "price": 8999,
    "quantity": 3,
    "subtotal": 26997,
    "stock": 100,
    "status": 1
  }
}
```

> 请求参数错误

```json
{
  "code": 400,
  "message": "商品数量必须大于0",
  "data": null
}
```

```json
{
  "code": 400,
  "message": "商品库存不足，当前库存：5，请求数量：10",
  "data": null
}
```

> 401 Response

```json
{
  "code": 401,
  "message": "请先登录",
  "data": null
}
```

> 404 Response

```json
{
  "code": 404,
  "message": "购物车中未找到该商品",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|修改成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误|[ErrorResponse](#schemaerrorresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|未登录|[ErrorResponse](#schemaerrorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|购物车项不存在|[ErrorResponse](#schemaerrorresponse)|

### 返回数据结构

状态码 **400**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

状态码 **401**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

状态码 **404**

*错误响应格式*

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||错误状态码|
|» message|string|true|none||错误提示信息|
|» data|object¦null|false|none||错误详情（通常为null）|

<a id="opIddeleteCartItem"></a>

## DELETE 删除购物车商品

DELETE /api/cart/{cartId}

从购物车中删除指定的商品项。
- 删除后自动重新计算购物车总价
- **需要登录**

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|cartId|path|string| 是 |购物车项ID|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

> 401 Response

```json
{
  "code": 401,
  "message": "请先登录",
  "data": null
}
```

> 404 Response

```json
{
  "code": 404,
  "message": "购物车中未找到该商品",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|删除成功|[ApiResponse](#schemaapiresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|未登录|[ErrorResponse](#schemaerrorresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|购物车项不存在|[ErrorResponse](#schemaerrorresponse)|

<a id="opIdclearCart"></a>

## DELETE 清空购物车

DELETE /api/cart/clear

清空当前用户购物车中的所有商品。
- 清空后购物车为空
- **需要登录**

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "购物车已清空",
  "data": null
}
```

> 401 Response

```json
{
  "code": 401,
  "message": "请先登录",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|清空成功|[ApiResponse](#schemaapiresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|未登录|[ErrorResponse](#schemaerrorresponse)|

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

统一API响应格式

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|true|none||响应状态码：<br />- 200 操作成功<br />- 400 请求参数错误<br />- 401 未登录或token过期<br />- 403 无权限<br />- 404 资源不存在<br />- 500 服务器内部错误|
|message|string|true|none||响应提示信息|
|data|object¦null|false|none||响应数据（具体类型根据接口不同而不同）|

<h2 id="tocS_ErrorResponse">ErrorResponse</h2>

<a id="schemaerrorresponse"></a>
<a id="schema_ErrorResponse"></a>
<a id="tocSerrorresponse"></a>
<a id="tocserrorresponse"></a>

```json
{
  "code": 400,
  "message": "请求参数错误",
  "data": null
}

```

错误响应格式

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|true|none||错误状态码|
|message|string|true|none||错误提示信息|
|data|object¦null|false|none||错误详情（通常为null）|

<h2 id="tocS_Product">Product</h2>

<a id="schemaproduct"></a>
<a id="schema_Product"></a>
<a id="tocSproduct"></a>
<a id="tocsproduct"></a>

```json
{
  "productId": "PROD001",
  "name": "iPhone 15 Pro",
  "categoryId": "CAT004",
  "categoryName": "手机",
  "price": 8999,
  "stock": 100,
  "description": "Apple iPhone 15 Pro 256GB 原色钛金属",
  "imageUrl": "/images/iphone15.jpg",
  "status": 1,
  "createTime": "2026-01-15 10:30:00"
}

```

商品信息

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|productId|string|false|none||商品ID|
|name|string|false|none||商品名称|
|categoryId|string|false|none||分类ID|
|categoryName|string|false|none||分类名称|
|price|number(double)|false|none||商品价格（单位：元）|
|stock|integer|false|none||库存数量|
|description|string|false|none||商品描述|
|imageUrl|string|false|none||商品主图URL|
|status|integer|false|none||商品状态：<br />- 1 上架<br />- 0 下架|
|createTime|string(date-time)|false|none||创建时间|

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

<h2 id="tocS_ProductDetail">ProductDetail</h2>

<a id="schemaproductdetail"></a>
<a id="schema_ProductDetail"></a>
<a id="tocSproductdetail"></a>
<a id="tocsproductdetail"></a>

```json
{
  "productId": "PROD001",
  "name": "iPhone 15 Pro",
  "categoryId": "CAT004",
  "categoryName": "手机",
  "price": 8999,
  "stock": 100,
  "description": "Apple iPhone 15 Pro 256GB 原色钛金属",
  "imageUrl": "/images/iphone15.jpg",
  "status": 1,
  "createTime": "2026-01-15 10:30:00",
  "images": [
    {
      "imageId": "IMG001",
      "imageUrl": "/images/iphone15_1.jpg",
      "sortOrder": 1
    }
  ],
  "updateTime": "2026-02-20 14:20:00"
}

```

### 属性

allOf

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|[Product](#schemaproduct)|false|none||商品信息|

and

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|*anonymous*|object|false|none||none|
|» images|[[ProductImage](#schemaproductimage)]|false|none||商品图片列表|
|» updateTime|string(date-time)|false|none||最后更新时间|

<h2 id="tocS_ProductImage">ProductImage</h2>

<a id="schemaproductimage"></a>
<a id="schema_ProductImage"></a>
<a id="tocSproductimage"></a>
<a id="tocsproductimage"></a>

```json
{
  "imageId": "IMG001",
  "imageUrl": "/images/iphone15_1.jpg",
  "sortOrder": 1
}

```

商品图片信息

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|imageId|string|false|none||图片ID|
|imageUrl|string|false|none||图片URL地址|
|sortOrder|integer|false|none||排序号（数字越小越靠前）|

<h2 id="tocS_ProductPageResult">ProductPageResult</h2>

<a id="schemaproductpageresult"></a>
<a id="schema_ProductPageResult"></a>
<a id="tocSproductpageresult"></a>
<a id="tocsproductpageresult"></a>

```json
{
  "total": 100,
  "page": 1,
  "pageSize": 10,
  "totalPages": 10,
  "list": [
    {
      "productId": "PROD001",
      "name": "iPhone 15 Pro",
      "categoryId": "CAT004",
      "categoryName": "手机",
      "price": 8999,
      "stock": 100,
      "description": "Apple iPhone 15 Pro 256GB 原色钛金属",
      "imageUrl": "/images/iphone15.jpg",
      "status": 1,
      "createTime": "2026-01-15 10:30:00"
    }
  ]
}

```

商品列表分页查询结果

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|total|integer|false|none||总记录数|
|page|integer|false|none||当前页码|
|pageSize|integer|false|none||每页数量|
|totalPages|integer|false|none||总页数|
|list|[[Product](#schemaproduct)]|false|none||商品列表|

<h2 id="tocS_CartItem">CartItem</h2>

<a id="schemacartitem"></a>
<a id="schema_CartItem"></a>
<a id="tocScartitem"></a>
<a id="tocscartitem"></a>

```json
{
  "cartId": "CART001",
  "productId": "PROD001",
  "productName": "iPhone 15 Pro",
  "productImage": "/images/iphone15.jpg",
  "price": 8999,
  "quantity": 1,
  "subtotal": 8999,
  "stock": 100,
  "status": 1
}

```

购物车中的商品项

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|cartId|string|false|none||购物车项ID|
|productId|string|false|none||商品ID|
|productName|string|false|none||商品名称|
|productImage|string|false|none||商品主图URL|
|price|number(double)|false|none||商品单价（单位：元）|
|quantity|integer|false|none||购买数量|
|subtotal|number(double)|false|none||小计金额（= price × quantity）|
|stock|integer|false|none||当前库存数量（用于前端校验）|
|status|integer|false|none||商品状态：<br />- 1 上架（可购买）<br />- 0 下架（不可购买，前端置灰显示）|

<h2 id="tocS_CartResult">CartResult</h2>

<a id="schemacartresult"></a>
<a id="schema_CartResult"></a>
<a id="tocScartresult"></a>
<a id="tocscartresult"></a>

```json
{
  "items": [
    {
      "cartId": "CART001",
      "productId": "PROD001",
      "productName": "iPhone 15 Pro",
      "productImage": "/images/iphone15.jpg",
      "price": 8999,
      "quantity": 1,
      "subtotal": 8999,
      "stock": 100,
      "status": 1
    }
  ],
  "totalCount": 3,
  "totalQuantity": 6,
  "totalAmount": 12981
}

```

购物车完整信息

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|items|[[CartItem](#schemacartitem)]|false|none||购物车商品列表|
|totalCount|integer|false|none||商品种类数|
|totalQuantity|integer|false|none||商品总件数|
|totalAmount|number(double)|false|none||购物车总金额（单位：元）|

<h2 id="tocS_AddCartRequest">AddCartRequest</h2>

<a id="schemaaddcartrequest"></a>
<a id="schema_AddCartRequest"></a>
<a id="tocSaddcartrequest"></a>
<a id="tocsaddcartrequest"></a>

```json
{
  "productId": "PROD001",
  "quantity": 1
}

```

添加商品到购物车的请求参数

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|productId|string|true|none||商品ID（必填）|
|quantity|integer|true|none||添加数量（必填，最少为1）|

<h2 id="tocS_UpdateCartRequest">UpdateCartRequest</h2>

<a id="schemaupdatecartrequest"></a>
<a id="schema_UpdateCartRequest"></a>
<a id="tocSupdatecartrequest"></a>
<a id="tocsupdatecartrequest"></a>

```json
{
  "quantity": 3
}

```

修改购物车商品数量的请求参数

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|quantity|integer|true|none||新的数量（必填，最少为1）|

