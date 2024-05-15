#### 应用场景

### useSelectArray()

应用场景：一般用于后端给你统一返回 Select 组件的多个 option 子组件
使用方法：

```tsx
const dataOption: any = [
    {
        name: [
            { name: 'jack', id: 0 },
            { name: 'lucy', id: 1 },
            { name: 'Yiminghe', id: 2 },
            { name: 'disabled', id: 3 }
        ]
    },
    {
        lily: [
            { name: 'tom', id: 0 },
            { name: 'sam', id: 1 },
            { name: 'gouya', id: 2 },
            { name: 'goulaoda', id: 3 }
        ]
    }
];
let res1 = myInstance.useSelectArray(dataOption, 'lily');
```

### useSort()

应用场景：给二维数组排序
使用方法：

```tsx
const data: any = [
    { name: '狗牙', age: 3, sex: '女', hobby: '踢足球' },
    { name: 'Silly', age: 2, sex: '女', hobby: '打篮球' },
    { name: '狗老大', age: 2, sex: '女', hobby: '打篮球' },
    { name: 'Tom', age: 2, sex: '女', hobby: '打篮球' },
    { name: 'Lily', age: 2, sex: '女', hobby: '打篮球' }
];
const arraySort: any = ['狗老大', '狗牙', 'Lily', 'Tom', 'Silly'];
const myInstance = new UtilsClass();
let res2 = myInstance.useSort(data, arraySort, { label: 'name' });
```

### useOption()

应用场景：给二维数组排序
使用方法：
返回一个 Con 函数 在 <Select onChange={onChange}>{Con(am)}</Select>组件里调用

```tsx
let am: any = [
    { label: 'xiaodu', id: 0 },
    { label: 'wang', id: 1 },
    { label: 'li', id: 2 },
    { label: 'laowang', id: 3 }
];
const Con = myInstance.useOption(['label', 'id']);
<Select onChange={onChange}>{Con(am)}</Select>;
```

### useSendParams()

应用场景：跨代组件之间传值
使用方法：

祖先组件使用方法：

```tsx

```

子组件使用方法：

```tsx

```
