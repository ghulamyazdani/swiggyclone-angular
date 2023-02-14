app.factory("authServices", [
  "$log",
  "$http",
  function ($log, $http) {
    $log.info("Auth Service");
    return {
      signup: function (data, cb) {
        $http
          .post("http://localhost:4000/api/auth/signup", data)
          .then(function (res) {
            cb(res.data);
          })
          .catch(function (err) {
            cb(err);
            $log.error(err);
          });
      },
      login: function (data, cb) {
        $http
          .post("http://localhost:4000/api/auth/login", data)
          .then(function (res) {
            cb(res.data);
          })
          .catch(function (err) {
            cb(err);
            $log.error(err);
          });
      },
    };
  },
]);
