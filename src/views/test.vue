<template>
    <div class="test">
        我是WEB版
    </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {};
  },
  created() {
    this.$api.logout({
      password: 'qwer1234',
      userNo: '13402318457'
    });
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.test {
  color: red;
}
</style>
