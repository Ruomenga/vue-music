<template>
  <div class="profile">
    <div class="login" v-if="!this.$store.state.userInfo">
      <div class="inp">
        <h3>欢迎加入网抑云</h3>
        <label for="name" class="userName">账号</label>
        <input type="text" class="name" id="name" ref="name" />
        <label for="password" class="userPsd">密码</label>
        <input type="password" id="password" class="password" ref="password" />
        <input type="submit" value="立即登录" class="submit" @click="toLogin" />
      </div>
    </div>
    <div class="content" v-else>
      <div class="top">
        <div class="filter"></div>
        <div class="bg">
          <img
            :src="this.$store.state.userInfoDetail.profile.backgroundUrl"
            alt=""
          />
        </div>
        <div class="head">
          <div class="listenSongs">
            <span>{{this.$store.state.userInfoDetail.listenSongs}}</span>
            <p>听歌数</p>
          </div>
          <div class="img">
            <img
              :src="this.$store.state.userInfoDetail.profileavatarUrl"
              alt=""
            />
            <p class="username">{{this.$store.state.userInfoDetail.profile.nickname}}</p>
          </div>
          <div class="level">
            <span>{{this.$store.state.userInfoDetail.level}}</span>
            <p>等级</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p class="songs">歌单：{{userSongs.length}}</p>
        <div class="songsList" v-for="(item, index) in this.userSongs" :key="index" @click="toSongDetail(item)" >
          <div class="img">
            <img
              :src="item.coverImgUrl"
              alt=""
            />
          </div>
          <div class="desc">
            <p>{{item.name}}</p>
            <span>{{item.trackCount}}首</span>
            <span>{{item.playCount}}播放</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo,getUserSongs } from "@/api/login";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      uid: null,
      userInfo: null,
      userSongs:null,
    };
  },
  methods: {
    ...mapActions(["setUserInfo",'setUserInfoDetail']),
    toLogin() {
      let name = this.$refs.name.value;
      let password = this.$refs.password.value;
      login(name, password)
        .then((res) => {
          if(res.data.code != 200){
            alert(res.data.message)
            console.log(res.data.message)
          }else{
            alert('登录成功');
            this.setCookies('cookie',res.data.cookie,1000);
            this.setCookies('id',res.data.account.id,1000);
          }
          this.setUserInfo({
            userInfo: res.data,
          });
          getUserInfo(this.$store.state.userInfo.account.id).then((res) => {
            this.setUserInfoDetail({
              userInfoDetail:res.data
            })
          });
          this._getUserSongs()
        })
    },
    async _getUserSongs(){
      const res = await getUserSongs(this.$store.state.userInfo.account.id);
      console.log(res.data)
      this.userSongs = res.data.playlist;
      // 处理播放量
      for(let i=0;i<this.userSongs.length;i++){
        if(this.userSongs[i].playCount>10000){
          res.data.playlist[i].playCount =  Math.floor(res.data.playlist[i].playCount / 10000) + "万";
        }
      }
    },
    toSongDetail(song){
      console.log(song)
       this.$router.push({
        path: `/discover/${song.id}`,
      });
    },
    setCookies(name,value,date){//增加一个cookie
      document.cookie=name+"="+value+";max-age="+date;
      return this;
   },

  },
};
</script>

<style lang="less" scoped>
.profile {
  .login {
    position: relative;
    width: 100%;
    height: 95vh;
    background: linear-gradient(aqua, blue);
    .inp {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -80%);
      h3 {
        color: #fff;
        position: absolute;
        left: 25%;
        top: -20%;
      }
      label {
        position: relative;
        top: 23px;
        left: 15px;
        color: #fff;
      }
      input {
        color: #fff;
        outline: none;
        border-radius: 15px;
        border-width: 0;
        background: transparent;
        border: 1px solid #fff;
        padding: 5px 50px;
      }
      .submit {
        margin-top: 20px;
        padding: 5px 0;
        width: 100%;
      }
    }
  }
  .content {
    position: relative;
    .top {
      position: relative;
      .filter {
        width: 100%;
        height: 250px;
        position: absolute;
        background: rgba(0, 0, 0, 0.2);
        z-index: 10;
      }
      .bg {
        height: 250px;
        img {
          height: 100%;
          filter: blur(2px);
        }
      }
      .head {
        display: flex;
        position: absolute;
        justify-content: space-around;
        width: 70%;
        top: 25%;
        color: #fff;
        font-weight: 700;
        left: 15%;
        z-index: 20;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        p {
          margin-top: 1px;
          font-size: 12px;
          color: hsla(0, 0%, 100%, 0.6);
        }
        .username {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
    .bottom {
      margin-top: 5px;
      .songs {
        height: 28px;
        padding-left: 10px;
        background-color: #eeeff0;
        font-size: 12px;
        color: #666;
        line-height: 28px;
      }
      .songsList {
        display: flex;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid #fff;
        margin: 5px 0;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .desc {
        margin-left: 20px;
        padding: 20px;
        p {
          margin-bottom: 5px;
        }
        span {
          height: 14px;
          line-height: 14px;
          font-size: 12px;
          color: #999;
          margin: 0 5px;
        }
      }
    }
  }
}
</style>>