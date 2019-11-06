<template>
	<div class="auth-wrapper">
		<div class="auth-header">
			<div class="auth-title">Platinum</div>
			<div class="auth-subtitle">Laravel & Vuejs SPA Admin Starter</div>
			<div class="auth-label">Login</div>
		</div>
		<div class="auth-body">
			<form @keyup.enter="login">
				<div class="auth-content">
					<div class="form-group">
						<label>Email</label>
						<input class="form-control" placeholder="Enter email" type="email" v-model="form.email">
						<ul class="error-messages">
							<li v-for="message in errorMessages.email">{{ message }}</li>
						</ul>
					</div>
					<div class="form-group">
						<label>Password</label>
						<input class="form-control" placeholder="Enter password" type="password" v-model="form.password">
						<ul class="error-messages">
							<li v-for="message in errorMessages.password">{{ message }}</li>
						</ul>
					</div>
				</div>
				<div class="auth-footer sm-text-center">
					<button type="button" class="btn btn-primary" @click="login" :disabled="btnAction != 'Log me in' ? true : false">{{ btnAction }}</button>
					<div class="pull-right auth-link sm-mgtop-20">
						<label class="check-label"><input type="checkbox"> Remember Me</label>
						<div class="devider"></div>
						<a href="">Forgot Password?</a>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import auth from '../../api/auth'

	export default {
		data() {
			return {
				form: {
					email: '',
					password: ''
				},
				btnAction: 'Log me in',
				errorMessages: []
			}
		},
		methods: {
			login() {
				var self = this
				self.btnAction = 'Logging in...'

				auth.login(self.form, data => {
					localStorage.setItem('user', JSON.stringify(data))
					this.$router.push({
						name: 'home-template'
					})
				}, err => {
					self.errorMessages = err
                   	self.btnAction = 'Log me in'
					self.form.password = ''
				})
			}
		}
    }
</script>