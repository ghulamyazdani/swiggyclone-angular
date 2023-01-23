app.factory("testInterceptor", function testInterceptor() {
  return {
    request: function (config) {
      return config;
    },

    requestError: function (config) {
      return config;
    },

    response: function (res) {
      return res;
    },

    responseError: function (res) {
      return res;
    },
  };
});

$httpProvider.interceptors.push("testInterceptor");
