<template>
<div>
    <div>
        <div class="section_content">
            <div class="no_login_msg">مرحبا بك، {{ $store.state.user.name }}</div>
        </div>
    </div>
	 <div class="row tabs_wraper">
    <div class="col s12">
      <ul class="tabs">
        <li @click="toggleTabs('charts')" class="tab col s3"><a :class="{'active' : currentTab == 'charts'}" href="javascript:;"> 
			<i class="material-icons">show_chart</i>
		</a></li>
        <li @click="toggleTabs('users')" class="tab col s3"><a :class="{'active' : currentTab == 'users'}" href="javascript:;">
			<i class="material-icons">people</i>
		</a></li>
        <li @click="toggleTabs('settings')" class="tab col s3"><a :class="{'active' : currentTab == 'settings'}" href="javascript:;">
			<i class="material-icons">settings</i>
		</a></li>
        <li @click="toggleTabs('visitors')" class="tab col s3"><a :class="{'active' : currentTab == 'visitors'}" href="javascript:;">
			<i class="material-icons">people_outline</i>
		</a></li>
      </ul>
    </div>
  </div>
    <div>
		<loading v-if="!users" />
        <div class="section_content" v-if="users">
            <div v-if="currentTab === 'charts'" class="tab_content">
                <div class="tab_head">
                <i class="material-icons">show_chart</i>إحصاءات الموقع
                </div>
				<div class="tab_body">
					<div class="card custom">
						<div class="card-image">
							إجمالى الأعضاء
						</div>
						<h4>{{ users.length }}</h4>
					</div>
					<div class="card custom">
						<div class="card-image">
							الأعضاء المسجلين اليوم
						</div>
						<h4>{{ countUsers.usersToday }}</h4>
					</div>
					<div class="card custom">
						<div class="card-image">
							عدد مديرين الموقع
						</div>
						<h4>{{ countUsers.admins }}</h4>
					</div>
				</div>
            </div>
            <div v-if="currentTab === 'users'" class="tab_content">
                <div class="tab_head">
                    <i class="material-icons">people</i> المستخدمين
                </div>
				<div class="tab_body">
					<div class="card" v-for="user in users" :key="user.uid">
						<span @click="deleteUser(user)" class="delete_icon">
							<i class="material-icons">delete</i>
						</span>
						<div class="card-image">
							<img :src="user.imgUrl">
							<div class="user_data">
								<h5>{{ user.name }}</h5>
								<span>{{ user.email }}</span>
							</div>
						</div>
						<div class="card-action">
						<a :class="user.isAdmin ? 'admin' : 'user'">{{ user.isAdmin ?  'Admin'  : 'User'}}</a>
						<a>{{ user.createdAt.toDate().toDateString() }}</a>
						<a>{{ user.settings.lang }}</a>
						<a>{{ user.settings.theme }}</a>
						<a>{{ user.lastEdit ? 'Edited: ' + user.lastEdit.toDate().toDateString()  : 'No Edit'}}</a>
						<!-- <div class="user_id">{{ user.uid }}</div> -->
						</div>
					</div>
				</div>
            </div>
            <div v-if="currentTab === 'settings'" class="tab_content">
                <div class="tab_head">
                    <i class="material-icons">settings</i> إعدادات الموقع
                </div>
            </div>
            <div v-if="currentTab === 'visitors'" class="tab_content">
                <div class="tab_head">
                    <i class="material-icons">people_outline</i> الزوار
                </div>
            </div>
        </div>
    </div>
	
</div>

</template>

<script>
	import { firebase, db as firestore } from '../firebase/firebase';
	import Loading from '../components/Loading.vue';

    export default {
		name: 'Admin',
		components: {
			Loading
		},
		data() {
			return {
				users: null,
				createdTodayUsers: 0,
				adminsCount: 0,
				currentTab: 'charts'
			}
		},
		computed: {
				countUsers() {
				let usersToday = 0;
				let admins = 0;
				for(let i = 0; i < this.users.length; i++) {
					let year = ( new Date(this.users[i].createdAt * 1000).getFullYear() ) - 1969;

					let userDate = `${new Date(this.users[i].createdAt * 1000).getDate()} ${new Date(this.users[i].createdAt * 1000).getMonth()} ${year}`;
					let today = `${new Date().getDate()} ${new Date().getMonth()} ${new Date().getFullYear()}`;
					
					if(userDate == today) usersToday ++;

					if(this.users[i].isAdmin) admins ++;
				}

				return {
					usersToday,
					admins
				}
			}
		},
		// firestore () {
		// 	return {
		// 		users: firestore.collection('profiles')
		// 	}
		// },
		methods: {
		
			toggleTabs(tab) {
				this.currentTab = tab;
			},
			deleteUser(user) {
				Swal.fire({
					title: `هل تريد حذف ${user.name}؟`,
					confirmButtonText: 'نعم',
					cancelButtonText: 'لا',
					showCancelButton: true
				}).then (res=> {
					if(res.value) {
						if(user.isAdmin) {
							M.toast({html:   'غير مسموح بحذف أعضاء الإدارة بشكل مباشر' })
						} else {
							if(this.$store.state.user.isAdmin) {
								this.$firestore.users.doc(user.id).delete()
								.then(_=>   M.toast({html:   'تم الحذف' }))
								.catch(err => console.log(err));
							} else {
								M.toast({html:   'غير مسموح لك بحذف الأعضاء الآخرين' , classes: 'red'})
							}
						}
					}
				});
			}
		},
		mounted() {
			this.$binding("users", firestore.collection("profiles"))
			.then((data) => {
				// this.countUsers(data);
			})
			// this.countUsers(users);
		}
    }
</script>

<style lang="scss" scoped>
	@import '../style/_admin.scss';
</style>