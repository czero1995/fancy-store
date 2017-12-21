//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
Mock.mock('/api/bannerdata', (req, res) => {
    return {
        data: [
        		{
			"id": "1",
			"img": "../src/common/img/goods.jpg"
		},
		{
			"id": "2",
			"img": "../src/common/img/goods.jpg"
		},
		{
			"id": "3",
			"img": "../src/common/img/goods.jpg"
		}
			]}
})
Mock.mock('/api/homedata', (req, res) => {
    return {
        data: [
        	{
            "Category": {
                "Id": "1",
                "TopText": "数码科技",
                "TopNum": "one"
            },
            "SalesProduct": [
                {
                    "CategoryId": "1",
                    "GoodsName": "Apple MacBook Pro",
                    "GoodsInfo": "13.3英寸笔记本电脑 深空灰色Core i5处理器/8GB",
                    "GoodsPrice": 18999,
                    "GoodsNum": 1,
                    "GoodsImage": "../src/common/img/goods.jpg"
                },
               {
                    "CategoryId": "2",
                    "GoodsName": "APPLE 苹果(Apple) iPhone8/X Plus ",
                    "GoodsInfo": "4G智能手机 移动联通 iPhone8 深空",
                    "GoodsPrice": 9000,
                    "GoodsNum": 1,
                    "GoodsImage": "../src/common/img/goods.jpg"
               }
            ]
       },

        {
            "Category": {
                "Id": "2",
                "TopText": "营养产品",
                "TopNum": "two"
            },
            "SalesProduct": [
                {
                    "CategoryId": "1",
                    "GoodsName": "善存Centrum 佳维礼盒 ",
                    "GoodsInfo": "1.33g*150片装（新老包装随机发放） ",
                    "GoodsPrice": 207,
                    "GoodsNum": 1,
                     "GoodsImage": "../src/common/img/goods.jpg"
                },
               {
                    "CategoryId": "2",
                    "GoodsName": "汤臣倍健 维生素C片橘子味+天然维生素E软胶囊",
                    "GoodsInfo": "软胶囊(72g/瓶×1瓶+30g/瓶×1瓶)优惠装",
                    "GoodsPrice": 59,
                    "GoodsNum": 1,
                   "GoodsImage": "../src/common/img/goods.jpg"
               }
            ]
        },
        {
            "Category": {
                "Id": "3",
                "TopText": "生鲜水果",
                "TopNum": "three"
            },
            "SalesProduct": [
                {
                    "CategoryId": "1",
                    "GoodsName": "澳大利亚 进口橙 ",
                    "GoodsInfo": "单果重约150g-180g 新鲜水果",
                    "GoodsPrice": 39,
                    "GoodsNum": 1,
                   "GoodsImage": "../src/common/img/goods.jpg"
                },
               {
                    "CategoryId": "2",
                    "GoodsName": "宏辉果蔬 苹果 烟台红富士",
                    "GoodsInfo": "12个 约80mm 总重约2.6kg 新鲜水果 ",
                    "GoodsPrice": "22",
                    "GoodsNum": 1,
                   "GoodsImage": "../src/common/img/goods.jpg"
               }
            ]
        },
        {
            "Category": {
                "Id": "4",
                "TopText": "休闲零食",
                "TopNum": "four"
            },
            "SalesProduct": [
                {
                    "CategoryId": "1",
                    "GoodsName": "盐津铺子 零食大礼包 ",
                    "GoodsInfo": "一整箱送女友礼盒 74包休闲麻辣零食礼包美味小吃 粉girl1320g",
                    "GoodsPrice": 59,
                    "GoodsNum": 1,
                    "GoodsImage": "../src/common/img/goods.jpg"
                },
               {
                    "CategoryId": "2",
                    "GoodsName": "三只松鼠休闲麻辣零食",
                    "GoodsInfo": "特产约辣辣条200g/盒 ",
                    "GoodsPrice": 9,
                    "GoodsNum": 1,
                    "GoodsImage": "../src/common/img/goods.jpg"
               }
            ]
        },
        {
            "Category": {
                "Id": "5",
                "TopText": "家用电器",
                "TopNum": "five"
            },
            "SalesProduct": [
                {
                    "CategoryId": "1",
                    "GoodsName": "美的（Midea）电饭煲 ",
                    "GoodsInfo": "微压蒸汽阀 24小时智能预约 黄晶内胆3L电饭锅MB-WFS3018Q 11.11好货提前抢",
                    "GoodsPrice": 189,
                    "GoodsNum": 1,
                  "GoodsImage": "../src/common/img/goods.jpg"
                },
               {
                    "CategoryId": "2",
                    "GoodsName": "九阳（Joyoung）电烤箱",
                    "GoodsInfo": "30L 家用多功能 专业烘焙 KX-30J601 11.11好货提前抢！",
                    "GoodsPrice": 9,
                    "GoodsNum": 1,
                    "GoodsImage": "../src/common/img/goods.jpg"
               }
            ]
        },
        {
            "Category": {
                "Id": "6",
                "TopText": "护肤产品",
                "TopNum": "six"
            },
            "SalesProduct": [
                {
                    "CategoryId": "1",
                    "GoodsName": "韩束红石榴鲜活水盈七件套 ",
                    "GoodsInfo": "爽肤水乳液眼霜面霜 (补水保湿鲜活水嫩 护肤化妆品女护肤套装） ",
                    "GoodsPrice": 199,
                    "GoodsNum": 1,
                    "GoodsImage": "../src/common/img/goods.jpg"
                },
               {
                    "CategoryId": "2",
                    "GoodsName": "欧诗漫OSM营养美肤组合套装",
                    "GoodsInfo": "美肤透白护肤化妆品面部护理套装女 营养",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "../src/common/img/goods.jpg"
               }
            ]
        }
        ]
    }
})
Mock.mock('/api/menudata', (req, res) => {
    return {
        data: [
        		 {
                "id": 7,
                "cat_name": "无农药水果"
            },
            {
                "id": 6,
                "cat_name": "无农药蔬菜"
            },
            {
                "id": 4,
                "cat_name": "进口蔬菜"
            },
            {
                "id": 3,
                "cat_name": "进口水果"
            },
            {
                "id": 2,
                "cat_name": "蔬菜"
            },
            {
                "id": 1,
                "cat_name": "水果"
            }
			]}
})
Mock.mock('/api/categorydata', (req, res) => {
     return {
        data: [
        		  {
        "busines": {
            "business_id": 1,
            "business_name": "淘美藕片美容院"
        },
        "cart": [
            {
                "CategoryId": "2",
                    "GoodsName": "1",
                    "GoodsInfo": "1",
                    "GoodsPrice": 8,
                    "GoodsNum": 1,
                   "GoodsImage": "../src/common/img/goods.jpg"
            },
            {
               "CategoryId": "2",
                    "GoodsName": "1",
                    "GoodsInfo": "1",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "../src/common/img/goods.jpg"
            }
        ],
        
    },
     {
        "busines": {
            "business_id": 1,
            "business_name": "淘美藕片美容院"
        },
        "cart": [
            {
                "CategoryId": "2",
                    "GoodsName": "2",
                    "GoodsInfo": "2",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            },
            {
               "CategoryId": "2",
                    "GoodsName": "欧诗漫OSM营养美肤组合套装",
                    "GoodsInfo": "美肤透白护肤化妆品面部护理套装女 营养",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            }
        ],
        
    },
     {
        "busines": {
            "business_id": 1,
            "business_name": "淘美藕片美容院"
        },
        "cart": [
            {
                "CategoryId": "2",
                    "GoodsName": "3",
                    "GoodsInfo": "3",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "3"
            },
            {
               "CategoryId": "2",
                    "GoodsName": "3",
                    "GoodsInfo": "3 营养",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            }
        ],
        
    },
     {
        "busines": {
            "business_id": 1,
            "business_name": "淘美藕片美容院"
        },
        "cart": [
            {
                "CategoryId": "4",
                    "GoodsName": "4",
                    "GoodsInfo": "4",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            },
            {
               "CategoryId": "2",
                    "GoodsName": "4",
                    "GoodsInfo": "4肤透白护肤化妆品面部护理套装女 营养",
                    "GoodsPrice": 8,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            }
        ],
        
    },
     {
        "busines": {
            "business_id": 1,
            "business_name": "淘美藕片美容院"
        },
        "cart": [
            {
                "CategoryId": "5",
                    "GoodsName": "5",
                    "GoodsInfo": "5",
                    "GoodsPrice": 25,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            },
            {
               "CategoryId": "2",
                    "GoodsName": "5",
                    "GoodsInfo": "5 营养",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            }
        ],
        
    },
     {
        "busines": {
            "business_id": 1,
            "business_name": "淘美藕片美容院"
        },
        "cart": [
            {
                "CategoryId": "6",
                    "GoodsName": "2",
                    "GoodsInfo": "2",
                    "GoodsPrice": 28,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            },
            {
               "CategoryId": "2",
                    "GoodsName": "6",
                    "GoodsInfo": "美肤透白护肤化妆品面部护理套装女 营养",
                    "GoodsPrice": 8,
                    "GoodsNum": 1,
                   "GoodsImage": "2"
            }
        ],
        
    }
			]}
})