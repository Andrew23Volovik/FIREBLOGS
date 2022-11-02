<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <!-- <div v-if="isAdmin" class="toggle-edit">
        <span>toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div> -->
      <Toggle :value="editPost" @changeToggle="changeToggle">
        <span>Editing Post</span>
      </Toggle>
      <BlogCard v-for="(post, index) in blogPosts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>
import Toggle from '../components/Toggle';
import BlogCard from '../components/BlogCard';
import { mapGetters } from 'vuex';

export default {
  name: 'blogs',
  components: { BlogCard, Toggle },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit('toggleEditPost', payload);
      },
    },
    ...mapGetters(['isAdmin']),
  },
  beforeDestroy() {
    this.$store.commit('toggleEditPost', false);
  },
  methods: {
    changeToggle(value) {
      this.editPost = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;
}
</style>