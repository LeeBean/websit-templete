import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      header: {
        home: '首页',
        repair: '售后维修',
        consultation: '服务咨询',
        mall: '商城',
        join: '服务商加盟',
        complaint: '投诉建议',
        search: '搜索...',
        login: '登录',
        register: '注册',
        logout: '退出登录',
        personalCenter: '个人中心',
      },
      common: {
        submit: '提交',
        cancel: '取消',
        confirm: '确定',
        search: '搜索',
        reset: '重置',
        loading: '加载中...',
        error: '发生错误',
        success: '操作成功',
        and: '和',
      },
      footer: {
        company: '关于公司',
        contact: '联系方式',
        links: '友情链接',
        icp: '© 2026 售后官网. 粤ICP备xxxx号',
      },
      auth: {
        loginTitle: '欢迎回来',
        loginDesc: '请使用您的手机号或邮箱登录',
        usernamePlaceholder: '手机号 / 邮箱',
        passwordPlaceholder: '请输入密码',
        rememberMe: '记住我',
        forgotPassword: '忘记密码？',
        noAccount: '还没有账号？',
        registerNow: '立即注册',
        registerTitle: '创建新账号',
        registerDesc: '加入我们，享受更专业的售后服务',
        phonePlaceholder: '手机号',
        codePlaceholder: '验证码',
        getCode: '获取验证码',
        passwordSetPlaceholder: '设置密码',
        passwordConfirmPlaceholder: '确认密码',
        agreementPrefix: '我已阅读并同意',
        serviceAgreement: '《用户服务协议》',
        privacyPolicy: '《隐私保护政策》',
        alreadyHaveAccount: '已有账号？',
        goLogin: '去登录',
        resetPasswordTitle: '找回密码',
        newPasswordPlaceholder: '新密码',
        resetPasswordBtn: '重置密码',
        backToLogin: '返回登录',
        loginSuccess: '登录成功',
        registerSuccess: '注册成功，请登录',
        resetSuccess: '密码重置成功，请登录',
      }
    }
  },
  en: {
    translation: {
      header: {
        home: 'Home',
        repair: 'After-sales',
        consultation: 'Consultation',
        mall: 'Mall',
        join: 'Join Us',
        complaint: 'Complaints',
        search: 'Search...',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        personalCenter: 'Profile',
      },
      common: {
        submit: 'Submit',
        cancel: 'Cancel',
        confirm: 'Confirm',
        search: 'Search',
        reset: 'Reset',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        and: 'and',
      },
      footer: {
        company: 'About Us',
        contact: 'Contact Us',
        links: 'Links',
        icp: '© 2026 After-sales. ICP 12345678',
      },
      auth: {
        loginTitle: 'Welcome Back',
        loginDesc: 'Please login with your phone or email',
        usernamePlaceholder: 'Phone / Email',
        passwordPlaceholder: 'Please enter password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        noAccount: "Don't have an account?",
        registerNow: 'Register now',
        registerTitle: 'Create Account',
        registerDesc: 'Join us for professional services',
        phonePlaceholder: 'Phone number',
        codePlaceholder: 'Verification code',
        getCode: 'Get Code',
        passwordSetPlaceholder: 'Set password',
        passwordConfirmPlaceholder: 'Confirm password',
        agreementPrefix: 'I have read and agree to',
        serviceAgreement: 'User Service Agreement',
        privacyPolicy: 'Privacy Policy',
        alreadyHaveAccount: 'Already have an account?',
        goLogin: 'Login',
        resetPasswordTitle: 'Reset Password',
        newPasswordPlaceholder: 'New password',
        resetPasswordBtn: 'Reset Password',
        backToLogin: 'Back to Login',
        loginSuccess: 'Login success',
        registerSuccess: 'Register success, please login',
        resetSuccess: 'Password reset success, please login',
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
