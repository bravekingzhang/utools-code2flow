<template>
    <div>{{msg}}</div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:{
        msg: {
            type: String,
            required: true
        }
    }
}
</script>