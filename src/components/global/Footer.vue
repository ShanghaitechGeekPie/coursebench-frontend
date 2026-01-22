<template>
  <footer class="footer-container">
    <v-divider></v-divider>
    <div class="footer-content pt-5">
      <div class="footer-text">
        <span class="copyright">
          &copy; {{ currentYear }} CourseBench. All rights reserved.
        </span>
        <span class="version-info">
          v{{ version }}
          <span v-if="buildHash" class="build-hash">
            (Build: {{ buildHash }})
          </span>
          <span v-if="buildDate" class="build-date">
            Last build at: {{ buildDate }}
          </span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  setup() {
    const currentYear = new Date().getFullYear();
    const version = process.env.VUE_APP_VERSION || '0.1.0';
    const buildHash = process.env.VUE_APP_BUILD_HASH || '';
    const buildDate = process.env.VUE_APP_BUILD_DATE || '';

    return {
      currentYear,
      version,
      buildHash,
      buildDate,
    };
  },
};
</script>

<style scoped>
.footer-container {
  padding: 30px 20px;
  background-color: #f8f8f9;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.copyright {
  font-weight: 500;
}

.version-info {
  font-size: 0.8125rem;
  color: rgba(0, 0, 0, 0.5);
}

.build-hash {
  font-family: monospace;
  margin-left: 4px;
}

.build-date {
  margin-left: 8px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .footer-container {
    background-color: #222222;
  }

  .footer-text {
    color: rgba(255, 255, 255, 0.7);
  }

  .version-info {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
