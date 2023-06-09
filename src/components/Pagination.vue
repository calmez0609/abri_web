<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="pageNumber in pagesToShow" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
        <a class="page-link" href="#" @click.prevent="goToPage(pageNumber)">{{ pageNumber }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    maxPagesToShow: {
      type: Number,
      default: 5
    }
  },
  computed: {
    pagesToShow() {
      const startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2));
      const endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1);
      const pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update-page', page);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    }
  }
};
</script>
