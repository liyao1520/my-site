import {
  AlphaFilter,
  BLEND_MODES,
  BlurFilterPass,
  DEG_TO_RAD,
  Filter,
  MIPMAP_MODES,
  ObservablePoint,
  Point,
  SCALE_MODES,
  Texture,
  hex2rgb,
  rgb2hex,
  settings
} from "./chunk-TVAI25MV.js";
import "./chunk-G3PMV62Z.js";

// node_modules/.pnpm/@pixi+filter-adjustment@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_c4ibohygimeljz35ax5qga4o54/node_modules/@pixi/filter-adjustment/dist/filter-adjustment.esm.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n";
var AdjustmentFilter = (
  /** @class */
  function(_super) {
    __extends(AdjustmentFilter2, _super);
    function AdjustmentFilter2(options) {
      var _this = _super.call(this, vertex, fragment) || this;
      _this.gamma = 1;
      _this.saturation = 1;
      _this.contrast = 1;
      _this.brightness = 1;
      _this.red = 1;
      _this.green = 1;
      _this.blue = 1;
      _this.alpha = 1;
      Object.assign(_this, options);
      return _this;
    }
    AdjustmentFilter2.prototype.apply = function(filterManager, input, output, clear) {
      this.uniforms.gamma = Math.max(this.gamma, 1e-4);
      this.uniforms.saturation = this.saturation;
      this.uniforms.contrast = this.contrast;
      this.uniforms.brightness = this.brightness;
      this.uniforms.red = this.red;
      this.uniforms.green = this.green;
      this.uniforms.blue = this.blue;
      this.uniforms.alpha = this.alpha;
      filterManager.applyFilter(this, input, output, clear);
    };
    return AdjustmentFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-kawase-blur@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.1_ymqbssl3y5lp4qsqcr57ebwbli/node_modules/@pixi/filter-kawase-blur/dist/filter-kawase-blur.esm.mjs
var extendStatics2 = function(d, b) {
  extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics2(d, b);
};
function __extends2(d, b) {
  extendStatics2(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex2 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment2 = "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}";
var fragmentClamp = "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n";
var KawaseBlurFilter = (
  /** @class */
  function(_super) {
    __extends2(KawaseBlurFilter2, _super);
    function KawaseBlurFilter2(blur, quality, clamp) {
      if (blur === void 0) {
        blur = 4;
      }
      if (quality === void 0) {
        quality = 3;
      }
      if (clamp === void 0) {
        clamp = false;
      }
      var _this = _super.call(this, vertex2, clamp ? fragmentClamp : fragment2) || this;
      _this._kernels = [];
      _this._blur = 4;
      _this._quality = 3;
      _this.uniforms.uOffset = new Float32Array(2);
      _this._pixelSize = new Point();
      _this.pixelSize = 1;
      _this._clamp = clamp;
      if (Array.isArray(blur)) {
        _this.kernels = blur;
      } else {
        _this._blur = blur;
        _this.quality = quality;
      }
      return _this;
    }
    KawaseBlurFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var uvX = this._pixelSize.x / input._frame.width;
      var uvY = this._pixelSize.y / input._frame.height;
      var offset;
      if (this._quality === 1 || this._blur === 0) {
        offset = this._kernels[0] + 0.5;
        this.uniforms.uOffset[0] = offset * uvX;
        this.uniforms.uOffset[1] = offset * uvY;
        filterManager.applyFilter(this, input, output, clear);
      } else {
        var renderTarget = filterManager.getFilterTexture();
        var source = input;
        var target = renderTarget;
        var tmp = void 0;
        var last = this._quality - 1;
        for (var i = 0; i < last; i++) {
          offset = this._kernels[i] + 0.5;
          this.uniforms.uOffset[0] = offset * uvX;
          this.uniforms.uOffset[1] = offset * uvY;
          filterManager.applyFilter(this, source, target, 1);
          tmp = source;
          source = target;
          target = tmp;
        }
        offset = this._kernels[last] + 0.5;
        this.uniforms.uOffset[0] = offset * uvX;
        this.uniforms.uOffset[1] = offset * uvY;
        filterManager.applyFilter(this, source, output, clear);
        filterManager.returnFilterTexture(renderTarget);
      }
    };
    KawaseBlurFilter2.prototype._updatePadding = function() {
      this.padding = Math.ceil(this._kernels.reduce(function(acc, v) {
        return acc + v + 0.5;
      }, 0));
    };
    KawaseBlurFilter2.prototype._generateKernels = function() {
      var blur = this._blur;
      var quality = this._quality;
      var kernels = [blur];
      if (blur > 0) {
        var k = blur;
        var step = blur / quality;
        for (var i = 1; i < quality; i++) {
          k -= step;
          kernels.push(k);
        }
      }
      this._kernels = kernels;
      this._updatePadding();
    };
    Object.defineProperty(KawaseBlurFilter2.prototype, "kernels", {
      /**
       * The kernel size of the blur filter, for advanced usage.
       * @default [0]
       */
      get: function() {
        return this._kernels;
      },
      set: function(value) {
        if (Array.isArray(value) && value.length > 0) {
          this._kernels = value;
          this._quality = value.length;
          this._blur = Math.max.apply(Math, value);
        } else {
          this._kernels = [0];
          this._quality = 1;
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(KawaseBlurFilter2.prototype, "clamp", {
      /**
       * Get the if the filter is clampped.
       *
       * @readonly
       * @default false
       */
      get: function() {
        return this._clamp;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(KawaseBlurFilter2.prototype, "pixelSize", {
      get: function() {
        return this._pixelSize;
      },
      /**
       * Sets the pixel size of the filter. Large size is blurrier. For advanced usage.
       *
       * @member {PIXI.Point|number[]}
       * @default [1, 1]
       */
      set: function(value) {
        if (typeof value === "number") {
          this._pixelSize.x = value;
          this._pixelSize.y = value;
        } else if (Array.isArray(value)) {
          this._pixelSize.x = value[0];
          this._pixelSize.y = value[1];
        } else if (value instanceof Point) {
          this._pixelSize.x = value.x;
          this._pixelSize.y = value.y;
        } else {
          this._pixelSize.x = 1;
          this._pixelSize.y = 1;
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(KawaseBlurFilter2.prototype, "quality", {
      /**
       * The quality of the filter, integer greater than `1`.
       * @default 3
       */
      get: function() {
        return this._quality;
      },
      set: function(value) {
        this._quality = Math.max(1, Math.round(value));
        this._generateKernels();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(KawaseBlurFilter2.prototype, "blur", {
      /**
       * The amount of blur, value greater than `0`.
       * @default 4
       */
      get: function() {
        return this._blur;
      },
      set: function(value) {
        this._blur = value;
        this._generateKernels();
      },
      enumerable: false,
      configurable: true
    });
    return KawaseBlurFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-advanced-bloom@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6._ffpjxaeegfs3jun5dqeyggia5m/node_modules/@pixi/filter-advanced-bloom/dist/filter-advanced-bloom.esm.mjs
var extendStatics3 = function(d, b) {
  extendStatics3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics3(d, b);
};
function __extends3(d, b) {
  extendStatics3(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex3 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment3 = "\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n";
var ExtractBrightnessFilter = (
  /** @class */
  function(_super) {
    __extends3(ExtractBrightnessFilter2, _super);
    function ExtractBrightnessFilter2(threshold) {
      if (threshold === void 0) {
        threshold = 0.5;
      }
      var _this = _super.call(this, vertex3, fragment3) || this;
      _this.threshold = threshold;
      return _this;
    }
    Object.defineProperty(ExtractBrightnessFilter2.prototype, "threshold", {
      /**
       * Defines how bright a color needs to be extracted.
       *
       * @default 0.5
       */
      get: function() {
        return this.uniforms.threshold;
      },
      set: function(value) {
        this.uniforms.threshold = value;
      },
      enumerable: false,
      configurable: true
    });
    return ExtractBrightnessFilter2;
  }(Filter)
);
var fragment$1 = "uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n";
var AdvancedBloomFilter = (
  /** @class */
  function(_super) {
    __extends3(AdvancedBloomFilter2, _super);
    function AdvancedBloomFilter2(options) {
      var _this = _super.call(this, vertex3, fragment$1) || this;
      _this.bloomScale = 1;
      _this.brightness = 1;
      _this._resolution = settings.FILTER_RESOLUTION;
      if (typeof options === "number") {
        options = { threshold: options };
      }
      var opt = Object.assign(AdvancedBloomFilter2.defaults, options);
      _this.bloomScale = opt.bloomScale;
      _this.brightness = opt.brightness;
      var kernels = opt.kernels, blur = opt.blur, quality = opt.quality, pixelSize = opt.pixelSize, resolution = opt.resolution;
      _this._extractFilter = new ExtractBrightnessFilter(opt.threshold);
      _this._extractFilter.resolution = resolution;
      _this._blurFilter = kernels ? new KawaseBlurFilter(kernels) : new KawaseBlurFilter(blur, quality);
      _this.pixelSize = pixelSize;
      _this.resolution = resolution;
      return _this;
    }
    AdvancedBloomFilter2.prototype.apply = function(filterManager, input, output, clear, currentState) {
      var brightTarget = filterManager.getFilterTexture();
      this._extractFilter.apply(filterManager, input, brightTarget, 1, currentState);
      var bloomTarget = filterManager.getFilterTexture();
      this._blurFilter.apply(filterManager, brightTarget, bloomTarget, 1);
      this.uniforms.bloomScale = this.bloomScale;
      this.uniforms.brightness = this.brightness;
      this.uniforms.bloomTexture = bloomTarget;
      filterManager.applyFilter(this, input, output, clear);
      filterManager.returnFilterTexture(bloomTarget);
      filterManager.returnFilterTexture(brightTarget);
    };
    Object.defineProperty(AdvancedBloomFilter2.prototype, "resolution", {
      /**
       * The resolution of the filter.
       * @ignore
       */
      get: function() {
        return this._resolution;
      },
      set: function(value) {
        this._resolution = value;
        if (this._extractFilter) {
          this._extractFilter.resolution = value;
        }
        if (this._blurFilter) {
          this._blurFilter.resolution = value;
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(AdvancedBloomFilter2.prototype, "threshold", {
      /**
       * Defines how bright a color needs to be to affect bloom.
       *
       * @default 0.5
       */
      get: function() {
        return this._extractFilter.threshold;
      },
      set: function(value) {
        this._extractFilter.threshold = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(AdvancedBloomFilter2.prototype, "kernels", {
      /**
       * Sets the kernels of the Blur Filter
       */
      get: function() {
        return this._blurFilter.kernels;
      },
      set: function(value) {
        this._blurFilter.kernels = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(AdvancedBloomFilter2.prototype, "blur", {
      /**
       * Sets the strength of the Blur properties simultaneously
       *
       * @default 2
       */
      get: function() {
        return this._blurFilter.blur;
      },
      set: function(value) {
        this._blurFilter.blur = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(AdvancedBloomFilter2.prototype, "quality", {
      /**
       * Sets the quality of the Blur Filter
       *
       * @default 4
       */
      get: function() {
        return this._blurFilter.quality;
      },
      set: function(value) {
        this._blurFilter.quality = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(AdvancedBloomFilter2.prototype, "pixelSize", {
      /**
       * Sets the pixelSize of the Kawase Blur filter
       *
       * @member {number|number[]|PIXI.Point}
       * @default 1
       */
      get: function() {
        return this._blurFilter.pixelSize;
      },
      set: function(value) {
        this._blurFilter.pixelSize = value;
      },
      enumerable: false,
      configurable: true
    });
    AdvancedBloomFilter2.defaults = {
      threshold: 0.5,
      bloomScale: 1,
      brightness: 1,
      kernels: null,
      blur: 8,
      quality: 4,
      pixelSize: 1,
      resolution: settings.FILTER_RESOLUTION
    };
    return AdvancedBloomFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-ascii@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_@pi_snkz2mo7sv3wkpr6tbolxockwi/node_modules/@pixi/filter-ascii/dist/filter-ascii.esm.mjs
var extendStatics4 = function(d, b) {
  extendStatics4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics4(d, b);
};
function __extends4(d, b) {
  extendStatics4(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex4 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment4 = "varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n";
var AsciiFilter = (
  /** @class */
  function(_super) {
    __extends4(AsciiFilter2, _super);
    function AsciiFilter2(size) {
      if (size === void 0) {
        size = 8;
      }
      var _this = _super.call(this, vertex4, fragment4) || this;
      _this.size = size;
      return _this;
    }
    Object.defineProperty(AsciiFilter2.prototype, "size", {
      /**
       * The pixel size used by the filter.
       */
      get: function() {
        return this.uniforms.pixelSize;
      },
      set: function(value) {
        this.uniforms.pixelSize = value;
      },
      enumerable: false,
      configurable: true
    });
    return AsciiFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-bevel@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_@pi_22j64kuivqzxaxjjq4x42qfnp4/node_modules/@pixi/filter-bevel/dist/filter-bevel.esm.mjs
var extendStatics5 = function(d, b) {
  extendStatics5 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics5(d, b);
};
function __extends5(d, b) {
  extendStatics5(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex5 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment5 = "precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n";
var BevelFilter = (
  /** @class */
  function(_super) {
    __extends5(BevelFilter2, _super);
    function BevelFilter2(options) {
      var _this = _super.call(this, vertex5, fragment5) || this;
      _this._thickness = 2;
      _this._angle = 0;
      _this.uniforms.lightColor = new Float32Array(3);
      _this.uniforms.shadowColor = new Float32Array(3);
      Object.assign(_this, {
        rotation: 45,
        thickness: 2,
        lightColor: 16777215,
        lightAlpha: 0.7,
        shadowColor: 0,
        shadowAlpha: 0.7
      }, options);
      _this.padding = 1;
      return _this;
    }
    BevelFilter2.prototype._updateTransform = function() {
      this.uniforms.transformX = this._thickness * Math.cos(this._angle);
      this.uniforms.transformY = this._thickness * Math.sin(this._angle);
    };
    Object.defineProperty(BevelFilter2.prototype, "rotation", {
      /**
       * The angle of the light in degrees.
       * @default 45
       */
      get: function() {
        return this._angle / DEG_TO_RAD;
      },
      set: function(value) {
        this._angle = value * DEG_TO_RAD;
        this._updateTransform();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BevelFilter2.prototype, "thickness", {
      /**
       * The tickness of the bevel.
       * @default 2
       */
      get: function() {
        return this._thickness;
      },
      set: function(value) {
        this._thickness = value;
        this._updateTransform();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BevelFilter2.prototype, "lightColor", {
      /**
       * Color of the light.
       * @default 0xffffff
       */
      get: function() {
        return rgb2hex(this.uniforms.lightColor);
      },
      set: function(value) {
        hex2rgb(value, this.uniforms.lightColor);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BevelFilter2.prototype, "lightAlpha", {
      /**
       * Alpha of the light.
       * @default 0.7
       */
      get: function() {
        return this.uniforms.lightAlpha;
      },
      set: function(value) {
        this.uniforms.lightAlpha = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BevelFilter2.prototype, "shadowColor", {
      /**
       * Color of the shadow.
       * @default 0x000000
       */
      get: function() {
        return rgb2hex(this.uniforms.shadowColor);
      },
      set: function(value) {
        hex2rgb(value, this.uniforms.shadowColor);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BevelFilter2.prototype, "shadowAlpha", {
      /**
       * Alpha of the shadow.
       * @default 0.7
       */
      get: function() {
        return this.uniforms.shadowAlpha;
      },
      set: function(value) {
        this.uniforms.shadowAlpha = value;
      },
      enumerable: false,
      configurable: true
    });
    return BevelFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-bloom@4.2.0_7n6ylgx4tbwrexny4hitvaigqm/node_modules/@pixi/filter-bloom/dist/filter-bloom.esm.mjs
var extendStatics6 = function(d, b) {
  extendStatics6 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics6(d, b);
};
function __extends6(d, b) {
  extendStatics6(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var BloomFilter = (
  /** @class */
  function(_super) {
    __extends6(BloomFilter2, _super);
    function BloomFilter2(blur, quality, resolution, kernelSize) {
      if (blur === void 0) {
        blur = 2;
      }
      if (quality === void 0) {
        quality = 4;
      }
      if (resolution === void 0) {
        resolution = settings.FILTER_RESOLUTION;
      }
      if (kernelSize === void 0) {
        kernelSize = 5;
      }
      var _this = _super.call(this) || this;
      var blurX;
      var blurY;
      if (typeof blur === "number") {
        blurX = blur;
        blurY = blur;
      } else if (blur instanceof Point) {
        blurX = blur.x;
        blurY = blur.y;
      } else if (Array.isArray(blur)) {
        blurX = blur[0];
        blurY = blur[1];
      }
      _this.blurXFilter = new BlurFilterPass(true, blurX, quality, resolution, kernelSize);
      _this.blurYFilter = new BlurFilterPass(false, blurY, quality, resolution, kernelSize);
      _this.blurYFilter.blendMode = BLEND_MODES.SCREEN;
      _this.defaultFilter = new AlphaFilter();
      return _this;
    }
    BloomFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var renderTarget = filterManager.getFilterTexture();
      this.defaultFilter.apply(filterManager, input, output, clear);
      this.blurXFilter.apply(filterManager, input, renderTarget, 1);
      this.blurYFilter.apply(filterManager, renderTarget, output, 0);
      filterManager.returnFilterTexture(renderTarget);
    };
    Object.defineProperty(BloomFilter2.prototype, "blur", {
      /**
       * Sets the strength of both the blurX and blurY properties simultaneously
       * @default 2
       */
      get: function() {
        return this.blurXFilter.blur;
      },
      set: function(value) {
        this.blurXFilter.blur = this.blurYFilter.blur = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BloomFilter2.prototype, "blurX", {
      /**
       * Sets the strength of the blurX property
       * @default 2
       */
      get: function() {
        return this.blurXFilter.blur;
      },
      set: function(value) {
        this.blurXFilter.blur = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BloomFilter2.prototype, "blurY", {
      /**
       * Sets the strength of the blurY property
       * @default 2
       */
      get: function() {
        return this.blurYFilter.blur;
      },
      set: function(value) {
        this.blurYFilter.blur = value;
      },
      enumerable: false,
      configurable: true
    });
    return BloomFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-bulge-pinch@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.1_nzexeqdpmcmatvgc64ycrubhaa/node_modules/@pixi/filter-bulge-pinch/dist/filter-bulge-pinch.esm.mjs
var extendStatics7 = function(d, b) {
  extendStatics7 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics7(d, b);
};
function __extends7(d, b) {
  extendStatics7(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex6 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment6 = "uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n";
var BulgePinchFilter = (
  /** @class */
  function(_super) {
    __extends7(BulgePinchFilter2, _super);
    function BulgePinchFilter2(options) {
      var _this = _super.call(this, vertex6, fragment6) || this;
      _this.uniforms.dimensions = new Float32Array(2);
      Object.assign(_this, BulgePinchFilter2.defaults, options);
      return _this;
    }
    BulgePinchFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a = input.filterFrame, width = _a.width, height = _a.height;
      this.uniforms.dimensions[0] = width;
      this.uniforms.dimensions[1] = height;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(BulgePinchFilter2.prototype, "radius", {
      /**
       * The radius of the circle of effect.
       */
      get: function() {
        return this.uniforms.radius;
      },
      set: function(value) {
        this.uniforms.radius = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BulgePinchFilter2.prototype, "strength", {
      /**
       * The strength of the effect. -1 to 1 (-1 is strong pinch, 0 is no effect, 1 is strong bulge)
       */
      get: function() {
        return this.uniforms.strength;
      },
      set: function(value) {
        this.uniforms.strength = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BulgePinchFilter2.prototype, "center", {
      /**
       * The x and y coordinates of the center of the circle of effect.
       *
       * @member {PIXI.Point | Array<number>}
       */
      get: function() {
        return this.uniforms.center;
      },
      set: function(value) {
        this.uniforms.center = value;
      },
      enumerable: false,
      configurable: true
    });
    BulgePinchFilter2.defaults = {
      center: [0.5, 0.5],
      radius: 100,
      strength: 1
    };
    return BulgePinchFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-color-map@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10__bwulcw6e365zdmjjm2bu77nhuu/node_modules/@pixi/filter-color-map/dist/filter-color-map.esm.mjs
var extendStatics8 = function(d, b) {
  extendStatics8 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics8(d, b);
};
function __extends8(d, b) {
  extendStatics8(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex7 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment7 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}";
var ColorMapFilter = (
  /** @class */
  function(_super) {
    __extends8(ColorMapFilter2, _super);
    function ColorMapFilter2(colorMap, nearest, mix) {
      if (nearest === void 0) {
        nearest = false;
      }
      if (mix === void 0) {
        mix = 1;
      }
      var _this = _super.call(this, vertex7, fragment7) || this;
      _this.mix = 1;
      _this._size = 0;
      _this._sliceSize = 0;
      _this._slicePixelSize = 0;
      _this._sliceInnerSize = 0;
      _this._nearest = false;
      _this._scaleMode = null;
      _this._colorMap = null;
      _this._scaleMode = null;
      _this.nearest = nearest;
      _this.mix = mix;
      _this.colorMap = colorMap;
      return _this;
    }
    ColorMapFilter2.prototype.apply = function(filterManager, input, output, clear) {
      this.uniforms._mix = this.mix;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(ColorMapFilter2.prototype, "colorSize", {
      /**
       * The size of one color slice
       * @readonly
       */
      get: function() {
        return this._size;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ColorMapFilter2.prototype, "colorMap", {
      /**
       * the colorMap texture
       * @member {PIXI.Texture}
       */
      get: function() {
        return this._colorMap;
      },
      set: function(colorMap) {
        var _a;
        if (!colorMap) {
          return;
        }
        if (!(colorMap instanceof Texture)) {
          colorMap = Texture.from(colorMap);
        }
        if ((_a = colorMap) === null || _a === void 0 ? void 0 : _a.baseTexture) {
          colorMap.baseTexture.scaleMode = this._scaleMode;
          colorMap.baseTexture.mipmap = MIPMAP_MODES.OFF;
          this._size = colorMap.height;
          this._sliceSize = 1 / this._size;
          this._slicePixelSize = this._sliceSize / this._size;
          this._sliceInnerSize = this._slicePixelSize * (this._size - 1);
          this.uniforms._size = this._size;
          this.uniforms._sliceSize = this._sliceSize;
          this.uniforms._slicePixelSize = this._slicePixelSize;
          this.uniforms._sliceInnerSize = this._sliceInnerSize;
          this.uniforms.colorMap = colorMap;
        }
        this._colorMap = colorMap;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ColorMapFilter2.prototype, "nearest", {
      /**
       * Whether use NEAREST for colorMap texture.
       */
      get: function() {
        return this._nearest;
      },
      set: function(nearest) {
        this._nearest = nearest;
        this._scaleMode = nearest ? SCALE_MODES.NEAREST : SCALE_MODES.LINEAR;
        var texture = this._colorMap;
        if (texture && texture.baseTexture) {
          texture.baseTexture._glTextures = {};
          texture.baseTexture.scaleMode = this._scaleMode;
          texture.baseTexture.mipmap = MIPMAP_MODES.OFF;
          texture._updateID++;
          texture.baseTexture.emit("update", texture.baseTexture);
        }
      },
      enumerable: false,
      configurable: true
    });
    ColorMapFilter2.prototype.updateColorMap = function() {
      var texture = this._colorMap;
      if (texture && texture.baseTexture) {
        texture._updateID++;
        texture.baseTexture.emit("update", texture.baseTexture);
        this.colorMap = texture;
      }
    };
    ColorMapFilter2.prototype.destroy = function(destroyBase) {
      if (destroyBase === void 0) {
        destroyBase = false;
      }
      if (this._colorMap) {
        this._colorMap.destroy(destroyBase);
      }
      _super.prototype.destroy.call(this);
    };
    return ColorMapFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-color-overlay@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6._yfduulimgteyjy3lq5zxi665sy/node_modules/@pixi/filter-color-overlay/dist/filter-color-overlay.esm.mjs
var extendStatics9 = function(d, b) {
  extendStatics9 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics9(d, b);
};
function __extends9(d, b) {
  extendStatics9(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex8 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment8 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nuniform float alpha;\n\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);\n}\n";
var ColorOverlayFilter = (
  /** @class */
  function(_super) {
    __extends9(ColorOverlayFilter2, _super);
    function ColorOverlayFilter2(color, alpha) {
      if (color === void 0) {
        color = 0;
      }
      if (alpha === void 0) {
        alpha = 1;
      }
      var _this = _super.call(this, vertex8, fragment8) || this;
      _this._color = 0;
      _this._alpha = 1;
      _this.uniforms.color = new Float32Array(3);
      _this.color = color;
      _this.alpha = alpha;
      return _this;
    }
    Object.defineProperty(ColorOverlayFilter2.prototype, "color", {
      get: function() {
        return this._color;
      },
      /**
       * The resulting color, as a 3 component RGB e.g. [1.0, 0.5, 1.0]
       * @member {number|Array<number>|Float32Array}
       * @default 0x000000
       */
      set: function(value) {
        var arr = this.uniforms.color;
        if (typeof value === "number") {
          hex2rgb(value, arr);
          this._color = value;
        } else {
          arr[0] = value[0];
          arr[1] = value[1];
          arr[2] = value[2];
          this._color = rgb2hex(arr);
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ColorOverlayFilter2.prototype, "alpha", {
      get: function() {
        return this._alpha;
      },
      /**
       * The alpha value of the color
       * @default 0
       */
      set: function(value) {
        this.uniforms.alpha = value;
        this._alpha = value;
      },
      enumerable: false,
      configurable: true
    });
    return ColorOverlayFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-color-replace@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6._xii2t4o6th2nio5jvzqtoyyhcy/node_modules/@pixi/filter-color-replace/dist/filter-color-replace.esm.mjs
var extendStatics10 = function(d, b) {
  extendStatics10 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics10(d, b);
};
function __extends10(d, b) {
  extendStatics10(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex9 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment9 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n";
var ColorReplaceFilter = (
  /** @class */
  function(_super) {
    __extends10(ColorReplaceFilter2, _super);
    function ColorReplaceFilter2(originalColor, newColor, epsilon) {
      if (originalColor === void 0) {
        originalColor = 16711680;
      }
      if (newColor === void 0) {
        newColor = 0;
      }
      if (epsilon === void 0) {
        epsilon = 0.4;
      }
      var _this = _super.call(this, vertex9, fragment9) || this;
      _this._originalColor = 16711680;
      _this._newColor = 0;
      _this.uniforms.originalColor = new Float32Array(3);
      _this.uniforms.newColor = new Float32Array(3);
      _this.originalColor = originalColor;
      _this.newColor = newColor;
      _this.epsilon = epsilon;
      return _this;
    }
    Object.defineProperty(ColorReplaceFilter2.prototype, "originalColor", {
      get: function() {
        return this._originalColor;
      },
      /**
       * The color that will be changed, as a 3 component RGB e.g. [1.0, 1.0, 1.0]
       * @member {number|Array<number>|Float32Array}
       * @default 0xFF0000
       */
      set: function(value) {
        var arr = this.uniforms.originalColor;
        if (typeof value === "number") {
          hex2rgb(value, arr);
          this._originalColor = value;
        } else {
          arr[0] = value[0];
          arr[1] = value[1];
          arr[2] = value[2];
          this._originalColor = rgb2hex(arr);
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ColorReplaceFilter2.prototype, "newColor", {
      get: function() {
        return this._newColor;
      },
      /**
       * The resulting color, as a 3 component RGB e.g. [1.0, 0.5, 1.0]
       * @member {number|Array<number>|Float32Array}
       * @default 0x000000
       */
      set: function(value) {
        var arr = this.uniforms.newColor;
        if (typeof value === "number") {
          hex2rgb(value, arr);
          this._newColor = value;
        } else {
          arr[0] = value[0];
          arr[1] = value[1];
          arr[2] = value[2];
          this._newColor = rgb2hex(arr);
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ColorReplaceFilter2.prototype, "epsilon", {
      get: function() {
        return this.uniforms.epsilon;
      },
      /**
       * Tolerance/sensitivity of the floating-point comparison between colors (lower = more exact, higher = more inclusive)
       * @default 0.4
       */
      set: function(value) {
        this.uniforms.epsilon = value;
      },
      enumerable: false,
      configurable: true
    });
    return ColorReplaceFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-convolution@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5._ut467rql5jzwcu5zjkhv6txi2m/node_modules/@pixi/filter-convolution/dist/filter-convolution.esm.mjs
var extendStatics11 = function(d, b) {
  extendStatics11 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics11(d, b);
};
function __extends11(d, b) {
  extendStatics11(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex10 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment10 = "precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n";
var ConvolutionFilter = (
  /** @class */
  function(_super) {
    __extends11(ConvolutionFilter2, _super);
    function ConvolutionFilter2(matrix, width, height) {
      if (width === void 0) {
        width = 200;
      }
      if (height === void 0) {
        height = 200;
      }
      var _this = _super.call(this, vertex10, fragment10) || this;
      _this.uniforms.texelSize = new Float32Array(2);
      _this.uniforms.matrix = new Float32Array(9);
      if (matrix !== void 0) {
        _this.matrix = matrix;
      }
      _this.width = width;
      _this.height = height;
      return _this;
    }
    Object.defineProperty(ConvolutionFilter2.prototype, "matrix", {
      /**
       * An array of values used for matrix transformation. Specified as a 9 point Array.
       */
      get: function() {
        return this.uniforms.matrix;
      },
      set: function(matrix) {
        var _this = this;
        matrix.forEach(function(v, i) {
          _this.uniforms.matrix[i] = v;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ConvolutionFilter2.prototype, "width", {
      /**
       * Width of the object you are transforming
       */
      get: function() {
        return 1 / this.uniforms.texelSize[0];
      },
      set: function(value) {
        this.uniforms.texelSize[0] = 1 / value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ConvolutionFilter2.prototype, "height", {
      /**
       * Height of the object you are transforming
       */
      get: function() {
        return 1 / this.uniforms.texelSize[1];
      },
      set: function(value) {
        this.uniforms.texelSize[1] = 1 / value;
      },
      enumerable: false,
      configurable: true
    });
    return ConvolutionFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-cross-hatch@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5._nz6d5uaxpxbi47dattoootiimu/node_modules/@pixi/filter-cross-hatch/dist/filter-cross-hatch.esm.mjs
var extendStatics12 = function(d, b) {
  extendStatics12 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics12(d, b);
};
function __extends12(d, b) {
  extendStatics12(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex11 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment11 = "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n";
var CrossHatchFilter = (
  /** @class */
  function(_super) {
    __extends12(CrossHatchFilter2, _super);
    function CrossHatchFilter2() {
      return _super.call(this, vertex11, fragment11) || this;
    }
    return CrossHatchFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-crt@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+_xgdhvgi7bev6g77yxznmahrbhy/node_modules/@pixi/filter-crt/dist/filter-crt.esm.mjs
var extendStatics13 = function(d, b) {
  extendStatics13 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics13(d, b);
};
function __extends13(d, b) {
  extendStatics13(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex12 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment12 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 dir = vec2(vTextureCoord.xy * filterArea.xy / dimensions - vec2(0.5, 0.5));\n    \n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0)\n    {\n        float _c = curvature > 0. ? curvature : 1.;\n        float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n        vec2 uv = dir * k;\n\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n";
var CRTFilter = (
  /** @class */
  function(_super) {
    __extends13(CRTFilter2, _super);
    function CRTFilter2(options) {
      var _this = _super.call(this, vertex12, fragment12) || this;
      _this.time = 0;
      _this.seed = 0;
      _this.uniforms.dimensions = new Float32Array(2);
      Object.assign(_this, CRTFilter2.defaults, options);
      return _this;
    }
    CRTFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a = input.filterFrame, width = _a.width, height = _a.height;
      this.uniforms.dimensions[0] = width;
      this.uniforms.dimensions[1] = height;
      this.uniforms.seed = this.seed;
      this.uniforms.time = this.time;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(CRTFilter2.prototype, "curvature", {
      get: function() {
        return this.uniforms.curvature;
      },
      /**
       * Bent of interlaced lines, higher value means more bend
       * @default 1
       */
      set: function(value) {
        this.uniforms.curvature = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "lineWidth", {
      get: function() {
        return this.uniforms.lineWidth;
      },
      /**
       * Width of interlaced lines
       * @default 1
       */
      set: function(value) {
        this.uniforms.lineWidth = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "lineContrast", {
      get: function() {
        return this.uniforms.lineContrast;
      },
      /**
       * Contrast of interlaced lines
       * @default 0.25
       */
      set: function(value) {
        this.uniforms.lineContrast = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "verticalLine", {
      get: function() {
        return this.uniforms.verticalLine;
      },
      /**
       * `true` for vertical lines, `false` for horizontal lines
       * @default false
       */
      set: function(value) {
        this.uniforms.verticalLine = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "noise", {
      get: function() {
        return this.uniforms.noise;
      },
      /**
       * Opacity/intensity of the noise effect between `0` and `1`
       * @default 0
       */
      set: function(value) {
        this.uniforms.noise = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "noiseSize", {
      get: function() {
        return this.uniforms.noiseSize;
      },
      /**
       * The size of the noise particles
       * @default 0
       */
      set: function(value) {
        this.uniforms.noiseSize = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "vignetting", {
      get: function() {
        return this.uniforms.vignetting;
      },
      /**
       * The radius of the vignette effect, smaller
       * values produces a smaller vignette
       * @default 0
       */
      set: function(value) {
        this.uniforms.vignetting = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "vignettingAlpha", {
      get: function() {
        return this.uniforms.vignettingAlpha;
      },
      /**
       * Amount of opacity of vignette
       * @default 0
       */
      set: function(value) {
        this.uniforms.vignettingAlpha = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(CRTFilter2.prototype, "vignettingBlur", {
      get: function() {
        return this.uniforms.vignettingBlur;
      },
      /**
       * Blur intensity of the vignette
       * @default 0
       */
      set: function(value) {
        this.uniforms.vignettingBlur = value;
      },
      enumerable: false,
      configurable: true
    });
    CRTFilter2.defaults = {
      curvature: 1,
      lineWidth: 1,
      lineContrast: 0.25,
      verticalLine: false,
      noise: 0,
      noiseSize: 1,
      seed: 0,
      vignetting: 0.3,
      vignettingAlpha: 1,
      vignettingBlur: 0.3,
      time: 0
    };
    return CRTFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-dot@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_@pixi_72d5y5mlxa7uuk7ugjgiezg2i4/node_modules/@pixi/filter-dot/dist/filter-dot.esm.mjs
var extendStatics14 = function(d, b) {
  extendStatics14 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics14(d, b);
};
function __extends14(d, b) {
  extendStatics14(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex13 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment13 = "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n";
var DotFilter = (
  /** @class */
  function(_super) {
    __extends14(DotFilter2, _super);
    function DotFilter2(scale, angle) {
      if (scale === void 0) {
        scale = 1;
      }
      if (angle === void 0) {
        angle = 5;
      }
      var _this = _super.call(this, vertex13, fragment13) || this;
      _this.scale = scale;
      _this.angle = angle;
      return _this;
    }
    Object.defineProperty(DotFilter2.prototype, "scale", {
      /**
       * The scale of the effect.
       * @default 1
       */
      get: function() {
        return this.uniforms.scale;
      },
      set: function(value) {
        this.uniforms.scale = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DotFilter2.prototype, "angle", {
      /**
       * The radius of the effect.
       * @default 5
       */
      get: function() {
        return this.uniforms.angle;
      },
      set: function(value) {
        this.uniforms.angle = value;
      },
      enumerable: false,
      configurable: true
    });
    return DotFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-drop-shadow@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.1_rgdl2ycqfgnjvxchgq2x3vyd2u/node_modules/@pixi/filter-drop-shadow/dist/filter-drop-shadow.esm.mjs
var extendStatics15 = function(d, b) {
  extendStatics15 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics15(d, b);
};
function __extends15(d, b) {
  extendStatics15(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    var arguments$1 = arguments;
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments$1[i];
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) {
          t[p] = s[p];
        }
      }
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var vertex14 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment14 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}";
var DropShadowFilter = (
  /** @class */
  function(_super) {
    __extends15(DropShadowFilter2, _super);
    function DropShadowFilter2(options) {
      var _this = _super.call(this) || this;
      _this.angle = 45;
      _this._distance = 5;
      _this._resolution = settings.FILTER_RESOLUTION;
      var opt = options ? __assign(__assign({}, DropShadowFilter2.defaults), options) : DropShadowFilter2.defaults;
      var kernels = opt.kernels, blur = opt.blur, quality = opt.quality, pixelSize = opt.pixelSize, resolution = opt.resolution;
      _this._tintFilter = new Filter(vertex14, fragment14);
      _this._tintFilter.uniforms.color = new Float32Array(4);
      _this._tintFilter.uniforms.shift = new Point();
      _this._tintFilter.resolution = resolution;
      _this._blurFilter = kernels ? new KawaseBlurFilter(kernels) : new KawaseBlurFilter(blur, quality);
      _this.pixelSize = pixelSize;
      _this.resolution = resolution;
      var shadowOnly = opt.shadowOnly, rotation = opt.rotation, distance = opt.distance, alpha = opt.alpha, color = opt.color;
      _this.shadowOnly = shadowOnly;
      _this.rotation = rotation;
      _this.distance = distance;
      _this.alpha = alpha;
      _this.color = color;
      _this._updatePadding();
      return _this;
    }
    DropShadowFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var target = filterManager.getFilterTexture();
      this._tintFilter.apply(filterManager, input, target, 1);
      this._blurFilter.apply(filterManager, target, output, clear);
      if (this.shadowOnly !== true) {
        filterManager.applyFilter(this, input, output, 0);
      }
      filterManager.returnFilterTexture(target);
    };
    DropShadowFilter2.prototype._updatePadding = function() {
      this.padding = this.distance + this.blur * 2;
    };
    DropShadowFilter2.prototype._updateShift = function() {
      this._tintFilter.uniforms.shift.set(this.distance * Math.cos(this.angle), this.distance * Math.sin(this.angle));
    };
    Object.defineProperty(DropShadowFilter2.prototype, "resolution", {
      /**
       * The resolution of the filter.
       * @default PIXI.settings.FILTER_RESOLUTION
       */
      get: function() {
        return this._resolution;
      },
      set: function(value) {
        this._resolution = value;
        if (this._tintFilter) {
          this._tintFilter.resolution = value;
        }
        if (this._blurFilter) {
          this._blurFilter.resolution = value;
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "distance", {
      /**
       * Distance offset of the shadow
       * @default 5
       */
      get: function() {
        return this._distance;
      },
      set: function(value) {
        this._distance = value;
        this._updatePadding();
        this._updateShift();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "rotation", {
      /**
       * The angle of the shadow in degrees
       * @default 2
       */
      get: function() {
        return this.angle / DEG_TO_RAD;
      },
      set: function(value) {
        this.angle = value * DEG_TO_RAD;
        this._updateShift();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "alpha", {
      /**
       * The alpha of the shadow
       * @default 1
       */
      get: function() {
        return this._tintFilter.uniforms.alpha;
      },
      set: function(value) {
        this._tintFilter.uniforms.alpha = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "color", {
      /**
       * The color of the shadow.
       * @default 0x000000
       */
      get: function() {
        return rgb2hex(this._tintFilter.uniforms.color);
      },
      set: function(value) {
        hex2rgb(value, this._tintFilter.uniforms.color);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "kernels", {
      /**
       * Sets the kernels of the Blur Filter
       */
      get: function() {
        return this._blurFilter.kernels;
      },
      set: function(value) {
        this._blurFilter.kernels = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "blur", {
      /**
       * The blur of the shadow
       * @default 2
       */
      get: function() {
        return this._blurFilter.blur;
      },
      set: function(value) {
        this._blurFilter.blur = value;
        this._updatePadding();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "quality", {
      /**
       * Sets the quality of the Blur Filter
       * @default 4
       */
      get: function() {
        return this._blurFilter.quality;
      },
      set: function(value) {
        this._blurFilter.quality = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(DropShadowFilter2.prototype, "pixelSize", {
      /**
       * Sets the pixelSize of the Kawase Blur filter
       *
       * @member {number|number[]|PIXI.Point}
       * @default 1
       */
      get: function() {
        return this._blurFilter.pixelSize;
      },
      set: function(value) {
        this._blurFilter.pixelSize = value;
      },
      enumerable: false,
      configurable: true
    });
    DropShadowFilter2.defaults = {
      rotation: 45,
      distance: 5,
      color: 0,
      alpha: 0.5,
      shadowOnly: false,
      kernels: null,
      blur: 2,
      quality: 3,
      pixelSize: 1,
      resolution: settings.FILTER_RESOLUTION
    };
    return DropShadowFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-emboss@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_@p_byav2xdrfakxy7rvfqysghg2sa/node_modules/@pixi/filter-emboss/dist/filter-emboss.esm.mjs
var extendStatics16 = function(d, b) {
  extendStatics16 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics16(d, b);
};
function __extends16(d, b) {
  extendStatics16(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex15 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment15 = "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n	vec2 onePixel = vec2(1.0 / filterArea);\n\n	vec4 color;\n\n	color.rgb = vec3(0.5);\n\n	color -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n	color += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n	color.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n	float alpha = texture2D(uSampler, vTextureCoord).a;\n\n	gl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n";
var EmbossFilter = (
  /** @class */
  function(_super) {
    __extends16(EmbossFilter2, _super);
    function EmbossFilter2(strength) {
      if (strength === void 0) {
        strength = 5;
      }
      var _this = _super.call(this, vertex15, fragment15) || this;
      _this.strength = strength;
      return _this;
    }
    Object.defineProperty(EmbossFilter2.prototype, "strength", {
      /**
       * Strength of emboss.
       */
      get: function() {
        return this.uniforms.strength;
      },
      set: function(value) {
        this.uniforms.strength = value;
      },
      enumerable: false,
      configurable: true
    });
    return EmbossFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-glitch@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pi_ecqc7fz2bxhl3akiy7qwnxv4re/node_modules/@pixi/filter-glitch/dist/filter-glitch.esm.mjs
var extendStatics17 = function(d, b) {
  extendStatics17 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics17(d, b);
};
function __extends17(d, b) {
  extendStatics17(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex16 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment16 = "// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n";
var GlitchFilter = (
  /** @class */
  function(_super) {
    __extends17(GlitchFilter2, _super);
    function GlitchFilter2(options) {
      var _this = _super.call(this, vertex16, fragment16) || this;
      _this.offset = 100;
      _this.fillMode = GlitchFilter2.TRANSPARENT;
      _this.average = false;
      _this.seed = 0;
      _this.minSize = 8;
      _this.sampleSize = 512;
      _this._slices = 0;
      _this._offsets = new Float32Array(1);
      _this._sizes = new Float32Array(1);
      _this._direction = -1;
      _this.uniforms.dimensions = new Float32Array(2);
      _this._canvas = document.createElement("canvas");
      _this._canvas.width = 4;
      _this._canvas.height = _this.sampleSize;
      _this.texture = Texture.from(_this._canvas, { scaleMode: SCALE_MODES.NEAREST });
      Object.assign(_this, GlitchFilter2.defaults, options);
      return _this;
    }
    GlitchFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a = input.filterFrame, width = _a.width, height = _a.height;
      this.uniforms.dimensions[0] = width;
      this.uniforms.dimensions[1] = height;
      this.uniforms.aspect = height / width;
      this.uniforms.seed = this.seed;
      this.uniforms.offset = this.offset;
      this.uniforms.fillMode = this.fillMode;
      filterManager.applyFilter(this, input, output, clear);
    };
    GlitchFilter2.prototype._randomizeSizes = function() {
      var arr = this._sizes;
      var last = this._slices - 1;
      var size = this.sampleSize;
      var min = Math.min(this.minSize / size, 0.9 / this._slices);
      if (this.average) {
        var count = this._slices;
        var rest = 1;
        for (var i = 0; i < last; i++) {
          var averageWidth = rest / (count - i);
          var w = Math.max(averageWidth * (1 - Math.random() * 0.6), min);
          arr[i] = w;
          rest -= w;
        }
        arr[last] = rest;
      } else {
        var rest = 1;
        var ratio = Math.sqrt(1 / this._slices);
        for (var i = 0; i < last; i++) {
          var w = Math.max(ratio * rest * Math.random(), min);
          arr[i] = w;
          rest -= w;
        }
        arr[last] = rest;
      }
      this.shuffle();
    };
    GlitchFilter2.prototype.shuffle = function() {
      var arr = this._sizes;
      var last = this._slices - 1;
      for (var i = last; i > 0; i--) {
        var rand = Math.random() * i >> 0;
        var temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }
    };
    GlitchFilter2.prototype._randomizeOffsets = function() {
      for (var i = 0; i < this._slices; i++) {
        this._offsets[i] = Math.random() * (Math.random() < 0.5 ? -1 : 1);
      }
    };
    GlitchFilter2.prototype.refresh = function() {
      this._randomizeSizes();
      this._randomizeOffsets();
      this.redraw();
    };
    GlitchFilter2.prototype.redraw = function() {
      var size = this.sampleSize;
      var texture = this.texture;
      var ctx = this._canvas.getContext("2d");
      ctx.clearRect(0, 0, 8, size);
      var offset;
      var y = 0;
      for (var i = 0; i < this._slices; i++) {
        offset = Math.floor(this._offsets[i] * 256);
        var height = this._sizes[i] * size;
        var red = offset > 0 ? offset : 0;
        var green = offset < 0 ? -offset : 0;
        ctx.fillStyle = "rgba(" + red + ", " + green + ", 0, 1)";
        ctx.fillRect(0, y >> 0, size, height + 1 >> 0);
        y += height;
      }
      texture.baseTexture.update();
      this.uniforms.displacementMap = texture;
    };
    Object.defineProperty(GlitchFilter2.prototype, "sizes", {
      get: function() {
        return this._sizes;
      },
      /**
       * Manually custom slices size (height) of displacement bitmap
       *
       * @member {number[]|Float32Array}
       */
      set: function(sizes) {
        var len = Math.min(this._slices, sizes.length);
        for (var i = 0; i < len; i++) {
          this._sizes[i] = sizes[i];
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlitchFilter2.prototype, "offsets", {
      get: function() {
        return this._offsets;
      },
      /**
       * Manually set custom slices offset of displacement bitmap, this is
       * a collection of values from -1 to 1. To change the max offset value
       * set `offset`.
       *
       * @member {number[]|Float32Array}
       */
      set: function(offsets) {
        var len = Math.min(this._slices, offsets.length);
        for (var i = 0; i < len; i++) {
          this._offsets[i] = offsets[i];
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlitchFilter2.prototype, "slices", {
      /**
       * The count of slices.
       * @default 5
       */
      get: function() {
        return this._slices;
      },
      set: function(value) {
        if (this._slices === value) {
          return;
        }
        this._slices = value;
        this.uniforms.slices = value;
        this._sizes = this.uniforms.slicesWidth = new Float32Array(value);
        this._offsets = this.uniforms.slicesOffset = new Float32Array(value);
        this.refresh();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlitchFilter2.prototype, "direction", {
      /**
       * The angle in degree of the offset of slices.
       * @default 0
       */
      get: function() {
        return this._direction;
      },
      set: function(value) {
        if (this._direction === value) {
          return;
        }
        this._direction = value;
        var radians = value * DEG_TO_RAD;
        this.uniforms.sinDir = Math.sin(radians);
        this.uniforms.cosDir = Math.cos(radians);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlitchFilter2.prototype, "red", {
      /**
       * Red channel offset.
       *
       * @member {PIXI.Point|number[]}
       */
      get: function() {
        return this.uniforms.red;
      },
      set: function(value) {
        this.uniforms.red = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlitchFilter2.prototype, "green", {
      /**
       * Green channel offset.
       *
       * @member {PIXI.Point|number[]}
       */
      get: function() {
        return this.uniforms.green;
      },
      set: function(value) {
        this.uniforms.green = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlitchFilter2.prototype, "blue", {
      /**
       * Blue offset.
       *
       * @member {PIXI.Point|number[]}
       */
      get: function() {
        return this.uniforms.blue;
      },
      set: function(value) {
        this.uniforms.blue = value;
      },
      enumerable: false,
      configurable: true
    });
    GlitchFilter2.prototype.destroy = function() {
      var _a;
      (_a = this.texture) === null || _a === void 0 ? void 0 : _a.destroy(true);
      this.texture = this._canvas = this.red = this.green = this.blue = this._sizes = this._offsets = null;
    };
    GlitchFilter2.defaults = {
      slices: 5,
      offset: 100,
      direction: 0,
      fillMode: 0,
      average: false,
      seed: 0,
      red: [0, 0],
      green: [0, 0],
      blue: [0, 0],
      minSize: 8,
      sampleSize: 512
    };
    GlitchFilter2.TRANSPARENT = 0;
    GlitchFilter2.ORIGINAL = 1;
    GlitchFilter2.LOOP = 2;
    GlitchFilter2.CLAMP = 3;
    GlitchFilter2.MIRROR = 4;
    return GlitchFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-glow@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_@pix_fsldchwcuov7scfu7qd27qxcai/node_modules/@pixi/filter-glow/dist/filter-glow.esm.mjs
var extendStatics18 = function(d, b) {
  extendStatics18 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics18(d, b);
};
function __extends18(d, b) {
  extendStatics18(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex17 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment17 = "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n    \n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n";
var GlowFilter = (
  /** @class */
  function(_super) {
    __extends18(GlowFilter2, _super);
    function GlowFilter2(options) {
      var _this = this;
      var opts = Object.assign({}, GlowFilter2.defaults, options);
      var outerStrength = opts.outerStrength, innerStrength = opts.innerStrength, color = opts.color, knockout = opts.knockout, quality = opts.quality;
      var distance = Math.round(opts.distance);
      _this = _super.call(this, vertex17, fragment17.replace(/__ANGLE_STEP_SIZE__/gi, "" + (1 / quality / distance).toFixed(7)).replace(/__DIST__/gi, distance.toFixed(0) + ".0")) || this;
      _this.uniforms.glowColor = new Float32Array([0, 0, 0, 1]);
      Object.assign(_this, {
        color,
        outerStrength,
        innerStrength,
        padding: distance,
        knockout
      });
      return _this;
    }
    Object.defineProperty(GlowFilter2.prototype, "color", {
      /**
       * The color of the glow.
       * @default 0xFFFFFF
       */
      get: function() {
        return rgb2hex(this.uniforms.glowColor);
      },
      set: function(value) {
        hex2rgb(value, this.uniforms.glowColor);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlowFilter2.prototype, "outerStrength", {
      /**
       * The strength of the glow outward from the edge of the sprite.
       * @default 4
       */
      get: function() {
        return this.uniforms.outerStrength;
      },
      set: function(value) {
        this.uniforms.outerStrength = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlowFilter2.prototype, "innerStrength", {
      /**
       * The strength of the glow inward from the edge of the sprite.
       * @default 0
       */
      get: function() {
        return this.uniforms.innerStrength;
      },
      set: function(value) {
        this.uniforms.innerStrength = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GlowFilter2.prototype, "knockout", {
      /**
       * Only draw the glow, not the texture itself
       * @default false
       */
      get: function() {
        return this.uniforms.knockout;
      },
      set: function(value) {
        this.uniforms.knockout = value;
      },
      enumerable: false,
      configurable: true
    });
    GlowFilter2.defaults = {
      distance: 10,
      outerStrength: 4,
      innerStrength: 0,
      color: 16777215,
      quality: 0.1,
      knockout: false
    };
    return GlowFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-godray@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pi_hnm7s5ixgb5g5o3ij2aqxvcrhm/node_modules/@pixi/filter-godray/dist/filter-godray.esm.mjs
var extendStatics19 = function(d, b) {
  extendStatics19 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics19(d, b);
};
function __extends19(d, b) {
  extendStatics19(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex18 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var perlin = "vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n";
var fragment18 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float alpha;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n    // apply user alpha\n    mist *= alpha;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n\n}\n";
var GodrayFilter = (
  /** @class */
  function(_super) {
    __extends19(GodrayFilter2, _super);
    function GodrayFilter2(options) {
      var _this = _super.call(this, vertex18, fragment18.replace("${perlin}", perlin)) || this;
      _this.parallel = true;
      _this.time = 0;
      _this._angle = 0;
      _this.uniforms.dimensions = new Float32Array(2);
      var opts = Object.assign(GodrayFilter2.defaults, options);
      _this._angleLight = new Point();
      _this.angle = opts.angle;
      _this.gain = opts.gain;
      _this.lacunarity = opts.lacunarity;
      _this.alpha = opts.alpha;
      _this.parallel = opts.parallel;
      _this.center = opts.center;
      _this.time = opts.time;
      return _this;
    }
    GodrayFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a = input.filterFrame, width = _a.width, height = _a.height;
      this.uniforms.light = this.parallel ? this._angleLight : this.center;
      this.uniforms.parallel = this.parallel;
      this.uniforms.dimensions[0] = width;
      this.uniforms.dimensions[1] = height;
      this.uniforms.aspect = height / width;
      this.uniforms.time = this.time;
      this.uniforms.alpha = this.alpha;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(GodrayFilter2.prototype, "angle", {
      /**
       * The angle/light-source of the rays in degrees. For instance, a value of 0 is vertical rays,
       *     values of 90 or -90 produce horizontal rays.
       * @default 30
       */
      get: function() {
        return this._angle;
      },
      set: function(value) {
        this._angle = value;
        var radians = value * DEG_TO_RAD;
        this._angleLight.x = Math.cos(radians);
        this._angleLight.y = Math.sin(radians);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GodrayFilter2.prototype, "gain", {
      /**
       * General intensity of the effect. A value closer to 1 will produce a more intense effect,
       * where a value closer to 0 will produce a subtler effect.
       * @default 0.5
       */
      get: function() {
        return this.uniforms.gain;
      },
      set: function(value) {
        this.uniforms.gain = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GodrayFilter2.prototype, "lacunarity", {
      /**
       * The density of the fractal noise. A higher amount produces more rays and a smaller amound
       * produces fewer waves.
       * @default 2.5
       */
      get: function() {
        return this.uniforms.lacunarity;
      },
      set: function(value) {
        this.uniforms.lacunarity = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(GodrayFilter2.prototype, "alpha", {
      /**
       * The alpha (opacity) of the rays.  0 is fully transparent, 1 is fully opaque.
       * @default 1
       */
      get: function() {
        return this.uniforms.alpha;
      },
      set: function(value) {
        this.uniforms.alpha = value;
      },
      enumerable: false,
      configurable: true
    });
    GodrayFilter2.defaults = {
      angle: 30,
      gain: 0.5,
      lacunarity: 2.5,
      time: 0,
      parallel: true,
      center: [0, 0],
      alpha: 1
    };
    return GodrayFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-motion-blur@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.1_w5a3jpkuaws3l5imxo2rj2yjdq/node_modules/@pixi/filter-motion-blur/dist/filter-motion-blur.esm.mjs
var extendStatics20 = function(d, b) {
  extendStatics20 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics20(d, b);
};
function __extends20(d, b) {
  extendStatics20(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex19 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment19 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n";
var MotionBlurFilter = (
  /** @class */
  function(_super) {
    __extends20(MotionBlurFilter2, _super);
    function MotionBlurFilter2(velocity, kernelSize, offset) {
      if (velocity === void 0) {
        velocity = [0, 0];
      }
      if (kernelSize === void 0) {
        kernelSize = 5;
      }
      if (offset === void 0) {
        offset = 0;
      }
      var _this = _super.call(this, vertex19, fragment19) || this;
      _this.kernelSize = 5;
      _this.uniforms.uVelocity = new Float32Array(2);
      _this._velocity = new ObservablePoint(_this.velocityChanged, _this);
      _this.setVelocity(velocity);
      _this.kernelSize = kernelSize;
      _this.offset = offset;
      return _this;
    }
    MotionBlurFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a = this.velocity, x = _a.x, y = _a.y;
      this.uniforms.uKernelSize = x !== 0 || y !== 0 ? this.kernelSize : 0;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(MotionBlurFilter2.prototype, "velocity", {
      get: function() {
        return this._velocity;
      },
      /**
       * Sets the velocity of the motion for blur effect.
       *
       * @member {PIXI.ObservablePoint|PIXI.Point|number[]}
       */
      set: function(value) {
        this.setVelocity(value);
      },
      enumerable: false,
      configurable: true
    });
    MotionBlurFilter2.prototype.setVelocity = function(value) {
      if (Array.isArray(value)) {
        var x = value[0], y = value[1];
        this._velocity.set(x, y);
      } else {
        this._velocity.copyFrom(value);
      }
    };
    MotionBlurFilter2.prototype.velocityChanged = function() {
      this.uniforms.uVelocity[0] = this._velocity.x;
      this.uniforms.uVelocity[1] = this._velocity.y;
      this.padding = (Math.max(Math.abs(this._velocity.x), Math.abs(this._velocity.y)) >> 0) + 1;
    };
    Object.defineProperty(MotionBlurFilter2.prototype, "offset", {
      get: function() {
        return this.uniforms.uOffset;
      },
      /**
       * The offset of the blur filter.
       * @default 0
       */
      set: function(value) {
        this.uniforms.uOffset = value;
      },
      enumerable: false,
      configurable: true
    });
    return MotionBlurFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-multi-color-replace@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensi_6ckyg4mbjrkk26fk3dghmd353u/node_modules/@pixi/filter-multi-color-replace/dist/filter-multi-color-replace.esm.mjs
var extendStatics21 = function(d, b) {
  extendStatics21 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics21(d, b);
};
function __extends21(d, b) {
  extendStatics21(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex20 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment20 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n";
var MultiColorReplaceFilter = (
  /** @class */
  function(_super) {
    __extends21(MultiColorReplaceFilter2, _super);
    function MultiColorReplaceFilter2(replacements, epsilon, maxColors) {
      if (epsilon === void 0) {
        epsilon = 0.05;
      }
      if (maxColors === void 0) {
        maxColors = replacements.length;
      }
      var _this = _super.call(this, vertex20, fragment20.replace(/%maxColors%/g, maxColors.toFixed(0))) || this;
      _this._replacements = [];
      _this._maxColors = 0;
      _this.epsilon = epsilon;
      _this._maxColors = maxColors;
      _this.uniforms.originalColors = new Float32Array(maxColors * 3);
      _this.uniforms.targetColors = new Float32Array(maxColors * 3);
      _this.replacements = replacements;
      return _this;
    }
    Object.defineProperty(MultiColorReplaceFilter2.prototype, "replacements", {
      get: function() {
        return this._replacements;
      },
      /**
       * The source and target colors for replacement. See constructor for information on the format.
       *
       * @member {Array<Array>}
       */
      set: function(replacements) {
        var originals = this.uniforms.originalColors;
        var targets = this.uniforms.targetColors;
        var colorCount = replacements.length;
        if (colorCount > this._maxColors) {
          throw new Error("Length of replacements (" + colorCount + ") exceeds the maximum colors length (" + this._maxColors + ")");
        }
        originals[colorCount * 3] = -1;
        for (var i = 0; i < colorCount; i++) {
          var pair = replacements[i];
          var color = pair[0];
          if (typeof color === "number") {
            color = hex2rgb(color);
          } else {
            pair[0] = rgb2hex(color);
          }
          originals[i * 3] = color[0];
          originals[i * 3 + 1] = color[1];
          originals[i * 3 + 2] = color[2];
          var targetColor = pair[1];
          if (typeof targetColor === "number") {
            targetColor = hex2rgb(targetColor);
          } else {
            pair[1] = rgb2hex(targetColor);
          }
          targets[i * 3] = targetColor[0];
          targets[i * 3 + 1] = targetColor[1];
          targets[i * 3 + 2] = targetColor[2];
        }
        this._replacements = replacements;
      },
      enumerable: false,
      configurable: true
    });
    MultiColorReplaceFilter2.prototype.refresh = function() {
      this.replacements = this._replacements;
    };
    Object.defineProperty(MultiColorReplaceFilter2.prototype, "maxColors", {
      /**
       * The maximum number of color replacements supported by this filter. Can be changed
       * _only_ during construction.
       * @readonly
       */
      get: function() {
        return this._maxColors;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MultiColorReplaceFilter2.prototype, "epsilon", {
      get: function() {
        return this.uniforms.epsilon;
      },
      /**
       * Tolerance of the floating-point comparison between colors (lower = more exact, higher = more inclusive)
       * @default 0.05
       */
      set: function(value) {
        this.uniforms.epsilon = value;
      },
      enumerable: false,
      configurable: true
    });
    return MultiColorReplaceFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-old-film@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_@_mowjpekb5cihnxgfvdc2uy7czi/node_modules/@pixi/filter-old-film/dist/filter-old-film.esm.mjs
var extendStatics22 = function(d, b) {
  extendStatics22 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics22(d, b);
};
function __extends22(d, b) {
  extendStatics22(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex21 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment21 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n";
var OldFilmFilter = (
  /** @class */
  function(_super) {
    __extends22(OldFilmFilter2, _super);
    function OldFilmFilter2(options, seed) {
      if (seed === void 0) {
        seed = 0;
      }
      var _this = _super.call(this, vertex21, fragment21) || this;
      _this.seed = 0;
      _this.uniforms.dimensions = new Float32Array(2);
      if (typeof options === "number") {
        _this.seed = options;
        options = void 0;
      } else {
        _this.seed = seed;
      }
      Object.assign(_this, OldFilmFilter2.defaults, options);
      return _this;
    }
    OldFilmFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a, _b;
      this.uniforms.dimensions[0] = (_a = input.filterFrame) === null || _a === void 0 ? void 0 : _a.width;
      this.uniforms.dimensions[1] = (_b = input.filterFrame) === null || _b === void 0 ? void 0 : _b.height;
      this.uniforms.seed = this.seed;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(OldFilmFilter2.prototype, "sepia", {
      get: function() {
        return this.uniforms.sepia;
      },
      /**
       * The amount of saturation of sepia effect,
       * a value of `1` is more saturation and closer to `0` is less,
       * and a value of `0` produces no sepia effect
       * @default 0
       */
      set: function(value) {
        this.uniforms.sepia = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "noise", {
      get: function() {
        return this.uniforms.noise;
      },
      /**
       * Opacity/intensity of the noise effect between `0` and `1`
       * @default 0
       */
      set: function(value) {
        this.uniforms.noise = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "noiseSize", {
      get: function() {
        return this.uniforms.noiseSize;
      },
      /**
       * The size of the noise particles
       * @default 0
       */
      set: function(value) {
        this.uniforms.noiseSize = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "scratch", {
      get: function() {
        return this.uniforms.scratch;
      },
      /**
       * How often scratches appear
       * @default 0
       */
      set: function(value) {
        this.uniforms.scratch = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "scratchDensity", {
      get: function() {
        return this.uniforms.scratchDensity;
      },
      /**
       * The density of the number of scratches
       * @default 0
       */
      set: function(value) {
        this.uniforms.scratchDensity = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "scratchWidth", {
      get: function() {
        return this.uniforms.scratchWidth;
      },
      /**
       * The width of the scratches
       * @default 0
       */
      set: function(value) {
        this.uniforms.scratchWidth = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "vignetting", {
      get: function() {
        return this.uniforms.vignetting;
      },
      /**
       * The radius of the vignette effect, smaller
       * values produces a smaller vignette
       * @default 0
       */
      set: function(value) {
        this.uniforms.vignetting = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "vignettingAlpha", {
      get: function() {
        return this.uniforms.vignettingAlpha;
      },
      /**
       * Amount of opacity of vignette
       * @default 0
       */
      set: function(value) {
        this.uniforms.vignettingAlpha = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OldFilmFilter2.prototype, "vignettingBlur", {
      get: function() {
        return this.uniforms.vignettingBlur;
      },
      /**
       * Blur intensity of the vignette
       * @default 0
       */
      set: function(value) {
        this.uniforms.vignettingBlur = value;
      },
      enumerable: false,
      configurable: true
    });
    OldFilmFilter2.defaults = {
      sepia: 0.3,
      noise: 0.3,
      noiseSize: 1,
      scratch: 0.5,
      scratchDensity: 0.3,
      scratchWidth: 1,
      vignetting: 0.3,
      vignettingAlpha: 1,
      vignettingBlur: 0.3
    };
    return OldFilmFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-outline@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_@p_wlebzynrv7dvnjdkmuv3mfe54q/node_modules/@pixi/filter-outline/dist/filter-outline.esm.mjs
var extendStatics23 = function(d, b) {
  extendStatics23 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics23(d, b);
};
function __extends23(d, b) {
  extendStatics23(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex22 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment22 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n";
var OutlineFilter = (
  /** @class */
  function(_super) {
    __extends23(OutlineFilter2, _super);
    function OutlineFilter2(thickness, color, quality) {
      if (thickness === void 0) {
        thickness = 1;
      }
      if (color === void 0) {
        color = 0;
      }
      if (quality === void 0) {
        quality = 0.1;
      }
      var _this = _super.call(this, vertex22, fragment22.replace(/\$\{angleStep\}/, OutlineFilter2.getAngleStep(quality))) || this;
      _this._thickness = 1;
      _this.uniforms.thickness = new Float32Array([0, 0]);
      _this.uniforms.outlineColor = new Float32Array([0, 0, 0, 1]);
      Object.assign(_this, { thickness, color, quality });
      return _this;
    }
    OutlineFilter2.getAngleStep = function(quality) {
      var samples = Math.max(quality * OutlineFilter2.MAX_SAMPLES, OutlineFilter2.MIN_SAMPLES);
      return (Math.PI * 2 / samples).toFixed(7);
    };
    OutlineFilter2.prototype.apply = function(filterManager, input, output, clear) {
      this.uniforms.thickness[0] = this._thickness / input._frame.width;
      this.uniforms.thickness[1] = this._thickness / input._frame.height;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(OutlineFilter2.prototype, "color", {
      /**
       * The color of the glow.
       * @default 0x000000
       */
      get: function() {
        return rgb2hex(this.uniforms.outlineColor);
      },
      set: function(value) {
        hex2rgb(value, this.uniforms.outlineColor);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(OutlineFilter2.prototype, "thickness", {
      /**
       * The thickness of the outline.
       * @default 1
       */
      get: function() {
        return this._thickness;
      },
      set: function(value) {
        this._thickness = value;
        this.padding = value;
      },
      enumerable: false,
      configurable: true
    });
    OutlineFilter2.MIN_SAMPLES = 1;
    OutlineFilter2.MAX_SAMPLES = 100;
    return OutlineFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-pixelate@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10__pxc54tlk3rjtoicisdn6wkb2su/node_modules/@pixi/filter-pixelate/dist/filter-pixelate.esm.mjs
var extendStatics24 = function(d, b) {
  extendStatics24 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics24(d, b);
};
function __extends24(d, b) {
  extendStatics24(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex23 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment23 = "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n	return floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n";
var PixelateFilter = (
  /** @class */
  function(_super) {
    __extends24(PixelateFilter2, _super);
    function PixelateFilter2(size) {
      if (size === void 0) {
        size = 10;
      }
      var _this = _super.call(this, vertex23, fragment23) || this;
      _this.size = size;
      return _this;
    }
    Object.defineProperty(PixelateFilter2.prototype, "size", {
      /**
       * This a point that describes the size of the blocks.
       * x is the width of the block and y is the height.
       *
       * @member {PIXI.Point|Array<number>|number}
       * @default 10
       */
      get: function() {
        return this.uniforms.size;
      },
      set: function(value) {
        if (typeof value === "number") {
          value = [value, value];
        }
        this.uniforms.size = value;
      },
      enumerable: false,
      configurable: true
    });
    return PixelateFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-radial-blur@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5._fdzvpv3gzrtjuss5yf54yz3bwy/node_modules/@pixi/filter-radial-blur/dist/filter-radial-blur.esm.mjs
var extendStatics25 = function(d, b) {
  extendStatics25 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics25(d, b);
};
function __extends25(d, b) {
  extendStatics25(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex24 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment24 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n";
var RadialBlurFilter = (
  /** @class */
  function(_super) {
    __extends25(RadialBlurFilter2, _super);
    function RadialBlurFilter2(angle, center, kernelSize, radius) {
      if (angle === void 0) {
        angle = 0;
      }
      if (center === void 0) {
        center = [0, 0];
      }
      if (kernelSize === void 0) {
        kernelSize = 5;
      }
      if (radius === void 0) {
        radius = -1;
      }
      var _this = _super.call(this, vertex24, fragment24) || this;
      _this._angle = 0;
      _this.angle = angle;
      _this.center = center;
      _this.kernelSize = kernelSize;
      _this.radius = radius;
      return _this;
    }
    RadialBlurFilter2.prototype.apply = function(filterManager, input, output, clear) {
      this.uniforms.uKernelSize = this._angle !== 0 ? this.kernelSize : 0;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(RadialBlurFilter2.prototype, "angle", {
      get: function() {
        return this._angle;
      },
      /**
       * Sets the angle in degrees of the motion for blur effect.
       * @default 0
       */
      set: function(value) {
        this._angle = value;
        this.uniforms.uRadian = value * Math.PI / 180;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(RadialBlurFilter2.prototype, "center", {
      /**
       * Center of the effect.
       *
       * @member {PIXI.Point|number[]}
       * @default [0, 0]
       */
      get: function() {
        return this.uniforms.uCenter;
      },
      set: function(value) {
        this.uniforms.uCenter = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(RadialBlurFilter2.prototype, "radius", {
      /**
       * Outer radius of the effect. The default value of `-1` is infinite.
       * @default -1
       */
      get: function() {
        return this.uniforms.uRadius;
      },
      set: function(value) {
        if (value < 0 || value === Infinity) {
          value = -1;
        }
        this.uniforms.uRadius = value;
      },
      enumerable: false,
      configurable: true
    });
    return RadialBlurFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-reflection@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_vi7y2pynryrxs7dd2j6lmyxv2q/node_modules/@pixi/filter-reflection/dist/filter-reflection.esm.mjs
var extendStatics26 = function(d, b) {
  extendStatics26 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics26(d, b);
};
function __extends26(d, b) {
  extendStatics26(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex25 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment25 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n";
var ReflectionFilter = (
  /** @class */
  function(_super) {
    __extends26(ReflectionFilter2, _super);
    function ReflectionFilter2(options) {
      var _this = _super.call(this, vertex25, fragment25) || this;
      _this.time = 0;
      _this.uniforms.amplitude = new Float32Array(2);
      _this.uniforms.waveLength = new Float32Array(2);
      _this.uniforms.alpha = new Float32Array(2);
      _this.uniforms.dimensions = new Float32Array(2);
      Object.assign(_this, ReflectionFilter2.defaults, options);
      return _this;
    }
    ReflectionFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a, _b;
      this.uniforms.dimensions[0] = (_a = input.filterFrame) === null || _a === void 0 ? void 0 : _a.width;
      this.uniforms.dimensions[1] = (_b = input.filterFrame) === null || _b === void 0 ? void 0 : _b.height;
      this.uniforms.time = this.time;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(ReflectionFilter2.prototype, "mirror", {
      get: function() {
        return this.uniforms.mirror;
      },
      /**
       * `true` to reflect the image, `false` for waves-only
       * @default true
       */
      set: function(value) {
        this.uniforms.mirror = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ReflectionFilter2.prototype, "boundary", {
      get: function() {
        return this.uniforms.boundary;
      },
      /**
       * Vertical position of the reflection point, default is 50% (middle)
       * smaller numbers produce a larger reflection, larger numbers produce a smaller reflection.
       * @default 0.5
       */
      set: function(value) {
        this.uniforms.boundary = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ReflectionFilter2.prototype, "amplitude", {
      get: function() {
        return this.uniforms.amplitude;
      },
      /**
       * Starting and ending amplitude of waves
       * @member {number[]}
       * @default [0, 20]
       */
      set: function(value) {
        this.uniforms.amplitude[0] = value[0];
        this.uniforms.amplitude[1] = value[1];
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ReflectionFilter2.prototype, "waveLength", {
      get: function() {
        return this.uniforms.waveLength;
      },
      /**
       * Starting and ending length of waves
       * @member {number[]}
       * @default [30, 100]
       */
      set: function(value) {
        this.uniforms.waveLength[0] = value[0];
        this.uniforms.waveLength[1] = value[1];
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ReflectionFilter2.prototype, "alpha", {
      get: function() {
        return this.uniforms.alpha;
      },
      /**
       * Starting and ending alpha values
       * @member {number[]}
       * @default [1, 1]
       */
      set: function(value) {
        this.uniforms.alpha[0] = value[0];
        this.uniforms.alpha[1] = value[1];
      },
      enumerable: false,
      configurable: true
    });
    ReflectionFilter2.defaults = {
      mirror: true,
      boundary: 0.5,
      amplitude: [0, 20],
      waveLength: [30, 100],
      alpha: [1, 1],
      time: 0
    };
    return ReflectionFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-rgb-split@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_r6sj3f7ejocqa3bpdka4xitlje/node_modules/@pixi/filter-rgb-split/dist/filter-rgb-split.esm.mjs
var extendStatics27 = function(d, b) {
  extendStatics27 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics27(d, b);
};
function __extends27(d, b) {
  extendStatics27(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex26 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment26 = "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n";
var RGBSplitFilter = (
  /** @class */
  function(_super) {
    __extends27(RGBSplitFilter2, _super);
    function RGBSplitFilter2(red, green, blue) {
      if (red === void 0) {
        red = [-10, 0];
      }
      if (green === void 0) {
        green = [0, 10];
      }
      if (blue === void 0) {
        blue = [0, 0];
      }
      var _this = _super.call(this, vertex26, fragment26) || this;
      _this.red = red;
      _this.green = green;
      _this.blue = blue;
      return _this;
    }
    Object.defineProperty(RGBSplitFilter2.prototype, "red", {
      /**
       * Red channel offset.
       *
       * @member {PIXI.Point | number[]}
       */
      get: function() {
        return this.uniforms.red;
      },
      set: function(value) {
        this.uniforms.red = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(RGBSplitFilter2.prototype, "green", {
      /**
       * Green channel offset.
       *
       * @member {PIXI.Point | number[]}
       */
      get: function() {
        return this.uniforms.green;
      },
      set: function(value) {
        this.uniforms.green = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(RGBSplitFilter2.prototype, "blue", {
      /**
       * Blue offset.
       *
       * @member {PIXI.Point | number[]}
       */
      get: function() {
        return this.uniforms.blue;
      },
      set: function(value) {
        this.uniforms.blue = value;
      },
      enumerable: false,
      configurable: true
    });
    return RGBSplitFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-shockwave@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10__34o4f2if7vc46nckhoh65ucus4/node_modules/@pixi/filter-shockwave/dist/filter-shockwave.esm.mjs
var extendStatics28 = function(d, b) {
  extendStatics28 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics28(d, b);
};
function __extends28(d, b) {
  extendStatics28(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex27 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment27 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n";
var ShockwaveFilter = (
  /** @class */
  function(_super) {
    __extends28(ShockwaveFilter2, _super);
    function ShockwaveFilter2(center, options, time) {
      if (center === void 0) {
        center = [0, 0];
      }
      if (time === void 0) {
        time = 0;
      }
      var _this = _super.call(this, vertex27, fragment27) || this;
      _this.center = center;
      Object.assign(_this, ShockwaveFilter2.defaults, options);
      _this.time = time;
      return _this;
    }
    ShockwaveFilter2.prototype.apply = function(filterManager, input, output, clear) {
      this.uniforms.time = this.time;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(ShockwaveFilter2.prototype, "center", {
      /**
       * Sets the center of the shockwave in normalized screen coords. That is
       * (0,0) is the top-left and (1,1) is the bottom right.
       *
       * @member {PIXI.Point|number[]}
       */
      get: function() {
        return this.uniforms.center;
      },
      set: function(value) {
        this.uniforms.center = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ShockwaveFilter2.prototype, "amplitude", {
      /**
       * The amplitude of the shockwave.
       */
      get: function() {
        return this.uniforms.amplitude;
      },
      set: function(value) {
        this.uniforms.amplitude = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ShockwaveFilter2.prototype, "wavelength", {
      /**
       * The wavelength of the shockwave.
       */
      get: function() {
        return this.uniforms.wavelength;
      },
      set: function(value) {
        this.uniforms.wavelength = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ShockwaveFilter2.prototype, "brightness", {
      /**
       * The brightness of the shockwave.
       */
      get: function() {
        return this.uniforms.brightness;
      },
      set: function(value) {
        this.uniforms.brightness = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ShockwaveFilter2.prototype, "speed", {
      /**
       * The speed about the shockwave ripples out.
       * The unit is `pixel/second`
       */
      get: function() {
        return this.uniforms.speed;
      },
      set: function(value) {
        this.uniforms.speed = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ShockwaveFilter2.prototype, "radius", {
      /**
       * The maximum radius of shockwave.
       * `< 0.0` means it's infinity.
       */
      get: function() {
        return this.uniforms.radius;
      },
      set: function(value) {
        this.uniforms.radius = value;
      },
      enumerable: false,
      configurable: true
    });
    ShockwaveFilter2.defaults = {
      amplitude: 30,
      wavelength: 160,
      brightness: 1,
      speed: 500,
      radius: -1
    };
    return ShockwaveFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-simple-lightmap@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6_7ch7jdvf2ebrtdyl3vbzxuprxe/node_modules/@pixi/filter-simple-lightmap/dist/filter-simple-lightmap.esm.mjs
var extendStatics29 = function(d, b) {
  extendStatics29 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics29(d, b);
};
function __extends29(d, b) {
  extendStatics29(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex28 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment28 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n";
var SimpleLightmapFilter = (
  /** @class */
  function(_super) {
    __extends29(SimpleLightmapFilter2, _super);
    function SimpleLightmapFilter2(texture, color, alpha) {
      if (color === void 0) {
        color = 0;
      }
      if (alpha === void 0) {
        alpha = 1;
      }
      var _this = _super.call(this, vertex28, fragment28) || this;
      _this._color = 0;
      _this.uniforms.dimensions = new Float32Array(2);
      _this.uniforms.ambientColor = new Float32Array([0, 0, 0, alpha]);
      _this.texture = texture;
      _this.color = color;
      return _this;
    }
    SimpleLightmapFilter2.prototype.apply = function(filterManager, input, output, clear) {
      var _a, _b;
      this.uniforms.dimensions[0] = (_a = input.filterFrame) === null || _a === void 0 ? void 0 : _a.width;
      this.uniforms.dimensions[1] = (_b = input.filterFrame) === null || _b === void 0 ? void 0 : _b.height;
      filterManager.applyFilter(this, input, output, clear);
    };
    Object.defineProperty(SimpleLightmapFilter2.prototype, "texture", {
      /**
       * a texture where your lightmap is rendered
       * @member {PIXI.Texture}
       */
      get: function() {
        return this.uniforms.uLightmap;
      },
      set: function(value) {
        this.uniforms.uLightmap = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SimpleLightmapFilter2.prototype, "color", {
      get: function() {
        return this._color;
      },
      /**
       * An RGBA array of the ambient color or a hex color without alpha
       * @member {Array<number>|number}
       */
      set: function(value) {
        var arr = this.uniforms.ambientColor;
        if (typeof value === "number") {
          hex2rgb(value, arr);
          this._color = value;
        } else {
          arr[0] = value[0];
          arr[1] = value[1];
          arr[2] = value[2];
          arr[3] = value[3];
          this._color = rgb2hex(arr);
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(SimpleLightmapFilter2.prototype, "alpha", {
      /**
       * When setting `color` as hex, this can be used to set alpha independently.
       */
      get: function() {
        return this.uniforms.ambientColor[3];
      },
      set: function(value) {
        this.uniforms.ambientColor[3] = value;
      },
      enumerable: false,
      configurable: true
    });
    return SimpleLightmapFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-tilt-shift@4.2.0_@pixi+constants@6.5.10_@pixi+core@6.5.10_@pixi+constants@6.5.10_56y4ytu2eqjl4banf7ycb6gq4a/node_modules/@pixi/filter-tilt-shift/dist/filter-tilt-shift.esm.mjs
var extendStatics30 = function(d, b) {
  extendStatics30 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics30(d, b);
};
function __extends30(d, b) {
  extendStatics30(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex29 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment29 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n";
var TiltShiftAxisFilter = (
  /** @class */
  function(_super) {
    __extends30(TiltShiftAxisFilter2, _super);
    function TiltShiftAxisFilter2(blur, gradientBlur, start, end) {
      if (blur === void 0) {
        blur = 100;
      }
      if (gradientBlur === void 0) {
        gradientBlur = 600;
      }
      var _this = _super.call(this, vertex29, fragment29) || this;
      _this.uniforms.blur = blur;
      _this.uniforms.gradientBlur = gradientBlur;
      _this.uniforms.start = start || new Point(0, window.innerHeight / 2);
      _this.uniforms.end = end || new Point(600, window.innerHeight / 2);
      _this.uniforms.delta = new Point(30, 30);
      _this.uniforms.texSize = new Point(window.innerWidth, window.innerHeight);
      _this.updateDelta();
      return _this;
    }
    TiltShiftAxisFilter2.prototype.updateDelta = function() {
      this.uniforms.delta.x = 0;
      this.uniforms.delta.y = 0;
    };
    Object.defineProperty(TiltShiftAxisFilter2.prototype, "blur", {
      /**
       * The strength of the blur.
       *
       * @memberof PIXI.filters.TiltShiftAxisFilter#
       */
      get: function() {
        return this.uniforms.blur;
      },
      set: function(value) {
        this.uniforms.blur = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TiltShiftAxisFilter2.prototype, "gradientBlur", {
      /**
       * The strength of the gradient blur.
       *
       * @memberof PIXI.filters.TiltShiftAxisFilter#
       */
      get: function() {
        return this.uniforms.gradientBlur;
      },
      set: function(value) {
        this.uniforms.gradientBlur = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TiltShiftAxisFilter2.prototype, "start", {
      /**
       * The X value to start the effect at.
       *
       * @member {PIXI.Point}
       * @memberof PIXI.filters.TiltShiftAxisFilter#
       */
      get: function() {
        return this.uniforms.start;
      },
      set: function(value) {
        this.uniforms.start = value;
        this.updateDelta();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TiltShiftAxisFilter2.prototype, "end", {
      /**
       * The X value to end the effect at.
       *
       * @member {PIXI.Point}
       * @memberof PIXI.filters.TiltShiftAxisFilter#
       */
      get: function() {
        return this.uniforms.end;
      },
      set: function(value) {
        this.uniforms.end = value;
        this.updateDelta();
      },
      enumerable: false,
      configurable: true
    });
    return TiltShiftAxisFilter2;
  }(Filter)
);
var TiltShiftXFilter = (
  /** @class */
  function(_super) {
    __extends30(TiltShiftXFilter2, _super);
    function TiltShiftXFilter2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    TiltShiftXFilter2.prototype.updateDelta = function() {
      var dx = this.uniforms.end.x - this.uniforms.start.x;
      var dy = this.uniforms.end.y - this.uniforms.start.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      this.uniforms.delta.x = dx / d;
      this.uniforms.delta.y = dy / d;
    };
    return TiltShiftXFilter2;
  }(TiltShiftAxisFilter)
);
var TiltShiftYFilter = (
  /** @class */
  function(_super) {
    __extends30(TiltShiftYFilter2, _super);
    function TiltShiftYFilter2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    TiltShiftYFilter2.prototype.updateDelta = function() {
      var dx = this.uniforms.end.x - this.uniforms.start.x;
      var dy = this.uniforms.end.y - this.uniforms.start.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      this.uniforms.delta.x = -dy / d;
      this.uniforms.delta.y = dx / d;
    };
    return TiltShiftYFilter2;
  }(TiltShiftAxisFilter)
);
var TiltShiftFilter = (
  /** @class */
  function(_super) {
    __extends30(TiltShiftFilter2, _super);
    function TiltShiftFilter2(blur, gradientBlur, start, end) {
      if (blur === void 0) {
        blur = 100;
      }
      if (gradientBlur === void 0) {
        gradientBlur = 600;
      }
      var _this = _super.call(this) || this;
      _this.tiltShiftXFilter = new TiltShiftXFilter(blur, gradientBlur, start, end);
      _this.tiltShiftYFilter = new TiltShiftYFilter(blur, gradientBlur, start, end);
      return _this;
    }
    TiltShiftFilter2.prototype.apply = function(filterManager, input, output, clearMode) {
      var renderTarget = filterManager.getFilterTexture();
      this.tiltShiftXFilter.apply(filterManager, input, renderTarget, 1);
      this.tiltShiftYFilter.apply(filterManager, renderTarget, output, clearMode);
      filterManager.returnFilterTexture(renderTarget);
    };
    Object.defineProperty(TiltShiftFilter2.prototype, "blur", {
      /**
       * The strength of the blur.
       */
      get: function() {
        return this.tiltShiftXFilter.blur;
      },
      set: function(value) {
        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TiltShiftFilter2.prototype, "gradientBlur", {
      /**
       * The strength of the gradient blur.
       */
      get: function() {
        return this.tiltShiftXFilter.gradientBlur;
      },
      set: function(value) {
        this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TiltShiftFilter2.prototype, "start", {
      /**
       * The Y value to start the effect at.
       *
       * @member {PIXI.Point}
       */
      get: function() {
        return this.tiltShiftXFilter.start;
      },
      set: function(value) {
        this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TiltShiftFilter2.prototype, "end", {
      /**
       * The Y value to end the effect at.
       *
       * @member {PIXI.Point}
       */
      get: function() {
        return this.tiltShiftXFilter.end;
      },
      set: function(value) {
        this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = value;
      },
      enumerable: false,
      configurable: true
    });
    return TiltShiftFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-twist@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_@pi_vtebwlscfm2vhmv2ehzunix7pq/node_modules/@pixi/filter-twist/dist/filter-twist.esm.mjs
var extendStatics31 = function(d, b) {
  extendStatics31 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics31(d, b);
};
function __extends31(d, b) {
  extendStatics31(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var vertex30 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment30 = "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n";
var TwistFilter = (
  /** @class */
  function(_super) {
    __extends31(TwistFilter2, _super);
    function TwistFilter2(options) {
      var _this = _super.call(this, vertex30, fragment30) || this;
      Object.assign(_this, TwistFilter2.defaults, options);
      return _this;
    }
    Object.defineProperty(TwistFilter2.prototype, "offset", {
      /**
       * This point describes the the offset of the twist.
       *
       * @member {PIXI.Point}
       */
      get: function() {
        return this.uniforms.offset;
      },
      set: function(value) {
        this.uniforms.offset = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TwistFilter2.prototype, "radius", {
      /**
       * The radius of the twist.
       */
      get: function() {
        return this.uniforms.radius;
      },
      set: function(value) {
        this.uniforms.radius = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TwistFilter2.prototype, "angle", {
      /**
       * The angle of the twist.
       */
      get: function() {
        return this.uniforms.angle;
      },
      set: function(value) {
        this.uniforms.angle = value;
      },
      enumerable: false,
      configurable: true
    });
    TwistFilter2.defaults = {
      radius: 200,
      angle: 4,
      padding: 20,
      offset: new Point()
    };
    return TwistFilter2;
  }(Filter)
);

// node_modules/.pnpm/@pixi+filter-zoom-blur@4.2.0_@pixi+core@6.5.10_@pixi+constants@6.5.10_@pixi+extensions@6.5.10_xn36erbv6coqh734iuuqpcgkgy/node_modules/@pixi/filter-zoom-blur/dist/filter-zoom-blur.esm.mjs
var extendStatics32 = function(d, b) {
  extendStatics32 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) {
      if (Object.prototype.hasOwnProperty.call(b2, p)) {
        d2[p] = b2[p];
      }
    }
  };
  return extendStatics32(d, b);
};
function __extends32(d, b) {
  extendStatics32(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) {
      t[p] = s[p];
    }
  }
  if (s != null && typeof Object.getOwnPropertySymbols === "function") {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) {
        t[p[i]] = s[p[i]];
      }
    }
  }
  return t;
}
var vertex31 = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";
var fragment31 = "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = ${maxKernelSize};\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n";
var ZoomBlurFilter = (
  /** @class */
  function(_super) {
    __extends32(ZoomBlurFilter2, _super);
    function ZoomBlurFilter2(options) {
      var _this = this;
      var _a = Object.assign(ZoomBlurFilter2.defaults, options), maxKernelSize = _a.maxKernelSize, rest = __rest(_a, ["maxKernelSize"]);
      _this = _super.call(this, vertex31, fragment31.replace("${maxKernelSize}", maxKernelSize.toFixed(1))) || this;
      Object.assign(_this, rest);
      return _this;
    }
    Object.defineProperty(ZoomBlurFilter2.prototype, "center", {
      /**
       * Center of the effect.
       *
       * @member {PIXI.Point|number[]}
       * @default [0, 0]
       */
      get: function() {
        return this.uniforms.uCenter;
      },
      set: function(value) {
        this.uniforms.uCenter = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ZoomBlurFilter2.prototype, "strength", {
      /**
       * Intensity of the zoom effect.
       * @default 0.1
       */
      get: function() {
        return this.uniforms.uStrength;
      },
      set: function(value) {
        this.uniforms.uStrength = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ZoomBlurFilter2.prototype, "innerRadius", {
      /**
       * Radius of the inner region not effected by blur.
       * @default 0
       */
      get: function() {
        return this.uniforms.uInnerRadius;
      },
      set: function(value) {
        this.uniforms.uInnerRadius = value;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ZoomBlurFilter2.prototype, "radius", {
      /**
       * Outer radius of the effect. The default value is `-1`.
       * `< 0.0` means it's infinity.
       * @default -1
       */
      get: function() {
        return this.uniforms.uRadius;
      },
      set: function(value) {
        if (value < 0 || value === Infinity) {
          value = -1;
        }
        this.uniforms.uRadius = value;
      },
      enumerable: false,
      configurable: true
    });
    ZoomBlurFilter2.defaults = {
      strength: 0.1,
      center: [0, 0],
      innerRadius: 0,
      radius: -1,
      maxKernelSize: 32
    };
    return ZoomBlurFilter2;
  }(Filter)
);
export {
  AdjustmentFilter,
  AdvancedBloomFilter,
  AsciiFilter,
  BevelFilter,
  BloomFilter,
  BulgePinchFilter,
  CRTFilter,
  ColorMapFilter,
  ColorOverlayFilter,
  ColorReplaceFilter,
  ConvolutionFilter,
  CrossHatchFilter,
  DotFilter,
  DropShadowFilter,
  EmbossFilter,
  GlitchFilter,
  GlowFilter,
  GodrayFilter,
  KawaseBlurFilter,
  MotionBlurFilter,
  MultiColorReplaceFilter,
  OldFilmFilter,
  OutlineFilter,
  PixelateFilter,
  RGBSplitFilter,
  RadialBlurFilter,
  ReflectionFilter,
  ShockwaveFilter,
  SimpleLightmapFilter,
  TiltShiftAxisFilter,
  TiltShiftFilter,
  TiltShiftXFilter,
  TiltShiftYFilter,
  TwistFilter,
  ZoomBlurFilter
};
/*! Bundled license information:

@pixi/filter-adjustment/dist/filter-adjustment.esm.mjs:
  (*!
   * @pixi/filter-adjustment - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-adjustment is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-kawase-blur/dist/filter-kawase-blur.esm.mjs:
  (*!
   * @pixi/filter-kawase-blur - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-kawase-blur is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-advanced-bloom/dist/filter-advanced-bloom.esm.mjs:
  (*!
   * @pixi/filter-advanced-bloom - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-advanced-bloom is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-ascii/dist/filter-ascii.esm.mjs:
  (*!
   * @pixi/filter-ascii - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-ascii is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-bevel/dist/filter-bevel.esm.mjs:
  (*!
   * @pixi/filter-bevel - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-bevel is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-bloom/dist/filter-bloom.esm.mjs:
  (*!
   * @pixi/filter-bloom - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-bloom is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-bulge-pinch/dist/filter-bulge-pinch.esm.mjs:
  (*!
   * @pixi/filter-bulge-pinch - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-bulge-pinch is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-color-map/dist/filter-color-map.esm.mjs:
  (*!
   * @pixi/filter-color-map - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-color-map is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-color-overlay/dist/filter-color-overlay.esm.mjs:
  (*!
   * @pixi/filter-color-overlay - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-color-overlay is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-color-replace/dist/filter-color-replace.esm.mjs:
  (*!
   * @pixi/filter-color-replace - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-color-replace is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-convolution/dist/filter-convolution.esm.mjs:
  (*!
   * @pixi/filter-convolution - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-convolution is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-cross-hatch/dist/filter-cross-hatch.esm.mjs:
  (*!
   * @pixi/filter-cross-hatch - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-cross-hatch is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-crt/dist/filter-crt.esm.mjs:
  (*!
   * @pixi/filter-crt - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-crt is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-dot/dist/filter-dot.esm.mjs:
  (*!
   * @pixi/filter-dot - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-dot is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-drop-shadow/dist/filter-drop-shadow.esm.mjs:
  (*!
   * @pixi/filter-drop-shadow - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-drop-shadow is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-emboss/dist/filter-emboss.esm.mjs:
  (*!
   * @pixi/filter-emboss - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-emboss is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-glitch/dist/filter-glitch.esm.mjs:
  (*!
   * @pixi/filter-glitch - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-glitch is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-glow/dist/filter-glow.esm.mjs:
  (*!
   * @pixi/filter-glow - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-glow is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-godray/dist/filter-godray.esm.mjs:
  (*!
   * @pixi/filter-godray - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-godray is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-motion-blur/dist/filter-motion-blur.esm.mjs:
  (*!
   * @pixi/filter-motion-blur - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-motion-blur is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-multi-color-replace/dist/filter-multi-color-replace.esm.mjs:
  (*!
   * @pixi/filter-multi-color-replace - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-multi-color-replace is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-old-film/dist/filter-old-film.esm.mjs:
  (*!
   * @pixi/filter-old-film - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-old-film is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-outline/dist/filter-outline.esm.mjs:
  (*!
   * @pixi/filter-outline - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-outline is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-pixelate/dist/filter-pixelate.esm.mjs:
  (*!
   * @pixi/filter-pixelate - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-pixelate is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-radial-blur/dist/filter-radial-blur.esm.mjs:
  (*!
   * @pixi/filter-radial-blur - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-radial-blur is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-reflection/dist/filter-reflection.esm.mjs:
  (*!
   * @pixi/filter-reflection - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-reflection is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-rgb-split/dist/filter-rgb-split.esm.mjs:
  (*!
   * @pixi/filter-rgb-split - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-rgb-split is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-shockwave/dist/filter-shockwave.esm.mjs:
  (*!
   * @pixi/filter-shockwave - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-shockwave is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-simple-lightmap/dist/filter-simple-lightmap.esm.mjs:
  (*!
   * @pixi/filter-simple-lightmap - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-simple-lightmap is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-tilt-shift/dist/filter-tilt-shift.esm.mjs:
  (*!
   * @pixi/filter-tilt-shift - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-tilt-shift is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-twist/dist/filter-twist.esm.mjs:
  (*!
   * @pixi/filter-twist - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-twist is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

@pixi/filter-zoom-blur/dist/filter-zoom-blur.esm.mjs:
  (*!
   * @pixi/filter-zoom-blur - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * @pixi/filter-zoom-blur is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

pixi-filters/dist/pixi-filters.esm.mjs:
  (*!
   * pixi-filters - v4.2.0
   * Compiled Fri, 05 Aug 2022 19:53:35 UTC
   *
   * pixi-filters is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   *)
*/
//# sourceMappingURL=pixi-filters.js.map
