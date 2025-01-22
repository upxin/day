<!--
 * @Author: lijuntang lijuntang@trip.com
 * @Date: 2022-09-27 10:52:41
 * @LastEditors: lijuntang lijuntang@trip.com
 * @LastEditTime: 2023-05-12 11:26:29
 * @FilePath: \fkb-ui-pc\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive" /> -->
     <div>{{ list[1].item }}</div>
     <div>{{ obj.a }}</div>
     <el-button @click="changeP">change</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      obj: { a:'kkkk' },
      list: [1, { item: 4, k: 8 }]
    };
  },
  created() {
    this._p = this.createProxy(this.list);
    this._p2 = this.createProxy(this.obj);
  },
  methods: {
    changeP(){
      this._p[0] = 9;
      this._p[1].item = 7;
      this._p2.a = 'asdadsa'
    },
    createProxy(obj, path = 'list') {
      const _C = this;
      return new Proxy(obj, {
        set(target, property, value) {
          const fullPath = `${path}[${property}]`;
          console.log('Set==========', fullPath, target, property, value);
          // 使用 Vue.set 来确保响应式更新
          _C.$set(target, property, value);
          return true;
        },
        get(target, property) {
          const fullPath = `${path}[${property}]`;
          const value = target[property];
          // 如果属性值是对象，则递归创建代理
          if (typeof value === 'object' && value !== null) {
            return _C.createProxy(value, fullPath);
          }
          return value;
        }
      });
    }
  }
};
</script>
