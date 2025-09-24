<template>
  <div id="app">
    <!-- LOGIN LAYOUT (no header/sidebar) -->
    <div v-if="isAuthRoute" class="login-only">
      <router-view />
    </div>

    <!-- APP LAYOUT (protected) -->
    <div v-else class="app-layout">
      <AppHeader @toggle-sidebar="toggleSidebar" :collapsed="sidebarCollapsed" />

      <div class="layout">
        <AppSidebar :collapsed="sidebarCollapsed" />
        <main class="main-content" :class="{ collapsed: sidebarCollapsed }">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "AppRoot",
  components: { AppSidebar, AppHeader },
  data() {
    return {
      sidebarCollapsed: false
    };
  },
  computed: {
    // Treat these routes as "auth pages" (no chrome)
    isAuthRoute() {
      const r = this.$route || {};
      return (
        r?.meta?.public === true ||
        r?.name === "LoginView" ||   // our updated login component name
        r?.name === "Login" ||       // fallback if your route is still named "Login"
        r?.path === "/login"
      );
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    ensureAuth() {
      const isAuthed = !!sessionStorage.getItem("calypsoAuth");
      // If not authed and not on an auth route, bounce to login
      if (!isAuthed && !this.isAuthRoute) {
        this.$router.replace({ name: "LoginView" }).catch(() => { });
      }
      // If authed and sitting on the login page, go home
      if (isAuthed && this.isAuthRoute && this.$route.name !== "Home") {
        this.$router.replace({ path: "/" }).catch(() => { });
      }
    }
  },
  watch: {
    $route() {
      this.ensureAuth();
    }
  },
  mounted() {
    this.ensureAuth();
  }
};
</script>

<style>
/* login-only just needs to fill the screen */
.login-only {
  height: 100vh;
}

/* your normal app layout */
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout {
  display: flex;
  flex-grow: 1;
}

.main-content {
  padding-top: 5%;
  flex-grow: 1;
  margin-left: 250px;
  padding: 20px;
  transition: margin-left 0.3s;
  background-color: #f5f7fa;
}

.main-content.collapsed {
  margin-left: 80px;
}
</style>
