var geocoder = require('../')
  , should = require('should')
  , apiKey = process.env.GOOGLE_GEOCODE_API_KEY
;

if( !apiKey){
  apiKey = require('./fixtures/google-api-key');
}


describe('GeoCoder', function(){

  describe('initialization', function(){

    it('should throw error requiring api key', function(done){

      (function(){
        var geo = geocoder({});
      }).should.throw(/Property `key` required/i);

      done()

    })


  })


  describe('with valid api key', function(){

    var geo = geocoder({
      key: apiKey
    });


    it('should create instance of `GeoCoder`', function(done){

      geo.should.be.instanceOf(geocoder.GeoCoder);
      done()
    })



    it('should return array of `GeoPlace` objects', function(done){

      geo.find('123 Yonge Street, Toronto', function(err, res){
        res[0].should.be.instanceOf(geocoder.GeoPlace);
        done()
      });

    })


    describe('and valid address', function(){


      describe('in Canada', function(){

        var validAddressResults;

        before(function(done){

          geo.find('223 Edenbridge Dr, Toronto', function(err, res){
            validAddressResults = res;
            done()
          });

        })


        it('should match address', function(done){
          validAddressResults.length.should.be.greaterThan(0);
          validAddressResults[0].formatted_address.should.match(/223 Edenbridge Dr/i);
          done()
        })

        it('should get city', function(done){
          validAddressResults[0].city.short_name.should.match(/Toronto/i);
          done()
        })


        it('should get province', function(done){
          validAddressResults[0].province_state.short_name.should.match(/ON/i);
          validAddressResults[0].province_state.long_name.should.match(/Ontario/i);
          done()
        })

      })


      describe('in United States', function(){

        var validAddressResults;

        before(function(done){

          geo.find('289 10th Ave, New York', function(err, res){
            validAddressResults = res;
            done()
          });

        })

        it('should match address', function(done){
          validAddressResults.length.should.be.greaterThan(0);
          validAddressResults[0].formatted_address.should.match(/289 10th Ave, New York/i);
          done()
        })

        it('should get city', function(done){
          validAddressResults[0].city.short_name.should.match(/NY/i);
          done()
        })


        it('should get state', function(done){
          validAddressResults[0].province_state.short_name.should.match(/NY/i);
          validAddressResults[0].province_state.long_name.should.match(/New York/i);
          done()
        })

      })

    })


    it('should find city', function(done){

      geo.find('Toronto', function(err, res){
        res.length.should.be.greaterThan(0);
        res[0].locality.long_name.should.eql('Toronto');
        done()
      });

    })


    it('should find no results', function(done){

      geo.find('xxy', function(err, res){
        res.should.have.length(0);
        done()
      });

    })


  })



})
