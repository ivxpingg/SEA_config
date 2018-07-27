<template>
    <div class="addTheme-container">
        <vMenuTitle class="menu-title" name="微分析配置"></vMenuTitle>
        <div class="iframe-content">
            <iframe src="http://xmsoc.com:20500/#/AddTheme"
                    frameborder="0"
                    marginheight="0"
                    height="900px"
                    scrolling="auto"
                    width="100%"></iframe>
        </div>
    </div>
</template>

<script>
    import vMenuTitle from '../menuTitle/menuTitle';
    export default {
        name: "addTheme",
        components: {vMenuTitle},
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .addTheme-container {
        position: relative;
        height: 100%;
        .menu-title {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }

        .iframe-content {
            padding-top: 45px;
            height: 100%;
        }
    }
</style>