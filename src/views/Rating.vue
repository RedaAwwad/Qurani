<template>
<div>
	<div class="rating">
		<h6 class="center-align">قيم الموقع وارسل لنا ملاحظاتك</h6>
	</div>
	<div class="rating_content">
		<div class="row">
			<form class="col s12" @submit.prevent="sendMessage">
			<div class="row">
				<div class="input-field col s12">
					<i class="material-icons prefix">account_circle</i>
					<input type="text" class="validate" v-model="name.content" placeholder="الاسم">
					<span class="helper-text red-text">{{ name.error }}</span>
				</div>
				<div class="input-field col s12 text_area">
					<i class="material-icons prefix">message</i>
					<textarea class="materialize-textarea" v-model="message.content" placeholder="رسالتك"></textarea>
					<span class="helper-text red-text">{{ message.error }}</span>
				</div>
				<div class="input-field col s12 text_area center-align">
					<button type="submit" class="btn_style">
						إرسال
					</button>
				</div>
			</div>
			</form>
  		</div>
	</div>
</div>
</template>

<script>
	// import { db as firestore } from '../firebase/firebase';
	export default {
		name: 'Rating',
		data() {
			return {
				name: {
					content: null,
					error: null
				},
				message: {
					content: null,
					error: null
				}
			}
		},
		methods: {
			validateInputs() {
				if(!this.name.content) {
					this.name.error = 'اخبرنا باسمك'
				} else {
					this.name.error = null
				}
				if(!this.message.content) {
					this.message.error = 'اكتب رسالتك'
				} else {
					this.message.error = null
				}
			},
			sendMessage() {
				this.validateInputs();

				if(this.name.content && this.message.content) {
					// db.collection('messages').set({
					// 	name: this.name.content,
					// 	message: this.message.content
					// }).then(_=> {
					// 	M.toast({html: 'شكرا لتقييمك'})
					// }).catch(err => console.log(err));

					// this.$firestore.messages.add({
					// 	name: this.name.content,
					// 	message: this.message.content
					// }).then(_ =>  M.toast({html: 'شكرا لتقييمك'}))
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../assets/style/vars';
	.rating {
		padding: 25px;
		box-shadow: $shadow;
		background-color: #fff;
		margin-left: 15px;
		margin-right: 15px;
	}
	.rating_content {
		margin-top: 2rem;
		padding: 25px;
		margin-left: 15px;
		margin-right: 15px;
		box-shadow: $shadow;
		background-color: #fff;
		direction: ltr;
		input,
		textarea {
			text-align: right;
		}
		.text_area {
			margin-top: 2rem;
		}
		.material-icons {
			color: $main !important;
		}
		button {
			margin-left: auto;
			margin-right: auto;
			display: inline-block;
		}
	}

	body.dark {
		.rating,
		.rating_content  {
			box-shadow: $shadow_dark;
			background-color: $dark_sub;
		}
		.rating_content {
			.material-icons {
				color: #fff !important;
			}
		}
	}
	

</style>