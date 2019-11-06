<template>
	<div class="main">
		<div class="row">
			<div class="col-md-6">
				<div class="content-box">
					<div class="content-box-header">
						<div class="box-title">Update Product</div>
						<div class="box-description">This is a form to update product</a></div>
					</div>
					<form>
						<div class="form-group">
							<label for=""> Product Name</label>
							<input class="form-control" v-model="form.product_name" placeholder="Enter Product Name">
							<ul class="error-messages">
								<li v-for="message in errorMessages.product_name">{{ message }}</li>
							</ul>
						</div>
						<div class="form-group">
							<label for=""> Price (USD)</label>
							<input class="form-control" v-model="form.price" placeholder="Enter Price">
							<ul class="error-messages">
								<li v-for="message in errorMessages.price">{{ message }}</li>
							</ul>
						</div>
						<div class="form-group">
							<label for=""> Stock</label>
							<input class="form-control" v-model="form.stock" placeholder="Enter Stock">
							<ul class="error-messages">
								<li v-for="message in errorMessages.stock">{{ message }}</li>
							</ul>
						</div>
						<div class="form-group">
							<label for=""> Images</label>
							<div class="uploader">
								<button type="button" class="btn btn-primary" id="uploader-button">Choose Images</button>
							</div>
							<ul class="error-messages">
								<li v-for="message in errorMessages.images">{{ message }}</li>
							</ul>
						</div>
						<div class="form-group">
							<label for=""> Description</label>
							<textarea class="form-control" v-model="form.description" placeholder="Enter Description"></textarea>
							<ul class="error-messages">
								<li v-for="message in errorMessages.description">{{ message }}</li>
							</ul>
						</div>
					</form>
					<div class="content-box-footer text-right">
						<router-link tag="button" :to="{ name: 'products' }">
							<button type="button" class="btn btn-default">Cancel</button>
						</router-link>
						<button type="button" class="btn btn-primary" @click="updateProduct" :disabled="btnAction != 'Save' ? true : false">{{ btnAction }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import product from '../../api/product'

	export default {
		data() {
			return {
				form: {
					product_name: '',
					price: '',
					stock: '',
					images: '',
					description: ''
				},
				uploader: [],
				btnAction: 'Save',
				errorMessages: []
			}
		},
		methods: {
			getImages() {
				var images = $('input[name="images"]').val()
				if (JSON.parse(images).length) {
					return images
				} else {
					return ''
				}
			},
			getSingleProduct() {
				var self = this
				product.getSingleProduct({
					id: this.$route.params.id
				}, data => {
					self.form = data
					self.uploader.set_files(data.images)
				}, err => {
					console.log(err)
				})
			},
			updateProduct() {
				var self = this
				self.btnAction = 'Saving, please wait...'
				self.form.images = this.getImages()

				product.updateProduct(self.form, data => {
					this.$router.push({
						name: 'products'
					})
				}, err => {
					self.errorMessages = err
                   	self.btnAction = 'Save'
				})
			},
			initUploader() {
				var self = this
				this.uploader = $('#uploader-button').uploader({
					upload_url: window.location.origin + '/media/upload',
					file_picker_url: window.location.origin + '/media/get-files',
					input_name: 'images',
					maximum_total_files: 4,
					maximum_file_size: 5000000,
					file_types_allowed: ['image/jpeg', 'image/png'],
					on_before_upload: function() {
						self.btnAction = 'Uploading Images...'
					},
					on_success_upload: function() {
						self.btnAction = 'Save'
					},
					on_error: function(err) {
						console.log(err)
					}
				})
			}
		},
		mounted() {
			this.initUploader()
			this.getSingleProduct()
		}
    }
</script>