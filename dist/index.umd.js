(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.canvasgrid = {}));
}(this, (function (exports) {
  var Point = /*#__PURE__*/function () {
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    var _proto = Point.prototype;

    _proto.add = function add(point) {
      return new Point(this.x + point.x, this.y + point.y);
    };

    _proto.sub = function sub(point) {
      return new Point(this.x - point.x, this.y - point.y);
    };

    _proto.smult = function smult(value) {
      return new Point(this.x * value, this.y * value);
    };

    _proto.vmult = function vmult(point) {
      return new Point(this.x * point.x, this.y * point.y);
    };

    _proto.vscale = function vscale(scale, origin) {
      if (origin === void 0) {
        origin = new Point(0, 0);
      }

      return origin.add(this.sub(origin).vmult(scale));
    };

    _proto.sscale = function sscale(scale, origin) {
      if (origin === void 0) {
        origin = new Point(0, 0);
      }

      return this.vscale(new Point(scale, scale), origin);
    };

    return Point;
  }();

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

  var Size = /*#__PURE__*/function () {
    function Size(width, height) {
      this.width = width;
      this.height = height;
    }
    /**
     * Getters
     */


    var _proto = Size.prototype;

    /**
     * Methods
     */
    _proto.sscale = function sscale(value) {
      return new Size(this.width * value, this.height * value);
    };

    _proto.fitSize = function fitSize(ratio) {
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

    _proto.fillSize = function fillSize(ratio) {
      var width;
      var height; //

      if (this.ratio > ratio) {
        width = this.width;
        height = width / ratio;
      } //
      else {
          height = this.height;
          width = height * ratio;
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
    }
    /**
     * Getters
     */


    var _proto = Rectangle.prototype;

    /**
     * Methods
     */
    _proto.translate = function translate(vector) {
      return new Rectangle(this.origin.add(vector), this.size);
    };

    _proto.centerSize = function centerSize(size) {
      var x = this.origin.x + (this.width - size.width) / 2;
      var y = this.origin.y + (this.height - size.height) / 2;
      return new Point(x, y);
    };

    _proto.fitRectangleCenter = function fitRectangleCenter(ratio) {
      // Getting the base size
      var size = this.size.fitSize(ratio); //

      return new Rectangle(this.centerSize(size), size);
    };

    _proto.fillRectangleCenter = function fillRectangleCenter(ratio) {
      // Getting base size
      var size = this.size.fillSize(ratio); //

      return new Rectangle(this.centerSize(size), size);
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
    /**
     * Getters
     */


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

  var Grid = /*#__PURE__*/function () {
    function Grid(rows, columns, cell, spacing, origin) {
      if (spacing === void 0) {
        spacing = {
          column: 0,
          row: 0
        };
      }

      if (origin === void 0) {
        origin = new Point(0, 0);
      }

      this.rows = rows;
      this.columns = columns;
      this.cell = cell;
      this.spacing = spacing;
      this.origin = origin;
    }
    /**
     * Getters
     */


    var _proto = Grid.prototype;

    _proto.setOrigin = function setOrigin(point) {
      this.origin = point;
      return this;
    }
    /**
     * Methods
     */
    ;

    _proto.getCells = function getCells(origin) {
      if (origin === void 0) {
        origin = this.origin;
      }

      // Array contaning all cells
      var cells = []; // Iterating over rows

      for (var r = 0; r < this.rows; r++) {
        var y = origin.y + r * (this.cell.height + this.spacing.row); // Iterating over columns

        for (var c = 0; c < this.columns; c++) {
          var x = origin.x + c * (this.cell.width + this.spacing.column); // Adding new cell

          cells.push(new Cell(new Point(x, y), this.cell, {
            i: r,
            j: c
          }));
        }
      }

      return cells;
    };

    _proto.fillHeight = function fillHeight(height) {
      var f = height / this.height;
      return new Grid(this.rows, this.columns, this.cell.sscale(f), {
        column: this.spacing.column * f,
        row: this.spacing.row * f
      });
    };

    _proto.fillWidth = function fillWidth(width) {
      var f = width / this.width;
      return new Grid(this.rows, this.columns, this.cell.sscale(f), {
        column: this.spacing.column * f,
        row: this.spacing.row * f
      });
    };

    _createClass(Grid, [{
      key: "height",
      get: function get() {
        return this.rows * this.cell.height + (this.rows - 1) * this.spacing.row;
      }
    }, {
      key: "width",
      get: function get() {
        return this.columns * this.cell.width + (this.columns - 1) * this.spacing.column;
      }
    }, {
      key: "ratio",
      get: function get() {
        return this.width / this.height;
      }
    }]);

    return Grid;
  }();

  function getCanvasGrid(mode, canvas, grid) {
    // Creating canvas rectangle
    var canvasRect = new Rectangle(new Point(canvas.x, canvas.y), new Size(canvas.width, canvas.height)); // Creating unit grid

    var unitGrid = new Grid(grid.rows, grid.columns, new Size(grid.cell_ratio, 1), grid.spacing); // Creating grid rectangle

    var gridRect;

    if (mode == "fill") {
      gridRect = canvasRect.fillRectangleCenter(unitGrid.ratio);
    } else {
      gridRect = canvasRect.fitRectangleCenter(unitGrid.ratio);
    } // Setting origin


    var origin = canvasRect.origin.add(gridRect.origin); // Scaling grid

    return unitGrid.fillHeight(gridRect.height).setOrigin(origin);
  }

  exports.Cell = Cell;
  exports.Grid = Grid;
  exports.Point = Point;
  exports.Rectangle = Rectangle;
  exports.Size = Size;
  exports.getCanvasGrid = getCanvasGrid;

})));
//# sourceMappingURL=index.umd.js.map
