<template>
    <div>
      <r-header/>
      <r-footer :index="0"/>
    </div>
</template>

<script>
    import RFooter from "./RFooter";
    import RHeader from "./RHeader";

    export default {
      components: {
        RHeader,
        RFooter},
      name: "r-main"
    }
</script>

<style scoped>

</style>
