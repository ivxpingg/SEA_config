<template>
    <div class="menuTitle-container">
        <span class="name">{{name}}</span>
    </div>
</template>

<script>
    export default {
        name: "menuTitle",
        data() {
            return {};
        },
        props: {
            name: {
                type: String,
                default() {
                    return ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menuTitle-container {
        padding: 13px 0;
        border-bottom: 1px solid #cfcfcf;
        .name {
            display: inline-block;
            padding-left: 9px;
            height: 15px;
            color: #5c5c5c;
            font-size: 14px;
            line-height: 14px;
            border-left: 3px solid #3298c9;
        }
    }
</style>