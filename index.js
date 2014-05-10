var _ = require('underscore');
var gaussian = require('gaussian');

module.exports = function(preferred_interval, cb) {
 var x = [];

 var last_success = +new Date();
 var success = function(val)
 {
  last_success = +new Date();
  cb();
 }

 var avg_interval = function(xs)
 {
  if (_.size(xs) < 2) return 1000*60*60;
  var xxx = 0;
  var f = _.first(xs);
  _.each(_.rest(xs), function(v){
   xxx += v[0] - f[0];
   f = v;
  });
  return xxx / (_.size(xs)-1);
 };

 return function(val)
 {
  if (_.size(x) >= 2)
  {
   var y = _.map(x, function(v){return v[1];});
   var mean = _.reduce(y, function(a, b) { return a + b; }, 0)/_.size(y);
   var variance = _.reduce(y, function(a,b){ return a + b*b; }, 0)/_.size(y) - Math.pow(_.reduce(y, function(a, b) { return a + b; }, 0)/_.size(y), 2);

   if (variance > 0)
   {
    var X = gaussian(mean, variance);

    var ifix = 1 / (preferred_interval/avg_interval(x));
    var tfix = (+new Date() - last_success) / preferred_interval;

    if (val > X.ppf(1.0 - ifix*tfix))
    {
     success(val);
    }
   }
  }

  x.push([+new Date(), val]);
 }
};
