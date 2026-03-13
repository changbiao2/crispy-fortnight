---
title: 网上购物网站后台管理模块 API
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

# 网上购物网站后台管理模块 API

商品管理、订单管理、用户管理、库存管理、数据统计分析相关接口

Base URLs:

Email: <a href="mailto:support@example.com">API Support</a> 

# Authentication

- HTTP Authentication, scheme: bearer<br/>管理员JWT Token

# 商品管理

<a id="opIdaddProduct"></a>

## POST 添加商品

POST /api/admin/product

添加新商品到系统

> Body 请求参数

```json
{
  "name": "iPhone 15 Pro",
  "categoryId": "string",
  "price": 8999,
  "stock": 100,
  "description": "string",
  "imageUrl": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[ProductCreateRequest](#schemaproductcreaterequest)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "productId": "string",
    "name": "string",
    "categoryId": "string",
    "categoryName": "string",
    "price": 0.1,
    "stock": 0,
    "description": "string",
    "imageUrl": "string",
    "status": 0,
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

> 400 Response

```json
{
  "code": 400,
  "message": "请求参数错误",
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|添加成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误|[ApiResponse](#schemaapiresponse)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|未授权访问|[ApiResponse](#schemaapiresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||状态码|
|» message|string|false|none||提示信息|
|» data|object¦null|false|none||响应数据|

状态码 **401**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||状态码|
|» message|string|false|none||提示信息|
|» data|object¦null|false|none||响应数据|

<a id="opIdupdateProduct"></a>

## PUT 修改商品

PUT /api/admin/product/{productId}

修改商品信息

> Body 请求参数

```json
{
  "name": "string",
  "categoryId": "string",
  "price": 0.1,
  "stock": 0,
  "description": "string",
  "imageUrl": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|productId|path|string| 是 |商品ID|
|body|body|[ProductUpdateRequest](#schemaproductupdaterequest)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "productId": "string",
    "name": "string",
    "categoryId": "string",
    "categoryName": "string",
    "price": 0.1,
    "stock": 0,
    "description": "string",
    "imageUrl": "string",
    "status": 0,
    "createTime": "2019-08-24T14:15:22Z"
  }
}
```

> 404 Response

```json
{
  "code": 404,
  "message": "资源不存在",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|修改成功|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|资源不存在|[ApiResponse](#schemaapiresponse)|

### 返回数据结构

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||状态码|
|» message|string|false|none||提示信息|
|» data|object¦null|false|none||响应数据|

<a id="opIddeleteProduct"></a>

## DELETE 删除商品

DELETE /api/admin/product/{productId}

删除指定商品

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|productId|path|string| 是 |商品ID|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

> 404 Response

```json
{
  "code": 404,
  "message": "资源不存在",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|删除成功|[ApiResponse](#schemaapiresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|资源不存在|[ApiResponse](#schemaapiresponse)|

<a id="opIdgetProductList"></a>

## GET 获取商品列表

GET /api/admin/products

分页查询商品列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 否 |搜索关键词|
|categoryId|query|string| 否 |分类ID|
|status|query|integer| 否 |状态(1上架 0下架)|
|page|query|integer| 否 |页码|
|pageSize|query|integer| 否 |每页数量|

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "productId": "string",
        "name": "string",
        "categoryId": "string",
        "categoryName": "string",
        "price": 0.1,
        "stock": 0,
        "description": "string",
        "imageUrl": "string",
        "status": 0,
        "createTime": "2019-08-24T14:15:22Z"
      }
    ],
    "pageInfo": {
      "page": 0,
      "pageSize": 0,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdupdateProductStatus"></a>

## PUT 商品上下架

PUT /api/admin/product/{productId}/status

更新商品上下架状态

> Body 请求参数

```json
{
  "status": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|productId|path|string| 是 |商品ID|
|body|body|object| 是 |none|
|» status|body|integer| 是 |状态(1上架 0下架)|

#### 枚举值

|属性|值|
|---|---|
|» status|0|
|» status|1|

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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|操作成功|[ApiResponse](#schemaapiresponse)|

# 订单管理

<a id="opIdgetOrderList"></a>

## GET 获取订单列表

GET /api/admin/orders

分页查询订单列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|orderNo|query|string| 否 |订单编号|
|userId|query|string| 否 |用户ID|
|status|query|integer| 否 |订单状态(0待支付 1待发货 2已发货 3已完成 4已取消)|
|startDate|query|string(date)| 否 |开始日期|
|endDate|query|string(date)| 否 |结束日期|
|page|query|integer| 否 |页码|
|pageSize|query|integer| 否 |每页数量|

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|
|status|2|
|status|3|
|status|4|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "orderId": "string",
        "orderNo": "string",
        "userId": "string",
        "userName": "string",
        "totalAmount": 0.1,
        "status": 0,
        "statusText": "string",
        "paymentMethod": 0,
        "createTime": "2019-08-24T14:15:22Z",
        "payTime": "2019-08-24T14:15:22Z",
        "shipTime": "2019-08-24T14:15:22Z"
      }
    ],
    "pageInfo": {
      "page": 0,
      "pageSize": 0,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdgetOrderDetail"></a>

## GET 获取订单详情

GET /api/admin/order/{orderId}

获取订单详细信息及订单项列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|orderId|path|string| 是 |订单ID|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "order": {
      "orderId": "string",
      "orderNo": "string",
      "userId": "string",
      "userName": "string",
      "totalAmount": 0.1,
      "status": 0,
      "statusText": "string",
      "paymentMethod": 0,
      "createTime": "2019-08-24T14:15:22Z",
      "payTime": "2019-08-24T14:15:22Z",
      "shipTime": "2019-08-24T14:15:22Z"
    },
    "items": [
      {
        "itemId": "string",
        "productId": "string",
        "productName": "string",
        "price": 0.1,
        "quantity": 0,
        "subtotal": 0.1
      }
    ],
    "expressCompany": "string",
    "expressNo": "string"
  }
}
```

> 404 Response

```json
{
  "code": 404,
  "message": "资源不存在",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|资源不存在|[ApiResponse](#schemaapiresponse)|

### 返回数据结构

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||状态码|
|» message|string|false|none||提示信息|
|» data|object¦null|false|none||响应数据|

<a id="opIdshipOrder"></a>

## PUT 订单发货

PUT /api/admin/order/{orderId}/ship

为订单填写物流信息并发货

> Body 请求参数

```json
{
  "expressCompany": "顺丰速运",
  "expressNo": "SF1234567890"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|orderId|path|string| 是 |订单ID|
|body|body|[ShipRequest](#schemashiprequest)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

> 400 Response

```json
{
  "code": 400,
  "message": "请求参数错误",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|发货成功|[ApiResponse](#schemaapiresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求参数错误|[ApiResponse](#schemaapiresponse)|

<a id="opIdcancelOrder"></a>

## PUT 取消订单

PUT /api/admin/order/{orderId}/cancel

取消指定订单

> Body 请求参数

```json
{
  "reason": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|orderId|path|string| 是 |订单ID|
|body|body|object| 是 |none|
|» reason|body|string| 是 |取消原因|

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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|取消成功|[ApiResponse](#schemaapiresponse)|

# 用户管理

<a id="opIdgetUserList"></a>

## GET 获取用户列表

GET /api/admin/users

分页查询用户列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 否 |搜索关键词(用户名/手机号)|
|status|query|integer| 否 |状态(1启用 0禁用)|
|page|query|integer| 否 |页码|
|pageSize|query|integer| 否 |每页数量|

#### 枚举值

|属性|值|
|---|---|
|status|0|
|status|1|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "userId": "string",
        "username": "string",
        "phone": "string",
        "email": "string",
        "status": 0,
        "createTime": "2019-08-24T14:15:22Z",
        "orderCount": 0,
        "totalAmount": 0.1
      }
    ],
    "pageInfo": {
      "page": 0,
      "pageSize": 0,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdupdateUserStatus"></a>

## PUT 更新用户状态

PUT /api/admin/user/{userId}/status

启用或禁用用户

> Body 请求参数

```json
{
  "status": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|string| 是 |用户ID|
|body|body|object| 是 |none|
|» status|body|integer| 是 |状态(1启用 0禁用)|

#### 枚举值

|属性|值|
|---|---|
|» status|0|
|» status|1|

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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|操作成功|[ApiResponse](#schemaapiresponse)|

# 库存管理

<a id="opIdgetInventoryList"></a>

## GET 获取库存列表

GET /api/admin/inventory

分页查询库存列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|keyword|query|string| 否 |商品名称关键词|
|warningStatus|query|integer| 否 |预警状态(1预警 0正常)|
|page|query|integer| 否 |页码|
|pageSize|query|integer| 否 |每页数量|

#### 枚举值

|属性|值|
|---|---|
|warningStatus|0|
|warningStatus|1|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "list": [
      {
        "inventoryId": "string",
        "productId": "string",
        "productName": "string",
        "quantity": 0,
        "warningQuantity": 0,
        "inCount": 0,
        "outCount": 0,
        "isWarning": true
      }
    ],
    "pageInfo": {
      "page": 0,
      "pageSize": 0,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdinventoryIn"></a>

## POST 入库操作

POST /api/admin/inventory/in

商品入库

> Body 请求参数

```json
{
  "productId": "string",
  "quantity": 1,
  "remark": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[InventoryOperationRequest](#schemainventoryoperationrequest)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "inventoryId": "string",
    "productId": "string",
    "productName": "string",
    "quantity": 0,
    "warningQuantity": 0,
    "inCount": 0,
    "outCount": 0,
    "isWarning": true
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|入库成功|Inline|

### 返回数据结构

<a id="opIdinventoryOut"></a>

## POST 出库操作

POST /api/admin/inventory/out

商品出库

> Body 请求参数

```json
{
  "productId": "string",
  "quantity": 1,
  "remark": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[InventoryOperationRequest](#schemainventoryoperationrequest)| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "inventoryId": "string",
    "productId": "string",
    "productName": "string",
    "quantity": 0,
    "warningQuantity": 0,
    "inCount": 0,
    "outCount": 0,
    "isWarning": true
  }
}
```

> 400 Response

```json
{
  "code": 400,
  "message": "库存不足，当前库存: 10",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|出库成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|库存不足|[ApiResponse](#schemaapiresponse)|

### 返回数据结构

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|false|none||状态码|
|» message|string|false|none||提示信息|
|» data|object¦null|false|none||响应数据|

# 数据统计

<a id="opIdgetSalesStatistics"></a>

## GET 获取销售统计

GET /api/admin/statistics/sales

获取指定时间范围内的销售统计数据

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string(date)| 是 |开始日期|
|endDate|query|string(date)| 是 |结束日期|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "totalSales": 0.1,
    "orderCount": 0,
    "paidOrderCount": 0,
    "avgOrderAmount": 0.1,
    "comparedYesterday": 0.1,
    "comparedLastWeek": 0.1
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdgetOrderStatistics"></a>

## GET 获取订单统计

GET /api/admin/statistics/orders

获取订单数量及状态分布

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string(date)| 是 |开始日期|
|endDate|query|string(date)| 是 |结束日期|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "totalCount": 0,
    "pendingPayment": 0,
    "pendingShipment": 0,
    "shipped": 0,
    "completed": 0,
    "cancelled": 0,
    "statusDistribution": [
      {
        "status": "string",
        "count": 0,
        "percentage": 0
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdgetUserStatistics"></a>

## GET 获取用户统计

GET /api/admin/statistics/users

获取新增用户数、活跃用户数等

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string(date)| 是 |开始日期|
|endDate|query|string(date)| 是 |结束日期|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "totalUsers": 0,
    "newUsers": 0,
    "activeUsers": 0,
    "growthRate": 0.1
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdgetProductRanking"></a>

## GET 获取商品销量排行

GET /api/admin/statistics/products/ranking

获取商品销量排行榜

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|limit|query|integer| 否 |返回数量|
|orderBy|query|string| 否 |排序字段|

#### 枚举值

|属性|值|
|---|---|
|orderBy|quantity|
|orderBy|amount|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [
    {
      "rank": 0,
      "productId": "string",
      "productName": "string",
      "salesQuantity": 0,
      "salesAmount": 0.1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdgetSalesTrend"></a>

## GET 获取销售趋势

GET /api/admin/statistics/sales/trend

获取销售趋势数据（用于折线图）

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|startDate|query|string(date)| 是 |开始日期|
|endDate|query|string(date)| 是 |结束日期|
|type|query|string| 否 |统计类型|

#### 枚举值

|属性|值|
|---|---|
|type|day|
|type|week|
|type|month|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "labels": [
      "string"
    ],
    "salesData": [
      0
    ],
    "orderData": [
      0
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|查询成功|Inline|

### 返回数据结构

<a id="opIdexportReport"></a>

## GET 导出报表

GET /api/admin/report/export

导出统计报表文件

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 是 |报表类型|
|startDate|query|string(date)| 是 |开始日期|
|endDate|query|string(date)| 是 |结束日期|
|format|query|string| 否 |导出格式|

#### 枚举值

|属性|值|
|---|---|
|type|sales|
|type|orders|
|type|users|
|type|products|
|format|excel|
|format|pdf|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|导出成功|string|

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
|code|integer|false|none||状态码|
|message|string|false|none||提示信息|
|data|object¦null|false|none||响应数据|

<h2 id="tocS_PageInfo">PageInfo</h2>

<a id="schemapageinfo"></a>
<a id="schema_PageInfo"></a>
<a id="tocSpageinfo"></a>
<a id="tocspageinfo"></a>

```json
{
  "page": 0,
  "pageSize": 0,
  "total": 0,
  "totalPages": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|page|integer|false|none||当前页码|
|pageSize|integer|false|none||每页数量|
|total|integer|false|none||总记录数|
|totalPages|integer|false|none||总页数|

<h2 id="tocS_Product">Product</h2>

<a id="schemaproduct"></a>
<a id="schema_Product"></a>
<a id="tocSproduct"></a>
<a id="tocsproduct"></a>

```json
{
  "productId": "string",
  "name": "string",
  "categoryId": "string",
  "categoryName": "string",
  "price": 0.1,
  "stock": 0,
  "description": "string",
  "imageUrl": "string",
  "status": 0,
  "createTime": "2019-08-24T14:15:22Z"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|productId|string|false|none||商品ID|
|name|string|false|none||商品名称|
|categoryId|string|false|none||分类ID|
|categoryName|string|false|none||分类名称|
|price|number(double)|false|none||价格|
|stock|integer|false|none||库存|
|description|string|false|none||商品描述|
|imageUrl|string|false|none||图片URL|
|status|integer|false|none||状态(1上架 0下架)|
|createTime|string(date-time)|false|none||创建时间|

<h2 id="tocS_ProductCreateRequest">ProductCreateRequest</h2>

<a id="schemaproductcreaterequest"></a>
<a id="schema_ProductCreateRequest"></a>
<a id="tocSproductcreaterequest"></a>
<a id="tocsproductcreaterequest"></a>

```json
{
  "name": "iPhone 15 Pro",
  "categoryId": "string",
  "price": 8999,
  "stock": 100,
  "description": "string",
  "imageUrl": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|true|none||商品名称|
|categoryId|string|false|none||分类ID|
|price|number(double)|true|none||价格|
|stock|integer|false|none||库存|
|description|string|false|none||商品描述|
|imageUrl|string|false|none||图片URL|

<h2 id="tocS_ProductUpdateRequest">ProductUpdateRequest</h2>

<a id="schemaproductupdaterequest"></a>
<a id="schema_ProductUpdateRequest"></a>
<a id="tocSproductupdaterequest"></a>
<a id="tocsproductupdaterequest"></a>

```json
{
  "name": "string",
  "categoryId": "string",
  "price": 0.1,
  "stock": 0,
  "description": "string",
  "imageUrl": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|false|none||商品名称|
|categoryId|string|false|none||分类ID|
|price|number(double)|false|none||价格|
|stock|integer|false|none||库存|
|description|string|false|none||商品描述|
|imageUrl|string|false|none||图片URL|

<h2 id="tocS_ProductPageResult">ProductPageResult</h2>

<a id="schemaproductpageresult"></a>
<a id="schema_ProductPageResult"></a>
<a id="tocSproductpageresult"></a>
<a id="tocsproductpageresult"></a>

```json
{
  "list": [
    {
      "productId": "string",
      "name": "string",
      "categoryId": "string",
      "categoryName": "string",
      "price": 0.1,
      "stock": 0,
      "description": "string",
      "imageUrl": "string",
      "status": 0,
      "createTime": "2019-08-24T14:15:22Z"
    }
  ],
  "pageInfo": {
    "page": 0,
    "pageSize": 0,
    "total": 0,
    "totalPages": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|list|[[Product](#schemaproduct)]|false|none||none|
|pageInfo|[PageInfo](#schemapageinfo)|false|none||none|

<h2 id="tocS_Order">Order</h2>

<a id="schemaorder"></a>
<a id="schema_Order"></a>
<a id="tocSorder"></a>
<a id="tocsorder"></a>

```json
{
  "orderId": "string",
  "orderNo": "string",
  "userId": "string",
  "userName": "string",
  "totalAmount": 0.1,
  "status": 0,
  "statusText": "string",
  "paymentMethod": 0,
  "createTime": "2019-08-24T14:15:22Z",
  "payTime": "2019-08-24T14:15:22Z",
  "shipTime": "2019-08-24T14:15:22Z"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|orderId|string|false|none||订单ID|
|orderNo|string|false|none||订单编号|
|userId|string|false|none||用户ID|
|userName|string|false|none||用户名|
|totalAmount|number(double)|false|none||订单总金额|
|status|integer|false|none||订单状态|
|statusText|string|false|none||状态文本|
|paymentMethod|integer|false|none||支付方式|
|createTime|string(date-time)|false|none||创建时间|
|payTime|string(date-time)|false|none||支付时间|
|shipTime|string(date-time)|false|none||发货时间|

<h2 id="tocS_OrderItem">OrderItem</h2>

<a id="schemaorderitem"></a>
<a id="schema_OrderItem"></a>
<a id="tocSorderitem"></a>
<a id="tocsorderitem"></a>

```json
{
  "itemId": "string",
  "productId": "string",
  "productName": "string",
  "price": 0.1,
  "quantity": 0,
  "subtotal": 0.1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|itemId|string|false|none||订单项ID|
|productId|string|false|none||商品ID|
|productName|string|false|none||商品名称|
|price|number(double)|false|none||单价|
|quantity|integer|false|none||数量|
|subtotal|number(double)|false|none||小计|

<h2 id="tocS_OrderDetail">OrderDetail</h2>

<a id="schemaorderdetail"></a>
<a id="schema_OrderDetail"></a>
<a id="tocSorderdetail"></a>
<a id="tocsorderdetail"></a>

```json
{
  "order": {
    "orderId": "string",
    "orderNo": "string",
    "userId": "string",
    "userName": "string",
    "totalAmount": 0.1,
    "status": 0,
    "statusText": "string",
    "paymentMethod": 0,
    "createTime": "2019-08-24T14:15:22Z",
    "payTime": "2019-08-24T14:15:22Z",
    "shipTime": "2019-08-24T14:15:22Z"
  },
  "items": [
    {
      "itemId": "string",
      "productId": "string",
      "productName": "string",
      "price": 0.1,
      "quantity": 0,
      "subtotal": 0.1
    }
  ],
  "expressCompany": "string",
  "expressNo": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|order|[Order](#schemaorder)|false|none||none|
|items|[[OrderItem](#schemaorderitem)]|false|none||none|
|expressCompany|string|false|none||快递公司|
|expressNo|string|false|none||快递单号|

<h2 id="tocS_OrderPageResult">OrderPageResult</h2>

<a id="schemaorderpageresult"></a>
<a id="schema_OrderPageResult"></a>
<a id="tocSorderpageresult"></a>
<a id="tocsorderpageresult"></a>

```json
{
  "list": [
    {
      "orderId": "string",
      "orderNo": "string",
      "userId": "string",
      "userName": "string",
      "totalAmount": 0.1,
      "status": 0,
      "statusText": "string",
      "paymentMethod": 0,
      "createTime": "2019-08-24T14:15:22Z",
      "payTime": "2019-08-24T14:15:22Z",
      "shipTime": "2019-08-24T14:15:22Z"
    }
  ],
  "pageInfo": {
    "page": 0,
    "pageSize": 0,
    "total": 0,
    "totalPages": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|list|[[Order](#schemaorder)]|false|none||none|
|pageInfo|[PageInfo](#schemapageinfo)|false|none||none|

<h2 id="tocS_ShipRequest">ShipRequest</h2>

<a id="schemashiprequest"></a>
<a id="schema_ShipRequest"></a>
<a id="tocSshiprequest"></a>
<a id="tocsshiprequest"></a>

```json
{
  "expressCompany": "顺丰速运",
  "expressNo": "SF1234567890"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|expressCompany|string|true|none||快递公司|
|expressNo|string|true|none||快递单号|

<h2 id="tocS_User">User</h2>

<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "userId": "string",
  "username": "string",
  "phone": "string",
  "email": "string",
  "status": 0,
  "createTime": "2019-08-24T14:15:22Z",
  "orderCount": 0,
  "totalAmount": 0.1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|userId|string|false|none||用户ID|
|username|string|false|none||用户名|
|phone|string|false|none||手机号|
|email|string|false|none||邮箱|
|status|integer|false|none||状态|
|createTime|string(date-time)|false|none||注册时间|
|orderCount|integer|false|none||订单数|
|totalAmount|number(double)|false|none||消费总额|

<h2 id="tocS_UserPageResult">UserPageResult</h2>

<a id="schemauserpageresult"></a>
<a id="schema_UserPageResult"></a>
<a id="tocSuserpageresult"></a>
<a id="tocsuserpageresult"></a>

```json
{
  "list": [
    {
      "userId": "string",
      "username": "string",
      "phone": "string",
      "email": "string",
      "status": 0,
      "createTime": "2019-08-24T14:15:22Z",
      "orderCount": 0,
      "totalAmount": 0.1
    }
  ],
  "pageInfo": {
    "page": 0,
    "pageSize": 0,
    "total": 0,
    "totalPages": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|list|[[User](#schemauser)]|false|none||none|
|pageInfo|[PageInfo](#schemapageinfo)|false|none||none|

<h2 id="tocS_Inventory">Inventory</h2>

<a id="schemainventory"></a>
<a id="schema_Inventory"></a>
<a id="tocSinventory"></a>
<a id="tocsinventory"></a>

```json
{
  "inventoryId": "string",
  "productId": "string",
  "productName": "string",
  "quantity": 0,
  "warningQuantity": 0,
  "inCount": 0,
  "outCount": 0,
  "isWarning": true
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|inventoryId|string|false|none||库存ID|
|productId|string|false|none||商品ID|
|productName|string|false|none||商品名称|
|quantity|integer|false|none||当前库存|
|warningQuantity|integer|false|none||预警数量|
|inCount|integer|false|none||累计入库|
|outCount|integer|false|none||累计出库|
|isWarning|boolean|false|none||是否预警|

<h2 id="tocS_InventoryPageResult">InventoryPageResult</h2>

<a id="schemainventorypageresult"></a>
<a id="schema_InventoryPageResult"></a>
<a id="tocSinventorypageresult"></a>
<a id="tocsinventorypageresult"></a>

```json
{
  "list": [
    {
      "inventoryId": "string",
      "productId": "string",
      "productName": "string",
      "quantity": 0,
      "warningQuantity": 0,
      "inCount": 0,
      "outCount": 0,
      "isWarning": true
    }
  ],
  "pageInfo": {
    "page": 0,
    "pageSize": 0,
    "total": 0,
    "totalPages": 0
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|list|[[Inventory](#schemainventory)]|false|none||none|
|pageInfo|[PageInfo](#schemapageinfo)|false|none||none|

<h2 id="tocS_InventoryOperationRequest">InventoryOperationRequest</h2>

<a id="schemainventoryoperationrequest"></a>
<a id="schema_InventoryOperationRequest"></a>
<a id="tocSinventoryoperationrequest"></a>
<a id="tocsinventoryoperationrequest"></a>

```json
{
  "productId": "string",
  "quantity": 1,
  "remark": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|productId|string|true|none||商品ID|
|quantity|integer|true|none||数量|
|remark|string|false|none||备注|

<h2 id="tocS_SalesStatistics">SalesStatistics</h2>

<a id="schemasalesstatistics"></a>
<a id="schema_SalesStatistics"></a>
<a id="tocSsalesstatistics"></a>
<a id="tocssalesstatistics"></a>

```json
{
  "totalSales": 0.1,
  "orderCount": 0,
  "paidOrderCount": 0,
  "avgOrderAmount": 0.1,
  "comparedYesterday": 0.1,
  "comparedLastWeek": 0.1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|totalSales|number(double)|false|none||销售总额|
|orderCount|integer|false|none||订单总数|
|paidOrderCount|integer|false|none||已支付订单数|
|avgOrderAmount|number(double)|false|none||平均客单价|
|comparedYesterday|number(double)|false|none||较昨日增长(%)|
|comparedLastWeek|number(double)|false|none||较上周增长(%)|

<h2 id="tocS_OrderStatistics">OrderStatistics</h2>

<a id="schemaorderstatistics"></a>
<a id="schema_OrderStatistics"></a>
<a id="tocSorderstatistics"></a>
<a id="tocsorderstatistics"></a>

```json
{
  "totalCount": 0,
  "pendingPayment": 0,
  "pendingShipment": 0,
  "shipped": 0,
  "completed": 0,
  "cancelled": 0,
  "statusDistribution": [
    {
      "status": "string",
      "count": 0,
      "percentage": 0
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|totalCount|integer|false|none||订单总数|
|pendingPayment|integer|false|none||待支付|
|pendingShipment|integer|false|none||待发货|
|shipped|integer|false|none||已发货|
|completed|integer|false|none||已完成|
|cancelled|integer|false|none||已取消|
|statusDistribution|[object]|false|none||none|
|» status|string|false|none||none|
|» count|integer|false|none||none|
|» percentage|number|false|none||none|

<h2 id="tocS_UserStatistics">UserStatistics</h2>

<a id="schemauserstatistics"></a>
<a id="schema_UserStatistics"></a>
<a id="tocSuserstatistics"></a>
<a id="tocsuserstatistics"></a>

```json
{
  "totalUsers": 0,
  "newUsers": 0,
  "activeUsers": 0,
  "growthRate": 0.1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|totalUsers|integer|false|none||用户总数|
|newUsers|integer|false|none||新增用户|
|activeUsers|integer|false|none||活跃用户|
|growthRate|number(double)|false|none||增长率(%)|

<h2 id="tocS_ProductRanking">ProductRanking</h2>

<a id="schemaproductranking"></a>
<a id="schema_ProductRanking"></a>
<a id="tocSproductranking"></a>
<a id="tocsproductranking"></a>

```json
{
  "rank": 0,
  "productId": "string",
  "productName": "string",
  "salesQuantity": 0,
  "salesAmount": 0.1
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|rank|integer|false|none||排名|
|productId|string|false|none||商品ID|
|productName|string|false|none||商品名称|
|salesQuantity|integer|false|none||销量|
|salesAmount|number(double)|false|none||销售额|

<h2 id="tocS_SalesTrend">SalesTrend</h2>

<a id="schemasalestrend"></a>
<a id="schema_SalesTrend"></a>
<a id="tocSsalestrend"></a>
<a id="tocssalestrend"></a>

```json
{
  "labels": [
    "string"
  ],
  "salesData": [
    0
  ],
  "orderData": [
    0
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|labels|[string]|false|none||时间标签|
|salesData|[number]|false|none||销售额数据|
|orderData|[integer]|false|none||订单量数据|

<h2 id="tocS_BadRequest">BadRequest</h2>

<a id="schemabadrequest"></a>
<a id="schema_BadRequest"></a>
<a id="tocSbadrequest"></a>
<a id="tocsbadrequest"></a>

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}

```

### 属性

*None*

<h2 id="tocS_Unauthorized">Unauthorized</h2>

<a id="schemaunauthorized"></a>
<a id="schema_Unauthorized"></a>
<a id="tocSunauthorized"></a>
<a id="tocsunauthorized"></a>

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}

```

### 属性

*None*

<h2 id="tocS_NotFound">NotFound</h2>

<a id="schemanotfound"></a>
<a id="schema_NotFound"></a>
<a id="tocSnotfound"></a>
<a id="tocsnotfound"></a>

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}

```

### 属性

*None*

