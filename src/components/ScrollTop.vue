<template>
    <a @click="scrollTop" v-if="visible" class="bottom-right" :class="{menu : menu}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffab40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-left-up"><polyline points="14 9 9 4 4 9"/><path d="M20 20h-7a4 4 0 0 1-4-4V4"/></svg>
    </a>
</template>

<script>
export default {
    name: 'ScrollTop',
    props: ['menu'],
    data () {
        return {
            visible: false
        }
    },
    methods: {
        scrollTop() {
            this.intervalId = setInterval(_ => {
                if (window.pageYOffset === 0) clearInterval(this.intervalId);
                window.scroll(0, window.pageYOffset - 50);
            }, 16.66);
        },
        scrollListener() {
            this.visible = window.scrollY > 150;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollListener);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollListener);
    }
}
</script>

<style lang="scss" scoped>
    .bottom-right {
        position: fixed;
        bottom: 20px;
        right: 2px;
        padding: 5px;
        display: flex;
        border-radius: 3px;
        cursor: pointer;
        z-index: 999;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        animation: slideRight .25s cubic-bezier(.68, -.55, .265, 1.55);
        @keyframes slideRight {
            from {bottom: 0;}
            to {bottom: 20px;}
        }
        &.menu {
            right: 20%;
        }
        @media screen and (max-width: 991px) {
            &.menu {
                right: 30%;
            }
        }
        @media screen and (max-width: 850px) {
            &.menu {
                right: 20px;
            }
        }
    }
</style>