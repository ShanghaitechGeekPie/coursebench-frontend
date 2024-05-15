<template>
    <div class="d-flex justify-center activity-banner" :style="{
        'background-color': $vuetify.theme.dark ? '#2a4165' : '#e8f0fe',
    }" v-if=Enable>
        <div class="d-flex justify-center flex-column">
            <div class="text-body-1 primary--text">
            <slot/>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'ActivityBanner',
    props: {
        Enable: Boolean
    },
    setup() {
    },
}

</script>
<style scoped>
.activity-banner {
    height: 48px;

    position: absolute;
    width: 100%;
    /* opacity: 0.9; */
}
</style>