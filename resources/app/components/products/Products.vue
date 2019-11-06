<template>
	<div class="main">
		<div class="content-box">
			<div class="content-box-header">
				<div class="box-title">Products Management</div>
				<div class="box-description">List of products & product management</div>
			</div>
			<div class="row">
				<div class="col-md-6 sm-text-center">
					<router-link class="btn btn-primary" tag="button" :to="{ name: 'create-product-form' }">
						<i class="pe-7s-plus"></i> Create New Product
					</router-link>
				</div>
				<div @keyup.enter="getProducts" class="col-md-6 sm-text-center form-inline justify-content-end">
					<select v-model="filter.search.field" class="form-control mb-1 mr-sm-1 mb-sm-0 search-field">
						<option value="product_name">Product Name</option>
						<option value="price">Price</option>
						<option value="stock">Stock</option>
					</select>
					<input v-model="filter.search.value" class="form-control mb-1 mr-sm-1 mb-sm-0" placeholder="Search" type="text">
					<button class="btn btn-primary" @click="getProducts"><i class="pe-7s-search"></i> Search</button>
				</div>
			</div>
			<div class="table-responsive mt-3">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th class="text-center table-number">No</th>
							<th>Product Name</th>
							<th class="text-right">Price</th>
							<th class="text-right">Stock</th>
							<th class="text-center action">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(product, key) in products">
							<td class="text-center">{{ (key + 1) }}</td>
							<td>{{ product.product_name }}</td>
							<td class="text-right">
								<span class="badge badge-yellow">${{ product.price }}</span>
							</td>
							<td class="text-right">{{ product.stock }}</td>
							<td class="text-center">
								<router-link tag="a" :to="{ name: 'update-product-form', params: { id: product.id } }"><i class="pe-7s-note"></i></router-link>
								<a @click="deleteProduct(product.id)" href="javascript:;"><i class="pe-7s-trash"></i></a>
							</td>
						</tr>
						<tr v-if="!products.length">
							<td class="text-center" colspan="5">No records found</td>
						</tr>
					</tbody>
				</table>
			</div>
			<pagination @changePage="changePage" @changeLimit="changeLimit" :items="products" :total="total" :page="filter.page" :limitOptions="filter.limitOptions" :limit="filter.limit"></pagination>
		</div>
	</div>
</template>

<script>
	import product from '../../api/product'
	import Pagination from '../layout/Pagination'

	export default {
		data() {
			return {
				filter: {
					page: 1,
					limit: 5,
					limitOptions: [5, 10, 15, 20],
					search: {
						field: 'product_name',
						value: ''
					}
				},
				products: [],
				total: 0
			}
		},
		methods: {
			getProducts() {
				var self = this
				product.getProducts(self.filter, data => {
					self.products = data.rows
					self.total = data.total
				}, err => {
					console.log(err)
				})
			},
			changeLimit(limit) {
				this.filter.page = 1
				this.filter.limit = limit
				this.getProducts()
			},
			changePage(page) {
				this.filter.page = page
				this.getProducts()
            },
            deleteProduct(productId) {
            	var self = this
				product.deleteProduct({
					id: productId
				}, data => {
					this.getProducts()
				}, err => {
					console.log(err)
				})
            }
		},
		components: {
			'pagination': Pagination
		},
		mounted() {
			this.getProducts()
		}
    }
</script>

<style lang="scss" scoped>
    .search-field {
    	min-width: 120px;
    }
    .table {
	    a {
		    color: #2675dc;
	    }
	    .table-number {
    	    width: 60px;
        }
        .action {
    	    width: 100px;
        }
    }
</style>