<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" collection="uni-id-users,opendb-department,uni-id-roles" field="username,password_secret_version,nickname,gender,status,mobile,mobile_confirmed,email,email_confirmed,avatar,avatar_file,department_id{name},wx_unionid,wx_openid,ali_openid,apple_openid,dcloud_appid,comment,realname_auth,score,last_login_date,last_login_ip,token,inviter_uid,invite_time,my_invite_code,register_ip,register_date,password" :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
           <view>
     <text>用户名:</text>
                     <text>{{data.username}}</text>            
   </view> 
    <view>
     <text>passwordSecret:</text>
                     <text>{{data.password_secret_version}}</text>            
   </view> 
    <view>
     <text>昵称:</text>
                     <text>{{data.nickname}}</text>            
   </view> 
    <view>
     <text>性别:</text>
                                <text>{{options.gender_valuetotext[data.gender]}}</text>                     
   </view> 
    <view>
     <text>用户状态:</text>
                                <text>{{options.status_valuetotext[data.status]}}</text>                     
   </view> 
    <view>
     <text>手机号码:</text>
                     <text>{{data.mobile}}</text>            
   </view> 
    <view>
     <text>手机号验证状态:</text>
                                <text>{{options.mobile_confirmed_valuetotext[data.mobile_confirmed]}}</text>                     
   </view> 
    <view>
     <text>邮箱:</text>
                       <uni-link :href="'mailto:'+data.email" :text="data.email"></uni-link>            
   </view> 
    <view>
     <text>邮箱验证状态:</text>
                                <text>{{options.email_confirmed_valuetotext[data.email_confirmed]}}</text>                     
   </view> 
    <view>
     <text>头像地址:</text>
                     <text>{{data.avatar}}</text>            
   </view> 
    <view>
     <text>头像文件:</text>
                       <uni-file-picker v-if="data.avatar_file.fileType == 'image'" :value="data.avatar_file" :file-mediatype="data.avatar_file.fileType" return-type="object" readonly></uni-file-picker>           <uni-link v-else :href="data.avatar_file.url" :text="data.avatar_file.url"></uni-link>            
   </view> 
    <view>
     <text>部门:</text>
                     <text>{{data.department_id[0].name}}</text>            
   </view> 
    <view>
     <text>wx_unionid:</text>
                     <text>{{data.wx_unionid}}</text>            
   </view> 
    <view>
     <text>wx_openid:</text>
                     <text>{{data.wx_openid}}</text>            
   </view> 
    <view>
     <text>ali_openid:</text>
                     <text>{{data.ali_openid}}</text>            
   </view> 
    <view>
     <text>apple_openid:</text>
                     <text>{{data.apple_openid}}</text>            
   </view> 
    <view>
     <text>dcloud_appid:</text>
                     <text>{{data.dcloud_appid}}</text>            
   </view> 
    <view>
     <text>备注:</text>
                     <text>{{data.comment}}</text>            
   </view> 
    <view>
     <text>realname_auth:</text>
                     <text>{{data.realname_auth}}</text>            
   </view> 
    <view>
     <text>score:</text>
                     <text>{{data.score}}</text>            
   </view> 
    <view>
     <text>last_login_date:</text>
     <uni-dateformat :date="data.last_login_date" :threshold="[0, 0]" />     
   </view> 
    <view>
     <text>last_login_ip:</text>
                     <text>{{data.last_login_ip}}</text>            
   </view> 
    <view>
     <text>token:</text>
                     <text>{{data.token}}</text>            
   </view> 
    <view>
     <text>inviter_uid:</text>
                     <text>{{data.inviter_uid}}</text>            
   </view> 
    <view>
     <text>invite_time:</text>
     <uni-dateformat :date="data.invite_time" :threshold="[0, 0]" />     
   </view> 
    <view>
     <text>my_invite_code:</text>
                     <text>{{data.my_invite_code}}</text>            
   </view> 
    <view>
     <text>register_ip:</text>
                     <text>{{data.register_ip}}</text>            
   </view> 
    <view>
     <text>register_date:</text>
     <uni-dateformat :date="data.register_date" :threshold="[0, 0]" />     
   </view> 
    <view>
     <text>密码:</text>
                     <text>{{data.password}}</text>            
   </view> 
  
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/uni-id-users.js';

  export default {
    data() {
      return {
        queryWhere: '',
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.queryWhere = '_id=="' + this._id + '"'
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
