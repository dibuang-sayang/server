module.exports = {
  apps: [
    {
      name: 'dibuang-sayang server',
      script: 'node server.js',
      env: {
        SECRET: "dibuangaja",
        XENDIT: "xnd_development_N62qQChgtMfs6efqGd0Vn6GffmyjnmCTGeskM80zxBPFXH054ZAUSiQkInybmH"
      }
    }
  ]
}