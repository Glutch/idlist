AccountsTemplates.removeField('password')
AccountsTemplates.removeField('email')
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: " ",
      required: true,
      minLength: 3,
  },
  {
      _id: "password",
      type: "password",
      displayName: " ",
      required: true,
      minLength: 3,
  }
])

AccountsTemplates.configure({
  showLabels: false,
  texts: {
    errors: {
      accountsCreationDisabled: "Client side accounts creation is disabled!!!",
      cannotRemoveService: "Cannot remove the only active service!",
      captchaVerification: "Captcha verification failed!",
      loginForbidden: "error.accounts.Wrong username or password",
      mustBeLoggedIn: "error.accounts.Must be logged in",
      pwdMismatch: "error.pwdsDontMatch",
      validationErrors: "Validation Errors",
      verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
    }
  },
})