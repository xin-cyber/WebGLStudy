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

![image-20221010175047838](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221010175047838.png)

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

![image-20221007124416913](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221007124416913.png)

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
>
> 两个向量分别是a,b,则a/|a| + b/|b|就是其角平分线，然后再除以摸就是单位向量

![image-20220911235338002](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911235338002.png)



![image-20221007123656180](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221007123656180.png)

![image-20221007131206842](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221007131206842.png)

![image-20221007131541744](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221007131541744.png)

#### 7.向量延长

> v(1,0)

![image-20220911230046333](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220911230046333.png)

#### 8.向量旋转

> 



### 2.矩阵（3d）

> 向量计算

> m x n  m行n列矩阵，m=n方矩阵，3d开发使用方矩阵
>
> 3阶矩阵旋转，4阶代表仿射矩阵，平移旋转缩放

#### 1.矩阵乘法

> 相当于向量计算，矩阵乘矩阵结果还是矩阵

#### 2.单位矩阵

>  1 0 0 0
>
>  0 1 0 0
>
>  0 0 1 0
>
>  0 0 0 1

#### 3.转置矩阵

> 行变为列
>
> M    -----   MT

```js
a b c              a d g
d e f     =======> b e h  
g h i              c f i
```

#### 4.行列式

> 只有方阵才有行列式⭐

> 行列式值等于任意一行所有元素与其代数余子式乘积的和得出

#### 5.伴随矩阵

> ![image-20221013142626987](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221013142626987.png)
>
> 每一个元素的代数余子式,划去当前行，列 ，剩下的行列式的值
>
> | a b
>
>    c d  |     A11 = d

#### 6.逆矩阵

> AA-1 = E(单位矩阵)
>
> A：可逆矩阵 ，A-1 : A的逆矩阵
>
> ⭐ A-1 = A* / |A|

#### 7.仿射变换

> 平移，旋转，放缩，
>
> 某一个点X ===> X`    ;     
>
> 公式 ：X` =  AX + V  ,  A:3x3矩阵 ，V:三维向量
>
> 理解：先3x3线性变换矩阵，然后进行平移操作（向量加法）

![image-20220924152933900](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20220924152933900.png)

+ 左上角3x3矩阵：线性变换矩阵，（缩放，旋转）
+ 右上角表示（平移），v向量
+ 标准4x4仿射矩阵：左下角为000，右下角为1  ===>      0 0 0 1
+ ⭐公式：X` = X标准仿射矩阵
+ ![image-20221009171057785](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221009171057785.png)
+ ![image-20221009171518400](https://picgo-1307940198.cos.ap-nanjing.myqcloud.com/image-20221009171518400.png)

### 3.四元数（Quaternion）

> 表示旋转的数学工具，相比矩阵占用更小的内存，计算更小

### 4.点面关系

> 点point：vec3    面plane：vec4

+ 点到面距离 point.x+plane.x +point.y+plane.y +point.z+plane.z + plane.w 

## 6.glsl语法

### 1.变量名

> gl_PointSize、gl_Position、gl_FragColor都是内置变量

+ **uniform**

  > uniform变量是**外部程序**传递给（vertex和fragment）shader的变量。(shader只能用，不能改)
  >
  > uniform变量一般用来表示：变换矩阵，材质，光照参数和颜色等信息。

  ```glsl
  uniform mat4 viewProjMatrix; //投影+视图矩阵
  
  uniform mat4 viewMatrix;        //视图矩阵
  
  uniform vec3 lightPosition;     //光源位置
  
  uniform float lumaThreshold;
  
  uniform float chromaThreshold;
  
  uniform sampler2D SamplerY;  // 纹理图片的像素数据
  
  uniform sampler2D SamplerUV;
  
  uniform mat3 colorConversionMatrix;
  ```

+ **attribute**

  > attribute变量是只能在vertex shader中声明和使用的变量。
  >
  > 一般用attribute变量来表示一些顶点的数据，如：顶点坐标，法线，纹理坐标，顶点颜色等。

  ```glsl
  attribute vec4 position;
  
  attribute vec2 texCoord;
  ```

+ **varying**

  > varying变量是vertex和fragment shader之间做数据传递用的。一般vertex shader修改varying变量的值，然后fragment shader使用该varying变量的值。

  ```glsl
  // Vertex shader  
  
  attribute vec4 position;
  
  attribute vec2 texCoord;
  
  uniform float preferredRotation;
  
  varying vec2 texCoordVarying;   // Varying in vertex shader
  
  void main()
  
  {
  
  mat4 rotationMatrix = mat4( cos(preferredRotation), -sin(preferredRotation), 0.0, 0.0,
  
  sin(preferredRotation),  cos(preferredRotation), 0.0, 0.0,
  
  0.0,     0.0, 1.0, 0.0,
  
  0.0,     0.0, 0.0, 1.0);
  
  gl_Position = position * rotationMatrix;
  
  texCoordVarying = texCoord;
  
  }
  
  // Fragment shader
  
  varying highp vec2 texCoordVarying;  // Varying in fragment shader
  
  precision mediump float;
  
  uniform float lumaThreshold;
  
  uniform float chromaThreshold;
  
  uniform sampler2D SamplerY;
  
  uniform sampler2D SamplerUV;
  
  uniform mat3 colorConversionMatrix;
  
  void main()
  
  {
  
  mediump vec3 yuv;
  
  lowp vec3 rgb;
  
  // Subtract constants to map the video range start at 0
  
  yuv.x = (texture2D(SamplerY, texCoordVarying).r - (16.0/255.0))* lumaThreshold;
  
  yuv.yz = (texture2D(SamplerUV, texCoordVarying).rg - vec2(0.5, 0.5))* chromaThreshold;
  
  rgb = colorConversionMatrix * yuv;
  
  gl_FragColor = vec4(rgb,1);
  
  }
  ```

  