
// 存储对象和属性的依赖关系
const targetMap = new WeakMap();

// 当前活动的副作用函数
let activeEffect = null;

// 用于创建响应式对象
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return result;
    }
  });
}

// 依赖收集
function track(target, key) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
}

// 派发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

// 用于注册副作用函数
function effect(fn) {
  activeEffect = fn;
  fn(); // 执行一次以进行依赖收集
  activeEffect = null;
}

// 使用示例
const state = reactive({ count: 0 });

effect(() => {
  console.log(`Count is: ${state.count}`);
});

// state.count++; // 触发更新，输出 "Count is: 1"
