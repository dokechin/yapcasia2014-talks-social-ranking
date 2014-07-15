Vue.filter('escape',function() {
  return encodeURIComponent;
});
var app =  new Vue({
    el: '.container-fluid',
    data: {
        talks: [],
        active: "total"
        },
    methods: {
        sort_by: function(service_name){
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
        var context = this;
        $.getJSON("talks.json", function(data){
          console.log(data);
          context.$set("talks",data);
        });
    }
});

