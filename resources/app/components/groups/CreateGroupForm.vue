<template>
	<div class="main">
		<div class="row">
			<div class="col-md-6">
				<div class="content-box">
					<div class="content-box-header">
						<div class="box-title">Create New Group</div>
						<div class="box-description">This is a form to create new group</a></div>
					</div>
					<form>
						<div class="form-group">
							<label for=""> Group Name</label>
							<input class="form-control" v-model="form.group_name" placeholder="Enter Group Name" type="email">
							<ul class="error-messages">
								<li v-for="message in errorMessages.group_name">{{ message }}</li>
							</ul>
						</div>
					</form>
					<div class="content-box-footer text-right">
						<router-link tag="button" :to="{ name: 'groups' }">
							<button type="button" class="btn btn-default">Cancel</button>
						</router-link>
						<button type="button" class="btn btn-primary" @click="createGroup" :disabled="btnAction != 'Save' ? true : false">{{ btnAction }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import group from '../../api/group'

	export default {
		data() {
			return {
				groups: [],
				form: {
					name: '',
					email: '',
					password: '',
					password_confirmation: '',
					group_id: ''
				},
				btnAction: 'Save',
				errorMessages: []
			}
		},
		methods: {
			createGroup() {
				var self = this
				self.btnAction = 'Saving, please wait...'

				group.createGroup(self.form, data => {
					this.$router.push({
						name: 'groups'
					})
				}, err => {
					self.errorMessages = err
                   	self.btnAction = 'Save'
				})
			}
		}
    }
</script>