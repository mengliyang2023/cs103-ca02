
'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


var userSchema = Schema( {
  username:String,
  passphrase: String,
  age:Number,
  apirequest: {type:Schema.Types.Mixed, ref:'apiRequest' }
} );

module.exports = mongoose.model( 'User', userSchema );
