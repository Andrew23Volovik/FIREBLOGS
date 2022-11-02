<template>
  <div class="toggle-edit">
    <!-- <span>toggle Editing Post</span> -->
    <slot></slot>
    <input
      class="toggle"
      type="checkbox"
      v-model="newValue"
      @change="changeToggle"
    />
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      newValue: this.value,
    };
  },
  methods: {
    changeToggle() {
      this.$emit('changeToggle', this.newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle-edit {
  display: flex;
  align-items: center;
  position: absolute;
  top: -70px;
  right: 0;

  span {
    margin-right: 16px;
  }

  .toggle {
    position: relative;
    border: none;
    -webkit-appearance: none;
    background: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .toggle:before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #303030;
    transform: scale(1.1);
    transition: 0.75s ease all;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .toggle:checked:before {
    background: #fff;
    left: 52px;
  }
}
</style>