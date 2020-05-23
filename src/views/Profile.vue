<template>
<div>
    <div>
        <div class="section_content">
            <div class="no_login_msg">مرحبا بك، {{ user.name }}</div>
            <div class="row tabs_wraper">
                <div class="col s12">
                <ul class="tabs">
                    <li @click="toggleTabs('info')" class="tab col s3"><a href="javascript:;" :class="{'active' : currentTab == 'info'}"> 
                        <i class="material-icons">person_pin</i>
                    </a></li>
                    <li @click="toggleTabs('edit')" class="tab col s3"><a href="javascript:;"  :class="{'active' : currentTab == 'edit'}">
                        <i class="material-icons">edit</i> 
                    </a></li>
                    <li @click="toggleTabs('settings')" class="tab col s3"><a href="javascript:;"  :class="{'active' : currentTab == 'settings'}">
                    <i class="material-icons">settings</i>
                    </a></li>
                    <li @click="toggleTabs('delete')" class="tab col s3"><a href="javascript:;"  :class="{'active' : currentTab == 'delete'}">
                        <i class="material-icons">delete</i>
                    </a></li>
                </ul>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="section_content">
            <div class="tab_content" v-if="currentTab == 'info'">
                <div class="tab_head">
                    <i class="material-icons">person_pin</i>بيانات الحساب
                </div>
                <div class="row section_wraper">
                    <div class="col m7">
                        <ul class="user_info">
                            <li>Email: <span>{{ user.email }}</span> </li>
                            <li>Favorite Theme: <span> {{ user.settings.theme }}</span></li>
                            <li>Language: <span> {{ user.settings.lang }}</span></li>
                            <li>Creation Date: <span> {{ user.createdAt.toDate() }}</span></li>
                            <li>Last Edit: <span> {{ user.lastEdit ? user.lastEdit.toDate() : 'no edit'  }}</span></li>
                        </ul>
                    </div>
                    <div class="col m5">
                        <img :src="user.imgUrl" class="profile_image" alt="qurani">
                    </div>
                </div>
            </div>
            <div class="tab_content" v-if="currentTab == 'edit'">
                <div class="tab_head">
                    <i class="material-icons">edit</i> تعديل البيانات
                </div>
                <div class="center-align">
                    لم تتم الإضافة بعد
                </div>
            </div>
            <div class="tab_content" v-if="currentTab == 'settings'">
                <div class="tab_head">
                    <i class="material-icons">settings</i> إعدادات الموقع
                </div>
                <div class="center-align">
                    لم تتم الإضافة بعد
                </div>
            </div>
            <div class="tab_content" v-if="currentTab == 'delete'">
                <div class="tab_head">
                    <i class="material-icons">delete</i> حذف الحساب
                </div>
                <div class="center-align">
                    لم تتم الإضافة بعد
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'Profile',
        data() {
            return {
                currentTab: 'info'
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            toggleTabs(tab) {
				this.currentTab = tab;
			}
        }
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

    .section_wraper {
        margin-top: 1rem;
    }

    .user_info {
        direction: ltr;
        text-align: left;
        li {
            margin: 5px 0;
            padding: 5px;
            span {
                background-color: rgba(246,178,181,0.2);
                display: inline-block;
                padding: 5px;
            }
        }
    }

    .profile_image {
        max-width: 100%;
        max-height: 150px;
    }

    body.dark {
        .tab_content,
        ul.tabs {
            background-color: $dark_sub;
        }
    }
</style>