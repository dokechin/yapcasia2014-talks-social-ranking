Vue.filter('escape',function() {
  return encodeURIComponent;
});
var app =  new Vue({
    el: '.talk',
    data: {
        talks: [
        ],
        active: "total"
        },
    methods: {
        sort: function(service_name){
            console.log(service_name);
            talks = this.$get("talks");
            talks.sort(function(a, b){
              var key = service_name + '_count';
              return b[key] - a[key];
            });
            this.$set("talks", talks);
            this.$set("active", service_name);
        }
    },
    created: function(){
        console.log("created");
        var talks = require('talks.json');
        this.$set("talks",talks);
    }
});

