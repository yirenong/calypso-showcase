import { ref } from 'vue';

const user = ref(null);

export default {
  login(username, password) {
    const buildingIds = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'];

    // Normalize inputs
    const u = (username || '').trim().toLowerCase();
    const p = password || '';

    // Admin
    if (u === 'admin' && p === 'password') {
      const userBuildingIds = buildingIds.sort(() => 0.5 - Math.random()).slice(0, 5);
      user.value = { id: 1, username: 'admin', buildingIds: userBuildingIds };
      return true;
    }

    // Allowed companies (support both 'engie' and 'engi')
    const companies = new Map([
      ['engie', 'Engie'],
      ['engi',  'Engie'],
      ['smm',   'SMM'],
      ['convergent', 'Convergent'],
      ['fonda', 'Fonda'],
      ['kimyew','KimYew'],
      ['tencent', 'TenCent']
    ]);

    // Match pattern: testuser@{company}
    const match = u.match(/^testuser@([a-z0-9]+)$/);

    if (match && p === 'password') {
      const key = match[1];
      if (companies.has(key)) {
        const companyLabel = companies.get(key);
        const userBuildingIds = buildingIds.sort(() => 0.5 - Math.random()).slice(0, 3);
        user.value = { id: `testuser@${key}`, username: `testuser@${companyLabel}`, buildingIds: userBuildingIds };
        return true;
      }
    }

    return false;
  },

  logout() {
    user.value = null;
  },

  isLoggedIn() {
    return user.value !== null;
  },

  getUser() {
    return user.value;
  },

  getBuildingIds() {
    return user.value?.buildingIds ?? [];
  }
};
