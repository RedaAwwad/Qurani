<template>
<div>
    <div>
        <div class="section_content">
            <div class="no_login_msg">مرحبا بك، {{ $store.state.user.name }}</div>
        </div>
    </div>
    <div>
        <div class="section_content">
            <div class="tab_content">
                <div class="tab_head">
                    <i class="material-icons">person_pin</i>بيانات الحساب
                </div>
            </div>
            <div class="tab_content">
                <div class="tab_head">
                    <i class="material-icons">edit</i> تعديل البيانات
                </div>
            </div>
            <div class="tab_content">
                <div class="tab_head">
                    <i class="material-icons">settings</i> إعدادات الموقع
                </div>
            </div>
            <div class="tab_content">
                <div class="tab_head">
                    <i class="material-icons">delete</i> حذف الحساب
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
    export default {
        name: 'Profile'
    }
</script>

<style lang="scss" scoped>
    @import '../style/_vars.scss';
    .tab_content {
        margin-top: 20px;
        padding: 15px;
        background-color: #fff;
        .tab_head {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }

    ul.tabs {
        padding: 0 20px;
        height: auto;
        min-height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    body.dark {
        .tab_content,
        ul.tabs {
            background-color: $dark_sub;
        }
    }
</style>