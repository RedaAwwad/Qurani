<template>
  <div id="register" class="modal">
    <div class="modal-content">
      <h6 class="modal-title">تسجيل حساب جديد</h6>
      <div class="row">
        <form class="col s12" @submit.prevent="register()">
          <div class="row">
            <div class="input-field col m6">
              <i class="material-icons blue-text prefix">person</i>
              <input
                
                type="text"
                class="validate"
                :class="validationsError.fullName ? 'no-validation' : ''"
                @blur="validations('fullName')"
                v-model="user.fullName"
                @focus="resetRegisterError()"
              />
              <label for="icon_prefix">الاسم كاملآ</label>
              <span class="helper-text red-text">{{ validationsError.fullName  }}</span>
            </div>
            <div class="input-field col m6">
              <i class="material-icons blue-text prefix">email</i>
              <input
                type="email"
                class="validate"
                :class="validationsError.email ? 'no-validation' : ''"
                @blur="validations('email')"
                v-model="user.email"
                @focus="resetRegisterError()"
              />
              <label for="icon_prefix">الأيميل</label>
              <span class="helper-text red-text">{{ validationsError.email  }}</span>
            </div>
            <div class="input-field col m6">
              <i class="material-icons blue-text prefix">lock_outline</i>
              <input
                type="password"
                class="validate"
                :class="validationsError.password ? 'no-validation' : ''"
                @blur="validations('password')"
                v-model="user.password"
                @focus="resetRegisterError()"
              />
              <label for="icon_telephone">كلمة المرور</label>
              <span class="helper-text red-text">{{ validationsError.password }}</span>
            </div>
            <div class="input-field col m6">
              <i class="material-icons blue-text prefix">lock</i>
              <input
                type="password"
                class="validate"
                :class="validationsError.confirmPass ? 'no-validation' : ''"
                @blur="validations('confirmPass')"
                v-model="user.confirmPass"
                @focus="resetRegisterError()"
              />
              <label for="icon_telephone">تأكيد كلمة المرور</label>
              <span class="helper-text red-text">{{ validationsError.confirmPass }}</span>
            </div>
              <div class="file-field input-field col s12">
              <div class="btn blue">
                <span>أفتار</span>
                <input @change="validateAvatarUploading" type="file" accept="jpg, png, svg">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="اختر صورتك الشخصية">
                <span class="helper-text red-text" :class="{'green-text' : !this.validationsError.status}">{{ validationsError.imgUrl }}</span>
              </div>
            </div>
            <div class="col s12">
              <button type="submit" :disabled="fetchingData" class="btn_style btn_login_modal">
                تسجيل حساب
                <div class="progress" v-if="fetchingData">
                    <div class="indeterminate"></div>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <span class="helper-text red-text">{{ registerError.msg }}</span>
      <a
        href="javascript:;"
        class="modal-close waves-effect blue-text waves-green btn-flat"
        >إغلاق</a
      >
    </div>
  </div>
</template>

<script>
  import { firebase,  registerUser, setDataCollection, updateDataCollection} from '../firebase/firebase';
  // import { timeNow } from '../modules/timeNow';

  export default {
    name: 'RegisterModal',
    data() {
      return {
        fetchingData: false,
        user: {
          fullName: null,
          email: null,
          password: null,
          confirmPass: null,
          imgUrl: 'https://firebasestorage.googleapis.com/v0/b/qurani-3dc88.appspot.com/o/default-profile.png?alt=media&token=9da04e47-ba00-40c1-9f06-9d1ce81d49f4'
        },
        avatarUploadingData: {
          name: null,
          file: null
        },
        validationsError: {
          status: false,
          fullName: null,
          email: null,
          password: null,
          confirmPass: null,
          imgUrl: null
        },
        registerError: {
          status: false,
          msg: null
        },
        required: '!هذا الحقل مطلوب',
      }
    },
    methods: {
      validations(input) {
        if(input === 'fullName') {

          if(!this.user.fullName) {
              this.validationsError.status =  true;
              this.validationsError.fullName = this.required;
          } else this.validationsError.fullName = null;

        } else if (input === 'email') {

          if(!this.user.email) {
            this.validationsError.status = true;
            this.validationsError.email = this.required;
          } else if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
            this.validationsError.status = true;
            this.validationsError.email = 'ادخل ايميلا صحيحا';

          } else this.validationsError.email = null;

        } else if (input === 'password') {

          if(!this.user.password) {
              this.validationsError.status = true;
              this.validationsError.password = this.required;
            } else if (this.user.password.length < 6) {
              this.validationsError.status = true;
              this.validationsError.password = 'يجب أن تكون كلمة المرور ستة خانات على الأقل';
            }  else this.validationsError.password = null;

        } else if (input === 'confirmPass') {

          if(!this.user.confirmPass) {
            this.validationsError.status = true;
            this.validationsError.confirmPass = this.required;

            } else if (this.user.password && this.user.confirmPass !== this.user.password) {
              this.validationsError.status = true;
              this.validationsError.confirmPass = 'كلمتا السر غير متطابقتان';

              }  else if (!this.user.password && this.user.confirmPass) {
                this.validationsError.status = true;
                this.validationsError.confirmPass = 'ادخل كلمة السر أولا';

              } else this.validationsError.confirmPass = null;
        }

      },
      register() {

        if(this.user.fullName && this.user.email && this.user.password && this.user.password === this.user.confirmPass) {

          this.fetchingData = true;

        firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then((user) => {
              // const userId  = user.user.uid ;

              // Set Collections For The New User
              this.setCollectionsForNewUser(user);
          
  
            }).catch((error) => {
  
              if(error.message.match('email address is already in use')) {
                error.message = 'هذا الأيميل مسجل من قبل';
              }
              this.registerError = {
                    status: true,
                    msg: error.message
                  }
              this.fetchingData = false;
            });

        } else {
          this.registerError = {
              status: true,
              msg: '!تحقق من بيانات الإدخال'
            }
        }
      },
      setCollectionsForNewUser(user) {
        // Set Prfiles Collection First And Assign User Data to It
        const userId = user.user.uid;
        const userData = {
                name: this.user.fullName,
                uid: userId,
                email: user.user.email,
                isAdmin: false,
                createdAt: new Date(),
                lastEdit: null,
                imgUrl: this.user.imgUrl,
                settings: {
                  theme: window.localStorage.getItem('theme_for_qurani'),
                  lang: 'ar'
                } ,
                favouriteReciters: null,
                playlist: null
            }
        setDataCollection('profiles', userId, userData).then((res) => {
                // Fire Get User Data Function To Get User Data For The Current User
                this.$store.dispatch("getUserData", );
                this.fetchingData = false;

                  // Upload Avatar Photo If Exist
                // if(this.avatarUploadingData.file) {
                //   this.uploadAvatar(userId).then(res => console.log(res)).catch(err => console.log(err));
                // }

                  // Redirect To The User's Profile And Show Welcome Message
                  this.$router.push('/profile');
                  M.toast({html:   'تم تسجيل حسابك بنجاح، أهلا بك يا ' + this.user.fullName });
  
                  // Reset Register Form
                  this.user = null;

              }).catch(err => {
                //  If Not Set Profiles Collection
                console.log(err.message);
                this.fetchingData = false;
              })

      },
      validateAvatarUploading(e) {
        let file = e.target.files[0];
        console.log(file);
        const availableTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
        if(!file) {
          this.avatarUploadingData.name = null;
          this.avatarUploadingData.file = null;
        }

        if(e.target.files.length > 1 ||  e.target.files.length == 0) {
          this.validationsError.status = false;
          this.validationsError.imgUrl = 'لا بأس، يمكنك اختيار صورة فى وقت لاحق';
          this.avatarUploadingData.name = null;
          this.avatarUploadingData.file = null;
        } else {
          if(file.type !== undefined) {
              if(availableTypes.includes(file.type)) {
                this.validationsError.status = false;
                this.validationsError.imgUrl = null;

                this.avatarUploadingData.name = file.name;
                this.avatarUploadingData.file = file;
              } else {
                  this.validationsError.status = true;
                  this.validationsError.imgUrl = 'يمكنك رفع ملف من نوع صورة فقط';
                  this.avatarUploadingData.name = null;
                  this.avatarUploadingData.file = null;
              }
          } else {
            this.validationsError.status = true;
            this.validationsError.imgUrl = 'خطأ';
          }
        }
      },
      async uploadAvatar(userId) {
        if(!this.status && !this.validationsError.imgUrl) {
          
            setTimeout(() => {
              M.toast({html:   'نعتذر، سوف يتم تحميل الصورة لاحقا'})
            }, 3500);


          // const mountainsRef = await firebase.storage().ref()

          // mountainsRef.child('users_imgs/' + this.avatarUploadingData.name);

          // M.toast({html:   'جار تحميل الصورة'})

          // const uploadTask = mountainsRef.put(this.avatarUploadingData.file).on('state_changed', (snapshot) => {

          //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          //   this.$emit('updateFileLoader', progress);
          
          // }, (error) => {
          //   console.log(error.message);
          //   M.toast({html:   'خطأ' + error.message });
          // }, () => {
          //   uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          //       updateDataCollection('profiles', userId, {
          //       imgUrl: downloadURL
          //     }).then(_ => M.toast({html:   'تم تحميل الصورة بنجاح'}));
            // });
          // });
        }
      },
      resetRegisterError() {
        this.registerError = {
            status: false,
            msg: null
          }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/_modal.scss';
  .progress {
    position: absolute;
    bottom: -14px;
    width: 80%;
    background-color: #0969cc;
    .indeterminate {background-color: #fff;}
  }
</style>