<template>
	<div class="main">
		<div class="content-box">
			<div class="content-box-header">
				<div class="box-title">Groups Management</div>
				<div class="box-description">List of groups & group management</div>
			</div>
			<div class="row">
				<div class="col-md-6 sm-text-center">
					<router-link class="btn btn-primary" tag="button" :to="{ name: 'create-group-form' }">
						<i class="pe-7s-plus"></i> Create New Group
					</router-link>
				</div>
				<div @keyup.enter="getGroups" class="col-md-6 sm-text-center form-inline justify-content-end">
					<select v-model="filter.search.field" class="form-control mb-1 mr-sm-1 mb-sm-0 search-field">
						<option value="group_name">Group Name</option>
					</select>
					<input v-model="filter.search.value" class="form-control mb-1 mr-sm-1 mb-sm-0" placeholder="Search" type="text">
					<button class="btn btn-primary" @click="getGroups"><i class="pe-7s-search"></i> Search</button>
				</div>
			</div>
			<div class="table-responsive mt-3">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th class="text-center table-number">No</th>
							<th>Group Name</th>
							<th class="text-center action">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(group, key) in groups">
							<td class="text-center">{{ (key + 1) }}</td>
							<td>{{ group.group_name }}</td>
							<td class="text-center">
								<router-link tag="a" :to="{ name: 'update-group-form', params: { id: group.id } }"><i class="pe-7s-note"></i></router-link>
								<a @click="deleteGroup(group.id)" href="javascript:;"><i class="pe-7s-trash"></i></a>
							</td>
						</tr>
						<tr v-if="!groups.length">
							<td class="text-center" colspan="5">No records found</td>
						</tr>
					</tbody>
				</table>
			</div>
			<pagination @changePage="changePage" @changeLimit="changeLimit" :items="groups" :total="total" :page="filter.page" :limitOptions="filter.limitOptions" :limit="filter.limit"></pagination>
		</div>
	</div>
</template>

<script>
	import group from '../../api/group'
	import Pagination from '../layout/Pagination'

	export default {
		data() {
			return {
				filter: {
					page: 1,
					limit: 5,
					limitOptions: [5, 10, 15, 20],
					search: {
						field: 'group_name',
						value: ''
					}
				},
				groups: [],
				total: 0
			}
		},
		methods: {
			getGroups() {
				var self = this
				group.getGroups(self.filter, data => {
					self.groups = data.rows
					self.total = data.total
				}, err => {
					console.log(err)
				})
			},
			changeLimit(limit) {
				this.filter.page = 1
				this.filter.limit = limit
				this.getGroups()
			},
			changePage(page) {
				this.filter.page = page
				this.getGroups()
            },
            deleteGroup(groupId) {
            	var self = this
				group.deleteGroup({
					id: groupId
				}, data => {
					this.getGroups()
				}, err => {
					console.log(err)
				})
            }
		},
		components: {
			'pagination': Pagination
		},
		mounted() {
			this.getGroups()
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