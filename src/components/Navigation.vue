<template>
  <div :class="{ 'dark-theme': mode }">
    <header>
      <nav class="container">
        <div class="branding">
          <router-link class="header" :to="{ name: 'Home' }"
            >FireBlogs</router-link
          >
        </div>
        <div class="nav-links">
          <Toggle @changeToggle="themeChange"><span>Theme</span></Toggle>
          <ul v-show="!mobile">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'Blogs' }"
              >Blogs</router-link
            >
            <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }"
              >Create Post</router-link
            >
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
              >Login/Register</router-link
            >
          </ul>
          <div
            v-if="user"
            @click="toggleProfileMenu"
            class="profile"
            ref="profile"
          >
            <span>{{ $store.state.profileInitials }}</span>
            <div v-show="profileMenu" class="profile-menu">
              <div class="info">
                <p class="initials">{{ $store.state.profileInitials }}</p>
                <div class="right">
                  <p>
                    {{ $store.state.profileFirstName }}
                    {{ $store.state.profileLastName }}
                  </p>
                  <p>{{ $store.state.profileUsername }}</p>
                  <p>{{ $store.state.profileEmail }}</p>
                </div>
              </div>
              <div class="options">
                <div class="option">
                  <router-link class="option" :to="{ name: 'Profile' }">
                    <userIcon class="icon" />
                    <p>Profile</p>
                  </router-link>
                </div>
                <div v-if="admin" class="option">
                  <router-link class="option" :to="{ name: 'Admin' }">
                    <adminIcon class="icon" />
                    <p>Admin</p>
                  </router-link>
                </div>
                <div @click="singOut" class="option">
                  <singOutIcon class="icon" />
                  <p>Sing Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <menuIcon @click="toogleMobileNav" class="menu-icon" v-show="mobile" />
      <transition name="mobile-nav">
        <ul class="mobile-nav" v-show="mobileNav">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }"
            >Create Post</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>
      </transition>
    </header>
  </div>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';
import adminIcon from '../assets/Icons/user-crown-light.svg';
import singOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
import Toggle from './Toggle';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'navigation',
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    singOutIcon,
    Toggle,
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      mode: false,
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toogleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    singOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
    themeChange(e) {
      this.mode = e;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.profileIsAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  border-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 101;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      .toggle-edit {
        position: relative;
        top: 0;
        margin-right: 30px;
      }

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              padding: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 19px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}

$dark-main-color: #303030;
$dark-link-color: #42d392;
$dark-ligth-color: #fff;
$dark-dark-color: #000;
$dark-grey-color: #646464;

.dark-theme {
  header {
    background-color: $dark-main-color;
    border-color: $dark-link-color;
    box-shadow: 0 4px 6px -1px rgb(99, 163, 89),
      0 2px 4px -1px rgba(120, 209, 241, 0.676);

    .link {
      &:hover {
        color: $dark-link-color;
      }
    }

    nav {
      .branding {
        .header {
          color: $dark-link-color;
        }
      }

      .nav-links {
        .toggle-edit {
          span {
            color: $dark-link-color;
          }
        }

        ul {
          .link {
            color: $dark-link-color;
          }
        }
        .profile {
          color: $dark-link-color;
          background-color: $dark-grey-color;

          .profile-menu {
            background-color: #303030;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);

            .info {
              border-bottom: 1px solid #fff;

              .initials {
                background-color: $dark-grey-color;
                color: $dark-link-color;
              }
            }

            .options {
              .option {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
