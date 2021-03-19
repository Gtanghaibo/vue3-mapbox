<template>
  <div>vue test</div>
</template>


<script>
export default {
    data() {
        return {

        }
    },
    created() {
        console.log('create')
    },
    destroyed() {
        console.log('destroy')
    },
    beforeUnmount() {
        console.log('before destory')
    }
}

</script>
