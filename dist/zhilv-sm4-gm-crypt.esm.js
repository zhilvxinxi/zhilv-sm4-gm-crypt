function md5(string,bit) {
  function md5_RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function md5_AddUnsigned(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) {
          return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }
      if (lX4 | lY4) {
          if (lResult & 0x40000000) {
              return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
          } else {
              return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
          }
      } else {
          return (lResult ^ lX8 ^ lY8);
      }
  }
  function md5_F(x, y, z) {
      return (x & y) | ((~x) & z);
  }
  function md5_G(x, y, z) {
      return (x & z) | (y & (~z));
  }
  function md5_H(x, y, z) {
      return (x ^ y ^ z);
  }
  function md5_I(x, y, z) {
      return (y ^ (x | (~z)));
  }
  function md5_FF(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }  function md5_GG(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }  function md5_HH(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }  function md5_II(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }  function md5_ConvertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1 = lMessageLength + 8;
      var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      var lWordArray = Array(lNumberOfWords - 1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4) * 8;
          lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
          lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
  }  function md5_WordToHex(lValue) {
      var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
          lByte = (lValue >>> (lCount * 8)) & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }
      return WordToHexValue;
  }  function md5_Utf8Encode(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
              utftext += String.fromCharCode(c);
          } else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          } else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }
      }
      return utftext;
  }  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
  string = md5_Utf8Encode(string);
  x = md5_ConvertToWordArray(string);
  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
      AA = a; BB = b; CC = c; DD = d;
      a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
      d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
      c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
      b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
      a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
      d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
      c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
      b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
      a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
      d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
      c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
      b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
      a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
      d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
      c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
      b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
      a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
      d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
      c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
      b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
      a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
      d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
      b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
      a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
      d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
      c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
      b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
      a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
      d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
      c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
      b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
      a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
      d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
      c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
      b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
      a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
      d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
      c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
      b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
      a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
      d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
      c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
      b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
      a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
      d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
      c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
      b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
      a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
      d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
      c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
      b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
      a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
      d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
      c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
      b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
      a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
      d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
      c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
      b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
      a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
      d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
      c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
      b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
      a = md5_AddUnsigned(a, AA);
      b = md5_AddUnsigned(b, BB);
      c = md5_AddUnsigned(c, CC);
      d = md5_AddUnsigned(d, DD);
  }
  return (md5_WordToHex(b) + md5_WordToHex(c)).toLowerCase();
}

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens (b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4);

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

  var curByte = 0;

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen;

  var i;
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = (tmp >> 16) & 0xFF;
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[curByte++] = (tmp >> 8) & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    );
  }

  return parts.join('')
}

class Crypt {
  /**
   * Converts a JS string to an UTF-8 uint8array.
   *
   * @static
   * @param {String} str 16-bit unicode string.
   * @return {Uint8Array} UTF-8 Uint8Array.
   * @memberof Crypt
   */
  static stringToArrayBufferInUtf8(str) {
    // if not browser env, then require node.js's util. otherwise just use window's
    const TextEncoder =
      typeof window === 'undefined'
        ? require('util').TextEncoder
        : window.TextEncoder;
    // always utf-8
    let encoder = new TextEncoder();
    return encoder.encode(str);
  }

  /**
   * Converts an UTF-8 uint8array to a JS string.
   *
   * @static
   * @param {Uint8Array} strBuffer UTF-8 Uint8Array.
   * @return {String} 16-bit unicode string.
   * @memberof Crypt
   */
  static utf8ArrayBufferToString(strBuffer) {
    // if not browser env, then require node.js's util. otherwise just use window's
    const TextDecoder =
      typeof window === 'undefined'
        ? require('util').TextDecoder
        : window.TextDecoder;
    let decoder = new TextDecoder('utf-8');
    return decoder.decode(strBuffer);
  }

  /**
   * crypt a utf8 byteArray to base64 string
   *
   * @static
   * @param {Uint8Array} strBuffer UTF-8 Uint8Array.
   * @returns {String} base64 str
   * @memberof Crypt
   */
  static arrayBufferToBase64(strBuffer) {
    return undefined(strBuffer);
  }

  /**
   * crypt base64 stringa to utf8 byteArray
   *
   * @static
   * @param {String} base64 str
   * @returns {Uint8Array} strBuffer UTF-8 Uint8Array.
   * @memberof Crypt
   */
  static base64ToArrayBuffer(base64) {
    return undefined(base64);
  }
}

const UINT8_BLOCK = 16;

const Sbox = Uint8Array.from([
  0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28,
  0xfb, 0x2c, 0x05, 0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44,
  0x13, 0x26, 0x49, 0x86, 0x06, 0x99, 0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98,
  0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62, 0xe4, 0xb3, 0x1c, 0xa9,
  0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6, 0x47,
  0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85,
  0x4f, 0xa8, 0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f,
  0x4b, 0x70, 0x56, 0x9d, 0x35, 0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2,
  0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87, 0xd4, 0x00, 0x46, 0x57, 0x9f,
  0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e, 0xea, 0xbf,
  0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15,
  0xa1, 0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30,
  0xf5, 0x8c, 0xb1, 0xe3, 0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0,
  0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f, 0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd,
  0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51, 0x8d, 0x1b, 0xaf,
  0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
  0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8,
  0xe5, 0xb4, 0xb0, 0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9,
  0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84, 0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d,
  0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48,
]);

const CK = Uint32Array.from([
  0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269, 0x70777e85, 0x8c939aa1,
  0xa8afb6bd, 0xc4cbd2d9, 0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
  0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9, 0xc0c7ced5, 0xdce3eaf1,
  0xf8ff060d, 0x141b2229, 0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
  0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209, 0x10171e25, 0x2c333a41,
  0x484f565d, 0x646b7279,
]);

const FK = Uint32Array.from([0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc]);

class SM4 {
  /**
   * Creates an instance of SM4.
   * @param {Object} config
   * @memberof SM4
   */
  constructor(config) {
    let keyBuffer = Crypt.stringToArrayBufferInUtf8(config.key);
    if (keyBuffer.length !== 16) {
      throw new Error('key should be a 16 bytes string');
    }
    /**
     * key should be 16 bytes string
     * @member {Uint8Array} key
     */
    this.key = keyBuffer;
    /**
     * iv also should be 16 bytes string
     * @member {Uint8Array} iv
     */
    let ivBuffer = new Uint8Array(0);
    if (config.iv !== undefined && config.iv !== null) {
      // need iv
      ivBuffer = Crypt.stringToArrayBufferInUtf8(config.iv);
      if (ivBuffer.length !== 16) {
        throw new Error('iv should be a 16 bytes string');
      }
    }
    this.iv = ivBuffer;
    /**
     * sm4's encrypt mode
     * @member {Enum} mode
     */
    this.mode = 'cbc';
    if (['cbc', 'ecb'].indexOf(config.mode) >= 0) {
      // set encrypt mode. default is cbc
      this.mode = config.mode;
    }
    /**
     * sm4's cipher data type
     * @member {Enum} outType
     */
    this.cipherType = 'base64';
    if (['base64', 'text'].indexOf(config.outType) >= 0) {
      // set encrypt mode. default is cbc
      this.cipherType = config.outType;
    }
    /**
     * sm4's encrypt round key array
     * @member {Uint32Array} encryptRoundKeys
     */
    this.encryptRoundKeys = new Uint32Array(32);
    // spawn 32 round keys
    this.spawnEncryptRoundKeys();

    /**
     * sm4's decrypt round key array
     * @member {Uint32Array} encryptRoundKeys
     */
    this.decryptRoundKeys = Uint32Array.from(this.encryptRoundKeys);
    this.decryptRoundKeys.reverse();
  }

  /**
   * general sm4 encrypt/decrypt algorithm for a 16 bytes block using roundKey
   *
   * @param {Uint32Array} blockData
   * @param {Uint32Array} roundKeys
   * @return {Uint32Array} return a 16 bytes cipher block
   * @memberof SM4
   */
  doBlockCrypt(blockData, roundKeys) {
    let xBlock = new Uint32Array(36);
    xBlock.set(blockData, 0);
    // loop to process 32 rounds crypt
    for (let i = 0; i < 32; i++) {
      xBlock[i + 4] =
        xBlock[i] ^
        this.tTransform1(
          xBlock[i + 1] ^ xBlock[i + 2] ^ xBlock[i + 3] ^ roundKeys[i],
        );
    }
    let yBlock = new Uint32Array(4);
    // reverse last 4 xBlock member
    yBlock[0] = xBlock[35];
    yBlock[1] = xBlock[34];
    yBlock[2] = xBlock[33];
    yBlock[3] = xBlock[32];
    return yBlock;
  }

  /**
   * spawn round key array for encrypt. reverse this key array when decrypt.
   * every round key's length is 32 bytes.
   * there are 32 round keys.
   * @return {Uint32Array}
   * @memberof SM4
   */
  spawnEncryptRoundKeys() {
    // extract mk in key
    let mk = new Uint32Array(4);
    mk[0] =
      (this.key[0] << 24) |
      (this.key[1] << 16) |
      (this.key[2] << 8) |
      this.key[3];
    mk[1] =
      (this.key[4] << 24) |
      (this.key[5] << 16) |
      (this.key[6] << 8) |
      this.key[7];
    mk[2] =
      (this.key[8] << 24) |
      (this.key[9] << 16) |
      (this.key[10] << 8) |
      this.key[11];
    mk[3] =
      (this.key[12] << 24) |
      (this.key[13] << 16) |
      (this.key[14] << 8) |
      this.key[15];
    // calculate the K array
    let k = new Uint32Array(36);
    k[0] = mk[0] ^ FK[0];
    k[1] = mk[1] ^ FK[1];
    k[2] = mk[2] ^ FK[2];
    k[3] = mk[3] ^ FK[3];
    // loop to spawn 32 round keys
    for (let i = 0; i < 32; i++) {
      k[i + 4] =
        k[i] ^ this.tTransform2(k[i + 1] ^ k[i + 2] ^ k[i + 3] ^ CK[i]);
      this.encryptRoundKeys[i] = k[i + 4];
    }
  }

  /**
   * left rotate x by y bits
   *
   * @param {*} x
   * @param {Number} y
   * @returns
   * @memberof SM4
   */
  rotateLeft(x, y) {
    return (x << y) | (x >>> (32 - y));
  }

  /**
   * L transform function for encrypt
   *
   * @param {Uint32Number} b
   * @returns {Uint32Number}
   * @memberof SM4
   */
  linearTransform1(b) {
    return (
      b ^
      this.rotateLeft(b, 2) ^
      this.rotateLeft(b, 10) ^
      this.rotateLeft(b, 18) ^
      this.rotateLeft(b, 24)
    );
  }

  /**
   * L' transform function for key expand
   *
   * @param {Uint32Number} b
   * @returns {Uint32Number}
   * @memberof SM4
   */
  linearTransform2(b) {
    return b ^ this.rotateLeft(b, 13) ^ this.rotateLeft(b, 23);
  }

  /**
   * τ transform function
   *
   * @param {Uint32Number} a
   * @returns {Uint32Number}
   * @memberof SM4
   */
  tauTransform(a) {
    return (
      (Sbox[(a >>> 24) & 0xff] << 24) |
      (Sbox[(a >>> 16) & 0xff] << 16) |
      (Sbox[(a >>> 8) & 0xff] << 8) |
      Sbox[a & 0xff]
    );
  }

  /**
   * mix replacement T transform for encrypt
   *
   * @param {Uint32Number} z
   * @returns {Uint32Number}
   * @memberof SM4
   */
  tTransform1(z) {
    let b = this.tauTransform(z);
    let c = this.linearTransform1(b);
    return c;
  }

  /**
   * mix replacement T transform for key expand
   *
   * @param {Uint32Number} z
   * @returns {Uint32Number}
   * @memberof SM4
   */
  tTransform2(z) {
    let b = this.tauTransform(z);
    let c = this.linearTransform2(b);
    return c;
  }

  /**
   * padding the array length to multiple of BLOCK
   *
   * @param {ByteArray} originalBuffer
   * @returns {ByteArray}
   * @memberof SM4
   */
  padding(originalBuffer) {
    if (originalBuffer === null) {
      return null;
    }
    let paddingLength = UINT8_BLOCK - (originalBuffer.length % UINT8_BLOCK);
    let paddedBuffer = new Uint8Array(originalBuffer.length + paddingLength);
    paddedBuffer.set(originalBuffer, 0);
    paddedBuffer.fill(paddingLength, originalBuffer.length);
    return paddedBuffer;
  }

  /**
   * depadding the byte array to its original length
   *
   * @param {ByteArray} paddedBuffer
   * @returns {ByteArray}
   * @memberof SM4
   */
  dePadding(paddedBuffer) {
    if (paddedBuffer === null) {
      return null;
    }
    let paddingLength = paddedBuffer[paddedBuffer.length - 1];
    let originalBuffer = paddedBuffer.slice(
      0,
      paddedBuffer.length - paddingLength,
    );
    return originalBuffer;
  }

  /**
   * exctract uint32 array block from uint8 array
   *
   * @param {Uint8Array} uint8Array
   * @param {Number} baseIndex
   * @returns {Uint32Array}
   * @memberof SM4
   */
  uint8ToUint32Block(uint8Array, baseIndex = 0) {
    let block = new Uint32Array(4); // make Uint8Array to Uint32Array block
    block[0] =
      (uint8Array[baseIndex] << 24) |
      (uint8Array[baseIndex + 1] << 16) |
      (uint8Array[baseIndex + 2] << 8) |
      uint8Array[baseIndex + 3];
    block[1] =
      (uint8Array[baseIndex + 4] << 24) |
      (uint8Array[baseIndex + 5] << 16) |
      (uint8Array[baseIndex + 6] << 8) |
      uint8Array[baseIndex + 7];
    block[2] =
      (uint8Array[baseIndex + 8] << 24) |
      (uint8Array[baseIndex + 9] << 16) |
      (uint8Array[baseIndex + 10] << 8) |
      uint8Array[baseIndex + 11];
    block[3] =
      (uint8Array[baseIndex + 12] << 24) |
      (uint8Array[baseIndex + 13] << 16) |
      (uint8Array[baseIndex + 14] << 8) |
      uint8Array[baseIndex + 15];
    return block;
  }

  /**
   * encrypt the string plaintext
   *
   * @param {String} plaintext
   * @memberof SM4
   * @return {String} ciphertext
   */
  encrypt(plaintext) {
    let plainByteArray = Crypt.stringToArrayBufferInUtf8(plaintext);
    let padded = this.padding(plainByteArray);
    let blockTimes = padded.length / UINT8_BLOCK;
    let outArray = new Uint8Array(padded.length);
    if (this.mode === 'cbc') {
      // CBC mode
      if (this.iv === null || this.iv.length !== 16) {
        throw new Error('iv error');
      }
      // init chain with iv (transform to uint32 block)
      let chainBlock = this.uint8ToUint32Block(this.iv);
      for (let i = 0; i < blockTimes; i++) {
        // extract the 16 bytes block data for this round to encrypt
        let roundIndex = i * UINT8_BLOCK;
        let block = this.uint8ToUint32Block(padded, roundIndex);
        // xor the chain block
        chainBlock[0] = chainBlock[0] ^ block[0];
        chainBlock[1] = chainBlock[1] ^ block[1];
        chainBlock[2] = chainBlock[2] ^ block[2];
        chainBlock[3] = chainBlock[3] ^ block[3];
        // use chain block to crypt
        let cipherBlock = this.doBlockCrypt(chainBlock, this.encryptRoundKeys);
        // make the cipher block be part of next chain block
        chainBlock = cipherBlock;
        for (let l = 0; l < UINT8_BLOCK; l++) {
          outArray[roundIndex + l] =
            (cipherBlock[parseInt(l / 4)] >> (((3 - l) % 4) * 8)) & 0xff;
        }
      }
    } else {
      // this will be ECB mode
      for (let i = 0; i < blockTimes; i++) {
        // extract the 16 bytes block data for this round to encrypt
        let roundIndex = i * UINT8_BLOCK;
        let block = this.uint8ToUint32Block(padded, roundIndex);
        let cipherBlock = this.doBlockCrypt(block, this.encryptRoundKeys);
        for (let l = 0; l < UINT8_BLOCK; l++) {
          outArray[roundIndex + l] =
            (cipherBlock[parseInt(l / 4)] >> (((3 - l) % 4) * 8)) & 0xff;
        }
      }
    }

    // cipher array to string
    if (this.cipherType === 'base64') {
      return Crypt.arrayBufferToBase64(outArray);
    } else {
      // text
      return Crypt.utf8ArrayBufferToString(outArray);
    }
  }

  /**
   * decrypt the string ciphertext
   *
   * @param {String} ciphertext
   * @memberof SM4
   */
  decrypt(ciphertext) {
    // get cipher byte array
    let cipherByteArray = new Uint8Array();
    if (this.cipherType === 'base64') {
      // cipher is base64 string
      cipherByteArray = Crypt.base64ToArrayBuffer(ciphertext);
    } else {
      // cipher is text
      cipherByteArray = Crypt.stringToArrayBufferInUtf8(ciphertext);
    }
    let blockTimes = cipherByteArray.length / UINT8_BLOCK;
    let outArray = new Uint8Array(cipherByteArray.length);
    // decrypt the ciphertext by block
    if (this.mode === 'cbc') {
      // todo CBC mode
      if (this.iv === null || this.iv.length !== 16) {
        throw new Error('iv error');
      }
      // init chain with iv (transform to uint32 block)
      let chainBlock = this.uint8ToUint32Block(this.iv);
      for (let i = 0; i < blockTimes; i++) {
        // extract the 16 bytes block data for this round to encrypt
        let roundIndex = i * UINT8_BLOCK;
        // make Uint8Array to Uint32Array block
        let block = this.uint8ToUint32Block(cipherByteArray, roundIndex);
        // reverse the round keys to decrypt
        let plainBlockBeforeXor = this.doBlockCrypt(
          block,
          this.decryptRoundKeys,
        );
        // xor the chain block
        let plainBlock = new Uint32Array(4);
        plainBlock[0] = chainBlock[0] ^ plainBlockBeforeXor[0];
        plainBlock[1] = chainBlock[1] ^ plainBlockBeforeXor[1];
        plainBlock[2] = chainBlock[2] ^ plainBlockBeforeXor[2];
        plainBlock[3] = chainBlock[3] ^ plainBlockBeforeXor[3];
        // make the cipher block be part of next chain block
        chainBlock = block;
        for (let l = 0; l < UINT8_BLOCK; l++) {
          outArray[roundIndex + l] =
            (plainBlock[parseInt(l / 4)] >> (((3 - l) % 4) * 8)) & 0xff;
        }
      }
    } else {
      // ECB mode
      for (let i = 0; i < blockTimes; i++) {
        // extract the 16 bytes block data for this round to encrypt
        let roundIndex = i * UINT8_BLOCK;
        // make Uint8Array to Uint32Array block
        let block = this.uint8ToUint32Block(cipherByteArray, roundIndex);
        // reverse the round keys to decrypt
        let plainBlock = this.doBlockCrypt(block, this.decryptRoundKeys);
        for (let l = 0; l < UINT8_BLOCK; l++) {
          outArray[roundIndex + l] =
            (plainBlock[parseInt(l / 4)] >> (((3 - l) % 4) * 8)) & 0xff;
        }
      }
    }
    // depadding the decrypted data
    let depaddedPlaintext = this.dePadding(outArray);
    // transform data to utf8 string
    return Crypt.utf8ArrayBufferToString(depaddedPlaintext);
  }
}

/**
 * @description 青岛智旅 sm4 生成方法
 * @param pwd 需要加密的数据例如 密码之类的
 * @param key 加密的 key
 * */
function gmcryptSm4(pwd, key) {
    var md5Data = md5(key);
    var sm4Config = {
        key: md5Data.substring(md5Data.length - 16),
        iv: md5Data.substring(md5Data.length - 16),
    };
    var sm4 = new SM4(sm4Config);
    var newPassword = pwd.trim();
    return sm4.encrypt(newPassword);
}

export { gmcryptSm4 };
