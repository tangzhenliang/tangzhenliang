# typescript

[官网](https://www.tslang.cn/)

## 介绍

 TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6+ 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

## 特点

- 可以在开发阶段和编译阶段就发现大部分错误，这总比在运行时候出错好
- 不显式的定义类型，也能够自动做出类型推论
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- Google 开发的 Angular 就是使用 TypeScript 编写的
- TypeScript 拥抱了 ES6+ 规范

## 痛点

有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的东西短期可能会增加一些开发成本，多写一些类型的定义，长期维护的项目，TypeScript 能够减少其维护成本

## 安装

```js
npm install -g typescript
tsc -v 测试
```

## 编译

```js
tsc hello.ts
```

> 类型不匹配时，编辑报错，但可以生成js（编辑通过），如果不希望编译通过需要配tsconfig.json



## 类型

### 原始类型

布尔值、数值、字符串、null、undefined、Symbol

void、any、never、联合、函数、数组类型、类 ....

### 内置对象类型

#### DOM

Document、HTMLElement、Event、NodeList ...

#### 工具类型

Boolean、Error、Date、RegExp、Math ...

## 类型注解

```js
声明 变量:类型;           // undefined   || false
声明 变量:类型=值;        //严格要求值是定义的类型

类型权重
	any > boolean number string void 联合、函数、数组类型、类 > null undefined -> never
权重高的类型，接受低权重的类型值，反之亦然
```

## ts变量作用域

### 全局作用域(项目)  **默认**

在一个项目目录下，所有文件的变量都暴露在全局

### 模块作用域(文件)

变量封闭在模块内部，在内部全局使用

## 空类型（void）

```js
function alertName(): void{}  //一个函数不允许返回任何值
```

## 任意类型（any）

any 允许被赋值为任意类型，任何操作都返回任意类型

## 类型推论

没有明确的指定类型，依照值推断出一个类型。

## 联合类型

取值可以为多种类型中的一种,没列出的不可以

```js
let myFavoriteNumber: string | number;
```

## 对象类型

依赖接口来描述,或者class描述

```js
interface Person {
  name:string; //必续
  readonly age:number; //只读
  address?:string;  //可选
  // [key:key类型]:值类型      定义对象任意属性
  [propName:string]:any //必填属性和可选属性，都要是任意属性的子属性（子数据类型)
}

p2={
  name: '刘铁柱',
  age: 16,
  city: '西安'
}
```

## 数组类型

```js
// 变量:类型[] 
// 变量:Array<类型> 
// let 变量:(类型名|类型名2)[]

let arr:number[]=[1,2,3,4]
let arr2:(number|string)[]=['aa',12]
let arr4:Array<number>=[12,3]
```

## 函数类型

对一个函数有输入和输出，进行约束

```jsx
//声明式
//function 函数名(参数:类型):返回类型{}
function sum(x: number, y: number): number {}

//函数表达式
//let 变量:输入类 => 输出类型 = function(参数){}
let show3:(a:number,b:string,c?) => number = function (a,b){
  return a;
}

//接口定义函数类型
interface Func {
  (a:number,b:string):boolean
}
let show5:Func = function(a,b){return false}

```

> 可选参数在后

## 类型断言

绕过编译器的类型推断，手动指定一个值的类型

```js
//<类型>变量 
//变量 as 类型  
//类型断言不做类型转换 
//自定义类型也可以用来做断言
//权重最低

(<string>a).length   //断言字符
(a as string).length
```

## 类型声明文件

ts 使用第三方库时，我们需要引用它的声明文件，declare 关键字来定义它的类型,帮助 TypeScript 判断我们传入的参数类型对不对，声明文件xx.d.ts

```js
declare let $:(any)=>any; //定义

//引入文件  三斜线指令
/// <reference path="./jQuery.d.ts" />
```

安装第三方的库，选择安装类型声明文件，库具备了类型

```js
npm i jquery -S
npm i @types/jquery

import * as $ from 'jquery'
$ 具备类型的

//注意 现在绝大部分的库都具备了类型声明文件，而无需单独安装
```

## 内置对象类型

Boolean、Error、Date、RegExp,Math ...

 Document、HTMLElement、Event、NodeList ..

```js
let b2:Boolean = new Boolean();//对类型内置
let oDiv:HTMLDivElement = document.createElement('div');

//重写 内置对象类型
interface Math {
  pow(x:number,y:string):number|string
}

Math.pow(12,'qq')

```

## 类

定义了一件事物的抽象特点，包含它的属性和方法，对象是类的实例，通过 new 生成，OOP特性封装、继承、多态，类成员（实例属性，方法，静态属性、方法)

**访问控制符**

控制类内部的属性(实例，类)|方法(实例，类) 的被访问权限

```js
//public   公共的 谁(父子)都可以访问(类内外)
//protected  当前类内使用 + 子类类内
//private  当前类内使用

class Person {

  public namee:string='alex';//实例属性
  private age:number; //没有默认值的实例属性
  protected address:string; //没有默认值的实例属性
  address2:string; //不加的情况下 是public

  protected static VER:string='1.11.1' //类属性 静态属性
	
	constructor(public namee:string,public age:number){
    this.namee = namee;//实例属性第一次的修改
    this.age = age||0;//实例属性第一次的修改
    this.address
  }

  private show(){}
  private static show2(){}
}
```

## 接口

用于对象的形状描述，函数的类型、输入出返回值的描述，对类的行为进行抽象

**实现接口**

不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现，对象函数类都可以实现接口

```js
class Person implements Action1{
  ...
}
  
class Person implements Action1,Action2{
  ...
}
```

## 泛型

在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

**函数泛型**

```js
//定义 function 函数<T>(length: number, value: T): Array<T> {}

//调用 函数<string>(参数) //使用的时候再指定类型

//栗子
function swap<T,U>(tuple:[T,U]):[U,T]{
  return [tuple[1],tuple[0]]
}

let result = swap([7,'seven'])// reuslt = ['seven',7]
```

**接口泛型**

```js
interface SearchFunc {
  <T>(source:string,subString:T):Array<T>
}

  //约定函数
let mySearch:SearchFunc = function<T>(source,subString){
  return [subString]
}

mySearch<object>('qq',{a:1,b:2})
  
//约定一个类
interface SearchClass<T>{
  title?:string
  eat(source:string,subString:T):Array<T>
}

class Person3 implements SearchClass<boolean>{
  title?: string = 'bmw'
  eat(source: string, subString: boolean): boolean[] {
    //业务逻辑
    return [true]
  }
}

```

**类泛型**

```js
class Person<T,U>{
  msg:Array<T>;
  msg2:[T,U]

  constructor(msg:Array<T>){

  }
  show<A,V>(arr:[V,A]):void{
    //..
  }
}

new Person<string,number>(['bmw'])
new Person<boolean,number>([false])
```



## 装饰器

- 是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上去装饰他们
- 装饰器使用 @expression这种形式
- expression求值后必须为一个函数
- 它会在运行时被调用，被装饰的声明信息做为参数传入

**定义**

```js
// vuex-class.ts
function State(type:any):any{
  return function(){
    console.log('装饰器业务')
  }
}
function Mutation(type:string):any{
  return function(){
    console.log('装饰器业务')
  }
}
function Component(target:any){
  // do something with "target" ...
  console.log('装饰器',target)
}

export {State,Mutation,Component}
```

**使用**

```js
import {Component,Mutations,State} from 'vuex-class'

//装饰类
@Component
class App {}

Component(
  class App2{}
)

//装饰类成员- 方法
@Component
class App{
  @Mutations('ADD_ITEM') ADD_ITEM:string // this.ADD_ITEM(信息)
}

//装饰类成员- 属性
@Component
class App{
  @State('bNav') stateNav:string // {{this.stateNav}}
}
```

## 元组(Tuple)

表示一个已知元素数量和类型的数组

```ts
let x: [string,number];
x = ['hello',10]
x[1]//10

let [a,b,c] = x; // a = hello b = 10   c= undefined
```



## 枚举(enum)

为一组数值赋予友好的名字

```js
enum Color {Red,Green,Blue,Yellow};//数据位 打0开始
let c: Color = Color.Blue // ouput 2  返回的是数据位
let ColorName:string = Color[2] // 'Blue'
let ColorName2:string = Color[c] // 'Blue'
```

## never

永不存在的值的类型，是任何类型的子类型(包括undefined|null)

```js
let a:never;//never
let a2: never = a; // never只接受never类型的值
let a3: never = 10; //不能有其他值

function show (arg:number):never{
  //返回never的函数必须存在无法达到的终点
  // return arg;
  // return undefined
  // return undefined

  // while(true){}
  throw Error('....')

}
```

## object

非原始类型

```js
function createElement (o:object|null):object{
  return o;
}

let o1 = createElement({prop:'title'}) // ok
let o2 = createElement(null)
// createElement()


export {}
```

## 类型别名（type)

- 类型别名会给一个类型起个新名字
- 类型别名有时和接口很像，不可以extends和 implements
- 但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型
- 不会新建一个类型

**接口(intervace) vs 别名(type)**

|                                      | inteface | type |
| ------------------------------------ | -------- | ---- |
| 约定对象类型                         | √        | √    |
| 约定函数类型                         | √        | √    |
| 同名合并                             | √        | ×    |
| 基础类型、联合类型、元组、自定义类型 | ×        | √    |

> 公共的用 interface 实现，不能用 interface 实现的再用 type 实现。

**栗子**

```js
type Name = string;//类型别名
type NameResolver = ()=>string;//函数类型，返回字符

function getName(n:NameResolver):Name{
  if(typeof n === 'string'){
    return n;
  }else{
    return n()
  }
}

type Container<T> = {a:number,value:T,b:string} //别名 也可以含有泛型

class App {
  o:Container<boolean>={a:12,value:false,b:'bmw'}
}
```

## 交叉类型

## 类型保护

## 字面量类型

## 映射类型

## 索引类型

## TIPS

#### keyof

```ts
interface iPeople {
  name: string;
  age: number
}
 
type T = keyof iPeople // -> "name" | "age"
```

#### in

```tsx
type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }

```

#### typeof

一般我们都是先定义类型，再去赋值使用，但是使用 `typeof` 我们可以把使用顺序倒过来

```ts
const options = {
  a: 1
}
type Options = typeof options
```

#### 条件类型

条件类型可以根据其他类型的特性做出类型的判断

```ts
T extends U ? X : Y
```

**举例**

```ts
interface Id { id: number, /* other fields */ }
interface Name { name: string, /* other fields */ }
declare function createLabel(id: number): Id;
declare function createLabel(name: string): Name;
declare function createLabel(name: string | number): Id | Name;
```

使用条件类型

```ts
type IdOrName<T extends number | string> = T extends number ? Id : Name;
declare function createLabel<T extends number | string>(idOrName: T): T extends number ? Id : Name;
```



### 工具泛型

#### Partial 

作用是将传入的属性变为可选项.

```tsx
interface iPeople {
    title: string;
    name: string;
}
 
const people: Partial<Todo> = {
    title: 'Delete inactive users',
};
//定义的结构可以是接口iPeople的任意key
```

#### Readonly 

Readonly 作用是将传入的属性变为变成只读

```tsx
interface iPeople {
    title: string;
    name: string;
}
 
const people: Readonly<Todo> = {
    title: 'todo list',
    name: chenfeng;
};
//title name属性就是只读的了
```

#### Required 

Required 的作用是将传入的属性变为必选项

```tsx
interface iPeople {
    title?: string;
    name?: string;
}
 
const people: Required<iPeople> = { title: 'ts' }; // Error: property 'name' missing
```

#### Exclude<T,U>

从 `T` 中排除那些可以赋值给 `U` 的类型。

`Exclude`  实现源码  `node_modules/typescript/lib/lib.es5.d.ts` 。

```
type Exclude<T, U> = T extends U ? never : T;
```

实例：

```
type T = Exclude<1|2|3|4|5, 3|4>  // T = 1|2|5 
```

此时 `T` 类型的值只可以为  `1` 、`2` 、 `5` ，当使用其他值是 TS 会进行错误提示。

```
Error:(8, 5) TS2322: Type '3' is not assignable to type '1 | 2 | 5'.
```

#### Extract<T,U>

从 `T` 中提取那些可以赋值给 `U` 的类型。

Extract实现源码  `node_modules/typescript/lib/lib.es5.d.ts`。

```ts
type Extract<T, U> = T extends U ? T : never;
```

实例：

```ts
type T = Extract<1|2|3|4|5, 3|4>  // T = 3|4
```

此时T类型的值只可以为 `3` 、`4` ，当使用其他值时 TS 会进行错误提示：

```
Error:(8, 5) TS2322: Type '5' is not assignable to type '3 | 4'.
```

#### Pick<T,K>

从 `T` 中取出一系列 `K` 的属性。

`Pick` 实现源码 `node_modules/typescript/lib/lib.es5.d.ts`。

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

实例：

假如我们现在有一个类型其拥有 `name` 、 `age` 、 `sex` 属性，当我们想生成一个新的类型只支持 `name` 、`age` 时可以像下面这样：

```ts
interface Person {
  name: string,
  age: number,
  sex: string,
}
let person: Pick<Person, 'name' | 'age'> = {
  name: '小王',
  age: 21,
}
```

#### Record<string,any>

Record<string,any> 用这个来声明对象结构的类型

```tsx
//用于定义一个javascript的对象，key是字符串，value是任意类型
const people:Record<string,any> = {
    name: 'chengfeng',
    age: 10
}
```

## declare