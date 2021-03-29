function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function round(v, d) {
  if (d === void 0) {
    d = 2;
  }

  var p = Math.pow(10, d);
  return Math.round(v * p) / p;
}

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    this.x = round(x);
    this.y = round(y);
  }

  var _proto = Point.prototype;

  _proto.add = function add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  };

  _proto.smult = function smult(value) {
    return new Point(this.x * value, this.y * value);
  };

  _proto.vscale = function vscale(scale, origin) {
    if (origin === void 0) {
      origin = new Point(0, 0);
    }

    return new Point(origin.x + (this.x - origin.x) * scale.x, origin.y + (this.y - origin.y) * scale.y);
  };

  _proto.sscale = function sscale(scale, origin) {
    if (origin === void 0) {
      origin = new Point(0, 0);
    }

    return this.vscale(new Point(scale, scale), origin);
  };

  return Point;
}();
var Size = /*#__PURE__*/function () {
  function Size(width, height) {
    this.width = round(width);
    this.height = round(height);
  }

  var _proto2 = Size.prototype;

  _proto2.fitSize = function fitSize(ratio) {
    var width;
    var height; //

    if (this.ratio > ratio) {
      height = this.height;
      width = height * ratio;
    } //
    else {
        width = this.width;
        height = width / ratio;
      }

    return new Size(width, height);
  };

  _createClass(Size, [{
    key: "ratio",
    get: function get() {
      return this.width / this.height;
    }
  }]);

  return Size;
}();
var Rectangle = /*#__PURE__*/function () {
  function Rectangle(origin, size) {
    this.origin = origin;
    this.size = size;
  } // Simple shortcuts


  var _proto3 = Rectangle.prototype;

  //
  _proto3.translate = function translate(vector) {
    return new Rectangle(this.origin.add(vector), this.size);
  };

  _proto3.fitRectangleCenter = function fitRectangleCenter(ratio) {
    // Getting the base size
    var size = this.size.fitSize(ratio); // Then we calculate its new x & y

    var x = this.origin.x + (this.width - size.width) / 2;
    var y = this.origin.y + (this.height - size.height) / 2; //

    return new Rectangle(new Point(x, y), size);
  };

  _createClass(Rectangle, [{
    key: "x",
    get: function get() {
      return this.origin.x;
    }
  }, {
    key: "y",
    get: function get() {
      return this.origin.y;
    }
  }, {
    key: "width",
    get: function get() {
      return this.size.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.size.height;
    }
  }, {
    key: "ratio",
    get: function get() {
      return this.size.ratio;
    }
  }]);

  return Rectangle;
}();
var Cell = /*#__PURE__*/function (_Rectangle) {
  _inheritsLoose(Cell, _Rectangle);

  function Cell(origin, size, index) {
    var _this;

    _this = _Rectangle.call(this, origin, size) || this;
    _this.index = index;
    return _this;
  }

  _createClass(Cell, [{
    key: "i",
    get: function get() {
      return this.index.i;
    }
  }, {
    key: "j",
    get: function get() {
      return this.index.j;
    }
  }]);

  return Cell;
}(Rectangle);
var UnitGrid = /*#__PURE__*/function () {
  function UnitGrid(rows, columns, cell_ratio, spacing) {
    if (cell_ratio === void 0) {
      cell_ratio = 1;
    }

    if (spacing === void 0) {
      spacing = {
        column: 0,
        row: 0
      };
    }

    this.rows = rows;
    this.columns = columns;
    this.cell_ratio = cell_ratio;
    this.spacing = spacing;
  }

  var _proto4 = UnitGrid.prototype;

  _proto4.getCellHeightFromGridHeight = function getCellHeightFromGridHeight(height) {
    return height / this.height;
  };

  _proto4.getCellHeightFromGridWidth = function getCellHeightFromGridWidth(width) {
    return width / this.width;
  };

  _proto4.getCells = function getCells(cell_height, translation) {
    if (cell_height === void 0) {
      cell_height = 1;
    }

    if (translation === void 0) {
      translation = new Point(0, 0);
    }

    var cells = [];

    for (var r = 0; r < this.rows; r++) {
      var y = r * (1 + this.spacing.row);

      for (var c = 0; c < this.columns; c++) {
        var x = c * (this.cell_ratio + this.spacing.column);
        var origin = new Point(x, y).sscale(cell_height).add(translation);
        cells.push(new Cell(origin, new Size(cell_height * this.cell_ratio, cell_height), {
          i: r,
          j: c
        }));
      }
    }

    return cells;
  };

  _createClass(UnitGrid, [{
    key: "height",
    get: function get() {
      /**
       * number of cells in a column   * cell height +
       * number of gaps between colums * gap height
       */
      return this.rows * 1 + (this.rows - 1) * this.spacing.row;
    }
  }, {
    key: "width",
    get: function get() {
      /**
       * number of cell in row        * cell width +
       * number of gaps between rows  * gap width
       */
      return this.columns * this.cell_ratio + (this.columns - 1) * this.spacing.column;
    }
  }, {
    key: "ratio",
    get: function get() {
      return this.width / this.height;
    }
  }]);

  return UnitGrid;
}();

exports.Cell = Cell;
exports.Point = Point;
exports.Rectangle = Rectangle;
exports.Size = Size;
exports.UnitGrid = UnitGrid;
//# sourceMappingURL=index.js.map
