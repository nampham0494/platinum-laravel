<template>
	<div class="main">
		<div class="row">
			<div class="col-md-9">
				<div class="content-box">
					<div class="content-box-header">
						<div class="box-title">Privileges</div>
						<div class="box-description">Manage group privileges</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="table-responsive">
								<table class="table table-striped table-bordered table-groups">
									<thead>
										<tr>
											<th>Groups</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="group in groups">
											<td @click="setActiveGroup(group)" :class="activeGroupClass(group)">
												<div class="group-list">
													<div class="text">{{ group.group_name }}</div>
													<i class="pe-7s-angle-right"></i>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="col-md-8">
							<div class="privilege-wrapper">
								<div class="table-responsive">
									<table class="table table-striped table-bordered table-menus">
										<thead>
											<tr>
												<th>Menu Privileges</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="menu in menus" v-if="hiddenMenus.indexOf(menu.parent_id) === -1">
												<td :class="isChild(menu)">
													<div class="tree-menu">
														<div @click="hideMenu(menu)" class="menu-icon">
															<i class="pe-7s-folder"></i>
														</div>
														<label @click="treeAction(menu)">
															<input type="checkbox" :value="menu.id" v-model="privileges"> {{ menu.title }}
														</label>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 text-right">
									<button class="btn btn-primary mt-3" @click="savePrivileges">
										<i class="pe-7s-check"></i> Save Privileges
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import privilege from '../../api/privilege'
	import group from '../../api/group'
	import menu from '../../api/menu'

	export default {
		data() {
			return {
				activeGroup: 0,
				privileges: [],
				hiddenMenus: [],
				groups: [],
				menus: []
			}
		},
		methods: {
			getAllGroups() {
				var self = this
				group.getAllGroups(data => {
					self.groups = data
					self.activeGroup = self.groups[0].id
					self.getPrivileges(self.activeGroup)
				}, err => {
					console.log(err)
				})
			},
			getMenus() {
				var self = this
				menu.getMenus(data => {
					self.menus = data
					self.initSlimScroll()
				}, err => {
					console.log(err)
				})
			},
			getPrivileges(groupId) {
				var self = this
				privilege.getPrivileges({
					group_id: groupId
				}, data => {
					self.privileges = data
				}, err => {
					console.log(err)
				})
			},
			isChild(menu) {
				if (menu.parent_id != 0) {
					return {
						'child-menu': true
					}
				}
			},
			hideMenu(menu) {
				if (menu.parent_id == 0) {
					var menus = this.hiddenMenus.filter((menuId) => {
						return menuId == menu.id
					})

					if (!menus.length) {
						this.hiddenMenus.push(menu.id)
					} else {
						this.hiddenMenus.forEach((value, key) => {
							if (value == menu.id) {
								this.hiddenMenus.splice(key, 1)
							}
						})
					}
				}
			},
			activeGroupClass(group) {
				if (this.activeGroup == group.id) {
					return {
						'text-right': true,
						'active': true
					}
				} else {
					return {
						'text-right': true
					}
				}
			},
			setActiveGroup(group) {
				this.activeGroup = group.id
				this.getPrivileges(group.id)
			},
			initSlimScroll() {
				$('.privilege-wrapper').slimScroll({
					color: 'rgb(142, 142, 142)',
					height: 350
				})
			},
			savePrivileges() {
				var self = this
				privilege.savePrivileges({
					group_id: self.activeGroup,
					menus: self.privileges
				}, data => {
					this.$store.dispatch('global/getUserMenus').catch((err) => {
						console.log(err)
					})
				}, err => {
					console.log(err)
				})
			},
			treeAction(menu) {
				var isChecked = this.privileges.filter((menuId) => {
					return menuId == menu.id
				})

				if (menu.parent_id == 0) {
					var childMenus = this.menus.filter((childMenu) => {
						return childMenu.parent_id == menu.id
					})

					childMenus.forEach((childMenu, childMenuKey) => {
						this.privileges.forEach((menuId, privilegeKey) => {
							if (childMenu.id == menuId) {
								this.privileges.splice(privilegeKey, 1)
							}
						})
					})

					if (!isChecked.length) {
						childMenus.forEach((childMenu, childMenuKey) => {
							this.privileges.push(childMenu.id)
						})
					}
				} else {
					var childMenus = this.menus.filter((childMenu) => {
						return childMenu.parent_id == menu.parent_id
					})

					this.$nextTick(() => {
						var checkedMenus = childMenus.filter((menu) => {
							return this.privileges.includes(menu.id)
						})

						if (!checkedMenus.length) {
							this.privileges.forEach((menuId, key) => {
								if (menuId == menu.parent_id) {
									this.privileges.splice(key, 1)
								}
							})
						} else {
							if (!this.privileges.includes(menu.parent_id)) {
								this.privileges.push(menu.parent_id)
							}
						}
					})
				}
			}
		},
		mounted() {
			this.getAllGroups()
			this.getMenus()
		}
    }
</script>

<style lang="scss" scoped>
    .table-groups {
    	td {
    		&.active {
    			color: #fff;
	    		background: #0275d8;
	    	}
	    	.group-list {
	    		display: -webkit-box;
	    		display: -moz-box;
	    		display: -ms-flexbox;
	    		display: -webkit-flex;
	    		display: flex;
	    		i {
	    			margin-top: auto;
	    			margin-bottom: auto;
	    			margin-left: auto;
	    		}
	    	}
    	}
    }
    .table-menus {
    	border: 0;
    	th {
    		border-top: 0px;
    	}
	    i {
	    	font-size: 18px;
	    	margin-right: 13px;
	    }
	    .tree-menu {
	    	display: -webkit-box;
	    	display: -moz-box;
	    	display: -ms-flexbox;
	    	display: -webkit-flex;
	    	display: flex;
	    	.menu-icon {
	    		margin-top: 2px;
	    	}
	    	input[type="checkbox"] {
	    		margin-top: 6px;
	    		margin-right: 3px;
	    	}
	    }
	    .child-menu {
	        padding-left: 50px;
        }
    }
    .privilege-wrapper {
    	border-top: 1px solid #f7f6f6;
    	border-bottom: 1px solid #f7f6f6;
    }
</style>