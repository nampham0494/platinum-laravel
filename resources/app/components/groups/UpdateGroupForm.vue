<template>
	<div class="main">
		<div class="row">
			<div class="col-md-6">
				<div class="content-box">
					<div class="content-box-header">
						<div class="box-title">Update Group</div>
						<div class="box-description">This is a form to update group</a></div>
					</div>
					<form>
						<div class="form-group">
							<label for=""> Group Name</label>
							<input class="form-control" v-model="form.group_name" placeholder="Enter Group Name" type="email">
							<ul class="error-messages">
								<li v-for="message in errorMessages.name">{{ message }}</li>
							</ul>
						</div>
					</form>
					<div class="content-box-footer text-right">
						<router-link tag="button" :to="{ name: 'groups' }">
							<button type="button" class="btn btn-default">Cancel</button>
						</router-link>
						<button type="button" class="btn btn-primary" @click="updateGroup" :disabled="btnAction != 'Save' ? true : false">{{ btnAction }}</button>
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
					group_name: ''
				},
				btnAction: 'Save',
				errorMessages: []
			}
		},
		methods: {
			getSingleGroup() {
				var self = this
				group.getSingleGroup({
					id: this.$route.params.id
				}, data => {
					self.form = data
				}, err => {
					console.log(err)
				})
			},
			updateGroup() {
				var self = this
				self.btnAction = 'Saving, please wait...'

				group.updateGroup(self.form, data => {
					this.$router.push({
						name: 'groups'
					})
				}, err => {
					self.errorMessages = err
                   	self.btnAction = 'Save'
				})
			}
		},
		mounted() {
			this.getSingleGroup()
		}
    }
</script>