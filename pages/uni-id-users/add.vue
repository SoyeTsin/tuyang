
<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="username" label="用户名">
  <uni-easyinput placeholder="用户名，不允许重复" v-model="formData.username" trim="both" />
</uni-forms-item>
<uni-forms-item name="password" label="密码">
  <uni-easyinput placeholder="密码，加密存储" v-model="formData.password" type="password" />
</uni-forms-item>
<uni-forms-item name="password_secret_version" label="passwordSecret">
  <uni-easyinput placeholder="密码使用的passwordSecret版本" type="number" v-model="formData.password_secret_version" />
</uni-forms-item>
<uni-forms-item name="nickname" label="昵称">
  <uni-easyinput placeholder="用户昵称" v-model="formData.nickname" trim="both" />
</uni-forms-item>
<uni-forms-item name="gender" label="性别">
  <uni-data-checkbox v-model="formData.gender" :localdata="formOptions.gender_localdata" />
</uni-forms-item>
<uni-forms-item name="status" label="用户状态">
  <uni-data-checkbox v-model="formData.status" :localdata="formOptions.status_localdata" />
</uni-forms-item>
<uni-forms-item name="mobile" label="手机号码">
  <uni-easyinput placeholder="手机号码" v-model="formData.mobile" trim="both" />
</uni-forms-item>
<uni-forms-item name="mobile_confirmed" label="手机号验证状态">
  <uni-data-checkbox v-model="formData.mobile_confirmed" :localdata="formOptions.mobile_confirmed_localdata" />
</uni-forms-item>
<uni-forms-item name="email" label="邮箱">
  <uni-easyinput placeholder="邮箱地址" v-model="formData.email" trim="both" />
</uni-forms-item>
<uni-forms-item name="email_confirmed" label="邮箱验证状态">
  <uni-data-checkbox v-model="formData.email_confirmed" :localdata="formOptions.email_confirmed_localdata" />
</uni-forms-item>
<uni-forms-item name="avatar" label="头像地址">
  <uni-easyinput placeholder="头像地址" v-model="formData.avatar" trim="both" />
</uni-forms-item>
<uni-forms-item name="avatar_file" label="头像文件">
  <uni-file-picker return-type="object" v-model="formData.avatar_file" />
</uni-forms-item>
<uni-forms-item name="department_id" label="部门">
  <uni-data-picker self-field="_id" parent-field="parent_id" v-model="formData.department_id" collection="opendb-department" orderby="name asc" field="_id as value, name as text"></uni-data-picker>
</uni-forms-item>
<uni-forms-item name="wx_unionid" label="">
  <uni-easyinput placeholder="微信unionid" v-model="formData.wx_unionid" />
</uni-forms-item>
<uni-forms-item name="ali_openid" label="">
  <uni-easyinput placeholder="支付宝平台openid" v-model="formData.ali_openid" />
</uni-forms-item>
<uni-forms-item name="apple_openid" label="">
  <uni-easyinput placeholder="苹果登录openid" v-model="formData.apple_openid" />
</uni-forms-item>
<uni-forms-item name="dcloud_appid" label="">
  <uni-data-checkbox :multiple="true" v-model="formData.dcloud_appid" />
</uni-forms-item>
<uni-forms-item name="comment" label="备注">
  <uni-easyinput placeholder="备注" v-model="formData.comment" trim="both" />
</uni-forms-item>
<uni-forms-item name="score" label="">
  <uni-easyinput placeholder="用户积分，积分变更记录可参考：uni-id-scores表定义" type="number" v-model="formData.score" />
</uni-forms-item>
<uni-forms-item name="register_date" label="">
  <uni-datetime-picker return-type="timestamp" :value="formData.register_date" />
</uni-forms-item>
<uni-forms-item name="register_ip" label="">
  <uni-easyinput placeholder="注册时 IP 地址" v-model="formData.register_ip" />
</uni-forms-item>
<uni-forms-item name="last_login_date" label="">
  <uni-datetime-picker return-type="timestamp" :value="formData.last_login_date" />
</uni-forms-item>
<uni-forms-item name="last_login_ip" label="">
  <uni-easyinput placeholder="最后登录时 IP 地址" v-model="formData.last_login_ip" />
</uni-forms-item>
<uni-forms-item name="token" label="">
  <uni-data-checkbox :multiple="true" v-model="formData.token" />
</uni-forms-item>
<uni-forms-item name="inviter_uid" label="">
  <uni-data-checkbox :multiple="true" v-model="formData.inviter_uid" />
</uni-forms-item>
<uni-forms-item name="invite_time" label="">
  <uni-datetime-picker return-type="timestamp" :value="formData.invite_time" />
</uni-forms-item>
<uni-forms-item name="my_invite_code" label="">
  <uni-easyinput placeholder="用户自身邀请码" v-model="formData.my_invite_code" />
</uni-forms-item>

      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/uni-id-users.js';

  const db = uniCloud.database();
  const dbCollectionName = 'uni-id-users';

  function getValidator(fields) {
    let reuslt = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        reuslt[key] = validator[key]
      }
    }
    return reuslt
  }

  export default {
    data() {
      return {
        formData: {
  "username": "",
  "password": null,
  "password_secret_version": null,
  "nickname": "",
  "gender": 0,
  "status": 0,
  "mobile": "",
  "mobile_confirmed": 0,
  "email": "",
  "email_confirmed": 0,
  "avatar": "",
  "avatar_file": null,
  "department_id": [],
  "wx_unionid": "",
  "wx_openid": null,
  "ali_openid": "",
  "apple_openid": "",
  "dcloud_appid": [],
  "comment": "",
  "realname_auth": null,
  "score": null,
  "register_date": null,
  "register_ip": "",
  "last_login_date": null,
  "last_login_ip": "",
  "token": [],
  "inviter_uid": [],
  "invite_time": null,
  "my_invite_code": ""
},
        formOptions: {
  "gender_localdata": [
    {
      "text": "未知",
      "value": 0
    },
    {
      "text": "男",
      "value": 1
    },
    {
      "text": "女",
      "value": 2
    }
  ],
  "status_localdata": [
    {
      "text": "正常",
      "value": 0
    },
    {
      "text": "禁用",
      "value": 1
    },
    {
      "text": "审核中",
      "value": 2
    },
    {
      "text": "审核拒绝",
      "value": 3
    }
  ],
  "mobile_confirmed_localdata": [
    {
      "text": "未验证",
      "value": 0
    },
    {
      "text": "已验证",
      "value": 1
    }
  ],
  "email_confirmed_localdata": [
    {
      "text": "未验证",
      "value": 0
    },
    {
      "text": "已验证",
      "value": 1
    }
  ]
},
        rules: {
          ...getValidator(["username","password_secret_version","nickname","gender","status","mobile","mobile_confirmed","email","email_confirmed","avatar","avatar_file","department_id","wx_unionid","wx_openid","ali_openid","apple_openid","dcloud_appid","comment","realname_auth","score","last_login_date","last_login_ip","token","inviter_uid","invite_time","my_invite_code","register_ip","register_date","password"])
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.submit().then((res) => {
          this.submitForm(res)
        }).catch((errors) => {
          uni.hideLoading()
        })
      },

      submitForm(value) {
        // 使用 clientDB 提交数据
        db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

  .uni-button {
    width: 184px;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1;
    margin: 0;
  }
</style>

