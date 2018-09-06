<template>
    <div>
      <van-panel title="标题" desc="描述信息" status="状态">
        <div>内容</div>
        <div slot="footer">
          <van-button size="small">按钮</van-button>
          <van-button size="small" type="danger">按钮</van-button>
        </div>
      </van-panel>
    </div>
</template>

<script>
    export default {
        name: "my"
    }
</script>

<style scoped>

</style>
