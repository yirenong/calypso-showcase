<template>
    <aside :class="['app-sidebar', { collapsed }]">
        <!-- Logo -->
        <div class="logo-section">
            <img src="@/assets/cavill_logo.png" alt="Logo" class="logo" />
        </div>

        <!-- Scrollable menu -->
        <nav class="nav-scroll">
            <div class="menu-section">
                <span class="menu-title" v-if="!collapsed">Menu</span>
                <ul class="menu">
                    <li class="menu-item">
                        <router-link to="/" class="menu-link">
                            <i class="fas fa-home"></i>
                            <span v-if="!collapsed">Homepage</span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <span class="menu-title" v-if="!collapsed">Management</span>

                <ul class="menu">
                    <!-- Energy -->
                    <li class="menu-item dropdown">
                        <div class="menu-link" @click="toggleDropdown('energyManagement')">
                            <i class="fas fa-bolt"></i>
                            <span v-if="!collapsed">Energy Management</span>
                            <i class="fas fa-chevron-down dropdown-icon"
                                :class="{ rotated: dropdowns.energyManagement }" v-if="!collapsed"></i>
                        </div>
                        <ul v-if="dropdowns.energyManagement && !collapsed" class="submenu">
                            <li><router-link to="/energy-management" class="menu-link">Overview</router-link></li>
                            <li><router-link to="/energy-management/historical-data"
                                    class="menu-link">Charts</router-link></li>
                            <li><router-link to="/energy-management/deviceFloorplan" class="menu-link">Device
                                    Floorplan</router-link></li>
                            <li><router-link to="/energy-management/dataLog" class="menu-link">Data Logs</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul class="menu">
                    <!-- Water -->
                    <li class="menu-item dropdown">
                        <div class="menu-link" @click="toggleDropdown('waterManagement')">
                            <i class="fas fa-tint"></i>
                            <span v-if="!collapsed">Water Management</span>
                            <i class="fas fa-chevron-down dropdown-icon" :class="{ rotated: dropdowns.waterManagement }"
                                v-if="!collapsed"></i>
                        </div>
                        <ul v-if="dropdowns.waterManagement && !collapsed" class="submenu">
                            <li><router-link to="/water-management" class="menu-link">Overview</router-link></li>
                            <li><router-link to="/water-management/historical-data"
                                    class="menu-link">Charts</router-link></li>
                            <li><router-link to="/water-management/deviceFloorplan" class="menu-link">Device Floor
                                    Plan</router-link></li>
                            <li><router-link to="/water-management/dataLog" class="menu-link">Data Logs</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="menu-section">
                <span class="menu-title" v-if="!collapsed">Automation</span>
                <ul class="menu">
                    <li class="menu-item dropdown">
                        <div class="menu-link" @click="toggleDropdown('automationManagement')">
                            <i class="fas fa-cog"></i>
                            <span v-if="!collapsed">Automation Management</span>
                            <i class="fas fa-chevron-down dropdown-icon"
                                :class="{ rotated: dropdowns.automationManagement }" v-if="!collapsed"></i>
                        </div>
                        <ul v-if="dropdowns.automationManagement && !collapsed" class="submenu">
                            <li><router-link to="/automation-management" class="menu-link">Overview</router-link></li>
                            <li><router-link to="/automation-management/fault-calling" class="menu-link">Fault
                                    Calling</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Pinned bottom logout -->
        <div class="menu-section logout-section">
            <ul class="menu">
                <li class="menu-item">
                    <button type="button" class="menu-link logout-btn" @click="openLogoutModal">
                        <i class="fas fa-sign-out-alt"></i>
                        <span v-if="!collapsed">Logout</span>
                    </button>
                </li>
            </ul>
        </div>

        <!-- Teleport the modal to body so it isn't clipped by the sidebar -->
        <teleport to="body">
            <div v-if="showLogoutModal" class="logout-modal-backdrop" @click.self="closeLogoutModal" aria-modal="true"
                role="dialog">
                <div class="logout-modal">
                    <h4 class="mb-2">Log out?</h4>
                    <p class="mb-4">You will be signed out of this session.</p>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" @click="closeLogoutModal">Cancel</button>
                        <button class="btn btn-danger" @click="confirmLogout">Logout</button>
                    </div>
                </div>
            </div>
        </teleport>
    </aside>
</template>

<script>
export default {
    props: { collapsed: { type: Boolean, default: false } },
    data() {
        return {
            dropdowns: {
                energyManagement: false,
                waterManagement: false,
                automationManagement: false,
                others: false
            },
            showLogoutModal: false
        };
    },
    methods: {
        toggleDropdown(section) {
            this.dropdowns[section] = !this.dropdowns[section];
        },
        openLogoutModal() {
            this.showLogoutModal = true;
            document.addEventListener('keydown', this.handleEsc, { once: true });
        },
        closeLogoutModal() {
            this.showLogoutModal = false;
        },
        handleEsc(e) {
            if (e.key === 'Escape') this.closeLogoutModal();
        },
        confirmLogout() {
            try {
                sessionStorage.removeItem('calypsoAuth');
                sessionStorage.removeItem('calypsoUser');
                // typo-proof
                sessionStorage.removeItem('calpsoAuth');
                sessionStorage.removeItem('calpysoUser');
                this.$router.replace('/login');
            } finally {
                this.closeLogoutModal();
            }
        }
    }
};
</script>

<style scoped>
/* Sidebar */
.app-sidebar {
    width: 250px;
    background-color: #1e293b;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    transition: width 0.3s;
    display: flex;
    /* make column layout */
    flex-direction: column;
    overflow: hidden;
    /* prevent horizontal bleed, we'll scroll nav instead */
}

.app-sidebar.collapsed {
    width: 80px;
}

/* Logo */
.logo-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-bottom: 1px solid #334155;
}

.logo {
    height: 40px;
}

/* Scrollable nav */
.nav-scroll {
    flex: 1 1 auto;
    overflow-y: auto;
    /* ← allows scrolling when content is tall */
    padding-bottom: 8px;
}

/* Pinned bottom logout */
.logout-section {
    border-top: 1px solid #334155;
    padding-top: 8px;
}

/* Menu */
.menu-section {
    margin-top: 10px;
    padding: 0;
}

.menu-title {
    font-size: 12px;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 10px;
    display: block;
    padding-left: 20px;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    padding: 10px 0;
}

.menu-link {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 10px 18px;
    border-radius: 4px;
    transition: background 0.3s, justify-content 0.3s, padding 0.3s;
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
}

.app-sidebar.collapsed .menu-link {
    justify-content: center;
    padding: 10px 0;
}

.menu-link i {
    font-size: 20px;
}

.menu-link span {
    margin-left: 10px;
}

.menu-link:hover {
    background: #334155;
}

.menu-link.router-link-active {
    background: #334155;
    color: #fff;
    font-weight: bold;
}

.menu-link.router-link-exact-active {
    background: #475569;
    color: #fff;
    font-weight: bold;
}

/* Dropdown */
.dropdown-icon {
    margin-left: auto;
    transition: transform 0.3s;
}

.dropdown-icon.rotated {
    transform: rotate(180deg);
}

.submenu {
    list-style: none;
    padding: 0 20px;
    margin: 5px 0;
}

.submenu li {
    margin: 5px 0;
}

.submenu li a {
    text-decoration: none;
    color: #cbd5e1;
    font-size: 14px;
}

.submenu li a:hover {
    color: white;
}

/* Modal (teleported to body) */
.logout-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    /* ensure it's above everything */
}

.logout-modal {
    width: min(92vw, 420px);
    background: #fff;
    color: #0f172a;
    border-radius: 12px;
    padding: 20px 22px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    z-index: 10000;
    /* modal above backdrop */
}

.modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

/* Simple buttons if Bootstrap isn't present */
.btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
}

.btn-secondary {
    background: #e2e8f0;
    color: #0f172a;
}

.btn-secondary:hover {
    background: #cbd5e1;
}

.btn-danger {
    background: #dc2626;
    color: #fff;
}

.btn-danger:hover {
    background: #b91c1c;
}
</style>
