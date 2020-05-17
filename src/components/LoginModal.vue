<template>
  <div id="login" class="modal">
    <div class="modal-content">
      <h6 class="modal-title">Login to Your Account</h6>
      <div class="row">
        <form class="col s12" @submit.prevent="login()">
          <div class="row">
            <div class="input-field col m6">
              <i class="material-icons blue-text prefix">email</i>
              <input id="icon_prefix" type="email" class="validate" 
              :class="emailError.status ? 'no-validation' : ''" 
              @blur="emailValidation()" v-model="email">
              <label for="icon_prefix">Email</label>
              <span class="helper-text red-text">{{ emailError.msg }}</span>
            </div>
            <div class="input-field col m6">
              <i class="material-icons blue-text prefix">lock</i>
              <input id="icon_telephone" type="password" class="validate" 
              :class="passError.status ? 'no-validation' : ''" 
              @blur="paswordValidation()" v-model="password">
              <label for="icon_telephone">Password</label>
              <span class="helper-text red-text">{{ passError.msg }}</span>
            </div>
            <div class="col s12">
              <button type="submit" class="btn_style btn_login_modal">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="modal-footer">
      <a href="javascript:;" class="modal-close waves-effect blue-text waves-green btn-flat">Close</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginModal',
    data() {
      return {
        email: null,
        emailError: {
          status: false,
          msg: null
        },
        password: null,
        passError: {
          status: false,
          msg: null
        }
      }
    },
    methods: {
      emailValidation() {
        if(!this.email) {
          this.emailError = {
            status: true,
            msg: 'This field is required!'
          }
        } else {
          if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
            this.emailError = {
              status: false,
              msg: null
            }
          } else {
            this.emailError = {
              status: true,
              msg: 'Please, enter a valid email!'
            }
          }
        }
      },
      paswordValidation() {
        if(!this.password) {
          this.passError = {
            status: true,
            msg: 'Enter your password!'
          }
        } else {
          this.passError = {
            status: false,
            msg: null
          }
        }
      },
      login() {
        this.emailValidation();
        this.paswordValidation();
        if(!this.emailError.status && !this.passError.status) {
          console.log('you are logged in!');

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-title {
    margin-bottom: 25px;
  }
  .modal {
    .btn_login_modal {
      min-width: auto;
      width: 25%;
      padding-top: 13px;
      padding-bottom: 13px;
      justify-content: center;
      margin: 25px auto 0;
      @media screen and (max-width: 767px) {
        width: 45%;
      }
    }
  }
</style>