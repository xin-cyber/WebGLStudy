# WebGl

## 1.简介

> WebGL 是基于 OpenGL ES 规范的浏览器实现的，API 相对更底层,
>
> canvas只能用cpu运算，webgl可以使用GPU进行运算

## 2.使用场景

+ 要绘制的图形数量非常多（GPU并行计算）
+ 对较大图像的细节做像素处理（光影，流体）
+ 绘制 3D 物体

![img](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/3bf11fcf520504a4e342dd335698c76f.jpg)

## 3.计算机绘图过程

> **⭐渲染管线** : 一个通用计算机图形系统主要包括 6 个部分，分别是输入设备、中央处理单元、图形处理单元、存储器、帧缓存和输出设备

![img](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/b5e4f37e1c4fbyy6a2ea10624d143356.jpg)

+ **光栅**（Raster）：几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指构成图像的像素阵列。
+ **像素**（Pixel）：一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。
+ **帧缓存**（Frame Buffer）：在绘图过程中，像素信息被存放于帧缓存中，帧缓存是一块内存地址。
+ **CPU**（Central Processing Unit）：中央处理单元，负责逻辑计算。串行处理，流水线，不适合处理图像，像素点太多了
+ ![img](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/1e6479ef37138f051b7a6e5de6977580.jpeg)
+ **GPU**（Graphics Processing Unit）：图形处理单元，负责图形计算。并行处理，

![img](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/1ab1116e3742611f5cb26c942d67d5e7.jpeg)

性能远没有 CPU 那么强大，但处理一张 800 * 600 大小的图片，GPU 也可以保证这 48 万个像素点分别对应一个小单元，这样我们就可以同时对每个像素点进行计算了。

## 4.绘制WebGL三角形

> 2.WebGl.html
>
> + 分别创建顶点着色器和片元着色器
> + 创建webgl program 联合顶点着色器和片元着色器，并启动程序
> + 将数据放入webgl缓冲区
> + 将webgl缓冲区数据读取到GPU，将buffer缓冲区数据绑定给顶点着色器的position
> + 执行着色器程序完成绘制

WebGL 从顶点着色器和图元提取像素点给片元着色器执行代码的过程，就是我们前面说的生成**光栅信息**的过程，我们也叫它光栅化过程。所以，片元着色器的作用，就是处理光栅化后的像素信息。

![image-20220907224519983](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220907224519983.png)

![img](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/d31e6c50b55872f81aa70625538fb930.jpg)

![image-20220907232105430](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220907232105430.png)

## 5.几何计算数学基础

### 1.向量

> [向量百度百科解释](https://baike.baidu.com/item/向量/1396519)

![image-20220911211507121](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911211507121.png)

#### **1.单位向量**

![image-20220911213156888](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911213156888.png)

#### **2.向量和的模**

![image-20220911213805837](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911213805837.png)

#### 3.**向量加减法**

> 矩阵相当于向量，行列式相当于向量的模。[矩阵]  |行列式|

+ 向量a(x,y) ; b(m,n)  ====>⭐ 向量相加：(x+m , y+n)

![image-20220911214317236](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911214317236.png)

#### 4.**数乘**

**实数λ和向量a的叉乘乘积是一个向量**，记作λ**a**，且|λ**a**|=|λ|*****|**a**|。



#### 5.数量积(点乘)

> 结果为常量，是模长度

若**a**、**b**不共线，则

![img](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/53dde5bb6374cfe71d6483fdae5a8413.svg)

![image-20220911235152832](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911235152832.png)

#### 6.向量积(x乘)

> 结果是向量

![image-20220911235338002](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911235338002.png)

![image-20220911235625527](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911235625527.png)



#### 7.向量延长

> v(1,0)

![image-20220911230046333](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911230046333.png)

#### 8.向量旋转

> 