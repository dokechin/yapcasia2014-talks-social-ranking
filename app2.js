Vue.filter('escape',function(value) {
  return encodeURIComponent(value);
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
        var context = this;
        $.ajax({
        url: "talks.json",
        dataType: 'json',
        success: function(data){
            console.log(data);
            context.$set("talks",data);
        },
        error: function(){
            alert('run "./get_talks.pl" first.');
            return;
        }
        });
    }
});

