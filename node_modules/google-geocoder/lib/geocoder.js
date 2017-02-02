var _ = require('underscore')

  , request = require('superagent')

  , apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json'
;


function GeoPlace(res){

  Object
  .defineProperty(
    this,
    'googleResponse', {
      value : res,
      writable : false,
      enumerable : false,
      configurable : true
    });

  Object
  .defineProperty(
    this,
    'city', {
      enumerable : true,
      get: function(){
        switch(this.country.short_name){
          case 'CA':
          case 'US':
            return this.locality||this.sublocality;
        }
        return undefined;
      }
    });


  Object
  .defineProperty(
    this,
    'province_state', {
      enumerable : true,
      get: function(){
        switch(this.country.short_name){
          case 'CA':
          case 'US':
            return this.administrative_area_level_1;
        }
        return undefined;
      }
    });


  this.googleResponse = res;
  this._parseResult( res);

}

GeoPlace.prototype._normalizeAddressComponents = function(res){
  var components = {};
  res.address_components.forEach(function(item){
    components[ item.types[0]] = {
      long_name: item.long_name,
      short_name: item.short_name
    };
  });
  return components;
};

GeoPlace.prototype._parseResult = function(res){

  var norm = this._normalizeAddressComponents( res);
  _.extend(this, norm);

  this.formatted_address = res.formatted_address;

  var geo = res.geometry;
  this.location = geo.location;
  this.location_type = geo.location_type;

  if( geo.bounds) this.location_bounds = geo.bounds;

  return norm;
};

GeoPlace.parseAddressResults = function(results){
  var places = [];
  results.forEach(function(res){
    places.push( new GeoPlace(res));
  });
  return places;
};


function GeoCoder(apiKey){

  this.queryData = {
    key: apiKey,
    sensor: false
  };

  this.lastResults = null;
};


GeoCoder.prototype.find = function(place, cb){
  var coder = this;
  request
  .get(apiUrl)
  .query(_.extend({
    address: place
  }, this.queryData))
  .end(function(res){
    switch( res.body.status){
      case 'OK':
      case 'ZERO_RESULTS':
        coder.lastResults = res.body;
        cb&&cb(null,
          GeoPlace.parseAddressResults( res.body.results),
          res.body
        );
      break;
      default:
        cb&&cb(res.body);
    }
  });
};


module.exports = function(options){

  if( !options || !options.hasOwnProperty('key')){
    throw new Error('Property `key` required. Please register your app with google api and the api key here.');
  }

  return new GeoCoder(options.key);
};

module.exports.GeoCoder = GeoCoder;
module.exports.GeoPlace = GeoPlace;
